//引入对应模块
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入一级路由组件模块
import Home from './../pages/Home/Home'
import Chat from './../pages/Chat/Chat'
import Me from './../pages/Me/Me'
import Recommend from './../pages/Recommend/Recommend'
import Search from './../pages/Search/Search'
// 引入二级路由
import Hot from './../pages/Home/Children/Hot/Hot'
import Box from './../pages/Home/Children/Box'
import Dress from './../pages/Home/Children/Dress'
import Ele from './../pages/Home/Children/Ele'
import Food from './../pages/Home/Children/Food'
import General from './../pages/Home/Children/General'
import Man from './../pages/Home/Children/Man'
import Mbaby from './../pages/Home/Children/Mbaby'
import Shirt from './../pages/Home/Children/Shirt'
// 使用使用 
Vue.use(VueRouter)
// 输出路由对象
export default new VueRouter({
    // 配置一级路由
    routes:[
        {
            path: '/home',
            component: Home,
            children:[
                {
                    path:'hot',
                    component:Hot
                },
                {
                    path:'box',
                    component:Box
                },
                {
                    path:'dress',
                    component:Dress
                },
                {
                    path:'ele',
                    component:Ele
                },
                {
                    path:'food',
                    component:Food
                },
                {
                    path:'general',
                    component:General
                },
                {
                    path:'man',
                    component:Man
                },
                {
                    path:'mbaby',
                    component:Mbaby
                },
                {
                    path:'shirt',
                    component:Shirt
                },
                {
                    path:'/home',
                    redirect:'/home/hot'
                }
            ]
        },
        {
            path: '/chat',
            component: Chat
        },
        {
            path: '/me',
            component: Me
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/',
            redirect: 'home/hot'
        }
    ]
})