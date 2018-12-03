<template>
  <div class="charts-wrapper" :id="chartId"></div>
</template>

<script>
export default {
  name: 'horizontal-bar-charts',
  props: {
    chartId: {
      type: String,
      default: 'horizontal-bar-charts'
    },
    source: {
      type: Object
    },
    colorDic: {
      type: Object,
      default: () => {
        return {
          fillColor: ['rgba(164,24,77,0.9)', 'rgba(154,53,18,0.9)', 'rgba(156,88,14,0.9)', 'rgba(49,68,168,0.9)'],
          borderColor: ['#d92b75', '#ca5637', '#cb7729', '#425ad8']
        }
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    source: function (newSource) {
      if (this.chart === null) {
        this.chart = this.initCharts()
      }
      this.updateCharts(newSource)
    }
  },
  methods: {
    initCharts () {
      let el = document.getElementById(this.chartId)
      let charts = this.$echarts.init(el)
      return charts
    },
    initData (source) {
      // const defaultFillColor = this.colorDic.fillColor[this.colorDic.fillColor.length - 1]
      const lightBlue = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(15, 154, 255, .8)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(66, 234, 249, .8)' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      }
      const darkBlue = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(0, 84, 255, .8)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(129, 124, 251, .8)' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      }
      const _source = []
      Object.entries(source).forEach(([key, value]) => {
        _source.push({
          des: key,
          value
        })
      })
      let yAxis = []
      let data = []
      _source.map((info, index) => {
        yAxis.unshift(info['des'])
        data.unshift({
          name: info['des'],
          value: info['value'],
          itemStyle: { normal: {
            color: index % 2 ? lightBlue : darkBlue
          }}
        })
      })
      return { yAxis, data }
    },
    updateCharts (source) {
      const data = this.initData(source)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          textStyle: {
            fontSize: 24
          },
          backgroundColor: 'rgba(0, 0, 0, .5)',
          padding: [15, 30]
        },
        grid: {
          top: '8%',
          left: '4%',
          right: '8%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitNumber: 8,
          axisLabel: {
            color: '#00deff',
            show: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#1b357e',
              type: 'dashed',
              fontSize: 18
            }
          }
        },
        yAxis: {
          type: 'category',
          data: data.yAxis,
          axisLabel: {
            color: '#ccd4fd',
            fontSize: 24,
            formatter: this.formatLabel
          },
          axisLine: {
            lineStyle: {
              color: '#2b386a'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          barWidth: '50%',
          data: data.data,
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
              color: '#fff',
              fontSize: 24
            }
          }
        }]
      })
    },
    formatLabel (value, index) {
      let name = value
      if (value.length > 7) {
        name = value.slice(0, 7) + '...'
      }
      return name
    }
  },
  mounted () {
    this.chart = this.initCharts()
    this.updateCharts(this.source)
  }
}
</script>

<style scoped>
  .charts-wrapper{
    height: 100%;
    width: 100%;
  }
</style>
