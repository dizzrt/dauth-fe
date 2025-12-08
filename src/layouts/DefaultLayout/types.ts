import type { GlobalTheme } from 'naive-ui';

export const DEFAULT_SIDER_WIDTH = '240px';
export const DEFAULT_HEADER_HEIGHT = '64px';
export const DEFAULT_FOOTER_HEIGHT = '48px';

export interface HeaderProps {
  height?: string;
}

export interface SiderProps {
  width?: string;
  collapsible?: boolean;
  // isCollapsed?: boolean;
}

export interface FooterProps {
  height?: string;
}

export interface WatermarkProps {
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
}

export interface DefaultLayoutProps {
  hasHeader?: boolean;
  hasSider?: boolean;
  hasFooter?: boolean;
  headerProps?: HeaderProps;
  siderProps?: SiderProps;
  footerProps?: FooterProps;
  watermarkProps?: WatermarkProps;
  theme?: GlobalTheme | null;
}
