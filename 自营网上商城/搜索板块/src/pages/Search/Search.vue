<template>
  <div class="search">
    <!-- 搜索导航 -->
    <search-nav />
    <div class="shop">
      <!-- 左边 -->
      <div class="menu-wrapper">
        <!-- current -->
          <ul>
            <li class="menu-item " v-for="(goods,index) in searchgoods" :key="index" >
              <span>{{goods.name}}</span>
            </li>
          </ul>
      </div>
      <!-- 右边 -->
      <div class="shop-wrapper">
           <ul>
            <li class="shops-li" v-for="(goods,index1) in searchgoods" :key="index1">
              <div class="shops-title">
                <h4>{{goods.name}}</h4> 
                <a href="">查看更多 ></a>
              </div>
              <ul class="phone-type" v-if="goods.tag==='phone'">
                <li v-for="(phone,index) in goods.category" :key="index">
                  <img :src="phone.icon" alt="">
                </li>
              </ul>
              <ul class="shops-items">
                  <li v-for="(item,index2) in goods.items" :key="index2">
                    <img :src="item.icon" alt="">
                    <span>{{item.title}}</span>
                  </li>
                </ul>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    name:"Search",
    components:{
      SearchNav
    },
    mounted(){
      this.$store.dispatch('reqSearchGoods')
    },
    computed:{
      ...mapState(['searchgoods'])
    },
    watch:{
      searchgoods(){
          this.$nextTick(()=>{
            this._initBScroll();
          })
      },
    },
     methods: {
      _initBScroll(){
        // 1.1 左边
        let leftScroll= new BScroll('.menu-wrapper',{})
        let rightScroll= new BScroll('.shop-wrapper',{})  
      },
    },
  }
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .search
    background #f5f5f5
    width 100%
    height  100%
    overflow hidden
  .shop
    display flex 
    position absolute
    top 60px
    bottom 50px
    width 100%
    overflow hidden
    .menu-wrapper
      width 80px
      .menu-item
        width 100%
        height 60px
        background white
        display flex
        justify-content center
        align-items center
        font-weight lighter
        color #666666
        position relative
      .current
        color #e02e24
      .current::before
        content ''
        background-color #e02e24
        width 4px
        height 30px
        position absolute
        left 0
    .shop-wrapper
      flex 1
      background-color #fff
      .shops-title
        display flex
        flex-direction row
        padding 0 10px
        height 44px
        align-items center
        justify-content space-between
        color #999
        a
         color #999999
         text-decoration none
         font-weight lighter
      .shops-items
        display flex
        flex-wrap wrap
        li
          display flex
          flex-direction column
          width 33.3%
          height 90px
          justify-content center
          align-items center
          color #666
          font-weight lighter
          font-size 14px
          img 
            width 60%
            height 60%
            margin-bottom 5px
      .phone-type
        width 100%
        display flex
        flex-direction row
        flex-wrap wrap
        border-bottom-1px(#ccc)
        li
          width 33.3%
          display flex
          justify-content center
          align-items center
          margin 5px 0
          img 
           width 70%



</style>