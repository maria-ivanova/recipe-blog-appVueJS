<template>
  <section class="sec content_sec">
    <div class="container tcenter">
      <h2 class="page_title">
        <span>{{ title }}</span>
      </h2>

      <form @submit.prevent="updateUser" class="profile_form">
        <div v-if="errorMsg" class="errorMsg">
          {{ errorMsg }}
        </div>

        <div class="input_row">
          <label class="lbl">
            Потребителско име
            <span class="tred">*</span>
          </label>

          <input type="text" class="input_text" disabled v-model="username" />
        </div>

        <div class="input_row">
          <label class="lbl">
            Имейл
            <span class="tred">*</span>
          </label>

          <input type="email" class="input_text" disabled v-model="email" />
        </div>

        <div class="input_row">
          <template v-if="$v.password.$error">
            <div class="errorMsg" v-if="!$v.password.required">
              {{ customErrors.requiredPassword }}
            </div>

            <div class="errorMsg" v-if="!$v.password.minLength">
              {{ customErrors.invalidPasswordLength }}
            </div>
          </template>

          <label class="lbl">
            Парола
            <span class="tred">*</span>
          </label>

          <input
            type="password"
            class="input_text"
            v-model="password"
            @blur="$v.password.$touch"
          />
        </div>

        <div class="input_row">
          <template v-if="$v.rePassword.$error">
            <div class="errorMsg" v-if="!$v.rePassword.sameAs">
              {{ customErrors.matchingPasswords }}
            </div>
          </template>

          <label class="lbl"
            >Повтори паролата
            <span class="tred">*</span>
          </label>

          <input
            type="password"
            class="input_text"
            v-model="rePassword"
            @blur="$v.rePassword.$touch"
          />
        </div>

        <div class="input_row">
          <button type="submit" class="btn">Редактирай</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { passwordUpdate, logout } from "../../services/firebase.auth.js";
import ROUTES from "../../constants/routes.js";
import { firebaseErrors, customErrors } from "../../constants/errors";
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Profile",
  mixins: [validationMixin],
  data() {
    return {
      title: "Профил",
      password: "",
      rePassword: "",
      errorMsg: "",
      ROUTES,
      customErrors,
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    rePassword: {
      sameAs: sameAs("password"),
    },
  },
  computed: {
    getUserData() {
      return this.$store.getters.loggedUser;
    },

    username() {
      if (this.getUserData) {
        return this.getUserData.displayName;
      }
      return null;
    },

    email() {
      if (this.getUserData) {
        return this.getUserData.email;
      }
      return null;
    },
  },
  methods: {
    updateUser() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      passwordUpdate(this.password)
        .then(() => {
          this.$toasted.success('Успешна промяна на парола!');
          this.errorMsg = "";
          logout();
          this.$router.push(ROUTES.LOGIN);
        })
        .catch((err) => {
          if (err.code === "auth/requires-recent-login") {
            this.$toasted.error(firebaseErrors[err.code]);
            logout();
            this.$router.push(ROUTES.LOGIN);

          } else {
            this.errorMsg = firebaseErrors[err.code] || customErrors["failedChangePassword"];
          }
        });
    },
  },
};
</script>

<style scoped>
.profile_form {
  width: 100%;
  padding: 30px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  text-align: left;
}

.profile_form .input_text {
  width: 100%;
}
</style>