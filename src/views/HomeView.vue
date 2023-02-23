<template>
	<h1>Basic Todo</h1>
	<div class="container">
		<div class="row">
			<div class="d-flex flex-column gap-3 align-items-center">
				<div class="form-group bg-light p-4 rounded d-flex align-items-center gap-4">
					<div class="d-flex flex-column gap-2">
						<input type="text" v-model="todo.title" placeholder="What to do" class="form-control" />
						<textarea name="desc" v-model="todo.desc" id="desc" cols="10" rows="5" class="form-control"></textarea>
						<upload-image @file-selected="onFileSelected" />
					</div>
					<button class="btn btn-outline-primary d-flex" @click="addTodo"><i class="bi bi-plus"></i>Add</button>
				</div>
				<HelloWorld :todos="sortedTodos" @remove-todo="removeTodo" @check-todo="checkTodo"></HelloWorld>
			</div>
		</div>
	</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import uploadImage from "@/components/uploadImage.vue";
import { v1 as uuidv1 } from "uuid";
import moment from "moment";
import { db } from "@/firebase/firebase.js";
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default {
	components: {
		HelloWorld,
		uploadImage
	},
	data() {
		return {
			todos: [],
			todo: {
				id: "",
				title: "",
				desc: "",
				isDone: false,
				editing: false,
				imageUrl: "",
			},
		};
	},
	watch: {
		todos: {
			handler(newTodos) {
				localStorage.setItem("todos", JSON.stringify(newTodos));
			},
			deep: true,
		},
	},
	computed: {
		sortedTodos() {
			return this.todos.sort((a, b) => a.isDone - b.isDone || new Date(b.created_at) - new Date(a.created_at));
		},
	},
	methods: {
		async addTodo() {
			if (this.todo.title.trim() !== "" && this.todo.desc.trim() !== "") {
				const todoRef = await addDoc(collection(db, "todos"), {
					title: this.todo.title,
					desc: this.todo.desc,
					isDone: false,
					created_at: new Date().toISOString(),
					updated_at: null,
					imageUrl: "",
				});

				if (this.todo.file) {
					const file = this.todo.file;
					const storage = getStorage();
					const storagePath = `todos/${todoRef.id}/${file.name}`;
					const storageRefPath = ref(storage, storagePath);

					try {
						await uploadBytes(storageRefPath, file);
						const imageUrl = await getDownloadURL(storageRefPath);
						await updateDoc(doc(db, "todos", todoRef.id), {
							imageUrl: imageUrl,
						});
						this.todo.imageUrl = imageUrl;
					} catch (error) {
						console.error(error);
					}
				}

				this.todos.push({ id: todoRef.id, ...this.todo });
				this.todo = {
					title: "",
					desc: "",
					isDone: false,
					editing: false,
					updated_at: null,
					file: null,
					imageUrl: "",
				};
				this.$notify({
					title: "Created",
					text: "You Created New Todo Successfully !",
					type: "Success",
				});
			}
		},


		onFileSelected(file) {
			this.todo.file = file;
		},
		async removeTodo(id) {
			await deleteDoc(doc(db, "todos", id));
			this.todos = this.todos.filter((todo) => todo.id !== id);
			this.$notify({
				title: "Deleted",
				text: "You Deleted Successfully !",
				type: "Danger",
			});
		},
		async checkTodo(todo) {
			todo.isDone = !todo.isDone;
			console.log(todo);
			if (todo.isDone) {
				this.$notify({
					title: "Done",
					text: "You Finished The Todo !",
					type: "Success",
				});
			}
			await updateDoc(doc(db, "todos", todo.id), {
				isDone: todo.isDone,
			});
		},

		async editTodoStart(todo) {
			todo.editing = true;
		},
		async editTodoEnd(todo) {
			todo.title = todo.title.trim();
			todo.desc = todo.desc.trim();
			todo.editing = false;
			await updateDoc(doc(db, "todos", todo.id), {
				title: todo.title,
				desc: todo.desc,
			});
			this.$notify({
				title: "Edited",
				text: "You Edited The Todo !",
				type: "Success",
			});
		},
	},
	async created() {
		const todosCollection = collection(db, "todos");
		const querySnapshot = await getDocs(todosCollection);
		querySnapshot.forEach((doc) => {
			this.todos.push({ id: doc.id, ...doc.data() });
		});
	},
};
</script>
