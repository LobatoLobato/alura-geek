<template>
	<TheHeader>
		<router-link to="/login"
			><button class="botaoSecundario w-40 desktop:w-44">
				Login
			</button></router-link
		></TheHeader
	>
	<div class="home">
		<div class="banner">
			<div class="info">
				<h1>Dezembro Promocional</h1>
				<h2>Produtos selecionados com 33% de desconto</h2>
				<button class="botaoPrimario w-32">Ver Consoles</button>
			</div>
		</div>
		<div class="flex flex-col gap-8 py-16">
			<VProductList
				class="w-11/12 desktop:w-4/5"
				v-for="categoria in listaDeProdutos"
				:key="categoria.name"
				:titulo="categoria.name"
				:lista="categoria.lista"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import VProductList from "@/components/VProductList.vue";
import api from "@/service/client-service";
import { IProduto } from "@/components/VProduct.vue";

export default defineComponent({
	async setup() {
		const data = await api.get<IProduto[]>(`${api.address}/products`);
		const categoryList = await api.get<{ name: string }[]>(
			`${api.address}/categoryList`
		);
		let lista = categoryList.map((category) => {
			const categoryName = category.name
				.replace(/_/, " ")
				.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
			const lista = data.filter(
				(product) => product.category === category.name
			);
			const start =
				lista.length >= 6 ? Math.round(Math.random() * (lista.length - 6)) : 0;
			const end = start + 6;
			return {
				name: categoryName,
				lista: lista.slice(start, end),
			};
		});
		console.log(lista);
		// data.forEach((item) => {});
		const listaDeProdutos = ref(lista);
		return { listaDeProdutos };
	},
	components: {
		TheHeader,
		VProductList,
	},
});
</script>
<style scoped lang="scss">
.home {
	@apply overflow-x-hidden bg-[#f5f5f5];
}
.banner {
	@apply relative flex h-[352px] w-full items-end
  bg-[url(../assets/banner-md.jpg)] bg-cover bg-center mobile:h-48
  desktop:bg-[url(../assets/banner-image.png)];
	.info {
		@apply mx-auto mb-8 h-fit w-11/12 font-raleway
    font-bold text-white mobile:mb-4 md:w-4/5;
		h1 {
			@apply mb-4 mobile:text-xl desktop:text-5xl;
		}
		h2 {
			@apply mb-4 mobile:text-sm desktop:text-xl;
		}
	}
}
</style>
