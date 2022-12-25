<template>
  <div class="global-header">
    <div class="logo">
      <el-icon class="mt-1"><Aim /></el-icon>
      <span class="ml-2">Thrift Shop</span>
    </div>
    <el-icon class="icon-btn"><Expand /></el-icon>
    <el-icon class="icon-btn ml-2"><Refresh /></el-icon>
    <div class="right">
      <el-icon class="icon-btn mr-2"><FullScreen /></el-icon>
      <img v-if="store.user.avatar" class="mr-1" :src="store.user.avatar" />
      <el-icon v-else class="text-xl"><Avatar /></el-icon>
      <el-dropdown class="ml-1">
        <span class="el-dropdown-link">
          <span class="text-light-400">{{ store.user.username }}</span>
          <el-icon class="el-icon--right text-light-400">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item @click="onLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { mainStore } from '@/store/index.js'

const store = mainStore()
const router = useRouter()

const onLogout = () => {
  store.logoutReq().then(() => {
    router.push('/login')
  })
}
</script>

<style scoped>
.global-header {
  @apply bg-indigo-500 fixed top-0 left-0 flex items-center text-light-50;
  height: 64px;
  width: 100vw;
}
.logo {
  width: 200px;
  @apply flex justify-center text-2xl;
}
.icon-btn {
  @apply text-xl;
}
.right {
  @apply ml-auto mr-4 flex align-middle text-light-500;
}
</style>