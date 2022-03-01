import store from '@/store'
import { guidUtils } from '@/utils'
import common from '@/common' // 引入全局文件common.js
export function download(url, filename) {
  var xhr = new XMLHttpRequest()
  // GET请求,请求路径url,async(是否异步)
  xhr.open('GET', common.baseApiUrl() + url, true)
  // 设置请求头参数的方式,如果没有可忽略此行代码
  xhr.setRequestHeader('custom_request_id', guidUtils.build())
  xhr.setRequestHeader('Authorization', 'Bearer ' + store.getters.token)
  // 设置响应类型为 blob
  xhr.responseType = 'blob'
  // 关键部分
  xhr.onload = function(e) {
    // 如果请求执行成功
    if (this.status === 200) {
      var blob = this.response
      var a = document.createElement('a')
      var url = URL.createObjectURL(blob)
      a.href = url
      a.download = filename
      a.click()
      // 释放之前创建的URL对象
      window.URL.revokeObjectURL(url)
    }
  }
  // 发送请求
  xhr.send()
}

