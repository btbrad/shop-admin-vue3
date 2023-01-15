<template>
  <el-card shadow="never" class="mt-5">
    <template #header>
    <div class="flex justify-between">
      <span class="text-sm">订单统计</span>
      <div>
        <el-check-tag v-for="(item, index) in options" :key="index" :checked="current === item.value" @click="handleChoose(item.value)" style="margin-right: 8px">
          {{ item.text }}
        </el-check-tag>
      </div>
    </div>
    </template>
    <div ref="el" id="chart" style="width: 100%;height: 300px;"></div>    
  </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { getStatistics3 } from '@/api/index'
import { useResizeObserver } from '@vueuse/core'

const current = ref('week')
const options = [
  {
    text: '近1个月',
    value: 'month'
  },
  {
    text: '近1周',
    value: 'week'
  },
  {
    text: '近24小时',
    value: 'hour'
  },
]

const handleChoose = val => { 
  current.value = val
  getData()
}

let myChart = null

// 初始化echarts
onMounted(() => {
  const chartDom = document.querySelector('#chart')
  myChart = echarts.init(chartDom)

  getData()
})

const getData = () => {
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  myChart.ShowLoading = true
  getStatistics3(current.value).then(res => {
    const { x, y } = res.data
    option.xAxis.data = x
    option.series[0].data = y

    option && myChart.setOption(option);
  }).finally(()=> {
    myChart.ShowLoading = false
  })
}

const el = ref(null)
useResizeObserver(el, () => {
  myChart.resize()
})

onBeforeUnmount(() => {
  if(myChart) echarts.disposal(myChart)
})
</script>