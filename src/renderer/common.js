// 全局变量
const globalObj = {}

// 定义公共变量

// 定义公共方法
globalObj.baseApiUrl = function() {
  return process.env.VUE_APP_API_BASE_URL
}

export default globalObj
