<template>
  <div class="component-cont">
    <div class="event-state-cont">
      <border-box title="事件状态">
        <event-state :source="eventStateSource"/>
      </border-box>
    </div>

    <div class="event-type-cont">
      <border-box title="事件分类">
        <horizontal-chart :source="typeSource" />
      </border-box>
    </div>

    <div class="focus-cont">
      <border-box title="重点关注">
        <important-focus :source="importantSource" />
      </border-box>
      <ul class="attention">
        <li v-for='(item, ind) in importantSource' class='attentionList' :key='ind'>
          <i :class='`${
          item.name == "金融风险" ? "attColor0" :
          item.name == "消防隐患" ? "attColor1" :
          item.name == "劳动人事争议" ? "attColor2" :
          item.name == "环保纠纷" ? "attColor3" :
          item.name == "物业纠纷" ? "attColor4" : "attColor0"}`'></i>
          <span class='span1'>{{item.name}}</span>
          <span>{{item.value}}</span>
        </li>
      </ul>
      <div class="mask-cont"></div>
    </div>

  </div>
</template>

<script>
import BorderBox from './cell/border-box'
import EventState from './cell/event-state'
import ImportantFocus from './cell/important-focus'
import HorizontalChart from './cell/horizontal-bar-charts'

export default {
  name: '',
  props: {
    orgId: {
      type: Number
    }
  },
  components: {
    BorderBox,
    ImportantFocus,
    HorizontalChart,
    EventState
  },
  data () {
    return {
      importantSource: [],
      eventStateSource: {},
      typeSource: {}
    }
  },
  watch: {
    orgId () {
      // this.fetchImportantSource()
      // this.fetchEventStateSource()
      // this.fetchTypeSource()
      this.useMockSource()
    }
  },
  created () {
    // this.fetchImportantSource()
    // this.fetchEventStateSource()
    // this.fetchTypeSource()
    // this.useMockSource()
    this.fetchDefalutValue('contents/mock_wfjd/event-info.json', 'eventStateSource')
    this.fetchDefalutValue('contents/mock_wfjd/type.json', 'typeSource')
    this.fetchDefalutValue('contents/mock_wfjd/important-focus.json', 'importantSource')
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
    fetchEventStateSource () {
      this.http.get(`/cloudMap/cloudMapManager/countSlbj.action?orgId=${this.orgId}`)
        .then(res => {
          this.eventStateSource = res.data
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/event-info.json', 'eventStateSource')
          }
        })
    },
    fetchImportantSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQDSSpecialIssues.action?orgId=${this.orgId}`)
        .then(res => {
          let rst = []
          Object.entries(res.data).forEach(([key, val]) => {
            if (key !== '社区警情') {
              rst.push({
                name: key,
                value: val
              })
            }
          })
          this.importantSource = rst
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/important-focus.json', 'importantSource')
          }
        })
    },
    fetchTypeSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQDSIssueTypes.action?orgId=${this.orgId}`)
        .then(res => {
          this.typeSource = {
            '平安稳定': res.data['平安稳定'],
            '社会治安': res.data['社会治安'],
            '公共安全': res.data['公共安全'],
            '城市管理': res.data['城市管理'],
            '民生服务': res.data['民生服务'],
            '环境保护': res.data['环境保护']
          }
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/type.json', 'typeSource')
          }
        })
    },
    useMockSource () {
      if (this.orgId === 5633) {
        this.fetchDefalutValue('contents/mock_wfjd/event-info.json', 'eventStateSource')
        this.fetchDefalutValue('contents/mock_wfjd/type.json', 'typeSource')
        this.fetchDefalutValue('contents/mock_wfjd/important-focus.json', 'importantSource')
      } else if (this.orgId === 5721) {
        this.fetchDefalutValue('contents/mock_wfjd/event-info-hpz.json', 'eventStateSource')
        this.fetchDefalutValue('contents/mock_wfjd/type-hpz.json', 'typeSource')
        this.fetchDefalutValue('contents/mock_wfjd/important-focus-hpz.json', 'importantSource')
      } else if (this.orgId === 5728) {
        this.fetchDefalutValue('contents/mock_wfjd/event-info-hxc.json', 'eventStateSource')
        this.fetchDefalutValue('contents/mock_wfjd/type-hxc.json', 'typeSource')
        this.fetchDefalutValue('contents/mock_wfjd/important-focus-hxc.json', 'importantSource')
      }
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
.event-state-cont{
  width: 100%;
  height: 320px;
  margin-bottom: 29px;
}
.focus-cont{
  width: 100%;
  height: 480px;
  position: relative;
}
.event-type-cont{
  width: 100%;
  height: 495px;
  margin-bottom: 29px;
}
.mask-cont{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.attention {
  position: absolute;
  top: 140px;
  left: 550px;
  font-size: 26px;
  color: #fff;
}
.attention .attentionList {
  padding-bottom: 20px;
  text-align: left;
}
.attentionList i {
  float: left;
  width: 30px;
  height: 20px;
  border-radius: 5px;
  margin: 10px 8px 0 0;
}
.attColor0 {
  background: #2058ED;
}
.attColor1 {
  background: #87C2F7;
}
.attColor2 {
  background: #30E0B9;
}
.attColor3 {
  background: #FF8254;
}
.attColor4 {
  background: #FDF6AA;
}
.attentionList .span1 {
  margin-left: 8px;
  min-width: 190px;
  display: inline-block;
}
</style>
