<template>
  <div class="text-center">
    <img v-if="true" :src="userAvatar" width="200px" height="200px">
    <button id="pick-avatar">Select an image</button>
    <avatar-cropper
      @uploaded="handleUploaded"
      trigger="#pick-avatar"
      upload-url="https://pic.qqtn.com/up/2019-4/2019040917510740548.jpg" />
  </div>
</template>

<script>
  import AvatarCropper from "vue-avatar-cropper"

  export default {
    components: { AvatarCropper },
    data() {
      return {
          userAvatar: undefined,
      }
    },
    methods: {
      handleUploaded(resp) {
        this.userAvatar = resp.relative_url;
      }
    }
  }
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
.text-center
    height 100%
    width 100%
    img
    width 200px
    height 200px
</style>