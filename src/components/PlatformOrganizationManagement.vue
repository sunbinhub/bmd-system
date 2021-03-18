<template>
  <el-container>
    <!-- 头部开始 -->
    <el-header
      style="border-bottom: 1px solid #ddd; padding:0; height:40px; line-height:40px;margin-bottom: 10px;"
    >
      <span>平台机构管理</span>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主体部分开始 -->
    <el-container>
      <!-- 左侧树形结构开始 -->
      <el-aside
        style="width: 200px; margin-right: 5px; border: 1px solid #ddd;"
        :style="platformAsideHeight"
      >
        <div style="border-bottom: 1px solid #ccc; padding: 5px;">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
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
      </el-aside>
      <!-- 左侧树形结构结束 -->
      <!-- 右侧主体开始 -->
      <el-main class="organization-main">
        <el-container>
          <!-- 右侧头部开始 -->
          <el-header class="organization-header">
            <el-row class="fr">
              <el-select v-model="organizationStatus" size="mini">
                <el-option label="全部" value="all"></el-option>
                <el-option label="停用" value="disable"></el-option>
                <el-option label="启用" value="enable"></el-option>
              </el-select>
              <SearchInput @searchValue="searchOrganization"></SearchInput>
              <el-button type="info" size="mini">查询</el-button>
              <el-button type="primary" @click="dialogFormVisible = true"  size="mini">
                新增
              </el-button>
            </el-row>
          </el-header>
          <!-- 右侧头部结束 -->
          <!-- 右侧表格开始 -->
          <el-main style="padding-bottom:0;">
            <template>
              <el-table
                ref="multipleTable"
                :data="organizationTableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                :height="tableHeight"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column
                  prop="name"
                  label="序号"
                  align="center"
                  width="100"
                  sortable
                ></el-table-column>
                <el-table-column label="日期" width="120">
                  <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column label="操作" width="130">
                  <template slot-scope="scope">
                    <el-button
                      @click="changeClick(scope.row)"
                      type="text"
                      size="small"
                    >
                      修改
                    </el-button>
                    <el-button
                      @click="removeClick(scope.row)"
                      type="text"
                      size="small"
                    >
                      删除
                    </el-button>
                    <el-button
                      @click="disableClick(scope.row)"
                      type="text"
                      size="small"
                    >
                      停用
                    </el-button>
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
            </template>
          </el-main>
          <!-- 右侧表格结束 -->
          <!-- 弹窗开始 -->
          <el-dialog
            title="新增组织机构"
            :visible.sync="dialogFormVisible"
            class="organization-dialog"
          >
            <el-form
              :model="organizationForm"
              :rules="organizationRules"
              ref="organizationRules"
            >
              <el-form-item
                label="组织名称"
                :label-width="formLabelWidth"
                prop="organizationName"
                size="mini"
              >
                <el-input
                  v-model="organizationForm.organizationName"
                  placeholder="请输入内容"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="组织全称" :label-width="formLabelWidth" size="mini">
                <el-input
                  v-model="organizationForm.organizationFullname"
                  placeholder="请输入内容"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="组织代码"
                :label-width="formLabelWidth"
                prop="organizationCode"
                size="mini"
              >
                <el-input
                  v-model="organizationForm.organizationCode"
                  placeholder="请输入内容"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="选择类型"
                :label-width="formLabelWidth"
                prop="dialogOrganizationValue"
                size="mini"
              >
                <el-select
                  v-model="organizationForm.dialogOrganizationValue"
                  placeholder="请选择活动区域"
                  size="mini"
                >
                  <el-option
                    v-for="item in dialogOrganizationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    size="mini"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="上级机构"
                :label-width="formLabelWidth"
                prop="dialogParentOrganizationValue"
                size="mini"
              >
                <el-select
                  v-model="organizationForm.dialogParentOrganizationValue"
                  placeholder="请选择活动区域"
                  size="mini"
                >
                  <el-option
                    v-for="item in dialogParentOrganizationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    size="mini"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序号" :label-width="formLabelWidth" size="mini">
                <el-input
                  v-model="organizationForm.orderID"
                  placeholder="请输入内容"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeForm('organizationRules')" size="mini">
                取消
              </el-button>
              <el-button
                type="primary"
                @click="submitDialogForm('organizationRules')"
                size="mini"
              >
                保存
              </el-button>
            </div>
          </el-dialog>
          <!-- 弹窗结束 -->
        </el-container>
      </el-main>
      <!-- 右侧主体结束 -->
    </el-container>
    <!-- 主题部分结束 -->
  </el-container>
</template>
<script>
import SearchInput from "./common-components/SearchInput";
export default {
  components: { SearchInput },
  data() {
    return {
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
      //左侧高度
      platformAsideHeight: {
        height: ""
      },
      organizationStatus: "", //组织状态
      //组织表格数据
      organizationTableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      //选中的表格数据
      multipleSelection: [],
      tableHeight: "", //表格高度
      paginations: {
        page_index: 1, //当前页
        total: 15, //总数
        page_size: 1, //一页显示多少条数据
        page_sizes: [1, 10, 15, 20], //下拉框：每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", //组件布局，子组件名用逗号分隔
        pager_count: 7 //页码按钮的数量，当总页数超过该值时会折叠
      },
      allTableData: [], //实际展示的表格数据
      dialogFormVisible: false, //弹窗是否显示
      formLabelWidth: "120px", //弹窗内部左侧的距离
      //弹窗内组织选项
      dialogOrganizationOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      //弹窗内上级机构选项
      dialogParentOrganizationOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      organizationForm: {
        dialogOrganizationValue: "", //弹窗内选择类型选项值
        dialogParentOrganizationValue: "", //弹窗内上级机构选项值
        organizationName: "", //组织名称
        orderID: "", //排序号
        organizationFullname: "", //组织全称
        organizationCode: "" //组织代码
      },
      organizationRules: {
        organizationName: [
          { required: true, message: "请输入组织名称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        organizationCode: [
          { required: true, message: "请输入组织代码", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        dialogOrganizationValue: [
          { required: true, message: "请输入选择类型", trigger: "change" }
        ],
        dialogParentOrganizationValue: [
          { required: true, message: "请输入上级机构", trigger: "change" }
        ]
      }
    };
  }, // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.allTableData = this.organizationTableData;
    this.setPaginations();

    window.addEventListener("resize", this.getPlatformAsideHeight); // 注册监听器
    this.getPlatformAsideHeight(); // 页面创建时先调用一次

    window.addEventListener("resize", this.getTableHeight); // 注册监听器
    this.getTableHeight(); // 页面创建时先调用一次
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getPlatformAsideHeight() {
      // 获取浏览器高度，减去顶部导航栏的值70（可动态获取）
      this.platformAsideHeight.height = window.innerHeight - 116 + "px";
    },
    searchOrganization(value) {
      console.log(value);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getTableHeight() {
      // 获取浏览器高度，减去顶部导航栏的值70（可动态获取）
      this.tableHeight = window.innerHeight - 267 + "px";
    },
    handleSizeChange(page_size) {
      console.log("pageSize改变时触发");
      //pageSize改变时触发
      this.paginations.page_index = 1; //第一页
      this.paginations.page_size = page_size; //每页先显示多少数据
      this.organizationTableData = this.allTableData.filter((item, index) => {
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
        this.organizationTableData = tablist;
      }
    },
    setPaginations() {
      //设置分页 显示数据
      this.paginations.total = this.allTableData.length; //数据的数量
      this.paginations.page_index = 1; //默认显示第一页
      this.paginations.page_size = 1; //每页显示多少数据

      //显示数据
      this.organizationTableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    //提交弹窗表单
    submitDialogForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置弹窗表格并关闭
    closeForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    //表格修改事件
    changeClick(row) {
      this.dialogFormVisible = true;
      console.log(row);
      //...这一行的数据赋值
    },
    //表格删除事件
    removeClick(row) {
      //...删除接口
    },
    //表格停用事件
    disableClick(row) {}
  }
};
</script>

<style scoped>
.organization-main {
  padding: 0;
  padding-top: 5px;
}
.organization-header {
  min-width: 630px;
}

.fr {
  float: right;
}
.organization-dialog {
  margin-top: -85px;
}
</style>
