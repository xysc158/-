<template>
  <div class="search">
    <!-- 搜索导航 -->
    <search-nav  :isShowSearchPanel="isShowSearchPanel"/>
    <!-- 联动列表 -->
    <div class="shop">
      <!-- 左边 -->
      <div class="menu-wrapper">
        <!-- current -->
        <ul>
          <li
            class="menu-item"
            v-for="(goods,index) in searchgoods"
            :key="index"
            :class="{current:index === currentIndex}"
            @click="clickLeftItem(index)"
            ref="menulist"
          >
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="shop-wrapper">
        <ul ref="shopsParent">
          <li class="shops-li" v-for="(goods,index1) in searchgoods" :key="index1">
            <div class="shops-title">
              <h4>{{goods.name}}</h4>
              <a href>查看更多 ></a>
            </div>
            <ul class="phone-type" v-if="goods.tag ==='phone'">
              <li v-for="(phone,index) in goods.category" :key="index">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
            <ul class="shops-items">
              <li v-for="(item,index2) in goods.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索面板 -->
    <search-panel v-if="isShow" :isShowSearchPanel="isShowSearchPanel"/>
  </div>
</template>

<script>
import SearchNav from "./children/SearchNav";
import SearchPanel from "./children/SearchPanel";
import {mapState} from "vuex";
import BScroll from "better-scroll";
export default {
  name: "Search",
  data() {
    // 记录坐标及顶部位置信息
    return {
      scrollY: 0, // 右侧列表滑动的Y轴坐标
      rightLiTops: [], // 所有分类的头部位置
      isShow:false // 设置搜索面板的显示
    };
  },
  mounted() {
    // 请求 store 中的 actions
    this.$store.dispatch("reqSearchGoods");
  },
  computed: {
    ...mapState(["searchgoods"]),
    // 1. 用于动态决定左侧哪个选项被选中
    currentIndex() {
      // 1.1 获取数据
      const {scrollY, rightLiTops} = this;
      // 1.2 取出索引
      return rightLiTops.findIndex((liTop, index) => {
        this._leftScroll(index);
        return scrollY >= liTop && scrollY < rightLiTops[index + 1];
      })
    }
  },
 components: {
    SearchNav,
    SearchPanel
  },
  watch: {
    // 1.监听数据
    searchgoods() {
      this.$nextTick(() => {
        // 1.1 初始化
        this._initBScroll();
        // 1.2 右边所有顶部的位置信息
        this._initRightLiTops();
      })
    }
  },
  methods: {
    // 1.1 初始化
    _initBScroll() {
      // 1.1 左边
      this.leftScroll = new BScroll(".menu-wrapper", {
        click: true
      });
      // 1.2 右边
      this.rightScroll = new BScroll(".shop-wrapper", {
        probeType: 3,
        click: true
      });
      // 监听右侧滑动事件
      this.rightScroll.on("scroll", pos => {
        this.scrollY = Math.abs(pos.y);
      })
    },
    // 1.2 右边所有顶部位置信息
    _initRightLiTops() {
      // 1.2.1 临时数组
      const tempArr = [];
      // 1.2.2 定义变量记录高度
      let top = 0;
      tempArr.push(top);
      // 1.2.3 遍历li标签去除高度
      let allLis = this.$refs.shopsParent.getElementsByClassName("shops-li");
      Array.prototype.slice.call(allLis).forEach(li => {
        top += li.clientHeight;
        tempArr.push(top);
      });
      // 1.2.4 更新数组
      this.rightLiTops = tempArr;
    },
    // 1.3 点击切换
    clickLeftItem(index) {
      this.scrollY = this.rightLiTops[index];
      this.rightScroll.scrollTo(0, -this.scrollY, 100);
    },
    // 1.4 左侧联动
    _leftScroll(index) {
      let menuLists = this.$refs.menulist;
      let el = menuLists[index];
      this.leftScroll.scrollToElement(el, 300, 0, -100);
    },
    // 设置搜索面板显示
    isShowSearchPanel(flag){
      this.isShow= flag;
    }
  }
};
</script>

<style scoped lang="stylus"  ref="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.search {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shop {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    width: 80px;

    .menu-item {
      width: 100%;
      height: 60px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: lighter;
      color: #666666;
      position: relative;
    }

    .current {
      color: #e02e24;
    }

    .current::before {
      content: '';
      background-color: #e02e24;
      width: 4px;
      height: 30px;
      position: absolute;
      left: 0;
    }
  }

  .shop-wrapper {
    flex: 1;
    background-color: #fff;

    .shops-title {
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      height: 44px;
      align-items: center;
      justify-content: space-between;
      color: #999;

      a {
        color: #999999;
        text-decoration: none;
        font-weight: lighter;
      }
    }

    .shops-items {
      display: flex;
      flex-wrap: wrap;

      li {
        display: flex;
        flex-direction: column;
        width: 33.3%;
        height: 90px;
        justify-content: center;
        align-items: center;
        color: #666;
        font-weight: lighter;
        font-size: 14px;

        img {
          width: 60%;
          height: 60%;
          margin-bottom: 5px;
        }
      }
    }

    .phone-type {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      border-bottom-1px(#ccc);

      li {
        width: 33.3%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0;

        img {
          width: 70%;
        }
      }
    }
  }
}
</style>