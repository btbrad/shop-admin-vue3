<template>
  <el-row class="w-screen min-h-screen flex">
    <el-col :md="16" class="bg-purple-500 flex flex-col justify-center items-center">
      <div>
        <p class="text-light-500 font-extrabold text-36px mb-1">WELCOME</p>
        <p class="text-gray-300">THIS IS FRONTEND PROJECT USING VUE3.X & WINDICSS</p>
      </div>
    </el-col>
    <el-col :md="8" class="flex flex-col justify-center items-center">
      <h2 class="text-dark-300 font-bold text-36px mb-4">Thrift Shop</h2>
      <div class="text-xl text-gray-300 flex items-center justify-center space-x-2 mb-6">
        <span class="h-1px w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-1px w-16 bg-gray-200"></span>
      </div>
      <el-form :model="form" class="w-[250px]">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="form.password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round class="w-[250px] text-light-200 hover:text-light-100" color="#7A8FE5" @click="onSubmit">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>