<template>
  <div class="wrapper">
    <div class="content">
    <div class="search-nav">
      <div class="search-input">
        <img src="./../images/search.png" alt width="25" />
        <input ref="search" type="search" placeholder="请输入商品名称" @input="focus1" />
        <img src="./../images/取消.png" alt="" width="25" v-show="flag" @click.prevent="cancel">
      </div>
      <button @click="isShowSearchPanel(flag);isShowitems(isstatus)" :class="{col:flag}">{{isstatus}}</button>
    </div>
    <div class="serach-content" v-if="nsearch">
      <div class="title">
        <img src="../images/hot.png" alt="" width="25">
        <span>热门搜索</span>
      </div>
       <ul class="search-list">
         <li @click.prevent="search('正品')">正品</li>
         <li @click.prevent="search('手机')">手机</li>
         <li @click.prevent="search('花花公子')">花花公子</li>
       </ul>
    </div>
    <div class="searchinfo" v-else-if="nnsearch">
        <div class="searchhead">
        <img src="./../images/搜索结果.png" alt="" width="25px" height="25px">
        <h2>搜索结果如下</h2>
        </div>
        <div class="items" v-for="item in items" :key="item.goods_id" >
          <img :src="item.thumb_url" alt="商品图片丢失" width="80" height="80">
          <div class="iteminfo">
          <h2>{{item.goods_name}}</h2>
          <p class="price">&yen;{{(item.price*0.01).toFixed(2)}}</p>
          <p class="bottom"><span>免运费</span>
             <span>{{item.sales_tip|splice}}人付款</span>
             <span>自营店</span>
          </p>
          </div>
        </div>
      </div>
      
    </div>
    <img class="top" src="./../images/top.png" v-if="nnsearch" @click.prevent="rtop">
    
    <div class="nosearch" v-else-if="nnnsearch">
        <!-- <img src="./../images/商城.png" alt="" srcset="" width="150" >
        <p>没有搜索结果</p>
        <p>没有找到相关商品</p> -->
          <van-dropdown-menu class="sx">
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
        <p>搜索结果未找到</p>
        <recommend/>
    </div> 
  </div>
</template>
<script>  
import { DropdownMenu, DropdownItem } from 'vant';
import Recommend from './../../Recommend/Recommend'
import {searchgooodslike} from "@/api/index"
import BScroll from 'better-scroll'
export default {
  name: "SearchPanel",
  data(){
    return{ 
      isstatus:'取消',
      flag:false,
      color:'color:red',
      items:[],
      nsearch:true,
      nnsearch:false,
      nnnsearch:false,
       value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ]
    }
   
  },
  components: {
    Recommend
  },
  watch: {
    isstatus(val){
        console.log(val)
    }
  },
  props:{
    isShowSearchPanel:Function
  },
  mounted(){
    this.$nextTick(()=>{
       this.scroll = new BScroll('.wrapper',{
        scrollY:true,
        click:true
      })
    })
  },
 filters: {
    splice(val){
        return val.replace(/[^0-9]/ig,"") //ig 区分大小写，全局模式
      }
  },
  methods:{
    // 通过状态的判断 执行 返回 或 搜索
   async isShowitems(isstatus){
        if(this.isstatus=="取消"){
          this.flag=false
        }else{
          this.flag=true
          console.log(this.$refs)
          let name=this.$refs.search.value
          console.log(name)
          let res=await searchgooodslike(name)
          if(res.success_code==200){
            if(res.message.length!=0){
                this.items=res.message
                this.nsearch=false
                this.nnsearch=true
            }else{
              this.nsearch=false
              this.nnsearch=false
              this.nnnsearch=true
            }
          }else{
            console.log("数据查询失败")
          }
        }
    },
    // 当焦点触发 状态 为 搜索状态
    focus1(){
      if(this.$refs.search.value==''){
            this.isstatus='取消'
            this.flag=false
      }else{
           this.isstatus="搜索"
           this.flag=true
      } 
    },
    // 取消搜索功能
    cancel(){
      this.flag=false
      this.isstatus='取消'
      this.$refs.search.value=''
      this.nsearch=true,
      this.nnsearch=false,
      this.nnnsearch=false
    },
    // 返回顶部
    rtop(){ 
     this.scroll.scrollTo(0, 0, 100)
    },
    // 热门搜索
    async search(item){
    this.$refs.search.value=item
    this.isstatus='搜索'
    this.flag=true
    
    // this.$options.methods.isShowitems(this.isstatus)
      let res=await searchgooodslike(item)
          if(res.success_code==200){
            if(res.message.length!=0){
                this.items=res.message
                this.nsearch=false
                this.nnsearch=true
            }else{
              this.nsearch=false
              this.nnsearch=false
              this.nnnsearch=true
            }
          }else{
            console.log("数据查询失败")
          }
    }
  },


};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.wrapper 
  width 100%
  height 100%
  background-color #f5f5f5
  position fixed
  left 0
  top 0
  z-index 1000
  .search-nav
    width 100%
    height 60px
    background-color #fff
    border-bottom-1px(#ddd)
    padding 0 20px
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    .col
      color black
    .search-input
      display flex
      flex-direction row
      align-items center
      background-color #ededed
      width 85%
      height 35px
      border-radius 10px
      padding 0 10px
      input
        width 90%
        height 90%
        padding-left 8px
        font-size 16px
        background  transparent
        outline none
    button 
      background  transparent
      font-size 16px
      color #aaa
  .serach-content
    padding 30px 15px
    background-color #fff
    .title
      display flex
      flex-direction row
      align-items center
      color #aaaaaa
      margin-bottom 10px
    .search-list
      display flex
      flex-direction row
      flex-wrap wrap
      li
        background #fafafa
        color #aaaaaa
        margin 5px 10px
        padding 5px 5px
        border-radius 8px
        font-weight lighter
        font-size 12px
  .searchinfo
    margin-top 10px
    background-color #fff
    .searchhead
      display flex
      width 100%
      padding-top  5px
      justify-content center
      align-items center
      h2
        display inline
        width 24%
        color red
        font-size 15px
        text-align center
    .items
      width 100%
      height 18%
      display flex
      margin-top 5px
      align-items center
      border-top 1px solid #dbdbdb
      border-bottom 1px solid #dbdbdb
      img 
        margin-left 10px
      .iteminfo
        height 100px
        width 100%
        margin-top 5px
        display flex 
        flex-direction column
        justify-content space-around
        margin-left 10px
        h2
          width 99%
          font-size 15px
          line-height 22px
          margin-top -8px
          padding-right 1px
        .price 
          color red
          font-size 14px
        .bottom
          width 98%
          display flex
          flex-direction row
          justify-content space-between
          margin-top 5px
          color gray
  .top
    width 45px
    position fixed
    right 10px
    bottom  13%
    z-index 999
  .nosearch
    position absolute
    background-color #fff
    height 100%
    width 100%
    display flex
    z-index 999
    flex-direction column
    justify-content center
    align-items center
    .sx
      width 100%
      display flex
      flex-direction row
      text-align center


    img 
      border-radius 50%
      margin-top -25%
    p:nth-child(2)
      font-size 18px
      line-height 45px
      letter-spacing 2px
    p:nth-child(3)
      color gray
      font-size 16px
      letter-spacing 2px
      
      
      

</style>