<template>
  <div>
    <div id="data-view">
      
      <dv-full-screen-container v-if="isFullScreen">
        <top-header />
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows">
          
          <div style="width:33%;">
            
            <div style="height:auto;padding:0px;">
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
              <barWeightBoard />
            </div>
          </div>
          <dv-border-box-12 style="width:67%;height:auto;padding:30px">
            <!-- <ringGoodsStat/> -->
            <!-- <div style="width:100%;height:400px;background-image:url('./img/map_sichuan.png');background-repeat: no-repeat;background-size: cover;background-position: center;"></div> -->
            
            <div style="width:100%;" >

              
              <div style="position: absolute;left:30px;top:30px;">
                <dv-capsule-chart style="width:25rem;height:12rem"  :config="{data: [
                  {
                    name: '一公司',
                    value: 167
                  },
                  {
                    name: '二公司',
                    value: 123
                  },
                  {
                    name: '汉盛物流',
                    value: 98
                  },
                  {
                    name: '汉佳物流',
                    value: 180
                  }
                ],
                colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                unit: '万吨',
                showValue:true,
                fontSize:16,
                labelNum: 8,
              }"  />
              </div>
              <dv-flyline-chart :config="mapConfig" :dev="true" style="width:100%;height:540px;" />
            </div>
            
            
            <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
            <div>
              
          </div>
          </dv-border-box-12>
        </div>
        <div class="main-rows">
          
          <div style="width:33%;">
            <rankWaybillCompany :chartHeight="200"/>
          </div>
          <div style="width:34%;">
            <rankWaybillCustomer :chartHeight="200"/>
          </div>
          <div style="width:33%;">
            <vehicle-list></vehicle-list>
          </div>
        </div>
        
      </dv-full-screen-container>
      <div v-else>
        <top-header />
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <div class="main-rows">
          
          <div style="width:33%;">
            
            <div style="height:auto;padding:0px;">
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
              <barWeightBoard />
            </div>
          </div>
          <dv-border-box-12 style="width:67%;height:auto;padding:30px">
            <!-- <ringGoodsStat/> -->
            <!-- <div style="width:100%;height:400px;background-image:url('./img/map_sichuan.png');background-repeat: no-repeat;background-size: cover;background-position: center;"></div> -->
            
            <div style="width:100%;" >

              
              <div style="position: absolute;left:30px;top:30px;">
                <dv-conical-column-chart :config="{data: [
                  {
                    name: '一公司',
                    value: 167
                  },
                  {
                    name: '二公司',
                    value: 123
                  },
                  {
                    name: '汉盛物流',
                    value: 98
                  },
                  {
                    name: '汉佳物流',
                    value: 180
                  }
                ],
                //textColor:'#e062ae',
                columnColor:'rgba(204, 102, 153, 0.6)',
                colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                unit: '万吨',
                showValue:true,
                fontSize:16,
                labelNum: 8,
              }" style="width:25rem;height:12rem;" />

                <!-- <dv-capsule-chart style="width:25rem;height:12rem"  :config="{data: [
                  {
                    name: '一公司',
                    value: 167
                  },
                  {
                    name: '二公司',
                    value: 123
                  },
                  {
                    name: '汉盛物流',
                    value: 98
                  },
                  {
                    name: '汉佳物流',
                    value: 180
                  }
                ],
                colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                unit: '万吨',
                showValue:true,
                fontSize:16,
                labelNum: 8,
              }"  />-->
              </div> 
              <dv-flyline-chart :config="mapConfig" :dev="true" style="width:100%;height:540px;" />
            </div>
            
            
            <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
            <div>
              
          </div>
          </dv-border-box-12>
        </div>
        <div class="main-rows">
          
          <div style="width:33%;">
            <rankWaybillCompany :chartHeight="300"/>
          </div>
          <div style="width:34%;">
            <vehicle-list></vehicle-list>
            
          </div>
          <div style="width:33%;height:auto;">
            <rankWaybillCustomer :chartHeight="300"/>
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
import barWeightBoard from "./barWeightBoard.vue";
import capshuleVehicleCountStat from "./capshuleVehicleCountStat.vue";
import cards from "./cards.vue";
import centerBottom from "./centerBottom.vue";
import digitalFlop from "./digitalFlop.vue";
import digitalGoodsStat from "./digitalGoodsStat.vue";
import digitalWeightStat from "./digitalWeightStat.vue";
import leftTop from "./leftTop.vue";
import noticeList from "./noticeList.vue";
import rankingBoard from "./rankingBoard.vue";
import rankWaybillCompany from "./rankWaybillCompany.vue";
import rankWaybillCustomer from "./rankWaybillCustomer.vue";
import ringGoodsStat from "./ringGoodsStat.vue";
import roseChart from "./roseChart.vue";
import scrollBoard from "./scrollBoard.vue";
import scrollBoardAmount from "./scrollBoardAmount.vue";
import topHeader from "./topHeader.vue";
import vehicleList from "./vehicleList.vue";
import waterLevelChart from "./waterLevelChart.vue";
import mapImg from "/@/assets/img/map_sichuan.png";

export default {
  name: "ExternalDashboard",
  components: {
    topHeader,
    leftTop,
    digitalWeightStat,
    digitalGoodsStat,
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
    barWeightBoard,
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
        mapConfig:{
          bgImgUrl:mapImg,
          k: 0.5,
          centerPoint: [0.31, 0.78],
          points: [
          {
            position: [0.31, 0.78],
            text: '攀枝花',
          },{
            position: [0.42, 0.58],
            text: '西昌',
          },{
            position: [0.36, 0.70],
            text: '米易',
          },{
            position: [0.6, 0.35],
            text: '成都',
          },{
            position: [0.62, 0.12],
            text: '江油',
          }
        ]
        },
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
