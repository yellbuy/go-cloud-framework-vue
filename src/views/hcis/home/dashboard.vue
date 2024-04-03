<template>
    <div>
      <div id="data-view">
        <!-- <dv-full-screen-container> -->
                <top-header />
                <dv-border-box-12 style="width:98%;height:auto;padding:6px;margin-left:1%;margin-right:1%;">
                    <div class="digital-container">
                    <div class="flex-row">
                        <div class="digital-flop-item">
                        <div class="unit">筛查总数</div>
                        <div>
                            <img style="width:96px;height:96px;" src="/img/hcis/hcis_img1.png" />
                        </div>
                        <dv-digital-flop
                            :config="{number:[1000],content: '{nt} 人',style:{fill: '#f46827',fontWeight: 'bold',fontSize:16}}"
                            style="width: 100%; height: 24px;"
                        />
                        </div>
                        <div class="digital-flop-item">
                        <div class="unit">风险人群</div>
                        <div>
                            <img style="width:96px;height:96px;" src="/img/hcis/hcis_img2.png" />
                        </div>
                        <dv-digital-flop
                            :config="{number:[20],content: '{nt} 人',style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:16}}"
                            style="width: 100%; height: 24px"
                        />
                        </div>
                        <div class="digital-flop-item">
                            <div class="unit">参与干预人数</div>
                            <div>
                            <img style="width:96px;height:96px;" src="/img/hcis/hcis_img3.png" />
                        </div>
                            <dv-digital-flop
                                :config="{number:[50],content: '{nt} 人',style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:16}}"
                                style="width: 100%; height: 24px"
                            />
                        </div>
                        <div class="digital-flop-item">
                            <div class="unit">干预课程开展</div>
                            <div>
                                <img style="width:96px;height:96px;" src="/img/hcis/hcis_img4.png" />
                            </div>
                            <div>
                                <dv-digital-flop
                                :config="{number:[100],content: '{nt} 次',style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:16}}"
                                style="width: 100%; height: 24px"/>
                            </div>
                            
                        </div>
                    </div>
                    <!-- <Decoration2 style="width:200px; height:5px;" /> -->
                    <dv-decoration-2 />
                </div>
                </dv-border-box-12>
                <div class="main-rows">
                    <dv-border-box-13 style="width:24%;height:300px;padding-top:2px;margin-left:1%;margin-right:0;text-align:center;">
                        <h1 style="margin-top:20px">年龄段分析</h1>
                        <div style="width:100%;text-align: center;">
                            <dv-active-ring-chart  :config="{lineWidth: 30,showOriginValue:false,digitalFlopStyle:{fontSize: 18,fill: '#fff'},color:['#79bbff','#95d475','#eebe77','f89898'], data: [{ name: '< 65岁',value: 55},{name: '65-80岁',value: 120},{name: '> 80岁',value: 78}]}" style="width:100%;height:280px;"/>
                        </div>
                        
                    </dv-border-box-13>
                    <dv-border-box-13 :reverse="true" style="width:74%;height:300px;padding:2px;margin-left:1%;margin-right:1%;text-align:center;">
                        <h1 style="margin-top:20px">风险等级分析</h1>
                        <scroll-board />
                    </dv-border-box-13>
                </div>
                <div class="main-rows">
                    <dv-border-box-13 style="width:24%;height:300px;padding-top:2px;margin-left:1%;margin-right:0;text-align:center;">
                        <h1 style="margin-top:20px">干预效果分析</h1>
                        <div style="width:100%;text-align: center;">
                            <dv-active-ring-chart  :config="{lineWidth: 30,showOriginValue:false,digitalFlopStyle:{fontSize: 18,fill: '#fff'},color:['#F56C6C','#c45656','#409EFF','#67C23A','#E6A23C'], data: [{ name: '非常好',value: 55},{name: '好',value: 120},{name: '一般',value: 78},{name: '没意思',value: 15},{name: '无法评估',value: 12}]}" style="width:100%;height:280px;"/>
                        </div>
                        
                    </dv-border-box-13>
                    <dv-border-box-13 :reverse="true" style="width:74%;height:300px;padding:2px;margin-left:1%;margin-right:1%;text-align:center;">
                        <h1 style="margin-top:20px">跟进方式分析</h1>
                        <scroll-board />
                    </dv-border-box-13>
                </div>
            <!-- </dv-full-screen-container> -->
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import cards from "./cards.vue";
import centerBottom from "./centerBottom.vue";
import centerTop from "./centerTop.vue";
import digitalFlop from "./digitalFlop.vue";
import leftTop from "./leftTop.vue";
import rankingBoard from "./rankingBoard.vue";
import roseChart from "./roseChart.vue";
import scrollBoard from "./scrollBoard.vue";
import scrollBoardAmount from "./scrollBoardAmount.vue";
import topHeader from "./topHeader.vue";
import waterLevelChart from "./waterLevelChart.vue";
  
  export default {
  
    name: "DataView",
    components: {
      topHeader,
      leftTop,
      centerTop,
      centerBottom,
      digitalFlop,
      rankingBoard,
      roseChart,
      waterLevelChart,
      scrollBoard,
      cards,
      scrollBoardAmount,
    },
    setup() {
      function showDialog() {
        console.log("点击事件");
      }
      return {
        showDialog,
        dialogVisible: false,
      };
    },
  };
  </script>
  
  <style lang="less">
    .digital-container {
    //   margin:10px 10px -7px;
      background-color: rgba(6, 30, 93, 0.5);
  
      .dv-decoration-2 {
        position: absolute;
        width: 95%;
        left: 2.5%;
        height: 2px;
        bottom: 0px;
      }
  
      .flex-row {
        display: flex;
        flex-direction: row;
        align-content: center;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
      .digital-flop-item {
        width: 25%;
        padding-top:20px;
        padding-bottom:20px;
        text-align: center;
        flex-direction: column;
        border-left: 2px solid rgb(6, 30, 93);
        border-right: 2px solid rgb(6, 30, 93);
      }
  
      
    }
    .digital-title {
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        text-align: center;
        font-size: 20px;
        padding-top:10px;
        margin-bottom: 10px;
      }
  
    .unit {
      margin-left: 10px;
      box-sizing: border-box;
      padding-bottom: 8px;
    }
  </style>
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
  