<template>
  <div id="app">
   <!-- 路由出口 -->
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app'
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
