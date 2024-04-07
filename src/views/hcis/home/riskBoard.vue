<template>
  <div class="scroll-board">
    <dv-charts :option="option" style="width: 100%; height:280px;margin:0;padding:0"/>
  </div>
</template>

<script>
export default {
  name: "RiskBoard",
  props: {
    stat: {
      type: Array,
      default: () => [0,0,0]
    },
  },
  setup(props) {
     // 获取父级菜单数据
     const stat = computed(() => {
        console.log("props.stat",props.stat)
        return props.stat;
      });
    console.log("props:",props)
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
            data: stat||[0,0,0],
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
