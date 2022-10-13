<template>
	<form>
		<input
			type="text"
			id="buscaItem"
			name="buscaItem"
			placeholder="O que deseja encontrar?"
		/>
		<button type="submit"><fa icon="search" /></button>
	</form>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: "VSearchBar",
});
</script>

<style scoped lang="scss">
@tailwind components;
@layer components {
	form {
		@apply relative inline-flex h-10 rounded-full bg-[#F5F5F5] px-1;
		input {
			@apply items-center rounded-full border-none bg-transparent 
    py-2 font-raleway font-normal outline-none;
		}

		input[type="text"] {
			@apply inline w-40 pl-4 pr-2 text-xs opacity-50 placeholder:opacity-80
    focus:opacity-100 mobile:hidden tablet:w-60;
		}
		button {
			@apply w-8 cursor-pointer text-sm text-gray-500 tablet:pr-4
      desktop:text-base;
		}
	}
}
</style>
