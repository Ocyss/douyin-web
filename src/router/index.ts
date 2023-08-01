import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { febore } from "./router-guards";

const catalogVue = () => import("@/pages/catalog.vue");

const home: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    components: {
      default: () => import("@/pages/home/index.vue"),
      LeftSidebar: () => import("@/pages/home/leftSidebar.vue"),
    },
  },
];

const docs: Array<RouteRecordRaw> = [
  {
    path: "/docs/project",
    name: "docs-project",
    components: {
      default: () => import("@/pages/docs/project/index.vue"),
      LeftSidebar: catalogVue,
    },
  },
  {
    path: "/docs/api",
    name: "docs-api",
    components: {
      default: () => import("@/pages/docs/api/index.vue"),
      LeftSidebar: catalogVue,
    },
  },
  {
    path: "/docs/model",
    name: "docs-model",
    components: {
      default: () => import("@/pages/docs/model/index.vue"),
      LeftSidebar: catalogVue,
    },
  },
];

const about: Array<RouteRecordRaw> = [
  {
    path: "/about/team",
    name: "about-team",
    components: {
      default: () => import("@/pages/about/team/index.vue"),
      LeftSidebar: catalogVue,
    },
  },
  {
    path: "/about/ocyss",
    name: "about-ocyss",
    components: {
      default: () => import("@/pages/about/ocyss/index.vue"),
      LeftSidebar: catalogVue,
    },
  },
];

//路由
const constantRouter: Array<RouteRecordRaw> = [...home, ...about, ...docs];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
});

febore(router);
export default router;
