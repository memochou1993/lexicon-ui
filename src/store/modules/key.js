import axios from 'axios';

export default {
  namespaced: true,
  state: {
    keys: [],
    key: null,
    pages: 0,
  },
  mutations: {
    setKeys(state, keys) {
      state.keys = keys;
    },
    setKey(state, key) {
      state.key = key;
    },
    setPages(state, pages) {
      state.pages = pages;
    },
  },
  actions: {
    fetchKeys({
      commit,
    }, {
      projectId,
      page,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `projects/${projectId}/keys`,
          params: {
            page,
            per_page: 10,
          },
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setKeys', data.data);
              commit('setPages', data.meta.last_page);
            });
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchKey({
      commit,
    }, {
      keyId,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/keys/${keyId}`,
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setKey', data.data);
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
