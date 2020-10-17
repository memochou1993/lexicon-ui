import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    valueData: Base.state(),
  },
  getters: {
    pages(state) {
      /** @var last_page */
      return state.values.meta?.last_page || 0;
    },
  },
  mutations: {
    setValueData(state, payload) {
      state.valueData = Base.update(state.valueData, payload);
    },
  },
  actions: {
    fetchValue({
      commit,
    }, {
      valueId,
    }) {
      commit('setValueData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/values/${valueId}`,
        })
          .then(({ data }) => {
            commit('setValueData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setValueData', error);
            reject(error);
          });
      });
    },
    patchValue({
      commit,
    }, {
      valueId,
      params,
    }) {
      commit('setValueData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `/values/${valueId}`,
          data: params,
        })
          .then(({ data }) => {
            commit('setValueData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setValueData', error);
            reject(error);
          });
      });
    },
  },
};
