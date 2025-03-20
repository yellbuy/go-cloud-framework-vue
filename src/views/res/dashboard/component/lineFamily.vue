<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">户达标情况</div>
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
          data: ['2024', '2025', '2026', '2027']
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
          data: ['2024', '2025', '2026', '2027']
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            show:true
          }
        },
        series: [
          {
            name: '家庭收入',
            type: 'line',
            smooth: true,
            data: [34, 38, 82, 95]
          },
          {
            name: '保障好',
            type: 'line',
            smooth: true,
            data: [27, 66, 72, 83]
          },
          {
            name: '教育好',
            type: 'line',
            smooth: true,
            data: [48, 52, 97, 98]
          },
          {
            name: '医疗好',
            type: 'line',
            smooth: true,
            data: [ 35, 42, 87, 89]
          },
          {
            name: '住房好',
            type: 'line',
            smooth: true,
            data: [50, 65, 82, 94]
          },
          {
            name: '家风好',
            type: 'line',
            smooth: true,
            data: [86, 88, 88, 98]
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
  height:39.5vh;
  padding-bottom:1vh;
}
.flare-title{
  text-align: left;
  padding-left:10px;
  color:yellow;
  background-image: linear-gradient(to bottom,rgb(83, 77, 237),rgb(8, 3, 32));
  border-radius: 2px;
  margin-top: 1vh;
  height: 5vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  padding-top:6px;
  font-size: 20px;
}
</style>