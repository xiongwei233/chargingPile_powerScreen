export interface ChargingPileData {
  value: number
  name: string
  percentage: string
  color: string
}

export interface ProcessMonitoringData {
  name: string
  data: number[]
}

export interface ChargingStatisticsData {
  name: string
  value: number
}

export interface ExceptionMonitoringData {
  id: number
  name: string
  value: number
  dur: string
  begin: string
}

/**
 * 生成
 */

export interface PowerscreenData {
  chargingPile: ChargingPile
  processMonitoring: ProcessMonitoring
  dataAnalysis: DataAnalysis
  chargingTop4: ChargingTop4
  chargingStatistics: ChargingStatistics
  exceptionMonitoring: ExceptionMonitoring
}

interface ExceptionMonitoring {
  name: string
  data: ExceptionMonitoringData[]
}

interface ChargingStatistics {
  name: string
  data: ChargingStatisticsData[]
}

interface ChargingTop4 {
  name: string
  totalPercentage: number
  data: RightTopPanelType[]
}

export interface RightTopPanelType {
  id: number
  name: string
  percentage: string
}

interface DataAnalysis {
  name: string
  data: ChargingPilePanel[]
}

export interface ChargingPilePanel {
  id: number
  title: string
  totalNum: number
  unit: string
  percentage: number
  isUp: boolean
}

interface ProcessMonitoring {
  name: string
  data: ProcessMonitoringData[]
}

interface ChargingPile {
  name: string
  data: ChargingPileData[]
}
