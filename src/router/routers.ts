import { RouteRecordRaw } from "vue-router";

const catalogVue = () => import("@/pages/catalog.vue");
const homeVue = () => import("@/pages/home/leftSidebar.vue");
export const home: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    components: {
      default: () => import("@/pages/home/index.vue"),
      LeftSidebar: homeVue,
    },
  },
];

export const docs: Array<RouteRecordRaw> = [
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

export const about: Array<RouteRecordRaw> = [
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

export const err: Array<RouteRecordRaw> = [
  {
    path: "/err/404",
    name: "err404",
    components: {
      default: () => import("@/pages/err/404.vue"),
      LeftSidebar: homeVue,
    },
  },
];
