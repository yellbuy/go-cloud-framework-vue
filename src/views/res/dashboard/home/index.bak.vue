<template>
  <div id="data-view" dv-bg>
    <div style="width: 100%; height: 500px;" ref="mapContainer" id="map"/>
      <dv-full-screen-container v-if="isFullScreen">
        <!-- <div style="width: 100%; height: 500px;" ref="mapContainer" id="map"/> -->
      </dv-full-screen-container>
      <div v-else>
        <div style="position:absolute;top:6px;left: 10px">
          <dv-button style="display:inline-block;z-index: 9999999;margin-left:10px;" fontSize="10" @click="console.log('click')" border="Border4" color="#409EFF">区建成</dv-button>
          <dv-button style="display:inline-block;margin-left:10px;" fontSize="10" @click="console.log('click')" border="Border4" color="#615ea8">乡进入</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')" border="Border4" color="#615ea8">村实现</dv-button>
          <dv-button style="display:inline-block;margin-left:10px" fontSize="10" @click="console.log('click')" border="Border4" color="#615ea8">户达标</dv-button>
        </div>
        <div style="position:absolute;top:6px;right: 10px">
          <p style="color:#409EFF;margin-right:10px;">2025年03月15日09:15:20</p>
        </div>
        <!-- <div style="position:absolute;top:10px;right:10px">
          <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
        </div> -->
        <dv-border-box11 title="仁 和 区 共 同 富 裕 数 字 化 平 台" :title-width="400" :animate="true" style="height:100vh">
          <div class="main-rows">
            
            <div style="width:25%">
              <flareTarget />
              <radarLgsh/>
              <barCoutyGdp/>
            </div>
            <dv-border-box1 style="width:50%">
              <digitalGoodsStat/>
              <div class="column-center">
                <div style="min-height: 500px; justify-content: center;position: relative"  />
              </div>
            </dv-border-box1>
            <div style="width:25%">
              <pieCoutyGdp />
              <rankingCounty/>
              <lineLgsh/>
            </div>
          </div>
        </dv-border-box11>
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, reactive, ref, toRefs } from 'vue';

  import { ImageLayer, Map, Scene } from '@antv/l7';
import barCoutyGdp from "./barVillageGdp.vue";
import digitalGoodsStat from "./digitalGoodsStat.vue";
import flareTarget from "./flareTarget.vue";
import lineLgsh from "./lineLgsh.vue";
import pieCoutyGdp from "./pieCountyGdp.vue";
import radarLgsh from "./radarLgsh.vue";
import rankingCounty from "./rankingCounty.vue";
export default {
  name: "IndexDashboard",
  components: {
    flareTarget,
    rankingCounty,
    digitalGoodsStat,
    barCoutyGdp,
    pieCoutyGdp,
    radarLgsh,
    lineLgsh,
  },
  setup() {
    const mapContainer = ref();
    const state: any = reactive({
        isFullScreen:true,// 是否全屏
        
    })
    const onFullScreen = () => {
			//admin/dashboard/app/fullScreen
      state.isFullScreen=!state.isFullScreen
		};
    
    // 页面加载时
		onMounted(() => {
    
      const scene = new Scene({
        id: 'map',
          map: new Map({
            center: [500, 500],
            zoom: 3,
            version: 'SIMPLE',
            mapSize: 2000,
            maxZoom: 5,
            minZoom: 2,
            pitchEnabled: true,
            rotateEnabled: true,
          }),
      });
      scene.setBgColor('rgb(94, 182, 140)');
      const imagelayer = new ImageLayer({}).source('/img/res/renhe.png',
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
      height: 82%;
      background-size: 100% 100%;
      margin:0px 20px 12px 20px;
    }
  }
  .dv-button {
    padding: 4px 10px !important;
  }
}

</style>
