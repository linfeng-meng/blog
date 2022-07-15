<template>
  <div class="content">
    <div class="left">
      <mu-card class="card">
        <ul class="timeline timeline-centered">
          <li v-for="(item, i) in list" :key="i" :class="[item.years ? 'period' : '', 'timeline-item']"
            @click="goDetail(item._id)">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-img"><img :src="item.cover"></div>

              <div class="timeline-time">
                <div class="timeline-info">
                  <mu-icon size="18" value="access_time"></mu-icon>
                  <span>{{ item.createTime | filterDate("YYYY-MM-DD") }}</span>
                </div>

                <h2 class="timeline-title" v-if="item.years" v-text="item.years + '年'"></h2>
                <span class="timeline-title" v-else v-text="item.title"></span>
              </div>
            </div>
          </li>
        </ul>

        <div v-if="totalCount > pageSize" class="pagination">
          <mu-pagination raised circle :total="totalCount" :current.sync="page" :pageSize.sync="pageSize" :pageCount="5"
            @change="pageChange"></mu-pagination>
        </div>
      </mu-card>
    </div>

    <Right showPosition="文章"></Right>
  </div>
</template>
<script>
import Right from "@/components/Right";
export default {
  props: {
    routeUrl: String
  },
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
    // this.getInfo();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getInfo();
    },
    async getInfo() {
      const loading = this.$loading();
      const res = await this.$axios.get(`${this.routeUrl}&page=${this.page}&pageSize=${this.pageSize}`);

      if (res.data) {
        const list = res.data.list.reverse();
        list.map((item) => {
          item.year = new Date(item.createTime * 1000).getFullYear();
          return item;
        });
        const couponInstance = list.reduce((all, cur) => {
          all[cur.year] = all[cur.year] ? all[cur.year].concat(cur) : [cur];
          return all;
        }, {});
        let result = [];
        for (let i in couponInstance) {
          couponInstance[i].push({ years: i })
          result = result.concat(couponInstance[i])
        }
        this.list = result.reverse();
        this.totalCount = res.data.totalCount
        loading.close();

      }
    },
    goDetail(id) {
      this.$router.push({
        name: "articlesDetails",
        query: { id: id },
      });
    },
  },
  watch: {
    routeUrl(n, o) {
      console.log(n,o)
      this.getInfo();
    }
  }
};
</script>
<style lang="less" scoped>
// .content {
//   width: 100%;
// }

.timeline {
  line-height: 1.4em;
  list-style: none;
  padding: 10px;
  width: 100%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: inherit;
  }
}

.timeline-item {
  padding-left: 40px;
  position: relative;
  cursor: pointer;

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-img {
  width: 80px;
  height: 80px;
  overflow: hidden;
}

.timeline-img img {

  width: 80px;
  height: 80px;
  object-fit: cover;
  -webkit-transition: all 0.6s;
  -moz-transition: all 0.6s;
  -o-transition: all 0.6s;
  -ms-transition: all 0.6s;
  transition: all 0.6s;
}

.timeline-img img:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.timeline-time {
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.timeline-info {
  color: #99a9bf;
  text-transform: uppercase;
  white-space: nowrap;
  display: flex;
  flex-direction: row;

}

.timeline-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 15px;

  &:before {
    content: "";
    width: 3px;
    background: #55c298;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
  }

  &:after {
    background: #0dbc79;
    border: 3px solid transparent;
    border-radius: 100%;
    content: "";
    display: block;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
  }

  .timeline-item:last-child &:before {
    content: none;
  }
}

.timeline-item:not(.period):hover .timeline-marker:after {
  background: #fff;
  border: 3px solid #0dbc79;
}

.timeline-content {
  padding: 10px;
  display: flex;
  flex-direction: row;

  p:last-child {
    margin-bottom: 0;
  }
}

span.timeline-title {
  margin-left: 10px;
  margin-top: 10px;
  line-height: 30px;
  font-size: 18px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
}

span.timeline-title:hover {
  -webkit-transform: translateX(10px);
  -moz-transform: translateX(10px);
  -o-transform: translateX(10px);
  -ms-transform: translateX(10px);
  transform: translateX(10px);
}
.period {
  // padding: 0;

  .timeline-info,
  .timeline-img {
    display: none;
  }

  .timeline-marker {

    &:after {
      background: #fff;
      border: 3px solid #ff7242;
    }
  }

  .timeline-content {
    padding: 10px 0 10px;
  }

  h2.timeline-title {
    color: #ff7242
  }

}

.timeline-split {
  @media (min-width: 768px) {
    .timeline {
      display: table;
    }

    .timeline-item {
      display: table-row;
      padding: 0;
    }

    .timeline-info,
    .timeline-marker,
    .timeline-content,
    .period .timeline-info {
      display: table-cell;
      vertical-align: top;
    }

    .timeline-marker {
      position: relative;
    }

    .timeline-content {
      padding-left: 30px;
    }

    .timeline-info {
      padding-right: 30px;
    }

    .period .timeline-title {
      position: relative;
      left: -45px;
    }
  }
}
</style>