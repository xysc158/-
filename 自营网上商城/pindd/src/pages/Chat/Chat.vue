<template>
  <div class="chat">
    <div v-if="userInfo.id" :isshow="isShow=1">
      <!--头部区域-->
      <div class="header">
        <a href class="icon_back"></a>
        <h3>购物车</h3>
        <a href class="icon_menu"></a>
      </div>
      <!--安全提示-->
      <div class="jd_safe_tip">
        <p class="tip_word">您正在安全购物环境中，请放心购物</p>
      </div>
      <!--中间的列表-->
      <main class="jd_shopCart_list">
        <section>
          <div class="shopCart_list_con" v-for="(goods) in cartgoods" :key="goods.goods_id">
            <div class="list_con_left">
              <a
                href="javascript:;"
                class="cart_check_box"
                :id="goods.goods_id"
                @click.prevent="get(goods.goods_id,goods)"
                ref="checkbox"
              ></a>
            </div>
            <div class="list_con_right">
              <div class="shop_img">
                <img :src="goods.thumb_url" alt />
              </div>
              <div class="shop_con">
                <a href>{{goods.goods_name}}</a>
                <p class="shop_price" ref="price">&yen;{{goods.price / 100}}</p>
                <div class="shop_deal">
                  <div class="shop_deal_left">
                    <span @click.prevent="countl(goods.goods_id,goods)">-</span>
                    <input
                      type="tel"
                      :value="goods.buy_count | number"
                      ref="number"
                      :id="goods.goods_id"
                      @click.prevent="upcount(goods.goods_id,goods)"
                      readonly="true"
                    />
                    <span @click.prevent="countadd(goods.goods_id,goods,$event)" v-if="cli">+</span>
                    <span v-else>+</span>
                  </div>
                  <!-- 删除商品信息 -->
                  <div
                    class="shop_deal_right"
                    @click.prevent="del(goods.goods_id,goods.goods_id,goods)"
                  >
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <!--底部通栏-->
      <div id="tab_bar">
        <div class="tab-bar-left">
          <a
            href="javascript:;"
            class="cart_check_box"
            :checked="status"
            @click.prevent="selectall"
          ></a>
          <span style="font-size: 16px;">全选</span>
          <div class="select-all">
            合计：
            <span class="total-price">&yen;{{price}}</span>
          </div>
        </div>
        <div class="tab-bar-right">
          <a href="#" class="pay">去结算</a>
        </div>
      </div>
    </div>
    <select-login v-else :ishow="isShow=0" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import SelectLogin from "./../Login/SelectLogin";
import { upCartsGoods, delCartsGoods, upCartpay,getCartsGoods,allDel } from "@/api/index";
import { MessageBox } from "mint-ui";
import { List } from 'vant';
export default {
  name: "Chat",
  inject: ["reload"],
  data() {
    return {
      check: [],
      status: false,
      price: 0,
      isShow: 0,
      count: 0,
      flag: "",
      cli: true,
    };
  },
  filters: {
    number(value) {
      if (value <= 0) {
        return 1;
      } else {
        return value;
      }
    },
    sum(value) {
      if (value <= 0) {
        return 0;
      } else {
        return value;
      }
    }
  },
  computed: {
    ...mapState(["userInfo", "cartgoods", "secartsum"]),
  },
  components: {
    SelectLogin
  },
  created() {
    this.load();
    console.log("我只信了")
  },
 
  watch: {
    secartsum(val){    
          this.price=val[0].sum              
  },  
  },
   mounted () {
        this.se()
     
    
  },
  methods: {
    ...mapActions(["reqCartsGoods", "reqSeCartSum"]),
    load() {
      this.$store.dispatch("reqCartsGoods");
      this.$store.dispatch("reqSeCartSum");
     //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    },
    // 通过组件获得id 选中相应的DOM元素
    async get(id, goods) {
      let sum = goods.buy_sum;
      let doc = document.getElementById(id);
      let length = this.check.length;
      // doc 获取DOM元素
      // while 循环判断 DOM元素的 id 是否 存在于 this.check 的列表中
      if (this.check.indexOf(id) != -1) {
        doc.removeAttribute("checked");
        let a = this.check.indexOf(id);
        this.check.splice(a, 1);
        let is_pay = 0;
        let result = await upCartpay(goods.goods_id, is_pay);
        if (result.success_code == 200) {
          this.$store.dispatch("reqCartsGoods");
          this.$store.dispatch("reqSeCartSum");
        }
      } else {
        // 当 DOM元素 为 选中状态时 ， 将DOM元素的数量价格进行计算
        doc.setAttribute("checked", true);
        this.check.push(id);
        let is_pay = 1;
        let result = await upCartpay(goods.goods_id, is_pay);
        if (result.success_code == 200) {
          this.$store.dispatch("reqCartsGoods");
          this.$store.dispatch("reqSeCartSum");
        }
      }
      // 当 选中的 DOM 元素的长度 与 this.check 的长度一致时 代表 全选状态
      if (this.$refs.checkbox.length == this.check.length) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    upcount(id, items) {
      MessageBox.prompt("请输入修改数量")
        .then(async ({ value, action }) => {
          if (value > 0) {
            let val = parseInt(value);
            let price = items.price * 0.01;
            let result = await upCartsGoods(id, val, price);
            if (result.success_code == 200) {
              if (this.check.indexOf(id) != -1) {
                 this.$store.dispatch("reqCartsGoods");
                this.$store.dispatch("reqSeCartSum");
              }
            }
          }
        })
        .catch(()=>{});
    },
    // 全选按钮
    async selectall() {
      // DOM元素的长度
      const length = this.$refs.checkbox.length;
      // 列表长度
      let tlength = this.check.length;
      if (this.status == false) {
        if (length > tlength) {
          this.status = true;
          this.check.splice(0, tlength); // 清空列表的值
          // 商品全选总计
          // 1. 将价格清零
          this.price = 0;
          let id = this.$refs.checkbox;
          for (let i = 0; i < length; i++) {
            document.getElementById(id[i].id).setAttribute("checked", true);
            // 将DOM元素的所有id 插入到列表当中去
            this.check.push(id[i].id);
          }
        }
          let result=await allDel(1)
          if(result.success_code==200){
            this.$store.dispatch("reqCartsGoods");
            this.$store.dispatch("reqSeCartSum");
          }
      } else if (this.status == true) {
        let id = this.$refs.checkbox;
        for (let i = 0; i < length; i++) {
          document.getElementById(id[i].id).removeAttribute("checked");
          this.check = [];
        }
        this.status = false;
        this.price = 0;
        let result=await allDel(0)
          if(result.success_code==200){
            this.$store.dispatch("reqCartsGoods");
            this.$store.dispatch("reqSeCartSum");
          }
      }
    },
    // 商品数量加
    async countadd(index, goods, event) {
      let count = parseInt(goods.buy_count + 1); // 将数据库字段的数量值+1
      //  this.numbercount=parseInt(this.$refs.number[index].value)
      let result = await upCartsGoods(
        goods.goods_id,
        count,
        goods.price * 0.01
      );

      if (this.check.indexOf(index) != -1 && result.success_code === 200) {
        this.$store.dispatch("reqCartsGoods");
        this.$store.dispatch("reqSeCartSum");
      }
      this.$store.dispatch("reqCartsGoods");
      this.$store.dispatch("reqSeCartSum");
    },
    // 商品数量减
    async countl(index, goods) {
      let count = parseInt(goods.buy_count) - 1;
      if (count > 0) {
        let result = await upCartsGoods(goods.goods_id, count, goods.price * 0.01);
        if (result.success_code === 200) {
          this.$store.dispatch("reqCartsGoods");
          this.$store.dispatch("reqSeCartSum");
        } 
      this.$store.dispatch("reqCartsGoods");
      this.$store.dispatch("reqSeCartSum");
      }
    },
    // 删除商品信息
    async del(index, id, items) {
      let c = this.check.indexOf(index);
      console.log("原" + c);
      console.log("原列表=" + this.check.length);
      let result = await delCartsGoods(id);
      if (result.success_code == 200) {
        if (c != -1) {
          this.check.splice(c, 1);
          if (this.check.length == 0) {
            this.status = false;
          }
        }  
        this.$store.dispatch("reqCartsGoods");
        this.$store.dispatch("reqSeCartSum");
      } else {
        console.log(result.message);
      }
    },
    // 执行异请求数据库数据
    async se(){
      let result=await getCartsGoods()
      if(result.success_code==200){
         for (let item of result.message){
        if(item.is_pay==1){
          this.check.push(item.goods_id)
          document.getElementById(item.goods_id).setAttribute("checked", true);
        }
      }
      if(this.check.length==0){
        this.status=false
      }else if(this.check.length==result.message.length){
        this.status=true
        console.log(this.check)
      }
      } 
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
.chat {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;

  .header {
    width: 100%;
    height: 44px;
    background: #ececec;
    -webkit-background-size: 1px 44px;
    background-size: 1px 44px;
    border-bottom: 1px solid #e0e0e0;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bolder;
    color: #E9232C;
    z-index: 999;
  }

  .jd_safe_tip {
    margin-top: 44px;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #fff;
    text-align: center;

    .tip_word {
      display: inline-block;
      font-size: 14px;
      padding-left: 20px;
      position: relative;

      &:before {
        content: '';
        width: 18px;
        height: 18px;
        background: url('./images/safe_icon.png') no-repeat;
        -webkit-background-size: 18px 18px;
        background-size: 18px 18px;
        position: absolute;
        top: 9px;
        left: 0;
      }
    }
  }

  .jd_shopCart_list {
    margin-bottom: 64px;
    background-color: #e0e0e0;

    section {
      margin-top: 15px;
      border-top: 1px solid #e0e0e0;
      background-color: #fff;

      .shopCart_list_con {
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;

        .list_con_left {
          .cart_check_box {
            float: left;
            background: url('./images/shop-icon.png') no-repeat;
            -webkit-background-size: 50px 100px;
            background-size: 50px 100px;
            width: 20px;
            height: 20px;
            margin-top: 17px;
            margin-left: 7px;
          }

          .cart_check_box[checked] {
            background-position: -25px 0;
          }
        }

        .list_con_right {
          overflow: hidden;
          padding: 0 7px;

          .shop_img {
            float: left;

            img {
              width: 80px;
              height: 80px;
              display: block;
            }
          }

          .shop_con {
            overflow: hidden;
            padding-left: 7px;

            & > a {
              font-size: 14px;
              color: #666;
              line-height: 20px;
              height: 40px;
              overflow: hidden;
              display: block;
              text-decoration: none;
            }

            .shop_price {
              color: #E9232C;
              margin-top: 5px;
            }

            .shop_deal {
              margin-top: 5px;

              .shop_deal_left {
                float: left;

                & > span {
                  border: 1px solid #e0e0e0;
                  display: inline-block;
                  width: 30px;
                  height: 25px;
                  line-height: 25px;
                  text-align: center;
                  float: left;

                  &:first-child {
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                  }

                  &:last-child {
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                  }
                }

                input {
                  border: none;
                  border-top: 1px solid #e0e0e0;
                  border-bottom: 1px solid #e0e0e0;
                  float: left;
                  width: 50px;
                  height: 23px;
                  text-align: center;
                }
              }

              .shop_deal_right {
                float: right;

                & > span:first-child {
                  background: url('./images/delete_up.png') no-repeat;
                  background-size: 18px 4px;
                  width: 18px;
                  height: 4px;
                  display: block;
                }

                & > span:last-child {
                  background: url('./images/delete_down.png') no-repeat;
                  background-size: 17px 17px;
                  width: 17px;
                  height: 17px;
                  display: block;
                  margin-top: -3px;
                }
              }
            }
          }
        }
      }
    }
  }

  #tab_bar {
    position: fixed;
    left: 0;
    bottom: 50px;
    width: 100%;
    height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -5px 5px #e0e0e0;
    border-bottom: 1px solid #e0e0e0;

    .tab-bar-left {
      display: flex;
      align-items: center;
      margin-left: 7px;

      .cart_check_box {
        float: left;
        background: url('./images/shop-icon.png') no-repeat;
        -webkit-background-size: 50px 100px;
        background-size: 50px 100px;
        width: 20px;
        height: 20px;
        margin-top: 4px;
        margin-left: 4px;
      }

      .cart_check_box[checked] {
        background-position: -25px 0;
      }

      .select-all {
        margin-left: 8px;
        font-size: 16px;
      }
    }

    .tab-bar-right {
      .pay {
        width: 90px;
        height: 44px;
        background-color: #E9232C;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>
