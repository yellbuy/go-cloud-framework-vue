<template>
  <div class="scroll-board">
    <div class="chart-name">
      月计划完成情况
      <dv-decoration-3 style="width: 100%; height: 20px" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: "ScrollBoard",
  data() {
    return {
      option: {
        legend: {
          data: [
            {
              name: "计划量",
              color: "#00baff",
            },
            {
              name: "完成量",
              color: "#ff5ca9",
            },
            {
              name: "累计量",
              color: "#3de7c9",
            },
            {
              name: "完成进度",
              color: "#f5d94e",
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
            name: "计划量",
            data: [2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5],
            type: "bar",
            barStyle: {
              fill: "rgba(0, 186, 255, 0.4)",
            },
          },
          {
            name: "完成量",
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
            name: "累计量",
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
          {
            data: [0.2, 1.2, 4.2, 4.2, 5.2, 4.2, 0.2],
            type: "line",
            name: "完成进度",
            lineArea: {
              show: true,
              gradient: ["rgba(245, 217, 79, 0.8)", "rgba(245, 217, 79, 0.2)"],
            },
            lineStyle: {
              stroke: "#f5d94e",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#f5d94e",
                stroke: "transparent",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="less">
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
</style>
