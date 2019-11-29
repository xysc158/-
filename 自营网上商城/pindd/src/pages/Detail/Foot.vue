<template>
  <div class="foot1">
    <div @click="home">
      <i class="iconfont iconshangcheng"></i>
      <span>首页</span>
    </div>
    <div @click.prevent="icon(icon1)">
      <i :class="icon1"></i>
      <span>收藏</span>
    </div>
    <div @click.prevent="iccart1">
      <i :class="iccart"></i>
      <span>购物车</span>
    </div>
    <button class="btn1" @click.prevent="toparent">加入购物车</button>
    <button class="btn2" @click.prevent="toparent1">立即购买</button>
  </div>
</template>

<script>
import {reqCartsGoods} from 'vuex'
export default {
  name: "Foot",
  data() {
    return {
      drawer: false,
      direction: "btt",
      icon1: "iconfont iconicon-test2",
      iccart: "iconfont  iconicon-test"
    };
  },
  methods: {
    home() {
      this.$router.push("/home/hot");
    },
    icon(i) {
      if (i === "iconfont iconicon-test2") {
        this.icon1 = "iconfont iconicon-test3";
      } else {
        this.icon1 = "iconfont iconicon-test2";
      }
    },
    iccart1() {
      this.$router.push("/chat");
    },
    toparent() {
      this.$emit("listentochildren",{show:true,pay:'cart'});
    },
    toparent1() {
      this.$emit("listentochildren",{show:true,pay:'pay'});
    },
  },
 
};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
.foot1 {
  position: flex;
  background: white;
  width: 100%;
  height: 46px;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    margin: 0 5px;
    width: 45px;
    text-align: center;
    color: gray;
  }

  .btn1 {
    flex: 1;
    height: 100%;
    width: 100%;
    border: none;
    background-color: #FF9500;
    color: white;
    font-size: 16px;
    font-weight: 5px;
  }

  .btn2 {
    flex: 1;
    height: 100%;
    width: 100%;
    border: none;
    background-color: red;
    color: white;
    font-size: 16px;
    font-weight: 5px;
  }
}
</style>