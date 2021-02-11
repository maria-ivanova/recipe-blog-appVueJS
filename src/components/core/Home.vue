<template>
  <div>
    <IndexBanner />

    <section class="sec content_sec">
      <div class="container">
        <h2 class="page_title">
          <span>
            {{ titleNewRecipes }}
          </span>
        </h2>

        <ItemsList sortCriterion="createdDate" :maxElements="maxElements"/>
      </div>
    </section>

    <IndexInfo />

   <section class="sec content_sec">
      <div class="container">
        <h2 class="page_title">
          <span>
            {{ titleMostLiked }}
          </span>
        </h2>

        <ItemsList sortCriterion="likes" :maxElements="maxElements"/>
      </div>
    </section>
  </div>
</template>

<script>
import IndexBanner from './IndexBanner.vue';
import ItemsList from '../shared/ItemsList.vue'
import IndexInfo from './IndexInfo.vue';

export default {
  name: "Home",
  components: {
    IndexBanner,
    ItemsList,
    IndexInfo
  },
  data() {
    return {
      titleNewRecipes: 'Нови рецепти',
      titleMostLiked: 'Най-харесвани рецепти',
      maxElements: 8
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
