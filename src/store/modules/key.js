import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    keyList: Base.state(),
    keyData: Base.state(),
  },
  getters: {
    pages(state) {
      /** @var last_page */
      return state.keyList.meta?.last_page || 0;
    },
  },
  mutations: {
    setKeyList(state, payload) {
      state.keyList = Base.update(state.keyList, payload);
    },
    setKeyData(state, payload) {
      state.keyData = Base.update(state.keyData, payload);
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
      commit('setKeyList');
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
            commit('setKeyList', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setKeyList', error);
            reject(error);
          });
      });
    },
    fetchKey({
      commit,
    }, {
      keyId,
    }) {
      commit('setKeyData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/keys/${keyId}`,
        })
          .then(({ data }) => {
            commit('setKeyData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setKeyData', error);
            reject(error);
          });
      });
    },
  },
};
