
<template>
  <div class="bottom-tab">
    <span class="tab-item" @click="switchTo('/home')">
      <img :src="$route.path.includes('/home') ? tabBarImgArr[0].select:tabBarImgArr[0].normal" alt="">
      <span :class="{on:$route.path.includes('/home')}">首页</span>
    </span>
    <span class="tab-item" @click="switchTo('/recommend')">
      <img :src="$route.path.includes('/recommend') ?tabBarImgArr[1].select:tabBarImgArr[1].normal" alt="">
      <span :class="{on:$route.path.includes('/recommend')}">推荐</span>
    </span>
    <span class="tab-item" @click="switchTo('/search')">
      <img :src="$route.path.includes('/search') ?tabBarImgArr[2].select:tabBarImgArr[2].normal" alt="">
      <span :class="{on:$route.path.includes('/search')}">搜索</span>
    </span>
    <span class="tab-item" @click="switchTo('/chat')">
      <img :src="$route.path.includes('/chat') ?tabBarImgArr[3].select:tabBarImgArr[3].normal" alt="">
      <span :class="{on:$route.path.includes('/chat')}">聊天</span>
    </span>
    <span class="tab-item" @click="switchTo('/me')">
      <img :src="$route.path.includes('/me') ?tabBarImgArr[4].select:tabBarImgArr[4].normal" alt="">
      <span :class="{on:$route.path.includes('/me')}">我的</span>
    </span>
  </div>
</template>

<script>
  export default {
    name:"TarBar",
    data(){
      return {
        tabBarImgArr:[
          {normal:require('./../../../static/img/icon_home.png'),select:require('./../../../static/img/icon_home_selected.png')},
          {normal:require('./../../../static/img/icon_intro.png'),select:require('./../../../static/img/icon_intro_selected.png')},
          {normal:require('./../../../static/img/icon_search.png'),select:require('./../../../static/img/icon_search_selected.png')},
          {normal:require('./../../../static/img/icon_chat.png'),select:require('./../../../static/img/icon_chat_selected.png')},
          {normal:require('./../../../static/img/icon_mine.png'),select:require('./../../../static/img/icon_mine_selected.png')}
        ]
      }
    },
    methods:{
      switchTo(path){
          // console.log(this.$router);
          this.$router.replace(path)
      }
    },

  }
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
  .bottom-tab
    width 100%
    height 50px
    background-color #fff
    position fixed
    left 0
    bottom 0
    display flex
    z-index 999
    .tab-item
        display flex
        flex 1
        flex-direction column
        align-items center
        justify-content  center
        font-size 14px
        color #666
        img
          width 35%
          margin-bottom 2px
        .on
          color red

</style>