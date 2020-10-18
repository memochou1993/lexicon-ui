export default class Base {
  /**
   * @property meta.current_page
   * @property meta.from
   * @property meta.last_page
   * @property meta.per_page
   * @property meta.to
   * @property meta.total
   */
  static state() {
    return {
      data: null,
      meta: null,
      error: null,
      status: {
        loading: false,
        loaded: false,
      },
    };
  }

  static update(state, payload = null) {
    if (!payload) {
      state.data = null;
      state.meta = null;
      state.error = null;
      state.status.loading = true;
      state.status.loaded = false;
      return state;
    }

    if (payload instanceof Error) {
      state.data = null;
      state.meta = null;
      state.error = payload;
      state.status.loading = false;
      state.status.loaded = true;
      return state;
    }

    state.data = payload.data;
    state.meta = payload.meta || null;
    state.error = null;
    state.status.loading = false;
    state.status.loaded = true;
    return state;
  }
}
