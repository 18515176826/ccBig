<template>
  <div class="container">
    <div class="base-data-item" v-for="(value, key) in source" :key="key">

      <div class="base-data-info">
        <span class="base-data-label" v-text="key"/>
        <span class="base-data-value" v-text="value" />
      </div>

      <div class="base-data-chart">
        <span class="progress" :style="{width: `${getProgress(value)}%`}"></span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    source: {
      type: Object
    }
  },
  data () {
    return {
      allNum: 0
    }
  },
  computed: {
    getTotal () {
      let total = 0
      Object.values(this.source).forEach(value => {
        total += value
      })
      return total
    }
  },
  mounted () {

  },
  methods: {
    getProgress (value) {
      return (value / this.getTotal * 100).toFixed(0)
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  padding-top: 40px;
  box-sizing: border-box;
}
.base-data-item{
  width: 360px;
  height: 150px;
  margin: 0 auto;
  color: #fff;
}
.base-data-info{
  width: 100%;
  height: 80px;
  line-height: 80px;
  display: flex;
}
.base-data-label, .base-data-value{
  flex: 1;
}
.base-data-label{
  font-size: 30px;
  text-align: left;
}
.base-data-value{
  font-size: 38px;
  text-align: right;
}
.base-data-item:nth-child(1) .base-data-value,
.base-data-item:nth-child(5) .base-data-value
{
  color: #3991fe;
}
.base-data-item:nth-child(2) .base-data-value,
.base-data-item:nth-child(6) .base-data-value
{
  color: #4b4bf1;
}
.base-data-item:nth-child(3) .base-data-value,
.base-data-item:nth-child(7) .base-data-value
{
  color: #24e3ff;
}
.base-data-item:nth-child(4) .base-data-value,
.base-data-item:nth-child(8) .base-data-value
{
  color: #34e6ab;
}
.base-data-chart{
  width: 100%;
  height: 20px;
  font-size: 0;
  text-align: left;
}
.progress{
  display: inline-block;
  height: 100%;
  width: 20px;
}
.base-data-item:nth-child(1) .base-data-chart,
.base-data-item:nth-child(5) .base-data-chart
{
  background-color: rgba(57, 145, 254, .4);
}
.base-data-item:nth-child(2) .base-data-chart,
.base-data-item:nth-child(6) .base-data-chart
{
  background-color: rgba(75, 75, 241, .4);
}
.base-data-item:nth-child(3) .base-data-chart,
.base-data-item:nth-child(7) .base-data-chart
{
  background-color: rgba(36, 227, 255, .4);
}
.base-data-item:nth-child(4) .base-data-chart,
.base-data-item:nth-child(8) .base-data-chart
{
  background-color: rgba(52, 230, 171, .4);
}

.base-data-item:nth-child(1) .progress,
.base-data-item:nth-child(5) .progress
{
  background-color: #3991fe;
}
.base-data-item:nth-child(2) .progress,
.base-data-item:nth-child(6) .progress
{
  background-color: #4b4bf1;
}
.base-data-item:nth-child(3) .progress,
.base-data-item:nth-child(7) .progress
{
  background-color: #24e3ff;
}
.base-data-item:nth-child(4) .progress,
.base-data-item:nth-child(8) .progress
{
  background-color: #34e6ab;
}
</style>
