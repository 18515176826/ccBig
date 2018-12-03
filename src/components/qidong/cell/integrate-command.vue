<template>
  <div class="container">
    <div class="integrate-item" v-for="(value, key) in source" :key="key">
      <div class="integrate-top"  @click="openWinHandler(value)">
        <span class="icon-start" />
        <div class="integrate-icon" />
        <!-- <div class="integrate-label" v-text="key" /> -->
      </div>
      <div class="integrate-bottom">
        <span class="integrate-link" v-text="key"></span>
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

    }
  },
  methods: {
    openWinHandler (url) {
      url && window.open(url)
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
.integrate-item{
  width: 188px;
  height: 186px;
  margin: 0 3px;
  color: #fff;
}
.integrate-item:hover .integrate-top,
.integrate-item:hover .integrate-bottom
{
  background-color: #0966ff;
}
.integrate-top{
  height: 138px;
  margin-bottom: 2px;
  background-color: #121c38;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all .2s ease-in;
  position: relative;
  cursor: pointer;
}
.icon-start{
  position: absolute;
  right: 14px;
  top: 10px;
  width: 10px;
  height: 10px;
  background: url(../../../assets/images/icon-start.png) no-repeat;
}
.integrate-icon{
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
}
.integrate-item:nth-child(1) .integrate-icon{
  background: url(../../../assets/images/icon_wldc.png) no-repeat center center;
}
.integrate-item:nth-child(2) .integrate-icon{
  background: url(../../../assets/images/icon_mqsq.png) no-repeat center center;
}
.integrate-item:nth-child(3) .integrate-icon{
  background: url(../../../assets/images/icon_110.png) no-repeat center center;
}
.integrate-item:nth-child(4) .integrate-icon{
  background: url(../../../assets/images/icon_csgl.png) no-repeat center center;
}
.integrate-item:nth-child(5) .integrate-icon{
  background: url(../../../assets/images/icon_hjbh.png) no-repeat center center;
}
.integrate-label{
  font-size: 26px;
}
.integrate-bottom{
  height: 46px;
  background-color: #121c38;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .2s ease-in;
}
.integrate-link{
  min-width: 54px;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  font-size: 26px;
  padding: 5px 10px;
  /* background-color: #479cfa; */
}
</style>
