<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between">
          <span class="text-sm">{{ props.title }}</span>
          <el-tag type="danger" size="default"  effect="plain">{{ props.tag }}</el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="(item, index) in props.data" :key="index">
          <el-card shadow="hover" class="border-0 bg-light-400">
            <div class="flex flex-col justify-between items-center">
              <span class="text-xl mb-2">{{ item.value }}</span>
              <span class="text-xs text-gray-500">{{ item.name }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  })
</script>