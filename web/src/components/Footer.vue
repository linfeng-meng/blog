<template>
  <div class="footer" :class="{ 'fixed-footer': fixed }">
    <a v-if="info.copyright" target="_blank" href="http://beian.miit.gov.cn" v-text="info.copyright"></a>
    <span v-if="info.extra" target="_blank" v-text="info.extra"></span>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() { },
  methods: {},
};
</script>
<style lang="less" scoped>
.fixed-footer {
  width: 100%;
}

.footer {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 0.26667rem;
  margin: 10px 0;

  a {
    color: inherit;
  }
}
</style>