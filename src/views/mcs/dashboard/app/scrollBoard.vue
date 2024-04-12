<template>
  <div class="scroll-board">
    <div class="chart-name">
      计划完成情况
      <dv-decoration-3 style="width: 150px;" />
    </div>
    <dv-charts :option="option" style="width: 180px; height:180px"/>
  </div>
</template>

<script>
export default {
  name: "ScrollBoard",
  setup() {
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
            }
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: ["一月", "二月", "三月", "四月", "五月", "六月"],
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
            data: [0, 3.5, 6.5, 6.5, 7.5, 6.5],
            type: "bar",
            barStyle: {
              fill: "rgba(0, 186, 255, 0.4)",
            },
          },
          {
            name: "完成量",
            data: [0, 3.5, 6.5, 6.5, 7.5, 6.5],
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
            data: [0.2, 1.2, 4.2, 4.2, 5.2, 4.2],
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
  //position: relative;
  padding: 8px;
  box-sizing: border-box;
  height: 100%;
  //top:-50px;

  .chart-name {
    // position: absolute;
    margin-left: 10px;
    text-align: left;
    font-size: 18px;
  }
}
</style>
