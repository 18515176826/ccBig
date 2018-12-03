<template>
  <div class="component-cont">
    <div class="map-cont">
      <c-map
        :mapInfo="currentDataMap"
        :mapTipInfo="mapTipInfo"
        :id="'mapCont1'"></c-map>
    </div>
    <div class="tip-cont">
      <div class="top-tip">
        <h3>今日事件上报数</h3>
        <div class="tip-num-cont">
          <div class="tip-num" v-for="(num, index) in reportNum" :key="index">{{num}}</div>
        </div>
      </div>

      <div class="bottom-tip">
        <h3>今日事件办结数</h3>
        <div class="tip-num-cont">
          <div class="tip-num" v-for="(num, index) in resultNum" :key="index">{{num}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CMap from './cell/c-map'

import { mapData } from '../../mock/wfjd'
export default {
  name: '',
  props: {
    orgId: {
      type: Number
    }
  },
  components: {
    CMap
  },
  data () {
    return {
      currentDataMap: mapData,
      mapTipInfo: {},
      reportNum: [1, 7, 0],
      resultNum: [1, 7, 0],
      eventInfo: {}
    }
  },
  created () {
    this.fetchMapTipInfo()
    this.fetchEventInfo()
  },
  methods: {
    fetchDefalutValue (url, key, name) {
      fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
        .then(res => res.json())
        .then(data => {
          switch (name) {
            case 'map':
              this[key] = this.initTipInfoData(data)
              break
            case 'tip':
              this[key] = this.initEventInfoData(data)
              break
            default:
              this[key] = data
          }
        })
        .catch(err => console.error(err))
    },
    fetchMapTipInfo () {
      this.http.get(`/cloudMap/cloudMapManager/buildQDSMap.action?orgId=${this.orgId}`)
        .then(res => {
          this.mapTipInfo = this.initTipInfoData(res.data)
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/map-tip.json', 'mapTipInfo', 'map')
          }
        })
    },
    fetchEventInfo () {
      this.http.get(`/cloudMap/cloudMapManager/getQDSMapIssueData.action?orgId=${this.orgId}`)
        .then(res => {
          this.eventInfo = this.initEventInfoData(res.data)
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/event-today.json', 'eventInfo', 'tip')
          }
        })
    },
    initTipInfoData (data) {
      if (Object.prototype.toString.call(data) === '[object Object]') {
        let rst = {}
        Object.entries(data).forEach(([key, value]) => {
          let _data = []
          Object.entries(value).forEach(([subKey, subValue]) => {
            _data.push({
              name: subKey,
              value: subValue
            })
          })
          rst[key] = {
            name: key,
            data: _data
          }
        })
        return rst
      }
    },
    initEventInfoData (data) {
      this.reportNum = String.prototype.split.call(data['今日事件上报数'], '')
      this.resultNum = String.prototype.split.call(data['今日事件办结数'], '')
      return data
    }
  }
}
</script>

<style scoped>
.component-cont{
  width: 1712px;
  height: 100%;
  position: relative;
}
.map-cont{
  width: 100%;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  background: url(../../assets/images/map-bg.png) no-repeat -10px -50px;
}
.tip-cont{
  position: absolute;
  width: 450px;
  height: 500px;
  right: 80px;
  top: 30px;
  color: #fff;
}
.top-tip >h3, .bottom-tip >h3{
  font-size: 36px;
  margin: 25px;
}
.tip-num-cont{
  display: flex;
  justify-content: flex-end;
}
.tip-num{
  width: 96px;
  height: 136px;
  line-height: 136px;
  background: url(../../assets/images/tip-num-bg.png) no-repeat;
  background-size: 100% 100%;
  font-size: 72px;
  font-weight: bold;
  text-shadow: 0 0 30px #036ad8;
  margin: 0 6px;
}
</style>
