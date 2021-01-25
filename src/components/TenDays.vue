<template>
  <div class="ten-days">
    <div class="ten-days__title">
      <h2>Прогноз на 10 дней</h2>
    </div>
    <carousel :dots="false" :nav="false" :items="2">
      <div v-for="w of weather" :key="w.day" class="ten-days__item">
        <LoaderMini v-if="loading" />
        <div v-else class="ten-days__item__wrapper">
          <span class="ten-days__day">{{ w.day }}</span>
          <div class="ten-days__temperature">
            <span class="ten-days__temperature__degree"><img src="~@/assets/icons/temperature.svg" alt="Температура">{{ w.temp }}°C</span>
            <div class="ten-days__temperature__wrapper">
              <span class="ten-days__temperature__description">{{ w.description }}</span>
              <span class="ten-days__temperature__feels-like">Ощущается как {{ w.feels_like }}</span>
            </div>
          </div>
          <div class="ten-days__additional">
            <div class="ten-days__additional__wind">
              <img src="~@/assets/icons/wind.svg" alt="Ветер">
              <p class="wind-speed">{{ w.speed }} м/с,</p>
              <p class="wind-deg">{{ w.deg }}</p>
            </div>
            <div class="ten-days__additional__pressure">
              <img src="~@/assets/icons/pressure.svg" alt="Давление">
              <p>{{ w.pressure }} мм. рт. ст.</p>
            </div>
            <div class="ten-days__additional__humidity">
              <img src="~@/assets/icons/humidity.svg" alt="Влажность">
              <p>{{ w.humidity }} %</p>
            </div>
          </div>
        </div>
      </div>
    </carousel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import carousel from 'vue-owl-carousel';

export default {
  data: () => ({
    loading: true,
    days: [
      'Вчера',
      'Сегодня',
      'Завтра',
      'Послезавтра',
      'Через 3 дня',
      'Через 4 дня',
      'Через 5 дней',
      'Через 6 дней',
      'Через 7 дней',
      'Через 8 дней'
    ],
    weather: [
      {
        day: 'Вчера',
        temp: '-18',
        description: 'Солнечно',
        feels_like: '-20',
        speed: '3',
        deg: '135',
        pressure: '2078',
        humidity: '35'
      },
      {
        day: 'Сегодня',
        temp: '-18',
        description: 'Солнечно',
        feels_like: '-20',
        speed: '3',
        deg: '135',
        pressure: '2078',
        humidity: '35'
      },
      {
        day: 'Завтра',
        temp: '-35',
        description: 'Туманно',
        feels_like: '-40',
        speed: '6',
        deg: '148',
        pressure: '1009',
        humidity: '76'
      },
      {
        day: 'Послезавтра',
        temp: '-11',
        description: 'Небольшой снег',
        feels_like: '-23',
        speed: '2',
        deg: '152',
        pressure: '2148',
        humidity: '56'
      },
      {
        day: 'Через 3 дня',
        temp: '-33',
        description: 'Туманно',
        feels_like: '-34',
        speed: '1',
        deg: '125',
        pressure: '1999',
        humidity: '99'
      },
      {
        day: 'Через 4 дня',
        temp: '-18',
        description: 'Солнечно',
        feels_like: '-20',
        speed: '3',
        deg: '135',
        pressure: '2078',
        humidity: '35'
      },
      {
        day: 'Через 5 дней',
        temp: '-34',
        description: 'Дождливо',
        feels_like: '-54',
        speed: '3',
        deg: '135',
        pressure: '2048',
        humidity: '78'
      },
      {
        day: 'Через 6 дней',
        temp: '-18',
        description: 'Солнечно',
        feels_like: '-20',
        speed: '3',
        deg: '135',
        pressure: '2078',
        humidity: '35'
      },
      {
        day: 'Через 7 дней',
        temp: '-23',
        description: 'Солнечно',
        feels_like: '-53',
        speed: '3',
        deg: '155',
        pressure: '1518',
        humidity: '55'
      },
      {
        day: 'Через 8 дней',
        temp: '-53',
        description: 'Мелкие осадки',
        feels_like: '-53',
        speed: '3',
        deg: '135',
        pressure: '1278',
        humidity: '26'
      }
    ]
  }),
  components: {
    carousel
  },
  computed: {
    ...mapGetters(['userInfo', 'userCityWeather'])
  },
  methods: {
    ...mapActions(['getUserCityWeather']),
  },
  async mounted() {
    await this.getUserCityWeather(this.userInfo.city);
    this.weather = [
      {
        day: 'Вчера',
        temp: '-18',
        description: 'Солнечно',
        feels_like: '-20',
        speed: '3',
        deg: '135',
        pressure: '2078',
        humidity: '35'
      },
      {
        day: 'Сегодня',
        temp: this.userCityWeather.temp,
        description: this.userCityWeather.description,
        feels_like: this.userCityWeather.feels_like,
        speed: this.userCityWeather.speed,
        deg: this.userCityWeather.deg,
        pressure: this.userCityWeather.pressure,
        humidity: this.userCityWeather.humidity
      },
      {
        day: 'Завтра',
        temp: '-35',
        description: 'Небольшой снег',
        feels_like: '-40',
        speed: '6',
        deg: '148',
        pressure: '1009',
        humidity: '76'
      },
      {
        day: 'Послезавтра',
        temp: '-11',
        description: 'Ясно',
        feels_like: '-23',
        speed: '2',
        deg: '152',
        pressure: '2148',
        humidity: '56'
      },
      {
        day: 'Через 3 дня',
        temp: '-33',
        description: 'Туманно',
        feels_like: '-34',
        speed: '1',
        deg: '125',
        pressure: '1999',
        humidity: '99'
      },
      {
        day: 'Через 4 дня',
        temp: '-18',
        description: 'Солнечно',
        feels_like: '-20',
        speed: '3',
        deg: '135',
        pressure: '2078',
        humidity: '35'
      },
      {
        day: 'Через 5 дней',
        temp: '-34',
        description: 'Дождливо',
        feels_like: '-54',
        speed: '3',
        deg: '135',
        pressure: '2048',
        humidity: '78'
      },
      {
        day: 'Через 6 дней',
        temp: '-18',
        description: 'Солнечно',
        feels_like: '-20',
        speed: '3',
        deg: '135',
        pressure: '2078',
        humidity: '35'
      },
      {
        day: 'Через 7 дней',
        temp: '-23',
        description: 'Солнечно',
        feels_like: '-53',
        speed: '3',
        deg: '155',
        pressure: '1518',
        humidity: '55'
      },
      {
        day: 'Через 8 дней',
        temp: '-53',
        description: 'Мелкие осадки',
        feels_like: '-53',
        speed: '3',
        deg: '135',
        pressure: '1278',
        humidity: '26'
      }
    ];
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
  .ten-days {
    margin-top: 50px;

    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        font-weight: 600;
        font-size: 22px;
      }
    }

    &__item {
      padding: 30px 20px;
      margin-right: 30px;

      color: #fff;
      font-weight: 600;

      background: linear-gradient(174deg, rgba(0,159,255,1) 0%, rgba(132,189,255,1) 100%);;
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &__wrapper {
        display: flex;
        flex-direction: column;

        .ten-days__day {
          margin-bottom: 7px;
        }

        .ten-days__temperature {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          margin-bottom: 20px;

          border-bottom: 1px solid #fff;

          &__degree {
            display: flex;
            align-items: center;
            margin-right: 20px;

            font-size: 32px;

            img {
              width: 30px;
              height: 30px;
            }
          }

          &__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;

            font-size: 14px;
          }

          &__description {
            margin-bottom: 5px;
          }
        }

        .ten-days__additional {
          display: flex;
          align-items: center;

          font-size: 16px;

          &__wind {
            display: flex;
            align-items: center;
            margin-right: 30px;

            img {
              width: 24px;
              height: 24px;
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
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }

          &__humidity {
            display: flex;
            align-items: center;

            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>