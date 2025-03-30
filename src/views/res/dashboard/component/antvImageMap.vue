<template>
  <div>
    <div :id="uid" class="antvMapContainer" ref="mapContainer"/>
  </div>
</template>

<script lang="ts">
import {ImageLayer, Map, PointLayer, Scene} from '@antv/l7';
import {computed, getCurrentInstance, onBeforeMount, onMounted, reactive, ref, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';

export default {
  props: {
    areaCode: {
      type: String,
      default: '510411',
    },
    areaName: {
      type: String,
      default: '仁和区',
    },
    areaGoTo: {
      type: String,
      default: '',
    },
    center: {
      type: Array,
    },
    zoom: {
      type: Number,
    },
  },
  setup(props) {
    const {proxy} = getCurrentInstance() as any;
    let uid = ref('');
    let state = reactive({
      uid
    })
    const route = useRoute();
    const router = useRouter();
    const idVal = `antv-ImageMap-uid-${parseInt((Math.random() * 1000000).toString())}`
    onBeforeMount(() => {
      uid.value = idVal;
    });
    const getMapZoom = computed(() => {
      let zoom = 1.5;
      console.log("window.innerWidth:", window.innerWidth)
      if (window.innerWidth > 1024) {
        zoom = window.innerWidth / 660.0
      }
      return zoom;
    });
    //挂载
    onMounted(async () => {
      const scene = new Scene({
        id: uid.value,
        logoVisible: false,
        map: new Map({
          center: props.center || [500, 500],
          zoom: props.zoom || getMapZoom.value || 2.5,
          version: 'SIMPLE',
          mapSize: 1000,
          maxZoom: 5,
          minZoom: 1,
          pitchEnabled: true,
          rotateEnabled: true,
        }),
      });
      scene.on('loaded', () => {
        scene.addImage(
            '0', `/img/res/village_0.png`);
        scene.addImage(
            '1', `/img/res/village_1.png`);
        scene.addImage(
            '2', `/img/res/village_2.png`);
        scene.addImage(
            '3', `/img/res/village_3.png`);
        scene.addImage(
            '4', `/img/res/village_4.png`);
        scene.addImage(
            '5', `/img/res/village_5.png`);
        scene.addImage(
            '6', `/img/res/village_6.png`);
        scene.addImage(
            '7', `/img/res/village_7.png`);

        fetch(`/data/res/area/${props.areaCode}.json`)
            .then((res) => res.json())
            .then((data) => {

              const imageLayer = new PointLayer()
                  .source(data, {
                    parser: {
                      type: 'json',
                      x: 'x',
                      y: 'y',
                    },
                  })
                  .shape('icon')
                  .size(16);

              const textlayer = new PointLayer({zIndex: 2})
                  .source(data, {
                    parser: {
                      type: 'json',
                      x: 'x',
                      y: 'y',
                    },
                  })
                  .shape('name', 'text')
                  .size(16)
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
              if (props.areaGoTo) {
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

        fetch(`/data/res/site/${props.areaCode}.json`)
            .then((res) => res.json())
            .then((data) => {

              const imageLayer = new PointLayer()
                  .source(data, {
                    parser: {
                      type: 'json',
                      x: 'x',
                      y: 'y',
                    },
                  })
                  .shape('icon')
                  .size(16);

              const textlayer = new PointLayer({zIndex: 2})
                  .source(data, {
                    parser: {
                      type: 'json',
                      x: 'x',
                      y: 'y'
                    },
                  })
                  .shape('name', 'text')
                  .size(12)
                  .active({
                    color: '#0ff',
                    mix: 0.9,
                  })
                  .color('blue')
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
              imageLayer.on('click', (e) => {
              });
              textlayer.on('click', (e) => {
              });

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
  top: 28rem;
  left: 0;
  width: calc(100%);
  height: calc(100vh - 16rem);
  transform: translate(-0%, -0%);
  z-index: 1110;
}
</style>