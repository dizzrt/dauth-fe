<template>
  <RouterView class="wrapper"/>
</template>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
