import Vue from 'vue';
import Vuex from 'vuex';
import key from '@/store/modules/key';
import project from '@/store/modules/project';
import team from '@/store/modules/team';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    key,
    project,
    team,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
