<template>
  <Details :routeUrl="routeUrl"></Details>
</template>
<script>
import Details from "@/components/Details";
export default {
  name: "categoriesDetails",
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
    this.routeUrl = `/categories/details?id=${id}`
  },
};
</script>
