// 导入功能模块
import Vue from 'vue'
import App from './App'
import store from './store/index'
// 引入路由器 
import router from './router/index'

 // 1.引入第三方库
import LyTab from 'ly-tab'
// 使用第三方库
Vue.use(LyTab)
new Vue({
    el: "#app",
    router,
    store,
    render:h=>h(App)
})