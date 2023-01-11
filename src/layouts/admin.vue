<template>
  <el-container>
      <el-header>
        <GlobalHeader />
      </el-header>
      <el-container>
        <el-aside :class="isExpand ? 'isExpand' : 'isCollapsed' ">
          <GlobalMenu />
        </el-aside>
        <el-main>
          <GlobalTagList />
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <keep-alive :max="10">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import GlobalHeader from './components/GlobalHeader.vue';
import GlobalMenu from './components/GlobalMenu.vue';
import GlobalTagList from './components/GlobalTagList.vue';
import useMenuExpand from './hooks/useMenuExpand'

const { isExpand } = useMenuExpand()
</script>

<style scoped>
.isExpand {
  transition: all 0.2s;
  width: 250px;
}
.isCollapsed {
  transition: all 0.2s;
  width: 64px;
}
.fade-enter-from {
  opacity: 0
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>