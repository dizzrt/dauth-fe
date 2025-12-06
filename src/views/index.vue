<template>
  <DefaultLayout
    has-header
    has-sider
    has-footer
    :sider-props="{ collapsible: true }"
    :watermark-props="{ enabled: true, content: 'DAUTH' }"
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
import { DefaultLayout } from '@/layouts';
</script>
