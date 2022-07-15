import Vue from 'vue'
import './plugins/tagcloud'
import './plugins/muse'
import { isPC } from './plugins/isPC'
import './global.less'
import './assets/icon/material-icons.css'
import App from './App.vue'
import router from './router'
import store from './store'

//axios请求
import axios from "@/plugins/axios";
Vue.prototype.$axios = axios;

import * as filters from "./plugins/filter";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k])); //注册过滤器
Vue.prototype.filterDate = filters.filterDate;
Vue.prototype.filterNumber = filters.filterNumber;

Vue.config.productionTip = false
Vue.prototype.isPC = isPC
Vue.prototype.avatar = "http://cdn.menglinfeng.top/img/avatar.png";

//懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "http://cdn.menglinfeng.top/img/loadingImg.gif",
  loading: "http://cdn.menglinfeng.top/img/loading.gif",
  attempt: 1,
});

import "muse-ui-loading/dist/muse-ui-loading.css";
import Loading from "muse-ui-loading";
Vue.use(Loading, {
  overlayColor: "transparent", // 背景色
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
