<template>
  <el-container>
      <el-header>
        <GlobalHeader />
      </el-header>
      <el-container>
        <el-aside>
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
</script>