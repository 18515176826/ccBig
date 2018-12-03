<template>
  <div class="component-cont">
    <border-box title="基础数据">
      <base-data :source="baseSource"/>
    </border-box>
  </div>
</template>

<script>
import BorderBox from './cell/border-box'
import BaseData from './cell/base'
export default {
  name: 'LeftOne',
  components: {
    BaseData,
    BorderBox
  },
  props: {
    orgId: {
      type: Number
    }
  },
  data () {
    return {
      baseSource: {}
    }
  },
  watch: {
    orgId (newVal) {
      // console.log(`orgId changed : ${this.orgId}`)
      // switch (this.orgId) {
      //   case 5633:
      //     this.fetchBaseSource()
      //     break
      //   case 5721:
      //     this.fetchHpzSource()
      //     break
      //   case 5728:
      //     this.fetchHxcSource()
      //     break
      // }
    }
  },
  mounted () {
    this.fetchDefalutValue('contents/mock_wfjd/base-data.json', 'baseSource')
    // switch (this.orgId) {
    //   case 5633:
    //     this.fetchBaseSource()
    //     break
    //   case 5721:
    //     this.fetchHpzSource()
    //     break
    //   case 5728:
    //     this.fetchHxcSource()
    //     break
    // }
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
    fetchBaseSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQJPDataList.action?orgId=${this.orgId}`)
        .then(res => {
          this.baseSource = {
            '标准地址': res.data['标准地址'],
            '实有人口': res.data['实有人口'],
            '实有房屋': res.data['实有房屋'],
            '实有单位': res.data['实有单位'],
            '户籍人口': res.data['户籍人口'],
            '流动人口': res.data['流动人口'],
            '人房关联': res.data['人房关联'],
            '户籍家庭': res.data['户籍家庭']
          }
        })
        .catch(err => {
          if (err) {
            this.fetchDefalutValue('contents/mock_wfjd/base-data.json', 'baseSource')
          }
        })
    },
    fetchHpzSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQJPDataList.action?orgId=${this.orgId}`)
        .then(res => {
          this.baseSource = {
            '标准地址': res.data['标准地址'],
            '实有人口': 64977,
            '实有房屋': 28272,
            '实有单位': 256,
            '户籍人口': 63964,
            '流动人口': 1013,
            '人房关联': res.data['人房关联'],
            '户籍家庭': res.data['户籍家庭']
          }
        })
        .catch(err => {
          if (err) {
            // this.fetchDefalutValue('contents/mock_wfjd/base-data.json', 'baseSource')
          }
        })
    },
    fetchHxcSource () {
      this.http.get(`/cloudMap/cloudMapManager/findQJPDataList.action?orgId=${this.orgId}`)
        .then(res => {
          this.baseSource = {
            '标准地址': res.data['标准地址'],
            '实有人口': 3310,
            '实有房屋': 1379,
            '实有单位': 12,
            '户籍人口': 3277,
            '流动人口': 33,
            '人房关联': res.data['人房关联'],
            '户籍家庭': res.data['户籍家庭']
          }
        })
        .catch(err => {
          if (err) {
            // this.fetchDefalutValue('contents/mock_wfjd/base-data.json', 'baseSource')
          }
        })
    }
  }
}
</script>

<style scoped>
.component-cont{
  width: 448px;
  height: 100%;
  margin-right: 24px;
}
</style>
