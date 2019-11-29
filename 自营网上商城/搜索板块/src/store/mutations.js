import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    RECOMMEND_SHOP_LIST,
    SEARCH_GOODS,
}from './mutation-types'
export default{
    [HOME_CASUAL](state,{homecasual}){ // 参数二： actions提交过来的对象
        state.homecasual= homecasual
        // .homecasual 为state.js 中的对象
    },
    [HOME_NAV](state,{homenav}){ // 参数二： actions提交过来的对象
        state.homenav= homenav
        // .homecasual 为state.js 中的对象
    },
    [HOME_SHOP_LIST](state,{homeshoplist}){ // 参数二： actions提交过来的对象
        state.homeshoplist= homeshoplist
        // .homecasual 为state.js 中的对象
    },
    [RECOMMEND_SHOP_LIST](state,{recommendshoplist}){ // 参数二： actions提交过来的对象
        state.recommendshoplist= recommendshoplist
        // .homecasual 为state.js 中的对象
    },
    [ SEARCH_GOODS](state,{searchgoods}){
        state.searchgoods=searchgoods
    }
    
}