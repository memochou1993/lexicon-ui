import axios from 'axios';

export default {
  namespaced: true,
  state: {
    keys: [],
    key: null,
  },
  mutations: {
    setKeys(state, keys) {
      state.keys = keys;
    },
    setKey(state, key) {
      state.key = key;
    },
  },
  actions: {
    fetchKeys({
      commit,
    }, {
      projectId,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `projects/${projectId}/keys`,
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setKeys', data.data);
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
