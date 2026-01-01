import type { CreateServiceProviderReq, CreateServiceProviderResp, ListServiceProviderResp } from '@/types/api';
import { Post } from '@/utils/request';

export const CreateServiceProvider = (req: CreateServiceProviderReq) => {
  const url = `/sp/create`;
  return Post<CreateServiceProviderResp>(url, req);
};

export const ListServiceProvider = (page: number, pageSize: number) => {
  const url = `/sp/list`;
  return Post<ListServiceProviderResp>(url, {
    page: page,
    page_size: pageSize,
  });
};
