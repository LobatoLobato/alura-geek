<template>
	<div
		class="flex w-fit gap-2 border-2 border-red-600 bg-red-200 px-1 text-center font-semibold text-red-600"
	>
		<div class="flex flex-col">
			<p v-for="msg of errorMsg" :key="msg">{{ msg }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
	name: "VErrorBox",
	props: {
		errorMsg: {
			required: true,
			type: Array as PropType<string[]>,
		},
	},
});
</script>

<style lang="scss" scoped></style>
