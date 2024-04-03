<template>
  <div class="scroll-board">
    <dv-charts :option="option" style="width: 100%; height:280px;margin:0;padding:0"/>
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
              name: "人数",
              color: "rgba(245, 225, 32, 0.8)",
            },
            // {
            //   name: "完成量",
            //   color: "#ff5ca9",
            // }
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: ["低风险", "中风险", "高风险"],
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#fff",
            },
          },
          axisTick: {
            show: true,
          },
        },
        yAxis: {
          data: "value",
          splitLine: {
            show: true,
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
            show: true,
          },
          min: 0,
        },
        series: [
          {
            name: "人数",
            data: [15, 35, 165],
            type: "bar",
            barStyle: {
              fill: "rgba(245, 225, 32, 0.8)",
            },
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            },
            label: {
              // 修改 position 和 distance 的值试试
              // 支持：'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
              position: 'inside',
              distance: 10,
              style: {
                fontSize:14,
                fill: "#fff",
                backgroundColor: '#eee',
                borderColor: '#555',
                borderWidth: 2,
                borderRadius: 5,
                padding: 10,
                shadowBlur: 3,
                shadowColor: '#888',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                textBorderColor: '#000',
                textBorderWidth: 3,
              },
              show: true,
            }
          },
          // {
          //   name: "完成量",
          //   data: [2.5, 3.5, 6.5, 6.5, 7.5, 6.5],
          //   type: "line",
          //   lineStyle: {
          //     stroke: "#ff5ca9",
          //   },
          //   linePoint: {
          //     radius: 4,
          //     style: {
          //       fill: "#ff5ca9",
          //       stroke: "transparent",
          //     },
          //   },
          // },
          // {
          //   data: [0.2, 1.2, 4.2, 4.2, 5.2, 4.2],
          //   type: "line",
          //   name: "完成进度",
          //   lineArea: {
          //     show: true,
          //     gradient: ["rgba(245, 217, 79, 0.8)", "rgba(245, 217, 79, 0.2)"],
          //   },
          //   lineStyle: {
          //     stroke: "#f5d94e",
          //   },
          //   linePoint: {
          //     radius: 4,
          //     style: {
          //       fill: "#f5d94e",
          //       stroke: "transparent",
          //     },
          //   },
          // },
        ],
      },
    };
  },
};
</script>

<style lang="less">
.scroll-board {
  position: relative;
  box-sizing: border-box;
  top:-40px;

  .chart-name {
    // position: absolute;
    text-align: left;
    font-size: 18px;
  }
}
</style>
