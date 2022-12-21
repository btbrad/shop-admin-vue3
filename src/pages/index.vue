<template>
  <div>
    首页{{ store.user.username }}
  </div>
</template>

<script setup>
import { mainStore } from '@/store/index'

const store = mainStore()
</script>