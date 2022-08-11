import { createApp } from 'vue';
import App from './App.vue';
import AxiosAdapter from './infra/http/AxiosAdapter';
import FetchAdapter from './infra/http/FetchAdapter';
import BoardServiceHttp from './services/BoardServiceHttp';
import { createRouter, createWebHistory } from "vue-router";
import BoardViewVue from './views/BoardView.vue';
import BoardsViewVue from "./views/BoardsView.vue";

const app = createApp(App);
const httpClient = new AxiosAdapter();
// const httpClient = new FetchAdapter();
const baseUrl = "http://localhost:3000";
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/boards/:idBoard", component: BoardViewVue },
		{ path: "/boards", component: BoardsViewVue }
	]
});
app.provide("boardService", new BoardServiceHttp(httpClient, baseUrl));
app.use(router);
app.mount('#app');
