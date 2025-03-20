<template>
  <div id="data-view" dv-bg>

    <div style="width:100vw;height:100vh;position: relative;">
      <div style="top: 52%; left: 49%;width:50vw;height:50vw; transform: translate(-49%, -48%);position: absolute;z-index: 9999;" id="mapContainer" ref="mapContainer" />
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
          
          <p style="display:inline-block;color:white;margin-left:10px;margin-right:10px;font-size:14pt"><b>{{ curTime }}</b></p>
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="console.log('click')" border="Border4" color="#409EFF">详情</dv-button>
        </div>
      </div>
      
      <!-- <div style="position:absolute;top:10px;right:10px">
        <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
      </div> -->
      <div class="main-rows">
          <div style="width:25%">
            <radarCounty/>
            <barStreet/>
            <!-- <rankingCounty/> -->
            <!-- <barAreaGdp/> -->
          </div>
          <dv-border-box1 style="width:50%">
              <!-- <digitalGoodsStat/> -->
              <numberVillageStat />
              <div class="column-center">
                <div style="min-height: 500px; justify-content: center;position: relative"  />
              </div>
              <!-- <div class="column-footer">
                <div style="width:50%">
                  <barFamilyGdp/>
                </div>
                <div style="width:50%">
                  <barAgricultureGdp/>
                </div>
              </div> -->
          </dv-border-box1>
          
          <div style="width:25%">
            <actVillage/>
            <lineFamily/>
          </div>
        </div>
    </dv-full-screen-container>
    <div v-else>
      <div style="position:absolute;top:6px;left: 10px">
          <dv-button style="display:inline-block;z-index: 9999999;margin-left:10px;" fontSize="10" @click="console.log('click')" border="Border4" color="#409EFF">区建成</dv-button>
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="10" @click="onGoToLink(`/admin/dashboard/street/index`)" border="Border4" color="#615ea8">乡进入</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="onGoToLink(`/admin/dashboard/village/index`)" color="#615ea8">村实现</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="onGoToLink(`/admin/dashboard/family/index`)" color="#615ea8">户达标</dv-button>
        </div>
        <div style="position:absolute;top:6px;right: 10px">
          <p style="color:#409EFF;margin-right:10px;"><b>{{ curTime }}</b></p>
        </div>
        <!-- <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div> -->
        <dv-border-box11 title="仁 和 区 共 同 富 裕 数 字 化 平 台" :title-width="400" :animate="true" style="height:100vh">
          <div class="main-rows">
            
            <div style="width:25%">
              <rangeVillageGdp />
              <radarVillage/>
              <!-- <rankingCounty/> -->
              <barAreaGdp/>
            </div>
            <div class="column-footer">
              <div style="width:50%">
                <barFamilyGdp/>
              </div>
              <div style="width:50%">
                <barAgricultureGdp/>
              </div>
            </div>
          <div style="width:25%">
            <pieCoutyGdp/>
            <barVillageInsurance/>
            <barPeopleGdp/>
          </div>
        </div>
      </dv-border-box11>
  </div>
</div>
</template>

<script lang="ts">
import { ImageLayer, Map, PointLayer, Scene } from '@antv/l7';
import dayjs from 'dayjs';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import actVillage from "./actVillage.vue";
import barAgricultureGdp from "./barAgricultureGdp.vue";
import barAreaGdp from "./barAreaGdp.vue";
import barFamilyGdp from "./barFamilyGdp.vue";
import barPeopleGdp from "./barPeopleGdp.vue";
import barStreet from "./barStreet.vue";
import barCoutyGdp from "./barVillageGdp.vue";
import barVillageInsurance from "./barVillageInsurance.vue";
import flareTarget from "./flareTarget.vue";
import lineFamily from "./lineFamily.vue";
import numberVillageStat from "./numberVillageStat.vue";
import pieCoutyGdp from "./pieCountyGdp.vue";
import radarCounty from "./radarCounty.vue";
import radarFamily from "./radarFamily.vue";
import radarLgsh from "./radarLgsh.vue";
import radarStreet from "./radarStreet.vue";
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
    barStreet,
    actVillage,
    barAreaGdp,
    barFamilyGdp,
    barVillageInsurance,
    pieCoutyGdp,
    rangeVillageGdp,
    radarLgsh,
    radarCounty,
    radarStreet,
    radarVillage,
    radarFamily,
    lineFamily,
  },
  setup() {
    const router =  useRouter();
    const mapContainer = ref();
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      curTime: dayjs().format("YYYY年MM月DD日 dddd")
    })
    const onFullScreen = () => {
			//admin/dashboard/app/fullScreen
      state.isFullScreen=!state.isFullScreen
		};
    //导航链接
    const onGoToLink = (url:string) => {
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
              imageLayer.on('click', (e) => {
                console.log(e)
                alert(`
              <p>区域名称: ${e.feature.name}</p>
              <p>区域标识: ${e.feature.code}</p>
              <p>图中X坐标: ${e.x}</p>
              <p>图中Y坐标: ${e.y}</p>
            `);
          });
          const textlayer = new PointLayer({ zIndex: 2 })
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
            router.push(`/admin/dashboard/street/index?areaCode=${e.feature.code}&areaName=${e.feature.name}`);
            alert( `
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
      scene.addLayer(imagelayer);

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
#app{
 .el-aside,.el-header,.layout-navbars-tagsview{
  display: none;
 }
}
#banner{
  width:100%;
  height:281px;
  background-image:url(/img/res/banner.png);
  background-repeat:no-repeat;
  background-position:center top;
  background-size: 100% auto; 
  display:inline-block;
  .banner-content{
    margin:24px 12px;
    display:inline-block;width:auto
  }
}
#data-view{
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
    margin-top:-220px;
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


}

</style>
