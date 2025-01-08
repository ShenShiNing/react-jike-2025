// axios的封装处理
import axios from 'axios'
import { getToken, removeToken } from './token'
import router from '@/router'

// 1.根域名配置
// 2.超时时间配置
const request = axios.create({
    baseURL: "http://geek.itheima.net/v1_0",
    timeout: 5000
})

// 3.请求拦截器 / 响应拦截器
request.interceptors.request.use((config) => {
    // 操作config 注入token
    // 1.获取token
    const token = getToken()
    // 2.按照接口要求注入token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    // 监控401状态码
    console.dir(error)
    if(error.response.status === 401) {
        // 清除本地token
        removeToken()
        // 跳转登录页
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})

export { request }