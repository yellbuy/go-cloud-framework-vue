<template>
  <div>
    <div id="data-view">
      
      <dv-full-screen-container v-if="isFullScreen">
        <top-header />
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows">
          <dv-border-box-12 style="width:67%;height:auto;padding:2px 2px">
            <digital-weight-stat></digital-weight-stat>
            <!-- <dv-decoration-3 style="width: 100%;" /> -->
            <div class="main-rows">
              <div class="block-left-content">
                <barWaybillBoard />
              </div>
              <div class="block-left-content">
                <barMainBusinessBoard />
              </div>
            </div>
            <div class="main-rows">
              <div class="block-left-content">
                <rankWaybillCompany :chartHeight="300"/>
              </div>
              <div class="block-left-content">
                <rankWaybillCustomer :chartHeight="300"/>
              </div>
            </div>
            <!-- <center-bottom></center-bottom> -->
          </dv-border-box-12>
          <dv-border-box-12 style="width:33%;height:auto;padding:12px">
            <!-- <left-top></left-top>
            <notice-list></notice-list> -->
            <ringGoodsStat/>
            <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
            <div>
              <vehicle-list></vehicle-list>
              <!-- <div class="block-left-content">
                <barWaybillBoard />
              </div> -->
<!--               
              <div class="block-left-content">
                <barTradeBoard />
              </div>
              <div class="block-left-content">
                <barWarehouseRateBoard chartHeight="300px"/>
              </div>
              <div class="block-left-content">
                <mainBusinessBoard />
              </div> -->
          </div>
          </dv-border-box-12>
          
          <!-- <dv-border-box-12 style="width:20%;height:auto">
            <capshuleVehicleCountStat/>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '自有货运车', value: 48},{name: '当日已出车', value: 39},{name: '停驶中', value: 9}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '自有乘用车', value: 255},{name: '当日已出车', value: 201},{name: '停驶中', value: 24}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '工程机械车', value: 34},{name: '装载机', value: 24},{name: '挖掘机', value: 2}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '自有货运车', value: 48},{name: '当日已出车', value: 39},{name: '停驶中', value: 9}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '其他特种车', value: 48},{name: '搅拌罐车', value: 19},{name: '当日已出车', value: 10}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
          </dv-border-box-12> -->
        </div>
        
      </dv-full-screen-container>
      <div v-else>
        <top-header />
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows">
          <dv-border-box-12 style="width:67%;height:auto;padding:2px">
            <digital-weight-stat></digital-weight-stat>
            <!-- <dv-decoration-3 style="width: 100%;" /> -->
            <div class="main-rows">
              <div class="block-left-content">
                <barWaybillBoard />
              </div>
              <div class="block-left-content">
                <barMainBusinessBoard />
              </div>
            </div>
            <div class="main-rows">
              <div class="block-left-content">
                <rankWaybillCompany :chartHeight="300"/>
              </div>
              <div class="block-left-content">
                <rankWaybillCustomer :chartHeight="300"/>
              </div>
            </div>
            <!-- <center-bottom></center-bottom> -->
          </dv-border-box-12>
          <dv-border-box-12 style="width:33%;height:auto;padding:12px">
            <!-- <left-top></left-top>
            <notice-list></notice-list> -->
            <ringGoodsStat/>
            <vehicle-list></vehicle-list>
            <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
            <div>
              <!-- <dv-decoration-3 style="width: 100%;" /> -->
              <!-- <div class="block-left-content">
                <barWaybillBoard />
              </div> -->
              
              <!-- <div class="block-left-content">
                <barTradeBoard :chartHeight="300"/>
              </div>
              <div class="block-left-content">
                <barWarehouseRateBoard :chartHeight="300"/>
              </div> -->
              <!-- <div class="block-left-content">
                <mainBusinessBoard />
              </div> -->
          </div>
          </dv-border-box-12>
          
          <!-- <dv-border-box-12 style="width:20%;height:auto">
            <capshuleVehicleCountStat/>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '自有货运车', value: 48},{name: '当日已出车', value: 39},{name: '停驶中', value: 9}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '自有乘用车', value: 255},{name: '当日已出车', value: 201},{name: '停驶中', value: 24}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '工程机械车', value: 34},{name: '装载机', value: 24},{name: '挖掘机', value: 2}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '自有货运车', value: 48},{name: '当日已出车', value: 39},{name: '停驶中', value: 9}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '其他特种车', value: 48},{name: '搅拌罐车', value: 19},{name: '当日已出车', value: 10}],colors: ['#fb7293','#32c5e9', '#96bfff','#e062ae',  '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
          </dv-border-box-12> -->
        </div>
        
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
import digitalFlop from "./digitalFlop.vue";
import digitalWeightStat from "./digitalWeightStat.vue";
import leftTop from "./tbWaybillStat.vue";
import noticeList from "./noticeList.vue";
import ringGoodsStat from "./ringGoodsStat.vue";
import rankingBoard from "./rankingBoard.vue";
import rankWaybillCompany from "./rankWaybillCompany.vue";
import rankWaybillCustomer from "./rankWaybillCustomer.vue";
import roseChart from "./roseChart.vue";
import scrollBoard from "./scrollBoard.vue";
import scrollBoardAmount from "./scrollBoardAmount.vue";
import topHeader from "./topHeader.vue";
import vehicleList from "./rankVehicleList.vue";
import waterLevelChart from "./waterLevelChart.vue";

export default {
  name: "ExternalDashboard",
  components: {
    topHeader,
    leftTop,
    digitalWeightStat,
    centerBottom,
    noticeList,
    ringGoodsStat,
    vehicleList,
    digitalFlop,
    rankingBoard,
    rankWaybillCompany,
    rankWaybillCustomer,
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
    margin-top:10px;
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
