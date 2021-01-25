<template>
  <LoaderMini v-if="loading" />
  <div v-else class="city-weather">
    <div class="city-weather__title">
      <h2>Погода в городе {{ city }}</h2>
      <button class="to-favorite" @click.prevent="addFavorite(city)" v-if="!fCities.includes(city)">Добавить в избранное</button>
      <form @submit.prevent="getWeather">
        <input type="text" placeholder="Введите название города" v-model.trim="city_search">
        <button>Найти</button>
      </form>
    </div>
    <div class="city-weather__content">
      <div class="city-weather__content__wrapper">
        <div class="city-weather__temperature">
          <span class="city-weather__temperature__degree"><img src="~@/assets/icons/temperature.svg" alt="Температура">{{ cityWeather.temp }}°C</span>
          <div class="city-weather__temperature__wrapper">
            <span class="city-weather__temperature__description">{{ cityWeather.description }}</span>
            <span class="city-weather__temperature__feels-like">Ощущается как {{ cityWeather.feels_like }}</span>
          </div>
        </div>
        <div class="city-weather__additional">
          <div class="city-weather__additional__wind">
            <img src="~@/assets/icons/wind.svg" alt="Ветер">
            <p class="wind-speed">{{ cityWeather.speed }} м/с,</p>
            <p class="wind-deg">{{ cityWeather.deg }}</p>
          </div>
          <div class="city-weather__additional__pressure">
            <img src="~@/assets/icons/pressure.svg" alt="Давление">
            <p>{{ cityWeather.pressure }} мм. рт. ст.</p>
          </div>
          <div class="city-weather__additional__humidity">
            <img src="~@/assets/icons/humidity.svg" alt="Влажность">
            <p>{{ cityWeather.humidity }} %</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    loading: true,
    city: 'Москва',
    city_search: ''
  }),
  computed: {
    ...mapGetters(['cityWeather', 'fCities'])
  },
  methods: {
    ...mapActions(['getCityWeather', 'createFavorite', 'fetchFavorites']),
    async getWeather() {
      if (this.city_search === '') {
        this.$store.dispatch('openModal', 'Сначала заполните поле.');
      } else if (this.city.toLowerCase() !== this.city_search.toLowerCase()) {
        this.loading = true;
        this.city_search = this.city_search[0].toUpperCase() + this.city_search.slice(1);
        await this.getCityWeather(this.city_search)
          .then(() => {
            this.city = this.city_search;
            this.city_search = '';
            this.loading = false;
          })
          .catch(e => {
            this.$store.dispatch('openModal', 'Такого города не существует.');
            this.loading = false;
          });
      } else {
        this.$store.dispatch('openModal', 'Погода по данному городу уже отображена.');
      }
    },
    async addFavorite(item) {
      const date = new Date().getTime();
      this.createFavorite({name: item, date});
      await this.fetchFavorites();
      this.$store.dispatch('openModal', 'Город успешно добавлен в избранное.');
      this.favoriteCities.push(item);
    }
  },
  async mounted() {
    await this.getCityWeather(this.city);
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
  .city-weather {
    margin-top: 30px;

    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        margin-right: 10px;

        font-weight: 600;
        font-size: 22px;
      }

      .to-favorite {
        margin-right: 50px;
        height: 30px;
        width: 150px;
        
        color: #fff;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;

        background-color: #009FFF;
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 3px;
        transition: all 0.2s ease;

        &:hover {
          background-color: rgb(255, 89, 89);
        }

        &:active {
          transform: scale(0.98);
        }
      }

      form {
        display: flex;
        align-items: center;

        input {
          padding-bottom: 5px;
          margin-right: 20px;

          font-family: inherit;
          color: inherit;
          font-size: 14px;
          font-weight: 600;

          border: none;
          border-bottom: 1px solid #222;
          outline: none;
          background-color: transparent;
          transition: all 0.2s ease;

          &:focus {
            border-color: #009FFF;
          }
        }

        button {
          height: 30px;
          width: 100px;
          
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;

          background-color: #009FFF;
          cursor: pointer;
          border: none;
          outline: none;
          border-radius: 3px;
          transition: all 0.2s ease;

          &:hover {
            background-color: rgb(255, 89, 89);
          }

          &:active {
            transform: scale(0.98);
          }
        }
      }
    }

    &__content {
      width: 55%;
      padding: 30px 20px;

      color: #fff;
      font-weight: 600;

      background: linear-gradient(174deg, rgba(0,159,255,1) 0%, rgba(132,189,255,1) 100%);
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &__wrapper {
        display: flex;
        flex-direction: column;

        .city-weather__temperature {
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

        .city-weather__additional {
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