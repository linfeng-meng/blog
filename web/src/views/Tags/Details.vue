<template>
  <Details :routeUrl="routeUrl"></Details>
</template>
<script>
import Details from "@/components/Details";
export default {
  name: "tagsDetails",
  components: {
    Details
  },
  data() {
    return {
      routeUrl: '',
    };
  },
  mounted() {
    const id = this.$route.query.id;
    this.routeUrl = `/tags/details?id=${id}`
  },
};
</script>
