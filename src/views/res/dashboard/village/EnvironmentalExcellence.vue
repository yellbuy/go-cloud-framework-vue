<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div ref="echart" :style="objStyle||''" class="echartDiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from "echarts";
import { onMounted, reactive, ref, toRefs } from 'vue';

export default {
  props: {
    data: Array,
    label: Array,
    XLabel: Array,
    objStyle: Array,
    formatter: Array,
    formatterMode: Array,
    YFontSize: Array,
    YAxisLabel: Array,
    left: Array,
    top: Array,
    bottom: Array,
    color: Array,
    stack: String,
    legendShow: {
      default: true
    }
  },
  setup(props) {
    let state = reactive({
      echart: ref(),
    })
    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        grid: {
          top: props.top || 45,
          right: "0",
          left: props.left || 10,
          bottom: props.bottom || 20,
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(50,50,50,0.7)',
          textStyle: {
            color: '#eee',
            textAlign:'left'
          },
          formatter: function (params) {
            var result = params[0].axisValue + '<br/>';
            params.forEach(function (item) {
              result += item.marker + ' ' + item.seriesName + ': ' + item.value + (props.formatter != undefined ? props.formatter : '%');
              if (item.data.extra) {
                result += ' (' + item.data.extra + ')';
              }
              result += '<br/>';
            });
            return result;
          }
        },
        legend: {
          show: props.legendShow,
          data: props.label,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: props.XLabel || ['2022年', '2023年', '2024年'],
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false // 隐藏横线
            },
            axisLabel: {
              show: props.YAxisLabel || true,
              color: '#fff',
              fontSize: props.YFontSize || 11,
              formatter: props.formatter != undefined ? '{value}' + props.formatter : '{value}%',
            }
          }
        ],
        series: []
      };

      for (let i = 0; i < props.label?.length; i++) {
        const data = {
          name: props.label[i],
          type: 'bar',
          data: props.data[i],
          barMaxWidth: "30",
          barWidth: "26",
          barGap: "30%",
          label: {
            show: true,
            formatter: props.formatter != undefined ? '{c}' + props.formatter : '{c}%',
            textStyle: {
              color: '#ddd',
              fontSize: props.YFontSize || 11,
            },
            position: 'top',
            distance: 8
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0.2,
                color: getColor({num: i})
              },
              {
                offset: 0.9,
                color: 'rgba(128,128,128,0.5)'
              }
            ])
          },
          stack: ""
        };
        if (props.stack) {
          data.stack = props.stack
        }
        if (props.color !== undefined && i <= props.color.length - 1) {
          data.itemStyle = {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0.2,
                color: props.color[i]
              },
              {
                offset: 1,
                color: 'rgba(128,128,128,0.5)'
              }
            ])
          }
        }
        option.series.push(data);
      }

      // 替换提示模板
      if (props.formatterMode !== undefined) {
        option.tooltip.formatter = props.formatterMode;
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    }

    // 色盘
    function getColor({num}: { num: any }) {
      const color = ['#fac858', '#63d3e3', '#91cc75', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6'];
      if (num > color.length) {
        num = num % color.length
      }
      return color[num];
    }

    // 随机颜色
    function getRandomColor() {
      // 生成一个介于0到255之间的随机数，确保至少有一个通道的值较高（例如128以上）
      const r = Math.floor(Math.random() * (256 - 128) + 128); // 红色
      const g = Math.floor(Math.random() * 256); // 绿色
      const b = Math.floor(Math.random() * 256); // 蓝色

      // 将RGB值转换为十六进制格式
      const color = `rgb(${r}, ${g}, ${b})`;
      return color;
    }

    //挂载
    onMounted(async () => {
      echartInit();
    })

    return {
      ...toRefs(state),
      echartInit,
    }
  },
}
</script>

<style lang='scss' scoped>
.echartDiv {
  width: 100%;
  height: 12rem;
}
</style>