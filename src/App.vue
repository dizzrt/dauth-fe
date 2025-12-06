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

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>
