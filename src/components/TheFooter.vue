<template>
	<footer>
		<div class="conteudo">
			<div class="infoContainer">
				<router-link class="logo" to="/"
					><img src="../assets/Logo.png"
				/></router-link>
				<ul class="links">
					<li><a href="/about/#quemsomos">Quem somos nós</a></li>
					<li><a href="/about/#priv">Política de privacidade</a></li>
					<li><a href="/about/#fidelidade">Programa fidelidade</a></li>
					<li><a href="/about/#lojas">Nossas lojas</a></li>
					<li><a href="/about/#franquia">Quero ser franqueado</a></li>
					<li><a href="/about/#anuncie">Anuncie aqui</a></li>
				</ul>
			</div>
			<div class="contato">
				<h3 class="titulo">Fale Conosco</h3>
				<form class="formulario" id="contatoForm">
					<div class="nome">
						<label for="nome">Nome</label>
						<input type="text" name="nome" id="nome" placeholder="..." />
					</div>
					<div class="mensagem">
						<textarea
							id="mensagem"
							type="text"
							placeholder="Escreva sua mensagem"
						></textarea>
					</div>
					<div class="flex gap-2">
						<button class="botaoPrimario w-36" @click.prevent="sendForm">
							Enviar mensagem
						</button>
						<v-message-box v-show="showMsg" :message="msg" :error="error" />
					</div>
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
import api from "@/service/client-service";
import { defineComponent } from "vue";
import VMessageBox from "./VMessageBox.vue";
export default defineComponent({
	name: "TheFooter",
	data() {
		return {
			msg: "",
			showMsg: false,
			error: false,
		};
	},
	methods: {
		sendForm() {
			const form = {
				name: document.getElementById("nome") as HTMLInputElement,
				msg: document.getElementById("mensagem") as HTMLInputElement,
			};
			const formData = {
				name: form.name.value,
				msg: form.msg.value,
				id: new Date().getTime(),
			};
			if (!this.validateForm(formData)) {
				return;
			}
			console.log(formData);
			api.post(`${api.address}/messages`, formData);
			form.name.value = "";
			form.msg.value = "";
			this.msg = "Mensagem enviada com sucesso";
			this.error = false;
			this.showMsg = true;
			setTimeout(() => (this.showMsg = false), 2000);
		},
		validateForm(data: { name: string; msg: string }) {
			this.showMsg = false;

			let errorMsg = "";
			if (data.name.length > 40) {
				errorMsg = "Nome deve ter no máximo 40 caracteres";
			} else if (data.name.length === 0) {
				errorMsg = "Insira um nome";
			} else if (data.msg.length > 120) {
				errorMsg = "Mensagem deve ter no máximo 120 caracteres";
			} else if (data.msg.length === 0) {
				errorMsg = "Insira uma mensagem";
			}

			if (errorMsg.length > 0) {
				this.msg = errorMsg;
				this.showMsg = true;
				this.error = true;
				return false;
			} else {
				return true;
			}
		},
	},
	components: { VMessageBox },
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
