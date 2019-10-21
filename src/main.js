// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Trend from "vuetrend"
import BootstrapVue from 'bootstrap-vue'
import '../bootstrap.css'
import '../bootstrap.min.css'

Vue.use(BootstrapVue)
Vue.use(Trend)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})