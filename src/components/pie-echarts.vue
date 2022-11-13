<script setup lang="ts">
import type { ChargingPileData } from '@/types/home'
import { onMounted, ref, watch } from 'vue'
import useEcharts, { type UseEcharts } from '@/hooks/useEcharts'
import type { EChartsCoreOption } from 'echarts'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    echartDatas: Array<ChargingPileData>
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
const setupEchart = (echartDatas: Array<ChargingPileData>) => {
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

const getOption = (pieDatas: Array<ChargingPileData> = []) => {
  let colors = pieDatas.map((item) => {
    return item.color
  })

  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name
    }
  })

  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1
  }, 0)

  const option: EChartsCoreOption = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: '50%',
      left: '30%',
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: 'white',
            padding: [10, 0]
          },
          number: {
            fontSize: 24,
            color: 'white',
            padding: [4, 0, 0, 20]
          }
        }
      }
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: '18%',
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: 'rect',
      formatter: function (name: any) {
        var currentItem: any = pieDatas.find((item) => item.name === name)
        return (
          '{nameSty|' +
          currentItem.name +
          '}\n' +
          '{numberSty|' +
          currentItem.value +
          '个 }' +
          '{preSty|' +
          currentItem.percentage +
          '}'
        )
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: '#FFFFFF',
            padding: [10, 14]
          },
          numberSty: {
            fontSize: 12,
            color: '#40E6ff',
            padding: [0, 0, 0, 14]
          },
          preSty: {
            fontSize: 12,
            color: '#40E6ff'
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        center: ['40%', '57%'],
        radius: ['30%', '75%'],
        label: {
          show: false
        },
        data: data,
        roseType: 'area'
      }
    ]
  }

  return option
}
</script>

<template>
  <div ref="pieRef" :style="{ width, height }"></div>
</template>

<style scoped lang="scss"></style>
