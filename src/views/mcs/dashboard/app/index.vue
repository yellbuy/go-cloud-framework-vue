<template>
  <div>
    <div id="data-view">
      
      <dv-full-screen-container v-if="isFullScreen">
        <top-header />
        <div style="position:absolute;top:10px;left:10px">
          <dv-button @click="onChangeScreen" border="Border4" color="#a6559d" style="margin:10px;z-index:99999999;">{{screenIndex==0?'大屏一':'大屏二'}}</dv-button>
        </div>   
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows" v-if="screenIndex==0">
          <dv-border-box-1 style="width:30%;padding:0px 0.5vh">
            <div>
              <tbWaybillStat :timeMode="1"></tbWaybillStat>
            </div>
            <div>
              <notice-list></notice-list>
            </div>
          </dv-border-box-1>
          <dv-border-box-12 style="width:40%;padding:0.5vh">
            <ringProgressList title="年运量完成情况（公路）" modelName="waybill" kind="freight" timeSpan="year" :limit="5"></ringProgressList>
            <ringProgressList title="月运量完成情况（公路）" modelName="waybill" kind="freight" timeSpan="month" :limit="5"></ringProgressList>
            <ringProgressList title="年运量完成情况（铁运）" modelName="businessBill" kind="main_business" timeSpan="year" :limit="5"></ringProgressList>
            <ringProgressList title="月运量完成情况（铁运）" modelName="businessBill" kind="main_business" timeSpan="month" :limit="5"></ringProgressList>
            <!-- <center-top></center-top>
            <center-bottom></center-bottom> -->
            <!-- <dv-decoration-3 style="width: 100%;" /> -->
            
            <!-- <center-bottom></center-bottom> -->
          </dv-border-box-12>
          <dv-border-box-12 style="width:30%;padding:0px 2px;height:auto;">
            <div>
              <tbVehicleStat></tbVehicleStat>
            </div>
            <div style="display:flex;align-items:center;justify-content:center">
                <div style="width:100%">
                  <div class="block-left-content">
                    <barWaybillBoard :chartHeight="30"/>
                  </div>
                  <div class="block-left-content">
                    <barMainBusinessBoard :chartHeight="30"/>
                  </div>
                </div>
                <div style="width:100%">
                  <div class="block-left-content">
                    <barTradeBoard :chartHeight="30"/>
                  </div>
                  <div class="block-left-content">
                    <barWarehouseRateBoard :chartHeight="30"/>
                  </div>
                </div>
              </div>
          </dv-border-box-12>
        </div>
        <div class="main-rows" v-else>
          <dv-border-box-1 style="width:30%;padding:0px 0.5vh">
            <div>
              <tbWaybillStat :timeMode="2"></tbWaybillStat>
            </div>
            <div>
              <notice-list></notice-list>
            </div>
          </dv-border-box-1>
          <dv-border-box-12 style="width:40%;height:auto;padding:0.5vh">           
            <!-- 本年 -->            
            <tbEnergyBillStat :timeMode="7"></tbEnergyBillStat>
             <!-- 本月 -->
             <tbEnergyBillStat :timeMode="3"></tbEnergyBillStat>
          </dv-border-box-12>
          <dv-border-box-12 style="width:30%;padding:0px 0.5vh">
            
            <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
            <div>
              <!-- <dv-decoration-3 style="width: 100%;" /> -->
              <!-- <div class="block-left-content">
                <barWaybillBoard />
              </div> -->
              <div class="block-left-content">
                <lineEnergyBoard :chartHeight="22"/>
              </div>
              <div class="block-left-content">
                <lineRepairBoard :chartHeight="22"/>
              </div>
          </div>
          </dv-border-box-12>
        </div>
      </dv-full-screen-container>
      <div v-else>
        <top-header />
        <div style="position:absolute;top:10px;left:10px">
          <dv-button @click="onChangeScreen" border="Border4" color="#a6559d" style="margin:10px;z-index:99999999;">{{screenIndex==0?'大屏一':'大屏二'}}</dv-button>
        </div>   
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows" v-if="screenIndex==0">
          <dv-border-box-1 style="width:30%;padding:0px 0.5vh">
            <div>
              <tbWaybillStat :timeMode="1"></tbWaybillStat>
            </div>
            <div>
              <notice-list></notice-list>
            </div>
          </dv-border-box-1>
          <dv-border-box-12 style="width:40%;padding:0.5vh;height:auto">
            <ringProgressList title="年运量完成情况（公路）" modelName="waybill" kind="freight" timeSpan="year" :limit="5"></ringProgressList>
            <ringProgressList title="月运量完成情况（公路）" modelName="waybill" kind="freight" timeSpan="month" :limit="5"></ringProgressList>
            <ringProgressList title="年运量完成情况（铁运）" modelName="businessBill" kind="main_business" timeSpan="year" :limit="5"></ringProgressList>
            <ringProgressList title="月运量完成情况（铁运）" modelName="businessBill" kind="main_business" timeSpan="month" :limit="5"></ringProgressList>
            <!-- <center-top></center-top>
            <center-bottom></center-bottom> -->
            <!-- <dv-decoration-3 style="width: 100%;" /> -->
            
            <!-- <center-bottom></center-bottom> -->
          </dv-border-box-12>
          <dv-border-box-12 style="width:30%;padding:0px 2px;height:auto;">
            <div>
              <tbVehicleStat></tbVehicleStat>
            </div>
            <div style="display:flex;align-items:center;justify-content:center">
                <div style="width:100%">
                  <div class="block-left-content">
                    <barWaybillBoard :chartHeight="30"/>
                  </div>
                  <div class="block-left-content">
                    <barMainBusinessBoard :chartHeight="30"/>
                  </div>
                </div>
                <div style="width:100%">
                  <div class="block-left-content">
                    <barTradeBoard :chartHeight="30"/>
                  </div>
                  <div class="block-left-content">
                    <barWarehouseRateBoard :chartHeight="30"/>
                  </div>
                </div>
              </div>
          </dv-border-box-12>
        </div>
        <div class="main-rows" v-else>
          <dv-border-box-1 style="width:30%;padding:0px 0.5vh">
            <div>
              <tbWaybillStat :timeMode="2"></tbWaybillStat>
            </div>
            <div>
              <notice-list></notice-list>
            </div>
          </dv-border-box-1>
          <dv-border-box-12 style="width:40%;height:auto;padding:0.5vh">           
            <!-- 本年 -->            
            <tbEnergyBillStat :timeMode="7"></tbEnergyBillStat>
             <!-- 本月 -->
             <tbEnergyBillStat :timeMode="3"></tbEnergyBillStat>
          </dv-border-box-12>
          <dv-border-box-12 style="width:30%;padding:0px 0.5vh">
            
            <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
            <div>
              <!-- <dv-decoration-3 style="width: 100%;" /> -->
              <!-- <div class="block-left-content">
                <barWaybillBoard />
              </div> -->
              <div class="block-left-content">
                <lineEnergyBoard :chartHeight="22"/>
              </div>
              <div class="block-left-content">
                <lineRepairBoard :chartHeight="22"/>
              </div>
          </div>
          </dv-border-box-12>
        </div>
        <!-- 全屏结束 -->
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
import capshuleVehicleCountStat from "./capshuleVehicleCountStat.vue";
import cards from "./cards.vue";
import centerBottom from "./centerBottom.vue";
import centerTop from "./centerTop.vue";
import digitalFlop from "./digitalFlop.vue";
import lineEnergyBoard from "./lineEnergyBoard.vue";
import lineRepairBoard from "./lineRepairBoard.vue";
import noticeList from "./noticeList.vue";
import rankingBoard from "./rankingBoard.vue";
import ringProgressList from "./ringProgressList.vue";
import roseChart from "./roseChart.vue";
import scrollBoard from "./scrollBoard.vue";
import scrollBoardAmount from "./scrollBoardAmount.vue";
import tbEnergyBillStat from "./tbEnergyBillStat.vue";
import tbVehicleStat from "./tbVehicleStat.vue";
import tbWaybillStat from "./tbWaybillStat.vue";
import topHeader from "./topHeader.vue";
import waterLevelChart from "./waterLevelChart.vue";

export default {
  name: "DataView",
  components: {
    topHeader,
    ringProgressList,
    tbVehicleStat,
    tbWaybillStat,
    tbEnergyBillStat,
    lineEnergyBoard,
    lineRepairBoard,
    centerTop,
    centerBottom,
    noticeList,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    barWaybillBoard,
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
        screenIndex:0
    })
    const onFullScreen = () => {
			//admin/dashboard/app/fullScreen
      state.isFullScreen=!state.isFullScreen
		};
    const onChangeScreen = () => {
			//admin/dashboard/app/fullScreen
      state.screenIndex=state.screenIndex==0?1:0
		};
    return {
      onFullScreen,
      onChangeScreen,
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
    margin-top: 20px;
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
    width:100%;
    margin-top:2vh;
    background-color:rgba(6, 30, 93, 0.5);
    flex-direction: column;
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
