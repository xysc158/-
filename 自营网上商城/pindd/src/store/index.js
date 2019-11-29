// 引入模块
import Vue from 'vue'
import Vuex from 'vuex'

// 引入文件
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'

// 1.使用vuex
Vue.use(Vuex)

// 2.对外输出 vuex的 store 对象
export default new Vuex.Store({
    actions,
    mutations,
    getters,
    state
})