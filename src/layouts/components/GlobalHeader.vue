<template>
  <div class="global-header">
    <div class="logo">
      <el-icon class="mt-1"><Aim /></el-icon>
      <span class="ml-2">Thrift Shop</span>
    </div>
    <el-icon class="icon-btn"><Expand /></el-icon>
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

    <!-- <el-drawer
      v-model="drawer"
      title="修改密码"
      direction="rtl"
      :before-close="handleClose"
    >
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
        <el-form-item>
          <el-button type="primary" round class="login-btn" color="#7A8FE5" :loading="loadingRef" @click="onSubmit(formRef)">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-drawer> -->

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
        <!-- <el-form-item>
          <el-button type="primary" round class="login-btn" color="#7A8FE5" :loading="loadingRef" @click="onSubmit(formRef)">登 录</el-button>
        </el-form-item> -->
      </el-form>
    </FormDrawer>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mainStore } from '@/store/index.js'
import { ElMessageBox } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import { resetPassword } from '@/api/user'
import { removeToken } from '@/utils/auth'
import FormDrawer from '@/components/FormDrawer.vue'

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const store = mainStore()
const router = useRouter()

const drawer = ref(false)
const formRef = ref(null)

const formDrawerRef = ref(null)

const form = reactive({
  oldPassword: '',
  resetPassword: '',
  confirmPassword: ''
})

const rules = reactive({
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' }
  ],
})

const loadingRef = ref(false)

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
      // drawer.value = true
      formDrawerRef.value.open()
      break
  }
}

const handleRefresh = () => {
  location.reload()
}

const handleClose = (done) => {
  ElMessageBox.confirm('确认要关闭吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const onSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      resetPassword(form.value).then(() => {
        drawer.value = false
        removeToken()
        router.push('/login')
      }).finally(() => {
        loadingRef.value = false
      })
    } else {
      console.log('error submit!', fields)
    }
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
  cursor: pointer;
}
.right {
  @apply ml-auto mr-4 flex align-middle text-light-500;
}
.login-btn {
  @apply w-[250px] text-light-200 hover:text-light-100;
}
</style>