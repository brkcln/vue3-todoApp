<template>
	<div class="containter">
		<div class="row">
			<div class="card card-body">
				<h1>Register</h1>
				<form @submit.prevent="register" class="w-50 mx-auto">
					<div class="form-group">
						<label class="form-label">Email:</label>
						<input type="email" class="form-control" v-model="email" />
					</div>
					<div class="form-group">
						<label>Password:</label>
						<input type="password" class="form-control" placeholder="*******" v-model="password" />
					</div>
					<p v-if="errorMessage">{{ errorMessage }}</p>
					<div>Already have an account? <router-link :to="{ path: '/login' }">Login</router-link></div>
					<button type="submit" class="btn btn-primary mt-2">Register</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
	data() {
		return {
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	methods: {
		register() {
			this.errorMessage = "";
			createUserWithEmailAndPassword(auth, this.email, this.password)
				.then((userCredential) => {
					const user = userCredential.user;
					console.log(user);
					this.$router.push({ path: "/login" });
					this.email = "";
					this.password = "";
					this.errorMessage = "";
				})
				.catch((error) => {
					const errorCode = error.code;
					this.errorMessage = error.message;
					console.error(error);
					this.email = "";
					this.password = "";
				});
		},
	},
};
</script>
