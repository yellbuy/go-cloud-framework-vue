<template>
  <div id="data-view" dv-bg>
      
      <dv-full-screen-container v-if="isFullScreen">
        <!-- <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div> -->
        <dv-border-box11 title="仁 和 区 共 同 富 裕 数 字 化 平 台" :title-width="400" :animate="true" style="height:100vh">
          <div class="main-rows">
            
            <div style="width:25%">
              <flareTarget />
              <radarLgsh/>
              <barCoutyGdp/>
            </div>
            <dv-border-box1 style="width:50%">
              <digitalGoodsStat/>
              <div class="column-center">
              </div>
            </dv-border-box1>
            <div style="width:25%">
              <pieCoutyGdp />
              <rankingCounty/>
              <lineLgsh/>
            </div>
          </div>
        </dv-border-box11>
      </dv-full-screen-container>
      <div v-else>
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <dv-border-box11 title="仁 和 区 共 同 富 裕 数 字 化 平 台" :title-width="400" :animate="true" style="height:100vh">
          <div class="main-rows">
            <dv-border-box1>
                <div style="margin:4vh 4vw">
                  <dv-scroll-ranking-board :config="countyConfig" />
                </div>
            </dv-border-box1>
            <div class="column-center">
            </div>
            <dv-border-box1>
              <div>
                dv-border-box3
              </div>
            </dv-border-box1>
          </div>
        </dv-border-box11>
      </div>
    </div>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';

import barCoutyGdp from "./barCoutyGdp.vue";
import digitalGoodsStat from "./digitalGoodsStat.vue";
import flareTarget from "./flareTarget.vue";
import lineLgsh from "./lineLgsh.vue";
import pieCoutyGdp from "./pieCountyGdp.vue";
import radarLgsh from "./radarLgsh.vue";
import rankingCounty from "./rankingCounty.vue";
export default {
  name: "IndexDashboard",
  components: {
    flareTarget,
    rankingCounty,
    digitalGoodsStat,
    barCoutyGdp,
    pieCoutyGdp,
    radarLgsh,
    lineLgsh,
  },
  setup() {
    const state: any = reactive({
        isFullScreen:true,// 是否全屏
        
    })
    const onFullScreen = () => {
			//admin/dashboard/app/fullScreen
      state.isFullScreen=!state.isFullScreen
		};
    return {
      onFullScreen,
        ...toRefs(state),
    };
  },
};
</script>


<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  color: #fff;
  
  background-image: url("./img/bg.png");
  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
  }
  .main-rows {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding:8vh 1vw 2vh 1vw;
    height: 100%;
    .dv-border-box-1{
      background-color: #020932;
      text-align: left;
    }
    .column-center {
      background-image: url("./img/renhe.png");
      height: 82%;
      background-size: 100% 100%;
      margin:0px 20px 12px 20px;
    }
  }
}

</style>
