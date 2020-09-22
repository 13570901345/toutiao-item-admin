//封装axios
import axios from 'axios'

//创建axios实例
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'//配置基础路径
})
export default request