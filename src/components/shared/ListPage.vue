<template>
<div> {{ categoryName }}</div>
</template>

<script>
export default {
  name: "ListPage",
  data() {
    return {
    }
  },
  computed: {
    categoryName() {
      return this.$route.params.category
    }
  }
};
</script>

<style scoped>
</style>