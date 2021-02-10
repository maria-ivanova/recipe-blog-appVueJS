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

        <ItemsList :sortCriterion="sortCriterion" :maxElements="maxElements"/>
      </div>
    </section>

    <IndexInfo />

   <!--<section class="sec content_sec">
      <div class="container">
        <h2 class="page_title">
          <span>
            {{ titleMostLiked }}
          </span>
        </h2>

        <app-items-list
          [sortCriterion]="'likes'"
          [maxElements]="8"
        ></app-items-list>
      </div>
    </section>-->
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
      sortCriterion: 'createdDate',
      maxElements: 8
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
