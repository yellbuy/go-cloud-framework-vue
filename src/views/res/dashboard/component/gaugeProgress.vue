<template>
  <div>
    <div ref="gaugeProgressContainer" class="gaugeProgressContainer" :id="uid" :style="style"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue';

export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    style: {
      type: String,
      default: "width:100%;height: 30vh"
    },
    value: {
      type: Number,
      default: 0.5,
    },
    axisLabelFontSize: {
      type: Number,
      default: 8,
    },
    titleFontSize: {
      type: Number,
      default: 10,
    },
    detailFontSize: {
      type: Number,
      default: 14,
    },
    colorValueData: {
      type: Array,
      default: [
        [0.75, '#FDDD60'],
        [0.85, '#58D9F9'],
        [1, '#7CFFB2']
      ],
    },
    colorTickData: {
      type: Array,
      default: [{name: '2024 75%', value: 0.375}, {name: '2025 85%', value: 0.75}, {name: '2030 95%', value: 1}],
    },
  },
  setup(props) {
    let uid = ref('');
    const {proxy} = getCurrentInstance() as any;
    let state = reactive({
      uid
    })
    onBeforeMount(() => {
      uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`;
    });
    //挂载
    onMounted(async () => {
      const chartDom = document.getElementById(uid.value);
      const myChart = echarts.init(chartDom);
      const option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '60%'],
            radius: '100%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: props.colorValueData
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 5,
              offsetCenter: [0, '-70%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisLabel: {
              color: '#ddd',
              fontSize: props.axisLabelFontSize,
              distance: -25,
              rotate: 'tangential',
              formatter: function (value) {
                console.log("value", value)
                if (props.colorTickData.length > 0) {
                  for (const val of props.colorTickData) {
                    if (value === val.value) {
                      return val.name;
                    }
                  }
                }
              }
            },
            title: {
              offsetCenter: [0, '-10%'],
              fontSize: props.titleFontSize,
              color: 'white',
              stroke: 'orange',
              lineWidth: 5,
            },
            detail: {
              fontSize: props.detailFontSize,
              offsetCenter: [0, '-35%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + '%';
              },
              color: 'white'
            },
            data: [
              {
                color: 'white',
                value: props.value,
                name: props.text
              }
            ]
          }
        ]
      };

      option && myChart.setOption(option);
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>

</style>