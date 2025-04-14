<template>
  <div id="pie-board">
    <div class="pie-board-title">产品运量统计</div>
    <div ref="echart" class="echartDiv"></div>
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
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50,50,50,0.7)',
          formatter: '{b} : {c}万吨 ({d}%)',
          textStyle: {
            color: '#eee'
          },
        //formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // legend: {
      //   left: 'center',
      //   top: 'bottom',
      //   data: [
      //     '矿渣砂',
      //     '矿渣碎石',
      //     'rose3',
      //     'rose4',
      //     'rose5',
      //     'rose6',
      //     'rose7',
      //     'rose8'
      //   ]
      // },
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
          name: '产品',
          type: 'pie',
          radius: [40, 80],
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

      const res = await proxy.$api.erp.waybill.getGoodsNameStatListByScope("freight",0, 0,{limit:8,startTime:startTime,endTime:endTime});
      if(res.errcode==0){
        
        state.data=res.data.map((val:any)=>{return {value:val.Weight,name:val.Name}});
        setChartOption(myChart);
      }	
      
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getGoodsNameStatListByScope("freight",0, 0,{limit:8,startTime:startTime,endTime:endTime});
        if(res.errcode==0){
          state.data=res.data.map((val:any)=>{return {value:val.Weight,name:val.Name}});
          setChartOption(myChart);
        }	
      }, 5000);

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
.echartDiv {
  width: 100%;
  height: 28vh;
}
#pie-board {
  width: 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;  
  margin-top: 1vh;
  margin-bottom: 1vh;

  .pie-board-title {
    height: 5vh;
    display: flex;
    font-family: 'LiSu';
    align-items: center;
    font-size: 18px;
    margin-left:20px;
  }
}
</style>