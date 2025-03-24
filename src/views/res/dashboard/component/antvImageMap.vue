<template>
  <div>
    <div :id="uid" class="antvMapContainer" ref="mapContainer"/>
  </div>
</template>

<script lang="ts">
import { ImageLayer, Map, PointLayer, Scene } from '@antv/l7';
import { computed, getCurrentInstance, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  props: {
		areaCode: {
			type: String,
			default:'510411',
		},
    areaName: {
			type: String,
			default:'仁和区',
		},
    areaGoTo: {
			type: String,
			default:'',
		},
	},
  setup(props) {
    const { proxy } = getCurrentInstance() as any;
    let uid = ref('');
    let state = reactive({
      uid
    })
    const route = useRoute();
    const router = useRouter();
    const idVal=`antv-ImageMap-uid-${parseInt((Math.random() * 1000000).toString())}`
    onBeforeMount(() => {
      uid.value = idVal;
    });
    const getMapZoom = computed(() => {
      let zoom=1.5;
      console.log("window.innerWidth:",window.innerWidth)
      if (window.innerWidth > 1024) {
        zoom= window.innerWidth/630.0
      } 
      return zoom;
    });
        //挂载
    onMounted(async () => {
      const scene = new Scene({
        id: uid.value,
        logoVisible: false,
        map: new Map({
          center: [500, 500],
          zoom: getMapZoom.value||2.5,
          version: 'SIMPLE',
          mapSize: 1000,
          maxZoom: 5,
          minZoom: 1,
          pitchEnabled: true,
          rotateEnabled: true,
        }),
      });
      scene.on('loaded', () => {
        fetch(`/data/res/area/${props.areaCode}.json`)
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
              if(props.areaGoTo){
                imageLayer.on('click', (e) => {
                    console.log(e)
                    alert(`
                  <p>区域名称: ${e.feature.name}</p>
                  <p>区域标识: ${e.feature.code}</p>
                  <p>图中X坐标: ${e.x}</p>
                  <p>图中Y坐标: ${e.y}</p>
                `);
                  });
                  textlayer.on('click', (e) => {
                  console.log(e)
                  router.push(`/admin/dashboard/${props.areaGoTo}/index?areaCode=${e.feature.code}&areaName=${e.feature.name}`);
                  console.log(`
                  <p>区域名称: ${e.feature.name}</p>
                  <p>区域标识: ${e.feature.code}</p>
                  <p>图中X坐标: ${e.x}</p>
                  <p>图中Y坐标: ${e.y}</p>
                `);
                });
              }
              
              scene.addLayer(imageLayer);
              scene.addLayer(textlayer);
            });
      })
      const imagelayer = new ImageLayer({}).source(`/img/map/${props.areaCode}.png`,
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
      })
      return {
        ...toRefs(state),
      }
    },
  }
</script>
 
<style lang='scss' scoped>
.antvMapContainer {
  top: 50%;
  left: 47%;
  width: 50vw;
  height: 80vh;
  transform: translate(-50%, -46%);
  position: absolute;
  z-index: 1110;
}
</style>