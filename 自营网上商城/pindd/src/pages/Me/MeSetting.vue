<template>
  <div class="me-setting">
    <div>
      <me-common-cell left-icon="itlike-2" left-title="我的收货地址" @address="add"/>
      <me-common-cell left-icon="itlike-3" left-title="修改登录密码" :clickCell="dealCellClick"/>
      <me-common-cell left-icon="itlike-1" left-title="消息接收设置" right-title="接收" right-title-color="red"/>
    </div>

    <div style="margin-top: 10px;">
      <me-common-cell left-icon="itlike-5" left-title="免密码支付" :clickCell="dealCellClick"/>
      <me-common-cell left-icon="itlike-4" left-title="免密码支付"/>
    </div>

    <div style="margin-top: 10px;">
      <me-common-cell left-icon="itlike-1" left-title="免密码支付"/>
    </div>

    <div class="logout" @click="dealLogout" >退出登录</div>
    <van-button type="primary" size="large" color="linear-gradient(to right, #4bb0ff, #6149f6)" to="/me">取消</van-button>
  </div>
</template>

<script>
  import MeCommonCell from './MeCommonCell';
  import {Toast, MessageBox} from 'mint-ui';
  import {mapActions} from 'vuex'

  export default {
    name: "MeSetting",
    components: {
      MeCommonCell
    },
    methods: {
      ...mapActions(["logOut"]),
      dealCellClick(props) {
        if(props=="修改登录密码"){
          this.$router.replace('/uplogin')
        }
      },
      dealLogout() {
        // console.error(11);
        MessageBox.confirm('您确定退出登录吗?').then(action => {
           // console.log(action);
           if('confirm' === action){
                // 退出登录
                let result = this.logOut({});
                // console.log(result);
                // 回到主界面
                sessionStorage.clear('store')
                this.$router.replace('/home');
           }
        });
      },
      add(){
          this.$router.replace('/showaddress')
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .logout
    width 100%
    height 44px
    margin-top 10px
    background-color #fff
    display flex
    justify-content center
    align-items center
    text-align center
    margin-bottom 10px
</style>
