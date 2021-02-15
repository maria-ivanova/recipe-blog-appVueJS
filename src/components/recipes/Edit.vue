<template>
  <section class="sec content_sec">
    <div class="container tcenter">
      <h2 class="page_title">
        <span>{{ pageTitle }}</span>
      </h2>

      <template v-if="currentItem">
        <h3 class="inner_title">
          Kъм рецептата
          <router-link
            :to="{ name: 'details', params: { id: itemId } }"
            class="title"
          >
            {{ currentItem.title }}
          </router-link>
        </h3>

        <form @submit.prevent="submitHandler" class="recipe_form">
          <div v-if="errorMsg" class="errorMsg">
            {{ errorMsg }}
          </div>

          <div class="input_row">
            <template v-if="$v.title.$error">
              <div class="errorMsg" v-if="!$v.title.required">
                {{ customErrors.requiredField }}
              </div>
            </template>

            <label class="lbl">
              Заглавие
              <span class="tred">*</span>
            </label>

            <input
              type="text"
              class="input_text"
              v-model="title"
              @blur="$v.title.$touch"
            />
          </div>

          <div class="input_row">
            <label class="lbl">
              Категория
              <span class="tred">*</span>
            </label>

            <select class="input_text" v-model="category">
              <option
                v-for="category of allCategories"
                :value="category"
                :key="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <div class="input_row">
            <template v-if="$v.totalTime.$error">
              <div class="errorMsg" v-if="!$v.totalTime.required">
                {{ customErrors.requiredField }}
              </div>

              <div class="errorMsg" v-if="!$v.totalTime.maxLength">
                {{ customErrors.maxLengthTotalTime }}
              </div>
            </template>

            <label class="lbl">
              Време за приготвяне (макс. 10 символа)
              <span class="tred">*</span>
            </label>

            <input
              type="text"
              placeholder="20 мин. / 1 час / 2 часа"
              class="input_text"
              v-model="totalTime"
              @blur="$v.totalTime.$touch"
            />
          </div>

          <div class="input_row">
            <template v-if="$v.yields.$error">
              <div class="errorMsg" v-if="!$v.yields.required">
                {{ customErrors.requiredField }}
              </div>

              <div class="errorMsg" v-if="!$v.yields.minValue">
                {{ customErrors.mustBeInteger }}
              </div>
            </template>

            <label class="lbl">
              Порции
              <span class="tred">*</span>
            </label>

            <input
              type="number"
              class="input_text"
              v-model="yields"
              @blur="$v.yields.$touch"
            />
          </div>

          <div class="input_row">
            <template v-if="$v.imageFile.$error">
              <div class="errorMsg" v-if="!$v.imageFile.imageValidator">
                {{ customErrors.notSupportedFileType }}
              </div>
            </template>

            <label class="lbl">
              Качване на снимка
              <span class="tred">*</span>
            </label>

            <div class="img_holder">
              <div v-if="currentItem.imageUrl">
                <div class="img_box">
                  <img :src="currentItem.imageUrl" alt="recipe pic" />

                  <span class="btnDeleteImg" @click="deleteImage">
                    <font-awesome-icon icon="times" class="fa" />
                  </span>
                </div>
              </div>

              <template v-else>
                <span v-if="imageFile.name">
                  {{ imageFile.name }}
                </span>

                <template v-else> Все още няма качена снимка </template>
              </template>
            </div>

            <label v-if="!currentItem.imageUrl" class="upload_btn btn">
              <input type="file" @change="imageHandler" />
              <font-awesome-icon icon="upload" class="fa" />качи
            </label>
          </div>

          <div class="input_row">
            <template v-if="$v.ingredients.$error">
              <div class="errorMsg" v-if="!$v.ingredients.required">
                {{ customErrors.requiredField }}
              </div>
            </template>

            <label class="lbl">
              Необходими съставки
              <span class="tred">*</span>
            </label>

            <textarea
              class="input_text"
              v-model="ingredients"
              @blur="$v.ingredients.$touch"
            ></textarea>
          </div>

          <div class="input_row">
            <template v-if="$v.recipeDescription.$error">
              <div class="errorMsg" v-if="!$v.recipeDescription.required">
                {{ customErrors.requiredField }}
              </div>
            </template>

            <label class="lbl">
              Начин на приготвяне
              <span class="tred">*</span>
            </label>

            <textarea
              class="input_text"
              v-model="recipeDescription"
              @blur="$v.recipeDescription.$touch"
            ></textarea>
          </div>

          <div class="input_row">
            <button type="submit" class="btn">Редактирай</button>
          </div>
        </form>
      </template>
    </div>
  </section>
</template>

<script>
import {
  getCategories,
  getItemInfo,
  postEdit,
} from "../../services/firebase.requests.js";
import { storage } from "../../services/firebase.js";
import { firebaseErrors, customErrors } from "../../constants/errors";
import { validationMixin } from "vuelidate";
import { required, maxLength, minValue } from "vuelidate/lib/validators";
import { imageValidator } from "../../customValidators/validators.js";

export default {
  name: "Edit",
  mixins: [validationMixin],
  data() {
    return {
      pageTitle: "Редактиране на рецепта",
      itemId: this.$route.params.id,
      currentItem: {},
      allCategories: null,
      imageFile: {},
      errorMsg: "",
      firebaseErrors,
      customErrors,
      title: "",
      category: "",
      totalTime: "",
      yields: "",
      ingredients: "",
      recipeDescription: "",
    };
  },
  validations: {
    title: {
      required,
    },
    totalTime: {
      required,
      maxLength: maxLength(10),
    },
    yields: {
      required,
      minValue: minValue(1),
    },
    ingredients: {
      required,
    },
    recipeDescription: {
      required,
    },
    imageFile: {
      imageValidator: imageValidator("currentItem"),
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
          this.title = this.currentItem.title;
          this.category = this.currentItem.category;
          this.totalTime = this.currentItem.totalTime;
          this.yields = this.currentItem.yields;
          this.ingredients = this.currentItem.ingredients;
          this.recipeDescription = this.currentItem.recipeDescription;
        })
        .catch(() => this.$router.push("/notFound"));
    },

    deleteImage() {
      this.currentItem.imageUrl = "";
      this.imageFile = {};
    },

    imageHandler(event) {
      if (event.target.files[0]) {
        this.imageFile = event.target.files[0];
        this.$v.imageFile.$touch();
      }
    },

    editRecipe() {
      const newData = {
        title: this.title,
        category: this.category,
        totalTime: this.totalTime,
        yields: this.yields,
        ingredients: this.ingredients,
        recipeDescription: this.recipeDescription,
      };

      this.currentItem = { ...this.currentItem, ...newData };

      postEdit(this.itemId, this.currentItem)
        .then(() => {
          this.$toasted.success("Успешно редактиране на рецепта!");
          this.errorMsg = "";
        })
        .catch(() => {
          this.errorMsg = customErrors["failedEdit"];
        });
    },

    submitHandler() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      if (this.currentItem.imageUrl) {
        this.editRecipe();
        return;
      }

      const uploadTask = storage
        .ref(`images/${this.imageFile.name}`)
        .put(this.imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          this.errorMsg = customErrors["failedEdit"];
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(this.imageFile.name)
            .getDownloadURL()
            .then((url) => {
              this.currentItem.imageUrl = url;
              this.editRecipe();
            });
        }
      );
    },
  },

  created() {
    this.getAllCategories();
    this.getInfo();
  },
};
</script>

<style scoped>
.recipe_form {
  width: 100%;
  padding: 30px;
  border: 1px solid #ddd;
  text-align: left;
}

.recipe_form .input_text {
  width: 100%;
}

.recipe_form select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  padding-right: 25px;
  background: #fff url(../../assets/images/arrow_select.png) no-repeat right
    center;
}

.recipe_form textarea {
  height: 120px;
  resize: none;
}

.recipe_form .img_holder {
  display: inline-block;
  float: left;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  color: #7a7a7a;
}

.recipe_form .upload_btn {
  display: inline-block;
  cursor: pointer;
}

.recipe_form .upload_btn .fa {
  margin-right: 5px;
}

.recipe_form .upload_btn input {
  display: none;
}

.img_box {
  position: relative;
  display: inline-block;
}

.btnDeleteImg {
  position: absolute;
  display: inline-block;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #e21d3c;
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
}

.btnDeleteImg:hover {
  background-color: #66a55f;
}

.inner_title {
  display: inline-block;
  float: left;
  width: 100%;
  margin: 0 0 40px 0;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}
</style>