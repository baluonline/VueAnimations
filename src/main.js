import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import test from './router.js';

Vue.config.productionTip = false
Vue.use(VueRouter);
const router = new VueRouter({routes:test});


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
