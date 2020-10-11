import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    teams: Base.state(),
    team: Base.state(),
  },
  getters: {
    pages(state) {
      /** @var last_page */
      return state.teams.meta?.last_page || 0;
    },
  },
  mutations: {
    setTeams(state, payload) {
      state.teams = Base.update(state.teams, payload);
    },
    setTeam(state, payload) {
      state.team = Base.update(state.team, payload);
    },
  },
  actions: {
    fetchUserTeams({
      commit,
    }, {
      page,
    }) {
      commit('setTeams');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/user/teams',
          params: {
            page,
            per_page: 100,
          },
        })
          .then(({ data }) => {
            commit('setTeams', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setTeams', error);
            reject(error);
          });
      });
    },
    fetchTeam({
      commit,
    }, {
      teamId,
    }) {
      commit('setTeam');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/teams/${teamId}`,
        })
          .then(({ data }) => {
            commit('setTeam', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setTeam', error);
            reject(error);
          });
      });
    },
  },
};
