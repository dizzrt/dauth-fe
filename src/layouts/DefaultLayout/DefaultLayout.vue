<template>
  <n-config-provider abstract class="wh-full" :theme="props.theme ?? null">
    <n-layout class="flex wh-full" content-class="n-layout-content-style">
      <n-layout-header
        v-if="props.hasHeader ?? false"
        class="w-full box-border border-b-1 border-b-solid"
        :style="{ 'height': props.headerProps?.height ?? DEFAULT_LAYOUT_STYLE.HEADER_HEIGHT, 'border-bottom-color': props.theme ? '#5454547a' : '#3c3c3c1f' }"
      >
        <slot name="header"/>
      </n-layout-header>

      <n-layout-content class="flex-1" content-class="n-layout-content-style">
        <n-layout :has-sider="props.hasSider ?? false" class="flex wh-full" content-class="n-layout-content-style">
          <n-layout-sider
            v-if="props.hasSider ?? false"
            collapse-mode="width"
            :collapsed-width="0"
            :width="props.siderProps?.width ?? DEFAULT_LAYOUT_STYLE.SIDER_WIDTH"
            :show-collapsed-content="false"
            :show-trigger="props.siderProps?.collapsible? 'bar' : false"
            :native-scrollbar="false"
          >
            <slot name="sider"/>
          </n-layout-sider>

          <n-layout-content
            class="flex flex-1"
            content-class="n-layout-content-style"
            embedded
            :native-scrollbar="false"
          >
            <slot/>

            <n-layout-footer
              v-if="props.hasFooter ?? false"
              class="w-full mt-auto shrink-0"
              :style="{ 'height': props.footerProps?.height ?? DEFAULT_LAYOUT_STYLE.FOOTER_HEIGHT }"
            >
              <slot name="footer"/>
            </n-layout-footer>
          </n-layout-content>
        </n-layout>
      </n-layout-content>
    </n-layout>

    <n-watermark
      v-if="props.watermarkProps?.enabled ?? false"
      fullscreen
      :content="props.watermarkProps?.content ?? ''"
      :cross="props.watermarkProps?.cross ?? true"
      :font-size="props.watermarkProps?.fontSize ?? 16"
      :line-height="props.watermarkProps?.lineHeight ?? 16"
      :width="props.watermarkProps?.width ?? 384"
      :height="props.watermarkProps?.height ?? 384"
      :x-offset="props.watermarkProps?.xOffset ?? 12"
      :y-offset="props.watermarkProps?.yOffset ?? 60"
      :rotate="props.watermarkProps?.rotate ?? -15"
    />
  </n-config-provider>
</template>

<style lang="css">
.n-layout-content-style {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

<style lang="css" scoped>
/* FIXME: biome can not parse vue3 specific pseudo-classes */
/* :deep(.n-scrollbar > .n-scrollbar-container) {
  display: flex;
} */

/* use ::v-deep with biome-ignore for now */
/* biome-ignore lint/correctness/noUnknownPseudoElement: biome unsupported yet */
::v-deep .n-scrollbar > .n-scrollbar-container {
  display: flex;
  flex-direction: column;
}
</style>

<script setup lang="ts">
import {
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NWatermark,
} from 'naive-ui';
import { DEFAULT_LAYOUT_STYLE } from '@/constants';
import type { DefaultLayoutProps } from './types';

const props = withDefaults(defineProps<DefaultLayoutProps>(), {});
</script>
