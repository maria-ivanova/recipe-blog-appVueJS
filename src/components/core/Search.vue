<template>
  <section class="sec content_sec">
    <div class="container">
      <h2 class="page_title">
        <span>{{ pageTitle }}</span>
      </h2>

      <template v-if="itemsList">
        <div class="items_list">
          <SingleItem
            v-for="item of itemsList"
            :item="item"
            :key="item.id"
            class="item"
          />
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import SingleItem from "../shared/SingleItem.vue";
import { getData } from "../../services/firebase.requests.js";

export default {
  name: "Search",
  components: {
    SingleItem,
  },
  computed: {
    searchFilter() {
      return this.$route.query.filter
    }
  },
  watch: {
    searchFilter: function() {
      this.search();
    }
  },
  data() {
    return {
      pageTitle: "Резултат от търсенето",
      itemsList: []
    };
  },
  methods: {
    search() {
      const regex = RegExp(this.searchFilter, "gmi");

      getData().then((response) => {
        if (response.status === 200 && response.data) {
          this.itemsList = Object.keys(response.data)
            .map((key) => {
              return {
                id: key,
                ...response.data[key],
              };
            })
            .filter(
              (el) =>
                regex.test(el.title) ||
                regex.test(el.ingredients) ||
                regex.test(el.recipeDescription) ||
                regex.test(el.category)
            );
        }
      });
    },
  },
  created() {
    this.search();
  }
};
</script>

<style scoped>
.items_list {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.item {
  display: inline-block;
  float: left;
  width: 23%;
  margin-right: 2%;
  margin-bottom: 40px;
  border: 1px solid #ddd;
  background-color: #fff;
}

.item:nth-child(4n + 4) {
  margin-right: 0;
}

@media (max-width: 900px) {
  .item {
    width: 31%;
  }

  .item:nth-child(4n + 4) {
    margin-right: 2%;
  }
}

@media (max-width: 600px) {
  .item {
    width: 49%;
  }

  .item:nth-child(2n + 2) {
    margin-right: 0;
  }
}
</style>