/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from '@/store/index.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import elDialog from './components/dialog-component/myDialog'
console.log(elDialog, 'dialog',elDialog.install)
Vue.prototype.$tips = elDialog.install;

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
