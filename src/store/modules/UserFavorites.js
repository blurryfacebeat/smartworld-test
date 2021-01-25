import firebase from 'firebase/app';
import axios from 'axios';

export default {
  state: {
    favorites: [],
    fCities: []
  },
  mutations: {
    addfavoriteCities(state, arr) {
      state.fCities = arr;
    },
    addFavorite(state, favorite) {
      state.favorites = favorite;
    },
    removeFavorite(state, [favorite, idx]) {
      state.favorites.filter(e => e.id !== idx);
    }
  },
  actions: {
    async createFavorite({}, favorite) {
      try {
        return await firebase.database().ref('/cities').push(favorite);
      } catch (e) {
        this.$store.dispatch('openModal', 'Ошибка при добавлении в избранное');
      }
    },
    async deleteFavorite({ commit }, idx) {
      await firebase.database().ref('/cities').child(idx).remove();
    },
    async fetchFavorites({ commit }) {
      const data = [];
      const cities = [];
      await firebase.database().ref('/cities').once('value', city => {
        city.forEach(c => {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${c.val().name}&units=metric&lang=ru&appid=b4567897321840a3a80d27c3a4f51560`)
            .then(res => {
              let deg;

              if (res.data.wind.deg >= 0 && res.data.wind.deg < 45) {
                deg = 'Север';
              } else if (res.data.wind.deg >= 45 && res.data.wind.deg < 90) {
                deg = 'Северо-восток';
              } else if (res.data.wind.deg >= 90 && res.data.wind.deg < 135) {
                deg = 'Восток';
              } else if (res.data.wind.deg >= 135 && res.data.wind.deg < 180) {
                deg = 'Юго-восток';
              } else if (res.data.wind.deg >= 180 && res.data.wind.deg < 225) {
                deg = 'Юг';
              } else if (res.data.wind.deg >= 225 && res.data.wind.deg < 270) {
                deg = 'Юго-запад';
              } else if (res.data.wind.deg >= 270 && res.data.wind.deg < 315) {
                deg = 'Запад';
              } else if (res.data.wind.deg >= 315) {
                deg = 'Северо-запад';
              }
              axios.get(`http://api.geonames.org/timezoneJSON?lat=${res.data.coord.lat}&lng=${res.data.coord.lon}&username=blurryfacetest`)
                .then(response => {
                  let time = response.data.time.split(' ');
                  cities.push(c.val().name);
                  data.push({
                    id: c.key,
                    name: c.val().name, 
                    date: c.val().date,
                    feels_like: Math.round(res.data.main.feels_like),
                    humidity: Math.round(res.data.main.humidity),
                    pressure: Math.round(res.data.main.pressure),
                    temp: Math.round(res.data.main.temp),
                    temp_max: Math.round(res.data.main.temp_max),
                    temp_min: Math.round(res.data.main.temp_min),
                    description: res.data.weather[0].description[0].toUpperCase() + res.data.weather[0].description.slice(1),
                    speed: res.data.wind.speed,
                    deg,
                    time: time[1]
                  });

                  data.sort((a, b) => {
                    let nameA = a.name.toLowerCase();
                    let nameB = b.name.toLowerCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
                })
                .catch(e => {
                  cities.push(c.val().name);
                  data.push({
                    id: c.key,
                    name: c.val().name, 
                    date: c.val().date,
                    feels_like: Math.round(res.data.main.feels_like),
                    humidity: Math.round(res.data.main.humidity),
                    pressure: Math.round(res.data.main.pressure),
                    temp: Math.round(res.data.main.temp),
                    temp_max: Math.round(res.data.main.temp_max),
                    temp_min: Math.round(res.data.main.temp_min),
                    description: res.data.weather[0].description[0].toUpperCase() + res.data.weather[0].description.slice(1),
                    speed: res.data.wind.speed,
                    deg
                  });
                  this.$store.dispatch('openModal', 'Ошибка при загрузки времени израбнного города.');
                  data.sort((a, b) => {
                    let nameA = a.name.toLowerCase();
                    let nameB = b.name.toLowerCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
                });
            });
        });
      });
      commit('addfavoriteCities', cities);
      commit('addFavorite', data);
    }
  },
  getters: {
    favorites: s => s.favorites,
    fCities: s => s.fCities
  }
}