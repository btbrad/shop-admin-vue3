<template>
  <div class="global-tag-list">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-change="changeTab"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.name"
        :name="item.path"
        :closable="item.path !== '/home'"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link flex items-center">
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

const route = useRoute()
const router = useRouter()
const cookie = useCookies()

const activeTab = ref(route.path)
const tabList = ref([
  {
    name: '主控台',
    path: '/home'
  },
])

// 添加标签导航
const addTab = tab => {
  const item = tabList.value.find(t => t.path === tab.path)
  if (!item) {
    tabList.value.push(tab)
  }
  // cookie.set('tabList', tabList.value)
}

onBeforeRouteUpdate((to, from) => {
  addTab({
    name: to.meta.title,
    path: to.path
  })
  activeTab.value = to.path
})

const changeTab = (path) => {
  router.push(path)
  activeTab.value = path
}

const initTabList = () => {
  let localTabList = cookie.get('tabList')
  if (localTabList?.length) {
    tabList.value = localTabList
  }
}

initTabList()

watch(tabList, () => {
  cookie.set('tabList', tabList.value)
}, { deep: true })

const removeTab = (path) => {
  if (activeTab.value === path) {
    const idx = tabList.value.findIndex(t => t.path === path)
    activeTab.value = (tabList.value[idx - 1].path ? tabList.value[idx - 1].path : tabList.value[idx + 1].path)
  }
  tabList.value = tabList.value.filter(p => path !== p.path)
}

const onCommand = (c) => {
  if (c === 'clearAll') {
    activeTab.value = '/home'
    tabList.value = tabList.value.filter(p => p.path === '/home')
  }
  if (c === 'clearOther') {
    tabList.value = tabList.value.filter(p => (p.path === '/home' || p.path === activeTab.value))
  }
}
</script>

<style scoped>
.global-tag-list {
  height: 25px;
  margin-bottom: 10px;
  @apply flex items-center;
}
:deep(.el-tabs) {
  height: 100%;
  min-width: 100px;
}
:deep(.el-tabs__header,.el-tabs__nav-wrap) {
  height: 100% !important;
}
:deep(.el-tabs__nav-wrap) {
  height: 100%;
}
:deep(.el-tabs__nav-scroll) {
  height: 100%;
}
:deep(.el-tabs__nav), :deep(.el-tabs__item) {
  height: 100%;
}
:deep(.el-tabs__item) {
  line-height: 25px;
}
:deep(.el-tabs__nav-next), :deep(.el-tabs__nav-prev) {
  line-height: 25px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300；
}
</style>