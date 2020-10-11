export default class Base {
  static state() {
    return {
      data: null,
      meta: null,
      status: {
        loading: false,
        loaded: false,
        error: null,
      },
    };
  }

  static update(state, payload = null) {
    if (!payload) {
      state.data = null;
      state.meta = null;
      state.status.loading = true;
      state.status.loaded = false;
      state.status.error = null;
      return state;
    }

    if (payload instanceof Error) {
      state.data = null;
      state.meta = null;
      state.status.loading = false;
      state.status.loaded = true;
      state.status.error = payload;
      return state;
    }

    state.data = payload.data;
    state.meta = payload.meta || null;
    state.status.loading = false;
    state.status.loaded = true;
    state.status.error = null;
    return state;
  }
}
