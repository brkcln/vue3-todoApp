<template>
	<div class="container">
		<h1>Login</h1>
		<form @submit.prevent="login" class="w-50 mx-auto d-flex flex-column gap-3">
			<div class="form-group">
				<label class="form-label" for="email">Email:</label>
				<input type="email" id="email" name="email" class="form-control" v-model="email" />
			</div>
			<div class="form-group">
				<label class="form-label" for="password">Password:</label>
				<input type="password" name="password" id="password" class="form-control" v-model="password" />
			</div>
			<div class="d-flex flex-column align-items-center gap-3">
				Dont have an account? <router-link to="/register">Register</router-link>
				<button type="submit" class="btn btn-primary w-75">Login</button>
				<button @click="googleSignIn" class="btn btn-outline-primary w-75">Login with Google <i class="bi bi-google"></i></button>
			</div>
		</form>
	</div>
</template>

<script>
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		login() {
			signInWithEmailAndPassword(auth, this.email, this.password)
				.then((userCredential) => {
					const user = userCredential.user;
					localStorage.setItem("currentUser", JSON.stringify(user));
					console.log("User logged in");
					this.$router.push({ path: "/" });
				})
				.catch((error) => {
					console.error(error.message);
				});
		},
		async googleSignIn() {
			const provider = new GoogleAuthProvider();
			try {
				const result = await signInWithPopup(auth, provider);
				const user = result.user;
				localStorage.setItem("currentUser", JSON.stringify(user));
				this.$router.push("/");
			} catch (error) {
				console.error(error.message);
			}
		},
	},
};
</script>
