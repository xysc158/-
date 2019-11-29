<template>
  <div>
    <van-nav-bar title="修改登录密码" left-arrow @click-left="cancel" />
    <van-cell-group>
      <van-field v-model="username" clearable disabled label="用户名" />
      <van-field
        v-model="password"
        :type="flag"
        label="修改密码"
        placeholder="密码必须6~18位，同时包含数字和字母"
        required
        :right-icon="icon"
        @click-right-icon="show(flag)"
        :error="pjudge"
        @focus="clear"
        :error-message="pmessage"
      />
      <van-field v-model="phone"  maxlength="11"  required label="手机号" placeholder="请输入手机号" :error="hjudge"  :error-message="hmessage"  @focus="clearh"/>
      <van-field v-model="sms" center clearable required label="短信验证码" placeholder="请输入短信验证码" :error="cjudge"  :error-message="cmessage" @focus="cleary">
        <van-button slot="button" size="small" type="primary" @click="send" v-if="cflag">发送短信验证码</van-button>
        <van-button slot="button" size="small" type="primary"  v-else disabled>{{countDown}}s</van-button>
      </van-field>
    </van-cell-group>
    <div class="bottom">
      <button @click.prevent="save">保存</button>
      <button  @click.prevent="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import {getPhoneCode,upUserLogin} from './../../api/index';
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  name: "UpLogin",
  data() {
    return {
      password: "",
      sms: "",
      username: "",
      flag: "password",
      icon: "eye-o",
      phone:'',
      pjudge:false,
      pmessage:'',
      hjudge:false,
      hmessage:'',
      countDown:0,
      cflag:true,
      code:'',
      cjudge:false,
      cmessage:'',
    };
  },
  computed: {
    ...mapState(['userInfo']),
     phoneRight() {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
      } 
  },
  created () {
    this.username=this.userInfo.user_name  
      console.log(this.username)
  },
  mounted () {
 
  },
  methods: {
    show(flag) {
      if (flag == "password") {
        this.flag = "text";
        this.icon = "browsing-history-o";
        Toast("密码已显示");
      } else {
        this.flag = "password";
        this.icon = "eye-o";
        Toast("密码已隐藏");
      }
    },
    cancel(){
      this.$router.go(-1)
    },
    send() {
     this.getVerifyCode()
    },
    save(){
       let pwd=this.password
       let judge= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(pwd)
       // 判断密码
       if(judge==false){
           this.pmessage='输入的密码有误，请重新输入'
           this.pjudge=true
           this.password=''
       }
       // 判断手机号是否正确
       else if(this.phoneRight==false || this.userInfo.user_phone!=this.phone){
                this.hmessage='输入的手机号有误，请重新输入'
                this.hjudge=true
                this.phone=''  
       }
       // 判断验证码是否正确
       else if(this.code!=this.sms || this.sms==''){
                this.cmessage='输入的验证码有误，请重新输入'
                this.cjudge=true
                this.sms=''  
       }else{
            this.change()
       }
        
    },
    clear(){
        this.pjudge=false
        this.pmessage=''
    },
    clearh(){
         this.hjudge=false
         this.hmessage=''
    },
    cleary(){
        this.cjudge=false
        this.cmessage=''
    },
     // 2. 获取短信验证码
      async getVerifyCode() {
         if(!this.phoneRight){
                this.hmessage='输入的手机号有误，请重新输入'
                this.hjudge=true
                this.phone=''
         }else{
              // 2.1 开启倒计时
            this.cflag=false
            this.countDown = 60;
            this.intervalId = setInterval(() => {
            this.countDown--;
            // 判断
            if (this.countDown === 0) {
                this.cflag=true
              clearInterval(this.intervalId);  
            }
          }, 1000);
            // 2.2 获取短信验证码
        let result = await getPhoneCode(this.phone);
        this.code=result.message
        console.log(this.code)
        // 2.3 获取验证码失败
        if (result.err_code === 0) {
          // 提示信息
          Toast({
            message: result.message,
            position: 'center',
            duration: 3000
          });

          // 其他处理
          /*
          clearInterval(this.intervalId);
          this.countDown = 0;
          */
        }
         }
       
       
        
      },
      //  修改密码
      async change(){
          let result=await upUserLogin(this.password)
          if (result.success_code==200){
              Toast.success('修改成功')
          }else{
              Toast.fail('修改失败')
          }
      }
  }

};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
.bottom {
  width: 90%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;

  button:nth-child(1) {
    margin: 20px 0;
    border: none;
    color: white;
    background-color: red;
    height: 44px;
  }

  button:nth-child(2) {
    background-color: #fff;
    height: 44px;
    border: none;
  }
}
</style>