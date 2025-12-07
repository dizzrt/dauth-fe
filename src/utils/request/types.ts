import type { AxiosResponse, CancelTokenSource, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@/api/types/base';

// biome-ignore lint/suspicious/noExplicitAny: No need.
export interface RequestOptions extends InternalAxiosRequestConfig<any> {
  cancelRepeat?: boolean; // whether to cancel duplicate requests (default true)
}

export interface PendingRequest {
  source: CancelTokenSource; // cancel token source
  url: string | undefined; // request URL
}

export type RequestErrorType =
  | 'ERROR_NETWORK'
  | 'ERROR_TIMEOUT'
  | 'ERROR_CANCELLED'
  | 'ERROR_BUSINESS'
  | 'ERROR_SYSTEM';

export interface RequestError {
  type: RequestErrorType;
  message: string;
  code?: number;
  response?: AxiosResponse<ApiResponse>;
}
