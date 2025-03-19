<template>
  <div id="data-view" dv-bg>
    <div style="width:60%;margin-top:40px;height:420px;margin-left:10%;margin-right:10%;position: absolute;z-index: 9999;" id="mapContainer" ref="mapContainer" />
      <dv-full-screen-container v-if="isFullScreen">
        <div style="position:absolute;top:6px;left: 10px">
          <dv-button style="display:inline-block;z-index: 9999999;margin-left:10px;" fontSize="10" @click="onGoToLink(`/admin/dashboard/home/index`)" border="Border4" color="#409EFF">区建成</dv-button>
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="10" @click="onGoToLink(`/admin/dashboard/street/index`)" border="Border4" color="#615ea8">乡进入</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10"  color="#615ea8">村实现</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10"  color="#615ea8">户达标</dv-button>
        </div>
        <div style="position:absolute;top:6px;right: 10px">
          <p style="color:#409EFF;margin-right:10px;"><b>{{ curTime }}</b></p>
        </div>
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <dv-border-box11 title="仁 和 区 共 同 富 裕 数 字 化 平 台" :title-width="400" :animate="true" style="height:100vh">
          <div class="main-rows">
            
            <div style="width:25%">
              <rangeVillageGdp />
              <radarVillage/>
              <!-- <rankingCounty/> -->
              <barAreaGdp/>
            </div>
            <dv-border-box1 style="width:50%">
              <!-- <digitalGoodsStat/> -->
              <numberVillageStat />
              <div class="column-center">
                <div style="min-height: 300px; justify-content: center;position: relative"  />
              </div>
              <div class="column-footer">
                <div style="width:50%"><barFamilyGdp /></div>
                <div style="width:50%"><barAgricultureGdp /></div>
              </div>
            </dv-border-box1>
            <div style="width:25%">
              <pieCoutyGdp />
              <barVillageInsurance/>
              <barPeopleGdp/>
              <!-- <lineLgsh/> -->
            </div>
          </div>
        </dv-border-box11>
      </dv-full-screen-container>
      <div v-else>
        <div style="position:absolute;top:6px;left: 10px">
          <dv-button style="display:inline-block;z-index: 9999999;margin-left:10px;" fontSize="10" @click="console.log('click')" border="Border4" color="#409EFF">区建成</dv-button>
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="10" @click="console.log('click')" border="Border4" color="#615ea8">乡进入</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')" border="Border4" color="#615ea8">村实现</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')" border="Border4" color="#615ea8">户达标</dv-button>
        </div>
        <div style="position:absolute;top:6px;right: 10px">
          <p style="color:#409EFF;margin-right:10px;"><b>{{ curTime }}</b></p>
        </div>
        <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div>
        <dv-border-box11 title="仁 和 区 共 同 富 裕 数 字 化 平 台" :title-width="400" :animate="true" style="height:100vh">
          <div class="main-rows">
            
            <div style="width:25%">
              <rangeVillageGdp />
              <radarVillage/>
              <!-- <rankingCounty/> -->
             
              <barPeopleGdp/>
            </div>
            <dv-border-box1 style="width:50%">
              <numberVillageStat />
              <div class="column-center">
                <div style="min-height: 100px; justify-content: center;position: relative"  />
              </div>
              <div class="column-footer">
                <barFamilyGdp />
                <div>456</div>
              </div>
            </dv-border-box1>
            <div style="width:25%">
              <pieCoutyGdp />
              <radarLgsh/>
              <lineLgsh/>
            </div>
          </div>
        </dv-border-box11>
    </div>
  </div>
</template>

<script lang="ts">
import { ImageLayer, Map, PointLayer, Scene, Zoom } from '@antv/l7';
import dayjs from 'dayjs';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
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
    const router =  useRouter();
    const state: any = reactive({
        isFullScreen:true,// 是否全屏
        curTime:dayjs().format("YYYY年MM月DD日")
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
        logoVisible :false,
          map: new Map({
            
            center: [500, 500],
            zoom: 2,
            version: 'SIMPLE',
            mapSize: 1100,
            maxZoom: 5,
            minZoom: 1,
            pitchEnabled: true,
            rotateEnabled: true,
          }),
      });
      scene.setBgColor('rgb(94, 182, 140)');
      scene.on('loaded', () => {
        // 实例化 Zoom 控件，可以在构造器中传入控件的配置
      const zoom = new Zoom({
        position: 'rightbottom',
        className: 'my-test-class',
        style:"margin:20px;"
      });

      // 将实例化的控件添加至 L7 中
      scene.addControl(zoom);
      fetch('https://gw.alipayobjects.com/os/bmw-prod/7dc0d454-fabc-4461-a5d5-d404dadb49a9.json')
        .then((res) => res.json())
        .then((data) => {
          data=[
          {
            "x": 480,
            "y": 490,
            "t": "大龙潭村",
            "z": "5104030101"
          }]
          const textlayer = new PointLayer({ zIndex: 2 })
            .source(data, {
              parser: {
                type: 'json',
                x: 'x',
                y: 'y',
              },
            })
            
            .shape('t', 'text')
            .size(16)
            .active({
              color: '#00f',
              mix: 0.9,
            })
            
            .color('red')
            .style({
              textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
              spacing: 6, // 字符间距
              fontWeight: '800',
              padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
              stroke: '#ffffff', // 描边颜色
              strokeWidth: 2, // 描边宽度
              textAllowOverlap: true,
            });
          scene.addLayer(textlayer);
          textlayer.on('click', (e) => {
            console.log(e)
            alert( `
              <p>区域名称: ${e.feature.t}</p>
              <p>区域标识: ${e.feature.z}</p>
              <p>图中X坐标: ${e.x}</p>
              <p>图中Y坐标: ${e.y}</p>
            `);
          });
          const circlelayer = new PointLayer({ zIndex: 3 })
            .source(data, {
              parser: {
                type: 'json',
                x: 'x',
                y: 'y',
              },
            })
            .shape('circle')
            .size('mag', [1, 25])
            .color('mag', "'#5B8FF9'")
            .active(true)
            .style({
              opacity: 0.3,
              strokeWidth: 1,
            });
          scene.addLayer(circlelayer);
          });
        })
      const imagelayer = new ImageLayer({}).source('/img/res/dltc.png',
        {
          parser: {
            type: 'image',
            extent: [360, 400, 640, 600],
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
  color: #fff;
  
  
  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
  }
  .main-rows {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding:8vh 1vw 2vh 1vw;
    height: 100%;
    .dv-border-box-1{
      text-align: left;
    }
    .column-center {
      height: 59%;
      background-size: 100% 100%;
      margin:0px 20px 12px 20px;
    }
    .column-footer {
      display: flex;
      flex-direction: row;
      align-content: center;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      text-align:center;
      height: 26%;
      background-size: 100% 100%;
      margin:0px 10px 0px 10px;
    }
  }
  .dv-button {
    padding: 4px 10px !important;
  }
}

</style>
