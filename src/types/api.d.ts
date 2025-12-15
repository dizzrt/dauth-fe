import type { User } from '@/types';

// biome-ignore lint/suspicious/noExplicitAny: No need.
export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

export interface BaseResp {
  code: number;
  message: string;
}

export interface LoginResp {
  user: User;
  token: string;
  token_expires_at: number;
  base_resp: BaseResp;
}

export interface UserInfoResp {
  user: User;
  base_resp: BaseResp;
}
