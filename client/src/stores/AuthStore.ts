import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", {
	state () {
		return {
			session: {} as any
		}
	},
	actions: {
		async login (username: string, password: string) {
			this.session = await this.authService.login(username, password);
			console.log(this.session);
			localStorage.setItem("token", this.session.token);
			this.$router.push("/boards");
		},
		logout () {
			this.session = {};
			localStorage.removeItem("token");
			this.$router.push("/login");
		},
		init () {
			const token = localStorage.getItem("token");
			if (token) {
				this.session.token = token;
			}
		}
	}
});