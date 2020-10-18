import Vue from 'vue';
import Vuex from 'vuex';
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
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
  },
});
