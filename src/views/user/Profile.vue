<template>
	<div class="container">
		<h1>User Profile</h1>
		<div class="d-flex flex-column gap-3 align-items-center">
			<div class="form-group">
				<img :src="user.photoURL" id="img" disabled class="img-fluid rounded-5" width="150" height="150" />
			</div>
			<div class="form-group">
				<label for="name" class="form-label">Name</label>
				<input type="text" name="name" id="name" disabled class="form-control" :value="user.displayName" />
			</div>
			<div class="form-group">
				<label for="name" class="form-label">Email</label>
				<input type="email" name="email" id="email" disabled class="form-control" :value="user.email" />
			</div>
		</div>
	</div>
</template>
<script>
import { auth } from "@/firebase/firebase";
export default {
	data() {
		return {
			user: {},
		};
	},
	mounted() {
		const currentUser = localStorage.getItem("currentUser");
		currentUser ? (this.user = JSON.parse(currentUser)) : false;
		console.log(currentUser);
	},
};
</script>
