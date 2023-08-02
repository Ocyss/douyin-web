import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { home, about, docs, err } from "./routers";
import { febore } from "./router-guards";

//路由
const constantRouter: Array<RouteRecordRaw> = [
  ...home,
  ...about,
  ...docs,
  ...err,
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
});

febore(router);
export default router;
