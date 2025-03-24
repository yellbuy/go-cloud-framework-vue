<template>
  <div class="target-content target-container-h3">
    <dv-scroll-ranking-board :config="countyConfig"/>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      countyConfig: {
        carousel: 'single',

        rowNum: 6,
        data: [
          {
            name: '大河中路街道',
            value: 55,
          },
          {
            name: '仁和镇',
            value: 100,
          },
          {
            name: '平地镇',
            value: 78,
          },
          {
            name: '大田镇',
            value: 66,
          },
          {
            name: '福田镇',
            value: 80,
          },
          {
            name: '同德镇',
            value: 45,
          },
          {
            name: '金江镇',
            value: 86,
          },
          {
            name: '布德镇',
            value: 55,
          },
          {
            name: '前进镇',
            value: 59,
          },
          {
            name: '大龙潭彝族乡',
            value: 56,
          },
          {
            name: '啊喇彝族乡',
            value: 54,
          },
          {
            name: '太平乡',
            value: 63,
          },
          {
            name: '务本乡',
            value: 66,
          },
          {
            name: '中坝乡',
            value: 61,
          },
        ],
        unit: '%',
        color:"#409EFF"
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