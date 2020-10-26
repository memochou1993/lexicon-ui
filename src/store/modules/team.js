import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    userTeamList: Base.state(),
    teamData: Base.state(),
  },
  mutations: {
    setUserTeamList(state, payload) {
      state.userTeamList = Base.update(state.userTeamList, payload);
    },
    setTeamData(state, payload) {
      state.teamData = Base.update(state.teamData, payload);
    },
  },
  actions: {
    fetchUserTeams({
      commit,
    }, {
      page,
      sort = 'created_at',
      direction = 'asc',
      perPage = 100,
    }) {
      commit('setUserTeamList');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/user/teams',
          params: {
            page,
            sort,
            direction,
            per_page: perPage,
          },
        })
          .then(({ data }) => {
            commit('setUserTeamList', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setUserTeamList', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
    fetchTeam({
      commit,
    }, {
      teamId,
    }) {
      commit('setTeamData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/teams/${teamId}`,
        })
          .then(({ data }) => {
            commit('setTeamData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setTeamData', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
  },
};
