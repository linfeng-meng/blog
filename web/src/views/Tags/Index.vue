<template>
  <div class="content">
    <div class="left">
      <div :class="['tags-wap', isPC ? 'tagcloud' : '']">
        <a v-for="(item, index) in tags" @click="goDetail(item)" :key="index">
          <mu-chip v-if="item.articleNum > 0" class="tag" :color="item.color">{{ item.name }}({{ item.articleNum }})
          </mu-chip>
        </a>
      </div>
    </div>
    <Right showPosition="标签"></Right>
  </div>
</template>

<script>
import { randomColor } from "@/plugins/random";
import Right from "@/components/Right";

export default {
  name: "tags",
  components: {
    Right,
  },
  data() {
    return {
      tags: [],
    };
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const res = await this.$axios.get("/tags")
      if (res.data) {
        this.tags = res.data.list ? res.data.list.map((item) => {
          return {
            ...item,
            color: randomColor(),
          };
        }) : [];
        this.$nextTick(() => {
          window.tagcloud({
            selector: ".tagcloud", //元素选择器
            fontsize: 16, //基本字体大小, 单位px
            radius: 100, //滚动半径, 单位px
            mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
            ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
            direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
            keep: false, //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
          })
        });
      }
    },
    goDetail(item) {
      this.$router.push({
        name: "tagsDetails",
        query: {
          id: item._id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  // padding-top: 32px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: 100%;
}

.tags-wap {
  padding: 0 0.53333rem;
  height: 100%;
  // width: 70%;

  .tag {
    margin-right: 0.53333rem;
    margin-bottom: 0.53333rem;
    cursor: pointer;
  }
}
</style>