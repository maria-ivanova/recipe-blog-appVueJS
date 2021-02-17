<template>
  <div>
    <section class="sec">
      <div class="banner_item">
        <h2 class="title">{{ pageTitle }}</h2>
      </div>
    </section>

    <section class="sec content_sec">
      <div class="container">
        <div v-if="itemsList.length !== 0" class="items_list my_list">
          <SingleItem
            v-for="item of itemsList"
            :item="item"
            :key="item.id"
            class="item"
          />
        </div>

        <div v-else class="inner_text">
          <h3>Все още нямате любими рецепти!</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getData } from "../../services/firebase.requests.js";
import SingleItem from "../shared/SingleItem.vue";

export default {
  name: "Favorites",
  components: {
    SingleItem,
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser;
    },
  },
  data() {
    return {
      pageTitle: "Любими рецепти",
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
            .filter((el) => el.likes !== 0)
            .filter((el) => el["likesArr"].includes(this.user.uid));
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

.item {
  display: inline-block;
  float: left;
  width: 23%;
  margin-right: 2%;
  margin-bottom: 40px;
  border: 1px solid #ddd;
  background-color: #fff;
}

.item:nth-child(4n + 4) {
  margin-right: 0;
}

.inner_text {
  display: inline-block;
  float: left;
  width: 100%;
  font-size: 20px;
  text-align: center;
}

@media (max-width: 900px) {
  .item {
    width: 31%;
  }

  .item:nth-child(4n + 4) {
    margin-right: 2%;
  }
}

@media (max-width: 700px) {
  .banner_item .title {
    font-size: 52px;
    line-height: 72px;
  }
}

@media (max-width: 600px) {
  .item {
    width: 49%;
  }

  .item:nth-child(2n + 2) {
    margin-right: 0;
  }
}
</style>