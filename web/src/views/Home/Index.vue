<template>
  <transition name="slide-fade">
      <Articles></Articles>
  </transition>
</template>
<script>
// import IndexAnimation from "@/components/IndexAnimation.vue";
import Articles from "@/views/Articles/Articles.vue";

let i = 0;
let timer = null;
export default {
  name: "home",
  components: {
    Articles,
  },
  props: {
    bgSrc: {
      type: Object,
    },
  },
  data() {
    return {
      // info: {
      //   introduction: ''
      // },
    };
  },
  mounted() {
    // this.getInfo()
  },

  methods: {
    // async getInfo() {
    //   const res = await this.$axios.get("/home");
    //   if (res.data) {
    //     this.info.introductionTarget = res.data.introduction;
    //     this.typing();
    //   }
    // },
    // typing() {
    //   if (i <= this.info.introductionTarget.length) {
    //     this.info.introduction =
    //       this.info.introductionTarget.slice(0, i++) + "_";
    //     timer = setTimeout(this.typing, 100);
    //   } else {
    //     this.info.introduction = this.info.introductionTarget; //结束打字,移除 _ 光标
    //     clearTimeout(timer);
    //   }
    // },
  }
};
</script>
<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>