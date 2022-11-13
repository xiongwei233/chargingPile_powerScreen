<script setup lang="ts">
import PieEcharts from '@/components/pie-echarts.vue'
import LineEcharts from '@/components/line-echarts.vue'
import BarEcharts from '@/components/bar-echarts.vue'
import RightBottomSvg from '@/components/right-bottom-svg.vue'
import CenterSvg from '@/components/center-svg.vue'
import PanelItems from '@/components/bottom-panel.vue'
import RightTopPanel from '@/components/right-top-panel.vue'

import {
  processMonitoringData,
  chargingPileData,
  chargingStatisticsData,
  exceptionMonitoringData,
  chargingPilePanelData,
  rightTopPanelData
} from './config/data'
import type {
  ChargingPilePanel,
  ChargingPileData,
  ChargingStatisticsData,
  ExceptionMonitoringData,
  ProcessMonitoringData,
  RightTopPanelType
} from '@/types/home'

import { getPowerScreenDataAPI } from '@/services'
import { onMounted, ref } from 'vue'

// 充电桩饱和比例
const chargingPile = ref<ChargingPileData[]>(chargingPileData)
// 流程监控
const processMonitoring = ref<ProcessMonitoringData[]>(processMonitoringData)
//充电桩数据分析
const chargingStatistics = ref<ChargingStatisticsData[]>(chargingStatisticsData)
// 异常监控
const exceptionMonitoring = ref<ExceptionMonitoringData[]>(exceptionMonitoringData)
const dataAnalysis = ref<ChargingPilePanel[]>(chargingPilePanelData)
const rightTopPanel = ref<RightTopPanelType[]>(rightTopPanelData)
const percentage = ref(0)

onMounted(async () => {
  const res = await getPowerScreenDataAPI()
  console.log(res)
  chargingPile.value = res.chargingPile.data
  processMonitoring.value = res.processMonitoring.data
  chargingStatistics.value = res.chargingStatistics.data
  exceptionMonitoring.value = res.exceptionMonitoring.data
  dataAnalysis.value = res.dataAnalysis.data
  rightTopPanel.value = res.chargingTop4.data
  percentage.value = res.chargingTop4.totalPercentage
})
</script>

<template>
  <main class="screen-bg">
    <header class="header" />

    <div class="left-top">
      <pie-echarts :echart-datas="chargingPile" />
    </div>

    <div class="left-bottom">
      <line-echarts :echart-datas="processMonitoring" />
    </div>

    <div class="right-top">
      <right-top-panel :panelItems="rightTopPanel" :percentage="percentage" />
    </div>
    <div class="right-center">
      <bar-echarts :echart-datas="chargingStatistics" />
    </div>
    <div class="right-bottom">
      <right-bottom-svg :dots="exceptionMonitoring" />
    </div>

    <div class="center">
      <center-svg />
    </div>
    <div class="bottom">
      <panel-items :panelItems="dataAnalysis" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.screen-bg {
  /* 定位 */
  position: absolute;
  width: 100%;
  height: 100%;

  /* 背景 */
  background-color: #070a3c;
  background-image: url(../assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.header {
  /* 定位 */
  position: absolute;
  top: 21px;
  height: 56px;
  width: 100%;

  /* 背景 */
  background-image: url(../assets/images/bg_header.svg);
  background-repeat: no-repeat;
}

.left-top {
  /* 定位 */
  position: absolute;
  left: 16px;
  top: 116px;
  width: 536px;
  height: 443px;

  /* 背景 */
  background-image: url(../assets/images/bg_left-top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.left-bottom {
  /* 定位 */
  position: absolute;
  left: 16px;
  bottom: 49px;
  width: 536px;
  height: 443px;

  /* 背景 */
  background-image: url(../assets/images/bg_left_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_center.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/images/bg_right_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(../assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
