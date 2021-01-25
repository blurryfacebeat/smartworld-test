<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else class="main">
    <transition name="translate" mode="out-in">
      <Modal />
    </transition>
    <Header />
    <div class="main__wrapper">
      <transition name="translate" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from './components/Header.vue'
import Modal from './components/Modal.vue';

export default {
  data: () => ({
    loading: true,
    fetchInterval: null
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    Header,
    Modal
  },
  methods: {
    ...mapActions(['getUserCityWeather', 'updateInfo', 'fetchFavorites'])
  },
  async mounted() {
    await this.updateInfo();
    await this.getUserCityWeather(this.userInfo.city);
    await this.fetchFavorites();
    this.loading = false;
    this.fetchInterval = setInterval(() => {
      this.getUserCityWeather(this.userInfo.city);
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.fetchInterval);
  }
}
</script>

<style lang="scss">
  .translate-enter-active, .translate-leave-active {
    transition: all 0.5s ease;
  }

  .translate-enter {
    transform: translateX(-1000px);
    opacity: 0;
  }

  .translate-leave-to {
    transform: translateX(1000px);
    opacity: 0;
  }

  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 18px;
    color: #222;
    font-family: 'Source Sans Pro', sans-serif;

    background-color: #EBEDEE;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  .main {
    position: relative;
    overflow: hidden;

    &__wrapper {
      margin: 0 auto;
      max-width: 1140px;
      padding: 0 20px;
    }
  }
</style>