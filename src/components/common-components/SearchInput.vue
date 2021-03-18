<template>
  <el-input
    :placeholder="placeholder"
    v-model="searchValue"
    :class="extraClass"
    class="search-width"
    :size="size"
  >
    <i
      class="el-icon-search el-input__icon cursor-point"
      slot="suffix"
      @click="searchIconClick"
    >
    </i>
  </el-input>
</template>

<script>
export default {
  props: {
    extraClass: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    size:{
      type: String,
      default: "mini"
    }
  },
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
    searchIconClick() {
      if (this.searchValue.indexOf(" ") < 0 && this.searchValue) {
        this.$emit("searchValue", this.searchValue);
      } else {
        this.$message("输入错误！");
      }
    }
  }
};
</script>

<style scoped>
.cursor-point {
  cursor: pointer;
}

.search-width {
  width: 200px;
}
</style>
