<template>
  <div>
    <!-- 首页{{ store.user.username }} -->
    <el-row :gutter="20">
      <el-col v-if="!panels.length" :span="6" :offset="0" v-for="i in panels.length" :key="i">
        <el-skeleton style="width: 100%" animated loading>
          <template #template>
            <el-card shadow="hover" class="border-0">
              <template #header>
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </template>
              <el-skeleton-item variant="h3" style="width: 80%" />
              <el-divider direction="horizontal"></el-divider>
              <div class="flex justify-between text-sm text-gray-500">
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 10%" />
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
      
      <el-col v-else :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">{{ item.unit }}</el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <!-- {{ item.value }} -->
            <CountTo :value="item.value" />
          </span>
          <el-divider direction="horizontal"></el-divider>
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <index-navs />

    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <index-chart />
      </el-col>
      <el-col :span="12" :offset="0"></el-col>
    </el-row>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mainStore } from '@/store/index'
import { getStatistics1 } from '@/api/index'
import CountTo from '@/components/CountTo.vue'
import IndexNavs from '../components/IndexNavs.vue'
import IndexChart from '../components/IndexChart.vue'

const store = mainStore()

const panels = ref([])

getStatistics1().then(res => {
  panels.value = res.data.panels
})

</script>
