
<template>
<!-- 地图 -->
<section class="cmap-mod">
  <div id="map-box"></div>
  <!-- <aside class="tip-box" :style="tipPostion ? `top:${tipPostion.y}px; left:${tipPostion.x}px;`: ''"> -->
  <aside class="tip-box" v-if="tipPostion && !noTip" :style="tipPostion ? `top:${tipPostion.y - 40}px; left:${tipPostion.x + 40}px;`: ''">
    <header>
      {{tipInfo.name}}
    </header>
    <ul class="tip-info">
      <li class="tip-item" v-for="item in tipInfo.data" :key="item.name">
        <div v-if='item.name === "网格员姓名"'>

        </div>
        <div v-else>
          {{item.name}}:
          <span>{{item.value}}</span>
        </div>
      </li>
    </ul>
  </aside>
</section>
</template>

<script>
import { setMap } from '../../../util/mapUtil-newstyle2'

export default {
  data () {
    return {
      tipPostion: null,
      tipInfo: {
        name: '',
        data: []
      }
    }
  },
  props: {
    mapInfo: Object,
    noTip: {
      type: Boolean,
      default: false
    },
    mapTipInfo: {
      type: Object
    }
  },
  watch: {
    mapInfo: function (newMapInfo) {
      setMap(
        '#map-box',
        'map-tip-box',
        newMapInfo,
        (index, data, evt) => {
          if (index < 0) {
            this.tipPostion = null
          } else {
            this.tipPostion = Object.assign(
              {},
              {
                x: evt.offsetX - 50,
                y: evt.offsetY - 200
              }
            )
            this.tipInfo = this.mapTipInfo[data['name']] ? this.mapTipInfo[data['name']] : null
          }
        },
        (index, data) => {
          this.$emit('areaClick', { index, data })
        }
      )
    },
    mapTipInfo: function (newMapInfo) {
      // console.log('mapTipInfo', newMapInfo)
    }
  },
  mounted: function () {
    setMap(
      '#map-box',
      'map-tip-box',
      this.mapInfo,
      (index, data, evt) => {
        if (index < 0) {
          this.tipPostion = null
        } else {
          this.tipPostion = Object.assign(
            {},
            {
              x: evt.offsetX - 50,
              y: evt.offsetY - 220
            }
          )
          this.tipInfo = this.mapTipInfo[data['name']] ? this.mapTipInfo[data['name']] : null
        }
      },
      (index, data) => {
        this.$emit('areaClick', { index, data })
      }
    )
  }
}
</script>

<style>
#map-box,
.cmap-mod {
  position: relative;
  height: 100%;
}

.tip-box {
  position: absolute;
  /* background: rgba(0, 0, 0, 0.7); */
  /* border: 2px solid #41b2ce; */
  /* border-radius: 3px; */
  pointer-events: none;
  white-space: nowrap;
  /* color: #fff; */
  width: 500px;
  min-height: 240px;
  box-shadow: 0px 0px 10px 1px #214087;
  z-index: 99;
  background-image: url(../../../assets/images/popover-bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: rgba(22, 23, 28, .7);
  border-bottom-right-radius: 20px;
}
.tip-box > header{
  width: 100%;
  height: 42px;
  line-height: 42px;
  padding-right: 10px;
  margin-top: 25px;
  /* background-color: rgba(22, 23, 28, .7); */
  text-align: left;
  text-indent: 1em;
  /* border-right: 4px solid #fff; */
  color: #3f89ff;
  font-size: 30px;
  box-sizing: border-box;
}
.tip-info {
  width: 100%;
  min-height: 106px;
  margin-top: 6px;
  overflow-y: auto;
  margin-bottom: 20px;
  /* background-color: rgba(22, 23, 28, .7); */
}
.tip-item{
  width: 50%;
  height: 40px;
  line-height: 40px;
  float: left;
  text-align: left;
  color: #cee1ff;
  font-size: 28px;
  padding-left: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
}
.tip-item > span{
  color: #cee1ff;
}
</style>
