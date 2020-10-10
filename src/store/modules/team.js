import axios from 'axios';

export default {
  namespaced: true,
  state: {
    teams: [],
    team: null,
  },
  mutations: {
    setTeams(state, teams) {
      state.teams = teams;
    },
    setTeam(state, team) {
      state.team = team;
    },
  },
  actions: {
    fetchUserTeams({
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
    fetchTeam({
      commit,
    }, {
      teamId,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/teams/${teamId}`,
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setTeam', data.data);
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
