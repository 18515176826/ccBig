<template>
  <div class="chart-cont" :id='chartId' />
</template>
<script>
export default {
  name: 'PictorialBar',
  props: {
    chartId: {
      type: String,
      default: () => 'pictorialBar'
    },
    source: {
      type: Object
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    source (newSource) {
      if (this.chart === null) {
        this.chart = this.initCharts()
      }
      this.updateCharts(newSource)
    }
  },
  mounted () {
    this.chart = this.initCharts()
    this.updateCharts(this.source)
  },
  methods: {
    initCharts () {
      let el = document.getElementById(this.chartId)
      let charts = this.$echarts.init(el)
      return charts
    },
    initSource (source) {
      const keys = []
      const values = []
      const obj = Object.assign({}, source)
      Object.entries(obj).forEach(([key, value]) => {
        keys.push(key)
        values.push({
          value
        })
      })
      return { keys, values }
    },
    updateCharts (source) {
      const data = this.initSource(source)
      // 颜色
      const lightBlue = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(0, 192, 255, 1)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(0, 192, 255, 0.1)' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      }
      const darkBlue = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(41, 121, 255, 1)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(41, 121, 255, 0.1)' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      }
      const option = {
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 24
          },
          backgroundColor: 'rgba(0, 0, 0, .5)',
          padding: [15, 30]
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          // boundaryGap: 100,
          boundaryGap: ['20%', '30%'],
          axisLine: {
            lineStyle: {
              color: '#2b386a',
              shadowColor: 'rgba(75, 211, 255, 0.5)',
              shadowBlur: 5
            }
          },
          axisTick: {
            interval: index => {
              if (index === -1 || index === 9) {
                return false
              } else {
                return true
              }
            }
          },
          axisLabel: {
            color: '#a1b0d3',
            fontSize: 26,
            fonrWeight: 500,
            interval: 0,
            // rotate: 45,
            formatter: function (value) {
              let rst = value
              const maxLen = 8
              const substrStartIndex = 0
              const substrEndIndex = 5
              if (value.length > maxLen) {
                const valSubStr = value.substr(
                  substrStartIndex,
                  substrEndIndex
                )
                // rst = value.substr(0, 5) + '...'
                rst = `${valSubStr}...`
              }
              return rst
            }
          },
          splitLine: {
            show: false
          },
          data: data.keys
        },
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#2b386a',
                shadowColor: 'rgba(75, 211, 255, 0.5)',
                shadowBlur: 5
              }
            },
            axisLabel: {
              color: '#6571b6',
              fontSize: 24
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(75, 211, 255, 0.2)',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            type: 'pictorialBar',
            barCategoryGap: '-60%',
            symbol: 'path://d="M11,88H89S76.09,83.88,65.87,66.27C58.48,53.51,50.2,5.93,50.2,5.93s-9.34,47.5-16.47,60.34C24.42,83.05,11,88,11,88Z"',
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#eee',
                fontSize: 24
              },
              emphasis: {
                show: true,
                position: 'top',
                color: 'rgba(34, 254, 255, 1)',
                fontSize: 24
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(72, 140, 253, .7)'
              },
              emphasis: {
                color: 'rgba(34, 254, 225, .7)'
              }
            },
            data: data.values
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
<style scoped>
.chart-cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
