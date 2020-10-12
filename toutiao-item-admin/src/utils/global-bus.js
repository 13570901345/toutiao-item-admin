import Vue from 'vue'

export default new Vue()

//这个文件可以充当联络🇨中心的作用
//使任何组件相互通信
//只有中一个文件中引入该文件
//a文件下：
//import globalbus from '@/utils/global-bus'
//globalbus.$on('hxk',()=>{})
//on就是接收和监听

//b文件下：
//import globalbus from '@/utils/global-bus'
//globalbus.$emit('hxk',()=>{})
//这个使发送emit