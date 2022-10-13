<template>
	<div class="itemContainer">
		<img :src="imgsrc" />
		<div class="precodopodruto">
			<p class="nome">{{ nome }}</p>
			<p class="preco">R$ {{ preco.toFixed(2) }}</p>
			<a
				class="anchor"
				v-if="!admin"
				:href="`/produto?category=${category}&id=${id}`"
				>Ver produto</a
			>
			<a
				:href="`/produto?category=${category}&id=${id}`"
				v-else
				class="adminAnchor"
				>#{{ id?.replace(`${category}-`, "") }}</a
			>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export interface IProduto {
	name: string;
	price: string;
	image: string;
	category: string;
	description: string;
	id?: string;
}

export default defineComponent({
	name: "VProduct",
	props: {
		nome: {
			required: true,
			type: String,
		},
		preco: {
			required: true,
			type: Number,
		},
		category: String,
		id: String,
		href: String,
		imgsrc: String,
		admin: Boolean,
	},
});
</script>

<style scoped lang="scss">
.itemContainer {
	@apply relative mb-2 flex shrink-0 flex-col justify-between
   font-raleway mobile:w-[47%] tablet:w-[24%] desktop:w-[15%];
	img {
		@apply h-full w-full tablet:max-h-24 desktop:max-h-44;
	}
	.nome {
		@apply mb-2 text-xs font-medium desktop:text-sm;
	}
	.precodopodruto {
		.preco {
			@apply mb-1 text-sm font-bold desktop:text-base;
		}
		.anchor {
			@apply text-sm font-bold text-[#2A7AE4] desktop:text-base;
		}
		.adminAnchor {
			@apply text-sm font-bold text-[#464646] desktop:text-base;
		}
	}
}
</style>
