import { defineStore } from 'pinia'
import { login, getCurrentInfo, logout } from '@/api/user.js'
import { toast } from '@/utils/utils'
import { setToken, removeToken } from '@/utils/auth'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      user: {}, // 用户信息
      isExpand: true // 侧边菜单栏收缩/展开
    }
  },
  getters: {},
  actions: {
    async loginReq(username, password) {
      const res = await login(username, password).then(res => {
        toast('Login Success!', 'success')
        setToken(res.data.token)
      })
    },
    setUserInfo(info) {
      this.user = JSON.parse(JSON.stringify(info))
    },
    async getUserInfo() {
      const res = await getCurrentInfo()
      this.setUserInfo(res.data)
    },
    async logoutReq() {
      const res = logout()
      this.setUserInfo({})
      removeToken()
    },
    toggleMenuExpand() {
      console.log(111)
      this.isExpand = !this.isExpand
    }
  }
})
