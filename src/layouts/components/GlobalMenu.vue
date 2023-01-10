<template>
  <div :class="['global-menu', { 'isExpand': isExpand, 'isCollapsed': !isExpand }]">
    <el-menu
        router
        class="border-none"
        :collapse="!isExpand"
        :collapse-transition="false"
        unique-opened
        :default-active="defaultActive"
        @select="handleSelect"
      >
        <template v-for="(item, index) in asideMenus" :key="index">
          <el-sub-menu v-if="item.children && item.children.length" :index="item.name">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(child, idx) in item.children" :key="idx" :index="child.frontpath">
              <el-icon><component :is="child.icon" /></el-icon>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu v-else :index="item.frontpath">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </el-sub-menu>
        </template>
      </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import useMenuExpand from '../hooks/useMenuExpand'
import { mainStore } from '@/store/index'

const router = useRouter()
const route = useRoute()

const store = mainStore()

const defaultActive = ref(route.path)

const { isExpand } = useMenuExpand()

const asideMenus = store.menus
const handleSelect = (path) => {
  defaultActive.value = path
  router.push(path)
}

onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path
})
</script>

<style scoped>
.global-menu {
  transition: all 0.2s;
  @apply fixed shadow-md bg-light-50;
  top: 64px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
.global-menu.isExpand {
  width: 250px;
}
.global-menu.isCollapsed {
  /* width: 64px; */
}
.global-menu::-webkit-scrollbar {
  width: 0;
}
</style>