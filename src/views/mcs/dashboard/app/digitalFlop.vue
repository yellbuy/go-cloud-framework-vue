<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width: 100px; height: 50px"
        />
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>

    <dv-decoration-10 />
  </div>
</template>

<script>
export default {
  name: "DigitalFlop",
  data() {
    return {
      digitalFlopData: [],
    };
  },
  methods: {
    createData() {
      const { randomExtend } = this;

      this.digitalFlopData = [
        {
          title: "年计划量",
          number: {
            number: [randomExtend(100000, 110000)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "吨",
        },
        {
          title: "年累计运量",
          number: {
            number: [randomExtend(70000, 75000)],
            content: "{nt}",
            textAlign: "center",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "吨",
        },
        {
          title: "月度计划量",
          number: {
            number: [randomExtend(8000, 8500)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "吨",
        },
        {
          title: "月度完成量",
          number: {
            number: [randomExtend(8700, 9000)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "吨",
        },
        {
          title: "日计划量",
          number: {
            number: [randomExtend(1000, 1500)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#e3dc0f",
              fontWeight: "bold",
            },
          },
          unit: "吨",
        },
        {
          title: "日完成量",
          number: {
            number: [randomExtend(1200, 1500)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#e3dc0f",
              fontWeight: "bold",
            },
          },
          unit: "吨",
        },
        {
          title: "自有车数",
          number: {
            number: [randomExtend(5000, 5032)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40faee",
              fontWeight: "bold",
            },
          },
          unit: "辆",
        },
        {
          title: "外部车数",
          number: {
            number: [randomExtend(4980, 5000)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40facc",
              fontWeight: "bold",
            },
          },
          unit: "辆",
        },
        {
          title: "货运车数",
          number: {
            number: [randomExtend(100, 120)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4dffff",
              fontWeight: "bold",
            },
          },
          unit: "辆",
        },
        {
          title: "工程机械车数",
          number: {
            number: [randomExtend(20, 50)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4fffff",
              fontWeight: "bold",
            },
          },
          unit: "辆",
        },
      ];
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

    setInterval(createData, 30000);
  },
};
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 15%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 11%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
