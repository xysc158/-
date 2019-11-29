<template>
  <div class="orderform">
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="center" v-for="val in deaddress" :key="val.id">
      <img src="./images/定位.png" alt />
      <div class="address">
        <span>
          {{val.a_name}}
          <em>{{val.a_phone}}</em>
        </span>
        <span>{{val.a_address}}</span>
      </div>
      <div class="right" @click.prevent="re">&gt;</div>
    </div>
    <div class="item wrapper">
      <div class="top">
        <img src="./../Search/images/商城.png" alt />
        <span>自营商城</span>
      </div>
      <div class="content">
        <div class="list" v-for="item in date" :key="item.goods_id">
          <img
            :src="item.thumb_url"
            alt
          />
          <div class="info">
            <span>
              {{item.goods_name}}
              <span>商品质量保证</span>
            </span>
            <div class="price">
              <p>
                &yen;
                <em>{{(item.price*0.01).toFixed(2)}}</em>
              </p>
              <p>
                <em class="number">x{{number}}</em>
              </p>
            </div>
          </div>
        </div>
        <div class="pay">
        <div class="way">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell title="支付宝支付(推荐)" clickable @click="radio = '1'">
                <van-radio slot="right-icon" name="1" />
              </van-cell>
              <van-cell title="微信支付" clickable @click="radio = '2'" >
                <van-radio slot="right-icon" name="2" />
              </van-cell>
              <van-cell title="QQ钱包支付" clickable @click="radio = '3'">
                <van-radio slot="right-icon" name="3"  />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          </div>
        </div>

        <div class="exinfo">
          <p>
            <span>服务</span>
            <span>本店24小时客服在线,并支持部分商品无理由退换货</span>
          </p>
          <p>
            <span>配送方式</span>
            <span>快递免邮费</span>
          </p>
          <p>
            <span>发货时间</span>
            <span>本店承诺下单后48小时内发货</span>
          </p>
          <p class="safe"> <img src="./images/安全.png" alt="" width="20"> 平台用户信息安全由<em>中国人寿保险</em>承保</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-submit-bar :price="sum" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { RadioGroup, Radio, Cell, CellGroup, Toast,Dialog,Notify  } from "vant";
import {mapState,mapActions} from 'vuex'
import {aplipay} from './../../api/index'
import qs from 'qs'
export default {
  name: "OrderForm",
   inject: ["reload"],
   data() {
    return {
      radio: '1',
      sum:0,
      date:[],
      number:0,
      sum:0,
      info:[],
      add:this.deaddress
    }
  },
  created() {
   this.load()
   this.date.push(this.shopinfo[0])
   this.number=this.shopinfo[1]
   this.sum=parseFloat(this.shopinfo[0].price)*parseInt(this.number)
   this.info.push(this.shopinfo[0].short_name,this.sum*0.01) 
  },
  computed: {
    ...mapState(['deaddress','shopinfo'])
  },
  watch:{
    shopinfo(shop,shop1){
      console.log(shop1)
    },
    deaddress(val){
     if(val.length==0){
        Dialog.confirm({
        title: '默认地址',
          message: '是否设置默认地址'
        }).then(() => {
            this.$router.push('showaddress')
        }).catch(() => {
            this.$router.go(-1)
        });
     }
    }

  },
  mounted () {
     let scroll = new BScroll(".wrapper", {
      scrollY: true,
      click: true
    });
  },
  methods: {
    ...mapActions(['reqDeAddress']),
    load(){
      this.reqDeAddress()
    },
    ad(){
      Dialog.confirm({
        title: '默认地址',
        message: '是否设置默认地址'
      }).then(() => {
          this.$router.push('showaddress')
      }).catch(() => {
          this.$router.go(-1)
      });
    },
    re(){
      Notify({
        message: '请修改默认收货地址',
        duration: 2000
      });
      this.$router.push('showaddress')
    },
    onClickLeft() {
      this.$router.go(-1)
    },
     onSubmit(){
       if (this.radio=='1'){
           let that=this;
        		    that.$indicator.open('加载中...'); 
        		     let sum=that.sum*0.01
        		     that.data = {
        		      /* 自身接口所需的一些参数 */
        		          amount: sum,
                      WIDbody:'商品描述',
                      WIDsubject:'订单名称',
        		      /* 支付后支付宝return的url */
        		          returnUrl: window.location.origin
                }
                console.log(that.data)
        		     that.$axios.post(
        		    'http://localhost/alipay/wappay/pay.php',
        		    that.data
        		     ).then(res => {
                    console.log(res)
                   that.$indicator.close();
        		      if (res.status == '200') {
                      let d= [this.shopinfo,this.deaddress]
                      let info=JSON.stringify(d)
                      sessionStorage.setItem('info', info);
        		      	  let routerData = this.$router.resolve({path:'paygatway',query:{ htmlData: res.data,shopinfo:this.info}})
                   // 打开新页面
                      window.open(routerData.href, '_ blank')      
        		      }
        		    }, error => {
        		      that.$indicator.close();
        		    })
       }
       else if(this.radio=='2'){
         Toast.fail('暂未开通此支付，请使用支付宝支付')
       }
       else if(this.radio=='3'){
         Toast.fail('暂未开通此支付，请使用支付宝支付')
       }
    } 
  }
};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
.orderform {
  height: 100%;
  width: 100;

  .center {
    margin: 0 auto;
    width: 98%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;

    img {
      width: 45px;
      height: 45px;
      padding-left: 10px;
    }

    .address {
      display: flex;
      flex-direction: column;
      line-height: 20px;
      letter-spacing: 1px;
      width: 80%;
      padding: 10px;

      em {
        color: gray;
        font-size: 12px;
      }
    }

    .right {
      position: relative;
      right: 10px;
      font-size: 20px;
      color: #dbdbdb;
    }
  }

  .item {
    width: 98%;
    height: 70%;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 10px;

    .top {
      width: 98%;
      height: 45px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 10px;
      letter-spacing: 1px;

      img {
        margin-right: 5px;
        width: 30px;
        height: 30px;
      }

      span {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  .content {
    height 100%
    }
    .list {
      width: 98%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      margin-top: 5px;
      padding: 5px;

      img {
        width: 80px;
        height: 80px;
      }

      .info {
        display: flex;
        flex-direction: row;
        align-content: center;
        line-height: 18px;
        span:nth-child(1) {
          width: 80%;
          line-height: 22px;
          margin-left: 5px;
          display: flex;
          flex-direction: column;
          span {
            width: 96px;
            padding: 3px;
            font-size: 12px;
            text-align: center;
            line-height: 12px;
            border-radius: 5px;
            color: red;
            margin-top: 10px;
            background-color: rgba(255, 0, 0, 0.3);
          }
        }

        .price {
          width: 18%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          margin-top: 5px;

          p {
            font-size: 12px;
            margin-top: 2px;
            em {
              margin-top: 5px;
              font-size: 16px;
              margin-left: 2px;
            }

            .number {
              color: gray;
              font-size: 14px;
            }
          }
        }
      }
    }

    .pay {
      width: 100%;
      margin: 0 auto;
      border-top: 10px solid #f5f5f5;
      border-bottom: 10px solid #f5f5f5;
    }

    .exinfo {
      margin: 0 auto;
      width: 98%;
      p {
        margin-top: 15px;
        display: flex;
        line-height: 22px;

        span:nth-child(1) {
          color: black;
          flex: 1;
          text-align: right;
        }

        span:nth-child(2) {
          margin-left: 10px;
          color: gray;
          flex: 4;
          text-align: left;
        }
      }
      .safe{
          display flex
          justify-content center
          margin-top 15% 
          align-items  baseline
      } 
        img{
            margin-right 5px
        }
        em{
            font-size 18px
            color gray
            font-weight bold
            margin 0 5px
        }
        
    }
  }
}
</style>