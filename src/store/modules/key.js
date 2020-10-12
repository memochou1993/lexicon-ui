import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    keys: Base.state(),
    key: Base.state(),
  },
  getters: {
    pages(state) {
      /** @var last_page */
      return state.keys.meta?.last_page || 0;
    },
  },
  mutations: {
    setKeys(state, payload) {
      state.keys = Base.update(state.keys, payload);
    },
    setKey(state, payload) {
      state.key = Base.update(state.key, payload);
    },
  },
  actions: {
    fetchKeys({
      commit,
    }, {
      projectId,
      page,
      relations,
    }) {
      commit('setKeys');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `projects/${projectId}/keys`,
          params: {
            page,
            per_page: 10,
            relations,
          },
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setKeys', data);
            });
            resolve(data);
          })
          .catch((error) => {
            commit('setKeys', error);
            reject(error);
          });
      });
    },
    fetchKey({
      commit,
    }, {
      keyId,
    }) {
      commit('setKey');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/keys/${keyId}`,
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setKey', data);
            });
            resolve(data);
          })
          .catch((error) => {
            commit('setKey', error);
            reject(error);
          });
      });
    },
  },
};
