import type { BaseResp } from './base';

export interface User {
  id: number;
  username: string;
  email: string;
  status: number;
  last_login_at: number;
  created_at: number;
  updated_at: number;
}

export interface UserInfoResp {
  base_resp: BaseResp;
  user: User;
}
