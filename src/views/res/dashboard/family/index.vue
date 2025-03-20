<template>
  <div id="data-view" dv-bg>
    <div style="width:100vw;height:100vh;position: relative;">
      <div
          style="top: 52%; left: 49%;width:50vw;height:50vw; transform: translate(-49%, -48%);position: absolute;z-index: 9999;"
          id="mapContainer" ref="mapContainer"/>

      <div id="banner">
        <div class="banner-content">
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="12" @click="console.log('click')"
                     border="Border4" color="#409EFF">区建成
          </dv-button>
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="12"
                     @click="onGoToLink(`/admin/dashboard/street/index`)" border="Border4" color="#615ea8">乡进入
          </dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="12"
                     @click="onGoToLink(`/admin/dashboard/village/index`)" border="Border4" key="" color="#615ea8">村实现
          </dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="12"
                     @click="onGoToLink(`/admin/dashboard/family/index`)" border="Border4" color="#615ea8">户达标
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">
          <p style="display:inline-block;color:white;margin-left:10px;margin-right:10px;font-size:14pt">
            <b>{{ curTime }}</b>
          </p>
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="console.log('click')"
                     border="Border4" color="#409EFF">详情
          </dv-button>
        </div>
      </div>

      <div class="main-rows">
        <div style="width:25%">
          <pieCountyGdp/>
          <FiveGoods/>
        </div>
        <div>
          <div class="column-center">
            <div style="min-height: 500px; justify-content: center;position: relative"/>
          </div>
        </div>

        <div style="width:25%">
          <radarVillage/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ImageLayer, Map, PointLayer, Scene} from '@antv/l7';
import dayjs from 'dayjs';
import {onMounted, reactive, toRefs} from 'vue';
import {useRouter} from 'vue-router';
import pieCountyGdp from "./pieCountyGdp.vue";
import FiveGoods from "./FiveGoods.vue";
import radarVillage from "./radarVillage.vue";

export default {
  name: "IndexDashboard",
  components: {
    pieCountyGdp,
    FiveGoods,
    radarVillage,
  },
  setup() {
    const router = useRouter();
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
      const scene = new Scene({
        id: 'mapContainer',
        logoVisible: false,
        map: new Map({
          center: [500, 500],
          zoom: 2.5,
          version: 'SIMPLE',
          mapSize: 1000,
          maxZoom: 5,
          minZoom: 1,
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
      const imageLayer = new ImageLayer({}).source('/img/res/renhe.png',
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

#banner {
  width: 100%;
  height: 281px;
  background-image: url(/img/res/banner.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  display: inline-block;

  .banner-content {
    margin: 24px 12px;
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
    margin-top: -220px;
    height: 100%;

    .dv-border-box-1 {
      text-align: left;
    }

    .column-center {
      height: 59%;
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
      height: 26%;
      background-size: 100% 100%;
      margin: 0 10px 0 10px;
    }
  }
}
</style>
