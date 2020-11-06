import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import echarts from "echarts";
// import BaiduMap from 'vue-baidu-map'

Vue.use(ViewUI)
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'rpSv7RsGWmLUeBvOWyZrbu0a8nUohXEM'
// })
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
