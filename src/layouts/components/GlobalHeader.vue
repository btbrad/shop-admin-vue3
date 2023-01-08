<template>
  <div class="global-header">
    <div class="logo">
      <el-icon class="mt-1"><Aim /></el-icon>
      <span class="ml-2">Thrift Shop</span>
    </div>
    <el-icon class="icon-btn" @click="toggle">
      <Fold v-if="isExpand" />
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn ml-2" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <div class="right">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn mr-2" v-if="isFullscreen" @click="toggleFullscreen"><Rank /></el-icon>
        <el-icon class="icon-btn mr-2" v-else @click="toggleFullscreen"><FullScreen /></el-icon>
      </el-tooltip>
      <img v-if="store.user.avatar" class="mr-1" :src="store.user.avatar" />
      <el-icon v-else class="text-xl"><Avatar /></el-icon>
      <el-dropdown class="ml-1" @command="handleCommand">
        <span class="el-dropdown-link">
          <span class="text-light-400">{{ store.user.username }}</span>
          <el-icon class="el-icon--right text-light-400">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <FormDrawer ref="formDrawerRef" title="修改密码" @submit="onSubmit(formRef)">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input type="password" v-model="form.oldPassword" show-password placeholder="请输入旧密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input type="password" v-model="form.newPassword" show-password placeholder="请输入新密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input type="password" v-model="form.confirmPassword" show-password placeholder="请输入确认密码">
          </el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </div>
</template>

<script setup>
import { mainStore } from '@/store/index.js'
import { useFullscreen } from '@vueuse/core'

import FormDrawer from '@/components/FormDrawer.vue'
import useResetPassword from '../hooks/useResetPassword'
import useDrawer from '../hooks/useDrawer'
import useMenuExpand from '../hooks/useMenuExpand'

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const store = mainStore()

const { formDrawerRef } = useDrawer()
const { form, formRef, rules, onSubmit } = useResetPassword(formDrawerRef)

const { isExpand, toggle } = useMenuExpand()

const onLogout = () => {
  store.logoutReq().then(() => {
    router.push('/login')
  })
}

const handleCommand = (c) => {
  switch(c) {
    case 'logout':
      onLogout()
      break
    case "resetPassword":
      formDrawerRef.value.open()
      break
  }
}

const handleRefresh = () => {
  location.reload()
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
  cursor: pointer;
}
.right {
  @apply ml-auto mr-4 flex align-middle text-light-500;
}
.login-btn {
  @apply w-[250px] text-light-200 hover:text-light-100;
}
</style>