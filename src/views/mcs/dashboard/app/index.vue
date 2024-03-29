<template>
  <div>
    <div id="data-view">
      <!-- <dv-full-screen-container> -->
        <top-header />

        <div class="main-rows">
          <dv-border-box-12 style="width:33%;height:auto;padding:12px">
            <left-top></left-top>
            <notice-list></notice-list>
            <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
            <div>
            <div class="block-left-content">
              <table>
                <tr>
                  <td>
                    <scroll-board />
                  </td>
                  <td>
                    <scroll-board />
                  </td>
                </tr>
              </table>
            </div>
            <div class="block-left-content">
              <table>
                <tr>
                  <td>
                    <scroll-board />
                  </td>
                  <td>
                    <scroll-board />
                  </td>
                </tr>
              </table>
            </div>
        </div>
          </dv-border-box-12>
          <dv-border-box-12 style="width:47%;height:auto;padding:2px 2px">
            <center-top></center-top>
            <center-bottom></center-bottom>
          </dv-border-box-12>
          <dv-border-box-12 style="width:20%;height:auto">
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '自有车', value: 355},{name: '已出车', value: 39},{name: '停驶中', value: 9}],colors: ['#32c5e9', '#96bfff','#e062ae', '#fb7293', '#e690d1'],unit: '辆',showValue: true}" style="height:150px" />
            </div>
            <div style="margin:12px">
              <dv-capsule-chart :config="{data:[{name: '外租车', value: 2189},{name: '今日调配', value: 210}],colors: ['#32c5e9', '#96bfff','#e062ae', '#fb7293', '#e690d1'],unit: '辆',showValue: true}" style="height:100px" />
            </div>
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
          </dv-border-box-12>
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
import noticeList from "./noticeList.vue";
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
    noticeList,
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
    margin:10px 10px -7px;
    background-color: rgba(6, 30, 93, 0.5);

    .dv-decoration-2 {
      position: absolute;
      width: 95%;
      left: 2.5%;
      height: 5px;
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
      width: 33%;
      padding:10px;
      text-align: center;
      flex-direction: column;
      border-left: 3px solid rgb(6, 30, 93);
      border-right: 3px solid rgb(6, 30, 93);
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
