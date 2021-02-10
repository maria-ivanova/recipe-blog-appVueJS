<template>
  <section class="sec content_sec">
    <div class="container tcenter">
      <h2 class="page_title">
        <span>{{ title }}</span>
      </h2>

      <form  @submit.prevent="login" class="user_form">
        <div v-if="errorMsg" class="errorMsg">
          {{ errorMsg }}
        </div>

        <div class="input_row">
          <template v-if="$v.email.$error">
            <div class="errorMsg" v-if="!$v.email.required">{{ customErrors.requredEmail }}</div>
            <div class="errorMsg" v-if="!$v.email.email">{{ customErrors.invalidEmail }}</div>
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
            <div class="errorMsg" v-if="!$v.password.required">{{ customErrors.requiredPassword }}</div>
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
          <button type="submit" class="btn">Влез</button>
        </div>

        <div class="input_row">
          Все още нямаш профил?
          <router-link to="/register">Регистрирай се</router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { loginUser } from '../../services/firebase.auth.js';
import { customErrors } from '../../constants/errors';
import { validationMixin } from 'vuelidate';
import { required, email, } from 'vuelidate/lib/validators';

export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
      return {
          title: 'Вход',
          email: '',
          password: '',
          errorMsg: '',
          customErrors
      }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login() {
      this.$v.$touch();

      if(this.$v.$error) {
        return;
      }

      loginUser(this.email, this.password)
      .then(() => {
        this.$router.push('/profile')
      })
      .catch(() => {
        this.errorMsg = this.errorMsg = customErrors['wrongUserPassword'];
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.mtop10 {
  margin-top: 10px;
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
