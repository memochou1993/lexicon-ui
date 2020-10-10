import Vue from 'vue';
import Vuex from 'vuex';
import team from '@/store/modules/team';
import project from '@/store/modules/project';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    team,
    project,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
