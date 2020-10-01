<template>
  <el-menu
    default-active="/"
    class="el-asider"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="bbcollapse"
  >
    <el-menu-item index="/">
      <i class="el-icon-house"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-tupian"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-tubiao-jiantou"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont icon-pinglun"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fensi"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-user"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "appAsider",
  components: {},
  props: ["bbcollapse"],
  data() {
    return {
      // iscollapse: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
  },
};
</script>

<style lang="less" scoped>
.el-asider {
  height: 100%;
  .iconfont {
    margin-right: 9px;
    padding-left: 4px;
  }
}
</style>