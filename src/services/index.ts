import type { PowerscreenData } from '@/types/home'
import hyRequest from './request'

/**
 * 获取新能源充电桩页面的数据( get请求,不需要参数 )
 * @returns
 */
export function getPowerScreenDataAPI() {
  return hyRequest.get<PowerscreenData>({
    url: '/powerscreen'
  })
}
