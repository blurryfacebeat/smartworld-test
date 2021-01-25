<template>
  <div class="favorites">
    <div class="favorites__header">
      <h2>Ваши избранные города</h2>
      <select v-model="filters">
        <option value="По алфавиту А-Я">По алфавиту: А-Я</option>
        <option value="По алфавиту Я-А">По алфавиту: Я-А</option>
        <option value="По возрастанию">Дата: по возрастанию</option>
        <option value="По убыванию">Дата: по убыванию</option>
      </select>
    </div>
    <Loader v-if="loading" />
    <transition-group name="list" v-else class="favorites__items" tag="div">
      <p class="empty" v-if="!favoriteCities">Здесь пока пусто!</p>
      <div v-for="(city) in paginateCities" :key="city.name" class="favorites__item">
        <div class="favorites__item__wrapper">
          <div class="delete__item" @click="deleteFavoriteItem(city.id)">Удалить из избранного</div>
          <div class="favorites__item__info">
            <span class="favorites__item__info__city">{{ city.name }}</span>
            <span class="favorites__item__info__time">Время {{ city.time }}</span>
          </div>
          <div class="favorites__temperature">
            <span class="favorites__temperature__degree"><img src="~@/assets/icons/temperature.svg" alt="Температура">{{ city.temp }}°C</span>
            <div class="favorites__temperature__wrapper">
              <span class="favorites__temperature__description">{{ city.description }}</span>
              <span class="favorites__temperature__feels-like">Ощущается как {{ city.feels_like }}</span>
            </div>
          </div>
          <div class="favorites__additional">
            <div class="favorites__additional__wind">
              <img src="~@/assets/icons/wind.svg" alt="Ветер">
              <p class="wind-speed">{{ city.speed }} м/с,</p>
              <p class="wind-deg">{{ city.deg }}</p>
            </div>
            <div class="favorites__additional__pressure">
              <img src="~@/assets/icons/pressure.svg" alt="Давление">
              <p>{{ city.pressure }} мм. рт. ст.</p>
            </div>
            <div class="favorites__additional__humidity">
              <img src="~@/assets/icons/humidity.svg" alt="Влажность">
              <p>{{ city.humidity }} %</p>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <Paginate
      :page-count="pages"
      :click-handler="paginationHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: true,
    favoriteCities: [],
    filters: 'По алфавиту А-Я',
    pageNumber: 1,
    pageSize: 3,
  }),
  computed: {
    ...mapGetters(['favorites']),
    pages() {
      return Math.ceil(this.favoriteCities.length / this.pageSize);
    },
    paginateCities() {
      let from = (this.pageNumber - 1) * this.pageSize;
      let to = from + this.pageSize;
      return this.favoriteCities.slice(from, to);
    }
  },
  watch: {
    filters() {
      if (this.filters === 'По возрастанию') {
        this.favoriteCities.sort((a, b) => {
          return a.date - b.date;
        });
      } else if (this.filters === 'По убыванию') {
        this.favoriteCities.sort((a, b) => {
          return b.date - a.date;
        });
      } else if (this.filters === 'По алфавиту А-Я') {
        this.favoriteCities.sort((a, b) => {
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
      } else if (this.filters === 'По алфавиту Я-А') {
        this.favoriteCities.sort((a, b) => {
          let nameA = a.name.toLowerCase();
          let nameB = b.name.toLowerCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
      }
    }
  },
  methods: {
    ...mapActions(['fetchFavorites', 'deleteFavorite']),
    async deleteFavoriteItem(idx) {
      await this.deleteFavorite(idx)
        .then(() => {
          this.$store.dispatch('openModal', 'Город успешно удален из списка избранных.');
        })
        .catch(e => {
          this.$store.dispatch('openModal', 'При удалении города из списка избранных произошла ошибка.');
        });
      this.favoriteCities = this.favoriteCities.filter(c => c.id !== idx);
      this.fetchFavorites();
    },
    paginationHandler(pageNum) {
      this.pageNumber = pageNum;
    }
  },
  mounted() {
    this.fetchFavorites();
    this.favoriteCities = this.favorites; 
    this.loading = false;
  }
}
</script>

<style lang="scss">
  ul.pagination {
    margin-top: 15px;
    display: flex;
    align-items: center;

    li {
      margin-right: 10px;

      border-radius: 3px;
      transition: all 0.2s ease;

      &.active {
        background-color: #009FFF;
        color: #fff;
      }

      &.disabled {
        opacity: 0.7;
        cursor: none;

        a {
          cursor: default;

          &:hover {
            color: #222;
          }
        }
      }

      &:not(.active):hover {
        color: #009FFF;
      }
    }

    a {
      display: block;
      padding: 5px 10px;

      outline: none;
      transition: all 0.2s ease;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter {
    opacity: 0;
  }

  .list-leave-to {
    opacity: 0;
  }

  .favorites {
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
      margin-top: 30px;
    }

    &__item {
      width: 55%;
      padding: 30px 20px;

      color: #fff;
      font-weight: 600;

      background: linear-gradient(174deg, rgba(0,159,255,1) 0%, rgba(132,189,255,1) 100%);;
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &:not(:last-child) {
        margin-bottom: 30px;
      }

      &__info {
        display: flex;
        align-self: flex-end;

        &__city {
          margin-right: 30px;
        }
      }

      &__wrapper {
        position: relative;
        display: flex;
        flex-direction: column;

        .delete__item {
          position: absolute;
          left: 0px;
          top: -14px;
          padding: 8px 8px;
          
          font-size: 10px;
          color: #009FFF;

          cursor: pointer;
          background-color: #fff;
          border-radius: 3px;
          transition: all 0.2s ease;

          &:hover {
            opacity: 0.9;
          }

          &:active {
            transform: scale(0.98);
          }
        }

        .favorites__temperature {
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

        .favorites__additional {
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