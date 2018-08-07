// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import axios from "axios";
import * as Methods from '@/components/core/registerMethods';
import '@/components/core/registerFilter';
import Highlight from '@/components/util/highLight';
import 'highlight.js/styles/solarized-light.css' //highlight样式文件
import '@/assets/styles/default.css';
import '@/assets/styles/style.css';
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;



Vue.use(ElementUI);
Vue.use(Highlight);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.prototype.$axios = axios;
Vue.prototype.Methods = Methods;