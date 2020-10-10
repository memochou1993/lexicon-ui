import axios from 'axios';

export default {
  namespaced: true,
  state: {
    teams: [],
    team: null,
    pages: 0,
  },
  mutations: {
    setTeams(state, teams) {
      state.teams = teams;
    },
    setTeam(state, team) {
      state.team = team;
    },
    setPages(state, pages) {
      state.pages = pages;
    },
  },
  actions: {
    fetchUserTeams({
      commit,
    }, {
      page,
    }) {
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
            setTimeout(() => {
              commit('setTeams', data.data);
              commit('setPages', data.meta.last_page);
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
