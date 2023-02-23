<template>
	<div>
		<label for="fileInput">Select Image:</label>
		<input type="file" id="fileInput" @change="onFileSelected">
	</div>
</template>

<script>
export default {
	data() {
		return {
			file: null
		}
	},
	methods: {
		onFileSelected(event) {
			this.file = event.target.files[0];
		}
	},
	watch: {
		file: {
			handler(newFile) {
				this.$emit("file-selected", newFile);
			},
			deep: true
		}
	}
}
</script>
