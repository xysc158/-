<template>
<div>
  <div class="wrapper1">
      <div class="swiper-container" v-show="show1">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img :src="data.hd_thumb_url" width="100%" />
          </div>
          <div class="swiper-slide">
            <img :src="data.hd_thumb_url" width="100%" />
          </div>
          <div class="swiper-slide">
            <img :src="data.hd_thumb_url" width="100%" />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="w">
        <div class="two">
          <ul>
            <li>￥</li>
            <li>{{data.price/100}}</li>
            <li>{{data.sales_tip}}</li>
          </ul>
        </div>
        <div class="three">
          <img
            src="http://t00img.yangkeduo.com/goods/images/2018-12-29/e01ec845d67c3717fd0581da8dbf86bd.png?imageMogr2/quality/70"
            alt
            width="42px"
            height="17px"
          />
          {{data.goods_name}}
        </div>
      </div>
      <el-collapse >
        <el-collapse-item title="退货包运费 · 极速退款 · 全场包邮 · 7天退换" name="1" style="font-size: 20px">
          <div>退货包运费：确认收货15天内申请退货退款，商家将补贴退货运费。</div>
          <div>极速退款：购买成功6小时内，待发货状态下，提交退款申请将立即退款。</div>
          <div>全场包邮：所有商品包邮(偏远地区除外)。</div>
          <div>7天退换：满足相应条件时，消费者可申请7天无理由退换货。</div>
          <div>48小时发货：若超时未发货，消费者将会收到至少3元无门槛代金券。</div>
        </el-collapse-item>
      </el-collapse>
      <img
        src="http://img.alicdn.com/imgextra/i4/2200814403338/O1CN01zNmkDg1aWqci27G4J_!!2200814403338.jpg_1152x1920Q90s50.jpg_.webp"
        alt
        width="100%"
        height="484px"
      />
      <img
        src="http://img.alicdn.com/tfs/TB1k9XsQpXXXXXLXpXXXXXXXXXX-750-368.png_640x480Q90s50.jpg_.webp"
        alt
        width="100%"
        height="184px"
      />
    <div :class="{gray:isclass}" @click.prevent="gshow">

    </div>
    <cart class="cart" v-if="show" :date="data"  :istatus="isstatus"/>
    <b-foot class="foot" v-on:listentochildren="showchildren"/>
  </div>
</div>
</template>
<script>
import Cart from './Cart'
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import BFoot from "./Foot";
import {mapState} from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      show1: true,
      data: this.$route.query,
      url: "",
      drawer: false,
      direction: "btt",
      show: false,
      isclass:false,
      isstatus:''
    };
  },
  created() {
    console.log(this.data)
  this.$nextTick(() => {
      var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true, // 循环模式选项
        pagination: {
          el: ".swiper-pagination"
        }
      });
    });
  },
  mounted() {

  },
  computed: {
     ...mapState(['userInfo'])
  },
  components: {
    BFoot,
    Cart
  },
  methods: {
    showchildren(data){
      this.show=data.show
      this.isclass=data.show
      this.isstatus=data.pay
    },
    gshow(){
      this.show=false
      this.isclass=false
    }
  },
};
</script>
<style scoped lang="stylus"  ref="stylesheet/stylus">
.wrapper1 
  background: #f5f5f5;
  z-index -99
  height 100%
  .swiper-container 
    width 100%
  .w 
    width 100%
    margin 0 auto
    padding 2px
    background white
    .two 
      background white
      height 35px
      top 1px
      width 96%
      margin 0 auto
      position relative
      ul li 
        display inline
        position absolute
      
      ul li:nth-child(1) 
        color red
        left 0
        top 10px
        font-size 20px
      
      ul li:nth-child(2) 
        font-size 30px
        color red
        left 6%
      

      ul li:nth-child(3) 
        right 0
        color gray
        bottom 5px
    .three 
      width 96%
      margi: 0 auto
      font-size 20px
      font-weight 10px
      line-height 24px
      height 52px
      margin-top 1px
  .gray
    position fixed
    top 0 
    width 100%
    height 100%
    background-color gray
    opacity 0.9
    z-index 999
.foot 
  position fixed
  bottom 0
  z-index 998
.cart
  z-index 999
</style>