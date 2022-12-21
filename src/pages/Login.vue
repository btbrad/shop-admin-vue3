<template>
  <el-row class="login-container">
    <el-col :md="16" class="left-container">
      <div>
        <p class="slogan">WELCOME</p>
        <p class="text-gray-300">THIS IS FRONTEND PROJECT USING VUE3.X & WINDICSS</p>
      </div>
    </el-col>
    <el-col :md="8" class="right-container">
      <h2 class="title">Thrift Shop</h2>
      <div class="topic">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" show-password placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round class="login-btn" color="#7A8FE5" :loading="loadingRef" @click="onSubmit(formRef)">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { login, getCurrentInfo } from '@/api/user.js'
import { toast } from '@/utils/utils'
import { useRouter } from 'vue-router'
import { setToken } from '@/utils/auth'
import { mainStore } from '@/store/index'

const store = mainStore()

const router = useRouter()

const formRef = ref(null)

const loadingRef = ref(false)

// do not use same name with ref
const form = reactive({
  username: 'admin',
  password: '123456'
})

const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const onSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loadingRef.value = true
      // 请求登录
      login(form.username, form.password).then(res => {
        toast('Login Success!', 'success')
        setToken(res.data.token)
        // 获取用户信息
        getCurrentInfo().then(res => {
          console.log('userInfo', res)
          store.setUserInfo(res.data)
        })

        router.push('/')
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
.login-container {
  @apply w-screen min-h-screen flex;
}
.login-container .left-container {
  @apply bg-purple-500 flex flex-col justify-center items-center;
}
.login-container .left-container .slogan {
  @apply text-light-500 font-extrabold text-36px mb-1;
}
.login-container .right-container {
  @apply flex flex-col justify-center items-center;
}
.login-container .right-container .title {
  @apply text-dark-300 font-bold text-36px mb-4;
}
.login-container .right-container .topic {
  @apply text-xl text-gray-300 flex items-center justify-center space-x-2 mb-6;
}
.login-container .right-container .topic .line {
  @apply h-1px w-16 bg-gray-200;
}
.login-container .right-container .login-btn {
  @apply w-[250px] text-light-200 hover:text-light-100;
}
</style>