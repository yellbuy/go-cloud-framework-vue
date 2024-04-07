<template>
  <div>
    <div id="data-view">
      <dv-full-screen-container>
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
                          :config="{number:[stat.TotalCount],content: '{nt} 人',style:{fill: '#f46827',fontWeight: 'bold',fontSize:16}}"
                          style="width: 100%; height: 24px;"
                      />
                      </div>
                      <div class="digital-flop-item">
                      <div class="unit">风险人群</div>
                      <div>
                          <img style="width:96px;height:96px;" src="/img/hcis/hcis_img2.png" />
                      </div>
                      <dv-digital-flop
                          :config="{number:[stat.RiskCount],content: '{nt} 人',style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:16}}"
                          style="width: 100%; height: 24px"
                      />
                      </div>
                      <div class="digital-flop-item">
                          <div class="unit">参与干预人数</div>
                          <div>
                          <img style="width:96px;height:96px;" src="/img/hcis/hcis_img3.png" />
                      </div>
                          <dv-digital-flop
                              :config="{number:[stat.InterveneCount],content: '{nt} 人',style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:16}}"
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
                              :config="{number:[stat.TrainCount],content: '{nt} 次',style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:16}}"
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
                          <dv-active-ring-chart  :config="ageConfig" style="width:100%;height:280px;"/>
                      </div>
                      
                  </dv-border-box-13>
                  <dv-border-box-13 :reverse="true" style="width:74%;height:300px;padding:2px;margin-left:1%;margin-right:1%;text-align:center;">
                      <h1 style="margin-top:20px">风险等级分析</h1>
                      <div class="scroll-board">
                        <dv-charts :option="riskOption" style="width: 100%; height:280px;margin:0;padding:0"/>
                      </div>
                  </dv-border-box-13>
              </div>
              <div class="main-rows">
                  <dv-border-box-13 style="width:24%;height:300px;padding-top:2px;margin-left:1%;margin-right:0;text-align:center;">
                      <h1 style="margin-top:20px">干预效果分析</h1>
                      <div style="width:100%;text-align: center;">
                          <dv-active-ring-chart  :config="interveneConfig" style="width:100%;height:280px;"/>
                      </div>
                      
                  </dv-border-box-13>
                  <dv-border-box-13 :reverse="true" style="width:74%;height:300px;padding:2px;margin-left:1%;margin-right:1%;text-align:center;">
                      <h1 style="margin-top:20px">跟进方式分析</h1>
                      <dv-charts :option="followUpOption" style="width: 100%; height:280px;margin:0;padding:0"/>
                  </dv-border-box-13>
              </div>
          </dv-full-screen-container>
      </div>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import cards from "./cards.vue";
import centerBottom from "./centerBottom.vue";
import centerTop from "./centerTop.vue";
import digitalFlop from "./digitalFlop.vue";
import leftTop from "./leftTop.vue";
import rankingBoard from "./rankingBoard.vue";
import riskBoard from "./riskBoard.vue";
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
    riskBoard,
    scrollBoard,
    cards,
    scrollBoardAmount,
  },
  setup() {
    const route = useRoute();
    const kind = route.params.kind || "common";
    const scopeMode = route.params.scopeMode || 0;
    const scopeValue = route.params.scopeValue || 0;
    const { proxy } = getCurrentInstance() as any;
   
    const state: any = reactive({
      stat:{
        TotalCount:0, //筛查总数
        RiskCount        :0, //风险数
        InterveneCount   :0, //干预数
        TrainCount       :0, //培训数
        AgeLt65Count     :0, //年龄小于65
        AgeLt80Count     :0, //年龄65-80
        AgeGte80Count    :0, //年龄大于等于80
        InterveneResult1 :0, //干预效果非常好
        InterveneResult2 :0, //干预效果好
        InterveneResult3 :0, //干预效果一般
        InterveneResult4 :0, //干预效果身体不适
        InterveneResult5 :0, //干预效果没意思
        InterveneResult0 :0, //干预效果无法评价
        RiskHeighCount   :0, //高风险数
        RiskMiddleCount  :0, //中风险数
        RiskLowCount     :0, //低风险数
        FollowUpMode1Count  :0, //转诊医疗机构
        FollowUpMode2Count  :0, //转接专业照护机构
        FollowUpMode3Count  :0, //参与社区干预
        FollowUpMode10Count :0, //其他
      },
    });
    
  // 获取年龄统计
  const ageConfig = computed(() => {
    const list= [{ name: '< 65岁',value:state.stat.AgeLt65Count},
        {name: '65-80岁',value: state.stat.AgeLt80Count},
        {name: '≧ 80岁',value: state.stat.AgeGte80Count}];
        console.log("ageConfig:",ageConfig)
    return {
      lineWidth: 30,
      showOriginValue:false,
      digitalFlopStyle:{fontSize: 18,fill: '#fff'},
      color:['#79bbff','#95d475','#eebe77','f89898'], 
      data: list.filter(item => item.value > 0)
      }
  });

  // 获取干预效果统计
  const interveneConfig = computed(() => {
    const list= [{ name: '非常好',value: state.stat.InterveneResult1},
        {name: '好',value: state.stat.InterveneResult2},
        {name: '一般',value: state.stat.InterveneResult3},
        {name: '身体不适',value: state.stat.InterveneResult4},
        {name: '没意思',value: state.stat.InterveneResult5},
        {name: '无法评估',value: state.stat.InterveneResult0},
      ];
        console.log("interveneConfig:",interveneConfig)
    return {
        lineWidth: 30,
        showOriginValue:false,
        digitalFlopStyle:{fontSize: 18, fill: '#fff'},
        color:['#F56C6C','#c45656','#409EFF','#67C23A','#E6A23C'], 
        data: list.filter(item => item.value > 0)
      }
  });

  // 获取风险统计
  const riskStat = computed(() => {
    return [state.stat.RiskHeighCount,state.stat.RiskMiddleCount,state.stat.RiskLowCount];
  });
    const riskOption:any = reactive({
        legend: {
          data: [
            {
              name: "人数",
              color: "rgba(245, 225, 32, 0.8)",
            },
            // {
            //   name: "完成量",
            //   color: "#ff5ca9",
            // }
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: ["高风险", "中风险", "低风险"],
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#fff",
            },
          },
          axisTick: {
            show: true,
          },
        },
        yAxis: {
          data: "value",
          splitLine: {
            show: true,
          },
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: true,
          },
          min: 0,
        },
        series: [
          {
            name: "人数",
            data: riskStat,
            type: "bar",
            barStyle: {
              fill: "rgba(245, 225, 32, 0.8)",
            },
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            },
            label: {
              // 修改 position 和 distance 的值试试
              // 支持：'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
              position: 'inside',
              distance: 10,
              style: {
                fontSize:14,
                fill: "#fff",
                backgroundColor: '#eee',
                borderColor: '#555',
                borderWidth: 2,
                borderRadius: 5,
                padding: 10,
                shadowBlur: 3,
                shadowColor: '#888',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                textBorderColor: '#000',
                textBorderWidth: 3,
              },
              show: true,
            }
          },
        ],
      });

      // 获取风险统计
    const followUpStat = computed(() => {
      return [state.stat.FollowUpMode1Count,state.stat.FollowUpMode2Count,state.stat.FollowUpMode3Count,state.stat.FollowUpMode10Count];
    });

      const followUpOption:any = reactive({
        // FollowUpMode1Count  :0, //转诊医疗机构
        // FollowUpMode2Count  :0, //转接专业照护机构
        // FollowUpMode3Count  :0, //参与社区干预
        // FollowUpMode10Count :0, //其他
        legend: {
          data: [
            {
              name: "人数",
              color: "rgba(32, 225, 245, 0.8)",
            },
            // {
            //   name: "完成量",
            //   color: "#ff5ca9",
            // }
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: ["转诊医疗机构", "转接专业照护机构", "参与社区干预", "其他"],
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#fff",
            },
          },
          axisTick: {
            show: true,
          },
        },
        yAxis: {
          data: "value",
          splitLine: {
            show: true,
          },
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: true,
          },
          min: 0,
        },
        series: [
          {
            name: "人数",
            data: followUpStat,
            type: "bar",
            barStyle: {
              fill: "rgba(32, 225, 245, 0.8)",
            },
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            },
            label: {
              // 修改 position 和 distance 的值试试
              // 支持：'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
              position: 'inside',
              distance: 10,
              style: {
                fontSize:14,
                fill: "#fff",
                backgroundColor: '#eee',
                borderColor: '#555',
                borderWidth: 2,
                borderRadius: 5,
                padding: 10,
                shadowBlur: 3,
                shadowColor: '#888',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                textBorderColor: '#000',
                textBorderWidth: 3,
              },
              show: true,
            }
          },
        ],
      });
 
    onMounted(async() => {
      const res = await proxy.$api.hcis.healthRecord.getDashboardStatByScope(kind,scopeMode,scopeValue)
      if(res.errcode==0){
        console.log("res.data:",res.data)
        state.stat=res.data||{};

      }
     
    });
    return {
    proxy,
    ageConfig,
    interveneConfig,
    riskOption,
    followUpOption,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
  h1{
    font-size:18px !important;
  }
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

</style>
