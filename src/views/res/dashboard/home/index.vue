<template>
  <div id="data-view" dv-bg>
      
      <dv-full-screen-container v-if="isFullScreen">
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <dv-border-box11 title="仁 和 区 共 同 富 裕 数 字 化 平 台" :title-width="400" :animate="true" style="height:100vh">
          <div class="main-rows">
            
            <dv-border-box1>
              <flareTarget />
              <div style="margin-top:2vh">
                各乡镇共富进度
              </div>
              <div w50rem h24rem p3 flex="1" justify-center items-center>
                <div>
                  <dv-scroll-ranking-board :config="countyConfig" style="padding:0vh 2vw;height:40vh;text-align:left" />
                </div>
              </div>
             
            </dv-border-box1>
            <dv-border-box1 >
              <div class="column-center">
              </div>
            </dv-border-box1>
            <dv-border-box1>
              <div>
                dv-border-box3
              </div>
            </dv-border-box1>
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

import flareTarget from "./flareTarget.vue";

export default {
  name: "IndexDashboard",
  components: {
    flareTarget,
  },
  setup() {
    const state: any = reactive({
        isFullScreen:true,// 是否全屏
        countyConfig:{
          carousel:'page',
          color:'#E6A23C',
          rowNum:7,
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
  width: 100vw;
  height: 100vh;
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
    padding:8vh 2vh 2vh 2vh;
    height: 100vh;
    .dv-border-box-1{
      background-color: #020932;
      text-align: left;
    }
    .column-center {
      background-image: url("./img/renhe.png");
      height: 90vh;
      background-size: 100% 100%;
    }
  }
}

</style>
