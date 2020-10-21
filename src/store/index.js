import Vue from 'vue';
import Vuex from 'vuex';
import key from '@/store/modules/key';
import project from '@/store/modules/project';
import server from '@/store/modules/server';
import team from '@/store/modules/team';
import value from '@/store/modules/value';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    key,
    project,
    server,
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
});
