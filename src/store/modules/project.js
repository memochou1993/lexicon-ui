import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    projects: Base.state(),
    project: Base.state(),
  },
  getters: {
    pages(state) {
      /** @var last_page */
      return state.projects.meta?.last_page || 0;
    },
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = Base.update(state.projects, payload);
    },
    setProject(state, payload) {
      state.project = Base.update(state.project, payload);
    },
  },
  actions: {
    fetchProjects({
      commit,
    }, {
      teamId,
      page,
    }) {
      commit('setProjects');
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
            commit('setProjects', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setProjects', error);
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
      commit('setProject');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/projects/${projectId}`,
          params: {
            relations,
          },
        })
          .then(({ data }) => {
            commit('setProject', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setProject', error);
            reject(error);
          });
      });
    },
  },
};
