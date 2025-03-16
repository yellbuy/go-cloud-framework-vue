<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">人均收入占比</div>
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
      data: [],
      echart: ref(),
    })
    
    let myChart:any
    const setChartOption = (chart:any) => {
      
      // 指定图表的配置项和数据
      var option = {
        color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50,50,50,0.7)',
          formatter: '{b} : {c}户 ({d}%)',
          textStyle: {
            color: '#eee'
          },
        //formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      center: ['25%', '50%'],
      radius: 120,
      startAngle: 90,
      splitNumber: 4,
      shape: 'circle',
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      series: [
        {
          name: '户数',
          type: 'pie',
          radius: [30, 80],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: state.data
        }
      ]
    };
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option)
    }

    //挂载
    onMounted(async () => {
      myChart = echarts.init(state.echart, 'dark')
      const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 

      state.data=[{name:'特困家庭',value:1752},{name:'低收入家庭',value:4752},{name:'中等收入家庭',value:8752},{name:'高收入家庭',value:552}];
      setChartOption(myChart);

      // const res = await proxy.$api.erp.waybill.getGoodsNameStatListByScope("freight",0, 0,{limit:8,startTime:startTime,endTime:endTime});
      // if(res.errcode==0){
        
      //   state.data=res.data.map((val:any)=>{return {value:val.Weight,name:val.Name}});
      //   setChartOption(myChart);
      // }	
      
      // setInterval(async () => {
      //   const res = await proxy.$api.erp.waybill.getGoodsNameStatListByScope("freight",0, 0,{limit:8,startTime:startTime,endTime:endTime});
      //   if(res.errcode==0){
      //     state.data=res.data.map((val:any)=>{return {value:val.Weight,name:val.Name}});
      //     setChartOption(myChart);
      //   }	
      // }, 5000);

      let currentIndex = -1;
      setInterval(function() {
      var dataLen = state.data.length;
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      currentIndex = (currentIndex + 1) % dataLen;
      // 高亮当前图形
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      // 显示 tooltip
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    }, 1000);
    })

    return {
      ...toRefs(state),
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
  height:30vh;
  padding:1vh;
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