<template>
  <div class="search_form_box">
    <form class="search_form" @submit.prevent="search">
      <input type="text" class="input_text" v-model="searchValue" />
      <button type="submit" class="btn"></button>
    </form>
  </div>
</template>

<script>
import { getData } from "../../services/firebase.requests.js";
import store from "../../store.js";
//import { EventBus } from "../../eventBus.js";

export default {
  name: "SearchForm",
  data() {
    return {
      searchValue: null,
      data: [],
    };
  },
  methods: {
    search() {
      const regex = RegExp(this.searchValue, "gmi");

      getData().then((response) => {
        if (response.status === 200 && response.data) {
          this.data = Object.keys(response.data)
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

        //EventBus.$emit("searchEvent", this.data);
        store.dispatch('fetchSearchResult', this.data);
        this.searchValue = null;
        this.$router.history.push({ name: "search" });
        
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search_form {
  position: relative;
  width: 100%;
}

.search_form .input_text {
  width: 400px;
  height: 50px;
}

.search_form .btn {
  position: absolute;
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  top: 0;
  right: 0;
  border: none;
  background: url(../../assets/images/i_search.svg) no-repeat center center;
  background-size: 20px auto;
  font-size: 20px;
  text-align: center;
  -webkit-transition: all 0.15s ease-out;
  -moz-transition: all 0.15s ease-out;
  -o-transition: all 0.15s ease-out;
  transition: all 0.15s ease-out;
}

.search_form .btn::before {
  position: absolute;
  display: inline-block;
  content: "";
  top: 13px;
  left: 0;
  height: 25px;
  width: 1px;
  background-color: #ddd;
}

.search_form .btn:hover {
  background-image: url(../../assets/images/i_search_hover.svg);
}

@media (max-width: 1024px) {
  .search_form_box {
    width: 40%;
  }

  .search_form .input_text {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .search_form_box {
    width: 100%;
    margin-top: 20px;
  }
}

@media (max-width: 400px) {
  .search_form_box {
    width: 80%;
  }
}
</style>
