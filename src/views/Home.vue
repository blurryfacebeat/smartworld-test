<template>
  <div class="home">
    <CityWeather />
    <WeatherNow />
    <TenDays />
    <PopularCities />
    <DaylightHours />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CityWeather from '../components/CityWeather.vue'
import WeatherNow from '../components/WeatherNow.vue'
import TenDays from '@/components/TenDays.vue'
import PopularCities from '../components/PopularCities.vue'
import DaylightHours from '../components/DaylightHours.vue'

export default {
  components: { CityWeather, WeatherNow, TenDays, PopularCities, DaylightHours },
  data: () => ({

  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
  .home {
    &__city-weather {
      margin-top: 30px;

      h2 {
        font-weight: 600;
        font-size: 22px;
      }
    }
  }
</style>