<template>
  <div>
    <div class="loader" id="loader-4">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loader{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    position: relative;
    margin: 0 auto;
  }
  #loader-4 span{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #fff;
  margin: 35px 5px;
  opacity: 0;
}

#loader-4 span:nth-child(1){
  animation: opacitychange 1s ease-in-out infinite;
}

#loader-4 span:nth-child(2){
  animation: opacitychange 1s ease-in-out 0.33s infinite;
}

#loader-4 span:nth-child(3){
  animation: opacitychange 1s ease-in-out 0.66s infinite;
}

@keyframes opacitychange{
  0%, 100%{
    opacity: 0;
  }

  60%{
    opacity: 1;
  }
}
</style>