<template>
  <div class="center-cmp">
    <div class="cc-main-container">
      <div class="cc-header">产品占比分析</div>
      <div class="ccmc-middle">
        <dv-active-ring-chart  :config="config" style="width:240px;height:240px;margin-left:auto;margin-right:auto;"/>
      </div>
     
      <!-- <LabelTag :config="labelConfig" /> -->
    </div>
  </div>
</template>

<script>
// import LabelTag from "./LabelTag";

export default {
  name: "CenterCmp",
  components: {
    // LabelTag,
  },
  props: {
    truckCount: {
      type: Number,
      required: true,
    },
    leftList: {
      type: Array,
      required: false,
    },
    rightList: {
      type: Array,
      required: false,
    },
    centerList: {
      type: Array,
      required: false,
    },
  },
  // data () {
  //   return {
  //     today:this.getNowFormatDate()
  // },
  computed: {
    count() {
      return this.truckCount + "";
    },
    config() {
      return {
        //data: this.centerList,
        data: [{name:'渣砂',value:1000000},{name:'碎石',value:1200000},{name:'混凝土',value:3600000},{name:'渣钢',value:1800000}],
        color: ["#00baff", "#3de7c9", "#ffc530", "#469f4b", "#00ff5a", "#c93de7", "#30ffc5", "#9f464b"],
        lineWidth: 36,
        radius: '75%',
        digitalFlopUnit:'吨',
        activeRadius: "85%",
        digitalFlopStyle: {
          fontSize: 20
        },
        showOriginValue: true
      };
    },
    labelConfig() {
      return {
        data:["渣砂","碎石","混凝土","渣钢"],
        // data: this.centerList.map((c) => {
        //   return c.name;
        // }),
      };
    },
    today() {
      return this.getNowFormatDate();
    },
  },
  methods: {
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      var currentdate = month + "月" + strDate + "日";
      return currentdate;
    },
  },
};
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  margin: 0px;
  padding: 0px;

  .cc-header {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }

  .cc-main-container {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    .ccmc-middle {
      width: 100%;
      text-align:center;
      .active-ring-name {
        font-size: 20px !important;
      }
    }
  }
}
</style>
