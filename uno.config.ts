import { defineConfig, presetWind3 } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  },
  presets: [presetWind3()],
  shortcuts: {
    'wh-full': 'w-full h-full',
  },
});
