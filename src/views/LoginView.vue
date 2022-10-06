<template>
  <TheHeader></TheHeader>
  <div class="login">
    <div class="loginFormContainer">
      <form>
        <h2>Iniciar Sessão</h2>
        <input type="email" placeholder="Escreva seu email" required />
        <input type="password" placeholder="Escreva sua senha" required />
        <router-link to="/todosprodutos"
          ><button class="botaoPrimario w-[109px] desktop:w-full">
            Entrar
          </button></router-link
        >
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import TheHeader from "@/components/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
.login {
  @apply relative items-center bg-[#f5f5f5] py-11 desktop:py-24;
}
.loginFormContainer {
  @apply relative mx-auto h-[189px] w-[275px] 
  desktop:h-[291px] desktop:w-[423px];
  form {
    @apply relative mx-auto grid h-full w-full 
    grid-rows-3 gap-4  text-center  desktop:gap-6;
    grid-template-rows: min-content auto auto min-content;
    h2 {
      @apply font-raleway text-xl font-bold text-[#464646];
    }
    input {
      @apply relative mb-2 block h-full w-full border-none 
      bg-white px-3 font-raleway text-base font-normal
      text-[#A2A2A2] shadow-sm shadow-[#0000005e] outline-none;
    }
  }
}
</style>
