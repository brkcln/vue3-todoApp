<template>
	<div id="wrapper">
		<!-- Sidebar -->
		<div id="sidebar-wrapper">
			<ul class="sidebar-nav">
				<li class="nav-item">
					<router-link to="/login" class="nav-link text-dark">Dashboard</router-link>
				</li>
				<li class="nav-item">
					<button to="/login" @click="logout" class="nav-link btn text-danger">Logout</button>
				</li>
				<li>
					<a href="#">Shortcuts</a>
				</li>
				<li>
					<a href="#">Overview</a>
				</li>
				<li>
					<a href="#">Events</a>
				</li>
				<li>
					<a href="#">About</a>
				</li>
				<li>
					<a href="#">Services</a>
				</li>
				<li>
					<a href="#">Contact</a>
				</li>
			</ul>
		</div>
		<!-- /#sidebar-wrapper -->

		<!-- Page Content -->
		<div id="page-content-wrapper">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<h1>Simple Sidebar</h1>
						<p></p>
						<p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
						<a href="#menu-toggle" class="btn btn-default" id="menu-toggle">Toggle Menu</a>
					</div>
				</div>
			</div>
		</div>
		<!-- /#page-content-wrapper -->
	</div>
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
			});
		},
	},
};
</script>
