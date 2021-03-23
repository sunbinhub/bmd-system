import Vue from "vue";
import Router from "vue-router";
import store from "../vuex/store";
import createRoutes from "./createRoutes";

Vue.use(Router);

//获取原型对象上的push函数
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 导出路由
const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/common/login")
    }
  ]
});

//全局路由守卫
let hasMenus = false;
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由对象
  //如果next为空则路由正常进行跳转，如果next不为空，则进行跳转时，会中断
  if (sessionStorage.getItem("tokenInfo")) {
    if (to.path === "/login") {
      next();
    } else if (hasMenus) {
      next();
    } else {
      try {
        const routes = createRoutes(store.state.menuInfo);
        // 动态添加路由
        //router.addrroutes()已弃用，已在vue-router：4中移除 使用router.addRoute()
        //目前是vue-router：3.0.1版本
        router.addRoutes(routes);
        hasMenus = true;
        next({ path: to.path || "/PlatformRoleManagement" });
      } catch (err) {
        sessionStorage.setItem("menuInfo", "[]");
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    hasMenus = false;
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
