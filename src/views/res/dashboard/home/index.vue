<template>
  <div id="data-view" dv-bg>
    
    <div style="width:100vw;height:100vh;position: relative;">
      <div id="mapContainer" ref="mapContainer" />
    </div>
    <dv-full-screen-container>
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
      
      <!-- <div style="position:absolute;top:10px;right:10px">
        <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
      </div> -->
      <div class="main-rows">
          <div style="width:25%">
            <div>
              <div class="target-header">
                <div class="target-title">经济优建</div>
             </div>
             <div >
              <div style="display:inline-block;" >
                <div class="target-content">
                  <div>地区生产总值（亿）</div>
                  <div class="target-value"><b>300</b></div>
                </div>
                
              </div>
              <div style="display:inline-block;margin-left:10px">
                <div style="display:inline-block;" class="target-content">
                  <div>人均地区生产总值（万）</div>
                  <div class="target-value"><b>9.45</b></div>
                </div>
                
              </div>
             </div>
            </div>
            <div>
              <div class="target-header">
                <div class="target-title">民生优享</div>
             </div>
             <div >
              <div style="display:inline-block;" >
                <div class="target-content">
                  <div>地区生产总值（亿）</div>
                  <div class="target-value"><b>300</b></div>
                </div>
                
              </div>
              <div style="display:inline-block;margin-left:10px">
                <div style="display:inline-block;" class="target-content">
                  <div>人均地区生产总值（万）</div>
                  <div class="target-value"><b>9.45</b></div>
                </div>
                
              </div>
             </div>
            </div>
            
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
    
</div>
</template>

<script lang="ts">
import { ImageLayer, Map, PointLayer, Scene } from '@antv/l7';
import dayjs from 'dayjs';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import actVillage from "../component/actVillage.vue";
import barAgricultureGdp from "../component/barAgricultureGdp.vue";
import barAreaGdp from "../component/barAreaGdp.vue";
import barFamilyGdp from "../component/barFamilyGdp.vue";
import barPeopleGdp from "../component/barPeopleGdp.vue";
import barStreet from "../component/barStreet.vue";
import barCoutyGdp from "../component/barVillageGdp.vue";
import barVillageInsurance from "../component/barVillageInsurance.vue";
import flareTarget from "../component/flareTarget.vue";
import lineFamily from "../component/lineFamily.vue";
import numberVillageStat from "../component/numberVillageStat.vue";
import pieCoutyGdp from "../component/pieCountyGdp.vue";
import radarCounty from "../component/radarCounty.vue";
import radarFamily from "../component/radarFamily.vue";
import radarLgsh from "../component/radarLgsh.vue";
import radarStreet from "../component/radarStreet.vue";
import radarVillage from "../component/radarVillage.vue";
import rangeVillageGdp from "../component/rangeVillageGdp.vue";
import rankingCounty from "../component/rankingCounty.vue";

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
    const route = useRoute();
		console.log('路由', route.query);
    const router =  useRouter();
    const mapContainer = ref();
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      curTime: dayjs().format("YYYY年MM月DD日")
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
      // imagelayer.on('click', (e) => {
      //   console.log(e)
      //   alert( `
      //     <p>区域名称: ${e.feature.name}</p>
      //     <p>区域标识: ${e.feature.code}</p>
      //     <p>图中X坐标: ${e.x} = ${e.x+250}</p>
      //     <p>图中Y坐标: ${e.y} = ${(1000+(500-e.y)/2)/2}</p>
      //   `);
      // });
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
#mapContainer{
  top: 52%; left: 49%;
  width:50vw;height:50vw; 
  transform: translate(-49%, -48%);
  position: absolute;z-index: 9999;
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
.target-header{
  text-align: left;
  padding-top:6px;
  margin-top: 2vh;
  margin-left:10px;
  margin-right:10px;
  height: 36px;
  background-image: linear-gradient(to right,#061A8F,transparent);
  border-radius: 2px;
}
.target-title{
  background-image: radial-gradient(circle, #daeef3 10%, #0075FF);
  //background-image: radial-gradient(circle, #01BBE9 10%, #0075FF);
  width:100px;
  font-weight: bold;
  background-clip: text;
  color: transparent;
  padding-left:20px;
  font-size: 16px;
}
.target-content{
  width:100%;
  margin:10px;
  padding:10px;
  text-align: center;
  color:#28A2CE;
  border-radius: 4px;
  box-shadow: rgb(29, 72, 196) 0px 0px 25px 3px inset;
}
.target-value{
  color:#12AD78;
  text-align: center;
  font-size:24px;
  font-weight: 500;
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

    .dv-border-box-1 {
      text-align: left;
      height:auto !important;
      margin-bottom: 4px;
    }

    .column-center {
      height: 50%;
      background-size: 100% 100%;
      margin: 10px;
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
