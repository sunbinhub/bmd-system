<template>
  <el-container id="platform-role">
    <!-- 头部开始 -->
    <el-header
      style="border-bottom: 1px solid #ddd; padding:0; height:40px; line-height:40px;margin-bottom: 10px;"
    >
      <span>平台角色管理</span>
    </el-header>
    <!-- 头部结束 -->
    <el-container>
      <el-header>
        <el-row>
          <el-button
            type="primary"
            size="mini"
            @click="dialogFormVisible = true"
            >新建角色</el-button
          >
          <SearchInput
            @searchValue="searchPlatformRole"
            placeholder="请输入角色名称/ID"
            class="fr"
          ></SearchInput>
        </el-row>
      </el-header>
      <el-main style="padding:0;">
        <el-table
          :data="tableData"
          style="width: 100%, overflow: auto;"
          :height="tableHeight"
        >
          <el-table-column fixed prop="date" label="日期" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="260">
            <template slot-scope="scope">
              <el-button
                @click="CheckRoleClick(scope.row)"
                type="text"
                size="small"
              >
                查看角色
              </el-button>
              <el-button
                @click="changeInformationClick(scope.row)"
                type="text"
                size="small"
              >
                修改信息
              </el-button>
              <el-button
                @click="addUserClick(scope.row)"
                type="text"
                size="small"
              >
                添加用户
              </el-button>
              <el-dropdown size="small">
                <span class="el-dropdown-link">
                  更多
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="setRoleLimitsClick(scope.row)"
                  >
                    设置角色权限
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click.native="setRoleTacticsClick(scope.row)"
                    >设置角色策略</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="removeRoleClick(scope.row)"
                    >删除角色</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :pager-count="paginations.pager_count"
          >
          </el-pagination>
        </div>
      </el-main>
      <!-- 弹窗开始 -->
      <el-dialog :visible.sync="dialogFormVisible" style="width:1300px;">
        <el-container>
          <el-header
            style="font-size:20px; border-bottom: 1px solid #ccc;height: 30px;"
          >
            <i class="el-icon-back"></i>
            <span>角色信息</span>
          </el-header>
          <el-container>
            <el-header>
              <el-steps
                :active="active"
                finish-status="success"
                simple
                style="margin-top: 20px"
              >
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
                <el-step title="步骤 4"></el-step>
              </el-steps>
            </el-header>
            <el-main>
              <div
                v-show="dialogId === 1 ? true : false"
                style="height:400px; overflow:auto;"
              >
                <el-form
                  :model="platformRoleForm"
                  :rules="platformRoleFormRules"
                  ref="platformRoleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item
                    label="角色代码"
                    prop="platformRoleCode"
                    size="mini"
                  >
                    <el-input
                      v-model="platformRoleForm.platformRoleCode"
                      size="mini"
                      style="width:200px;"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="角色名称" prop="platformRoleName">
                    <el-input
                      v-model="platformRoleForm.platformRoleName"
                      size="mini"
                      style="width:200px;"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="描述" size="mini">
                    <el-input
                      type="textarea"
                      :rows="3"
                      v-model="platformRoleForm.textarea"
                      resize="none"
                      style="width:200px;"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="状态" prop="statu" size="mini">
                    <el-radio-group v-model="platformRoleForm.statu">
                      <el-radio :label="1">在用</el-radio>
                      <el-radio :label="2">停用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item size="mini">
                    <el-button type="primary" @click="next()">
                      下一步
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="dialogId === 2 ? true : false">
                <el-col :span="5" style="border: 1px solid #ddd;height:400px; ">
                  <div style="border-bottom: 1px solid #ccc; padding: 5px;">
                    <el-input
                      placeholder="输入关键字进行过滤"
                      v-model="filterText"
                      size="mini"
                    >
                    </el-input>
                  </div>
                  <el-tree
                    class="filter-tree"
                    :data="organizationData"
                    :props="defaultProps"
                    :filter-node-method="filterNode"
                    ref="tree"
                    node-key="id"
                  >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>
                        <i :class="data.icon"></i>
                        {{ node.label }}
                      </span>
                    </span>
                  </el-tree>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="18" style="border:1px solid #ccc;">
                  <div class="block">
                    <el-tree
                      :data="applicationData"
                      show-checkbox
                      node-key="id"
                      default-expand-all
                      :expand-on-click-node="false"
                    >
                      <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                      >
                        <span>
                          <!-- <i :class="data.icon"></i> -->
                          {{ node.label }}
                        </span>
                        <span>
                          <el-button
                            type="text"
                            size="mini"
                            @click="() => append(data)"
                          >
                            Append
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)"
                          >
                            Delete
                          </el-button>
                        </span>
                      </span>
                    </el-tree>
                  </div>
                </el-col>
              </div>
              <div v-show="dialogId === 3 ? true : false"></div>
            </el-main>
          </el-container>
        </el-container>
      </el-dialog>
      <!-- 弹窗结束 -->
    </el-container>
  </el-container>
</template>

<script>
import SearchInput from "./common-components/SearchInput";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      paginations: {
        page_index: 1, //当前页
        total: 15, //总数
        page_size: 1, //一页显示多少条数据
        page_sizes: [1, 10, 15, 20], //下拉框：每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", //组件布局，子组件名用逗号分隔
        pager_count: 7 //页码按钮的数量，当总页数超过该值时会折叠
      },
      allTableData: [],
      tableHeight: "",
      handleOptions: "", //表格操作列

      //弹窗数据
      dialogFormVisible: false, //弹窗是否显示
      active: 0, //步骤条
      dialogId: 2, //弹窗内默认显示内容
      platformRoleForm: {
        platformRoleCode: "", //角色代码
        platformRoleName: "", //角色名称
        statu: 1,
        textarea: ""
      },
      platformRoleFormRules: {
        platformRoleCode: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        platformRoleName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        statu: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },

      //树形控件
      filterText: "",
      //树形结构数据
      organizationData: [
        {
          id: 1,
          label: "一级 1",
          icon: "el-icon-folder",
          children: [
            {
              id: 4,
              label: "二级 你好",
              icon: "el-icon-folder",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  icon: "el-icon-folder"
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  icon: "el-icon-folder"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          icon: "el-icon-folder",
          children: [
            {
              id: 5,
              label: "二级 2-1",
              icon: "el-icon-folder"
            },
            {
              id: 6,
              label: "二级 2-2",
              icon: "el-icon-folder"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          icon: "el-icon-folder",
          children: [
            {
              id: 7,
              label: "二级 3-1",
              icon: "el-icon-folder"
            },
            {
              id: 8,
              label: "二级 3-2",
              icon: "el-icon-folder"
            }
          ]
        }
      ],
      //树形结构默认树形
      defaultProps: {
        children: "children",
        label: "label"
      },
      //右侧树形结构
      applicationData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ]
      // applicationData: JSON.parse(JSON.stringify(adhibitionData)),
    };
  },
  components: { SearchInput },
  created() {
    this.allTableData = this.tableData;
    this.setPaginations();

    window.addEventListener("resize", this.getTableHeight); // 注册监听器
    this.getTableHeight(); // 页面创建时先调用一次
  },
  watch: {
    //树形结构搜索方法
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    //搜索角色ID
    searchPlatformRole(value) {
      console.log(value);
    },
    getTableHeight() {
      // 获取浏览器高度，减去顶部导航栏的值70（可动态获取）
      this.tableHeight = window.innerHeight - 235 + "px";
    },
    setPaginations() {
      //设置分页 显示数据
      this.paginations.total = this.allTableData.length; //数据的数量
      this.paginations.page_index = 1; //默认显示第一页
      this.paginations.page_size = 1; //每页显示多少数据

      //显示数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      console.log("pageSize改变时触发");
      //pageSize改变时触发
      this.paginations.page_index = 1; //第一页
      this.paginations.page_size = page_size; //每页先显示多少数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 5
      console.log("当前页：", page, "currentPage改变时会触发");
      //currentPage 改变时会触发
      //获取前一页的总条数
      let index = this.paginations.page_size * (page - 1); // 20
      //获取总条数
      let allData = this.paginations.page_size * page; // 25

      let tablist = []; // 显示的当前页数据：20条-25条
      for (let i = index; i < allData; i++) {
        if (this.allTableData[i]) {
          //如果最后只要23条数据，只显示到23条
          tablist.push(this.allTableData[i]);
        }
        this.tableData = tablist;
      }
    },
    //表格操作列事件
    CheckRoleClick(row) {
      console.log(row.name);
    },
    changeInformationClick(row) {
      console.log(row.name);
    },
    addUserClick(row) {
      console.log(row.name);
    },
    setRoleLimitsClick(row) {
      console.log(row.name);
    },
    setRoleTacticsClick(row) {
      console.log(row.name);
    },
    removeRoleClick(row) {
      console.log(row.name);
    },
    //步骤条事件
    next() {
      if (this.active++ > 3) {
        this.active = 3;
        this.dialogId = 4;
      } else {
        this.dialogId++;
      }
    },
    last() {
      if (this.active-- < 0) {
        this.active = 1;
        this.dialogId = 1;
      } else {
        this.dialogId--;
      }
    },
    //树形结构事件
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //表格搜索事件
    searchAdhibitionName(value) {
      console.log(value);
    }
  }
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

#platform-role .el-dialog {
  margin: 0 auto;
  margin-top: 5px !important;
  width: 70%;
  height: 600px;
}
#platform-role .el-dialog__body {
  padding: 0;
  padding-left: 5px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
