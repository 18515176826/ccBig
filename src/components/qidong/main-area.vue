<template>
  <main class="main-cont">
     <div class="tip-cont">
      <div class="top-tip">
        <div class="tip-num-cont">
          <div class="tip-num" v-for="(num, index) in reportNum" :key="index">{{num}}</div>
        </div>
        <h3>今日事件上报数</h3>
      </div>

      <div class="bottom-tip">
        <div class="tip-num-cont">
          <div class="tip-num" v-for="(num, index) in resultNum" :key="index">{{num}}</div>
        </div>
        <h3>今日事件办结数</h3>
      </div>
    </div>
    <div class="names">
        <span class="name1">
          <img src="../../assets/icon/user.png" alt="">
          网格员姓名
          <span>周希阳</span>
        </span>
        <span class="rangde">
          <img src="../../assets/icon/user.png" alt="">
          网格员姓名
          <span>王强</span>
        </span>
        <span class="gongde">
          <img src="../../assets/icon/user.png" alt="">
          网格员姓名
          <span>吴潇莉</span>
        </span>
        <span class="liangde">
          <img src="../../assets/icon/user.png" alt="">
          网格员姓名
          <span>周洁钰</span>
        </span>
        <span class="jiande">
          <img src="../../assets/icon/user.png" alt="">
          网格员姓名
          <span>龚翔</span>
        </span>
        <span class="wende">
          <img src="../../assets/icon/user.png" alt="">
          网格员姓名
          <span>周希阳</span>
        </span>
      </div>
    <div class="map-cont" :class='{"bg-1": showStreet, "bg-2": showTown, "bg-3": showCommunity}'>
      <c-map
        v-if='showStreet'
        :mapInfo="currentDataMap"
        :mapTipInfo='mapTipInfoData'
        @areaClick='mapClickHandler'
        ref='streetMap'
        :id="'mapCont1'"></c-map>
      <c-map
        v-if='showTown'
        :mapInfo="townDataMap"
        :mapTipInfo='mapTipInfoData'
        @areaClick='mapClickHandler'
        :id="'mapCont2'"></c-map>
      <c-map
        v-if='showCommunity'
        :mapInfo="communityDataMap"
        :mapTipInfo='mapTipInfoData'
        @areaClick='emptyClick'
        :id="'mapCont3'"
        style="padding-right: 300px; padding-bottom: 100px;box-sizing: border-box;"></c-map>
      <div class="back-up-btn" v-if="showBackUpBtn" @click='backUpHandler'>返回上一级</div>
    </div>
    <!-- <div class="integrate-command-cont">
      <border-box title="综合指挥">
        <integrate-command :source="integrateSource"/>
      </border-box>
    </div> -->
    <div class="temp-map"
      v-if="showStreet"
      @mouseover="qlHoverHandler"
      @mousemove="qlMoveHandler"
      @mouseout="qlOutHandler"></div>
    <div class="person-info person-1" v-if="showCommunity && griderList['网格1']">{{griderList['网格1']}}</div>
    <div class="person-info person-2" v-if="showCommunity && griderList['网格2']">{{griderList['网格2']}}</div>
    <div class="person-info person-3" v-if="showCommunity && griderList['网格3']">{{griderList['网格3']}}</div>
    <div class="person-info person-4" v-if="showCommunity && griderList['网格4']">{{griderList['网格4']}}</div>
    <div class="person-info person-5" v-if="showCommunity && griderList['网格5']">{{griderList['网格5']}}</div>
  </main>
</template>
<script>
import CMap from './cell/c-map'
// import BorderBox from './cell/border-box'
// import IntegrateCommand from './cell/integrate-command'

import { mapData } from '../../mock/wfjd'
// 街道地图数据
import { mapData as hpTownMapData } from '../../mock/wfjd/hpz.js'
//
// 广洋湖镇下社区
import { mapData as hxCommunityMapData } from '../../mock/wfjd/hxc.js'

import TipInfoMockData from '../../../static/mock_wfjd/map-tip.json'
import hpzTipInfoMockData from '../../../static/mock_wfjd/map-hpz-tip.json'
import hxcTipInfoMockData from '../../../static/mock_wfjd/map-hxc-tip.json'

export default {
  props: {
    orgId: {
      type: [String, Number]
    },
    mainOrgId: {
      type: [String, Number, Object]
    }
  },
  components: {
    'c-map': CMap
    // BorderBox,
    // IntegrateCommand,
  },
  data () {
    return {
      reportNum: [15],
      resultNum: [11],
      eventInfo: {},
      currentDataMap: null,
      townDataMap: null,
      communityDataMap: null,
      mapTipInfoData: {},
      showStreet: true,
      showTown: false,
      showCommunity: false,
      showTip: false,
      curLevel: 0,
      downState: 1,
      downList: [],
      areaList: {
        '文峰街道': 5633,
        '惠萍镇': 5721,
        '鸿西村': 5728
      },
      griderList: {
        '网格1': '',
        '网格2': '',
        '网格3': '',
        '网格4': '',
        '网格5': ''
      }
      // integrateSource: {},
    }
  },
  watch: {
    orgId: function (newVal) {
      this.judgeMapShow()
      this.fetchMapTipInfo()
      this.fetchEventInfo()
      // this.fetchIntegrateSource()
    }
  },
  computed: {
    showBackUpBtn () {
      return !!this.curLevel
    }
  },
  methods: {
    initTipInfoData (data) {
      if (Object.prototype.toString.call(data) === '[object Object]') {
        let rst = {}
        Object.entries(data).forEach(([key, value]) => {
          let _data = [
            {
              name: '实有人口',
              value: key === '惠萍镇' ? 64977 : key === '鸿西村' ? 3310 : value['实有人口']
            },
            {
              name: '实有房屋',
              value: key === '惠萍镇' ? 28272 : key === '鸿西村' ? 1379 : value['实有房屋']
            },
            {
              name: '重点人员',
              value: value['重点人员']
            },
            {
              name: '关怀对象',
              value: value['关怀对象']
            },
            {
              name: '事件上报数',
              value: value['事件上报数']
            },
            {
              name: '在线网格长数',
              value: value['在线网格长数']
            }
          ]
          if (this.orgId === 5728 && value['网格长']) {
            this.griderList[key] = value['网格长']
          }
          rst[key] = {
            name: key,
            data: _data
          }
        })
        return rst
      }
    },
    mapClickHandler (data) {
      // console.log('123',data)
      // console.log(this.areaList[data.data.name])
      if (!this.areaList[data.data.name]) return
      this.downState = 1
      // console.log('emit index page')
      this.$emit('mapChange', data.data.name)
      this.curLevel++
    },
    emptyClick () {
      return false
    },
    backUpHandler () {
      this.downState = 0
      this.downList.pop()
      // console.log(this.downList[this.downList.length - 1])
      this.$emit('mapChange', this.downList[this.downList.length - 1])
      this.curLevel--
    },
    level1MapShowHandler (map, tip, title) {
      this.currentDataMap = map
      this.mapTipInfoData = this.initTipInfoData(tip)
      this.downState && this.downList.push(title)
      this.showStreet = true
      this.showTown = false
      this.showCommunity = false
    },
    level2MapShowHandler (map, tip, title) {
      this.townDataMap = map
      console.log(map)
      this.mapTipInfoData = this.initTipInfoData(tip)
      this.downState && this.downList.push(title)
      this.showStreet = false
      this.showTown = true
      this.showCommunity = false
    },
    level3MapShowHandler (map, tip, title) {
      this.communityDataMap = map
      this.mapTipInfoData = this.initTipInfoData(tip)
      this.downState && this.downList.push(title)
      this.showStreet = false
      this.showTown = false
      this.showCommunity = true
    },
    judgeMapShow () {
      switch (this.orgId) {
        case 5633:
          // 文峰街道
          this.level1MapShowHandler(mapData, TipInfoMockData, '文峰街道')
          break
        case 5721:
          // 惠萍镇
          this.level2MapShowHandler(hpTownMapData, hpzTipInfoMockData, '惠萍镇')
          break
        case 5728:
          // 鸿西村
          this.level3MapShowHandler(hxCommunityMapData, hxcTipInfoMockData, '鸿西村')
          break
        default:
          this.level1MapShowHandler(mapData, TipInfoMockData, '文峰街道')
      }
    },
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
            // this.fetchDefalutValue('contents/mock_wfjd/map-tip.json', 'mapTipInfo', 'map')
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
    initEventInfoData (data) {
      this.reportNum = String.prototype.split.call(data['今日事件上报数'], '')
      this.resultNum = String.prototype.split.call(data['今日事件办结数'], '')
      return data
    },
    qlHoverHandler (e) {
      // console.log(e)
      this.$refs.streetMap.tipInfo = this.mapTipInfoData['启隆乡']
    },
    qlOutHandler () {
      this.$refs.streetMap.tipPostion = null
    },
    qlMoveHandler (e) {
      this.$refs.streetMap.tipPostion = {
        x: e.offsetX * Math.cos(Math.PI * 25 / 180),
        y: e.offsetY * Math.sin(Math.PI * 25 / 180) + 1000
      }
    }
  },
  created () {
    this.judgeMapShow()
  },
  mounted () {
    // this.fetchMapTipInfo()
    // this.fetchEventInfo()
    // this.fetchIntegrateSource()

    // console.log(hpTownMapData)
    // console.log(hxCommunityMapData)
  }
}
</script>
<style scoped>
.main-cont{
  width: 1712px;
  height: 100%;
  position: relative;
}
.map-cont{
  width: 100%;
  /* height: calc( 100% - 296px ); */
  height: 1100px;
  box-sizing: border-box;
  position: relative;
}
/* .bg-1{
  background: url(../../assets/images/map-bg-new.png) no-repeat -25px -50px;
} */
.bg-2{
  background: url(../../assets/images/map-hpz-bg.png) no-repeat -100px 190px;
  /* background: url(../../assets/images/map-hpz-bg.png) no-repeat -90px 20px; */
  /* background-size: 110% 100%; */
}
.bg-3{
  background: url(../../assets/images/map-hxc-bg.png) no-repeat 50px -40px;
  /* background: url(../../assets/images/map-hxc-bg.png) no-repeat 305px -25px; */
  background-size: 77% 102%;
}

.tip-cont{
  width: 770px;
  height: 210px;
  color: #fff;
  overflow: hidden;
  margin: 20px auto 0;
}
.tip-cont > div {
  float: right;
}
.tip-cont .top-tip {
  margin-right: 80px;
}
.tip-cont .bottom-tip {
  margin-right: 40px;
}
.top-tip >h3, .bottom-tip >h3{
  font-size: 36px;
  margin: 25px;
}
.tip-num-cont{
  display: flex;
  justify-content: center;
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
.back-up-btn{
  position: absolute;
  left: 20px;
  bottom: 50px;
  width: 200px;
  height: 60px;
  line-height: 60px;
  font-size: 26px;
  color: #fff;
  border: 1px solid #2f77dc;
  border-radius: 30px;
  cursor: pointer;
}
.back-up-btn:hover{
  color: #8ba4c0;
}
.back-up-btn:active{
  color: #2f77dc;
}
/* .temp-map{
  position: absolute;
  width: 814px;
  height: 237px;
  background: url(../../assets/images/qlx-bg.png) no-repeat;
  transform: rotateZ(28deg);
  bottom: 70px;
  left: -50px;
  z-index: 1;
} */
/* .temp-map:before{
  content: '长江';
  position: absolute;
  top: 0px;
  left: 200px;
  font-size: 24px;
  color: #fff;
}
.temp-map:after{
  content: '长江';
  position: absolute;
  top: 10px;
  right: 200px;
  font-size: 24px;
  color: #fff;
} */
.temp-map:hover{
  background: url(../../assets/images/qlx-hover-bg.png) no-repeat;
}
.person-info{
  position: absolute;
  min-width: 63px;
  height: 63px;
  line-height: 63px;
  padding-left: 73px;
  color: #fff;
  font-size: 28px;
  background: url(../../assets/images/icon-person.png) no-repeat;
}
.person-1{
  top: 200px;
  left: 900px;
}
.person-2{
  top: 400px;
  left: 760px;
}
.person-3{
  top: 650px;
  left: 580px;
}
.person-4{
  top: 880px;
  left: 410px;
}
.person-5{
  top: 1130px;
  left: 200px;
}
.names {
  color: #fff;
  position: absolute;
  font-size: 20px;
  width: 100%;
  height: 100%;
}
.names > span {
position: absolute;
}
.name1 {
  top: 760px;
  left: 660px;
}
.rangde {
  top: 330px;
  left: 910px;
}
.gongde {
  top: 345px;
  left: 1195px;
}
.jiande {
  top: 187px;
  left: 1045px;
}
.liangde {
  top: 487px;
  left: 1105px;
}
.wende {
  top: 721px;
  left: 1155px;
}
</style>
