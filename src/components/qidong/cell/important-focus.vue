<template>
  <div class="chart-cont" :id="chartId"></div>
</template>
<script>
export default {
  props: {
    chartId: {
      type: String,
      default: 'importantChart1'
    },
    source: {
      type: Array,
      default: () => [
        { 'name': '金融风险', 'value': 6 },
        { 'name': '消防隐患', 'value': 21 },
        { 'name': '劳动人事争议', 'value': 17 },
        { 'name': '环保纠纷', 'value': 9 },
        { 'name': '物业纠纷', 'value': 12 }
      ]
    },
    colorDic: {
      type: Object,
      default: () => {
        return {
          fillColor: ['#005ff3', '#87c5fa', '#47e0b9', '#ff824b', '#fff5a5', '#7c2afc']
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
    source (newSource) {
      if (this.chart === null) {
        this.chart = this.initChart()
      }
      this.updateChart(newSource)
    }
  },
  methods: {
    initChart () {
      const el = document.getElementById(this.chartId)
      const _chart = this.$echarts.init(el)
      return _chart
    },
    initData (source) {
      // const seriesData = []
      const legendData = []

      source.forEach(({name, value}) => {
        legendData.push(`${name}`)
      })
      return {
        source,
        legendData
      }
    },
    updateChart (source) {
      const data = this.initData(source)
      const _this = this
      this.chart.setOption({
        title: {
          text: 'TOP 5',
          textStyle: {
            color: '#fff',
            fontSize: 24
          },
          top: 'middle',
          left: '20%'
        },
        tooltip: {
          textStyle: {
            fontSize: 24
          },
          backgroundColor: 'rgba(0, 0, 0, .5)',
          padding: [15, 30]
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          top: 50,
          bottom: 60,
          align: 'left',
          itemWidth: 24,
          itemHeight: 12,
          itemGap: 30,
          // data: data.legendData,
          data: [],
          formatter: (name) => {
            // let len = name.length
            // if (len > 6 && len <= 12) {
            //   return `${name.substr(0, 9)}\n${name.substr(9, 12)}\n: ${this.getNameValue(name)}`
            // } else if (len <= 6) {
            return `${name}               ${this.getNameValue(name)}`
            // } else {
            // return `${name.substr(0, 9)}\n${name.substr(9)}: ${this.getNameValue(name)}`
            // }
          },
          textStyle: {
            color: '#9aa9ca',
            fontSize: 24
          }
        },
        series: [{
          type: 'pie',
          center: ['25%', '50%'],
          radius: ['25%', '70%'],
          roseType: 'radius',
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              fontSize: 16,
              formatter: (params) => {
                if (params.name.indexOf('肇') !== -1) {
                  return `易肇人员\n${params.percent}%`
                } else if (params.name > 8) {
                  return `${params.name.substr(0, 9)}\n${params.percent}%`
                }
                return `${params.name}\n${params.percent}%`
              }
            }
          },
          selectedMode: 'single',
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { 'name': '金融风险', 'value': 6 },
            { 'name': '消防隐患', 'value': 21 },
            { 'name': '劳动人事争议', 'value': 17 },
            { 'name': '环保纠纷', 'value': 9 },
            { 'name': '物业纠纷', 'value': 12 }
          ]
        }],
        color: _this.colorDic.fillColor
      })
    },
    getNameValue (key) {
      let _val = ''
      this.source.forEach(({name, value}) => {
        if (key === name) {
          _val = value
        }
      })
      return _val
    }
  },
  mounted () {
    this.chart = this.initChart()
    this.updateChart(this.source)
  }
}
</script>
<style>
.chart-cont{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
