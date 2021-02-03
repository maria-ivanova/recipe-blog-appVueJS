<template>
  <header class="sec header_sec" id="home">
    <div class="container">
      <Logo />
      <SearchForm />
      <MobileMenu />

      <div class="header_right">
        <ul class="menu">
          <li><a href="">Вход</a></li>

          <li><a href="">Регистрация</a></li>
        </ul>

        <ul class="menu">
          <li class="">
            <span>some email <font-awesome-icon icon="chevron-down" /></span>
            
            <ul class="submenu">
              <li><a href="">Създай рецепта</a></li>
              <li><a href="">Моите рецепти</a></li>
              <li>
                <a href="">Любими рецепти</a>
              </li>
              <li><a href="">Профил</a></li>
            </ul>
          </li>

          <li><span>Изход</span></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from './Logo.vue';
import SearchForm from './SearchForm.vue';
import MobileMenu from './MobileMenu';

export default {
  name: "Header",
  components: {
      Logo,
      SearchForm,
      MobileMenu
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header_sec {
    padding: 20px 0;
    background-color: #f5f5f5;
  }
  
  .header_sec .container {
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
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    margin: auto;
  }
  
  .header_sec .logo {
    float: left;
  }

  .header_right {
    display: inline-block;
    float: right;
  }
  
  .header_right .menu {
    display: inline-block;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .header_right .menu li {
    position: relative;
    display: inline-block;
    float: left;
    padding: 0 10px;
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
  }
  
  .header_right .menu > li::after {
    position: absolute;
    display: inline-block;
    content: '';
    width: 1px;
    height: 15px;
    top: 50%;
    right: -1px;
    margin-top: -7px;
    background-color: #bdbdbd;
  }
  
  .header_right .menu > li:last-child::after {
    display: none;
    padding-right: 0;
  }
  
  .header_right .menu li .fa {
    margin-left: 5px;
    vertical-align: -0.150em;
  }
  
  .header_right .menu a {
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
    cursor: pointer;
  }

  .header_right .menu span {
    cursor: pointer;
  }
  
  .header_right .menu a:hover,
  .header_right .menu span:hover {
    color: #66a55f;
  }
  
  .header_right .submenu {
      position: absolute;
      display: inline-block;
      margin: 0;
      padding: 0;
      list-style-type: none;
      top: 100%;
      left: 0;
      margin-top: 10px;
      width: 250px;
      background-color: #fff;
      box-shadow: 0 5px 25px rgba(0, 0, 0, .1);
      border-top: 3px solid #66a55f;
      opacity: 0;
      visibility: hidden;
      z-index: 1000;
  }
  
  .header_right .submenu li {
      display: inline-block;
      float: left;
      width: 100%;
      padding: 0;
      border-bottom: 1px solid #ddd;
  }
  
  .header_right .submenu li a {
      display: inline-block;
      float: left;
      width: 100%;
      padding: 10px 15px;
      text-transform: none;
  }
  
  .header_right .menu > li:hover .submenu {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 1024px) {
    .header_sec {
      background-color: #fff;
      border-bottom: 2px solid #66a55f;
    }

    .header_right {
      display: none;
    }
  }
</style>
