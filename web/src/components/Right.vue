<template>
  <div v-if="showIntroduction && isPC" class="right">
    <div :class="[{ 'fixed': showFixed }, 'right-config']">
      <mu-card class="slider-card text-center">
        <mu-avatar class="avatar" size="100">
          <img v-lazy="this.avatar" alt />
        </mu-avatar>
        <div class="title" v-text="introduction.nickName"></div>
        <div class="desc" v-text="introduction.desc"></div>
        <div class="tags">
          <mu-chip v-for="v in introduction.tags" :key="v" class="chip" v-text="v"></mu-chip>
        </div>
        <mu-button color="primary" full-width @click="bookMark">
          加入书签
        </mu-button>
        <div class="friend-link-box">
          <p class="friend-link-title">友情链接</p>
          <div class="friend-links">
            <mu-avatar size="40" v-for="item in introduction.friendLink" :key="item.icon" @click="linkTo(item.link)">
              <img :src="item.icon" alt />
            </mu-avatar>
          </div>
        </div>
      </mu-card>

      <mu-card v-if="showAdvert" class="slider-card card-ad">
        <div class="ad">广告</div>
        <mu-carousel style="height: 120px" hide-controls transition="fade">
          <mu-carousel-item v-for="item in advert" :key="item.link">
            <img style="width: 100%; cursor: pointer" v-lazy="item.imgUrl" @click="linkTo(item.link)" />
          </mu-carousel-item>
        </mu-carousel>
      </mu-card>

      <mu-card class="slider-card">
        <div>Links</div>
        <mu-divider></mu-divider>
        <div v-for="item in links" :key="item.link">
          <mu-button flat @click="linkTo(item.link)">
            {{ item.name }}
          </mu-button>
        </div>
      </mu-card>
      <!-- <mu-card class="slider-card">

      <div class="friend-link-box">
        <p class="friend-link-title">音乐推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">半生雪</mu-chip>
          </div>
        </div>
      </div>
    </mu-card> -->
    </div>
  </div>
</template>
<script>
export default {
  // inject: ["scrollTop"],
  props: {
    showPosition: {
      type: String,
    },
  },
  data() {
    return {
      showFixed: false,
      introduction: {},
      advert: [],
      recommend: [],
      showIntroduction: false,
      showAdvert: false,
      hideRecommend: false,
      links: [
        { name: "阮一峰的个人网站", link: "http://ruanyifeng.com" },
        { name: "淘宝前端团队", link: "http://fed.taobao.org" },
        { name: "印记中文", link: "http://docschina.org" },
      ]
    };
  },
  computed: {
    // scrollHeight() {
    //   return this.scrollTop()
    // }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const introduction = await this.$axios.get("/introduction");
      const advert = await this.$axios.get("/advert");
      if (introduction.data) {
        this.introduction = introduction.data
        this.showIntroduction = this.introduction.showPosition.includes(this.showPosition);
      }
      if (advert.data) {
        this.advert = advert.data.imgs
        this.showAdvert = this.advert && advert.data.showPosition.includes(this.showPosition);
      }
    },
    linkTo(link) {
      window.open(link);
    },
    bookMark(){
      this.$toast.info("按 CTRL+ D 键将本页加入书签.")
    }
  },
  watch: {
    // scrollHeight(newVal, oldVal) {
    //   if (newVal > 336) {
    //     this.showFixed = true
    //   } else {
    //     this.showFixed = false
    //   }
    // }
  }
};
</script>
<style lang="less" scoped>
.right-config {
  width: 250px;
  padding: 0 10px;
}

.fixed {
  position: fixed;
  top: 0px;
}

.text-center {
  text-align: center;
}

.slider-card {
  position: relative;
  margin-top: 16px;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);

  .avatar {
    transition: .3s linear;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  }

  .mu-avatar {
    cursor: pointer;
  }

  .title {
    font-size: 20px;
    color: #0dbc79;
  }

  .desc {
    font-size: 14px;
    margin: 10px 0;
  }

  .tags {
    .chip {
      margin: 0 10px 10px 0;
    }
  }

  .friend-link-box {
    .friend-link-title {
      position: relative;

      &::before {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      &::after {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .friend-links {
      display: flex;
      justify-content: space-around;
    }
  }

  .ad {
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 8px;
    font-size: 12px;
    background-color: rgba(255, 255, 255, .5);
  }
}

.card-ad {
  padding: 8px;
}

.slider-card:hover {
  box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);

  .avatar {
    // transform: rotateY(3.142rad);
    transform: rotateY(180deg);
    /*元素围绕X轴旋转*/
    -ms-transform: rotateY(180deg);
    /* IE9浏览器兼容代码 */
    -webkit-transform: rotateY(180deg);
    /*Safari andChrome浏览器兼容代码 */
    -moz-transform: rotateY(180deg);
    /*Firefox览器兼容代码*/
    -o-transform: rotateY(180deg);
    transition: .3s linear;
  }
}
</style>