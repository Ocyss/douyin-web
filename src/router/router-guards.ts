import { type Router } from "vue-router";

export function febore(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (!to.name) {
      //判断有没有路由
      next({ name: "err404" });
    } else {
      next();
    }
  });

  router.afterEach(async (to, from, failure) => {});

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
