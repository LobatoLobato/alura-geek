<template>
	<div class="flex items-center justify-between">
		<div
			class="dropzone"
			:class="{ 'active-dropzone': active }"
			@dragenter.prevent="toggleActive"
			@dragleave.prevent="toggleActive"
			@dragover.prevent
			@drop.prevent="
				(ev:DragEvent) => {
					toggleActive();
					dropImage(ev);
				}
			"
		>
			<img v-if="imageSrc" class="h-full w-full" :src="imageSrc" />
			<div class="flex flex-col items-center justify-evenly" v-else>
				<fa icon="image" class="h-1/4 w-1/4" />
				<span class="px-4 font-semibold"
					>Arraste para adicionar uma imagem para o produto</span
				>
			</div>
		</div>

		<span class="m-2 mobile:hidden">Ou</span>
		<button type="button" class="botaoSecundario w-fit px-4">
			<label for="imageFileInput" class="cursor-pointer"
				>Procure no seu dispositivo</label
			>
			<input
				@change="selectedFile"
				type="file"
				hidden
				id="imageFileInput"
				name="file"
				required
				accept="image/*"
			/>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VDropZone",
	data() {
		return {
			imageSrc: "",
			active: false,
		};
	},
	methods: {
		toggleActive() {
			this.active = !this.active;
		},
		dropImage(ev: DragEvent) {
			if (ev.dataTransfer) {
				this.readFile(ev.dataTransfer.files[0]);
			}
		},
		selectedFile(ev: Event) {
			const fileInput = ev.target as HTMLInputElement;

			if (fileInput.files && fileInput.files.length > 0) {
				this.readFile(fileInput.files[0]);
			}
		},
		readFile(file: File) {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.result) {
					this.imageSrc = reader.result.toString();
				}
			};
			reader.readAsDataURL(file);
		},
	},
});
</script>

<style lang="scss" scoped>
.dropzone {
	@apply flex h-32 w-2/5 min-w-[40%] flex-col items-center justify-evenly
	border-2 border-dashed border-gray-400 bg-white text-center
	text-gray-400 mobile:hidden;
}
.active-dropzone {
	@apply border-white bg-gray-400 text-white;
}
</style>
