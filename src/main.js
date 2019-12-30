// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.robot_url = "http://127.0.0.1:8887";
Vue.prototype.wx_url = "http://127.0.0.1:8877";
Vue.prototype.$ = $;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
