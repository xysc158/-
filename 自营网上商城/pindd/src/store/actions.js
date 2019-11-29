import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList,
    getRecommendShopList,
    getSearchGoods,
    getUserInfo,
    getLogout,
    getCartsGoods,
    getAddressInfo,
    seCartSum,
    seaddress,
} from '../api'
import { 
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    RECOMMEND_SHOP_LIST,
    SEARCH_GOODS,
    USER_INFO,
    RESET_USER_INFO,
    CART_GOODS_LIST,
    GET_ADDRESS_INFO,
    SE_CART_SUM,
    SE_ADDRESS_DEF,
    SHOPPING_INFO
} from './mutation-types'
export default{ 
    // 1.获取首页轮播图
    async reqHomeCasual({commit}){ // async 代表异步的操作
        const result= await getHomeCasual() // await 代表将异步转变为同步的 原则上还是异步的
        // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
        // result中的对象为promise对象
        commit(HOME_CASUAL,{homecasual:result.message})
        // 将数据传递到 mutations中去
    },
    // 2.获取首页导航图图
    async reqHomeNav({commit}){ // async 代表异步的操作
        const result= await getHomeNav() // await 代表将异步转变为同步的 原则上还是异步的
        // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
        // result中的对象为promise对象
        commit(HOME_NAV,{homenav:result.message.data})
        // 将数据传递到 mutations中去
    },
    // 3.获取首页商品图
    async reqHomeShopList({commit}){ // async 代表异步的操作
        const result= await getHomeShopList() // await 代表将异步转变为同步的 原则上还是异步的
        // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
        // result中的对象为promise对象
        commit(HOME_SHOP_LIST,{homeshoplist:result.message.goods_list})
        // 将数据传递到 mutations中去
    },
    // 获取推荐商品数据
    async reqRecommendShopList({commit},params){ // async 代表异步的操作
        console.log(params)
        const result= await getRecommendShopList(params) // await 代表将异步转变为同步的 原则上还是异步的
        // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
        // result中的对象为promise对象
        commit(RECOMMEND_SHOP_LIST,{recommendshoplist:result.message})
        // 将数据传递到 mutations中去
        params.callback && params.callback()
    },
    // 获取搜索类别数据
    async reqSearchGoods({commit}){ // async 代表异步的操作
        const result= await getSearchGoods() // await 代表将异步转变为同步的 原则上还是异步的
        // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
        // result中的对象为promise对象
        commit(SEARCH_GOODS,{searchgoods:result.message.data})
        // 将数据传递到 mutations中去
    },
    // 同步用户信息
    syncUserInfo({commit}, userInfo){
        commit(USER_INFO, {userInfo});
        },
    // 异步获取用户信息
    async getUserInfo({commit}){ // async 代表异步的操作
        const result= await getUserInfo() 
        if(result.success_code === 200){
            commit(USER_INFO,{userInfo: result.message})
        }
        
    },
        // 8. 退出登录
    async logOut({commit}){
        const result = await getLogout();
        console.log(result);
        if(result.success_code === 200){
        commit(RESET_USER_INFO);
        }
    },  
        // 9. 请求购物车数据
    async reqCartsGoods({commit}) {
            const result = await getCartsGoods();
            if(result.success_code === 200){
            commit(CART_GOODS_LIST, {cartgoods: result.message})
            }
    },
        // 10. 请求用户收货地址  
    async reqAddressInfo({commit}){
        const result = await getAddressInfo();
        if(result.success_code===200){
            commit(GET_ADDRESS_INFO,{addressinfo1:result.message})
        }else{
            commit(GET_ADDRESS_INFO,{addressinfo1:result.message})
        }
    },
        // 查询购物车总计
    async reqSeCartSum({commit}){
        const result=await  seCartSum();
        if(result.message==200){
            commit(SE_CART_SUM,{secartsum:result.message})
        }else{
            commit(SE_CART_SUM,{secartsum:result.message})
        }
    } ,   
    // 请求默认地址
    async reqDeAddress({commit}){
         const result=await seaddress()
         if(result.success_code==200){
            commit(SE_ADDRESS_DEF,{deaddress:result.message})
         }
    },
    syncShopInfo({commit},info){
        commit(SHOPPING_INFO,info)
    }
} 