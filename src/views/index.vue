<template>
  <default-layout
    has-header
    has-sider
    has-footer
    :sider-props="{ collapsible: true }"
    :watermark-props="{ enabled: true, content: 'DAUTH' }"
    :theme="theme"
  >
    <template #header>
      <d-header @switch-theme="switchTheme">
        <div>header</div>
      </d-header>
    </template>

    <template #footer>
      <div>footer</div>
    </template>

    <template #sider>
      <div>sider</div>
    </template>

    <RouterView/>
  </default-layout>
</template>

<script setup lang="ts">
import type { GlobalTheme } from 'naive-ui';
import { darkTheme } from 'naive-ui';
import { ref } from 'vue';
import { DHeader } from '@/components';
import { DefaultLayout } from '@/layouts';

const theme = ref<GlobalTheme | null>(null);
const switchTheme = (isDark: boolean): void => {
  theme.value = isDark ? darkTheme : null;
};
</script>
