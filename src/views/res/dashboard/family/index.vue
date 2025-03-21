<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container v-if="isFullScreen">
      <Banner/>

      <div class="main-rows">
        <div style="width:25%">
          <FiveGoods/>
          <Funnel/>
          <Category/>
        </div>

        <div style="width:50%">
          <div style="text-align: center">
            <Label :text="'总户数'" :title="10000"/>
            <Label :color="'#FCAE26FF'" :text="'达标户'" :title="9500" style="margin: 0 22em 8em;"/>
            <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'95%'"/>
          </div>
          <LineGraph style="margin-bottom: 5em"/>
          <NumberOfPeopleAssisted/>
        </div>

        <div style="width:25%">
          <!--          <Table/>-->
        </div>
      </div>

    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import {ImageLayer, Map, PointLayer, Scene} from '@antv/l7';
import {onMounted, reactive, toRefs} from 'vue';
import {useRoute} from 'vue-router';
import Funnel from "./Funnel.vue";
import Category from "./Category.vue";
import Table from "./Table.vue";
import FiveGoods from "./FiveGoods.vue";
import LineGraph from "./LineGraph.vue";
import NumberOfPeopleAssisted from "./NumberOfPeopleAssisted.vue";
import numberVillageStat from "../component/numberVillageStat.vue";
import Banner from "../component/Banner.vue";
import Label from "../component/Label.vue";


export default {
  name: "IndexDashboard",
  components: {
    Funnel,
    Category,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Table,
    FiveGoods,
    LineGraph,
    NumberOfPeopleAssisted,
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
    };

    // 页面加载时
    onMounted(() => {
      const route = useRoute();
      const scene = new Scene({
        id: 'mapContainer',
        logoVisible: false,
        map: new Map({
          center: [500, 500],
          zoom: 2,
          version: 'SIMPLE',
          mapSize: 1000,
          maxZoom: 5,
          minZoom: 1,
          pitchEnabled: true,
          rotateEnabled: true,
        }),
      });
      scene.on('loaded', () => {
        fetch('/data/res/' + route.query.areaCode + '.json')
            .then((res) => res.json())
            .then((data) => {
              scene.addImage(
                  '0', `/img/res/village_0.png`);
              scene.addImage(
                  '1', `/img/res/village_1.png`);
              const imageLayer = new PointLayer()
                  .source(data, {
                    parser: {
                      type: 'json',
                      x: 'x',
                      y: 'y',
                    },
                  })
                  .shape('icon', ['1', '0'])
                  .size(12);
              const textLayer = new PointLayer({zIndex: 2})
                  .source(data, {
                    parser: {
                      type: 'json',
                      x: 'x',
                      y: 'y',
                    },
                  })
                  .shape('name', 'text')
                  .size(12)
                  .active({
                    color: '#00f',
                    mix: 0.9,
                  })
                  .color('red')
                  .style({
                    textAnchor: 'top-left', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
                    spacing: 6, // 字符间距
                    fontWeight: '800',
                    padding: [30, 30], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
                    stroke: '#ffffff', // 描边颜色
                    strokeWidth: 2, // 描边宽度
                    textAllowOverlap: true,
                    textOffset: [20, 20],
                  });
              scene.addLayer(imageLayer);
              scene.addLayer(textLayer);
            });
      })
      const imageLayer = new ImageLayer({}).source('/img/map/' + route.query.areaCode + ".png",
          {
            parser: {
              type: 'image',
              autoFit: true,
              extent: [360, 400, 660, 600],
            },
          },
      );
      scene.addLayer(imageLayer);

    });
    return {
      onFullScreen,
      ...toRefs(state),
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

.contenta-tip {
  position: absolute;
  float: left;
  top: 5vh;
  left: calc(39vw);
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.contenta-bottom {
  height: 25vh;
  width: 100%;

  .box {
    display: flex;
    flex-direction: row;
  }
}

#map {
  height: 100%;
  width: 500px;
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
    margin-top: -45em;
    height: 100%;
  }
}
</style>
