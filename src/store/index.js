import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import key from '@/store/modules/key';
import project from '@/store/modules/project';
import team from '@/store/modules/team';
import value from '@/store/modules/value';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    key,
    project,
    team,
    value,
  },
  state: {
    error: null,
    message: '',
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    dispatch({
      commit,
    }, {
      apiKey,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/project/dispatch',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error);
            reject(error);
          });
      });
    },
  },
});
