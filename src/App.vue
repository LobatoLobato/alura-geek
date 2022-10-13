<template>
	<Suspense>
		<router-view />
	</Suspense>
	<TheFooter />
</template>

<script lang="ts">
import TheFooter from "./components/TheFooter.vue";

export default {
	components: { TheFooter },
};
</script>
<style lang="scss"></style>
