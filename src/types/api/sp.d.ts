import type { BaseResp } from '@/types/api';
import type { ServiceProvider } from '../sp';

export interface CreateServiceProviderReq {
  name: string;
  description?: string;
  secret: string;
  redirect_uri: string;
  scopes: Array<number>;
}

export interface CreateServiceProviderResp {
  sp_id: number;
  base_resp: BaseResp;
}

export interface ListServiceProviderResp {
  sp_list: Array<ServiceProvider>;
  total: number;
  base_resp: BaseResp;
}
