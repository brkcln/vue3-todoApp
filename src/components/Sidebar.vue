<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="#"></a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link :to="{ path: '/' }" aria-current="page" class="active nav-link text-dark">Dashboard</router-link>
					</li>
					<li class="nav-item">
						<router-link :to="{ path: '/profile' }" class="nav-link text-dark">Profile</router-link>
					</li>
				</ul>
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<button @click="logout" class="nav-link btn mx-auto text-danger">Logout</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<!-- /#wrapper -->
<script>
import { auth } from "@/firebase/firebase";

export default {
	methods: {
		logout() {
			auth.signOut().then(() => {
				localStorage.removeItem("currentUser");
				console.log("User logged out");
				this.$router.push({ path: "/login" });
			});
		},
	},
};
</script>
