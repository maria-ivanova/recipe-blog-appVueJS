import Vue from 'vue';
import App from './App.vue';
import Toasted from 'vue-toasted';
import router from './router';
import store from './store.js';
import axios from 'axios';
import { DATABASE_URL } from './constants/db.js';
import { auth } from './services/firebase.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faUser, faHeart, faUpload, faTimes, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronDown, faUser, faHeart, faUpload, faTimes, faEdit, faBars);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Toasted, { position: 'top-right', duration: 4000 });

axios.interceptors.request.use(function (config) {
  config.url = `${DATABASE_URL}/${config.url}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

Vue.filter('filterDate', function (value) {
  return new Date(value).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' });
})

Vue.filter('filterSubstring', function (value) {
  return value.substr(0, 50);
})

auth.onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);

  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
})

