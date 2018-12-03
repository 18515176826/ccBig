<template>
  <div class='bar'>
    <div :id='chartId' class='chart-wrap' />
    <div class='area-info-wrapper'>
      <div class='area-menu-wrapper'>
        <span
          :class='`menu-item ${currentAreaMenu === menu.des ?
            "active": ""} ${menu.disabled ? "disabled" : ""}`'
          @click='update(menu)'
          v-for='(menu, i) in menus'
          :key='i'>
          {{menu.des}}
        </span>
      </div>
    </div>
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
      default: 'chartId'
    },
    isShowTab: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => [{
        des: '特殊人群',
        disabled: false
      }, {
        des: '关怀对象',
        disabled: false
      }]
    },
    source: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      charts: '',
      currentAreaMenu: this.menus['0'].des || this.menus['1'].des
    }
  },
  watch: {
    source: function (newSource) {
      this.updateCharts(newSource)
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
      const data = []
      const currentIndex = _lodash_findIndex(this.menus, { des: this.currentAreaMenu })
      // currentIndex = currentIndex < 0 ? 0 : currentIndex
      const _source = Object.assign({}, source)
      const formatArr = []
      Object.entries(_source).forEach(([key, value]) => {
        formatArr.push({
          name: key,
          value
        })
      })
      formatArr.forEach((info) => {
        xAxis.push(info.name)
        data.push(info.value)
      })
      const max = this.getMax(formatArr, currentIndex)
      let dataZoomEnd = 100
      const maxXaxisLen = 10
      const mmp = 100
      if (xAxis.length > maxXaxisLen) {
        dataZoomEnd = maxXaxisLen / xAxis.length * mmp
      }
      return { xAxis, data, max, dataZoomEnd }
    },
    updateCharts (source) {
      const info = this.initData(source)
      const infoXaxisMaxLen = 10
      const isLarge = info.xAxis.length > infoXaxisMaxLen
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
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside',
          disabled: !isLarge,
          zoomLock: true,
          start: 0,
          end: info.dataZoomEnd
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
            fontSize: 24
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          type: 'bar',
          barWidth: 36,
          data: info.data
        }],
        color: [{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#00d6f5' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#146cfe' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        }]
      })
    },
    update (menu) {
      // this.charts.dispose();
      this.currentAreaMenu = menu.des
      // this.initData(this.source);
      // this.charts = this.initCharts();
      this.$emit('listenChild', this.currentAreaMenu)
      this.updateCharts(this.source)
    },
    getMax (source) {
      let temp = Object.assign([], source)
      // const currentIndexAdd = 1;
      // const key = `value${currentIndex + currentIndexAdd}`
      const key = 'value'
      temp = _lodash_sortBy(temp, (ele) => {
        return -parseFloat(ele[key])
      })
      const tempIndex = 0
      const max = temp[tempIndex][key]
      const str = String(max)
      // const str = `${max}`;
      const len = str.length
      const addIndex = 1
      const ceilIndex = 2
      const mMax = _lodash_ceil(max, -len + addIndex)
      const sMax = _lodash_round(max, -len + addIndex)
      return (mMax + sMax) / ceilIndex
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
  font-size: 18px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
}
.active {
  color: #2d8cf0;
  font-size: 20px;
  border-bottom: 2px solid #2d8cf0;
}
.disabled{
  color: #dedede;
}
</style>
