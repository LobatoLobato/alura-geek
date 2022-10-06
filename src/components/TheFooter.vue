<template>
  <footer>
    <div class="conteudo">
      <div class="infoContainer">
        <router-link class="logo" to="/"
          ><img src="../assets/Logo.png"
        /></router-link>
        <ul class="links">
          <li><a href="/about/#quemsomos">Quem somos nós</a></li>
          <li>
            <a href="/about/#priv">Política de privacidade</a>
          </li>
          <li>
            <a href="/about/#fidelidade">Programa fidelidade</a>
          </li>
          <li><a href="/about/#lojas">Nossas lojas</a></li>
          <li>
            <a href="/about/#franquia">Quero ser franqueado</a>
          </li>
          <li><a href="/about/#anuncie">Anuncie aqui</a></li>
        </ul>
      </div>
      <div class="contato">
        <h3 class="titulo">Fale Conosco</h3>
        <form class="formulario">
          <div class="nome">
            <label for="nome">Nome</label>
            <input type="text" name="nome" placeholder="..." />
          </div>
          <div class="mensagem">
            <textarea type="text" placeholder="Escreva sua mensagem" />
          </div>
          <button class="botaoPrimario w-36">Enviar mensagem</button>
        </form>
      </div>
    </div>
    <div class="creditos">
      <h3>Desenvolvido por Felipe Lobato</h3>
      <h3>2022</h3>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TheFooter",
});
</script>

<style scoped lang="scss">
footer {
  //bg-[#EAF2FD]
  @apply flex flex-col justify-between bg-[#EAF2FD] font-raleway;
  // mobile:h-[653px] tablet:h-[454px];
  .conteudo {
    @apply box-content flex justify-between 
    mobile:h-[521px] mobile:flex-col mobile:p-4
    tablet:h-[300px] tablet:w-11/12 tablet:p-8
    desktop:h-[240px] desktop:w-4/5 desktop:py-8 desktop:px-36;

    .infoContainer {
      @apply flex items-center 
      mobile:h-[260px] mobile:flex-col
      tablet:flex-col
      desktop:w-1/2 desktop:flex-row;
      .logo {
        @apply mb-4 mr-4 h-12 w-44 desktop:self-start;
      }
      .links {
        @apply flex h-full flex-col justify-between 
        text-base font-medium text-[#464646]
        mobile:items-center
        tablet:items-start
        desktop:m-auto desktop:items-start;
      }
    }
    .contato {
      @apply flex flex-col gap-2 
      mobile:h-[229px] tablet:w-7/12
      desktop:ml-4 desktop:h-full desktop:w-1/2;
      .titulo {
        @apply text-base font-bold text-[#464646];
      }
      .formulario {
        @apply flex h-full flex-col;
        .nome {
          @apply mb-2 flex h-14 flex-col justify-between bg-white px-3 py-2
        font-normal text-[#A2A2A2] shadow-sm shadow-[#0000005e] mobile:text-xs;
          input {
            @apply border-none text-base outline-none;
          }
        }
        .mensagem {
          @apply my-2 h-20 shadow-sm shadow-[#0000005e];
          textarea {
            @apply h-full w-full border-none px-3 py-2 outline-none;
          }
        }
      }
    }
  }
  .creditos {
    @apply flex h-[102px] flex-col justify-center bg-white text-center;
  }
}
</style>
