<script setup>
  import { ref } from 'vue'

  const showDrawer = ref(false)
  const loading = ref(false)

  const open = () => {
    showDrawer.value = true
  }
  
  const close = () => {
    showDrawer.value = false
  }

  const showLoading = () => loading.value = true
  const hideLoading = () => loading.value = false

  const props = defineProps({
    title: String,
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '45%'
    }
  })

  const emits = defineEmits(['submit'])

  const onSubmit = () => emits('submit')

  // 向父组件暴漏以下方法
  defineExpose({
    open,
    close,
    showLoading,
    hideLoading
  })
</script>

<template>
  <el-drawer v-model="showDrawer" :title="title" destroyOnClose :size="size">
    <div class="formDrawer">
      <div class="body">
        <slot />
      </div>
      <div class="actions">
        <el-button type="primary" :loading="loading" @click="onSubmit">提交</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>  

<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col items-center;
}
.formDrawer .body {
  width: 100%;
  flex: 1;
  overflow-y: auto;
}
.formDrawer .actions {
  width: 100%;
  height: 50px;
  @apply mt-10;
}
</style>