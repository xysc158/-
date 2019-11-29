<template>
  <div id="app">
    <router-view v-if="isRouterAlive" ></router-view>
    <tab-bar v-if="$route.meta.showBottomTaBar"></tab-bar>
  </div>
</template>
<script>
import TabBar from './components/TabBar/TabBar'
  export default {
    name:"App",
    data(){
      return {
        isRouterAlive:true
      }
    },
    provide(){
      return {
        reload:this.reload
      }
    },
    created(){
      this.$store.dispatch('getUserInfo')
    },
    components:{
      TabBar
    },
    methods: {
      reload(){
          this.isRouterAlive=false
          this.$nextTick(function(){
            this.isRouterAlive=true
          })
      }
    }
  }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background-color #f5f5f5
</style>





































