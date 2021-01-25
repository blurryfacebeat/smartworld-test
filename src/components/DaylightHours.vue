<template>
  <div class="daylight-hours">
    <h2 class="daylight-hours__title">Световой день</h2>
    <div class="daylight-hours__content">
      <div class="daylight-hours__content__wrapper">
        <div class="sunrise">Восход: {{ sunrise | moment("hh:mm") }}</div>
        <div class="daylight">Продолжительность: {{ daylight | moment("hh:mm") }}</div>
        <div class="sunset">Закат: {{ sunset | moment("hh:mm") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    sunrise: '',
    daylight: '',
    sunset: ''
  }),
  computed: {
    ...mapGetters(['userCityWeather'])
  },
  mounted() {
    this.daylight = new Date(this.userCityWeather.sunset - this.userCityWeather.sunrise);
    this.sunrise = new Date(this.userCityWeather.sunrise * 1000);
    this.sunset = new Date(this.userCityWeather.sunset * 1000);
  }
}
</script>

<style lang="scss" scoped>
  .daylight-hours {
    margin-top: 50px;

    &__title {
      margin-bottom: 20px;

      font-weight: 600;
      font-size: 22px;
    }

    &__content {
      width: 55%;
      padding: 30px 30px;

      color: #fff;
      font-size: 24px;
      font-weight: 600;

      background: linear-gradient(174deg, rgba(0,159,255,1) 0%, rgba(132,189,255,1) 100%);;
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &__wrapper {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>