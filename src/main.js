// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'

import router from './router'
import http from 'axios'
import qs from 'qs'
import echarts from 'echarts'
import liquidfill from 'echarts-liquidfill'

// 引用自动调整屏幕大小功能
// import RSS from './util/resetScreenSize'

// --------------------------------------------------------------
//      以下是为数据联调做的一些准备工作
http.defaults.baseURL = '/'
http.defaults.timeout = 30000;
//  http.defaults.baseURL = 'http://196.168.1.153:8080'
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// http.defaults.withCredentials = true
// http.interceptors.request.use(function (config) {
//   config.data = qs.stringify(config.data)
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })
// http.interceptors.response.use(function (response) {
//   try {
//     !response.data.success && console.log(response.data.error.errorMessage)
//   } catch (e) {
//     /* handle error */
//     console.log(e)
//   }
//   return response.data;
// }, function (error) {
//   console.log('请求服务器失败，请稍后重试')
//   return Promise.reject(error)
// });
// --------------------------------------------------------------
Vue.filter('NumFormat', function(value) {
  let intPart = Number(value).toFixed(0);
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return intPartFormat;
})
Vue.prototype.http = http   //  之后可直接使用 this.http 发起请求  不用每个页面import axios
Vue.prototype.$echarts = echarts  // 引入 echarts 到vue 原型链

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted: function() {
		// RSS()
  }
})




