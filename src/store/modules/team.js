import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    teamList: Base.state(),
    teamData: Base.state(),
  },
  mutations: {
    setTeamList(state, payload) {
      state.teamList = Base.update(state.teamList, payload);
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
      commit('setTeamList');
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
            commit('setTeamList', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setTeamList', error);
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
