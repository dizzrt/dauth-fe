import { Get } from '@/utils/request';
import type { UserInfoResp } from '../types/identity';

export const GetUserInfo = (uid: number) => {
  const url = `/identity/user/${uid}`;
  return Get<UserInfoResp>(url);
};
