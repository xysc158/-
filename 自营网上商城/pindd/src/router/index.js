//引入对应模块
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入一级路由组件模块
import Home from './../pages/Home/Home'
import Chat from './../pages/Chat/Chat'
import Me from './../pages/Me/Me'
import Login from './../pages/Login/Login'
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
import Mesetting from './../pages/Me/MeSetting'
import Medetail from './../pages/Me/MeDetail'
// 商品信息详情页
import Detail from './../pages/Detail/Detail'
import Head from './../pages/Me/Head'
// 查看收货地址
import MeShowAddress from "./../pages/Me/MeShowAddress";
// 添加收货地址
import MeAddAddress from './../pages/Me/MEAddAddress'
// 修改收货地址
import MeUpAddress from './../pages/Me/MeUpAddress'
// 修改登录密码
import UpLogin from './../pages/Login/UpLogin'
// 使用使用 
// 填写订单
import OrderForm from './../pages/OrderForm/OrderForm'
// 支付宝
import payGateWay from './../pages/OrderForm/payGateWay'
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
                    component:Hot,
                    meta: {showBottomTaBar: true}
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
            ],
        },
        {
            path:'/uplogin',
            component:UpLogin
        },
        {
            path: '/head',
            component:Head,
       
        },
        {
            path: '/detail',
            component:Detail,
        },
        {
            path: '/chat',
            component: Chat,
            meta: {showBottomTaBar: true}
        },
        {
            path: '/me',
            component: Me,
            meta: {showBottomTaBar: true},
        },
        
        {
            path: '/login',
            component: Login
        },
        {   
            path:'/orderform',
            component:OrderForm
        },
        {
            path:'/showaddress',
            component:MeShowAddress
        },
        {
            path:'/upaddress',
            component:MeUpAddress
        },
        {
            path:'/addaddress',
            component:MeAddAddress
        },
        {
            path: '/setting',
            component: Mesetting
        },
        {
            path:'/paygatway',
            component:payGateWay
        },
        {
            path: '/medetail',
            component: Medetail
        },
        {
            path: '/recommend',
            component: Recommend,
            meta: {showBottomTaBar: true}
        },
        {
            path: '/search',
            component: Search,
            meta: {showBottomTaBar: true}
        },
        {
            path: '/',
            redirect: 'home/hot'
        }
    ]
})