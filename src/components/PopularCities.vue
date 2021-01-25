<template>
  <div class="popular-cities">
    <h2 class="popular-cities__title">Популярные города {{ userInfo.country }}</h2>
    <LoaderMini v-if="loading" />
    <div v-else class="popular-cities__items">
      <router-link class="popular-cities__items__item" v-for="c in cities" :key="c" :to="`/city/${c}`">{{ c }}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: true,
    cities: []
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['getCities'])
  },
  async mounted() {
    await axios.get(`
      http://geohelper.info/api/v1/cities?apiKey=DsUzhCX9wDO44UcnTaj3nXUcTS9H2RqI&locale[lang]=ru&locale[fallbackLang]=en&order[by]=population&order[dir]=desc&filter[countryIso]=${this.userInfo.country_iso_code}
    `)
      .then(res => {
        res.data.result.forEach(el => {
          this.cities.push(el.name);
        })
        this.loading = false;
      })
      .catch(e => {
        this.$store.dispatch('openModal', 'Ошибка при получении крупнейших городов');
      });
  }
}
</script>

<style lang="scss" scoped>
  .popular-cities {
    margin-top: 50px;

    &__title {
      margin-bottom: 20px;

      font-weight: 600;
      font-size: 22px;
    }

    &__items {
      width: 700px;
      padding: 20px 30px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      background: linear-gradient(174deg, rgba(0,159,255,1) 0%, rgba(132,189,255,1) 100%);
      
      &__item {
        padding-bottom: 2px;
        margin-bottom: 10px;
        
        &:not(:last-child) {
          margin-right: 15px;
        }

        font-weight: 600;
        color: #fff;
        border-bottom: 1px solid transparent;
        transition: all 0.2s ease;

        &:hover {
          border-color: #fff;
        }
      }
    }
  }
</style>