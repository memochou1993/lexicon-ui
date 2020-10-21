import axios from 'axios';

export default {
  namespaced: true,
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    dispatch({
      rootState,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/project/dispatch',
          headers: {
            Authorization: `Bearer ${rootState.project.projectData.data.setting.settings.api_key}`,
          },
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
