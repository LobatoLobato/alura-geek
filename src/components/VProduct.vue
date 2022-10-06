<template>
  <div class="itemContainer">
    <img :src="imgsrc" />
    <p class="nome">{{ nome }}</p>
    <div class="precodopodruto">
      <p class="preco">R$ {{ preco.toFixed(2) }}</p>
      <a :href="href" class="anchor" v-if="!admin">Ver produto</a>
      <a :href="href" v-else class="adminAnchor">#1111111</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export interface IProduto {
  nome: string;
  preco: string;
  imgsrc: string;
  url?: string;
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
    @apply w-full mobile:h-auto tablet:h-auto desktop:h-auto;
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
