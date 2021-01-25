export default {
  state: {
    modalInfo: '',
    modalVisible: false
  },
  mutations: {
    addInfo(state, info) {
      state.modalInfo = info;
    },
    visible(state, value) {
      state.modalVisible = value;
    }
  },
  actions: {
    openModal({ commit }, info) {
      commit('addInfo', info);
      commit('visible', true);

      setTimeout(() => {
        commit('visible', false);
      }, 3000);
    },
    closeModal({ commit }) {
      commit('visible', false);
    }
  },
  getters: {
    modalInfo: s => s.modalInfo,
    modalVisible: s => s.modalVisible
  }
}