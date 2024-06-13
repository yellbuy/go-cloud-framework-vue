<template>
  <div>
    <div id="data-view">
      
      <dv-full-screen-container v-if="isFullScreen">
        <top-header />
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows">
          <div style="width:33%;margin-top:-2px;margin-bottom:-2px;">
            <dv-border-box1>
              <div style="height:auto;padding:10px;">
                <digital-weight-stat></digital-weight-stat>
              </div>
              <!-- <dv-border-box-9 style="height:auto;padding:2px 10px 20px 10px;">
                <digital-goods-stat></digital-goods-stat>
              </dv-border-box-9> -->
              <div style="height:auto;padding:0px;">
                <digital-goods-stat></digital-goods-stat>
              </div>
              <!-- <dv-decoration-3 style="width: 100%;" /> -->
              <div>
                <lineWeightBoard />
              </div>
            </dv-border-box1>
          </div>
          <dv-border-box-12 style="width:67%;height:auto;">
            <div style="flex: 1; display: flex; flex-direction: row;">
              <div style="width:60%;height:auto;padding:20px">
                <div>
                  <mapSichuan />
                </div>
                <div>
                  <rankLineList></rankLineList>
                </div>
              </div>
              <div style="width:40%;height:auto;padding:20px 20px 0px 0px">
                <div>
                  <pieGoods />
                </div>
                <div>
                  <pieVehicleType />
                </div>
              </div>
            </div>
            
          </dv-border-box-12>
        </div>
        <div class="main-rows">
          
          <div style="width:33%;">
            <barWaybillCompany :chartHeight="320"/>
          </div>
          <div style="width:34%;">
            <digitalVehicleStat></digitalVehicleStat>
          </div>
          <div style="width:33%;height:auto;">
            <barWaybillCustomer :chartHeight="320"/>
          </div>
          
        </div>
      </dv-full-screen-container>
      <div v-else>
        <top-header />
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows">
          <div style="width:33%;margin-top:-2px;margin-bottom:-2px;">
            <dv-border-box1>
              <div style="height:auto;padding:10px;">
                <digital-weight-stat></digital-weight-stat>
              </div>
              <!-- <dv-border-box-9 style="height:auto;padding:2px 10px 20px 10px;">
                <digital-goods-stat></digital-goods-stat>
              </dv-border-box-9> -->
              <div style="height:auto;padding:0px;">
                <digital-goods-stat></digital-goods-stat>
              </div>
              <!-- <dv-decoration-3 style="width: 100%;" /> -->
              <div>
                <lineWeightBoard />
              </div>
            </dv-border-box1>
          </div>
          <dv-border-box-12 style="width:67%;height:auto;">
            <div style="flex: 1; display: flex; flex-direction: row;">
              <div style="width:60%;height:auto;padding:20px">
                <div>
                  <mapSichuan />
                </div>
                <div>
                  <rankLineList></rankLineList>
                </div>
              </div>
              <div style="width:40%;height:auto;padding:20px 20px 0px 0px">
                <div>
                  <pieGoods />
                </div>
                <div>
                  <pieVehicleType />
                </div>
              </div>
            </div>
            
          </dv-border-box-12>
        </div>
        <div class="main-rows">
          
          <div style="width:33%;">
            <barWaybillCompany :chartHeight="320"/>
          </div>
          <div style="width:34%;">
            <digitalVehicleStat></digitalVehicleStat>
          </div>
          <div style="width:33%;height:auto;">
            <barWaybillCustomer :chartHeight="320"/>
          </div>
          
        </div>
        <!-- </div> 结束 -->
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
import barMainBusinessBoard from "./barMainBusinessBoard.vue";
import barTradeBoard from "./barTradeBoard.vue";
import barWarehouseRateBoard from "./barWarehouseRateBoard.vue";
import barWaybillBoard from "./barWaybillBoard.vue";
import barWaybillCompany from "./barWaybillCompany.vue";
import barWaybillCustomer from "./barWaybillCustomer.vue";
import capshuleVehicleCountStat from "./capshuleVehicleCountStat.vue";
import cards from "./cards.vue";
import centerBottom from "./centerBottom.vue";
import digitalFlop from "./digitalFlop.vue";
import digitalGoodsStat from "./digitalGoodsStat.vue";
import digitalVehicleStat from "./digitalVehicleStat.vue";
import digitalWeightStat from "./digitalWeightStat.vue";
import leftTop from "./leftTop.vue";
import lineWeightBoard from "./lineWeightBoard.vue";
import mapSichuan from "./mapSichuan.vue";
import noticeList from "./noticeList.vue";
import pieGoods from "./pieGoods.vue";
import pieVehicleType from "./pieVehicleType.vue";
import rankingBoard from "./rankingBoard.vue";
import rankLineList from "./rankLineList.vue";
import rankVehicleList from "./rankVehicleList.vue";
import rankWaybillCompany from "./rankWaybillCompany.vue";
import ringGoodsStat from "./ringGoodsStat.vue";
import roseChart from "./roseChart.vue";
import scrollBoard from "./scrollBoard.vue";
import scrollBoardAmount from "./scrollBoardAmount.vue";
import topHeader from "./topHeader.vue";
import waterLevelChart from "./waterLevelChart.vue";

export default {
  name: "ExternalDashboard",
  components: {
    topHeader,
    leftTop,
    digitalWeightStat,
    digitalGoodsStat,
    digitalVehicleStat,
    centerBottom,
    noticeList,
    pieGoods,
    pieVehicleType,
    ringGoodsStat,
    rankVehicleList,
    rankLineList,
    digitalFlop,
    rankingBoard,
    barWaybillCompany,
    rankWaybillCompany,
    barWaybillCustomer,
    roseChart,
    waterLevelChart,
    scrollBoard,
    mapSichuan,
    barWaybillBoard,
    lineWeightBoard,
    barMainBusinessBoard,
    barTradeBoard,
    barWarehouseRateBoard,
    capshuleVehicleCountStat,
    cards,
    scrollBoardAmount,
  },
  setup() {
    const state: any = reactive({
        isFullScreen:false,// 是否全屏
        
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
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-rows {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 10px;
  }

  .block-top-bottom-content {
    width: 75%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 50%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
  .block-left-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    width:100%;
    margin-top:10px;
    background-color:rgba(6, 30, 93, 0.5);
  }
}

@keyframes marquee {
      0% {
          transform: translateX(100%); /* 文字初始位置在右侧 */
      }
      100% {
          transform: translateX(-100%); /* 文字最终位置在左侧 */
      }
  }

  /* 应用动画到文本 */
  .marquee-text {
      white-space: nowrap; /* 文本不换行 */
      overflow: hidden; /* 溢出部分隐藏 */
      width:180px;
      margin-left:180px;
      animation: marquee 8s linear infinite; /* 使用上面定义的动画，持续时间8秒，线性运动，无限循环 */
  }
</style>
