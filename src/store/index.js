import { defineStore } from 'pinia'
import { login, getCurrentInfo } from '@/api/user.js'
import { toast } from '@/utils/utils'
import { setToken } from '@/utils/auth'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      user: {} // 用户信息
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
    }
  }
})
