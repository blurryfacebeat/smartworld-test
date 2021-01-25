<template>
  <div class="header">
    <div class="header__wrapper">
      <router-link to="/" class="header__logo">Weather<span>Tracker</span></router-link>
      <nav class="header__nav">
        <ul>
          <li><router-link exact :active-class="'active_link'" to="/">Главная</router-link></li>
          <li><router-link :active-class="'active_link'" to="/ten_days">Прогноз на 10 дней</router-link></li>
          <li><router-link :active-class="'active_link'" to="/month">Прогноз на месяц</router-link></li>
          <li><router-link :active-class="'active_link'" to="/favorites">Избранное</router-link></li>
          <li><router-link :active-class="'active_link'" to="/regions">Города региона</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
  .header {
    background-color: #fff;

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      max-width: 1140px;
      padding: 30px 20px;
    }

    &__logo {
      font-weight: 600;
      font-size: 32px;

      cursor: pointer;
      transition: color 0.2s ease;

      span {
        color: #009FFF;

        transition: color 0.2s ease;
      }

      &:hover {
        color: rgb(255, 89, 89);

        span {
          color: rgb(255, 89, 89);
        }
      }
    }

    &__nav {
      ul {
        display: flex;

        li {
          &:not(:last-child) {
            margin-right: 20px;
          }

          a {
            padding-bottom: 7px;
            position: relative;

            transition: all 0.2s ease;

            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              right: 0;
              left: auto;
              width: 0;
              height: 2px;
              
              background-color: #009fff;
              transition: all 0.3s ease;
            }

            &:hover {
              color: #009FFF;

              &::after {
                width: 100%;
                left: 0;
                right: auto;
              }
            }

            &.active_link {
              &::after {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>