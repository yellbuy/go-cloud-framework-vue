<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">区迈入进度趋势</div>
        <div ref="echart" class="echartDiv"></div>
      </div>
    </dv-border-box10>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let state = reactive({
      xAxisData: [""],
      yAxisData: [0],
      yAxisSideData: [0],
      echart: ref(),
    })
    const echartInit = () => {
      var myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(50,50,50,0.7)',
          axisPointer: {
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: '#eee',
          },
        },
        legend: {
          data: ['2024', '2025', '2026', '2027', '2028', '2029', '2030']
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '6%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2024', '2025', '2026', '2027', '2028', '2029', '2030']
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            show:false
          }
        },
        series: [
          {
            name: '户夯实',
            type: 'line',
            stack: 'Total',
            data: [30, 35, 40, 45, 48, 50, 75]
          },
          {
            name: '村占比',
            type: 'line',
            stack: 'Total',
            data: [45, 48, 54, 60, 66, 72, 83]
          },
          {
            name: '公共服务',
            type: 'line',
            stack: 'Total',
            data: [34, 48, 54, 72, 88, 90, 98]
          },
          {
            name: '基础设施',
            type: 'line',
            stack: 'Total',
            data: [52, 54, 58, 60, 66, 69, 72]
          },
          {
            name: '乡村治理',
            type: 'line',
            stack: 'Total',
            data: [62, 66, 68, 75, 78, 82, 94]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

    //挂载
    onMounted(async () => {
      
      state.xAxisData=["大河中路街道","仁和镇","平地镇","大田镇","福田镇","同德镇","金江镇","布德镇","前进镇","大龙潭彝族乡","啊喇彝族乡","太平乡","务本乡","中坝乡"];
        state.yAxisData=[18,17,16.5,14,15,13,17.5,12,9,8,6,7,6.5,7.2,6];
        state.yAxisSideData=state.xAxisData.map((val:any)=>{return val+1});
        echartInit();
        const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 
      // const res = await proxy.$api.erp.waybill.getCustomerStatListByScope("freight",0, 0,{limit:5,startTime:startTime,endTime:endTime});
      // if(res.errcode==0){
       
      // }	
    })

    return {
      ...toRefs(state),
      echartInit,
    }
  },
}
</script>
 
<style lang='scss' scoped>
#flareTarget{
  margin:10px 10px;
}
.echartDiv {
  width: 100%;
  height:21vh;
  padding-bottom:1vh;
}
.flare-title{
  background-image: linear-gradient(to right,rgb(83, 78, 234), rgb(21, 6, 110));
  border-radius: 4px;
  margin-top: 1vh;
  height: 3vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  font-size: 18px;
}
</style>