import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/todosprodutos",
    name: "produtos",
    component: () =>
      import(
        /* webpackChunkName: "produtos" */ "../views/TodosProdutosView.vue"
      ),
  },
  {
    path: "/adicionarProduto",
    name: "adicionarProduto",
    component: () =>
      import(
        /* webpackChunkName: "adicionar-produto" */ "../views/AdicionaProdutoView.vue"
      ),
  },
  {
    path: "/produto",
    name: "produto",
    component: () =>
      import(/* webpackChunkName: "produto" */ "../views/ProdutoView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
