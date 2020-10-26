import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    userProjectList: Base.state(),
    projectList: Base.state(),
    projectData: Base.state(),
  },
  mutations: {
    setUserProjectList(state, payload) {
      state.userProjectList = Base.update(state.userProjectList, payload);
    },
    setProjectList(state, payload) {
      state.projectList = Base.update(state.projectList, payload);
    },
    setProjectData(state, payload) {
      state.projectData = Base.update(state.projectData, payload);
    },
  },
  actions: {
    fetchUserProjects({
      commit,
    }, {
      page,
      sort = 'created_at',
      direction = 'asc',
      perPage = 100,
    }) {
      commit('setUserProjectList');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/user/projects',
          params: {
            page,
            sort,
            direction,
            per_page: perPage,
          },
        })
          .then(({ data }) => {
            commit('setUserProjectList', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setUserProjectList', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
    fetchProjects({
      commit,
    }, {
      teamId,
      page,
      sort = 'created_at',
      direction = 'asc',
      perPage = 100,
    }) {
      commit('setProjectList');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `teams/${teamId}/projects`,
          params: {
            page,
            sort,
            direction,
            per_page: perPage,
          },
        })
          .then(({ data }) => {
            commit('setProjectList', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setProjectList', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
    fetchProject({
      commit,
    }, {
      projectId,
      relations,
    }) {
      commit('setProjectData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/projects/${projectId}`,
          params: {
            relations,
          },
        })
          .then(({ data }) => {
            commit('setProjectData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setProjectData', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
  },
};
