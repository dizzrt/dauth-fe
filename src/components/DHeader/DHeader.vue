<template>
  <n-flex class="mx-8" :wrap="false" :style="{ height: props.height ?? DEFAULT_LAYOUT_STYLE.HEADER_HEIGHT }">
    <slot/>

    <n-flex class="ml-auto items-center">
      <!-- TODO user avatar -->
      <n-dropdown :trigger="'click'" :options="avatarDropdownOptions" @select="avatarDropdownSelectHandler">
        <n-avatar class="cursor-pointer" round>{{ userStore.user?.username }}</n-avatar>
      </n-dropdown>

      <n-switch v-model:value="isDarkTheme" :rail-style="railStyle" @update:value="switchTheme">
        <template #checked-icon>
          <n-icon-wrapper
            :size="18"
            :style="{ borderRadius: '50%' }"
            :color="themeVars.baseColor"
            :icon-color="themeVars.textColorBase"
          >
            <n-icon :component="MoonOutline"/>
          </n-icon-wrapper>
        </template>

        <template #unchecked-icon>
          <n-icon-wrapper
            :size="18"
            :style="{ borderRadius: '50%' }"
            :color="'#FFF'"
            :icon-color="themeVars.textColor3"
          >
            <n-icon :component="SunnyOutline"/>
          </n-icon-wrapper>
        </template>
      </n-switch>
    </n-flex>
  </n-flex>
</template>

<style lang="less" scoped></style>

<script setup lang="ts">
import { LogOutOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5';
import { NAvatar, NDropdown, NFlex, NIcon, NIconWrapper, NSwitch, useThemeVars } from 'naive-ui';
import type { DropdownGroupOption, DropdownMixedOption, DropdownOption } from 'naive-ui/es/dropdown/src/interface';
import type { Component, CSSProperties } from 'vue';
import { h, ref } from 'vue';
import { DEFAULT_LAYOUT_STYLE } from '@/constants';
import { useUserStore } from '@/stores/user.store';
import type { DHeaderEmits, DHeaderProps } from './types';

const userStore = useUserStore();
const themeVars = useThemeVars();

const emits = defineEmits<DHeaderEmits>();
const props = withDefaults(defineProps<DHeaderProps>(), {});

const isDarkTheme = ref(false);
const switchTheme = (isDark: boolean): void => {
  emits('switchTheme', isDark);
};

const railStyle = ({ checked }: { checked: boolean }) => {
  const style: CSSProperties = {};

  if (checked) {
    style.border = '1px solid #545454a6';
    style.backgroundColor = '#2f2f2f';
  } else {
    style.border = '1px solid #3c3c3c4a';
    style.backgroundColor = '#f1f1f1';
  }

  return style;
};

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const avatarDropdownOptions: DropdownMixedOption[] = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutOutline),
  },
];

const avatarDropdownSelectHandler = (key: string | number, _option: DropdownOption | DropdownGroupOption): void => {
  if (key === 'logout') {
    userStore.logout();
  }
};
</script>
