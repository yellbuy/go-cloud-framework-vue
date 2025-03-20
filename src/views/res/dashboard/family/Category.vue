<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">家庭年收入增长趋势</div>
      </div>
      <!--      <div ref="echart" class="echartDiv"></div>-->
      <img src="./img/category.png" style="width: 18vw;height: 18vh;margin-left: 2vw;margin-top: 2vh;"/>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  setup() {
  },
}
</script>

<style lang='scss' scoped>
#flareTarget {
  margin: 0px 10px;
}

.echartDiv {
  width: 100%;
  height: 25vh;
  padding-bottom: 1vh;
}
</style>