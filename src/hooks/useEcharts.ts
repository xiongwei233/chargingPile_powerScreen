import type { EChartsCoreOption } from 'echarts'
import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

// 函数的类型
export interface UseEcharts {
  echartsInstance: echarts.ECharts
  setOption: (option: EChartsCoreOption) => void
  resizeEchart: () => void
}

/**
 * 注册和销毁 Echarts
 * @param divEl div标签实例
 */
export default function useEcharts(divEl: HTMLElement) {
  const echartsInstance = echarts.init(divEl, undefined, { renderer: 'svg' })

  // 销毁实例
  onUnmounted(() => echartsInstance.dispose())

  // 设置参数
  function setOption(option: EChartsCoreOption) {
    echartsInstance.setOption(option)
  }

  // 响应式
  function resizeEchart() {
    echartsInstance.resize()
  }

  return {
    echartsInstance,
    setOption,
    resizeEchart
  }
}
