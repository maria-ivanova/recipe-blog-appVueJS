<template>
  <div class="items_list">
    <SingleItem v-for="item of itemsList" :item="item" :key="item.id" />
  </div>
</template>

<script>
import SingleItem from "./SingleItem.vue";
import { getData } from "../../services/firebase.requests.js";

export default {
  name: "ItemsList",
  components: {
    SingleItem,
  },
  props: {
    sortCriterion: String,
    filerCriterion: String,
    secondFilterCriterion: String,
    maxElements: Number,
  },
  data() {
    return {
      itemsList: [],
    };
  },
  watch: {
    secondFilterCriterion: function() {
      this.getAllItems();
    }
  },
  methods: {
    getAllItems() {
      getData().then((response) => {
        if (response.status === 200) {
          this.itemsList = Object.keys(response.data).map((key) => {
            return {
              id: key,
              ...response.data[key],
            };
          });
        }

        if (this.filerCriterion && this.secondFilterCriterion !== 'Всички рецепти') {
          this.itemsList = this.itemsList.filter((el) => el[this.filerCriterion] === this.secondFilterCriterion);
        }

        if (this.sortCriterion) {
          this.itemsList = this.itemsList.sort((a, b) => b[this.sortCriterion] - a[this.sortCriterion]);
        }

        if (this.maxElements) {
          this.itemsList = this.itemsList.slice(0, this.maxElements);
        }
      });
    },
  },

  created() {
    this.getAllItems();
  },
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
</style>