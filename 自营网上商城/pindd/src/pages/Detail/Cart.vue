<template>
     <div class="body" >
       <div class="head">
          <div class="img-warp">
            <img :src="date.hd_url" alt="商品图">
            <p class="price">
              ¥
              <em>{{ parseFloat(date.price/100)}}</em>
            </p>
            <p class="number">库存<em>{{date.sales_tip.substring(2,4)}}</em>件</p>
            <p class="select">
              已选择:&nbsp;<em>{{sitem}}</em>
            </p>
          </div>
        </div>
       <hr>
       <div class="wrapper">
       <div class="content">
       <div class="center">
         <h2 >配送区域(配送地址可能会影响库存)</h2>
          <i class="iconfont iconaddress"  ></i>
          <area-cascader class="area" :level="1" type="text" placeholder="请选择地区" v-model='selected' :data="pcaa" @change="select"></area-cascader>
          <div class="d-extras">24:00前付款，7日内送达，晚到必赔</div>
       </div>
       <!-- <div class="center">
         <h2>配送区域(配送地址可能会影响库存)</h2>
          <i class="iconfont iconaddress"></i>
          <area-cascader class="area" :level="1" type="text" placeholder="请选择地区" v-model='selected' :data="pcaa"></area-cascader>
          <div class="d-extras">24:00前付款，7日内送达，晚到必赔</div>
       </div> -->
       <hr>
       <div class="category">
         <h2>商品类别</h2>
         <span class="item" @click.passive="sitems">{{item}}</span>
       </div>
       <hr>
       <div class="bottom">
         <h2>商品数量</h2>
         <div>
           <span @click.prevent="reduce">
             -
           </span>
           <input type="text" v-model="number">
           <span @click="add">+</span>
         </div>
       </div>
       </div>
       </div>
       <div class="enter" @click.prevent="buy" >
          确定 
       </div>
     </div>
</template>

<script>
import { pca, pcaa } from 'area-data';
import BScroll from 'better-scroll'
import {addGoodsToCart} from './../../api/index';
import {Toast} from 'mint-ui';
import {mapState,mapActions} from 'vuex' 
export default {
  inject: ["reload"],
  data(){
    return {
      pca: pca,
      pcaa:pcaa,
      selected:["江西省", "赣州市", "宁都县",],
      number:1,
      item:"标准",
      sitem:"L27934783",
    }
  },
  created(){  
    console.log(this.date,this.userInfo.id)
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted(){

      this.$nextTick(()=>{
      this.scroll2= new BScroll('.wrapper',{
      scrollY: true, 
      click:true
    })
      })
  },
  methods: {
    ...mapActions(['syncShopInfo']),
    add(){
      
      if(this.number==99){
        this.number=99
      }else{
        this.number+=1
      }

    },
    reduce(){
      if(this.number==1){
        this.number=1
      }else{
        this.number-=1
      }
    },
    sitems(){
      this.sitem=this.item
    },
    select(){
      console.log(this.selected)
    },
    // 添加商品到购物车
   async buy(){
     console.log(this.istatus)
     if(this.istatus=='pay'){
          let info=[this.date,this.number]
         this.syncShopInfo(info)
         this.$router.push('orderform')
     }else{
            // 请求接口
      let result= await addGoodsToCart(this.userInfo.id,this.date.goods_id,this.date.goods_name,this.date.thumb_url,this.date.price,this.number)
      if (result.success_code === 200){
        Toast({
           message: result.message,
           position: 'bottom',
           duration: 2000
        });
        this.reload()
      }
     }
  
    }
  },
  props:["date","istatus"]
}
</script>
<style  scoped lang="stylus"  ref="stylesheet/stylus">
.body
  position fixed
  height 65%
  width 100%
  background-color white
  position fixed
  bottom 0
  z-index 999
  .head
    height 95px
    background-color white
    .img-warp
      width 120px
      height 120px
      background-color #fff
      border solid 2px #f5f5f5
      position relative
      top -45px
      left 10px
      img 
        width 120px
        height 120px
      .price
        position absolute
        width 200px
        left 106%
        top 45%
        color red
        font-size 15px
        em
          font-size 20px
      .number
        position absolute
        width 200px
        left 106%
        top 67%
        color gray
        font-size 15px
        em
          color black
      .select
        position absolute
        width 200px
        left 106%
        top 87%
        color gray 
        em
          color black
  hr
    width 95%
    margin-top 15px
.wrapper
  height 60%
  overflow hidden
  .center
    width 100%
    position relative
    h2
      color gray 
      font-size 15px
      margin 15px 10px
    .area
      position relative
    .iconaddress
      position absolute
      right 10px
      top 40%
    .d-extras
      margin-top 4%
      margin-left 8px
  .category
    width 100%
    margin-top 14px
    margin-left 8px
    h2
      color gray
      font-size 15px
    .item 
      color red
      display inline-block
      margin-top 10px
      color black
      background #f5f5f5
      padding 6px
      border-radius 5px
  .bottom
    color gray 
    margin-left 10px
    margin-top 15px
    div
      display flex 
      flex-direction row
      justify-content flex-end
      margin-right 14px
      span 
        width 55px
        height 45px
        text-align center
        line-height 45px
        background-color #f5f5f5
        border-radius 5px
        font-size 30px
        color gray
      input 
        border none
        text-align center
        line-height 45px
        width 45px
        height 45px
.enter
  position fixed
  width 100%
  height 55px
  bottom 0
  background-color #FF0036
  z-index 999 
  line-height 55px
  text-align center
  font-size 20px
  color white
  font-weight bolder      
</style>