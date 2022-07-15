<template>
  <div ref="header" class="header">
    <mu-appbar style="width: 100%">
      <span style="cursor: pointer" v-text="info.title"></span>

      <!-- PC菜单 -->
      <!-- <div class="nav" slot="right"> -->
        <mu-button slot="right" v-show="isPC" @click="go(item, index)" v-for="(item, index) in menu" :key="item.name"
          :color="lightIndex === index ? '#0DBC79' : ''" flat>
          <!-- <mu-icon size="16" :value="item.icon"></mu-icon> -->
          {{ item.name }}
        </mu-button>

      <!-- </div> -->
      <!-- wap菜单 -->
      <mu-button v-show="!isPC" @click="toggleWapMenu(true)" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-bottom-sheet :open.sync="openWapMenu">
        <mu-list @item-click="toggleWapMenu(false)">
          <mu-list-item @click="go(item, index)" v-for="(item, index) in menu" :key="item.name" button>
            <mu-list-item-action>
              <mu-icon :color="lightIndex === index ? '#0DBC79' : ''" :value="item.icon"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title :style="{ color: lightIndex === index ? '#0DBC79' : '' }">{{ item.name }}
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </mu-appbar>
  </div>
</template>
<script>
export default {
  inject: ["scrollTop"],
  name: "Header",
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      openWapMenu: false,

      lightIndex: Number,
      menu: [
        {
          name: "首页",
          router: "home",
          icon: "home",
        },
        // {
        //   name: "文章",
        //   router: "articles",
        //   icon: "note_add",
        // },
        {
          name: "时间轴",
          router: "archives",
          icon: "drafts",
        },
        {
          name: "分类",
          router: "categories",
          icon: "dns",
        },
        {
          name: "标签",
          router: "tags",
          icon: "loyalty",
        },
        // {
        //   name: "关于",
        //   router: "about",
        //   icon: "perm_identity",
        // },
      ],

    };
  },
  mounted() {
    this.lightIndex = this.menu.findIndex((v) => {
      return this.$route.name.indexOf(v.router) !== -1;
    });
  },
  computed: {
  },
  computed:{
    
    scrollHeight() {
      return this.scrollTop()
    },
  },
  methods: {
    toggleWapMenu(openWapMenu) {
      this.openWapMenu = openWapMenu;
    },
    go(item, index) {
      // 多次点击当前菜单则不跳转
      if (this.$route.name === item.router) {
        return;
      }
      this.lightIndex = index;
      this.$router.push({
        name: item.router,
      });
    },
    handleSearch() { },
  },
    watch: {
    scrollHeight(newVal, oldVal) {
      if (newVal > oldVal) {
        this.$refs.header.style.top = "-64px"
      } else {
        this.$refs.header.style.top = "0"
      }
    }
  },
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  transition: all 0.5s;
  z-index:9999;

  .nav {
    width: 100%;
    display: flex;
    justify-content: right;
  }

  // .mu-appbar {
  //   background-color: rgba(255, 255, 255, .4);
  // }
}

.header-avatar {
  cursor: pointer;
}

.mu-appbar {
  .mu-flat-button {
    flex: 1;
  }

  /deep/ .mu-appbar-right {
    flex: 1;
  }
}
</style>