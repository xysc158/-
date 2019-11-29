<template>
  <div>
     <van-nav-bar
    title="修改收货地址"
    left-arrow
    @click-left="onClickLeft"
    /> 
    <van-address-edit
      :area-list="areaList"
      show-postal
      :address-info="addressinfo"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { upAddressInfo,delAddressInfo } from './../../api/index'
import { mapState } from "vuex";
import a from'./area'
import { Toast } from 'vant'
export default {
   name:"MeUpAddress",
  data() {
    return {
      areaList:a,
      searchResult: [],
      addressinfo:{
        id: 1,
        name: 'yl',
        tel: '13806030273',
        areaCode:'150500',
        addressDetail:'殿前',
        postalCode:'361000',
        isDefault:true
      },

    }
  },
  created () {
   let id=this.$route.query.id
   this.showdold(id)
  },
  computed: {
    ...mapState(['addressinfo1'])
  },
  mounted () {
     
  },
  methods: {
    async onSave(val) {
      let id=this.$route.query.id
      console.log(val);
      let adds = ""
      if(val.province == "北京市" || val.province == "天津市" ){
        adds=val.city+" "+val.county+" "+" "+val.addressDetail
      }else{
        adds=val.province+" "+val.city+" "+val.county+" "+" "+val.addressDetail
      }
      let areaCode=val.areaCode
      console.log(areaCode)
      let code = parseInt(val.postalCode);
      let status = 0;
      if (val.isDefault == true) {
        status = 1;
      } else {
        status = 0;
      }
      const result = await upAddressInfo(
        id,
        val.name,
        val.tel,
        adds,
        code,
        status,
        areaCode
      );
      if (result.success_code == 200) {
        Toast.success('修改成功');
        this.$router.replace('/showaddress')
      } else {
          Toast.fail('修改失败');
      }
    },
    async onDelete() {
       let id=this.$route.query.id
       let result=await delAddressInfo(id)
       if(result.success_code==200){
          Toast.success('删除成功');
          this.$router.replace('/showaddress')
       }else{
         Toast.fail('删除失败');
       }

    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft(){
      this.$router.replace('/showaddress')
    },
    showdold(item){
      this.addressinfo1.some(val=>{
          if(item==val.id){
            this.addressinfo.id=val.id
            this.addressinfo.name=val.a_name
            this.addressinfo.tel=val.a_phone
            this.addressinfo.areaCode=val.a_areacode
            let detail=val.a_address.split(" ")
            let length=detail.length-1
            let detailadd=detail[length]
            this.addressinfo.addressDetail=detailadd
            if(val.a_default==0){
                this.addressinfo.isDefault=false
            }else{
                this.addressinfo.isDefault=true
            }
          }
      })
    }
  }
};
</script>
<style scoped lang="stylus"  ref="stylesheet/stylus"></style>