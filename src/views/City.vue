<template>
  <div class="city">
    <h2>Страница прогноза погоды для города {{ $route.params.name }}</h2>
  </div>
</template>

<script>

export default {
  mounted() {
    window.document.title = `Погода в городе ${this.$route.params.name}`;
  }
}
</script>

<style lang="scss" scoped>
  .city {
    h2 {
      margin-top: 50px;
      font-size: 32px;
    }
  }
</style>