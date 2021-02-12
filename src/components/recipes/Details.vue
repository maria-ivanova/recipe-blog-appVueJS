<template>
  <div>
    <!-- BANNER -->
    <section class="sec banner_sec" v-if="currentItem">
      <div class="banner_item inner_banner_item">
        <h2 class="title">{{ currentItem.category }}</h2>
      </div>
    </section>

    <!-- ITEM INFO -->
    <section class="sec content_sec" v-if="currentItem">
      <div class="container">
        <div class="item_layout">
          <div class="left_part">
            <div class="img_box">
              <img :src="currentItem.imageUrl" />
            </div>

            <div class="features">
              <div class="features_item">
                <span class="icon">
                  <img src="../../assets/images/i_book.svg" />
                </span>

                <div class="info">
                  <span class="title">Категория</span><br />
                  <span>{{ currentItem.category }}</span>
                </div>
              </div>

              <div class="features_item">
                <span class="icon">
                  <img src="../../assets/images/i_alarm.svg" />
                </span>

                <div class="info">
                  <span class="title">Време за приготвяне</span><br />
                  <span>{{ currentItem.totalTime }}</span>
                </div>
              </div>

              <div class="features_item">
                <span class="icon">
                  <img src="../../assets/images/i_dish.svg" />
                </span>

                <div class="info">
                  <span class="title">Порции</span><br />
                  <span>{{ currentItem.yields }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="right_part">
            <h2 class="page_title">
              {{ currentItem.title }}
            </h2>

            <div class="">
              <h3 class="inner_title">Необходими съставки:</h3>
              <div class="row">
                {{ currentItem.ingredients }}
              </div>
            </div>
          </div>

          <div class="description">
            <h3 class="inner_title">Начин на приготвяне:</h3>
            <div class="row">
              {{ currentItem.recipeDescription }}
            </div>
          </div>

          <div class="item_meta">
            <div class="fleft">
              Публикувано от <span>{{ currentItem.creatorName }}</span> на
              <span>{{ currentItem.createdDate | filterDate }}</span>
            </div>

            <div v-if="user">
              <router-link
                v-if="isCreator(user.uid)"
                :to="{ name: 'edit', params: { id: itemId } }"
                class="btn"
              >
                <font-awesome-icon icon="edit" class="fa" /> Редактирай
              </router-link>

              <template v-else>
                <span v-if="isLiked(user.uid) || successfullLiking" class="favorites_info">
                  <font-awesome-icon icon="heart" class="fa" /> Добавена в любими
                </span>

                <button v-else class="btn" @click="likesHandler">
                  <font-awesome-icon icon="heart" class="fa" />Добави в любими
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getItemInfo, postEdit } from "../../services/firebase.requests.js";

export default {
  name: "Details",
  data() {
    return {
      currentItem: null,
      itemId: this.$route.params.id,
      successfullLiking: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser;
    },
  },
  methods: {
    getInfo() {
      let id = this.$route.params.id;
      getItemInfo(id)
        .then((response) => {
          let data = response.data;

          if (!data) {
            this.$router.push("/notFound");
            return;
          }

          this.currentItem = data;
        })
        .catch(() => this.$router.push("/notFound"));
    },

    isCreator(userId) {
      if (this.currentItem.creatorId === userId) {
        return true;
      }
    },

    isLiked(userId) {
      if (this.currentItem.likesArr?.includes(userId)) {
        return true;
      }
    },

    likesHandler() {
      this.currentItem.likes = this.currentItem.likes + 1;

      if (!this.currentItem.likesArr) {
        this.currentItem.likesArr = [];
      }

      this.currentItem.likesArr.push(this.user.uid);

      postEdit(this.itemId, this.currentItem)
        .then(() => {
          this.successfullLiking = true;
          this.$toasted.success('Успешно добавихте рецептата в любими!');
        })
    },
  },
  created() {
    this.getInfo();
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

.item_layout {
  display: inline-block;
  float: left;
  width: 100%;
}

.item_layout .left_part {
  display: inline-block;
  float: left;
  width: 48%;
  margin-right: 2%;
}

.item_layout .right_part {
  display: inline-block;
  float: left;
  width: 48%;
}

.item_layout .page_title {
  margin: 0 0 60px 0;
  font-size: 32px;
  line-height: 42px;
  text-align: left;
  text-transform: none;
}

.item_layout .inner_title {
  display: inline-block;
  float: left;
  width: 100%;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 20px;
  line-height: 30px;
}

.item_layout .description {
  display: inline-block;
  float: left;
  width: 100%;
  margin-top: 40px;
}

.item_layout .description p {
  margin: 0 0 15px 0;
}

.features {
  display: inline-block;
  float: left;
  width: 100%;
  margin-top: 20px;
}

.features_item {
  position: relative;
  display: inline-block;
  float: left;
  margin-right: 7%;
  margin-bottom: 10px;
}

.features_item:last-child {
  margin-right: 0;
}

.features_item .icon {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 40px;
}

.features_item .icon img {
  width: 100%;
}

.features_item .info {
  display: inline-block;
  padding-left: 50px;
  line-height: 20px;
}

.features_item .title {
  font-weight: 700;
  text-transform: uppercase;
}

.item_meta {
  display: inline-block;
  float: left;
  width: 100%;
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-weight: 700;
}

.item_meta .meta_info {
  display: inline-block;
  float: left;
}

.item_layout .item_meta span {
  color: #66a55f;
}

.item_layout .btn {
  float: right;
  padding-bottom: 12px;
  cursor: pointer;
}

.item_layout .btn .fa {
  position: relative;
  margin-right: 10px;
  font-size: 22px;
  top: 2px;
}

.favorites_info {
  display: inline-block;
  float: right;
}

@media (max-width: 700px) {
  .banner_item .title {
    font-size: 52px;
    line-height: 72px;
  }

  .item_layout .left_part,
  .item_layout .right_part {
    width: 100%;
  }

  .item_layout .left_part {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .item_layout .page_title {
    margin-bottom: 30px;
  }

  .item_meta .meta_info {
    display: inline-block;
    width: 38%;
  }
}
</style>