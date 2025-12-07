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
