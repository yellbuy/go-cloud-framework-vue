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
              name: '福田镇(900)',
              value: 20,
              total:4500
            },
            {
              name: '同德镇(820)',
              value: 10,
              total:8200
            },
            {
              name: '布德镇(520)',
              value: 20,
              total:2600
            },
            {
              name: '前进镇(480)',
              value: 15,
              total:3200
            },
            {
              name: '大龙潭彝族乡(1023)',
              value: 27.6,
              total:3712
            },
            {
              name: '啊喇彝族乡(216)',
              value: 12,
              total:1800
            },
            {
              name: '太平乡(252)',
              value: 12,
              total:2300
            },
            {
              name: '务本乡(260)',
              value: 10,
              total:2600
            },
            {
              name: '中坝乡(150)',
              value: 12,
              total:1250
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