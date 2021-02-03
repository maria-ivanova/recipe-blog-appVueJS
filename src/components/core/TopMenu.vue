<template>
  <section class="sec nav_sec">
    <div class="container">
      <nav class="topmenu">
        <a href="">Начало</a>
        <!--<a
          *ngFor="let category of allCategories"
          [routerLink]="[ROUTES.RECIPES, category]">{{ category }}</a>-->
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: "TopMenu",
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
