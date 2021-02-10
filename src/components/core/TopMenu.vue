<template>
  <section class="sec nav_sec">
    <div class="container">
      <nav class="topmenu">
        <router-link to="/" exact>Начало</router-link>
        <router-link
          v-for="category of allCategories"
          :to="{ name: 'recipesCategory', params: { category } }"
          :key="category"
          >{{ category }}</router-link
        >
      </nav>
    </div>
  </section>
</template>

<script>
import { getCategories } from "../../services/firebase.requests.js";

export default {
  name: "TopMenu",
  data() {
    return {
      allCategories: [],
    };
  },
  methods: {
    getAllCategories() {
      getCategories().then((response) => {
        if (response.status === 200) {
          this.allCategories = Object.values(response.data)[0];
        }
      })
    },
  },

  created() {
    this.getAllCategories();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav_sec {
  background-color: #66a55f;
}

.topmenu {
  display: inline-block;
  width: 100%;
}

.topmenu a {
  display: inline-block;
  padding: 15px 30px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.topmenu a:hover,
.topmenu a.current {
  color: #333;
}

@media (max-width: 1024px) {
  .nav_sec {
    display: none;
  }
}
</style>
