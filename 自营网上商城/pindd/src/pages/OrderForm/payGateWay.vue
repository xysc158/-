<template>
  <div v-html="payGateWay" v-if="flag">{{payGateWay}}</div>
  <div v-else>
    <van-nav-bar
      title="商品进度"
      left-arrow    
    />
    <van-notice-bar text="本店大酬宾购买任单品均送纯棉袜子双，买送，多买多送！" left-icon="volume-o" />
    <van-steps :active="active">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast, Loading, NoticeBar, NavBar } from "vant";
import { Indicator } from "mint-ui";
import { reorderform } from './../../api/index'
export default {
  name: "payGateWay",
  data() {
    return {
      payGateWay: "",
      shop: this.$route.query.shopinfo,
      flag: true,
      active:0
    };
  },
  created() {
    let form = this.$route.query.htmlData;
    this.payGateWay = form;
    let id = "";
    id = this.$route.query.shopid;
    if (id == "" || !id) {
      this.flag = true;
    } else {
      this.flag = false;
    }
   
  },
  computed: {},
  mounted() {
      console.log(this.shop)
    this.$nextTick(() => {
      if (this.flag == true) {
        this.GetDateNow();
        document.getElementById("alipayment").submit();
      } else {
        Indicator.open({
          text: "正在返回主页",
          spinnerType: "fading-circle"
        });
         let item = JSON.parse(sessionStorage.getItem("info"));
         console.log(item)
         let shopid=this.$route.query.shopid
         let zhifu=this.$route.query.zhifu
         let price=item[0][0].price*0.01*item[0][1]
         let goods_id=item[0][0].goods_id
         let count=item[0][1]
         let a_address=item[1][0].a_address
         let a_name=item[1][0].a_name
         let a_phone=item[1][0].a_phone
         let u_id=item[1][0].u_id
         let name=item[0][0].short_name
         this.ins(u_id,goods_id,price,count,shopid,zhifu,a_name,a_phone,a_address,name)
      }
    });
  },
  methods: {
    GetDateNow() {
     	var vNow = new Date();
		var sNow = "";
		sNow += String(vNow.getFullYear());
		sNow += String(vNow.getMonth() + 1);
		sNow += String(vNow.getDate());
		sNow += String(vNow.getHours());
		sNow += String(vNow.getMinutes());
		sNow += String(vNow.getSeconds());
		sNow += String(vNow.getMilliseconds());
      document.getElementById("WIDout_trade_no").value = sNow;
      document.getElementById("WIDsubject").value = "自营网上商城";
      document.getElementById("WIDtotal_amount").value = this.shop[1];
      document.getElementById("WIDbody").value = this.shop[0] ;
    },
    async ins(u_id,goods_id,price,count,shopid,zhifu,a_name,a_phone,a_address,name){
        let result=await reorderform(u_id,goods_id,price,count,shopid,zhifu,a_name,a_phone,a_address,name)
        if(result.success_code==200){
            setTimeout(()=>{
                Indicator.close()
            },3000)
            this.$router.replace('/home/hot')
        }
    }
  }
};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
div {
  background-color: #fff;
}
</style>