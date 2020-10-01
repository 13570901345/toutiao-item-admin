<template>
  <div id="app">
   <!-- 路由出口 -->
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  name: 'app',
  data() {
    return {
      style: '',
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive =false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style lang="less">
html{
  height: 100vh;
}
body{
  height: 100%;
}
#app{
  height: 100%;
}
.el-container{
  height: 100%;
}
</style>
