//引入vue
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// 注册vuex
Vue.use(Vuex);

const token1 = {
  access_token: "ae85acdb-e62f-423a-9680-2cf669626dc1",
  expires_in: 16718,
  license: "made by bsp",
  organization_id: "12",
  refresh_token: "d0876aff-f325-484c-a9e7-458445f7cc9b",
  scope: "server",
  token_type: "bearer",
  type: 9,
  user_id: "1",
  username: "admin"
};

// 状态
const state = {
  Authorization: JSON.parse(localStorage.getItem("tokenInfo")), //token值
  menuInfo: JSON.parse(localStorage.getItem("menuInfo")) //菜单信息
  // userInfo: JSON.parse(localStorage.getItem("userInfo")),
  // userList: []
};

// mutations 主要用来操作 state
const mutations = {
  //保存token数据
  SAVE_TOKEN(state, tokenInfo) {
    localStorage.setItem("Authorization", JSON.stringify(tokenInfo));
    state.Authorization = tokenInfo;
  },
  SAVE_MENUINFO(state, menuInfo) {
    localStorage.setItem("menuInfo", JSON.stringify(menuInfo));
    state.menuInfo = menuInfo;
  }
  // 保存用户数据
  // SAVE_USERINFO(state, userInfo) {
  //   // 先把数据存入本地存储
  //   localStorage.setItem("userInfo", JSON.stringify(userInfo));
  //   // 再更新数据
  //   state.userInfo = userInfo;
  // },
  // 获取全局的用户数据
  // GET_USERLIST(state, userList) {
  //   state.userList = userList;
  // }
};

// 定义action 异步的 主要是 commit mutations 由mutations来改变状态
const actions = {
  // GET_USERLIST1({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios.get("/api/getuserlist").then(response => {
  //       // console.log("获取用户数据列表：", response.data);
  //       commit("GET_USERLIST", response.data);
  //       resolve();
  //     });
  //   });
  // }
};
// 定义全局共享属性 getters
const getters = {
  // vipUsers: state => state.userList.filter(v => v.age > 9)
};
// 创建store仓库暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
