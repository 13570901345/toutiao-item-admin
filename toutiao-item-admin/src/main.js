import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式文件
import './style/index.less'
// 引入饿了吗组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入公共css样式
import '@/style/commend.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
