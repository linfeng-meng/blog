<template>
  <div class="comment-list">
    <div class="comment-item">
      <mu-card class="card" v-for="item in list" :key="item._id">
        <div :class="[classStyle]">
          <mu-card-header :title="item.nickName" :sub-title="item.commentTime | filterDate">
            <mu-avatar slot="avatar" :color="item.color">
              <!-- <img :src="item.avatar" /> -->
              {{ item.nickName.substring(0, 2) }}
            </mu-avatar>
          </mu-card-header>

          <mu-card-text>
            <span v-if="prevWho" class="who">@{{ prevWho }}</span>
            {{ item.currentReplayContent }}
            <mu-badge v-if="item.auditStatus == 3 || item.auditStatus == 2" content="未审核" color="#ccc"></mu-badge>
            <mu-flex class="flex-wrapper" justify-content="end">
              <mu-button icon small color="red" @click="replay(item)">
                <mu-icon value="reply"></mu-icon>
              </mu-button>
            </mu-flex>
          </mu-card-text>
        </div>
        <!-- 递归组件 调用自身，必须指定name属性commentList -->
        <div v-if="item.children">
          <comment-list :prevWho="item.nickName" classStyle="sub-card" :articleId="articleId"
            :articleTitle="articleTitle" :list="item.children"></comment-list>
        </div>
      </mu-card>
    </div>

    <mu-dialog :title="modalTitle" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false"
      :open.sync="open">
      <mu-text-field v-model="replayContent" class="comment-input" placeholder="说点什么..." multi-line :rows="4"
        full-width></mu-text-field>
      <mu-text-field class="comment-input" max-length="16" placeholder="昵称" v-model="nickName"></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="close">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="ok">确定</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  name: "commentList",
  inject: ['replyCommend'],
  props: {
    list: {
      type: Array,
      default: () => { },
    },
    articleId: {
      type: String,
      default: "",
    },
    articleTitle: {
      type: String,
      default: "",
    },
    classStyle: {
      type: String,
      default: "",
    },
    prevWho: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      open: false,
      replayContent: "",
      modalTitle: "",
      nickName:"",
      replayItem: {}
    };
  },
  methods: {
    replay(item) {
      this.open = true;
      this.modalTitle = `回复 @${item.nickName}`;
      this.replayItem = item;
    },
    close() {
      this.open = false;
      this.replayContent = "";
    },
    ok() {
      if (!this.replayContent) {
        this.$toast.error("请输入回复内容");
        return;
      }
      if (!this.nickName || this.nickName<2) {
        this.$toast.error("必须填写昵称,且长度大于等于2");
        return;
      }
      this.replaySubmit();
    },
    async replaySubmit() {
      const postData = {
        nickName: this.nickName,
        articleId: this.articleId,
        articleTitle: this.articleTitle,
        targetReplayId: this.replayItem._id,
        targetReplayContent: this.replayItem.currentReplayContent,
        currentReplayContent: this.replayContent,
      };

      this.replyCommend(postData)
      this.close();
      // const res = await this.$axios.post("/comment", postData);
      // if (res.data) {
      //   this.$toast.success("回复成功,请耐心等待审核");
      //   this.$emit("refreshComment",this.articleId)
      //   this.close();
      // }
    },
  },
};
</script>
<style lang="less" scoped>
.comment-item {
  padding-bottom: 0.53333rem;

  /deep/ .mu-card-text {
    padding-top: 0;

    .who {
      color: #e91e63;
    }
  }
}

.card {
  margin-left: 10px;
  box-shadow: none;
  border-radius: 0;
}

.sub-card {
  border-left: 1px dashed #00e676;
  border-bottom: 1px dashed #00e676;
  box-shadow: none;
  border-radius: 0;
}
</style>