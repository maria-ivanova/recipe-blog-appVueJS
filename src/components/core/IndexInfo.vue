<template>
  <section class="sec content_sec bg_sec">
    <div class="container">
      <h2 class="page_title">
        <span> За нас </span>
      </h2>

      <div class="inner_txt">
        На нашия уебсайт можете да намерите селекции от рецепти, групирани по
        категории, <br />написани от хиляди кулинари от всички краища на
        страната!
      </div>

      <div class="cells_box">
        <span class="cell">
          <img src="../../assets/images/i_soup.svg" />
          <span class="title">Салати</span>
        </span>

        <span class="cell">
          <img src="../../assets/images/i_mainDish.svg" />
          <span class="title">Основни ястия</span>
        </span>

        <span class="cell">
          <img src="../../assets/images/i_soup.svg" />
          <span class="title">Супи</span>
        </span>

        <span class="cell">
          <img src="../../assets/images/i_dessert.svg" />
          <span class="title">Десерти</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'IndexInfo'
};
</script>

<style scoped>
.bg_sec {
  padding: 80px 0 40px 0;
  background-color: #f5f5f5;
}

.bg_sec .inner_txt {
  display: inline-block;
  float: left;
  width: 100%;
  font-size: 18px;
  line-height: 28px;
  color: #7a7a7a;
  text-align: center;
}

.cells_box {
  display: inline-block;
  float: left;
  width: 100%;
  margin-top: 30px;
}

.cells_box .cell {
  display: inline-block;
  float: left;
  width: 25%;
  margin-top: 10px;
  padding: 0 20px;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}

.cells_box .cell .title {
  display: inline-block;
  float: left;
  width: 100%;
  font-weight: 700;
}

@media (max-width: 700px) {
  .bg_sec {
    padding-top: 60px;
  }
  .cells_box .cell {
    width: 50%;
  }
}
</style>