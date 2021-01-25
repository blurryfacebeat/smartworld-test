import axios from "axios";

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    }
  },
  actions: {
    async updateInfo({ commit }) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + "ae067d8445ea95bef43e94ac3c490b3567e24bf4"
        }
      }

      let userIP = '';
      await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=65e23b3db8304be29802e9cc14628152`)
        .then(res => {
          userIP = res.data.ip_address;
        })
        .catch(e => {
          this.$store.dispatch('openModal', 'Ошибка при получении IP пользователя.');
        });

      await axios.get(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${userIP}`, options)
        .then(res => {
          commit('setUserInfo', res.data.location.data);
        })
        .catch(e => {
          this.$store.dispatch('openModal', 'Ошибка при получении геолокации пользователя.');
        });
    }
  },
  getters: {
    userInfo: s => s.userInfo
  }
}