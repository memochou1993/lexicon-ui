import axios from 'axios';

export default {
  namespaced: true,
  state: {
    projects: [],
    project: null,
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setProject(state, project) {
      state.project = project;
    },
  },
  actions: {
    fetchProjects({
      commit,
    }, {
      teamId,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `teams/${teamId}/projects`,
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setProjects', data.data);
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
