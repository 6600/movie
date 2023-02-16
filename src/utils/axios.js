import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import { Message } from 'element-ui';
import router from '../router'
// const baseURL = 'http://192.168.1.8:28081/renren-api/api/'
const baseURL = 'https://sun.20001027.com/renren-api/api/'
const http = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 180,
  withCredentials: true
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['Accept-Language'] = Cookies.get('language') || 'zh-CN'
  config.headers.token = Cookies.get('token') || ''
  config.headers["Request-Start"] = new Date().getTime();
  // 默认参数
  var defaults = {}
  // 防止缓存，GET请求默认带_t参数
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      ...{ _t: new Date().getTime() }
    }
  }
  // get序列化
  config.paramsSerializer = function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  }

  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data.code === 401) {
    return Promise.reject(response.data.msg)
  }
  
  // response.data.code === 10020
  if (response.data.code === 500||response.data.code === 10004||response.data.code === 10001) {
    console.log(response)
    Message.error(response.data.msg)
    return Promise.reject(response.data.msg)
  }
  if(response.data.code === 10020 || response.data.code === 10021){
          Cookies.remove("userid");
          Cookies.remove("membership");
          Cookies.remove("username");
          Cookies.remove("token");
  }
  return response
}, error => {
  console.error(error)
  return Promise.reject(error)
})

export default http
