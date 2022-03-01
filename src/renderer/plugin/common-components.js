import Vue from 'vue'

const install = function(Vue, options) {
  /*
   写法1：
   Vue.component('Checkbox', () => import('@/components/zz/Checkbox'))
  Vue.component('CodeName', () => import('@/components/zz/CodeName'))
  Vue.component('CodeMutilSelect', () => import('@/components/zz/CodeMutilSelect'))
  Vue.component('CodeSelect', () => import('@/components/zz/CodeSelect'))
  Vue.component('DatePicker', () => import('@/components/zz/DatePicker'))
  Vue.component('DateFormat', () => import('@/components/zz/DateFormat'))
  Vue.component('DivisionPicker', () => import('@/components/zz/DivisionPicker'))
  Vue.component('OrganizationPicker', () => import('@/components/zz/OrganizationPicker'))
  Vue.component('Radio', () => import('@/components/zz/Radio'))
  Vue.component('Pagination', () => import('@/components/zz/Pagination'))*/

  /*
  写法2：
  const context = require.context('@/components/zz', true, /\.vue$/)
  for (const fileName of context.keys()) {
    // 获取组件配置
    const component = context(fileName)
    // 获取组件的命名
    const componentName = fileName.split('/')[1].replace(/\.\w+$/, '')
    // 全局注册组件
    Vue.component(
      componentName,
      component.default || component
    )
  }*/

  // 写法3：
  const context = require.context('@/components/', true, /\.vue$/)
  for (const fileName of context.keys()) {
    const splitFileNames = fileName.split('/')
    if (splitFileNames[2] !== 'index.vue') {
      continue
    }
    // 获取组件的命名
    const componentName = splitFileNames[1].replace(/\.\w+$/, '')
    // 全局注册组件
    Vue.component(
      componentName,
      () => import(`@/components/${componentName}`)
    )
  }
}

Vue.use({ install })
