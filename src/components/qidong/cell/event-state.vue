<template>
  <div class="container">
    <div class="info-item">
      <div class="top-info">
        <span>累计受理</span>
        <span>{{source["累计受理"]}}</span>
      </div>
      <div class="bottom-info">
        <p>受理率</p>
        <p>100%</p>
      </div>
    </div>

    <div class="info-item">
      <!-- <div class="top-info">
        <span class="logo-12345">转</span>
        <span>{{source["累计办理"]}}</span>
      </div> -->
      <div class="bottom-info-float">
        <span>自办自结：</span>
        <span>4707</span>
      </div>
      <div class="bottom-info-float">
        <span>流转上报：</span>
        <span>897</span>
      </div>
    </div>

    <div class="info-item" :class="getPercent">
      <div class="top-info">
        <span>累计办结</span>
        <span>{{source["累计办结"]}}</span>
      </div>
      <div class="bottom-info">
        <p>办结率</p>
        <p>{{source["办结率"]}}%</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EventState',
  props: {
    orgId: {
      type: Number
    },
    source: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    getPercent () {
      const percent = Number(this.source['办结率'])
      if (percent <= 20) {
        return 'deg-45'
      } else if (percent > 20 && percent <= 30) {
        return 'deg-90'
      } else if (percent > 30 && percent <= 45) {
        return 'deg-135'
      } else if (percent > 45 && percent <= 55) {
        return 'deg-180'
      } else if (percent > 55 && percent <= 70) {
        return 'deg-225'
      } else if (percent > 70 && percent <= 80) {
        return 'deg-270'
      } else if (percent > 80 && percent <= 95) {
        return 'deg-315'
      } else if (percent > 95 && percent <= 100) {
        return 'deg-360'
      }
    }
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;

}
.info-item{
  width: 306px;
  height: 208px;
  border-radius: 20px;
  color: #fff;
  margin: 14px 6px;
}
.info-item:nth-child(1){
  background: url(../../../../static/images/pie-percent/purple_360.png) no-repeat;
}
/* .info-item:nth-child(2){
  background: url(../../../../static/images/pie-percent/red_360.png) no-repeat;
} */
/* 临时处理 */
/* .info-item:nth-child(3).deg-45{
  background: url(../../../../static/images/pie-percent/blue_45.png) no-repeat;
}
.info-item:nth-child(3).deg-90{
  background: url(../../../../static/images/pie-percent/blue_90.png) no-repeat;
}
.info-item:nth-child(3).deg-135{
  background: url(../../../../static/images/pie-percent/blue_135.png) no-repeat;
}
.info-item:nth-child(3).deg-180{
  background: url(../../../../static/images/pie-percent/blue_180.png) no-repeat;
}
.info-item:nth-child(3).deg-225{
  background: url(../../../../static/images/pie-percent/blue_225.png) no-repeat;
}
.info-item:nth-child(3).deg-270{
  background: url(../../../../static/images/pie-percent/blue_270.png) no-repeat;
}
.info-item:nth-child(3).deg-315{
  background: url(../../../../static/images/pie-percent/blue_315.png) no-repeat;
} */
.info-item:nth-child(3),
.info-item:nth-child(3).deg-360{
  background: url(../../../../static/images/pie-percent/blue_360.png) no-repeat;
}
.info-item {
  background: #DA586E;
}
.top-info{
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top-info span{
  font-size: 26px;
}
.top-info span:first-child{
  font-size: 32px;
}
.bottom-info{
  width: 100%;
  height: 148px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 40px;
  box-sizing: border-box;
}
.bottom-info-float {
  width: 90%;
  font-size: 28px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
}
.info-item  .bottom-info-float:first-child {
  padding-top: 24px;
  border-bottom: 1px solid #ccc;
}
.bottom-info p:nth-child(1){
  font-size: 25px;
}
.bottom-info p:nth-child(2){
  font-size: 36px;
}
.logo-12345{
  display: inline-block;
  padding-right: 30px;
  text-align: left;
  width: 64px;
  height: 50px;
  background: url(../../../assets/images/logo_12345.png) no-repeat right;
}
</style>
