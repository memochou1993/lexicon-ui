import axios from 'axios';

export default {
  namespaced: true,
  state: {
    projects: [],
    project: null,
    pages: 0,
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setProject(state, project) {
      state.project = project;
    },
    setPages(state, pages) {
      state.pages = pages;
    },
  },
  actions: {
    fetchProjects({
      commit,
    }, {
      teamId,
      page,
    }) {
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
            setTimeout(() => {
              commit('setProjects', data.data);
              commit('setPages', data.meta.last_page);
            });
            resolve(data);
          })
          .catch((error) => {
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
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/projects/${projectId}`,
          params: {
            relations,
          },
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setProject', data.data);
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
