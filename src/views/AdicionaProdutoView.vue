<template>
  <TheHeader>
    <button class="botaoSecundario px-4">Menu Administrador</button>
  </TheHeader>
  <div class="body">
    <form
      action="produto"
      method="GET"
      enctype="multipart/form-data"
      class="mx-auto my-8 flex w-11/12 flex-col gap-4 font-raleway text-xs desktop:w-2/5"
    >
      <h1 class="text-3xl font-bold text-[#464646]">Adicionar novo produto</h1>

      <!-- imagem -->
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center justify-between" v-if="imageFromFile">
          <div
            class="flex h-32 w-2/5 flex-col items-center justify-evenly border-2 border-dashed border-gray-400 bg-white text-center mobile:hidden"
          >
            <fa icon="image" class="h-1/4 w-1/4 text-gray-400" />
            <span class="px-4 font-semibold text-gray-400"
              >Arraste para adicionar uma imagem para o produto</span
            >
          </div>
          <span class="m-2 mobile:hidden">Ou</span>
          <button type="button" class="botaoSecundario px-4">
            <label for="file" class="cursor-pointer"
              >Procure no seu dispositivo</label
            >
            <input
              type="file"
              hidden
              id="file"
              name="file"
              required
              accept="image/*"
            />
          </button>
        </div>
        <div class="form w-full" v-else>
          <label for="url">URL da imagem</label>
          <input type="url" name="url" id="url" required />
        </div>
        <button
          type="button"
          class="botaoSecundario mb-1 w-fit rounded-full px-4"
          @click="imageFromFile = !imageFromFile"
        >
          <fa v-if="imageFromFile" icon="link" class="w-4" />
          <fa v-else icon="image" class="w-4" />
        </button>
      </div>

      <!--Categoria-->
      <div class="form relative">
        <label for="categoria">Categoria</label>
        <select
          class="absolute bottom-2.5 left-2 w-[97%] border-none text-base outline-none"
          name="categoria"
          id="categoria"
        >
          <option value="starwars">Star Wars</option>
          <option value="consoles">Consoles</option>
          <option value="diversos">Diversos</option>
        </select>
      </div>

      <!--Nome-->
      <div class="form">
        <label for="nome">Nome do Produto</label>
        <input type="text" name="nome" id="nome" required />
      </div>

      <!--Preço-->
      <div class="form">
        <label for="preco">Preço do Produto</label>
        <div class="flex items-center">
          <p class="mr-1 text-base">R$</p>
          <input type="number" name="preco" id="preco" min="0" required />
        </div>
      </div>

      <!--Descrição-->
      <textarea
        id="descricao"
        name="descricao"
        class="h-20 w-full resize-none overflow-hidden px-3 py-3 text-base shadow-sm shadow-[#0000005e] outline-none"
        placeholder="Descrição do Produto"
        required
      ></textarea>

      <button class="botaoPrimario w-full" type="submit">
        Adicionar Produto
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";

export default defineComponent({
  setup() {
    const imageFromFile = ref(false);
    return { imageFromFile };
  },
  components: {
    TheHeader,
  },
});
</script>

<style lang="scss" scoped>
.body {
  @apply bg-[#f5f5f5] py-8;
  .form {
    @apply mb-2 flex h-14 flex-col justify-between bg-white px-3 py-2
        font-normal  shadow-sm shadow-[#0000005e] mobile:text-xs;
    label {
      @apply text-[#A2A2A2];
    }
    input {
      @apply border-none text-base outline-none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
      appearance: none;
    }
  }
}
</style>
