import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import {
	createPinia
} from 'pinia'
import uView from '@/uni_modules/vk-uview-ui'
import loadingPage from '@/components/loadingPage/index.vue'
import {
	useSystem
} from '@/stores/system'
import router from '@/utils/router'
import share from '@/utils/share'
export function createApp() {
	const app = createSSRApp(App)
	// 使用 pinia
	app.use(createPinia())
	// 使用 uView UI
	app.use(uView)
	// 使用路由拦截器
	app.use(router)
	//使用混合
	app.mixin(share)
	// 注册加载页全局组件
	app.component('LoadingPage', loadingPage)
	useSystem().initHeaderHeight()
	return {
		app
	}
}
// #endif