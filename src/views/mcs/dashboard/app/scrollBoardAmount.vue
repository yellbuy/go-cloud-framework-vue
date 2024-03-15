<template>
  <div class="scroll-board">
    <div class="chart-name">
      月收支统计情况
      <dv-decoration-3 style="width: 100%; height: 20px" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: "ScrollBoardAmount",
  setup() {
    return {
      option: {
        legend: {
          data: [
            {
              name: "收入金额",
              color: "#00baff",
            },
            {
              name: "成本金额",
              color: "#ff5ca9",
            },
            {
              name: "利润金额",
              color: "#3de7c9",
            },
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          data: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 8,
        },
        series: [
          {
            name: "收入金额",
            data: [2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5],
            type: "bar",
            barStyle: {
              fill: "rgba(0, 186, 255, 0.4)",
            },
          },
          {
            name: "成本金额",
            data: [2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5],
            type: "line",
            lineStyle: {
              stroke: "#ff5ca9",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#ff5ca9",
                stroke: "transparent",
              },
            },
          },
          {
            name: "利润金额",
            data: [1.3, 2.3, 5.3, 5.3, 6.3, 5.3, 1.3],
            type: "line",
            smooth: true,
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"],
            },
            lineStyle: {
              lineDash: [5, 5],
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#00db95",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<!-- <style lang="less">
.scroll-board {
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;

  .chart-name {
    position: absolute;
    left: 70px;
    text-align: left;
    font-size: 20px;
  }
}
</style> -->
