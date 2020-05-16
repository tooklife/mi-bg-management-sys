// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Animate from 'animate.css'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import './assets/css/public.css'
// import Blod from './assets/js/excel/Blob'
// import Export2Excel from './assets/js/excel/Export2Excel'

import $ from 'jquery';

Vue.use(ElementUI)
Vue.use(Animate)
Vue.component('chart', ECharts)

Vue.prototype.$axios = axios;

import './assets/css/public.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
