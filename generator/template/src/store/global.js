export default {
  namespaced: true,

  state: {
    loading: {}
  },

  actions: {
  },

  mutations: {
    saveLoading(state, payload) {
      state.loading = {
        ...state.loading,
        ...payload
      }
    },
  },

}
