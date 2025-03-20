<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="flare-title" style="text-align: left;padding-left:10px">年收入橄榄图</div>
<!--      <div ref="echart" class="echartDiv"></div>-->
      <img src="./img/guanl.png" style="width: 6.5vw;height: 18vh;margin-left: 9vw;margin-top: 2vh;"/>
    </div>
  </div>
</template>

<script lang="ts">

export default {

}
</script>

<style lang='scss' scoped>
#flareTarget {
  margin: 0px 10px;
}

.echartDiv {
  width: 100%;
  height: 22vh;
  padding-bottom: 1vh;
}

.flare-title {
  padding-left: 10px;
  color: #0498D1;
  background: linear-gradient(to right, rgba(11, 33, 145, 1), rgba(9, 56, 122, 1), rgba(10, 52, 110, 0));
  border-radius: 6px;
  margin-top: 1vh;
  height: 5vh;
  font-family: 'LiSu',serif;
  font-weight: bold;
  text-align: left !important;
  padding-top: 6px;
  font-size: 20px;
}
</style>