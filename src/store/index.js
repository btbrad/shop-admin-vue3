import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      user: {} // 用户信息
    }
  },
  getters: {},
  actions: {
    setUserInfo(info) {
      this.user = JSON.parse(JSON.stringify(info))
    }
  }
})
