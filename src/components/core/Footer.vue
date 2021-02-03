<template>
  <div>
    <footer class="sec content_sec footer_sec">
      <div class="container">
         <Logo />

        <p>
          Наслаждавай се на вкусната храна със съветите на Spatulas.bg.<br />
          Готви с хиляди кулинари от всички краища на страната!
        </p>

        <p>
          Свържете се с нас:
          <a href="mailto:spatulas@info.bg">spatulas@info.bg</a>
        </p>
      </div>
    </footer>

    <section class="sec copyrights">
      <div class="container">
        <div class="ib">2021 Spatulas Всички права запазени</div>
      </div>
    </section>
  </div>
</template>

<script>
import Logo from './Logo.vue';

export default {
  name: "Footer",
  components: {
      Logo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer_sec {
  padding: 50px 0;
  background-color: #f5f5f5;
  font-size: 18px;
  line-height: 28px;
  color: #7a7a7a;
}

.footer_sec .container,
.copyrights .container {
  text-align: center;
}

.copyrights {
  padding: 20px 0 10px 0;
  background-color: #66a55f;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
}

.copyrights a {
  display: inline-block;
  margin-right: 50px;
  color: #fff;
}

.copyrights a:hover {
  text-decoration: underline;
}

.copyrights a:last-child {
  margin-right: 0;
}
</style>
