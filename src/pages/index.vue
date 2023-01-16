<template>
  <div>
    <!-- 首页{{ store.user.username }} -->
    <el-row v-permission="['getStatistics1,GET']" :gutter="20">
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
    <index-navs/>

    <el-row class="mt-5" :gutter="20">
      <el-col :span="12" :offset="0">
        <index-chart v-permission="['getStatistics3,GET']" />
      </el-col>
      <el-col v-permission="['getStatistics2,GET']"  :span="12" :offset="0">
        <index-card title="店铺及商品提示" tag="店铺及商品提示" :data="goods" />
        <index-card class="mt-3" title="交易提示" tag="需要立即处理的交易订单" :data="order" />
      </el-col>
    </el-row>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mainStore } from '@/store/index'
import { getStatistics1, getStatistics2 } from '@/api/index'
import CountTo from '@/components/CountTo.vue'
import IndexNavs from '../components/IndexNavs.vue'
import IndexChart from '../components/IndexChart.vue'
import IndexCard from '../components/IndexCard.vue'

const store = mainStore()

const panels = ref([])
const goods = ref([])
const order = ref([])

getStatistics1().then(res => {
  panels.value = res.data.panels
})

getStatistics2().then(res => {
  const { goods: goodsData, order: orderData } = res.data
  goods.value = goodsData
  order.value = orderData
})
</script>
