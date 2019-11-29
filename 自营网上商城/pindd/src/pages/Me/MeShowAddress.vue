<template>
  <div>
    <van-nav-bar title="我的收货地址" left-arrow @click-left="onClickLeft" />
    <div class="default">
       <van-address-list  class="adlist" :switchable="false" v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit"/>
      <div class="select" v-if="flag">默认</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MeShowAddress",
  data() {
    return {
      chosenAddressId: "1",
      save: false,
      list: [],
      flag:true
    };
  },
  computed: {
    ...mapState(["addressinfo1"])
  },
  watch: {
    addressinfo1(val) {
      if (val.length==0){
        this.flag=false
      }else{
        this.show(val);
      }
      
    }
  },
  created() {
    this.$store.dispatch("reqAddressInfo");
  },

  mounted() {},
  methods: {
    show(items) {
      for (let i = 0; i < items.length; i++) {
        let id = items[i].id;
        let name = items[i].a_name;
        let tel = items[i].a_phone;
        let address = items[i].a_address;
        let status = items[i].a_default
        let ins = {
          id: id,
          name: name,
          tel: tel,
          address: address,
          status:status
        };
        this.list.push(ins)
      }
     this.list.some(item=>{
          if(item.status==1){
              this.chosenAddressId=item.id
              let index=this.list.indexOf(item)
              this.list.splice(index,1)
              this.list.unshift(item)
              return true
          }else{
            this.flag=false
            return true
          }
     })
    },
    onAdd() {
      this.$router.replace("/addaddress");
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onEdit(item, index) {
      this.$router.push({
          path:"upaddress",
          query:{
             id:item.id
          }
          });
    }
  }
};
</script>

<style lang="stylus"  ref="stylesheet/stylus">
.default
  position relative
  width 100%
  .adlist
    width  100%
  .select
    position absolute
    top 0
    right 0
    display flex
    color red
    width 45px
    height 20px
    background-color  rgba(255, 0, 0,0.3);
    justify-content center
    align-items center
   


</style>