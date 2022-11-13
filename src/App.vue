<script setup lang="ts">
import useScalcPage from '@/hooks/useScalcPage'

// 设计稿尺寸
const options = {
  targetX: 1920,
  targetY: 1080,
  targetRatio: 16 / 9
}
// 大屏适配
useScalcPage(options)
</script>

<template>
  <router-view />
</template>
