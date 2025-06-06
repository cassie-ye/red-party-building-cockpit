import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueParticles from 'vue-particles'
import Vcomp from './components/index'
import Toast from './components/toast'
import * as echarts from 'echarts';
import VScaleScreen from 'v-scale-screen'

import '@/assets/styles/base.scss'
import '@/assets/styles/common.scss'
import '@/assets/iconfont/iconfont.css'

import dataV from '@jiaminghi/data-view'

Vue.use(vueParticles)
Vue.use(Vcomp)
Vue.use(VScaleScreen)
Vue.use(dataV)

Vue.config.productionTip = false

Vue.prototype.$Toast = Toast
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
	  document.title = to.meta.title;
	}
	next();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
