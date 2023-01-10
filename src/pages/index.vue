<template>
  <div>
    首页{{ store.user.username }}
    <!-- <el-button type="danger" @click="onLogout">退出登录</el-button> -->
  </div>
</template>

<script setup>
import { mainStore } from '@/store/index'
import { showModal } from '@/utils/utils'
import { useRouter } from 'vue-router'

const store = mainStore()
const router = useRouter()

const onLogout = ()=> {
  showModal("是否要退出登录").then(async res => {
    console.log('logout')
    await store.logoutReq()
    router.push('/login')
  }).catch(err => {
    console.log('cancel', err)
  })
}
</script>