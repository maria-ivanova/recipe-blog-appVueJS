<template>
  <div class="item">
    <router-link
      :to="{ name: 'details', params: { id: item.id } }"
      class="item_img"
    >
      <img :src="item.imageUrl" :alt="item.title" />
    </router-link>

    <div class="item_details">
      <router-link
        :to="{ name: 'details', params: { id: item.id } }"
        class="title"
      >
        {{ item.title }}
      </router-link>

      <div class="date">
        {{ item.createdDate | filterDate }}
      </div>

      <div class="short_content">
        {{ item.recipeDescription | filterSubstring }}...
      </div>

      <div class="item_meta">
        <span class="cell posted_by">
          <font-awesome-icon icon="user" class="fa" />
          <span>{{ item.creatorName }}</span>
        </span>

        <span class="cell post_likes">
          <font-awesome-icon icon="heart" class="fa" />
          <span>{{ item.likes }}</span>
        </span>
      </div>

      <div class="btns_box">
        <router-link
          :to="{ name: 'edit', params: { id: item.id } }"
          class="btn"
        >
          Редактирай
        </router-link>

        <button
          type="button"
          @click="handleDeleteItem(item.id)"
          class="btn btn_del"
        >
          Изтрий
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MySingleItem",
  props: {
    item: Object,
  },
  methods: {
    handleDeleteItem(itemId) {
        this.$emit('onDeleteItem', itemId);
    },
  },
};
</script>

<style scoped>
.item {
  display: inline-block;
  float: left;
  width: 49%;
  margin-right: 2%;
  margin-bottom: 40px;
  border: 1px solid #ddd;
  background-color: #fff;
}

.item:nth-child(2n + 2) {
  margin-right: 0;
}

.item_img {
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
  float: left;
  width: 40%;
  height: 100%;
  padding-left: 20px;
  text-align: center;
  overflow: hidden;
}

.item_img img {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.item_img:hover img {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
}

.item_details {
  display: inline-block;
  float: left;
  width: 60%;
  padding: 20px 30px;
}

.item_details .title {
  display: inline-block;
  float: left;
  width: 100%;
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
}

.item_details .title:hover {
  color: #333;
}

.item_details .date {
  display: inline-block;
  float: left;
  width: 100%;
  color: #a9a9a9;
}

.item_details .short_content {
  display: inline-block;
  float: left;
  width: 100%;
  margin-top: 10px;
}

.item_details .item_meta {
  display: inline-block;
  float: left;
  width: 100%;
  margin-top: 15px;
  color: #a9a9a9;
}

.item_meta .fa {
  margin-right: 5px;
}

.item_meta .cell {
  margin-right: 20px;
}

.item_meta .cell span {
  color: #66a55f;
}

.btns_box {
  display: inline-block;
  float: left;
  width: 100%;
  margin-top: 10px;
}

.btn {
  float: left;
  width: 48%;
  margin-right: 4%;
  padding: 10px;
  font-size: 12px;
  line-height: 22px;
  cursor: pointer;
}

.btn_del {
  background-color: #e21d3c;
}

.btn:last-child {
  margin-right: 0;
}

@media (max-width: 1275px) {
  .item_details {
    padding: 10px 20px;
  }
}

@media (max-width: 900px) {
  .item {
    width: 31%;
  }

  .item:nth-child(2n + 2) {
    margin-right: 2%;
  }

  .item_img,
  .item_details {
    width: 100%;
    height: auto;
  }

  .btn {
    width: 100%;
    margin: 5px 0;
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