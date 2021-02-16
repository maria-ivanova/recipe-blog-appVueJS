<template>
  <div>
    <!-- BANNER -->
    <section class="sec banner_sec">
      <div class="banner_item inner_banner_item">
        <h2 class="title">{{ pageTitle }}</h2>
      </div>
    </section>

    <!-- ITEMS LIST -->
    <section class="sec content_sec">
      <div class="container">
        <div class="items_list my_list">
          <template v-if="itemsList.length !== 0">
            <MySingleItem
              v-for="item of itemsList"
              :item="item"
              :key="item.id"
              @onDeleteItem="handleDeleteItem"
            />
          </template>

          <template v-else>
            <div class="inner_text">
              <h3>Все още нямате създадени рецепти!</h3>
              <router-link to="/create" class="btn">Създай рецепта</router-link>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MySingleItem from "./MySingleItem.vue";
import { getData, deleteItem } from "../../services/firebase.requests.js";

export default {
  name: "MyRecipes",
  components: {
    MySingleItem,
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser;
    },
  },
  data() {
    return {
      pageTitle: "Моите рецепти",
      itemsList: [],
    };
  },
  methods: {
    getAllItems() {
      getData().then((response) => {
        if (response.status === 200 && response.data) {
          this.itemsList = Object.keys(response.data)
            .map((key) => {
              return {
                id: key,
                ...response.data[key],
              };
            })
            .filter((el) => el["creatorId"] === this.user.uid)
            .sort((a, b) => b["createdDate"] - a["createdDate"]);
        }
      });
    },

    handleDeleteItem(itemId) {
      deleteItem(itemId)
        .then(() => {
          this.$toasted.success("Рецептата беше успeшно изтрита!");
          this.getAllItems();
        })
        .catch(() => {
          this.$toasted.error("Неуспешно изтриване на рецепта!");
        });
    },
  },

  created() {
    this.getAllItems();
  },
};
</script>

<style scoped>
.banner_item {
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  padding: 50px 0;
  background: url(../../assets/images/banner2.jpg) no-repeat 50% 50%;
  background-attachment: fixed;
  background-size: cover;
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 1px 9px 16px rgba(0, 0, 0, 0.18);
}

.banner_item .title {
  position: relative;
  display: inline-block;
  margin: 0;
  font-size: 62px;
  line-height: 92px;
  z-index: 2;
}

.banner_item::after {
  position: absolute;
  display: inline-block;
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

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

.inner_text {
  display: inline-block;
  float: left;
  width: 100%;
  font-size: 20px;
  text-align: center;
}

.btn {
  margin-top: 10px;
  padding: 20px 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  line-height: 28px;
}

@media (max-width: 700px) {
  .banner_item .title {
    font-size: 52px;
    line-height: 72px;
  }
}
</style>