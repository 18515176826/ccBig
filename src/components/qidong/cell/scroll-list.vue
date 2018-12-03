<template>
  <div class="scroll-list">
    <ul class="list-wrapper" style="height: 64px;background-color: #0966ff;">
      <li class="header-wrapper">
        <div class="header-tab" v-for="(ele, index) in header" :style="`flex:${ele.flex};color:${ele.color}`" :key="index">
          {{ele.des}}
        </div>
      </li>
    </ul>
    <ul class="list-wrapper" :id="formId" @mousemove="stopScroll" @mouseout="doScroll">
      <li class="list-item" v-for="(item, index) in source" :key="index" @click="recordClick(item)">
        <!-- <div :title="des" class="header-tab list-row" v-for="(des, cIndex) in item.textArr" :key="cIndex" :style="`flex:${header[cIndex].flex};background:${index % 2 > 0 ? '#11439d' : 'transparent'};color:${item.level ? colorDic[item.level] : '#fff'}`"> -->
        <div :title="des" class="header-tab list-row" v-for="(des, cIndex) in item.textArr" :key="cIndex" :style="`flex:${header[cIndex].flex};`">
          {{formatValue(cIndex,des)}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'scroll-list',
  props: {
    formId: {
      type: String,
      default: 'list-body'
    },
    colorDic: {
      type: Object,
      default: () => {
        return {
          '1': '#a3152e',
          '2': '#ff5bf5',
          '3': '#ffdd60'
        }
      }
    },
    header: {
      type: Array,
      default: () => {
        return []
      }
    },
    source: {
      type: Array
    },
    nopadding: {
      type: Boolean,
      default: false
    },
    formatValue: {
      type: Function,
      default: (index, value) => {
        return value
      }
    }
  },
  data () {
    return {
      allowScroll: true,
      hasScroll: false
    }
  },
  methods: {
    recordClick (item) {
      this.$emit('click', item)
    },
    stopScroll () {
      this.allowScroll = false
    },
    doScroll () {
      this.allowScroll = true
    },
    autoScroll (startTimeTemp, listWrapper, flag = true) {
      let maxHeight = listWrapper.scrollHeight
      let currentTimeTemp = new Date().getTime()
      if (currentTimeTemp - startTimeTemp > 50 && flag) {
        if ((listWrapper.scrollTop + listWrapper.offsetHeight) < (maxHeight - 1)) {
          listWrapper.scrollTop += 1
        } else {
          listWrapper.scrollTop = 0
        }
        startTimeTemp = new Date().getTime()
      }
      requestAnimationFrame(() => this.autoScroll(startTimeTemp, listWrapper, this.allowScroll))
    }
  },
  mounted () {
    let startTimeTemp = new Date().getTime()
    const listWrapper = document.getElementById(this.formId)
    setTimeout(() => requestAnimationFrame(() => this.autoScroll(startTimeTemp, listWrapper, this.allowScroll)), 500)
  }

}
</script>

<style scoped>
.scroll-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.list-wrapper {
  height: 100%;
  overflow: hidden;
}

.header-wrapper {
  display: flex;
  width: 100%;
}

.header-tab {
  background-color: transparent;
  margin-left: 5px;
  color: #fff;
  line-height: 64px;
  font-size: 30px;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.list-item {
  display: flex;
  height: 63px;
  line-height: 63px;
}

.list-item:hover {
  cursor: pointer;
}

.list-row {
  font-size: 20px;
  background: transparent;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.list-item:nth-child(even){
  color: #d4def6;
  background-color: rgba(51, 71, 113, .4);
}
.list-item:nth-child(even) .list-row{
  color: #d4def6;
}
.list-item:nth-child(odd) .list-row{
  color: #2278ec;
}
</style>
