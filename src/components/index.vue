<template>
  <div id="index">
    <el-container>
      <!-- 首页头部 -->
      <el-header class="index-header">
        <div class="fl bmdm-style bmdm-title">
          <span>业务中台管理</span>
        </div>
        <div class="fr bmdm-style">
          <span>
            admin
          </span>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <!-- <el-aside :style="getAsideHeight" class="index-aside">
          <el-row class="tac">
            <el-col>
              <el-menu
                router
                default-active="/"
                class="el-menu-vertical-demo index-menu"
                @open="handleOpen"
                @close="handleClose"
                background-color="rgba(41, 42, 42, 1)"
                text-color="#ccc"
                active-text-color="#ffd04b"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>服务管理平台</span>
                  </template>
                  <el-menu-item index="CosManagement"
                    >○ 服务类别管理</el-menu-item
                  >
                  <el-menu-item index="SoaServiceLifecycleManagement"
                    >○ 服务生命周期管理</el-menu-item
                  >
                  <el-menu-item index="MicroserviceGatewayAdministration"
                    >○ 服务网关管理</el-menu-item
                  >
                  <el-menu-item index="ThirdPartySubscriptionManagement"
                    >○ 第三方订阅管理</el-menu-item
                  >
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>服务治理平台</span>
                  </template>
                  <el-menu-item index="ServiceRegistry"
                    >○ 服务注册中心</el-menu-item
                  >
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>服务开放平台</span>
                  </template>
                  <el-menu-item index="ServiceApplication"
                    >○ 服务申请</el-menu-item
                  >
                  <el-menu-item index="ServiceMatchingTest"
                    >○ 服务对接测试</el-menu-item
                  >
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>运维平台</span>
                  </template>
                  <el-submenu index="4-1">
                    <template slot="title">统一监控管理</template>
                    <el-menu-item index="ServeControl">○ 服务监控</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4-2">
                    <template slot="title">统一日志管理</template>
                    <el-menu-item index="ServiceInteractionLog"
                      >○ 服务交互日志</el-menu-item
                    >
                  </el-submenu>
                  <el-submenu index="4-3">
                    <template slot="title">统一配置管理</template>
                    <el-menu-item index="ApplicationConfigurationManagement"
                      >○ 应用配置管理</el-menu-item
                    >
                    <el-menu-item index="GlobalConfigurationManagement"
                      >○ 全局配置管理</el-menu-item
                    >
                    <el-menu-item index="ConfigurationTemplateManagement"
                      >○ 配置模板管理</el-menu-item
                    >
                  </el-submenu>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>平台管理</span>
                  </template>
                  <el-submenu index="5-1">
                    <template slot="title">平台基础信息管理</template>
                    <el-menu-item index="PlatformOrganizationManagement"
                      >○ 平台机构管理</el-menu-item
                    >
                    <el-menu-item index="PlatformUserManagement"
                      >○ 平台用户管理</el-menu-item
                    >
                    <el-menu-item index="PlatformRoleManagement"
                      >○ 平台角色管理</el-menu-item
                    >
                    <el-menu-item index="PlatformStrategyManagement"
                      >○ 平台策略管理</el-menu-item
                    >
                  </el-submenu>
                  <el-submenu index="5-2">
                    <template slot="title">应用管理</template>
                    <el-menu-item index="SystemApplicationManagement"
                      >○ 系统应用管理</el-menu-item
                    >
                    <el-menu-item index="ApplicationCategoryManagement"
                      >○ 应用类别管理</el-menu-item
                    >
                  </el-submenu>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside> -->
        <!--左侧菜单组件-->
        <el-aside :style="getAsideHeight" class="index-aside">
          <el-menu
            router
            default-active="PlatformRoleManagement"
            class="el-menu-vertical-demo index-menu"
            @open="handleOpen"
            @close="handleClose"
            background-color="rgba(41, 42, 42, 1)"
            text-color="#ccc"
            active-text-color="#ffd04b"
          >
            <NavMenu :navMenus="leftMenus"></NavMenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main class="index-main">
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer class="index-footer">
        <div>
          <span class="fr"
            >©2013 - 2018 上海柯林布瑞信息技术有限公司All Rights</span
          >
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavMenu from "../components/common-components/NavMenu";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { NavMenu },
  data() {
    // 这里存放数据
    return {
      getAsideHeight: {
        height: ""
      },
      leftMenus: []
    };
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    window.addEventListener("resize", this.getHeight); // 注册监听器
    this.getHeight(); // 页面创建时先调用一次
    this.leftMenus = this.menuInfo; //导航菜单数据
  },
  // 生命周期 - 销毁完成
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  // 方法集合
  methods: {
    getHeight() {
      // 获取浏览器高度，减去顶部导航栏的值70（可动态获取）
      this.getAsideHeight.height = window.innerHeight - 66 + "px";
      // console.log("高度：" + this.getAsideHeight.height);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  computed: {
    ...mapState({
      menuInfo: state => state.menuInfo
    })
  }
};
</script>

<style>
html,
body,
div,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
dl,
dt,
dd,
ol,
form,
input,
textarea,
th,
td,
select {
  margin: 0;
  padding: 0;
}

#index .index-header {
  height: 45px !important;
  min-width: 800px;
  background-color: rgba(40, 50, 63, 1);
}
#index .index-footer {
  padding-right: 15px;
  font-size: 14px;
  height: 20px !important;
  min-width: 800px;
  color: #ccc;
  background-color: rgba(41, 42, 42, 1);
}
#index .index-aside {
  width: 220px !important;
  background-color: rgba(41, 42, 42, 1);
}

#index .index-menu {
  border-right: 0;
}

#index .index-main {
  min-width: 600px;
  padding: 0 12px 0 12px;
}

#index .el-submenu__title:hover,
#index .el-menu-item:hover {
  background-color: rgba(69, 69, 68, 1) !important;
}

#index .bmdm-style {
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  text-align: left;
}

#index .bmdm-title {
  margin-left: 8px;
}

#index .fl {
  float: left;
}

#index .fr {
  float: right;
}
</style>
