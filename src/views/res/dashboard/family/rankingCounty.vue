<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">乡镇进度排名</div>
        <div w50rem h24rem p3 flex="1" justify-center items-center>
          <div>
            <dv-scroll-ranking-board :config="countyConfig" style="padding:0vh 1vw;height:25vh;text-align:left"/>
          </div>
        </div>
      </div>
    </dv-border-box10>

  </div>
</template>

<script lang="ts">
import {getCurrentInstance, reactive, toRefs} from 'vue';

export default {
  setup() {
    const {proxy} = getCurrentInstance() as any;
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      countyConfig: {
        carousel: 'single',

        rowNum: 5,
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
      }
    })


    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>

#flareTarget {
  margin: 10px 10px;
}

.flare-container {
  text-align: "left" !important;
}

.echartDiv {
  width: 100%;
  height: 25vh;
  padding: 1vh;
  text-align: left !important;
}

.flare-title {
  background-image: linear-gradient(to right, rgb(83, 78, 234), rgb(21, 6, 110));
  border-radius: 4px;
  margin-top: 1vh;
  height: 3vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  font-size: 18px;
}
</style>