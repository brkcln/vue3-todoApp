<template>
	<sidebar></sidebar>
	<notifications class="mt-4" :duration="1500" position="top right" />
	<router-view />
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
	components: {
		Sidebar,
	},
};
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
