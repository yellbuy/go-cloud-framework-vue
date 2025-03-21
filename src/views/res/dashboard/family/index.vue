<template>
  <div id="data-view" dv-bg>
    <div style="width:100vw;height:100vh;position: relative;">
      <div
          style="top: 40%; left: 49%;width:30vw;height:30vw; transform: translate(-49%, -48%);position: absolute;z-index: 9999;"
          id="mapContainer" ref="mapContainer"/>
    </div>

    <dv-full-screen-container v-if="isFullScreen">
      <div id="banner">
        <div class="banner-content">
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="12" @click="console.log('click')" border="Border4" color="#409EFF">区建成</dv-button>
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="12" @click="onGoToLink(`/admin/dashboard/street/index`)" border="Border4" color="#615ea8">乡进入</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="12" @click="onGoToLink(`/admin/dashboard/village/index`)" border="Border4" key=""color="#615ea8">村实现</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="12" @click="onGoToLink(`/admin/dashboard/family/index`)" border="Border4" color="#615ea8">户达标</dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">
          
          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>{{ curTime }}</b></p>
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="console.log('click')" border="Border4" color="#409EFF">详情</dv-button>
        </div>
      </div>

      <div class="main-rows">
        <div style="width:25%">
          <FiveGoods/>
          <Funnel/>
          <Category/>
        </div>
          <div style="width:50%">
              <!-- <digitalGoodsStat/> -->
              <numberVillageStat />
              <div class="column-center">
                <div style="min-height: 48vh; justify-content: center;position: relative"  />
              </div>
              <div class="column-footer">
                <div style="width:50%">
                  <LineGraph style="flex-shrink: 0;"/>
                </div>
                <div style="width:50%">
                  <NumberOfPeopleAssisted style="flex-shrink: 0;"/>
                </div>
              </div>
          </div>
          
          <div style="width:25%">
            <Table/>
          </div>

      </div>

    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import {ImageLayer, Map, PointLayer, Scene} from '@antv/l7';
import dayjs from 'dayjs';
import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Funnel from "./Funnel.vue";
import Category from "./Category.vue";
import Table from "./Table.vue";
import FiveGoods from "./FiveGoods.vue";
import LineGraph from "./LineGraph.vue";
import NumberOfPeopleAssisted from "./NumberOfPeopleAssisted.vue";
import numberVillageStat from "../component/numberVillageStat.vue";


export default {
  name: "IndexDashboard",
  components: {
    Funnel,
    Category,
    // eslint-disable-next-line vue/no-reserved-component-names
    Table,
    FiveGoods,
    LineGraph,
    NumberOfPeopleAssisted,
    numberVillageStat
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    route.query.areaCode = "510411200200";
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      curTime: dayjs().format("YYYY年MM月DD日 dddd")
    })
    const onFullScreen = () => {
      state.isFullScreen = !state.isFullScreen
    };
    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }

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
      onGoToLink,
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
  width:100%;

  .box {
    display: flex;
    flex-direction: row;
    lex-shrink: 0;
  }
}

#banner {
  width: 100%;
  height: 281px;
  background-image: url(/img/res/banner.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  display: inline-block;

  .banner-content {
    margin: 32px 12px;
    display: inline-block;
    width: auto
  }
}

#data-view {
  background-image: url("./img/bg.png");
}

#map {
  height: 100%;
  width: 500px;
}
.target-header{
  text-align: left;
  padding-top:6px;
  margin-top: 2vh;
  height: 36px;
  background-image: linear-gradient(to right,#061A8F,#060034);
  border-radius: 2px;
}
.target-title{
  background-image: radial-gradient(circle, #daeef3 10%, #0075FF);
  //background-image: radial-gradient(circle, #01BBE9 10%, #0075FF);
  width:200px;
  font-weight: bold;
  background-clip: text;
  color: transparent;
  padding-left:20px;
  font-size: 16px;
}
.target-content{
  width:100px;
  margin:20px;
  padding:10px;
  text-align: center;
  border: 2px solid #333;
  border-radius: 4px;
  color:#1C73A1
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
    margin-top: -200px;
    height: 100%;

    .dv-border-box-1 {
      text-align: left;
    }

    .column-center {
      background-size: 100% 100%;
      margin: 0 20px 12px 20px;
    }

    .column-footer {
      display: flex;
      flex-direction: row;
      align-content: center;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 26vh;
      background-size: 100% 100%;
      margin: 0 10px 0 10px;
    }
  }
}
</style>
