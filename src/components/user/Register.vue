<template>
  <section class="sec content_sec">
    <div class="container tcenter">
      <h2 class="page_title">
        <span>{{ title }}</span>
      </h2>

      <form @submit.prevent="register" class="user_form">
        <div v-if="errorMsg" class="errorMsg">
          {{ errorMsg }}
        </div>

        <div class="input_row">
          <template v-if="$v.username.$error">
            <div class="errorMsg" v-if="!$v.username.required">
              {{ customErrors.requredUserName }}
            </div>
          </template>

          <label class="lbl">
            Потребителско име
            <span class="tred">*</span>
          </label>

          <input
            type="text"
            class="input_text"
            v-model="username"
            @blur="$v.username.$touch"
          />
        </div>

        <div class="input_row">
          <template v-if="$v.email.$error">
            <div class="errorMsg" v-if="!$v.email.required">
              {{ customErrors.requredEmail }}
            </div>
            <div class="errorMsg" v-if="!$v.email.email">
              {{ customErrors.invalidEmail }}
            </div>
          </template>

          <label class="lbl">
            Имейл
            <span class="tred">*</span>
          </label>

          <input
            type="email"
            class="input_text"
            v-model="email"
            @blur="$v.email.$touch"
          />
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
          <button type="submit" class="btn">Регистрирай се</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { registerUser } from "../../services/firebase.auth.js";
import { firebaseErrors, customErrors } from "../../constants/errors";
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Register",
  mixins: [validationMixin],
  data() {
    return {
      title: "Регистрация",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      errorMsg: "",
      customErrors,
    };
  },
  validations: {
    username: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    rePassword: {
      sameAs: sameAs("password"),
    },
  },
  methods: {
    register() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      registerUser(this.email, this.password)
        .then(response => {
          response.user.updateProfile({
            displayName: this.username,
          }).then(() => this.$router.push({name: 'profile', params: {name: this.username}}))
        })
        .catch(err => {
          this.errorMsg = firebaseErrors[err.code] || customErrors["failedRegister"];
        });
    },
  },
};
</script>

<style scoped>
.user_form {
  width: 40%;
  padding: 30px;
  border: 1px solid #ddd;
  text-align: left;
}

.user_form .input_text {
  width: 100%;
}

@media (max-width: 1275px) {
  .user_form {
    width: 70%;
  }
}

@media (max-width: 700px) {
  .user_form {
    width: 100%;
  }
}
</style>