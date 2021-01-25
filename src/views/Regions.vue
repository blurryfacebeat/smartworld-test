<template>
  <Loader v-if="loading" />
  <div v-else class="regions">
    <div class="regions__header">
      <h2>Мой регион: {{ `${userInfo.region} ${userInfo.region_type_full}` }}</h2>
      <select v-model="regionName" @change="fetchCitiesByRegion">
        <option value="default" disabled selected>Изменить регион</option>
        <option v-for="region in regions" :key="region.id" :value="region">{{ region.name }}</option>
      </select>
    </div>
    <Loader v-if="loadingCities" />
    <div v-else class="regions__items">
      <router-link v-for="(c, idx) in cities" :key="c + '_' + idx" class="regions__item" :to="`/city/${c}`">{{ c }}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    loadingCities: true,
    loading: true,
    regions: [],
    regionName: 'default',
    cities: []
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    fetchCitiesByRegion() {
      this.loadingCities = true;
      axios.get(`
        http://geohelper.info/api/v1/cities?apiKey=DsUzhCX9wDO44UcnTaj3nXUcTS9H2RqI&locale[lang]=ru&locale[fallbackLang]=en&order[by]=population&pagination[limit]=100&order[dir]=desc&filter[regionId]=${this.regionName.id}
      `)
        .then(res => {
          const arr = [];
          res.data.result.forEach(el => {
            arr.push(el.name);
          });
          this.cities = arr;
          window.document.title = `Погода в регионе ${this.regionName.name}`;
          this.loadingCities = false;
        })
        .catch(e => {
          this.$store.dispatch('openModal', 'Ошибка при загрузке городов региона.');
          this.loadingCities = false;
        });
    }
  },
  mounted() {
    axios.get(`http://geohelper.info/api/v1/regions?apiKey=DsUzhCX9wDO44UcnTaj3nXUcTS9H2RqI&locale[lang]=ru&pagination[limit]=100&filter[countryIso]=${this.userInfo.country_iso_code}`)
      .then(res => {
        res.data.result.forEach(el => {
          this.regions.push({name: el.name, id: el.id});
        });
      })
      .catch(e => {
        this.$store.dispatch('openModal', 'Ошибка при загрузке регионов.');
      });
    
    axios.get(`
      http://geohelper.info/api/v1/cities?apiKey=DsUzhCX9wDO44UcnTaj3nXUcTS9H2RqI&locale[lang]=ru&locale[fallbackLang]=en&order[by]=population&pagination[limit]=100&order[dir]=desc&filter[regionCodes][iso]=${this.userInfo.region_iso_code}
    `)
      .then(res => {
        const arr = [];
        res.data.result.forEach(el => {
          arr.push(el.name);
        });
        this.cities = arr;
        this.loading = false;
        this.loadingCities = false;
      })
      .catch(e => {
        this.$store.dispatch('openModal', 'Ошибка при получении городов региона по геолокации пользователя.');
        this.loading = false;
        this.loadingCities = false;
      });
  }
}
</script>

<style lang="scss" scoped>
  .regions {
    &__header {
      margin-top: 30px;
      display: flex;
      align-items: center;

      h2 {
        margin-right: 50px;
        font-size: 32px;
      }

      select {
        padding: 4px;

        font-family: inherit;
        font-size: 14px;
        font-weight: 600;

        border: 1px solid rgb(161, 161, 161);
        border-radius: 3px;
        outline: none;
        transition: all 0.2s ease;

        &:focus {
          border-color: #009FFF;
        }
      }
    }

    &__items {
      padding: 30px;
      padding-bottom: 20px;
      margin-top: 30px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      background-color: #009FFF;
      box-shadow: 2px 5px 5px 3px rgba(0, 0, 0, 0.2);
      border-radius: 5px;

      .regions__item {
        padding-bottom: 3px;
        margin-bottom: 10px;
        margin-right: 20px;

        color: #fff;
        font-weight: 600;
        font-size: 18px;

        transition: all 0.2s ease;
        border-bottom: 1px solid transparent;

        &:hover {
          border-color: #fff;
        }
      }
    }
  }
</style>