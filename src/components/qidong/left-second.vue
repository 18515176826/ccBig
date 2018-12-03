<template>
  <div class="component-cont">
    <!-- <div class="integrate-command-cont">
      <border-box title="综合指挥">
        <integrate-command :source="integrateSource"/>
      </border-box>
    </div> -->

    <div class="service-group-cont">
      <border-box title="服务团队">
        <pictorial-chart :source='serviceGroupSource' />
      </border-box>
    </div>

    <div class="service-object-cont">
      <border-box title="服务对象">
        <service-object
          :source='serviceObjectSource'
          @listenChild='getChild'
          :style='{marginTop: "20px", boxSizing: "border-box", position: "relative"}'/>
      </border-box>
    </div>
  </div>
</template>

<script>
import BorderBox from './cell/border-box'
// import IntegrateCommand from './cell/integrate-command'
import PictorialChart from './cell/pictorial-bar'
import ServiceObject from './cell/service-object'

import DefaultServiceObjectSource from '../../../static/mock_wfjd/special.json'
export default {
  name: '',
  props: {
    orgId: {
      type: Number
    }
  },
  components: {
    BorderBox,
    // IntegrateCommand,
    PictorialChart,
    ServiceObject
  },
  data () {
    return {
      // integrateSource: {},
      serviceGroupSource: {},
      serviceObjectSource: DefaultServiceObjectSource,
      type: '',
      specialData: {},
      focusData: {}
    }
  },
  watch: {
    orgId (newVal) {
      // this.fetchIntegrateSource()
      // this.fetchServiceGroupSource()
      // this.fetchServiceObjectSource()
    }
  },
  created () {
    // this.fetchIntegrateSource()
    // this.fetchServiceGroupSource()
    // this.fetchServiceObjectSource()
    this.fetchDefalutValue('contents/mock_wfjd/service-group.json', 'serviceGroupSource')
    this.fetchDefalutValue('contents/mock_wfjd/special.json', 'specialData')
    this.fetchDefalutValue('contents/mock_wfjd/focus.json', 'focusData')
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
    // fetchIntegrateSource() {
    //   this.http.get(`/cloudMap/cloudMapManager/...action?orgId=${this.orgId}`)
    //     .then(res => {
    //       this.integrateSource = res.data
    //     })
    //     .catch(err => {
    //       this.fetchDefalutValue('contents/mock_wfjd/integrate-command.json', 'integrateSource')
    //     })
    // },
    fetchServiceGroupSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQdsfwtd.action?orgId=${this.orgId}`)
        .then(res => {
          this.serviceGroupSource = {
            '驻村警务人员': res.data['驻村警务人员'] || res.data['驻村（社区）民警'],
            '网格长': res.data['网格长'],
            '平安志愿者服务队': res.data['平安志愿者服务队'] || res.data['平安志愿者'],
            '社会组织': res.data['社会组织'],
            '网格联络员': res.data['网格联络员'] || res.data['网络联络员及信息员']
          }
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/service-group.json', 'serviceGroupSource')
          }
        })
    },
    fetchServiceObjectSource () {
      this.fetchSpecialSource()
      this.fetchFocusSource()
    },
    fetchSpecialSource () {
      this.http.get(`/cloudMap/cloudMapManager/findSpecialPopulations.action?orgId=${this.orgId}`)
        .then(res => {
          this.specialData = {
            '社区矫正人员': res.data['社区矫正人员'],
            '刑满释放人员': res.data['刑满释放人员'],
            '吸毒人员': res.data['吸毒人员'],
            '重点青少年': res.data['重点青少年'],
            '重点上访人员': res.data['重点上访人员'],
            '易肇事肇祸精神病患者': res.data['易肇事肇祸精神病患者'],
            '有违法犯罪行为的艾滋病患者': res.data['有违法犯罪行为的艾滋病患者']
          }
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/special.json', 'specialData')
          }
        })
    },
    fetchFocusSource () {
      this.http.get(`/cloudMap/cloudMapManager/findAttentionPopulations.action?orgId=${this.orgId}`)
        .then(res => {
          this.focusData = {
            '低保人员': res.data['低保人员'],
            '未成年人保护': res.data['未成年人保护'],
            '企业退休人员': res.data['企业退休人员'],
            '残疾人': res.data['残疾人'],
            '优抚对象': res.data['优抚对象'],
            '双拥人员': res.data['双拥人员']
          }
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/focus.json', 'focusData')
          }
        })
    },
    getChild (type) {
      this.type = type
      this.getSource(this.type)
    },
    getSource (type) {
      switch (type) {
        case '特殊人群':
          this.serviceObjectSource = this.specialData
          break
        case '关怀对象':
          this.serviceObjectSource = this.focusData
          break
        default:
          break
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
/* .integrate-command-cont{
  width: 100%;
  height: 296px;
  margin-bottom: 29px;
} */
.service-group-cont{
  width: 100%;
  height: 662px;
  margin-bottom: 29px;
}
.service-object-cont{
  width: 100%;
  height: 662px;
}
</style>
