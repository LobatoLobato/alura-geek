<template>
	<TheHeader></TheHeader>
	<div class="body">
		<div class="top">
			<h1 class="text-xl font-bold text-[#464646] desktop:text-3xl">
				Pesquisa
			</h1>
		</div>
		<p v-show="!achou">Nenhum produto encontrado com o termo {{ pesquisa }}</p>
		<div class="listaDeProdutos">
			<VProduct
				v-for="produto in listaDeProdutos"
				:key="produto.image"
				:nome="produto.name"
				:preco="parseFloat(produto.price)"
				:imgsrc="produto.image"
				:id="produto.id"
				:category="produto.category"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import VProduct, { IProduto } from "@/components/VProduct.vue";
import api from "@/service/client-service";

export default defineComponent({
	async setup() {
		const [pesquisa] = new URLSearchParams(window.location.search).values();
		const data = await api.get<IProduto[]>(`${api.address}/products`);
		const listaDeProdutos = ref(
			data.filter((produto) => {
				return produto.name.toLowerCase().includes(pesquisa);
			})
		);
		const achou = listaDeProdutos.value.length > 0;
		window.addEventListener("submit", () => {
			window.location.reload();
		});
		return { listaDeProdutos, pesquisa, achou };
	},
	components: {
		TheHeader,
		VProduct,
	},
});
</script>

<style lang="scss">
.body {
	@apply w-full bg-[#f5f5f5] font-raleway;
	.top {
		@apply m-auto mb-4 flex w-11/12 items-center justify-between mobile:flex-col 
    mobile:items-start mobile:justify-start mobile:gap-4 desktop:w-4/5;
	}
	.listaDeProdutos {
		@apply m-auto flex w-11/12 flex-wrap justify-between desktop:w-4/5;
	}
}
</style>
