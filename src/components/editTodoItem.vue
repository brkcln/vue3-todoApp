<template>
	<div>
		<input v-model="todo.title" class="form-control mb-2" />
		<textarea v-model="todo.desc" class="form-control mb-2"></textarea>
		<button @click="saveEdit" class="btn btn-success btn-sm me-2">Save</button>
		<button @click="cancelEdit" class="btn btn-sm btn-secondary">Cancel</button>
	</div>
</template>

<script>
export default {
	props: ["todo"],
	methods: {
		saveEdit() {
			this.todo.title = this.todo.title.trim();
			this.todo.desc = this.todo.desc.trim();
			this.todo.editing = false;
		},
		cancelEdit() {
			this.todo.editing = false;
		},
	},
};
</script>
