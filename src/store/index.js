import Vue from 'vue'
import Vuex from 'vuex'

import UserLocation from '@/store/modules/UserLocation';
import Weather from '@/store/modules/Weather';
import UserFavorites from '@/store/modules/UserFavorites';
import Modal from '@/store/modules/Modal';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    UserLocation, Weather, UserFavorites, Modal
  }
})
