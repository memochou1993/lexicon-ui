import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    projectList: Base.state(),
    projectData: Base.state(),
  },
  getters: {
    pages(state) {
      /** @var last_page */
      return state.projectList.meta?.last_page || 0;
    },
  },
  mutations: {
    setProjectList(state, payload) {
      state.projectList = Base.update(state.projectList, payload);
    },
    setProjectData(state, payload) {
      state.projectData = Base.update(state.projectData, payload);
    },
  },
  actions: {
    fetchProjects({
      commit,
    }, {
      teamId,
      page,
    }) {
      commit('setProjectList');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `teams/${teamId}/projects`,
          params: {
            page,
            per_page: 100,
          },
        })
          .then(({ data }) => {
            commit('setProjectList', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setProjectList', error);
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
            reject(error);
          });
      });
    },
  },
};
