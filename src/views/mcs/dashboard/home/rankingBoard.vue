<template>
  <div id="ranking-board">
    <div class="ranking-board-title">年度运量排名（吨）</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "RankingBoard",
  data() {
    return {
      config: {
        data: [
          {
            name: "横通物流",
            value: 15231,
          },
          {
            name: "汉风物流",
            value: 12450,
          },
          {
            name: "汉盛物流",
            value: 10078,
          },
          {
            name: "汉威物流",
            value: 9866,
          },
          {
            name: "汉恒物流",
            value: 5400,
          },
          {
            name: "钛智捷",
            value: 4205,
          },
        ],
        colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],
        unit: "吨",
        showValue: true,
        rowNum: 6,
      },
    };
  },
};
</script>

<style lang="less">
#ranking-board {
  width: 30%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  margin-right: 30px;
  padding: 0 15px;

  .ranking-board-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
