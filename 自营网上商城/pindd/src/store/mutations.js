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
        state.recommendshoplist= state.recommendshoplist.concat(recommendshoplist)
        // .homecasual 为state.js 中的对象
    },
    [ SEARCH_GOODS](state,{searchgoods}){
        state.searchgoods=searchgoods
    },
    [USER_INFO](state, {userInfo}) {
        state.userInfo = userInfo;
    },
    [RESET_USER_INFO](state) {
    state.userInfo = {};
    },
    [CART_GOODS_LIST](state, {cartgoods}) {
        state.cartgoods = cartgoods;
      },  
    [GET_ADDRESS_INFO](state,{addressinfo1}){
        state.addressinfo1 = addressinfo1;
    } ,
    [SE_CART_SUM](state,{secartsum}){
        state.secartsum=secartsum
    },
    [SE_ADDRESS_DEF](state,{deaddress}){
        state.deaddress=deaddress
    },
    [SHOPPING_INFO](state,info){
        state.shopinfo=info
    }
}