// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App";
import router from "./router";
import store from "./vuex/store";

//引入 axios
import axios from "axios";
// axios.interceptors.request.use(
//   config => {
//     // 判断是否存在token，如果存在的话，则每个http header都加上token
//     let token = localStorage.getItem("Authorization");
//     console.log("token数据" + token);
//     if (!config.headers.hasOwnProperty("Authorization") && token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
//挂载在Vue的原型上 小技巧
Vue.prototype.axios = axios;
import qs from "qs";
Vue.prototype.qs = qs;

// 注册elementui
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
