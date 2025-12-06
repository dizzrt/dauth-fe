<template>
  <n-watermark
    v-if="props.watermarkProps.enabled"
    fullscreen
    :content="props.watermarkProps.content"
    :cross="props.watermarkProps.cross ?? true"
    :font-size="props.watermarkProps.fontSize"
    :line-height="props.watermarkProps.lineHeight ?? 16"
    :width="props.watermarkProps.width ?? 384"
    :height="props.watermarkProps.height ?? 384"
    :x-offset="props.watermarkProps.xOffset ?? 12"
    :y-offset="props.watermarkProps.yOffset ?? 60"
    :rotate="props.watermarkProps.rotate ?? -15"
  />

  <n-layout class="flex wh-full" content-class="n-layout-content-style">
    <n-layout-header
      v-if="props.hasHeader"
      class="w-full"
      :style="{ 'height': props.headerProps.height ?? DEFAULT_HEADER_HEIGHT }"
    >
      <slot name="header"/>
    </n-layout-header>

    <n-layout-content class="flex-1" content-class="n-layout-content-style">
      <n-layout :has-sider="props.hasSider" class="flex wh-full" content-class="n-layout-content-style">
        <n-layout-sider
          v-if="props.hasSider"
          collapse-mode="width"
          :collapsed-width="0"
          :width="props.siderProps.width ?? DEFAULT_SIDER_WIDTH"
          :show-collapsed-content="false"
          :show-trigger="props.siderProps.collapsible? 'bar' : false"
          :native-scrollbar="false"
        >
          <slot name="sider"/>
        </n-layout-sider>

        <n-layout-content class="flex flex-1" content-class="n-layout-content-style" embedded :native-scrollbar="false">
          <slot/>

          <n-layout-footer
            v-if="props.hasFooter"
            class="w-full mt-auto shrink-0"
            :style="{ 'height': props.footerProps.height ?? DEFAULT_FOOTER_HEIGHT }"
          >
            <slot name="footer"/>
          </n-layout-footer>
        </n-layout-content>
      </n-layout>
    </n-layout-content>
  </n-layout>
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

<script lang="ts" setup>
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NLayoutSider, NWatermark } from 'naive-ui';
import { DEFAULT_FOOTER_HEIGHT, DEFAULT_HEADER_HEIGHT, DEFAULT_SIDER_WIDTH, DefaultLayoutProps } from './types';

const props = defineProps(DefaultLayoutProps);
</script>
