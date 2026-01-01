import type { LoginResp, UserInfoResp } from '@/types/api';
import { Get, Post } from '@/utils/request';

export const IdentityLogin = (account: string, password: string) => {
  const url = `/identity/user/login`;
  return Post<LoginResp>(url, { account, password });
};

export const IdentityGetUserInfo = (uid: number) => {
  const url = `/identity/user/${uid}`;
  return Get<UserInfoResp>(url);
};
