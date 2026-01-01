import type { User } from '@/types';
import type { BaseResp } from '@/types/api';

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
