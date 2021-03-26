<template>
  <el-container>
    <el-header
      style="height:50px;background:#ccc;line-height:50px;margin-bottom:20px;"
      v-if="roleId"
    >
      设置角色权限
    </el-header>
    <el-container>
      <el-header style="height:36px;padding:0;padding-left:20px;">
        <span style="float:left;margin-right:5px;padding-top:5px;">权限:</span>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          size="mini"
          style="width:220px;float:left;height:30px;margin:2px 0 0 2px;"
        >
        </el-input>
      </el-header>
      <el-main style="padding:0 0 0 50px;height:300px;overflow:auto;">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
          @check-change="handleCheckChange"
          :default-expanded-keys="defaultExpanded"
          :default-checked-keys="defaultChecked"
        >
        </el-tree>
      </el-main>
    </el-container>

    <el-footer>
      <div v-if="!roleId">
        <el-button style="margin-top: 12px;" @click="last()">
          上一步
        </el-button>
        <el-button
          type="primary"
          style="margin-top: 12px;"
          @click="handleActive()"
        >
          下一步
        </el-button>
      </div>
      <div v-if="roleId" style="float:right;margin-right:40px;">
        <el-button style="margin-top: 12px;" @click="last()">
          取消
        </el-button>
        <el-button
          type="primary"
          style="margin-top: 12px;"
          @click="handleActive()"
        >
          保存
        </el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "TacticsSearchTable",
  props: {
    roleId: ""
  },
  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 2",
          children: [
            {
              id: 3,
              label: "二级 2-1",
              children: [
                {
                  id: 4,
                  label: "三级 3-1-1"
                },
                {
                  id: 5,
                  label: "三级 3-1-2",
                  disabled: true
                }
              ]
            },
            {
              id: 2,
              label: "二级 2-2",
              disabled: true,
              children: [
                {
                  id: 6,
                  label: "三级 3-2-1"
                },
                {
                  id: 7,
                  label: "三级 3-2-2",
                  disabled: true
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      },
      menuIds: null,
      defaultChecked: [], //默认选中的树形节点
      defaultExpanded: []
    };
  },
  created() {
    this.getMenuTree();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    roleId() {
      this.getMenuTree();
    }
  },
  methods: {
    //获取菜单
    getMenuTree() {
      //token对象
      let token = JSON.parse(sessionStorage.getItem("tokenInfo") || "[]");
      //传给后台的token值
      let tokenValue = token.token_type + " " + token.access_token;
      this.axios
        .get("http://192.168.0.40:9900/uc/sys/menu/tree", {
          params: { parentId: 0 },
          headers: { authorization: tokenValue }
        })
        .then(res => {
          //获取菜单构建树
          if (res.data && res.data.code === 0) {
            this.data = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        });
      if (this.roleId) {
        //token对象
        let token = JSON.parse(sessionStorage.getItem("tokenInfo") || "[]");
        //传给后台的token值
        let tokenValue = token.token_type + " " + token.access_token;
        this.axios
          .get("http://192.168.0.40:9900/uc/sys/role/getMenu/" + this.roleId, {
            headers: { authorization: tokenValue }
          })
          .then(res => {
            //获取菜单构建树
            if (res.data && res.data.code === 0) {
              this.defaultChecked = res.data.data;
              this.defaultExpanded = res.data.data;
            } else {
              this.$message.error(res.msg);
            }
          });
      }
    },
    //菜单过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes();
      let arr = [];
      res.forEach(item => {
        arr.push(item.id);
      });
      this.menuIds = this.unique(arr); // 去除重复的节点
      // this.menuIds = menuArr.join(",");
    },
    // 数组去重
    unique(arr) {
      let newArr = [];
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    last() {
      if (this.roleId) {
        this.$emit("closeTableDialog", "关闭");
      } else {
        this.$emit("setLast", "上一步");
      }
    },
    handleActive() {
      if (this.roleId) {
        this.$emit("saveMenuTree", this.menuIds);
      } else {
        this.$emit("setMenuTree", this.menuIds);
      }
    }
  }
};
</script>

<style></style>
