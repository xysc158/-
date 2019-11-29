<template>
  <div class="recommend-container" v-if="recommendshoplist.length>0">
    <ul class="recommend">
      <!-- <li class="recommend-item" v-for="(item, index) in recommendshoplist" :key="index">
        <img :src="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">
        <h4 class="item-title">{{item.short_name}}</h4>
        <div class="item-bottom">
          <span class="item-price">
            ¥{{item.price/100}}
          </span>
          <span class="item-sales">
            {{item.sales_tip}}
          </span>
          <button class="item-btn">找相关</button>
        </div>
      </li>-->
      <shop-list tag="li" v-for="(item, index) in recommendshoplist" :key="index" :item="item" />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShopList from "./../../components/ShopList/ShopList";
import BScroll from "better-scroll";
import { Indicator } from "mint-ui";
export default {
  name: "Recommend",
  data() {
    return {
      page: 1,
      count: 20
    };
  },
  computed: {
    ...mapState(["recommendshoplist"])
  },
  mounted() {
    Indicator.open({
      text: "数据正在加载中...",
      spinnerType: "fading-circle"
    });
    this.$store.dispatch("reqRecommendShopList", {
      page: this.page,
      count: this.count,
      callback: () => {
        Indicator.close();
      }
    });
  },
  components: {
    ShopList
  },
  watch: {
    // 让当前的页码+1
    recommendshoplist() {
      this.$nextTick(() => {
        this.page += 1;
        // 初始化
        this._initBScroll();
      });
    }
  },
  methods: {
    _initBScroll() {
      // 初始化
      this.listScroll = new BScroll(".recommend-container", {
        scrollY: true,
        probeType: 3
      });
      // 监听列表的滚动
      this.listScroll.on("touchEnd", pos => {
        // 监听下拉
        if (pos.y >= 50) {
          console.log("下拉刷新");
        }
        // 监听上拉
        if (this.listScroll.maxScrollY > pos.y + 20) {
          console.log(this.page);
          Indicator.open({
            text: "数据正在加载中...",
            spinnerType: "fading-circle"
          });
          this.$store.dispatch("reqRecommendShopList", {
            page: this.page,
            count: this.count,
            callback: ()=>{
              Indicator.close()
            }
          });
        }
      });
      // 列表滚动结束
      this.listScroll.on("scrollEnd", () => {
        this.listScroll.refresh();
      });
    }
  }
};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
.recommend-container {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .recommend {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: #f5f5f5;
    padding-bottom: 50px;
  }
}
</style>