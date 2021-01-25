import axios from 'axios';

export default {
  state: {
    cityWeather: {
      feels_like: '---',
      humidity: '---',
      pressure: '---',
      temp: '---',
      temp_max: '---',
      temp_min: '---',
      description: '---',
      deg: '---',
      speed: '---'
    },
    userCityWeather: {
      feels_like: '---',
      humidity: '---',
      pressure: '---',
      temp: '---',
      temp_max: '---',
      temp_min: '---',
      description: '---',
      deg: '---',
      speed: '---',
      sunrise: '---',
      sunset: '---'
    }
  },
  mutations: {
    setCityWeather(state, weather) {
      state.cityWeather.feels_like = Math.round(weather.main.feels_like);
      state.cityWeather.humidity = Math.round(weather.main.humidity);
      state.cityWeather.pressure = Math.round(weather.main.pressure);
      state.cityWeather.temp = Math.round(weather.main.temp);
      state.cityWeather.temp_max = Math.round(weather.main.temp_max);
      state.cityWeather.temp_min = Math.round(weather.main.temp_min);
      state.cityWeather.description = weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1);
      state.cityWeather.speed = weather.wind.speed;
      if (weather.wind.deg >= 0 && weather.wind.deg < 45) {
        state.cityWeather.deg = 'Север';
      } else if (weather.wind.deg >= 45 && weather.wind.deg < 90) {
        state.cityWeather.deg = 'Северо-восток';
      } else if (weather.wind.deg >= 90 && weather.wind.deg < 135) {
        state.cityWeather.deg = 'Восток';
      } else if (weather.wind.deg >= 135 && weather.wind.deg < 180) {
        state.cityWeather.deg = 'Юго-восток';
      } else if (weather.wind.deg >= 180 && weather.wind.deg < 225) {
        state.cityWeather.deg = 'Юг';
      } else if (weather.wind.deg >= 225 && weather.wind.deg < 270) {
        state.cityWeather.deg = 'Юго-запад';
      } else if (weather.wind.deg >= 270 && weather.wind.deg < 315) {
        state.cityWeather.deg = 'Запад';
      } else if (weather.wind.deg >= 315) {
        state.cityWeather.deg = 'Северо-запад';
      }
    },
    setUserCityWeather(state, weather) {
      state.userCityWeather.feels_like = Math.round(weather.main.feels_like);
      state.userCityWeather.humidity = Math.round(weather.main.humidity);
      state.userCityWeather.pressure = Math.round(weather.main.pressure);
      state.userCityWeather.temp = Math.round(weather.main.temp);
      state.userCityWeather.temp_max = Math.round(weather.main.temp_max);
      state.userCityWeather.temp_min = Math.round(weather.main.temp_min);
      state.userCityWeather.description = weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1);
      state.userCityWeather.speed = weather.wind.speed;
      state.userCityWeather.sunrise = weather.sys.sunrise;
      state.userCityWeather.sunset = weather.sys.sunset;
      if (weather.wind.deg >= 0 && weather.wind.deg < 45) {
        state.userCityWeather.deg = 'Север';
      } else if (weather.wind.deg >= 45 && weather.wind.deg < 90) {
        state.userCityWeather.deg = 'Северо-восток';
      } else if (weather.wind.deg >= 90 && weather.wind.deg < 135) {
        state.userCityWeather.deg = 'Восток';
      } else if (weather.wind.deg >= 135 && weather.wind.deg < 180) {
        state.userCityWeather.deg = 'Юго-восток';
      } else if (weather.wind.deg >= 180 && weather.wind.deg < 225) {
        state.userCityWeather.deg = 'Юг';
      } else if (weather.wind.deg >= 225 && weather.wind.deg < 270) {
        state.userCityWeather.deg = 'Юго-запад';
      } else if (weather.wind.deg >= 270 && weather.wind.deg < 315) {
        state.userCityWeather.deg = 'Запад';
      } else if (weather.wind.deg >= 315) {
        state.userCityWeather.deg = 'Северо-запад';
      }
    }
  },
  actions: {
    async getCityWeather({ commit }, city) {
      const apiKey = 'b4567897321840a3a80d27c3a4f51560';
      
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`)
        .then(res => {
          commit('setCityWeather', res.data);
        })
        .catch(e => {
          this.$store.dispatch('openModal', 'Такого города не существует.');
        });
    },
    async getUserCityWeather({ commit }, city) {
      const apiKey = 'b4567897321840a3a80d27c3a4f51560';
      
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`)
        .then(res => {
          commit('setUserCityWeather', res.data);
        })
        .catch(e => {
          this.$store.dispatch('openModal', 'Ошибка при получении погоды в вашем городе');
        });
    }
  },
  getters: {
    cityWeather: s => s.cityWeather,
    userCityWeather: s => s.userCityWeather
  }
}