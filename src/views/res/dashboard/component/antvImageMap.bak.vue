<template>
  <div >
    <div :id="uid" style="padding-bottom: 2rem;"/>
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
      let zoom=1;
      console.log("window.innerWidth:",window.innerWidth)
      if (window.innerWidth > 1024) {
        zoom= window.innerWidth/720.0
      } 
      return zoom;
    });
        //挂载
    onMounted(async () => {
      const map= new Map({
          center: [500, 500],
          zoom: getMapZoom.value||2.5,
          version: 'SIMPLE',
          mapSize: 1000,
          maxZoom: 5,
          minZoom: 1,
          pitchEnabled: true,
          rotateEnabled: true,
        });
        // map.on('mousemove', (event) => {
        // const coordinate = map.getCoordinateFromPixel([event.offsetX, event.offsetY]);
        // console.log(coordinate); // 输出鼠标所在位置的经纬度
      // });
      // map.on('zoomend', () => {
      //   // 处理缩放后的逻辑
      // });
      
      // map.on('panend', () => {
      //   // 处理平移后的逻辑
      // });
      const scene = new Scene({
        id: uid.value,
        logoVisible: false,
        map: map
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
                  imageLayer.on('click', (e) => {
                    console.log(e)
                    router.push(`/admin/dashboard/street/index?areaCode=${e.feature.code}&areaName=${e.feature.name}`);
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
                    router.push(`/admin/dashboard/street/index?areaCode=${e.feature.code}&areaName=${e.feature.name}`);
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
              extent: [360, 400, 610, 650],
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

</style>