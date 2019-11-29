import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList,
    getRecommendShopList,
    getSearchGoods
} from '../api'
import { 
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    RECOMMEND_SHOP_LIST,
    SEARCH_GOODS

} from './mutation-types'

export default{
    // 1.获取首页轮播图
    async reqHomeCasual({commit}){ // async 代表异步的操作
        const result= await getHomeCasual() // await 代表将异步转变为同步的 原则上还是异步的
        // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
        // result中的对象为promise对象
        commit(HOME_CASUAL,{homecasual:result.message.data})
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
        async reqRecommendShopList({commit}){ // async 代表异步的操作
            const result= await getRecommendShopList() // await 代表将异步转变为同步的 原则上还是异步的
            // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
            // result中的对象为promise对象
            commit(RECOMMEND_SHOP_LIST,{recommendshoplist:result.message.data})
            // 将数据传递到 mutations中去
        },
        // 获取搜索类别数据
        async reqSearchGoods({commit}){ // async 代表异步的操作
            const result= await getSearchGoods() // await 代表将异步转变为同步的 原则上还是异步的
            // await 是因为 moutations中为同步的而 actions为异步 所以必须先得到返回的一个 promise对象 
            // result中的对象为promise对象
            commit(SEARCH_GOODS,{searchgoods:result.message.data})
            // 将数据传递到 mutations中去
        },

}