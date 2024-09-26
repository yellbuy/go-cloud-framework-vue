<template>
  <div id="ringProgress-cards">
    <div
      class="card-item"
      :key="title"
      :title="dataTitle"
    >
      <!-- <div class="card-header">
        <div class="card-header-left">{{ title }}</div>
        <div class="card-header-right">{{unit}}</div>
      </div> -->
      <div class="card-header-center">{{ title }}</div>
      <dv-charts class="ring-charts" :option="ring" />
      <!-- <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">累计</div>
          <div class="footer-detail">
            <dv-digital-flop :config="planValue" style="width:70%;height:35px;" />
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">完成</div>
          <div class="footer-detail">
            <dv-digital-flop :config="actualValue" style="width:70%;height:35px;" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">

export default {

  name: "ringProgress",
  components: {
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    planValue:{
      type: Number,
      required: true,
    },
    actualValue:{
      type: Number,
      required: true,
    },
    unit: {
      type: String
    },
  },
  setup(props) {
    let rate=0;
    if(props.planValue>0){
      rate=Number.parseFloat(((props.actualValue/props.planValue)*100).toFixed(1))
    } else if (props.actualValue>0){
      rate=100
    }
    return {
      dataTitle:`${props.actualValue}${props.unit} / ${props.planValue}${props.unit}`,
      ring: {
          series: [
            {
              type: "gauge",
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 13,
              radius: "80%",
              data: [{ name: "完成", value: rate }],
              axisLabel: {
                show: true,
              },
              axisTick: {
                show: false,
              },
              pointer: {
                show: false,
              },
              backgroundArc: {
                style: {
                  stroke: "#224590",
                },
              },
              details: {
                show: true,
                formatter: `{value}%`,
                style: {
                  fill: "#f89898",
                  fontSize: 14,
                },
              },
            },
          ],
          color: ["#03d3ec"],
        }
    };
  },
};
</script>

<style lang="less">
#ringProgress-cards {
  display: flex;
  justify-content: space-between;
  text-align: center;
  //height: 45%;

  .card-item {
    width:100%;
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    //height: 33%;
    align-items: center;
    justify-content: space-between;

    .card-header-left {
      font-size: 12px;
      font-weight: bold;
      padding-left: 6px;
    }

    .card-header-center {
      font-size: 12px;
      width:100%;
      font-weight: bold;
      padding: 3px 6px 0px 6px;
      text-align:center;
    }

    .card-header-right {
      padding-right: 6px;
      font-size: 12px;
      color: #03d3ec;
    }
  }

  .ring-charts {
    margin:10px 2px;
    height: 80px;
  }

  .card-footer {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;

    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
    }

    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;

      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}
</style>
