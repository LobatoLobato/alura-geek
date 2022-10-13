<template>
	<div
		:class="`flex w-fit gap-2 border-2 ${getClass()} px-1 text-center font-semibold `"
	>
		<div class="flex flex-col items-center justify-center">
			<p>{{ message }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VErrorBox",
	methods: {
		getClass() {
			if (this.$props.error) {
				return "border-red-600 bg-red-200 text-red-600";
			} else {
				return "border-green-500 bg-green-200 text-green-500";
			}
		},
	},
	props: {
		error: {
			required: false,
			type: Boolean,
		},
		message: {
			required: true,
			type: String,
		},
	},
});
</script>

<style lang="scss" scoped></style>
