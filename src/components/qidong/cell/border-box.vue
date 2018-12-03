<template>
  <div class="border-box-cont">
    <div class="corner-style-cont">
      <span class="corner-style-item style-1" />
      <span class="corner-style-item style-2" />
      <span class="corner-style-item style-3" />
      <span class="corner-style-item style-4" />
      <span class="corner-style-item style-5" />
    </div>
    <div class="title-cont" v-text="title"></div>
    <div class="body-cont">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.border-box-cont{
  width: 100%;
  height: calc( 100% - 12px );
  position: relative;
  box-sizing: border-box;
}
.corner-style-cont{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.corner-style-item{
  position: absolute;
  z-index: 99;
}
.style-1{
  width: 40px;
  height: 40px;
  top: 63px;
  right: -1px;
  background: url(../../../assets/images/corner-1.png) no-repeat;
}
.style-2{
  width: 14px;
  height: 140px;
  top: 30%;
  left: -14px;
  background: url(../../../assets/images/corner-2.png) no-repeat;
}
.style-3{
  width: 14px;
  height: 140px;
  top: 30%;
  right: -14px;
  background: url(../../../assets/images/corner-3.png) no-repeat;
}
.style-4{
  width: 40px;
  height: 40px;
  bottom: 1px;
  left: -1px;
  background: url(../../../assets/images/corner-4.png) no-repeat;
}
.style-5{
  width: 136px;
  height: 18px;
  bottom: 6px;
  right: -10px;
  background: url(../../../assets/images/corner-5.png) no-repeat;
}
.title-cont{
  width: 100%;
  height: 48px;
  line-height: 48px;
  margin: 0 0 16px 0;
  text-align: left;
  text-indent: 43px;
  font-size: 38px;
  color: #fff;
  background: url('../../../assets/images/title-with-icon.png') no-repeat;
}
.body-cont{
  width: 100%;
  height: calc( 100% - 67px );
  border: 2px solid #2e45a0;
  position: relative;
  box-sizing: border-box;
  background-image: linear-gradient(rgba(22, 37, 100, .2), rgba(99, 122, 236, .1));
}
</style>
