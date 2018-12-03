<template>
  <div class="popover-cont" @click="closeHandler">
    <div class="wrapper">
      <div class="base-info-cont">
        <h3 class="base-info-title">基础信息</h3>
        <ul class="base-info-detail">
          <li
            class="detail-item"
            v-for="item in source.baseInfo"
            :key="item.name">
            <h4>{{item.name}}</h4>
            <p>{{item.value}}</p>
          </li>
        </ul>
      </div>
      <div class="deal-status-cont">
        <h3 class="deal-status-title">处理状态</h3>
        <div class="scroll-wrapper">
          <ul class="deal-status-detail">
            <li
              class="status-item"
              v-for="item in source.dealStatus"
              :key="item.time">
              <span class="deal-time">{{item.time}}</span>
              <span class="status-bar"> </span>
              <span class="deal-grid">{{item.grid}}</span>
              <span class="deal-grider">{{item.grider}}</span>
              <span class="deal-status">{{item.status}}</span>
              <!-- <span>本事件</span> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    source: {
      type: Object,
      default: () => {
        return {
          baseInfo: [
            { name: '事件名称', value: '安全隐患' },
            { name: '创建时间', value: '2018/03/01' },
            { name: '事件来源', value: '全要素网格通' },
            { name: '事件类型', value: '物业管理' },
            { name: '发生时间', value: '2018/03/01 18:23' },
            { name: '发生网格', value: '青龙家园社区-青龙家园社区第四网格' },
            { name: '详细地址', value: '青龙家园14幢' },
            { name: '事件内容', value: '严禁不实、诽谤、辱骂，特别禁止传播敏感话题、淫秽信息、个人隐私，在遵守国家对于互联网相应的法律法规的前提下友善发帖。' }
          ],
          dealStatus: [
            { time: '2018/03/01 18:23', grid: '【青龙家园社区第四网格】', grider: '周文龙', status: '结案' },
            { time: '2018/03/01 15:23', grid: '【青龙家园社区第四网格】', grider: '周文龙', status: '办理' },
            { time: '2018/03/01 12:23', grid: '【青龙家园社区第四网格】', grider: '周文龙', status: '新增' },
            { time: '2018/03/01 11:23', grid: '【青龙家园社区第四网格】', grider: '周文龙', status: '结案' },
            { time: '2018/03/01 10:23', grid: '【青龙家园社区第四网格】', grider: '周文龙', status: '办理' }
          ]
        }
      }
    }
  },
  methods: {
    closeHandler () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.popover-cont{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.wrapper{
  width: 1800px;
  height: auto;
  min-height: 400px;
  margin: 0 auto;
}
.base-info-cont, .deal-status-cont{
  width: 100%;
  text-align: left;
}
.base-info-title, .deal-status-title{
  font-size: 38px;
  height: 60px;
  line-height: 60px;
  color: #fff;
  padding-left: 30px;
  box-sizing: border-box;
  position: relative;
}
/* .base-info-title::before, .deal-status-title::before{
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  width: 20px;
  height: 20px;
  background: url('../../../../static/images/icon/workbench-fill.png') no-repeat;
  background-size: 100% 100%;
}
.base-info-title::after, .deal-status-title::after{
  content: '';
  height: 3px;
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  background: url('../../../../static/images/icon/title_line.png') no-repeat;
  background-size: 100% 100%;
} */
.base-info-detail{
  width: 100%;
  height: auto;
  overflow: hidden;
}
.detail-item{
  width: 100%;
  height: auto;
  float: left;
}
.detail-item:nth-child(2), .detail-item:nth-child(3), .detail-item:nth-child(4), .detail-item:nth-child(5){
  width: 50%;
}
.detail-item:nth-child(2), .detail-item:nth-child(4){
  width: calc( 50% - 15px );
  margin-right: 15px;
}
.detail-item > h4{
  height: 60px;
  line-height: 60px;
  font-size: 28px;
  color: #00bdf4;
}
/* .detail-item > p{
  min-height: 60px;
  line-height: 60px;
  padding: 0 2em;
  font-size: 24px;
  color: #cbcbcb;
  background: url('../../../../static/images/icon/react-square-bg.png') no-repeat;
  background-size: 100% 100%;
} */
.deal-status-cont{
  margin-top: 15px;
}
.deal-status-cont .scroll-wrapper{
  width: 100%;
  height: 140px;
  margin-top: 15px;
  /* overflow: hidden; */
  overflow-y: auto;
}
.deal-status-cont .scroll-wrapper .deal-status-detail{
  width: 100%;
  /* height: auto; */
  overflow-y: auto;
}
.status-item{
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  display: flex;
}

.status-item .deal-time{
  width: 300px;
  color: #c1c1c2;
}
.status-item .status-bar{
  width: 30px;
  position: relative;
}
/* .status-item .status-bar::before{
  content: '';
  position: absolute;
  top: 15px;
  width: 16px;
  height: 16px;
  background: url('../../../../static/images/icon/circle-point.png') no-repeat;
  background-size: 100% 100%;
} */
.status-item .status-bar::after{
  content: '';
  position: absolute;
  top: 35px;
  left: 7px;
  width: 3px;
  height: 22px;
  background-color: #015173;
}
.status-item:last-child .status-bar::after{
  height: 0;
}
.status-item .deal-grid{
  margin-right: 10px;
}
.status-item .deal-grider{
  margin-right: 10px;
}
.status-item .deal-status{
  color: #00b5e9;
  margin-right: 10px;
}
</style>
<style>
.deal-status-cont .scroll-wrapper::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
.deal-status-cont .scroll-wrapper::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px #00c6ff;
    background: #00c6ff;
}
.deal-status-cont .scroll-wrapper::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px #292936;
    border-radius: 0;
    background: #292936;
}
</style>
