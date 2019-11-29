// 导入功能模块
import Vue from 'vue'
import App from './App'
import store from './store/index'
import UiNuclearMobile from 'ui-nuclear-mobile'
import 'ui-nuclear-mobile/dist/main.css'
Vue.use(UiNuclearMobile)
// 引入路由器 
import router from './router/index'
// 移动端 ui 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Mint from 'mint-ui';
// css 预编译器
import 'mint-ui/lib/style.css';
Vue.use(Mint)
import { Actionsheet } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
 // 1.引入第三方库
import LyTab from 'ly-tab'
// 引入字体图标
import '@/common/css/style.css'
// 导入css
import '@/common/foot/iconfont.css'
// 使用第三方库
import '../node_modules/vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage';
import Vant from 'vant';
Vue.use( Vant );
import 'vant/lib/index.css';
import Axios from 'axios'
Vue.prototype.$axios = Axios;
import qs from 'qs'
import  VueJsonp  from  'vue-jsonp'
Vue.use(VueJsonp)
Vue.use(VueAreaLinkage)
Vue.use(LyTab)
Vue.use(qs)
new Vue({
    el: "#app",
    router,
    store,
    render:h=>h(App),
})





