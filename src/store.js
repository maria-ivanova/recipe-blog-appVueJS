import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedUser: null
  },
  getters: {
    loggedUser: (state) => state.loggedUser
  },
  mutations: {
      setUser: (state, data) => state.loggedUser = data
  },
  actions: {
      fetchUser: (context, user) => {
          if (user) {
            context.commit('setUser', user)
          }else {
            context.commit('setUser', null)
          }
      }
  }
});

export default store;
