<template>
  <div class="weather-now">
    <div class="weather-now__title">
      <h2>Погода в вашем городе.</h2>
      <h2>Текущее время {{ time | moment("hh:mm:ss") }}</h2>
    </div>
    <div class="weather-now__content">
      <LoaderMini v-if="loading" />
      <div v-else class="weather-now__content__wrapper">
        <div class="weather-now__temperature">
          <span class="weather-now__temperature__degree"><img src="~@/assets/icons/temperature.svg" alt="Температура">{{ userCityWeather.temp }}°C</span>
          <div class="weather-now__temperature__wrapper">
            <span class="weather-now__temperature__description">{{ userCityWeather.description }}</span>
            <span class="weather-now__temperature__feels-like">Ощущается как {{ userCityWeather.feels_like }}</span>
          </div>
        </div>
        <div class="weather-now__additional">
          <div class="weather-now__additional__wind">
            <img src="~@/assets/icons/wind.svg" alt="Ветер">
            <p class="wind-speed">{{ userCityWeather.speed }} м/с,</p>
            <p class="wind-deg">{{ userCityWeather.deg }}</p>
          </div>
          <div class="weather-now__additional__pressure">
            <img src="~@/assets/icons/pressure.svg" alt="Давление">
            <p>{{ userCityWeather.pressure }} мм. рт. ст.</p>
          </div>
          <div class="weather-now__additional__humidity">
            <img src="~@/assets/icons/humidity.svg" alt="Влажность">
            <p>{{ userCityWeather.humidity }} %</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    loading: true,
    city: 'Москва',
    city_search: '',
    time: '',
    timeInterval: null,
    fetchInterval: null
  }),
  computed: {
    ...mapGetters(['userInfo', 'userCityWeather'])
  },
  methods: {
  },
  async mounted() {
    this.time = new Date().toLocaleTimeString();
    this.timeInterval = setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000)
    this.loading = false;

  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  }
}
</script>

<style lang="scss" scoped>
  .weather-now {
    margin-top: 50px;

    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        margin-right: 10px;

        font-weight: 600;
        font-size: 22px;
      }
    }

    &__content {
      width: 55%;
      padding: 30px 20px;

      color: #fff;
      font-weight: 600;

      background: linear-gradient(174deg, rgba(0,159,255,1) 0%, rgba(132,189,255,1) 100%);;
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &__wrapper {
        display: flex;
        flex-direction: column;

        .weather-now__temperature {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          margin-bottom: 20px;

          border-bottom: 1px solid #fff;

          &__degree {
            display: flex;
            align-items: center;
            margin-right: 30px;

            font-size: 48px;

            img {
              width: 45px;
              height: 45px;
            }
          }

          &__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;

            font-size: 16px;
          }

          &__description {
            margin-bottom: 5px;
          }
        }

        .weather-now__additional {
          display: flex;
          align-items: center;  

          &__wind {
            display: flex;
            align-items: center;
            margin-right: 30px;

            img {
              margin-right: 10px;
            }

            .wind-speed {
              margin-right: 10px;
            }
          }

          &__pressure {
            display: flex;
            align-items: center;
            margin-right: 30px;

            img {
              margin-right: 10px;
            }
          }

          &__humidity {
            display: flex;
            align-items: center;

            img {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>