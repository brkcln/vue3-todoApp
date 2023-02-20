<template>
	<ul class="list-group">
		<li class="list-group-item border-0" v-for="item in todos" :key="item.id">
			<div class="card card-body d-flex flex-row align-items-center justify-content-between gap-5">
				<div class="d-flex flex-column align-items-start" v-if="!item.editing">
					<h3 :class="{ 'todo-completed': item.isDone }">{{ item.title }}</h3>
					<span :class="{ 'todo-completed': item.isDone }"> {{ item.desc }}</span>
					<span class="small text-muted text-italic">{{ item.created_at ? item.created_at : "" }}</span>
				</div>
				<div v-else>
					<editTodoItem :todo="item" />
				</div>
				<div class="d-flex gap-1">
					<button class="btn btn-outline-primary" type="button" @click="editTodo(item)">
						<i class="bi bi-pencil-fill"></i>
					</button>
					<button type="button" class="btn btn-outline-danger" @click="removeTodo(item)">
						<i class="bi bi-trash-fill"></i>
					</button>
					<button type="button" @click="checkTodo(item)" class="btn btn-outline-success btn-sm">
						<i class="bi bi-check"></i>
					</button>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import editTodoItem from "@/components/editTodoItem.vue";
export default {
	props: ["todos"],
	data() {
		return {};
	},
	components: {
		editTodoItem,
	},
	methods: {
		removeTodo(item) {
			this.$emit("remove-todo", item.id); // Emit an event with the ID of the todo to remove
		},
		checkTodo(item) {
			this.$emit("check-todo", item);
		},
		editTodo(item) {
			item.editing = true;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-completed {
	text-decoration: line-through;
	color: red;
}
</style>
