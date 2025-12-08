import type { GlobalTheme } from 'naive-ui';

export const DEFAULT_SIDER_WIDTH = '240px';
export const DEFAULT_HEADER_HEIGHT = '60px';
export const DEFAULT_FOOTER_HEIGHT = '48px';

export type WatermarkProps = {
  enabled: boolean;
  content?: string;
  cross?: boolean;
  fontSize?: number;
  lineHeight?: number;
  width?: number;
  height?: number;
  xOffset?: number;
  yOffset?: number;
  rotate?: number;
};

const defaultWatermarkProps: WatermarkProps = {
  enabled: false,
};

export type HeaderProps = {
  height?: string;
};

const defaultHeaderProps: HeaderProps = {
  height: DEFAULT_HEADER_HEIGHT,
};

export type SiderProps = {
  width?: string;
  collapsible?: boolean;
  // isCollapsed?: boolean;
};

const defaultSiderProps: SiderProps = {
  width: DEFAULT_SIDER_WIDTH,
  collapsible: false,
};

export type FooterProps = {
  height?: string;
};

const defaultFooterProps: FooterProps = {
  height: DEFAULT_FOOTER_HEIGHT,
};

export const DefaultLayoutProps = {
  hasHeader: {
    type: Boolean,
    default: false,
  },
  hasSider: {
    type: Boolean,
    default: false,
  },

  hasFooter: {
    type: Boolean,
    default: false,
  },
  headerProps: {
    type: Object as () => HeaderProps,
    default: () => defaultHeaderProps,
  },
  siderProps: {
    type: Object as () => SiderProps,
    default: () => defaultSiderProps,
  },
  footerProps: {
    type: Object as () => FooterProps,
    default: () => defaultFooterProps,
  },
  watermarkProps: {
    type: Object as () => WatermarkProps,
    default: () => defaultWatermarkProps,
  },
  theme: {
    type: Object as () => GlobalTheme | null,
    default: null,
  },
};
