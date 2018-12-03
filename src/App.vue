<template>
  <div id="app" class="app-qd">
    <router-view></router-view>
  </div>
</template>

<script>
import RSS from './util/resetScreenSize'
export default {
  name: 'app',
  watch: {
    '$route' (newVal) {
      RSS(5280, 1620)
    }
  },
  mounted () {
    RSS(5280, 1620)
  }
}
</script>

<style>
@import './style/reset.css';
#app {
	position: fixed;
	width: 1920px;
	height: 1080px;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-size: cover;
  transform-origin: top left;
  user-select: none;
}

/* 崇川区文峰街道 */
#app.app-qd{
  width: 5280px;
  height: 1620px;
  background: url(./assets/img/qd-bg.png) no-repeat;
}
</style>
