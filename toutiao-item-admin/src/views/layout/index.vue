<template>
  <el-container>
    <el-aside class="aside" width="auto">
      <app-asider :bbcollapse="aacollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="[aacollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
            @click="aacollapse=!aacollapse"
          ></i>
          <span>江南皮革厂深圳陈奕迅有限公司</span>
        </div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img :src="user.photo" alt />
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools">设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-error" @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- //子路有出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 添加侧边栏组件
import appAsider from "./components/asider";
// 添加api接口对调用
import { getuserprofile } from "@/api/user";
export default {
  name: "layout",
  components: {
    appAsider,
  },
  props: {},
  data() {
    return {
      user: {},
      aacollapse: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadgetuser();
  },
  mounted() {},
  methods: {
    loadgetuser() {
      getuserprofile().then((res) => {
        this.user = res.data.data;
      });
    },
    logout() {
      this.$confirm("确定退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}
.aside {
  background-color: #d3dce6;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  border-bottom: 1px solid #ccc;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
  }
}
.main {
  background: #e9eef3;
}
</style>