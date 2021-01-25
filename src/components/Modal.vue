<template>
  <div v-if="modalVisible" class="modal" @click="$store.dispatch('closeModal')">
    <p>{{ modalInfo }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    
  }),
  computed: {
    ...mapGetters(['modalInfo', 'modalVisible'])
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    padding: 30px;
    position: fixed;
    right: 30px;
    top: 50px;
    z-index: 1000;

    border-radius: 3px;
    background-color: #009FFF;

    p {
      text-align: center;
      font-weight: 600;
      font-size: 18px;

      color: #fff;
    }
  }
</style>