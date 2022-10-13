<template>
	<div class="linhaProdutos">
		<div class="topo">
			<h2>{{ titulo }}</h2>
			<a :href="url">Ver tudo ➔</a>
		</div>
		<div class="produtos">
			<VProduct
				v-for="produto in lista"
				:key="produto.image"
				:nome="produto.name"
				:preco="parseFloat(produto.price)"
				:imgsrc="produto.image"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import VProduct, { IProduto } from "./VProduct.vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	name: "VProductList",
	props: {
		titulo: {
			required: true,
			type: String,
		},
		lista: {
			required: true,
			type: Array as PropType<IProduto[]>,
		},
		url: String,
	},
	components: {
		VProduct,
	},
});
</script>

<style scoped lang="scss">
.linhaProdutos {
	@apply relative mx-auto flex h-fit flex-col;
	.topo {
		@apply mb-4 flex h-9
    items-center justify-between font-raleway font-bold;

		h2 {
			@apply inline text-3xl text-[#464646];
		}
		a {
			@apply inline text-base text-[#2A7AE4];
		}
	}
	.produtos {
		@apply mx-auto flex h-fit w-full flex-nowrap justify-between 
    gap-4 overflow-y-hidden overflow-x-scroll pb-2
    scrollbar-thin scrollbar-track-gray-300
    scrollbar-thumb-[#2A7AE4] scrollbar-track-rounded-xl
    scrollbar-thumb-rounded-xl;
	}
}
</style>
