<template>
	<TheHeader>
		<button class="botaoSecundario px-4">Menu Administrador</button>
	</TheHeader>
	<div class="body">
		<div class="flex h-11 w-full items-center justify-center desktop:h-24">
			<VErrorBox
				v-show="showError"
				:error="true"
				:message="errorMsg"
			></VErrorBox>
		</div>
		<form
			class="mx-auto my-8 flex w-11/12 flex-col gap-4 font-raleway text-xs desktop:w-2/5"
		>
			<h1 class="text-3xl font-bold text-[#464646]">Adicionar novo produto</h1>

			<!-- imagem -->
			<div class="flex items-center justify-between gap-2">
				<VDropZone
					@change="selectedFile"
					@drop.prevent="dropImage"
					v-if="imageFromFile"
				></VDropZone>

				<div class="form w-full" v-else>
					<label for="url">URL da imagem</label>
					<input
						type="url"
						id="url"
						@change="(ev: Event) => imageUrl = getInputData(ev)"
					/>
				</div>

				<button
					class="botaoSecundario mb-1 w-fit rounded-full px-4"
					@click.prevent="imageFromFile = !imageFromFile"
				>
					<fa v-if="imageFromFile" icon="link" class="w-4" />
					<fa v-else icon="image" class="w-4" />
				</button>
			</div>

			<!--Categoria-->
			<div class="form relative">
				<label for="category">Categoria</label>
				<select
					class="absolute bottom-2.5 left-2 w-[97%] border-none text-base outline-none"
					id="category"
					@change="(ev: Event) => category = getInputData(ev)"
				>
					<option value="star_wars">Star Wars</option>
					<option value="consoles">Consoles</option>
					<option value="diversos">Diversos</option>
				</select>
			</div>

			<!--Nome-->
			<div class="form">
				<label for="name">Nome do Produto</label>
				<input
					type="text"
					id="name"
					@input="(ev: Event) => name = getInputData(ev)"
				/>
			</div>

			<!--Preço-->
			<div class="form">
				<label for="price">Preço do Produto</label>
				<div class="flex items-center">
					<p class="mr-1 text-base">R$</p>
					<input
						type="number"
						id="price"
						placeholder="1,00"
						@input="(ev: Event) => price = getInputData(ev)"
					/>
				</div>
			</div>

			<!--Descrição-->
			<textarea
				class="description"
				placeholder="Descrição do Produto"
				@input="(ev: Event) => description = getInputData(ev)"
			></textarea>

			<button class="botaoPrimario w-full" @click.prevent="sendForm">
				Adicionar Produto
			</button>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import VDropZone from "@/components/VDropZone.vue";
import VErrorBox from "@/components/VMessageBox.vue";
import router from "@/router";
import api from "@/service/client-service";

export default defineComponent({
	data() {
		return {
			imageUrl: "",
			imageFile: undefined as File | undefined,
			imageFromFile: false,
			category: "star_wars",
			name: "",
			price: "",
			description: "",
			errorMsg: "",
			showError: false,
		};
	},
	methods: {
		dropImage(ev: DragEvent) {
			if (ev.dataTransfer) {
				this.imageFile = ev.dataTransfer.files[0];
			}
		},
		selectedFile(ev: Event) {
			const fileInput = ev.target as HTMLInputElement;
			if (fileInput.files && fileInput.files.length > 0) {
				this.imageFile = fileInput.files[0];
			}
		},
		getInputData(ev: Event) {
			const input = ev.target as HTMLInputElement;
			return input.value;
		},
		async sendForm() {
			if (!this.validateForm()) {
				return;
			}

			const imageFile = this.imageFromFile
				? (this.imageFile as File)
				: await this.urlToFile(this.imageUrl);

			const reader = new FileReader();
			reader.readAsDataURL(imageFile);

			reader.onload = () => {
				const product = {
					image: reader.result?.toString(),
					category: this.category,
					name: this.name,
					price: this.price,
					description: this.description,
					id: `${this.category}-${new Date().getTime()}`,
				};

				api.post(`${api.address}/products`, product);
				router.push(`/produto?category=${this.category}&id=${product.id}`);
			};
		},
		async urlToFile(url: string): Promise<File> {
			const res = await fetch(url);
			const blob = await res.blob();
			const imageFile = new File([blob], "dot.png", blob);
			return imageFile;
		},
		validateForm(): boolean {
			const urlRegex =
				/(^| )(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,8}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gim;
			const urlIsValid = urlRegex.test(this.imageUrl);
			const priceRegex = /[0-9]+([,.][0-9]{2})?/gim;
			const priceIsValid = priceRegex.test(this.price);

			this.showError = false;

			let errorMsg = "";
			if (this.imageFromFile && !this.imageFile) {
				errorMsg = "Insira um arquivo de imagem";
			} else if (!this.imageFromFile && !urlIsValid) {
				errorMsg = "Insira uma url válida";
			} else if (!this.name) {
				errorMsg = "Insira um nome válido";
			} else if (!this.price || !priceIsValid) {
				errorMsg = "Insira um preço válido";
			} else if (!this.description) {
				errorMsg = "Insira uma descrição válida";
			}

			if (errorMsg.length > 0) {
				this.errorMsg = errorMsg;
				this.showError = true;
				return false;
			} else {
				return true;
			}
		},
	},
	components: {
		TheHeader,
		VDropZone,
		VErrorBox,
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
	.description {
		@apply h-20 w-full resize-none overflow-hidden px-3 py-3 
		text-base shadow-sm shadow-[#0000005e] outline-none;
	}
}
</style>
