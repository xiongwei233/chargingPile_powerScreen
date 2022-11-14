import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

class HYRequest {
  // 这个就是axios的实例
  instance: AxiosInstance
  // 装当前axios实例的拦截器
  interceptors?: RequestInterceptors

  constructor(baseURL: string, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'get' })
  }

  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'post' })
  }
}

export default new HYRequest(import.meta.env.VITE_APP_API_BASEURL, import.meta.env.VITE_APP_API_TIMEOUT)
