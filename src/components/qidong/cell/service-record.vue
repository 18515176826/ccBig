<template>
  <div class='bar'>
    <div :id='chartId' class='chart-wrap' />
  </div>
</template>
<script>
import _lodash_findIndex from 'lodash/findIndex'
import _lodash_sortBy from 'lodash/sortBy'
import _lodash_ceil from 'lodash/ceil'
import _lodash_round from 'lodash/round'
export default {
  props: {
    chartId: {
      type: String,
      default: 'recordChart'
    },
    source1: {
      type: Object,
      default: () => {
        return {}
      }
    },
    source2: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      charts: null,
      source: {}
    }
  },
  watch: {
    source1: function (newSource) {
      this.source = {
        source1: newSource,
        source2: this.source2
      }
      this.updateCharts(this.source)
    },
    source2: function (newSource) {
      this.source = {
        source1: this.source1,
        source2: newSource
      }
      this.updateCharts(this.source)
    }
  },
  created () {
    this.source = {
      source1: this.source1,
      source2: this.source2
    }
  },
  mounted () {
    this.charts = this.initCharts()
    this.updateCharts(this.source)
  },
  methods: {
    initCharts () {
      const el = document.getElementById(this.chartId)
      const charts = this.$echarts.init(el)
      return charts
    },
    initData (source) {
      const xAxis = []
      const data1 = []
      const data2 = []
      Object.entries(source.source1).forEach(([key, value]) => {
        xAxis.push(key)
        data1.push(value)
      })
      Object.entries(source.source2).forEach(([key, value]) => {
        data2.push(value)
      })
      return { xAxis, data1, data2 }
    },
    updateCharts (source) {
      const info = this.initData(source)
      this.charts && this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            fontSize: 24
          },
          backgroundColor: 'rgba(0, 0, 0, .5)',
          padding: [15, 30]
        },
        legend: {
          show: true,
          top: '50',
          right: '40',
          textStyle: {
            color: '#9ab9f3',
            fontSize: 24
          },
          data: [
            { name: '特殊人群', icon: 'roundRect' },
            { name: '关怀对象', icon: 'roundRect' }
          ]
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside'
        }],
        xAxis: [
          {
            type: 'category',
            data: info.xAxis,
            axisLabel: {
              color: '#a1b0d3',
              fontSize: 26,
              fontWeight: 500,
              interval: 0,
              rotate: 45,
              formatter: function (value) {
                let rst = value
                const maxLen = 8
                const substrStartIndex = 0
                const substrEndIndex = 5
                if (value.length > maxLen) {
                  const valSubStr = value.substr(substrStartIndex, substrEndIndex)
                  // rst = value.substr(0, 5) + '...'
                  rst = `${valSubStr}...`
                }
                return rst
              }
            },
            axisLine: {
              lineStyle: {
                color: '#2b386a'
                // color: 'rgba(67, 70, 83, .6)',
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [{
          type: 'value',
          minInterval: 1,
          axisLine: {
            lineStyle: {
              // color: 'rgba(67, 70, 83, .6)',
              color: '#2b386a',
              width: 1
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(67, 70, 83, .6)'
            }
          },
          axisLabel: {
            color: '#6571b6',
            fontSize: 28
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '特殊人群',
          type: 'line',
          barWidth: 15,
          showSymbol: false,
          smooth: true,
          data: info.data1,
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(49, 151, 255, .8)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(49, 151, 255, .1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }, {
          name: '关怀对象',
          type: 'line',
          barWidth: 15,
          showSymbol: false,
          smooth: true,
          data: info.data2,
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(39, 255, 226, .8)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(39, 255, 226, .1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }],
        color: ['#2675f7', '#2df8dd']
      })
    }
  }
}
</script>
<style scoped>
.bar{
  width: 100%;
  height:100%;
  position: relative;
}
.chart-wrap{
  width: 100%;
  height:100%;
}
.area-info-wrapper{
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
}
.area-menu-wrapper{
  flex: 1;
  margin-right: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;

}
.menu-item{
  flex: 1;
  color: #00deff;
  font-size: 20px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
}
.active {
  color: #2d8cf0;
  font-size: 18px;
  border-bottom: 2px solid #2d8cf0;
}
.disabled{
  color: #dedede;
}
</style>
