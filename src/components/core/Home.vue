<template>
  <div>
    <IndexBanner />

    <!--<section class="sec content_sec">
      <div class="container">
        <h2 class="page_title">
          <span>
            {{ titleNewRecipes }}
          </span>
        </h2>

        <app-items-list
          [sortCriterion]="'createdDate'"
          [maxElements]="8"
        ></app-items-list>
      </div>
    </section>

    <app-index-info></app-index-info>

    <section class="sec content_sec">
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
import IndexBanner from "./IndexBanner.vue";

export default {
  name: "Home",
  components: {
    IndexBanner,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
