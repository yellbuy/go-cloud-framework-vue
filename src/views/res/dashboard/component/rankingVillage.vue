<template>
  <div class="target-content  target-container-h3">
    <!-- <dv-scroll-ranking-board :config="countyConfig" class="target-container-h3"/> -->
    <scrollRankingProgress :config="countyConfig" class="target-container-h3"/>
    
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
          
          rowNum:12,
          data: [
            {
              name: '仁和镇（6)',
              value: 40,
              total: 15,
            },
            {
              name: '平地镇（1)',
              value: 33,
              total: 6,
            },
            {
              name: '大田镇（1)',
              value: 33,
              total: 6,
            },
            {
              name: '福田镇（1)',
              value: 17,
              total: 6,
            },
            {
              name: '同德镇（1)',
              value: 17,
              total: 6,
            },
            {
              name: '布德镇（1)',
              value: 33,
              total: 3,
            },
            {
              name: '前进镇（2)',
              value: 29,
              total: 7,
            },
            {
              name: '大龙潭彝族乡（2)',
              value: 33,
              total: 6,
            },
            {
              name: '啊喇彝族乡（1)',
              value: 20,
              total: 5,
            },
            {
              name: '太平乡（1)',
              value: 17,
              total: 6,
            },
            {
              name: '务本乡（1)',
              value: 25,
              total: 4,
            },
            {
              name: '中坝乡（1)',
              value: 25,
              total: 4,
            },
          ],
          unit: '%',
          color:'#E6A23C',
          valueFormatter:(item:any)=>{
            return '共'+item.total+"村"
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