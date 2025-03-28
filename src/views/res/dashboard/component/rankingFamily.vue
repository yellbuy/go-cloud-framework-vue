<template>
  <div class="target-content target-container-h3">
    <scrollRankingProgress :config="countyConfig"/>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import { getCurrentInstance, reactive, toRefs } from 'vue';
import scrollRankingProgress from "/@/components/scrollRankingProgress/index.vue";
export default {
  components: {
    scrollRankingProgress,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const state: any = reactive({
        isFullScreen:true,// 是否全屏
        countyConfig:{
          carousel:'single',
          
          rowNum:5,
          data: [
            {
              name: '大河中路街道(10400)',
              value: 30,
              total:38000
            },
            {
              name: '仁和镇(7500)',
              value: 28,
              total:18000
            },
            {
              name: '平地镇(1600)',
              value: 20,
              total:8000
            },
            {
              name: '大田镇(1050)',
              value: 15,
              total:8670
            },
            {
              name: '福田镇(4500)',
              value: 20,
              total:900
            },
            {
              name: '同德镇(8200)',
              value: 10,
              total:820
            },
            {
              name: '布德镇(2600)',
              value: 20,
              total:520
            },
            {
              name: '前进镇(3200)',
              value: 15,
              total:480
            },
            {
              name: '大龙潭彝族乡(3750)',
              value: 20,
              total:750
            },
            {
              name: '啊喇彝族乡(1800)',
              value: 12,
              total:216
            },
            {
              name: '太平乡(2300)',
              value: 12,
              total:2560
            },
            {
              name: '务本乡(共2600户)',
              value: 10,
              total:260
            },
            {
              name: '中坝乡(共1250户)',
              value: 12,
              total:145
            },
          ],
          unit: '%',
          color:'#E6A23C',
          valueFormatter:(item:any)=>{
            return '共'+item.total+"户"
          },
          labelLineData:[
            {x1:"50%",y1:"0",x2:"50%",y2:"100%",style:"stroke:#777;stroke-width:1"}
            ,{x1:"75%",y1:"0",x2:"75%",y2:"100%",style:"stroke:#777;stroke-width:1"}
            ,{x1:"100%",y1:"0",x2:"100%",y2:"100%",style:"stroke:#777;stroke-width:1"}
          ],
          labelTextData:[
          {x:"50%",y:"100%",text:"50%",style:"fill:#ccc;text-anchor:middle;font-size:10;"}
            ,{x:"75%",y:"100%",text:"75%",style:"fill:#ccc;text-anchor:middle;font-size:10;"}
            ,{x:"100%",y:"100%",text:"100%",style:"fill:#ccc;text-anchor:end;font-size:10;"}
          ]
        }
    })
    

    return {
      ...toRefs(state),
    }
  },
}
</script>
 
<style lang='scss' scoped>
</style>