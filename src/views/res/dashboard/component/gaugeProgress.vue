<template>
  <div >
    <div ref="gaugeProgressContainer" class="gaugeProgressContainer" :id="uid" style="width:100%;height: 12vh;"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue';
export default {
  props: {
		text: {
			type: String,
			default:'',
		},
	},
  setup(props) {
    let uid = ref('');
    const { proxy } = getCurrentInstance() as any;
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
            center: ['50%', '70%'],
            radius: '100%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.75, '#FDDD60'],
                  [0.85, '#58D9F9'],
                  [1, '#7CFFB2']
                ]
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
            // axisTick: {
            //   length: 12,
            //   lineStyle: {
            //     color: 'auto',
            //     width: 2
            //   }
            // },
            // splitLine: {
            //   length: 20,
            //   lineStyle: {
            //     color: 'auto',
            //     width: 0
            //   }
            // },
            axisLabel: {
              color: '#ddd',
              fontSize: 8,
              distance: -25,
              rotate: 'tangential',
              formatter: function (value) {
                console.log("value",value)
                if (value === 0.375) {
                  return '2024 75%';
                } 
                if (value === 0.75) {
                  return '2025 85%';
                } 
                if (value === 1){ 
                  return '2025 95%';
                } 
              }
            },
            title: {
              offsetCenter: [0, '-10%'],
              fontSize: 10,
              color: 'white',
              stroke:'orange',
              lineWidth:5,
            },
            detail: {
              fontSize: 14,
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
                value: 0.7,
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