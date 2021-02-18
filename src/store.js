import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedUser: null,
    searchResult: null
  },
  getters: {
    loggedUser: (state) => state.loggedUser,
    searchResult: (state) => state.searchResult
  },
  mutations: {
      setUser: (state, data) => state.loggedUser = data,
      setSearchResult: (state, data) => state.searchResult = data,
  },
  actions: {
      fetchUser: (context, user) => {
          if (user) {
            context.commit('setUser', user)
          }else {
            context.commit('setUser', null)
          }
      },

      fetchSearchResult: (context, data) => {
        if(data) {
          context.commit('setSearchResult', data)
        }else {
          context.commit('setSearchResult', null)
        }
      }
  }
});

export default store;
