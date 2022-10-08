<template>
  <TheHeader></TheHeader>
  <div class="body">
    <div class="top">
      <h1 class="text-xl font-bold text-[#464646] desktop:text-3xl">
        Todos os produtos
      </h1>
      <router-link to="adicionarProduto">
        <button class="botaoPrimario w-36 desktop:w-40">
          Adicionar Produto
        </button></router-link
      >
    </div>
    <div class="listaDeProdutos">
      <VProduct
        v-for="produto in listaDeProdutos"
        :key="produto.imgsrc"
        :nome="produto.nome"
        :preco="parseFloat(produto.preco)"
        :imgsrc="produto.imgsrc"
        :admin="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ListaDeProdutosJSON from "@/assets/ListaDeProdutos.json";
import TheHeader from "@/components/TheHeader.vue";
import VProduct from "@/components/VProduct.vue";

export default defineComponent({
  setup() {
    const listaDeProdutos = ref([
      ...ListaDeProdutosJSON.starwars.lista,
      ...ListaDeProdutosJSON.consoles.lista,
      ...ListaDeProdutosJSON.diversos.lista,
    ]);
    return { listaDeProdutos };
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
