<template>
  <div class="component-cont">
    <div class="service-record-cont">
      <border-box title="服务记录">
        <service-record
          :source1="specialSource"
          :source2="focusSource"/>
      </border-box>
    </div>

    <div class="integrate-command-cont">
      <border-box title="综合指挥">
        <integrate-command :source="integrateSource"/>
      </border-box>
    </div>

    <!-- 点击事件为 @click="showPopoverHandler" -->
    <div class="real-time-cont">
      <border-box title="实时动态">
        <scroll-list
        :header="scrollListHeader"
        :source='scrollInfoData'></scroll-list>
      </border-box>
    </div>
    <popover-info v-if='popoverShowable' @close="hidePopoverHandler" :source='popoverInfoData'></popover-info>

    <!-- <div class="event-type-cont">
      <border-box title="事件分类">
        <horizontal-chart :source="typeSource" />
      </border-box>
    </div> -->
  </div>
</template>

<script>
import BorderBox from './cell/border-box'
import ServiceRecord from './cell/service-record'
import IntegrateCommand from './cell/integrate-command'
import ScrollList from './cell/scroll-list'
import PopoverInfo from './cell/popover-info'

import ScrollMockData from '../../../static/mock_wfjd/real.json'
import InfoStepMockData from '../../../static/mock_wfjd/findIssueInfoStep.json'

export default {
  name: '',
  props: {
    orgId: {
      type: Number
    }
  },
  components: {
    BorderBox,
    ServiceRecord,
    IntegrateCommand,
    ScrollList,
    PopoverInfo
  },
  data () {
    return {
      recordSource: {},
      type: '',
      specialSource: {},
      focusSource: {},
      // typeSource: {},
      integrateSource: {},
      scrollListHeader: [
        { des: '事件名称', flex: 20 },
        { des: '状态', flex: 20 },
        { des: '事件类型', flex: 20 },
        { des: '区域', flex: 30 },
        { des: '创建时间', flex: 30 },
        { des: '来源', flex: 30 }
      ],
      scrollInfoData: [],
      popoverInfoData: {
        baseInfo: [],
        dealStatus: []
      },
      popoverShowable: false
    }
  },
  watch: {
    orgId (newVal) {
      this.fetchSpecialSource()
      this.fetchFocusSource()
      this.fetchIntegrateSource()
      this.fetchRealSource()
    }
  },
  created () {
    // this.fetchSpecialSource()
    // this.fetchFocusSource()
    // this.fetchIntegrateSource()
    // this.fetchRealSource()
    this.fetchDefalutValue('contents/mock_wfjd/record-special.json', 'specialSource')
    this.fetchDefalutValue('contents/mock_wfjd/record-focus.json', 'focusSource')
    this.fetchDefalutValue('contents/mock_wfjd/type.json', 'typeSource')
    this.fetchDefalutValue('contents/mock_wfjd/integrate-command.json', 'integrateSource')
    this.fetchTemporary()
  },
  methods: {
    fetchDefalutValue (url, key) {
      fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
        .then(res => res.json())
        .then(data => {
          this[key] = data
        })
        .catch(err => console.error(err))
    },
    fetchSpecialSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQDSSpecialPopulationServiceRecordCount.action?orgId=${this.orgId}`)
        .then(res => {
          this.specialSource = res.data
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/record-special.json', 'specialSource')
          }
        })
    },
    fetchFocusSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQDSAttentionPopulationServiceRecordCount.action?orgId=${this.orgId}`)
        .then(res => {
          this.focusSource = res.data
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/record-focus.json', 'focusSource')
          }
        })
    },
    fetchTypeSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQDSIssueTypes.action?orgId=${this.orgId}`)
        .then(res => {
          this.typeSource = res.data
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/type.json', 'typeSource')
          }
        })
    },
    fetchIntegrateSource () {
      this.http.get(`/cloudMap/cloudMapManager/...action?orgId=${this.orgId}`)
        .then(res => {
          this.integrateSource = res.data
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/integrate-command.json', 'integrateSource')
          }
        })
    },
    fetchTemporary () {
      let rst = []
      let data = ScrollMockData
      data.forEach(item => {
        rst.push({
          textArr: [item.title, item.receptStatus, item.issueTypeName, item.occurLocation, item.createDateStr, item.sourceName],
          id: item.id,
          data: item
        })
      })
      this.scrollInfoData = rst
    },
    fetchRealSource () {
      this.http.get(`/cloudMap/cloudMapManager/findIssueInfoCount.action?orgId=${this.orgId}`)
        .then(res => {
          let rst = []
          res.data.forEach(item => {
            rst.push({
              textArr: [item.title, item.receptStatus, item.issueTypeName, item.occurLocation, item.createDateStr, item.sourceName],
              id: item.id,
              data: item
            })
            this.scrollInfoData = rst
          })
        })
        .catch(err => {
          if (err) {
            let rst = []
            let data = ScrollMockData
            data.forEach(item => {
              rst.push({
                textArr: [item.title, item.receptStatus, item.issueTypeName, item.occurLocation, item.createDateStr, item.sourceName],
                id: item.id,
                data: item
              })
            })
            this.scrollInfoData = rst
            console.log(rst)
          }
        })
    },
    showPopoverHandler (item) {
      this.popoverInfoData.baseInfo = [
        { name: '事件名称', value: item.data.title || '' },
        { name: '创建时间', value: item.data.createDateStr },
        { name: '事件来源', value: item.data.sourceName },
        { name: '事件类型', value: item.data.issueTypeName },
        { name: '发生时间', value: item.data.occurDateStr },
        { name: '发生网格', value: item.data.createOrg.fullOrgName },
        { name: '详细地址', value: item.data.occurLocation },
        { name: '事件内容', value: item.data.content }
      ]
      this.http.get(`/cloudMap/cloudMapManager/findIssueInfoStep.action?id=${item.id}`)
        .then(res => {
          let rst = []
          res.data.forEach(item => {
            rst.push({
              time: item.TIME,
              grid: item.TITLE
            })
          })
          this.popoverInfoData.dealStatus = rst
        })
        .catch(err => {
          if (err) {
            let rst = []
            InfoStepMockData.forEach(item => {
              rst.push({
                time: item.TIME,
                grid: item.TITLE
              })
            })
            this.popoverInfoData.dealStatus = rst
          }
        })
      this.popoverShowable = true
    },
    hidePopoverHandler () {
      this.popoverShowable = false
    }
  }
}
</script>

<style scoped>
.component-cont{
  width: 958px;
  height: 100%;
  margin: 0 24px;
}
.service-record-cont{
  width: 100%;
  height: 500px;
  margin-bottom: 29px;
}
.integrate-command-cont{
  width: 100%;
  height: 296px;
  margin: 0 auto;
  margin-bottom: 29px;
}
.real-time-cont{
  width: 100%;
  height: 500px;
}
</style>
