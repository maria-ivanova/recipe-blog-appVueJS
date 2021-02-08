<template>
  <router-link :to="ROUTES.HOME" exact class="logo">
    <img src="../../assets/images/logo_spatulas.png" alt="Spatulas logo" />
  </router-link>
</template>

<script>
import ROUTES from "../../constants/routes.js";

export default {
  name: "Logo",
  data() {
    return {
      ROUTES,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  display: inline-block;
}
</style>
