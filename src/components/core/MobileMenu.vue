<template>
  <div>
    <button @click="setOpen()" class="btn_mobile_menu">
      <font-awesome-icon icon="bars" />
    </button>

    <div class="mobile_menu" :class="{ open: isOpen }">
      <button @click="setOpen()" class="close_mobile_menu">
        <font-awesome-icon icon="times" />
      </button>

      <nav>
        <ul>
          <li>
            <router-link to="/" exact> Начало </router-link>
          </li>

          <li v-for="category of allCategories" :key="category">
            <router-link
              :to="{ name: 'recipesCategory', params: { category } }"
              >{{ category }}</router-link
            >
          </li>

          <template v-if="user">
            <li>
              <router-link to="/create">Създай рецепта</router-link>
            </li>

            <li>
              <router-link :to="{name: 'myRecipes', params: {name: user.displayName}}">Моите рецепти</router-link>
            </li>

            <li>
              <router-link :to="{name: 'favorites', params: {name: user.displayName}}">Любими рецепти</router-link>
            </li>

            <li>
              <router-link :to="{name: 'profile', params: {name: user.displayName}}">Профил</router-link>
            </li>

            <li>
              <span @click="userLogout">Изход</span>
            </li>
          </template>

          <template v-else>
            <li>
              <router-link to="/login">Вход</router-link>
            </li>

            <li>
              <router-link to="/register">Регистрация</router-link>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { logout } from "../../services/firebase.auth.js";
import { getCategories } from "../../services/firebase.requests.js";

export default {
  name: "MobileMenu",
  data: function () {
    return {
      isOpen: false,
      allCategories: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser;
    },
  },
  methods: {
    getAllCategories() {
      getCategories().then((response) => {
        if (response.status === 200) {
          this.allCategories = Object.values(response.data)[0];
        }
      });
    },

    setOpen() {
      this.isOpen = !this.isOpen;
    },

    userLogout() {
      logout();
      this.$router.push("/");
    },
  },

  created() {
    this.getAllCategories();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_mobile_menu {
  display: none;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  border: none;
  background-color: #66a55f;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.close_mobile_menu {
  display: inline-block;
  position: absolute;
  top: 0;
  left: -40px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  border: none;
  background-color: #66a55f;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.mobile_menu {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #333;
  font-size: 14px;
  color: #fff;
  z-index: 1001;
  transform: translateX(300px);
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
}

.mobile_menu.open {
  transform: translateX(0);
}

.mobile_menu ul {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.mobile_menu li {
  position: relative;
  display: inline-block;
  float: left;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
}

.mobile_menu a,
.mobile_menu span {
  display: inline-block;
  padding: 12px 20px;
  color: #fff;
  text-transform: none;
}

.mobile_menu span {
  cursor: pointer;
}

@media (max-width: 1024px) {
  .btn_mobile_menu,
  .mobile_menu {
    display: inline-block;
  }
}

@media (max-width: 700px) {
  .btn_mobile_menu {
    position: absolute;
    top: 37px;
    right: 2%;
  }
}

@media (max-width: 400px) {
  .btn_mobile_menu {
    position: static;
    margin-top: 20px;
  }
}
</style>
