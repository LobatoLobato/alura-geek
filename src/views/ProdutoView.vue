<template>
  <TheHeader></TheHeader>
  <div class="body">
    <div class="produto">
      <img :src="productInfo.url" class="imagem" />
      <div class="info">
        <h1 class="nome">{{ productInfo.nome }}</h1>
        <h2 class="preco">R$ {{ productInfo.preco }}</h2>
        <p class="descricao">
          {{ productInfo.descricao }}
        </p>
      </div>
    </div>
    <VProductList
      class="relacionados"
      titulo="Produtos Similares"
      :lista="produtosRelacionados"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ListaDeProdutosJSON from "@/assets/ListaDeProdutos.json";
import { IProduto } from "@/components/VProduct.vue";
import TheHeader from "@/components/TheHeader.vue";
import VProductList from "@/components/VProductList.vue";

interface IProductInfo {
  [key: string]: string;
  nome: string;
  url: string;
  preco: string;
  categoria: string;
  descricao: string;
}
export default defineComponent({
  setup() {
    let teste: IProductInfo = {
      nome: "",
      url: "",
      preco: "",
      categoria: "",
      descricao: "lorem",
    };
    for (const key of new URLSearchParams(window.location.search).entries()) {
      console.log(key[0] + " " + key[1]);
      teste[key[0]] = key[1];
    }

    const productInfo = ref(teste);
    let produtosRelacionados = ref<IProduto[]>(
      ListaDeProdutosJSON.diversos.lista
    );
    switch (productInfo.value.categoria.toLowerCase()) {
      case "starwars":
        produtosRelacionados.value = ListaDeProdutosJSON.starwars.lista;
        break;
      case "consoles":
        produtosRelacionados.value = ListaDeProdutosJSON.consoles.lista;
        break;
    }
    return { productInfo, produtosRelacionados };
  },
  components: {
    TheHeader,
    VProductList,
  },
});
</script>

<style lang="scss" scoped>
.body {
  @apply w-full bg-[#f5f5f5] mobile:p-0 tablet:py-8 desktop:py-16;
}
.produto {
  @apply mx-auto mb-16 flex w-11/12  mobile:w-full mobile:flex-col desktop:w-4/5;
  .imagem {
    @apply mobile:h-[192px] mobile:w-full tablet:h-[157px] tablet:w-2/6 desktop:h-[400px] desktop:w-1/2;
  }
  .info {
    @apply flex w-full flex-col items-start justify-center
    gap-2 px-4 font-raleway text-[#464646] mobile:w-11/12;
    .nome {
      @apply font-medium mobile:text-2xl tablet:text-xl desktop:text-5xl;
    }
    .preco {
      @apply text-base font-bold;
    }
    .descricao {
      @apply h-auto max-h-24 w-full pr-2 text-sm font-normal
      desktop:max-h-40 desktop:text-base;
    }
  }
}
.relacionados {
  @apply w-11/12 desktop:w-4/5;
}
</style>
