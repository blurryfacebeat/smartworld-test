import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueConfig from 'vue-config'
import VueMoment from 'vue-moment';
import firebase from 'firebase/app';
import 'firebase/database';
import Paginate from 'vuejs-paginate';

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from '@/components/Loader';
import LoaderMini from '@/components/LoaderMini';

const configs = {
  test: 'ESKETIT'
};

Vue.use(VueAxios, axios);
Vue.use(vueConfig, configs);
Vue.use(VueMoment);

Vue.component('Loader', Loader);
Vue.component('LoaderMini', LoaderMini);
Vue.component('Paginate', Paginate);

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyBi_9CgRM1guKNUXjofQBUfiZ1R1y7y70U",
  authDomain: "smart-test-89410.firebaseapp.com",
  databaseURL: "https://smart-test-89410-default-rtdb.firebaseio.com",
  projectId: "smart-test-89410",
  storageBucket: "smart-test-89410.appspot.com",
  messagingSenderId: "414158851926",
  appId: "1:414158851926:web:7d1ccef55d6487dfe990f7"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
