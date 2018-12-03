import Vue from 'vue'
import Router from 'vue-router'
import QiDongScreen from '@/components/qidong'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'qd-screen',
      component: QiDongScreen
    }
  ]
})
