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

        <dv-border-box1 style="height:calc(100% - 21rem);width:50%;">
          <div style="text-align: center;margin-top: 3rem">
            <Label :text="'总户数'" :title="10000"/>
            <Label :color="'#FCAE26FF'" :text="'达标户'" :title="9500" style="margin: 0 22rem 8rem;"/>
            <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'95%'"/>
          </div>
          <LineGraph style="margin-bottom: 5rem"/>
          <ranking-county/>
        </dv-border-box1>

        <div style="width:25%;height: 100%">
          <div class="target-content glt" style="height: 100%">
            <dv-scroll-board :config="zhonghebangfuConfig" style="width:100%;height:100%;"/>
          </div>
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
import RankingCounty from "/@/views/res/dashboard/family/rankingCounty.vue";


export default {
  name: "IndexDashboard",
  components: {
    RankingCounty,
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
    //综合帮扶情况配置
    const zhonghebangfuConfig = reactive({
      header: ['乡镇', '村', '帮扶情况'],
      data: [
        ['<span style="color:#37a2da;">金江镇</span>', '张某某', '低保'],
        ['仁和镇', '<span style="color:#32c5e9;">杨某</span>', '大病保障'],
        ['金江镇', '陈某某', '<span style="color:#67e0e3;">节日慰问</span>'],
        ['前进镇', '<span style="color:#9fe6b8;">伍某华</span>', '节日慰问'],
        ['<span style="color:#ffdb5c;">陈某萍</span>', '行5列2', '节日慰问'],
        ['大田镇', '<span style="color:#ff9f7f;">张某</span>', '大病保障'],
        ['大田镇', '张某燕', '<span style="color:#fb7293;">就近入学</span>'],
        ['金江镇', '<span style="color:#e062ae;">谢某</span>', '新办幼儿园'],
        ['<span style="color:#e690d1;">杨某</span>', '仁和村', '低保'],
        ['金江镇', '<span style="color:#e7bcf3;">张某某</span>', '就近入学'],
        ['<span style="color:#37a2da;">金江镇</span>', '张某某', '低保'],
        ['仁和镇', '<span style="color:#32c5e9;">杨某</span>', '大病保障'],
        ['金江镇', '陈某某', '<span style="color:#67e0e3;">节日慰问</span>'],
        ['前进镇', '<span style="color:#9fe6b8;">伍某华</span>', '节日慰问'],
        ['<span style="color:#ffdb5c;">陈某萍</span>', '行5列2', '节日慰问'],
        ['大田镇', '<span style="color:#ff9f7f;">张某</span>', '大病保障'],
        ['大田镇', '张某燕', '<span style="color:#fb7293;">就近入学</span>'],
        ['金江镇', '<span style="color:#e062ae;">谢某</span>', '新办幼儿园'],
        ['<span style="color:#e690d1;">杨某</span>', '仁和村', '低保'],
        ['金江镇', '<span style="color:#e7bcf3;">张某某</span>', '就近入学'],
        ['<span style="color:#37a2da;">金江镇</span>', '张某某', '低保'],
        ['仁和镇', '<span style="color:#32c5e9;">杨某</span>', '大病保障'],
        ['金江镇', '陈某某', '<span style="color:#67e0e3;">节日慰问</span>'],
        ['前进镇', '<span style="color:#9fe6b8;">伍某华</span>', '节日慰问'],
        ['<span style="color:#ffdb5c;">陈某萍</span>', '行5列2', '节日慰问'],
        ['大田镇', '<span style="color:#ff9f7f;">张某</span>', '大病保障'],
        ['大田镇', '张某燕', '<span style="color:#fb7293;">就近入学</span>'],
        ['金江镇', '<span style="color:#e062ae;">谢某</span>', '新办幼儿园'],
        ['<span style="color:#e690d1;">杨某</span>', '仁和村', '低保'],
        ['金江镇', '<span style="color:#e7bcf3;">张某某</span>', '就近入学'],
        ['<span style="color:#37a2da;">金江镇</span>', '张某某', '低保'],
        ['仁和镇', '<span style="color:#32c5e9;">杨某</span>', '大病保障'],
        ['金江镇', '陈某某', '<span style="color:#67e0e3;">节日慰问</span>'],
        ['前进镇', '<span style="color:#9fe6b8;">伍某华</span>', '节日慰问'],
        ['<span style="color:#ffdb5c;">陈某萍</span>', '行5列2', '节日慰问'],
        ['大田镇', '<span style="color:#ff9f7f;">张某</span>', '大病保障'],
        ['大田镇', '张某燕', '<span style="color:#fb7293;">就近入学</span>'],
        ['金江镇', '<span style="color:#e062ae;">谢某</span>', '新办幼儿园'],
        ['<span style="color:#e690d1;">杨某</span>', '仁和村', '低保'],
        ['金江镇', '<span style="color:#e7bcf3;">张某某</span>', '就近入学'],
      ],
      index: true,
      headerHeight: 80,
      rowNum: 20,
      headerBGC: '#00AA77',
      oddRowBGC: '#002B31',
      evenRowBGC: '#071722',
      columnWidth: [50],
      align: ['center'],
    })

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
      zhonghebangfuConfig
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
  color: #28A2CE;
  border-radius: 4px;
  box-shadow: rgb(29, 72, 196) 0px 0px 25px 3px inset;
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
