<template>
  <div id="cards">
    <div class="card-item" v-for="(card, i) in cards" :key="card.title">
      <div class="card-header">
        <div class="card-header-left">{{ card.title }}</div>
        <div class="card-header-right">{{ "0" + (i + 1) }}</div>
      </div>
      <dv-charts class="ring-charts" :option="card.ring" />
      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">累计运量</div>
          <div class="footer-detail">
            <dv-digital-flop
              :config="card.total"
              style="width: 70%; height: 35px"
            />
            <span style="font-size: 10px">吨</span>
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">累计车数</div>
          <div class="footer-detail">
            <dv-digital-flop
              :config="card.num"
              style="width: 70%; height: 35px"
            />
            <span style="font-size: 10px">车</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cards",
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    createData() {
      const { randomExtend } = this;
      let chineseNumbers = [
        "汽运一分公司",
        "汽运二分公司",
        "汉盛物流",
        "汉佳物流",
        "横通物流",
        "贸易分公司",
      ];
      this.cards = new Array(5).fill(0).map((foo, i) => ({
        title: chineseNumbers[i],
        total: {
          number: [randomExtend(9000, 10000)],
          content: "{nt}",
          textAlign: "right",
          style: {
            fill: "#ea6027",
            fontWeight: "bold",
            fontSize: 20,
          },
        },
        num: {
          number: [randomExtend(30, 60)],
          content: "{nt}",
          textAlign: "right",
          style: {
            fill: "#26fcd8",
            fontWeight: "bold",
            fontSize: 20,
          },
        },
        ring: {
          series: [
            {
              type: "gauge",
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 13,
              radius: "80%",
              data: [{ name: "完成占比", value: randomExtend(40, 60) }],
              axisLabel: {
                show: false,
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
                formatter: "完成占比{value}%",
                style: {
                  fill: "#1ed3e5",
                  fontSize: 20,
                },
              },
            },
          ],
          color: ["#03d3ec"],
        },
      }));
    },
    randomExtend(minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10);
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      }
    },
  },
  mounted() {
    const { createData } = this;

    createData();

    setInterval(this.createData, 30000);
  },
};
</script>

<style lang="less">
#cards {
  display: flex;
  justify-content: space-between;
  height: 50%;

  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    width: 19%;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    height: 20%;
    align-items: center;
    justify-content: space-between;

    .card-header-left {
      font-size: 18px;
      font-weight: bold;
      padding-left: 20px;
    }

    .card-header-right {
      padding-right: 20px;
      font-size: 40px;
      color: #03d3ec;
    }
  }

  .ring-charts {
    height: 55%;
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
