<template>
  <div id="data-view" dv-bg>
    <div style="width:500px;height:500px;left:22vw;top:3vh;position: absolute;z-index: 9999;" id="mapContainer"
         ref="mapContainer"/>
    <dv-full-screen-container v-if="isFullScreen">
      <div style="position:absolute;top:6px;left: 10px">
        <dv-button style="display:inline-block;z-index: 9999999;margin-left:10px;" fontSize="10"
                   @click="console.log('click')" border="Border4" color="#409EFF">区建成
        </dv-button>
        <dv-button style="display:inline-block;margin-left:10px;" fontSize="10" @click="console.log('click')"
                   border="Border4" color="#615ea8">乡进入
        </dv-button>
        <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')"
                   border="Border4" color="#615ea8">村实现
        </dv-button>
        <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')"
                   border="Border4" color="#615ea8">户达标
        </dv-button>
      </div>
      <div style="position:absolute;top:6px;right: 10px">
        <p style="color:#409EFF;margin-right:10px;"><b>{{ curTime }}</b></p>
      </div>
      <dv-border-box11 title="仁 和 区 共 同 富 裕 指 标 监 测 平 台" :title-width="400" :animate="true"
                       style="height:100vh">
        <div class="main-rows">

          <div style="width:25%">
            <radarVillage/>
            <radarVillage/>
          </div>
          <dv-border-box1 style="width:50%">
            <numberVillageStat/>
            <div class="column-center">
              <div style="min-height: 300px; justify-content: center;position: relative"/>
            </div>
            <div class="column-footer">
              <div class="bottom-box">
                <div class="flare-title">三级书记抓共富职责</div>
                <div class="bottom-box">
                  <div>区委书记：立足“户达标、村实现、乡进入、区建成”抓制度</div>
                  <div>设计与资源统筹。</div>
                  <div>1、研究部署和督促推动共富工作</div>
                  <div>2、建立健全共富推荐工作机制</div>
                  <div>3、统筹各类资源要素</div>
                </div>
              </div>
            </div>
          </dv-border-box1>
          <div style="width:25%">
            <radarVillage/>
            <radarVillage/>
          </div>
        </div>
      </dv-border-box11>
    </dv-full-screen-container>
    <div v-else>
      <div style="position:absolute;top:6px;left: 10px">
        <dv-button style="display:inline-block;z-index: 9999999;margin-left:10px;" fontSize="10"
                   @click="console.log('click')" border="Border4" color="#409EFF">区建成
        </dv-button>
        <dv-button style="display:inline-block;margin-left:10px;" fontSize="10" @click="console.log('click')"
                   border="Border4" color="#615ea8">乡进入
        </dv-button>
        <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')"
                   border="Border4" color="#615ea8">村实现
        </dv-button>
        <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')"
                   border="Border4" color="#615ea8">户达标
        </dv-button>
      </div>
      <div style="position:absolute;top:6px;right: 10px">
        <p style="color:#409EFF;margin-right:10px;"><b>{{ curTime }}</b></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ImageLayer, Map, PointLayer, Scene} from '@antv/l7';
import dayjs from 'dayjs';
import {onMounted, reactive, ref, toRefs} from 'vue';
import barAgricultureGdp from "./barAgricultureGdp.vue";
import barAreaGdp from "./barAreaGdp.vue";
import barFamilyGdp from "./barFamilyGdp.vue";
import barPeopleGdp from "./barPeopleGdp.vue";
import barCoutyGdp from "./barVillageGdp.vue";
import barVillageInsurance from "./barVillageInsurance.vue";
import flareTarget from "./flareTarget.vue";
import lineLgsh from "./lineLgsh.vue";
import numberVillageStat from "./numberVillageStat.vue";
import pieCoutyGdp from "./pieCountyGdp.vue";
import radarLgsh from "./radarLgsh.vue";
import radarVillage from "./radarVillage.vue";
import rangeVillageGdp from "./rangeVillageGdp.vue";
import rankingCounty from "./rankingCounty.vue";

export default {
  name: "IndexDashboard",
  components: {
    flareTarget,
    rankingCounty,
    numberVillageStat,
    barCoutyGdp,
    barAgricultureGdp,
    barPeopleGdp,
    barAreaGdp,
    barFamilyGdp,
    barVillageInsurance,
    pieCoutyGdp,
    rangeVillageGdp,
    radarLgsh,
    radarVillage,
    lineLgsh,
  },
  setup() {
    const mapContainer = ref();
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      curTime: dayjs().format("YYYY年MM月DD日")
    })
    const onFullScreen = () => {
      state.isFullScreen = !state.isFullScreen
    };

    // 页面加载时
    onMounted(() => {
      const scene = new Scene({
        id: 'mapContainer',
        logoVisible: false,
        map: new Map({
          center: [500, 500],
          zoom: 2,
          version: 'SIMPLE',
          mapSize: 1000,
          maxZoom: 5,
          minZoom: 2,
          pitchEnabled: true,
          rotateEnabled: true,
        }),
      });
      scene.on('loaded', () => {
        fetch('/data/res/area.json')
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
              imageLayer.on('click', (e) => {
                console.log(e)
                alert(`
              <p>区域名称: ${e.feature.name}</p>
              <p>区域标识: ${e.feature.code}</p>
              <p>图中X坐标: ${e.x}</p>
              <p>图中Y坐标: ${e.y}</p>
            `);
              });
              const textlayer = new PointLayer({zIndex: 2})
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
              textlayer.on('click', (e) => {
                console.log(e)
                alert(`
              <p>区域名称: ${e.feature.name}</p>
              <p>区域标识: ${e.feature.code}</p>
              <p>图中X坐标: ${e.x}</p>
              <p>图中Y坐标: ${e.y}</p>
            `);
              });
              scene.addLayer(imageLayer);
              scene.addLayer(textlayer);
            });
      })
      const imagelayer = new ImageLayer({}).source('/img/res/renhe.png',
          {
            parser: {
              type: 'image',
              autoFit: true,
              extent: [360, 400, 660, 600],
            },
          },
      );
      imagelayer.on('click', (e) => {
        console.log(e)
        alert(`
          <p>区域名称: ${e.feature.name}</p>
          <p>区域标识: ${e.feature.code}</p>
          <p>图中X坐标: ${e.x} = ${e.x + 250}</p>
          <p>图中Y坐标: ${e.y} = ${(1000 + (500 - e.y) / 2) / 2}</p>
        `);
      });
      scene.addLayer(imagelayer);

    });
    return {
      onFullScreen,
      ...toRefs(state),
    };
  },
};
</script>


<style lang="less">
#data-view {
  background-image: url("./img/bg.png");
}

#map {
  height: 100%;
  width: 500px;
}

#data-view {
  width: 100%;
  height: 100%;
  color: #fff;


  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
  }

  .main-rows {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 8vh 1vw 2vh 1vw;
    height: 100%;

    .dv-border-box-1 {
      text-align: left;
    }

    .column-center {
      height: 59%;
      background-size: 100% 100%;
      margin: 0px 20px 12px 20px;
    }

    .column-footer {
      display: flex;
      flex-direction: row;
      align-content: center;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 26%;
      background-size: 100% 100%;
      margin: 0px 10px 0px 10px;
    }
  }

  .dv-button {
    padding: 4px 10px !important;
  }

  .flare-title {
    background-image: linear-gradient(to right, rgb(83, 78, 234), rgb(21, 6, 110));
    border-radius: 4px;
    margin-top: 1vh;
    height: 3vh;
    font-family: 'LiSu';
    font-weight: bold;
    text-align: 'left' !important;
    font-size: 18px;
    color: #00a2d4;

  }

  .bottom-box {
    box-shadow: rgb(28, 40, 80) 0px 0px 25px 3px inset;
    padding: 10px;
  }
}

</style>
