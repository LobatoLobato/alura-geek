<template>
	<TheHeader></TheHeader>
	<div class="login">
		<div class="flex h-11 w-full items-center justify-center desktop:h-24">
			<VErrorBox
				v-show="showError"
				:error="true"
				:message="errorMsg"
			></VErrorBox>
		</div>

		<div class="loginFormContainer">
			<form @submit.prevent="sendForm">
				<h2>Iniciar Sessão</h2>
				<input
					type="text"
					placeholder="Escreva seu email"
					id="email"
					required
				/>
				<input
					type="password"
					placeholder="Escreva sua senha"
					id="password"
					required
				/>
				<button class="botaoPrimario w-[109px] desktop:w-full">Entrar</button>
			</form>
			<div class="flex w-full items-center justify-center pt-4">
				<RouterLink to="/cadastrar">
					<button
						class="botaoSecundario w-fit px-2 desktop:w-fit"
						type="button"
					>
						Cadastrar
					</button>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import VErrorBox from "@/components/VMessageBox.vue";
import router from "@/router";
import api from "@/service/client-service";
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			showError: false,
			errorMsg: "",
		};
	},
	methods: {
		async sendForm() {
			const email = document.getElementById("email") as HTMLInputElement;
			const password = document.getElementById("password") as HTMLInputElement;
			if (!(await this.validateInput(email.value, password.value))) {
				return;
			}
			sessionStorage.setItem("LoggedIn", "true");
			sessionStorage.setItem("Email", email.value);
			router.push("/todosprodutos");
		},
		async validateInput(email: string, password: string) {
			const emailRegex = /.+@[a-z]+\.[a-z]+/gim;
			const usuario = await api.get<{ email: string; password: string }>(
				`${api.address}/loginInfo/${email}`
			);
			console.log(usuario);

			this.showError = false;
			let errorMsg = "";
			if (!usuario) {
				errorMsg = "Usuario não cadastrado";
			}

			if (!emailRegex.test(email)) {
				errorMsg = "Insira um endereço de email valido";
			} else if (password !== usuario.password) {
				errorMsg = "Senha incorreta";
			}
			if (errorMsg) {
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
		VErrorBox,
	},
});
</script>

<style lang="scss">
.login {
	@apply relative flex flex-col items-center bg-[#f5f5f5] pb-11 desktop:pb-24;
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
