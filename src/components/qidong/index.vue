<template>
  <div class="container">
    <div class="header-cont" :class="activeClass"></div>
    <div class="body-cont">
      <left-first :orgId='orgId' />
      <left-Second :orgId='orgId' />
      <center-cont :orgId='orgId' :mainOrgId="mainOrgId"  @mapChange="onMapChange" ref="mainArea" />
      <right-first :orgId='orgId' />
      <right-second :orgId='orgId' />
    </div>
  </div>
</template>
<script>
import LeftFirst from './left-first'
import LeftSecond from './left-second'
import CenterCont from './main-area'
import RightFirst from './right-first'
import RightSecond from './right-second'
export default {
  name: 'QiDong',
  components: {
    LeftFirst,
    LeftSecond,
    CenterCont,
    RightFirst,
    RightSecond
  },
  computed: {
    activeClass () {
      switch (this.orgId) {
        case 5633:
          return 'qd-title'
          break
        case 5721:
          return 'hpz-title'
          break
        case 5728:
          return 'hxc-title'
          break
      }
    }
  },
  data () {
    return {
      orgId: 5633,
      mainOrgId: null,
      areaList: {
        '文峰街道': 5633,
        '惠萍镇': 5721,
        '鸿西村': 5728
      }
    }
  },
  watch: {
    '$route': function (newVal) {
      // console.log('new route: ', newVal)
      if (!newVal.query.orgId) return
      this.orgId = Number(newVal.query.orgId)
      this.mainOrgId = Number(newVal.query.orgId)
      this.$refs.mainArea.downList = []
      this.judgeTitleName()
    }
  },
  methods: {
    onMapChange (name) {
      if (!this.areaList[name]) return
      this.orgId = this.areaList[name]
      this.tabName = name
    },
    judgeTitleName () {
      switch (this.orgId) {
        case 5633:
          this.tabName = '文峰街道'
          break
        case 5721:
          this.tabName = '惠萍镇'
          break
        case 5728:
          this.tabName = '鸿西村'
          break
      }
    }
  },
  beforeMount () {
    this.mainOrgId = this.$route.query.orgId || 5633
    if (this.$route.query.orgId) {
      this.orgId = Number(this.$route.query.orgId)
    }
    this.judgeTitleName()
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  padding: 0 52px 58px;
  box-sizing: border-box;
}
.header-cont{
  width: 4500px;
  height: 209px;
  margin: 0 auto;
  background: url(../../assets/img/tittle_zysw.png) no-repeat;
}
/* .hpz-title{
  background: url(../../../static/images/tittle_hp.png) no-repeat;
}
.hxc-title{
  background: url(../../../static/images/tittle_hx.png) no-repeat;
} */
.body-cont{
  width: 100%;
  height: calc( 100% - 209px );
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
</style>
