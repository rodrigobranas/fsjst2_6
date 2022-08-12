import { createApp } from 'vue';
import App from './App.vue';
import AxiosAdapter from './infra/http/AxiosAdapter';
import BoardServiceHttp from './services/BoardServiceHttp';
import { createRouter, createWebHistory } from 'vue-router';
import BoardViewVue from './views/BoardView.vue';
import BoardsViewVue from './views/BoardsView.vue';
import LoginViewVue from './views/LoginView.vue';
import { createPinia } from 'pinia';
import AuthServiceHttp from './services/AuthServiceHttp';
import { useAuthStore } from './stores/AuthStore';

const app = createApp(App);
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/login", component: LoginViewVue },
		{ path: "/boards", component: BoardsViewVue },
		{ path: "/boards/:idBoard", component: BoardViewVue }
	]
});
const httpClient = new AxiosAdapter(router);
const baseUrl = "http://localhost:3000";
const authService = new AuthServiceHttp(httpClient, baseUrl);
const pinia = createPinia();
pinia.use(({ store }) => {
	store.$router = router,
	store.authService = authService
});
app.use(router);
app.use(pinia);
useAuthStore().init();
app.provide("boardService", new BoardServiceHttp(httpClient, baseUrl));
app.mount('#app');
