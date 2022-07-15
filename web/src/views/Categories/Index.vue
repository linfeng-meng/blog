<template>
  <div class="content">
    <div class="left">
      <mu-card class="card">
        <mu-list>
          <mu-list-item class="item" button v-for="(item, index) in list" :key="index" @click="goDetail(item)">
            <mu-list-item-title class="item-title">
              <span>{{ item.name }}({{ item.articleNum }})</span>
              <span>{{ item.createTime | filterDate }}</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>


        <div v-if="totalCount > pageSize" class="pagination">
          <mu-pagination raised circle :total="totalCount" :current.sync="page" :pageSize.sync="pageSize" :pageCount="5"
            @change="pageChange"></mu-pagination>
        </div>
      </mu-card>
    </div>
      <Right showPosition="分类"></Right>
  </div>
</template>
<script>
import Right from "@/components/Right";
export default {
  name: "categories",
  components: {
    Right,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      totalCount: 0,
      list: [],
    };
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const loading = this.$loading();
      const res = await this.$axios.get("/categories")
      if (res.data) {
        this.totalCount = res.data.totalCount
        this.list = res.data.list
        loading.close();
      }
    },
    pageChange(page) {
      this.page = page;
      this.getInfo();
    },
    goDetail(item) {
      this.$router.push({
        name: "categoriesDetails",
        query: {
          id: item._id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.mu-item-wrapper.hover {
  background-color: #fff !important;
}

.item-title:before {
  background: #fff;
  border: 3px solid #0dbc79;
  border-radius: 100%;
  content: "";
  display: block;
  height: 15px;
  position: absolute;
  top: 16px;
  left: 10px;
  width: 15px;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
}

.item:hover {
  .item-title:before {
    background: #fff;
    border: 3px solid #ff7242;
  }
}



.item-title {
  font-size: 0.8rem;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
}
</style>