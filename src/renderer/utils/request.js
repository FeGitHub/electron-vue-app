import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { guidUtils } from '@/utils'
import common from '@/common' // 引入全局文件common.js
import qs from 'qs'
/** **
 *  请求资源
 */
const service = axios.create({
  baseURL: common.baseApiUrl(),
  timeout: 500000,
  method: 'post',
  data: {}
})

service.interceptors.request.use(
  config => {
    if (store.getters.token && config.path !== '/login') {
      config.headers['token'] = store.getters.token
    }
    config.url = config.baseURL + config.path
    config.data = qs.stringify(config.data)
    //  config.headers['custom_request_id'] = guidUtils.build()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const data = response.data
    const headers = response.headers
    const resultData = data.resultData
    if (data.code === 200) {
      return { data, headers, resultData, ...resultData }
    }
    Message({
      message: data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(data.error))
  },
  error => {
    let message
    if (error.response && error.response.data && error.response.data.statusCode) {
      message = error.response.data.error
    } else if (error.message === 'Network Error') {
      message = '网络连接失败'
    } else {
      message = error.message
    }

    /** **
     * 错误信息统一展示
     */
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export { service }
