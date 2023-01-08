<template>
  <div :class="['global-menu', { 'isExpand': isExpand, 'isCollapsed': !isExpand }]">
    <el-menu
        default-active="2"
        class="border-none"
        :collapse="!isExpand"
        :collapse-transition="false"
        unique-opened
        @select="handleSelect"
      >
        <template v-for="(item, index) in asideMenus" :key="index">
          <el-sub-menu v-if="item.children && item.children.length" :index="item.name">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(child, idx) in item.children" :key="idx" :index="child.frontpath">{{ child.name }}</el-menu-item>
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
import { useRouter } from 'vue-router'
import useMenuExpand from '../hooks/useMenuExpand'

const router = useRouter()

const { isExpand } = useMenuExpand()

const asideMenus = [
  {
    "name": "后台面板",
    "icon": "help",
    "children": [
      {
        "name": "用户列表",
        "icon": "help",
        "frontpath": "/userList"
      },
      {
        "name": "商品列表",
        "frontpath": "/goods/list",
        "icon": "help"
      }
    ]
  }
]

const handleSelect = (path) => {
  router.push(path)
}
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
</style>