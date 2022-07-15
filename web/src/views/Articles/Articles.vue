<template>
  <div class="section">
      <div class="left">
        <mu-card class="card" v-for="(item, index) in info.list" :key="index"
          :style="{ flexDirection: isPC ? 'row' : 'column' }" @click="goDetail(item._id)">
          <div class="card-box">
            <div class="title">{{ item.title }}</div>
            <mu-card-actions class="sub-title">
              <mu-icon size="18" value="date_range" color=""></mu-icon><span>{{ item.createTime |
                  filterDate("YYYY-MM-DD")
              }}</span>
              <mu-icon size="18" value="dns" color=""></mu-icon><span>{{ item.categories }}</span>
            </mu-card-actions>
            <mu-card-text class="text">{{ item.introduction }}</mu-card-text>
            <mu-card-actions class="sub-title">
              <mu-icon size="20" value="visibility" color=""></mu-icon><span>{{ item.views | filterNumber }}</span>
              <mu-icon size="18" value="chat_bubble_outline" color=""></mu-icon><span>{{ item.comment }}</span>
            </mu-card-actions>
          </div>
          <div class="cover" v-if="isPC">
            <img class="cover-img" v-lazy="item.cover" />
          </div>
        </mu-card>
        <div v-if="info.totalCount > pageSize" class="pagination">
          <mu-pagination raised circle :total="info.totalCount" :current.sync="page" :pageSize.sync="pageSize"
            :pageCount="5" @change="pageChange"></mu-pagination>
        </div>
      </div>
      <Right showPosition="首页"></Right>

  </div>
</template>
<script>
import Right from "@/components/Right";
export default {
  name: "articles",
  components: {
    Right,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      info: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        list: [],
      },
    };
  },
  mounted() {

    this.getInfo();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getInfo();
    },
    async getInfo() {
      const loading = this.$loading();
      const res = await this.$axios.get(`/archives?page=${this.page}&pageSize=${this.pageSize}`);

      if (res.data) {
        this.info = res.data;
        loading.close();
      }
    },
    goDetail(_id) {
      this.$router.push({
        name: "articlesDetails",
        query: { id: _id },
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  justify-content: center !important;
  padding-bottom: 0.53333rem;
}
</style>