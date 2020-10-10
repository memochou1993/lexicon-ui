import axios from 'axios';

export default {
  namespaced: true,
  state: {
    teams: [],
  },
  mutations: {
    setTeams(state, teams) {
      state.teams = teams;
    },
  },
  actions: {
    fetchTeams({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/user/teams',
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setTeams', data.data);
            });
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
