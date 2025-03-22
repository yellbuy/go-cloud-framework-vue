<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container v-if="isFullScreen">
      <Banner/>

      <div class="main-rows">
        <div style="width:25%">
          <Funnel/>
          <FiveGoods/>
          <Category/>
        </div>

        <dv-border-box1 style="height:calc(100% - 21rem);width:50%;">
          <div style="text-align: center;margin-top: 3rem">
            <Label :text="'总户数'" :title="10000"/>
            <Label :color="'#FCAE26FF'" :text="'达标户'" :title="9500" style="margin: 0 22rem 2rem;"/>
            <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'95%'"/>
          </div>
          <main-monitoring/>
          <div style="flex: 1;display: flex;flex-direction: row;">
            <div style="width: 50%">
              <LineGraph/>
            </div>
            <div style="width: 50%">
              <ranking-county/>
            </div>
          </div>
          <div style="flex: 1;display: flex;flex-direction: row;">
            <div style="width: 50%">
              <LineGraph/>
            </div>
            <div style="width: 50%">
              <ProportionOfAgeGroups/>
            </div>
          </div>

        </dv-border-box1>

        <div style="width:25%;height: 100%">
          <Table/>
        </div>
      </div>

    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from 'vue';
import {useRoute} from 'vue-router';
import Funnel from "./Funnel.vue";
import Category from "./Category.vue";
import Table from "./Table.vue";
import FiveGoods from "./FiveGoods.vue";
import LineGraph from "./LineGraph.vue";
import numberVillageStat from "../component/numberVillageStat.vue";
import Banner from "../component/Banner.vue";
import Label from "../component/Label.vue";
import RankingCounty from "./rankingCounty.vue";
import ProportionOfAgeGroups from "./ProportionOfAgeGroups.vue";
import MainMonitoring from "/@/views/res/dashboard/family/MainMonitoring.vue";

export default {
  name: "IndexDashboard",
  components: {
    MainMonitoring,
    ProportionOfAgeGroups,
    RankingCounty,
    Funnel,
    Category,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Table,
    FiveGoods,
    LineGraph,
    // eslint-disable-next-line vue/no-unused-components
    numberVillageStat,
    Banner,
    // eslint-disable-next-line vue/no-reserved-component-names
    Label
  },
  setup() {
    const route = useRoute();
    route.query.areaCode = "510411200200";
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL
    })
    const onFullScreen = () => {
      state.isFullScreen = !state.isFullScreen
    }

    return {
      onFullScreen,
      ...toRefs(state)
    };
  },
};
</script>


<style lang="less">
#app {
  .el-aside, .el-header, .layout-navbars-tagsview {
    display: none;
  }
}

#map {
  height: 100%;
  width: 500px;
}

.target-content {
  width: 100%;
  margin: 0;
  padding: 10px;
  text-align: center;
}

#data-view {
  width: 100%;
  height: 100%;
  color: #000;


  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
  }

  .main-rows {
    flex: 1;
    display: flex;
    flex-direction: row;
    margin-top: -45rem;
    height: 100%;
  }
}
</style>