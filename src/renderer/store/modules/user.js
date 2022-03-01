
import { getToken } from '@/utils/auth'
import { myApi } from '@/api'
import Vue from 'vue'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    currentUser: {},
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_CURRENT_USER: (state, currentUser) => {
      state.currentUser = currentUser
    }

  },

  actions: {
    /** *
     * 登录
     */
    async login({ commit }, userInfo) {
      const resultData = await myApi.login(userInfo)
      const token = resultData.data.data
      doSetToken(commit, token)
      //  doSetCurrent(commit, resultData.user)
    },
    logout({ commit }) {
      doLogout(commit)
    }

  }
}

/** *
 * 将token放进前端缓存
 */
function doSetToken(commit, token) {
  commit('SET_TOKEN', token)
  const expire = 3600 * 1000 * 24
  Vue.$localStorage.set('token', token, expire)
}

function doLogout(commit) {
  doSetToken(commit, '')
}

/** *
 * 将token放进前端缓存
 */
/* function doSetCurrent(commit, currentUser) {
  const expire = 3600 * 1000 * 24
  commit('SET_CURRENT_USER', currentUser)
  Vue.$localStorage.set('currentUser', currentUser, expire)
} */

export default user
