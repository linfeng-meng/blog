<template>
  <div class="wrap">
    <Header :info="this.header"></Header>
    <div v-if="isPC" class="bgimg" :style="{ backgroundImage: `url(${bgImg})` }">
      <p>{{ title }}</p>
    </div>
    <router-view :style="{ marginTop: !isPC ? '64px' : '0' }" class="section"></router-view>
    <Footer fixed :info="this.footer"></Footer>
    <RightSide></RightSide>
  </div>
</template>
<script>
// import IndexAnimation from "@/components/IndexAnimation.vue";
import RightSide from "@/components/RightSide.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "layout",
  provide() {
    return {
      scrollTop: () => this.scrollTop
    }
  },
  components: {
    // IndexAnimation,
    RightSide,
    Header,
    Footer,
  },
  data() {
    return {
      scrollTop: 0,
      title: '',
      header: {},
      footer: {},
      bgImg: 'http://cdn.menglinfeng.top/img/archive.jpg',
    };
  },
  mounted() {
    this.getInfo()
    window.addEventListener("scroll", this.scrollToTop, true);
  },
  methods: {
    scrollToTop() {
      let that = this;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      that.scrollTop = scrollTop;
    },

    async getInfo() {
      const hf = await this.$axios.get("/header");
      const home = await this.$axios.get("/home");
      if (hf.data) {
        this.header = hf.data.header;
        this.footer = hf.data.footer;
      }
      if (home.data) {
        switch (this.$route.name) {
          case 'home':
            // this.bgImg = home.data.aboutBgImg
            this.title = "首页"
            break
          case 'archives':
            // this.bgImg = home.data.archiveBgImg
            this.title = "时间轴"
            break
          case 'categories':
            // this.bgImg = home.data.categoriesBgImg
            this.title = "分类"
            break
          case 'tags':
            // this.bgImg = home.data.tagsDetailBgImg
            this.title = "标签"
            break
          case 'about':
            // this.bgImg = home.data.aboutBgImg
            this.title = "个人信息"
            break
          default:
            // this.bgImg = "http://cdn.menglinfeng.top/img/archive.jpg"
            this.title = ""
            break
        }
        this.bgImgs = home.data;
      }
    },
  },
  watch: {
    $route(to, from) {
      switch (to.name) {
        case 'home':
          // this.bgImg = this.bgImgs.aboutBgImg
          this.title = "首页"
          break
        case 'archives':
          // this.bgImg = this.bgImgs.archiveBgImg
          this.title = "时间轴"
          break
        case 'categories':
          // this.bgImg = this.bgImgs.categoriesBgImg
          this.title = "分类"
          break
        case 'tags':
          // this.bgImg = this.bgImgs.tagsDetailBgImg
          this.title = "标签"
          break
        case 'about':
          // this.bgImg = this.bgImgs.aboutBgImg
          this.title = "个人信息"
          break
        default:
          // this.bgImg = "http://cdn.menglinfeng.top/img/archive.jpg"
          this.title = ""
          break
      }
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  // display: flex;
  flex-direction: column;
  // justify-content: space-between;
  width: 100vw;

  .bgimg {
    height: 20rem;
    width: 100vw;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 36px;
    color: #fff;
    font-weight: bold;
  }
}
</style>