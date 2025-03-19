<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">指标解读</div>
        <div ref="echart" class="echartDiv"></div>
      </div>
    </dv-border-box10>
    
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let state = reactive({
      data: {
 "name": "仁和共富评估指标",
 "children": [
  {
   "name": "户达标",
   "children": [
    {
     "name": "一增",
     "children": [
      {"name": "家庭收入增加", "value": 100000},
     ]
    },
    {
     "name": "五好",
     "children": [
      {"name": "保障好", "value": 3534},
      {"name": "教育好", "value": 5731},
      {"name": "医疗好", "value": 7840},
      {"name": "住房好", "value": 5914},
      {"name": "家风好", "value": 3416}
     ]
    },
   ]
  },
  {
   "name": "村实现",
   "children": [
    {
     "name": "三超",
     "children": [
      {"name": "基本富裕达标户占比", "value": 50},
      {"name": "全村人均可支配收入", "value": 50},
      {"name": "村集体经济稳定收入", "value": 200000},
     ]
    },{
     "name": "三优",
     "children": [
      {"name": "产业优", "value": 50},
      {"name": "环境优", "value": 50},
      {"name": "文化优", "value": 200000},
     ]
    },{
     "name": "两强",
     "children": [
      {"name": "组织强", "value": 50},
      {"name": "治理强", "value": 50},
     ]
    },
   ]
  },
  {
   "name": "乡进入",
   "children": [
    {
     "name": "两高",
     "children": [
      {"name": "基本富裕达标户占比", "value": 50},
      {"name": "基本富裕实现村数", "value": 75},
     ]
    },{
     "name": "三化",
     "children": [
      {"name": "公共服务均等化", "value": 100},
      {"name": "基础设施一体化", "value": 100},
      {"name": "乡村治理现代化", "value": 100},
     ]
    },
   ]
  },
  {
   "name": "区建成",
   "children": [
    {
     "name": "2025",
     "children": [
      {"name": "地区生产总值", "value": 300},
      {"name": "人均地区生产总值", "value": 11},
      {"name": "城乡居民可支配收入", "value": 1.9},
      {"name": "城镇登记失业率", "value": 4.2},
      {"name": "家庭中等收入占比", "value": 52},
      {"name": "城镇化率", "value": 61},
      {"name": "毛入学率", "value": 95},
      {"name": "普惠幼儿园", "value": 88},
      {"name": "公办幼儿园", "value": 51},
      {"name": "义务教育入学率", "value": 100},
     ]
    },{
     "name": "2027",
     "children": [
      {"name": "共同富裕试验区建设大见成效", "value": 50},
     ]
    },{
     "name": "2030",
     "children": [
      {"name": "基本建成共同富裕试验区", "value": 50},
     ]
    },
   ]
  },
 ]
},
      echart: ref(),
    })
    const echartInit = () => {
      var myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      var option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [state.data],
          top: '2%',
          left: '20%',
          bottom: '2%',
          right: '20%',
          symbolSize: 0.5,
          edgeShape: 'polyline',
          edgeForkPosition: '63%',
          initialTreeDepth: 2,
          itemStyle:{
            color:'lightsteelblue',
            borderWidth:1.5
          },
          lineStyle: {
            width: 1,
            padding:2,
            curveness: 0.5,
            color:'rgb(51.2, 126.4, 204)'
          },
          label: {
            position: 'right',
            backgroundColor: 'rgb(51.2, 126.4, 204)',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12,
            padding:2,
            borderRadius:4,
            color:'rgb(235.9, 245.3, 255)'
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
              padding:2,
              color:'rgb(235.9, 245.3, 255)'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
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

#flareTarget{
  margin:10px 10px;
}
.flare-container{
  text-align: "left"  !important;
}
.echartDiv {
  width: 100%;
  height:30vh;
  padding:1vh;
  text-align: left  !important;
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