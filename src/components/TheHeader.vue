<template>
  <header
    class="sticky top-0 z-50 w-full bg-white mobile:h-14 tablet:h-16 desktop:h-28"
  >
    <nav
      class="relative m-auto flex h-full w-11/12 items-center justify-between desktop:w-4/5"
    >
      <div class="mr-4 flex w-fit shrink-0 items-center">
        <router-link to="/"
          ><img
            class="h-7 w-24 shrink-0 desktop:h-12 desktop:w-44"
            src="../assets/Logo.png"
        /></router-link>
        <VSearchBar class="ml-8" v-show="windowWidth >= tabletWidth" />
      </div>
      <div class="flex w-fit items-center justify-between">
        <slot></slot>
      </div>
      <VSearchBar class="ml-4" v-show="windowWidth < tabletWidth" />
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import VSearchBar from "./VSearchBar.vue";

export default defineComponent({
  name: "TheHeader",
  components: {
    VSearchBar,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      tabletWidth: 600,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.windowWidth = window.innerWidth;
      };
    });
  },
});
</script>

<style lang="scss"></style>
