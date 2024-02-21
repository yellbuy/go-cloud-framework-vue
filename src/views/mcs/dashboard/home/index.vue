<template>
  <div>
    <div id="data-view">
      <dv-full-screen-container>
        <top-header />

        <div class="main-content">
          <digital-flop />

          <div class="block-left-right-content">
            <div class="block-top-bottom-content">
              <div class="block-top-content">
                <ranking-board />

                <rose-chart />

                <water-level-chart />
              </div>

              <cards />
            </div>
            <div class="block-left-content">
              <scroll-board />
              <scroll-board-amount />
            </div>
          </div>
        </div>
      </dv-full-screen-container>
    </div>
  </div>
</template>

<script>
import cards from "./cards.vue";
import digitalFlop from "./digitalFlop.vue";
import rankingBoard from "./rankingBoard.vue";
import roseChart from "./roseChart.vue";
import scrollBoard from "./scrollBoard.vue";
import scrollBoardAmount from "./scrollBoardAmount.vue";
import topHeader from "./topHeader.vue";
import waterLevelChart from "./waterLevelChart.vue";

export default {

  name: "DataView",
  components: {
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    cards,
    scrollBoardAmount,
  },
  setup() {
    function showDialog() {
      console.log("点击事件");
      this.dialogVisible = true;
    }
    return {
      showDialog,
      dialogVisible: false,
    };
  },
};
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    width: 75%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 50%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
  .block-left-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
