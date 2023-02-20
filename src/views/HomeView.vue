<template>
	<div>
		<h1>Basic Todo</h1>
		<sidebar></sidebar>
		<div class="container">
			<div class="row">
				<div class="d-flex flex-column gap-3 align-items-center">
					<div class="form-group bg-light p-4 rounded d-flex align-items-center gap-4">
						<div class="d-flex flex-column gap-2">
							<input type="text" v-model="todo.title" placeholder="What to do" class="form-control" />
							<textarea name="desc" v-model="todo.desc" id="desc" cols="10" rows="5" class="form-control"></textarea>
						</div>
						<button class="btn btn-outline-primary d-flex" @click="addTodo"><i class="bi bi-plus"></i>Add</button>
					</div>
					<HelloWorld :todos="sortedTodos" @remove-todo="removeTodo" @check-todo="checkTodo"></HelloWorld>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { v1 as uuidv1 } from "uuid";
import moment from "moment";
import Sidebar from "@/components/Sidebar.vue";
export default {
	components: {
		HelloWorld,
		Sidebar,
	},
	data() {
		return {
			todos: JSON.parse(localStorage.getItem("todos") || "[]"),
			todo: {
				id: "",
				title: "",
				desc: "",
				isDone: false,
				editing: false,
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
		addTodo() {
			if (this.todo.title.trim() !== "" && this.todo.desc.trim() !== "") {
				this.todo.id = this.$uuid.v1();
				this.todo.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
				this.todos.push(this.todo);
				this.todo = {
					id: this.$uuid.v1(),
					title: "",
					desc: "",
					isDone: false,
					created_at: "",
				};
				this.$notify({
					title: "Created",
					text: "You Created New Todo Successfully !",
					type: "Success",
				});
			}
		},
		removeTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
			this.$notify({
				title: "Deleted",
				text: "You Deleted Successfully !",
				type: "Danger",
			});
		},
		checkTodo(todo) {
			todo.isDone = !todo.isDone;
			console.log(todo);
			if (todo.isDone) {
				this.$notify({
					title: "Done",
					text: "You Finished The Todo !",
					type: "Success",
				});
			}
		},
		editTodo(todo) {
			todo.editing = true;
			todo.title = todo.title.trim();
			todo.desc = todo.desc.trim();
		},
	},
};
</script>
