<template>
  <div class="target-content target-container-h3">
    <dv-scroll-ranking-board :config="countyConfig"/>
    <svg width="100%" height="100%" style="transform: translate(0, -100%);">
              <!-- 创建一个竖线，x1和x2相同，y1和y2不同，从而形成一条竖线 -->
        <line x1="50%" y1="0" x2="50%" y2="100%" style="stroke:orange;stroke-width:1" />
        <line x1="75%" y1="0" x2="75%" y2="100%" style="stroke:orange;stroke-width:1" />
        <line x1="100%" y1="0" x2="100%" y2="100%" style="stroke:orange;stroke-width:1" />
        <text x="45%" y="99%" style="stroke:white;">50%</text>
        <text x="70%" y="99%" style="stroke:white;">75%</text>
        <text x="93%" y="99%" style="stroke:white;">100%</text>
    </svg>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import { getCurrentInstance, reactive, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const state: any = reactive({
        isFullScreen:true,// 是否全屏
        countyConfig:{
          carousel:'single',
          
          rowNum:5,
          data: [
            {
              name: '大河中路街道(共32000户，达标30000户)',
              value: 100,
            },
            {
              name: '仁和镇(共18000户，达标12000户)',
              value: 70,
            },
            {
              name: '平地镇(共8000户，达标5600户)',
              value: 78,
            },
            {
              name: '大田镇(共8670户，达标6700户)',
              value: 66,
            },
            {
              name: '福田镇(共4500户，达标4000户)',
              value: 80,
            },
            {
              name: '同德镇(共8200户，达标4500户)',
              value: 45,
            },
            {
              name: '布德镇(共2600户，达标1450户)',
              value: 55,
            },
            {
              name: '前进镇(共3200户，达标1800户)',
              value: 59,
            },
            {
              name: '大龙潭彝族乡(共3750户，达标2100户)',
              value: 56,
            },
            {
              name: '啊喇彝族乡(共1800户，达标950户)',
              value: 54,
            },
            {
              name: '太平乡(共2300户，达标700户)',
              value: 33,
            },
            {
              name: '务本乡(共2600户，达标1300户)',
              value: 50,
            },
            {
              name: '中坝乡(共1250户，达标720户)',
              value: 61,
            },
          ],
          unit: '%',
          clolr:'rgb(248, 152.1, 152.1)',
          
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