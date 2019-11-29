<template>
  <div>
    <van-nav-bar title="添加收货地址" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      delete-button-text="取消"
      @save="onSave"
      click.prevent="a"
    />
  </div>
</template>

<script>
import a from "./area";
import { addAddress1 } from "./../../api/index";
import { Toast } from 'vant'
export default {
  name: "MeAddAddress",
  data() {
    return {
      areaList: a,
      name: "",
    };
  },
  watch: {
   
  },
  methods: {
    async onSave(val) {
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
      const result = await addAddress1(
        val.name,
        val.tel,
        adds,
        code,
        status,
        areaCode
      );
      if (result.success_code == 200) {
        Toast.success('添加成功');
        this.$router.replace('/showaddress')
      } else {
          Toast.fail('添加失败');
      }
    },
    onClickLeft() {
      this.$router.replace("/showaddress");
    }
  },
};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus"></style>