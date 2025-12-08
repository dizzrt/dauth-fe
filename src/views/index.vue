<template>
  <DefaultLayout
    has-header
    has-sider
    has-footer
    :sider-props="{ collapsible: true }"
    :watermark-props="{ enabled: true, content: 'DAUTH' }"
    :theme="theme"
  >
    <template #header>
      <div>header</div>
    </template>

    <template #footer>
      <div>footer</div>
    </template>

    <template #sider>
      <div>sider</div>
    </template>

    <RouterView/>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import type { GlobalTheme } from 'naive-ui';
import { ref } from 'vue';
import { DefaultLayout } from '@/layouts';

const theme = ref<GlobalTheme | null>(null);
</script>
