import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    value: Base.state(),
  },
  getters: {
    pages(state) {
      /** @var last_page */
      return state.values.meta?.last_page || 0;
    },
  },
  mutations: {
    setValue(state, payload) {
      state.value = Base.update(state.value, payload);
    },
  },
  actions: {
    fetchValue({
      commit,
    }, {
      valueId,
    }) {
      commit('setValue');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/values/${valueId}`,
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setValue', data);
            });
            resolve(data);
          })
          .catch((error) => {
            commit('setValue', error);
            reject(error);
          });
      });
    },
  },
};
