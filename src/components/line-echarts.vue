<script lang="ts"></script>

<script setup lang="ts">
import type { ProcessMonitoringData } from '@/types/home'
import { onMounted, ref, watch } from 'vue'
import useEcharts, { type UseEcharts } from '@/hooks/useEcharts'
import type { EChartsCoreOption } from 'echarts'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    echartDatas: Array<ProcessMonitoringData>
  }>(),
  {
    width: '100%',
    height: '100%'
  }
)
const pieRef = ref<HTMLElement | null>(null)
// 注册
onMounted(() => setupEchart(props.echartDatas))

let mychart: UseEcharts
const setupEchart = (echartDatas: Array<ProcessMonitoringData>) => {
  if (!mychart) {
    mychart = useEcharts(pieRef.value!)
  }
  let option = getOption(echartDatas)
  mychart.setOption(option)
}

// 监听 echartDatas 的变化，改变更新数据
watch(
  () => props.echartDatas,
  (newVal) => {
    setupEchart(newVal)
  }
)

const getOption = (data: Array<ProcessMonitoringData>) => {
  const option: EChartsCoreOption = {
    // backgroundColor: 'rbg(40,46,72)',
    grid: {
      left: '5%',
      right: '1%',
      top: '20%',
      bottom: '15%',
      containLabel: true // grid 区域是否包含坐标轴的刻度标签
    },
    legend: {
      right: 'center',
      bottom: '5%',
      itemGap: 20,
      itemWidth: 13,
      itemHeigth: 12,
      textStyle: {
        color: '#64BCFF'
      },
      icon: 'rect'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#20FF89'
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#64BCFF'
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          color: '#64BCFF'
        }
      }
    ],
    series: [
      {
        name: data[0]?.name,
        type: 'line',
        smooth: true,
        stack: '总量',
        symbolSize: 5,
        showSymbol: false,
        itemStyle: {
          color: '#20FF89',
          lineStyle: {
            color: '#20FF89',
            width: 2
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#20FF89'
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
              }
            ]
          }
        },
        data: data[0]?.data
      },
      {
        name: data[1]?.name,
        type: 'line',
        smooth: true,
        stack: '总量',
        symbolSize: 5,
        showSymbol: false,
        itemStyle: {
          color: '#EA9502',
          lineStyle: {
            color: '#EA9502',
            width: 2
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#EA9502'
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
              }
            ]
          }
        },
        data: data[1]?.data
      }
    ]
  }
  return option
}
</script>

<template>
  <div ref="pieRef" :style="{ width, height }" class="line-echarts"></div>
</template>

<style scoped lang="scss"></style>
