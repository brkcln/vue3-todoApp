import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from "@/firebase/firebase";
const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import(/* webpackChunkName: "profile" */ "../views/user/Profile.vue"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/register",
		name: "register",
		component: () => import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
	},
	{
		path: "/about",
		name: "about",

		component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const isAuthenticated = localStorage.getItem("currentUser") !== null;

	if (requiresAuth && !isAuthenticated) {
		next("/login");
	} else if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
		next("/");
	} else {
		next();
	}
});
export default router;
