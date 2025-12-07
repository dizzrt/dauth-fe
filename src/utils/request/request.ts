import type { AxiosError, AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios';
import axios, { isCancel } from 'axios';
import type { ApiResponse } from '@/api/types/base';
import type { PendingRequest, RequestError, RequestOptions } from './types';

const pendingRequests = new Map<string, PendingRequest>();

const client: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const requestKey = (options: RequestOptions): string => {
  const { url, method, params, data } = options;
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('_');
};

const cancelRepeatRequest = (options: RequestOptions): void => {
  const key = requestKey(options);
  if (pendingRequests.has(key)) {
    const pending = pendingRequests.get(key);
    if (!pending) {
      return;
    }

    const { source } = pending;
    if (source) {
      source.cancel(`duplicate request cancelled: ${options.url}`);
      pendingRequests.delete(key);
    }
  }
};

const addPendingRequest = (options: RequestOptions): void => {
  if (options.cancelRepeat !== false) {
    const key = requestKey(options);
    const source: CancelTokenSource = axios.CancelToken.source();
    options.cancelToken = source.token;
    pendingRequests.set(key, { source, url: options.url });
  }
};

const removePendingRequest = (options: RequestOptions): void => {
  const key = requestKey(options);
  if (pendingRequests.has(key)) {
    pendingRequests.delete(key);
  }
};

const handleError = (error: AxiosError): RequestError => {
  if (isCancel(error)) {
    return {
      type: 'ERROR_CANCELLED',
      message: error.message || 'request cancelled',
    };
  }

  if (!error.response) {
    const isTimeout = error.message.includes('timeout');
    return {
      type: isTimeout ? 'ERROR_TIMEOUT' : 'ERROR_NETWORK',
      message: isTimeout ? 'request timeout, please try again' : 'network error, please check your network connection',
    };
  }

  const { status, data } = error.response;
  if (status < 200 || status >= 300) {
    return {
      type: 'ERROR_SYSTEM',
      message: `request failed, HTTP status code: ${status}`,
      code: status,
      response: error.response as AxiosResponse<ApiResponse>,
    };
  }

  const temp = data as ApiResponse;
  return {
    type: 'ERROR_BUSINESS',
    message: temp.message || 'business error',
    code: temp.status,
    response: error.response as AxiosResponse<ApiResponse>,
  };
};

// request interceptor
client.interceptors.request.use(
  (options: RequestOptions) => {
    cancelRepeatRequest(options);
    addPendingRequest(options);

    // TODO inject auth token

    return options;
  },
  (error: AxiosError) => {
    return Promise.reject(handleError(error));
  }
);

// response interceptor
client.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    removePendingRequest(response.config as RequestOptions);

    const res = response.data as ApiResponse;
    if (res.status !== 0) {
      throw {
        type: 'business_error',
        message: res.message || 'business error',
        code: res.status,
        response,
      };
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.config) {
      removePendingRequest(error.config as RequestOptions);
    }

    return Promise.reject(handleError(error));
  }
);

// biome-ignore-start lint/suspicious/noExplicitAny: No need.

/**
 * Generic GET request
 * @template T Response data type
 * @param url Request URL
 * @param params URL parameters
 * @param options Custom configuration
 * @returns Promise<ApiResponse<T>>
 */
export const Get = <T = any>(
  url: string,
  params?: Record<string, any>,
  options: RequestOptions = {} as RequestOptions
): Promise<ApiResponse<T>> => {
  return client.get(url, { params, ...options }).then((res) => res.data);
};

/**
 * Generic POST request
 * @template T Response data type
 * @param url Request URL
 * @param data Request data
 * @param options Custom configuration
 * @returns Promise<ApiResponse<T>>
 */
export const Post = <T = any, D = any>(
  url: string,
  data?: D,
  options: RequestOptions = {} as RequestOptions
): Promise<ApiResponse<T>> => {
  return client.post(url, data, options).then((res) => res.data);
};

/**
 * Generic PUT request
 * @template T Response data type
 * @param url Request URL
 * @param data Request data
 * @param options Custom configuration
 * @returns Promise<ApiResponse<T>>
 */
export const Put = <T = any, D = any>(
  url: string,
  data?: D,
  options: RequestOptions = {} as RequestOptions
): Promise<ApiResponse<T>> => {
  return client.put(url, data, options).then((res) => res.data);
};

/**
 * Generic DELETE request
 * @template T Response data type
 * @param url Request URL
 * @param params URL parameters
 * @param options Custom configuration
 * @returns Promise<ApiResponse<T>>
 */
export const Delete = <T = any>(
  url: string,
  params?: Record<string, any>,
  options: RequestOptions = {} as RequestOptions
): Promise<ApiResponse<T>> => {
  return client.delete(url, { params, ...options }).then((res) => res.data);
};

// biome-ignore-end lint/suspicious/noExplicitAny: No need.
