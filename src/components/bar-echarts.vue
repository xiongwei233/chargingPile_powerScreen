<script lang="ts"></script>

<script setup lang="ts">
import type { ChargingStatisticsData } from '@/types/home'
import { onMounted, ref, watch } from 'vue'
import useEcharts, { type UseEcharts } from '@/hooks/useEcharts'
import type { EChartsCoreOption } from 'echarts'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    echartDatas: Array<ChargingStatisticsData>
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
const setupEchart = (echartDatas: Array<ChargingStatisticsData>) => {
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

const getOption = (data: Array<ChargingStatisticsData>) => {
  const statisticsName = data.map((v) => v.name)
  const statisticsValue = data.map((v) => v.value)

  const option: EChartsCoreOption = {
    // backgroundColor: 'rbg(40,46,72)',
    grid: {
      left: '5%',
      right: '5%',
      top: '30%',
      bottom: '5%',
      containLabel: true // grid 区域是否包含坐标轴的刻度标签
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'white'
      },

      data: statisticsName
    },
    yAxis: {
      name: '个',
      nameTextStyle: {
        color: 'white',
        fontSize: 13
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF'
        }
      },
      axisLabel: {
        color: 'white'
      }
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        barWidth: 17,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#01B1FF' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#033BFF' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        data: statisticsValue
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
