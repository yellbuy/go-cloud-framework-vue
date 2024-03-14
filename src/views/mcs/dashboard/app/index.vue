<template>
  <div>
    <div id="data-view">
      <!-- <dv-full-screen-container> -->
        <top-header />

        <div class="main-rows">
          <dv-border-box-12 style="width:33%;height:600px;padding:12px">
            <div>
              <p>
                <span style="color:white;font-size: 16pt;margin-right: 16px;">3月13日运量情况</span> 
                共<span style="color:lightblue;font-size: 12pt;margin-left:4px;margin-right:4px">30</span>
                出<span style="color:lightgreen;font-size: 12pt;margin-left:4px;margin-right:4px">20</span>
                停<span style="color:lightsalmon;font-size: 12pt;margin-left:4px">10</span>
              </p>
            </div>
            <div style="margin-top:12px">
              <span style="color:lightgray;font-size: 14pt;margin-right: 4px;">主要业务完成情况</span>
            </div>
            <table>
              <tr>
                <td style="width:33% !important">汽运一分公司</td>
                <td style="width:67% !important">
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>汽运二分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>米易分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>西昌分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>铁运公司</td>
                <trade-line-edit>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </trade-line-edit>
              </tr>
              <tr>
                <td>贸易公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>成都分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>知邻智联</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
            </table>
            <div style="margin-top:12px">
              <p>
                <span style="color:white;font-size: 16pt;margin-right: 16px;">3月13日临配用车情况</span> 
                共<span style="color:lightblue;font-size: 12pt;margin-left:4px;margin-right:4px">18</span>
                出<span style="color:lightgreen;font-size: 12pt;margin-left:4px;margin-right:4px">12</span>
                停<span style="color:lightsalmon;font-size: 12pt;margin-left:4px">6</span>
              </p>
            </div>
            <div style="margin-top:12px">
              <span style="color:lightgray;font-size: 14pt;margin-right: 4px;">主要业务完成情况</span>
            </div>
            <table>
              <tr>
                <td style="width:33% !important">汽运一分公司</td>
                <td style="width:67% !important">
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>汽运二分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>米易分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>西昌分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>铁运公司</td>
                <trade-line-edit>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </trade-line-edit>
              </tr>
              <tr>
                <td>贸易公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>成都分公司</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
              <tr>
                <td>知邻智联</td>
                <td>
                  <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" />
                </td>
              </tr>
            </table>
          </dv-border-box-12>
          <dv-border-box-12 style="width:34%;height:auto">
            <div class="digital-container">
              <div class="digital-title">年运量（公路）</div>
              <div class="flex-row">
                  <div class="digital-flop-item">
                    <div class="unit">计划</div>
                    <dv-digital-flop
                      :config="{number:[100000.59],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px;"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">完成</div>
                    <dv-digital-flop
                      :config="{number:[99900.59],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">超/欠</div>
                    <dv-digital-flop
                      :config="{number:[100],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                </div>
                <!-- <Decoration2 style="width:200px; height:5px;" /> -->
              <dv-decoration-2 />
            </div>
            <div class="digital-container">
              <div class="digital-title">月运量（公路）</div>
              <div class="flex-row">
                  <div class="digital-flop-item">
                    <div class="unit">计划</div>
                    <dv-digital-flop
                      :config="{number:[10000.59],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">完成</div>
                    <dv-digital-flop
                      :config="{number:[9990.59],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">超/欠</div>
                    <dv-digital-flop
                      :config="{number:[10],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                </div>
                <!-- <Decoration2 style="width:200px; height:5px;" /> -->
              <dv-decoration-2 />
            </div>
            <div class="digital-container">
              <div class="digital-title">日运量（公路）</div>
              <div class="flex-row">
                  <div class="digital-flop-item">
                    <div class="unit">计划</div>
                    <dv-digital-flop
                      :config="{number:[1000.59],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">完成</div>
                    <dv-digital-flop
                      :config="{number:[999.59],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">超/欠</div>
                    <dv-digital-flop
                      :config="{number:[1],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                </div>
                <!-- <Decoration2 style="width:200px; height:5px;" /> -->
              <dv-decoration-2 />
            </div>
            <div class="digital-container">
              <div class="flex-row">
                <div class="digital-flop-item">
                  <div class="unit">年计划完成情况</div>
                  <dv-water-level-pond style="width:100%;height:120px" :config="{ data: [45], shape: 'round', waveHeight: 5, waveNum: 5}" />
                </div>
                <div class="digital-flop-item">
                  <div class="unit">月计划完成情况</div>
                  <dv-water-level-pond style="width:100%;height:120px" :config="{ data: [35], shape: 'round', waveHeight: 5, waveNum: 5}" />
                </div>
                <div class="digital-flop-item">
                  <div class="unit">日计划完成情况</div>
                  <dv-water-level-pond style="width:100%;height:120px" :config="{ data: [25], shape: 'round', waveHeight: 5, waveNum: 5}" />
                </div>
                  <!-- <Decoration2 style="width:200px; height:5px;" /> -->
                <dv-decoration-2 />
              </div>
            </div>
            <div class="digital-container">
              <div class="digital-title">年运量（铁路）</div>
              <div class="flex-row">
                  <div class="digital-flop-item">
                    <div class="unit">计划</div>
                    <dv-digital-flop
                      :config="{number:[100000.59],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">完成</div>
                    <dv-digital-flop
                      :config="{number:[99900.59],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">超/欠</div>
                    <dv-digital-flop
                      :config="{number:[100],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                </div>
                <!-- <Decoration2 style="width:200px; height:5px;" /> -->
              <dv-decoration-2 />
            </div>
            <div class="digital-container">
              <div class="digital-title">月运量（铁路）</div>
              <div class="flex-row">
                  <div class="digital-flop-item">
                    <div class="unit">计划</div>
                    <dv-digital-flop
                      :config="{number:[10000.59],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">完成</div>
                    <dv-digital-flop
                      :config="{number:[9990.59],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">超/欠</div>
                    <dv-digital-flop
                      :config="{number:[10],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                </div>
                <!-- <Decoration2 style="width:200px; height:5px;" /> -->
              <dv-decoration-2 />
            </div>
            <div class="digital-container">
              <div class="digital-title">日运量（铁路）</div>
              <div class="flex-row">
                  <div class="digital-flop-item">
                    <div class="unit">计划</div>
                    <dv-digital-flop
                      :config="{number:[1000.59],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">完成</div>
                    <dv-digital-flop
                      :config="{number:[999.59],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                  <div class="digital-flop-item">
                    <div class="unit">超/欠</div>
                    <dv-digital-flop
                      :config="{number:[1],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
                      style="width: 100%; height: 24px"
                    />
                    <div class="unit">吨</div>
                  </div>
                </div>
                <!-- <Decoration2 style="width:200px; height:5px;" /> -->
              <dv-decoration-2 />
            </div>
            <div class="digital-container" >
              <div class="flex-row" style="margin-bottom:16px">
                <div class="digital-flop-item">
                  <div class="unit">年计划完成情况</div>
                  <dv-water-level-pond style="width:100%;height:120px" :config="{ data: [45], shape: 'round', waveHeight: 5, waveNum: 5}" />
                </div>
                <div class="digital-flop-item">
                  <div class="unit">月计划完成情况</div>
                  <dv-water-level-pond style="width:100%;height:120px" :config="{ data: [35], shape: 'round', waveHeight: 5, waveNum: 5}" />
                </div>
                <div class="digital-flop-item">
                  <div class="unit">日计划完成情况</div>
                  <dv-water-level-pond style="width:100%;height:120px" :config="{ data: [25], shape: 'round', waveHeight: 5, waveNum: 5}" />
                </div>
                  <!-- <Decoration2 style="width:200px; height:5px;" /> -->
                <dv-decoration-2 />
              </div>
            </div>
          </dv-border-box-12>
          <dv-border-box-12 style="width:33%;height:600px">
            <div style="margin:12px">
              <p>
                <span style="color:white;font-size: 16pt;margin-right: 4px;">3月13日运量情况</span> 
              共<span style="color:lightblue;font-size: 12pt;margin-left:4px;margin-right:4px">30</span>
              出<span style="color:lightgreen;font-size: 12pt;margin-left:4px;margin-right:4px">20</span>
              停<span style="color:lightsalmon;font-size: 12pt;margin-left:4px">10</span>
            </p>
            </div>
          </dv-border-box-12>
        </div>
        <div class="main-content">
          
          <digital-flop />

          <div class="block-left-right-content">
            <div class="block-top-bottom-content">
              <div class="block-top-content">
                <ranking-board />

                <rose-chart />

                <water-level-chart />
              </div>

              <cards />
            </div>
            <div class="block-left-content">
              <scroll-board />
              <scroll-board-amount />
            </div>
          </div>
        </div>
      <!-- </dv-full-screen-container> -->
    </div>
  </div>
</template>

<script lang="ts">
import cards from "./cards.vue";
import digitalFlop from "./digitalFlop.vue";
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
</style>
