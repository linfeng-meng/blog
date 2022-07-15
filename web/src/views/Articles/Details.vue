<template>
  <div class="content">
    <mu-container class="demo-container is-stripe">
      <mu-row gutter>
        <mu-col sm="12" md="12" lg="8" xl="9">
          <div class="grid-cell">
            <mu-card class="card">
              <mu-card-title :title="info.title" :sub-title="info.introduction"></mu-card-title>
              <mu-card-actions class="sub-title">


                <mu-button class="cursor-default" flat>
                  <mu-icon left size="18" value="dns"></mu-icon><span>{{ info.categories }}</span>
                </mu-button>
                <mu-button class="cursor-default" flat v-if="info.updateTime">
                  <mu-icon left size="18" value="turned_in"></mu-icon>标签：
                  <mu-badge :content="tag" v-for="tag in info.tags" :key="tag" color=""></mu-badge>
                </mu-button>
                <mu-button class="cursor-default" flat>
                  <mu-icon left size="18" value="date_range"></mu-icon><span>发表于{{ info.createTime |
                      filterDate("YYYY-MM-DD")
                  }}</span>
                </mu-button>
                <mu-button class="cursor-default" flat v-if="info.updateTime">
                  <mu-icon left size="18" value="update"></mu-icon><span>更新于{{ info.updateTime |
                      filterDate("YYYY-MM-DD")
                  }}</span>
                </mu-button>
                <br>
                <mu-button class="cursor-default" flat>
                  <mu-icon left size="18" value="text_fields"></mu-icon><span>字数总计：{{ wordLength }}</span>
                </mu-button>
                <mu-button class="cursor-default" flat>
                  <mu-icon left size="18" value="av_timer"></mu-icon><span>阅读时长：{{ min }}分钟</span>
                </mu-button>
                <mu-button class="cursor-default" flat>
                  <mu-icon left size="18" value="visibility"></mu-icon><span>阅读量：{{ info.views }}</span>
                </mu-button>
                <mu-button class="cursor-default" flat>
                  <mu-icon left size="18" value="comment"></mu-icon><span>评论数：{{ info.comment }}</span>
                </mu-button>
              </mu-card-actions>

              <!-- <mavonEditor v-model="content" :ishljs="true" :toolbarsFlag="false" :subfield="false"
                defaultOpen="preview" codeStyle="atom-one-dark" :navigation="isPC" /> -->


              <mavonEditor v-model="content" :ishljs="true" :toolbarsFlag="false" :subfield="false"
                defaultOpen="preview" codeStyle="tomorrow-night-eighties" :navigation="isPC" />

            </mu-card>
            <prev-next :prev="prev" :next="next" @prenext="goDetails"></prev-next>
            <Comment @comment="comment" />
            <mu-card class="card" v-if="commentList.length > 0">
              <mu-card-title :title="`评论（${commentList.length}）`"></mu-card-title>
              <mu-divider></mu-divider>
              <CommentList v-if="commentList.length > 0" @refreshComment="getCommentList" :articleId="info._id"
                :articleTitle="info.title" :list="commentList">
              </CommentList>
            </mu-card>

          </div>
        </mu-col>
        <mu-col sm="0" md="0" lg="4" xl="3" v-if="isPC">
          <div class="grid-cell">
            <div :class="[this.fixed ? 'fixed' : '', 'toc-fixed']">
              <mu-card class="card">
                <div class="toc">
                  <div v-if="toc.length" class="toc-list">
                    <div class="title">文章目录</div>
                    <div v-for="item in toc" :key="item.name">
                      <a @click="scrollToPosition(item.href)" v-html="item.name"></a>
                    </div>
                    <mu-divider></mu-divider>
                  </div>

                  <div class="action-list">
                    <mu-tooltip placement="top" content="点赞">
                      <mu-button fab color="primary">
                        <mu-icon value="thumb_up"></mu-icon>
                      </mu-button>
                    </mu-tooltip>
                    <mu-tooltip v-if="info.isComment" placement="top" content="评论">
                      <mu-button @click="scrollComment" fab color="red">
                        <mu-icon value="chat"></mu-icon>
                      </mu-button>
                    </mu-tooltip>
                    <!-- <mu-tooltip placement="top" content="收藏">
                      <mu-button fab color="purple500">
                        <mu-icon value="grade"></mu-icon>
                      </mu-button>
                    </mu-tooltip> -->
                  </div>
                </div>
              </mu-card>
            </div>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>
<script>
import { randomColor } from "@/plugins/random";
import Left from "@/components/Right";
import Comment from "./Comment";
import CommentList from "./CommentList";
import PrevNext from "./PrevNext";
import Clipboard from "clipboard";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { markdown } from "@/plugins/markdown";
import $ from "jquery";
export default {
  provide() { return { replyCommend: this.replyCommend } },
  inject: ["scrollTop"],
  name: "articlesDetails",
  components: {
    Left,
    Comment,
    CommentList,
    PrevNext,
    mavonEditor,
  },
  data() {
    return {
      fixed: false,
      info: {},
      prev: {},
      next: {},
      content: "",
      toc: [],
      commentSuccess: false,
      commentList: [],
    };
  },
  mounted() {
    const id = this.$route.query.id;
    this.getInfo(id, 1);
    this.getCommentList(id);
    this.$nextTick(() => {
      let clipboard = new Clipboard(".copy-btn");
      // 复制成功失败的提示
      clipboard.on("success", () => {
        this.$toast.success("复制成功");
      });
      clipboard.on("error", () => {
        this.$toast.error("复制失败");
      });
    });
  },
  computed: {
    scrollHeight() {
      return this.scrollTop()
    },
    min() {
      if (this.content) {
        return Math.floor(this.info.content.length / 1000);
      }
      return 0;
    },
    wordLength() {
      if (this.info.content) {
        var lenE = this.info.content.length;
        var enter = this.info.content.match(/\r\n/g);
        return enter === null ? lenE : lenE - enter.length;
      }
      return 0;
    },
    // commentTitle() {
    //   return this.info.comment ? `评论（${this.info.comment}）` : null;
    // },
  },
  methods: {
    goDetails(id) {
      this.$router.push({
        name: "articlesDetails",
        query: { id: id }
      });
      this.getInfo(id, 1);
      this.getCommentList(id)
      document.body.scrollIntoView();
    },
    async getInfo(id, views) {
      // this.$progress.start();
      const loading = this.$loading();
      const res = await this.$axios.get(
        `/articles/details?id=${id}&views=${views}`
      );
      if (res.data) {
        this.info = res.data.current;
        this.prev = res.data.prev;
        this.next = res.data.next;
        this.content = markdown(mavonEditor, this.info.content);
        // this.content = this.info.content;

        // this.$progress.done();
        loading.close();
        this.$nextTick(() => {
          const aArr = $(
            ".v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content a"
          ).toArray();
          let toc = [];
          aArr.forEach((item) => {
            let href = $(item).attr("id");
            let name = $(item).parent().text();
            if (href) {
              toc.push({
                href: "#" + href,
                name,
              });
            }
          });
          this.toc = toc;
        });
      }
    },
    scrollToPosition(id) {
      var position = $(id).offset();
      position.top = position.top - 80;
      $("html,body").animate({ scrollTop: position.top }, 500);
    },
    scrollComment() {
      this.scrollToPosition("#comment");
    },
    async comment(data) {
      const postData = {
        // avatar: data.avatar,
        nickName: data.nickName,
        articleId: this.info._id,
        articleTitle: this.info.title,
        currentReplayContent: data.content,
      };
      const res = await this.$axios.post("/comment", postData);
      if (res.data) {
        this.$toast.success(res.msg);
        this.getCommentList(this.info._id)
      }
    },
    async replyCommend(postData) {
      const res = await this.$axios.post("/comment", postData);
      if (res.data) {
        this.$toast.success(res.msg);
        this.getCommentList(this.info._id)
      }
    },
    async getCommentList(id) {
      const res = await this.$axios.get(`/comment/list?articleId=${id}`);
      if (res.data) {
        const list = res.data ? res.data.map((item) => {
          return {
            ...item,
            color: randomColor(),
          };
        }) : [];
        this.commentList = this.listToTree(list);
      }
    },
    listToTree(list) {
      let info = list.reduce(
        (map, node) => ((map[node._id] = node), (node.children = []), map),
        {}
      );
      return list.filter((node) => {
        info[node.targetReplayId] &&
          info[node.targetReplayId].children.push(node);
        return !node.targetReplayId;
      });
    },
  },
  watch: {
    scrollHeight(newVal, oldVal) {
      if (newVal > 336) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    }
  },
};
</script>
<style lang="less" scoped>
.content {

  .fixed {
    position: fixed;
    // right: 20px;
    top: 0;

  }

  .mu-badge-container {
    margin-right: 5px;
  }

  .toc-fixed {
    width: 250px;


    .toc {
      width: 100%;
      max-height: 100vh;
      word-break: break-all;
      display: flex;
      flex-direction: column;

      .toc-list {
        overflow-y: auto;
        padding: 10px;
        flex: 1;
      }


      .action-list {
        padding: 10px;
        display: flex;
        justify-content: space-around;
      }


      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }

      a {
        display: inline-block;
        color: rgb(13, 188, 121);
        cursor: pointer;
        padding: 5px 0;
      }
    }
  }
}
</style>