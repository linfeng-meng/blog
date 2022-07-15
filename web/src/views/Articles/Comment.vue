<template>
  <div class="clearfix" id="comment">
    <mu-card-title></mu-card-title>
    <mu-text-field class="comment-input" placeholder="说点什么..." max-length="100" multi-line :rows="4" full-width
      v-model="content">
    </mu-text-field>
    <mu-text-field class="comment-input" max-length="16" placeholder="昵称" v-model="nickName"></mu-text-field>
    <!-- <SIdentify :identifyCode="identifyCode"></SIdentify> -->
    <mu-button @click="submit" class="comment-btn" color="primary">评论</mu-button>

  </div>
</template>
<script>
import SIdentify from "@/components/SIdentify"
export default {
  components: {
    SIdentify
  },
  data() {
    return {
      identifyCode:"1a2v",
      content: "",
      nickName: ""
    };
  },
  methods: {
    submit() {
      if (!this.content) {
        this.$toast.error("请输入评论内容");
      } else if (!this.nickName || this.nickName.length < 2) {
        this.$toast.error("必须填写昵称,且长度大于等于2");
      } else {
        this.$emit("comment", {
          content: this.content,
          nickName: this.nickName
        });
        this.content = ""
        this.nickName = ""

      }
    },

  }
};
</script>
<style lang="less" scoped>
.comment-input {
  padding: 0 0.42667rem;
}

.comment-btn {
  margin: 0 0.42667rem 0.42667rem 0;
  float: right;
}
</style>