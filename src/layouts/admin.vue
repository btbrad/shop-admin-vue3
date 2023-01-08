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
          <router-view />
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
</style>