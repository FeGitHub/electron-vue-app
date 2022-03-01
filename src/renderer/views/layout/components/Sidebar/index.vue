<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
// import store from '@/store'
export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
      // 权限过滤菜单  src\renderer\router\index.js
      /*      var authorityList = store.getters.currentUser.authorityList
            var routesArr = this.$router.options.routes
            var routes = []
            for (var i = 0; i < routesArr.length; i++) {
              var item = routesArr[i]
              if (authorityList.indexOf(item.permission) > -1) {
                var childrenItems = item.children
                if (item.redirect) { // 有子菜单,处理到二级菜单就行了
                  for (var j = 0; i < childrenItems.length; j++) {
                    var childrenItem = childrenItems[j]
                    var newChildrenItem = []
                    if (authorityList.indexOf(childrenItem.permission) > -1) {
                      newChildrenItem.push(childrenItem)
                    }
                  }
                  item.children = newChildrenItem
                }
                routes.push(item)
              }
            }
            console.log(routes)
            return routes */
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
