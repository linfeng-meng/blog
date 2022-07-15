<template>
  <canvas class="index-canvas" id="canvas">Canvas not supported</canvas>
</template>
<script>
// import { index_fullScreenAnimation } from "../plugins/landscape";
import Landscape from "../plugins/landscape";

export default {
  mounted() {
    // index_fullScreenAnimation(this.$refs.canvas);
    let el = document.getElementById("canvas");
    let w = window.innerWidth || document.body.clientWidth;
    let h = window.innerHeight || document.body.clientHeight;
    this.loadCanvas(el, w, h);
    this.timer = setInterval(() => {
      this.loadCanvas(el, w, h);
    }, 10000);
  },
  beforeDestroy() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
    }
  },
  methods: {
    loadCanvas(el, w, h) {
      this.Landscape = new Landscape({
        el: el,
        background: "rgba(255,255,255)",
        width: w,
        height: h,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.index-canvas {
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: -9999;
}
</style>
