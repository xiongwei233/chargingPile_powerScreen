import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器的类型
export interface RequestInterceptors<T = AxiosResponse> {
  // 请求成功和错误的类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  // 响应成功和错误的类型
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 表示接收拦截器和请求的配置
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}
