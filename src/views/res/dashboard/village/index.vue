<template>
  <div id="data-view" dv-bg>
    <div id="mapContainer" ref="mapContainer" style="width: 100em;height: 100em"/>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#615ea8" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">区建成
          </dv-button>
          <dv-button border="Border4" color="#615ea8" fontSize="12" style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/dashboard/street/index?areaCode=${streetAreaCode}`)">
            乡进入
          </dv-button>
          <dv-button key="" border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px">村实现
          </dv-button>
          <dv-button border="Border4" color="#615ea8" fontSize="12" style="display:inline-block;margin-left:10px">
            户达标
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">

          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>{{
              curTime
            }}</b></p>
          <dv-button border="Border4" color="#409EFF"
                     fontSize="12" style="display:inline-block;margin-right:10px;"
                     @click="onGoToLink(`/admin/dashboard/home/detail`)">六优指标
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-right:10px;" @click="onClickCountDetail">区情介绍
          </dv-button>
        </div>
      </div>
      <div class="main-view">
        <div class="view-body">
          <div class="view-content content1">
            <div class="view-box">
              <Title title="村情介绍"/>
              <div class="target-text target-content m15">
                混撒拉村是四川省攀枝花市仁和区大龙潭彝族乡下辖村，曾被四川省委城乡基层治理委员会评为“四川省首批乡村治理示范村镇”。
              </div>
            </div>
            <div class="view-box">
              <Title title="三超"/>
              <div class="view-box-title">
                <Memo style="width: 1.5em; height: 1.5em;margin-right: 0.2em"/>
                <text>基本富裕达标户数占比50%</text>
              </div>
              <div class="view-box-table">
                <div>
                  <column-chart :data="[3.1, 3.52, 3.7]" :label="['2022年', '2023年', '20224年']"/>
                  <text>全村人均年可支配收入超全市农村人均年可支配收入</text>
                </div>
                <div>
                  <column-chart :data="[25.68, 29.1, 170.8]" :label="['2022年', '2023年', '20224年']"/>
                  <text>村集体经济收入超20万元</text>
                </div>
              </div>
            </div>
            <div class="view-box">
              <Title title="组织强"/>
              <div class="target-text target-content m15">
                村党组织战斗堡垒作用强，“三个身边”工作机制群众反映问题工单办结率100%。“先富”带“后富”机制完善特困、低保等重点群体托底保障机制健全。
              </div>
            </div>
            <div class="view-box">
              <Title title="治理强"/>
              <div class="target-text target-content m15">
                居民自治体系健全，居民公约完善，自治组织运行有序有效“四议两公开”规范化建设,一村一民(辅)警，一村一法律顾问。法律公共服务室与法律援助率100%。矛盾纠纷一式处理，化解率达95%，性质恶劣命案零发生
              </div>
            </div>
          </div>

          <div class="view-content content2">
            <div class="view-box">
              <Label :text="'总户数'" :title="10000"/>
              <Label :color="'#FCAE26FF'" :text="'达标户'" :title="9500"/>
              <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'95%'"/>
            </div>
            <div/>
          </div>

          <div class="view-content content3">
            <div class="view-box">
              <Title title="产业优"/>
              <div class="target-text target-content m15">
                具备特色农业支柱产业，支柱产业产值占农业总产值90%
              </div>
            </div>
            <div class="view-box">
              <Title title="环境优"/>
              <div class="target-text target-content m15">
                生活用水安全稳定，自来水普及率95%，农村卫生厕所普及率98%，生活污水得到有效治理，生活垃圾实现收运处置，住房安全等级B级，村容村貌整洁，无乱搭乱建，自然村(组)通硬件路率100%
              </div>
            </div>
            <div class="view-box">
              <Title title="文化优"/>
              <div class="target-text target-content m15 target-content">
                建成一文化广场、一文艺队伍、一村史馆、一乡村推荐官、-文旅品牌，综合文化服务80%常住人口
              </div>
            </div>
            <div class="view-box">
              <Title title="服务优"/>
              <div class="target-text target-content m15 target-content">
                公共服务保障完善。有1名农村社会化服务协办员，开展农业社会化服务。残疾儿童实现随班就读或送教上门。有家庭医生服务团队。成功创建市级健康村。适龄人员养老保险参保率95%。
              </div>
            </div>
            <div class="view-box">
              <Title title="五好指标户数"/>
              <div class="target-text">
                <div class="target-content target-content-height">
                  <dv-capsule-chart :config="shyzConfig" style="width:100%;height:28rem;"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import { ImageLayer, Map, PointLayer, Scene } from '@antv/l7';
import { Memo } from "@element-plus/icons-vue";
import dayjs from 'dayjs';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from "vue-router";
import Label from "/@/views/res/dashboard/component/Label.vue";
import ColumnChart from "/@/views/res/dashboard/village/ColumnChart.vue";
import Title from "/@/views/res/dashboard/village/Title.vue";

export default {
  name: "IndexDashboard",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {ColumnChart, Memo, Label, Title},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const areaCode=route.query.areaCode;
    const areaName=route.query.areaName;
    const streetAreaCode=areaCode?.toString().slice(0,9)
    const countyAreaCode=areaCode?.toString().slice(0,6)
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      curTime: dayjs().format("YYYY年MM月DD日"),
      areaCode: areaCode,
      areaName: areaName,
      streetAreaCode:streetAreaCode,
      countyAreaCode:countyAreaCode,
      shyzConfig: {
        data: [
          {
            name: '基本养老保险购',
            value: 55
          },
          {
            name: '生活用水安金',
            value: 21
          },
          {
            name: '供电稳定不断',
            value: 67
          },
          {
            name: '家用网络质量好',
            value: 98
          },
          {
            name: '垃圾不乱堆',
            value: 88
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '人',
        showValue: true,
        labelNum: 5,
        fontSize: 13
      },
    })
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
          zoom: 2.3,
          version: 'SIMPLE',
          mapSize: 1000,
          maxZoom: 5,
          minZoom: 1,
          pitchEnabled: true,
          rotateEnabled: true,
        }),
      });
      scene.on('loaded', () => {
        fetch(`/data/res/area/${state.areaCode}.json`)
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
                router.push(`/admin/dashboard/village/index?areaCode=${e.feature.code}&areaName=${e.feature.name}`);
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
      const imagelayer = new ImageLayer({}).source(`/img/map/${state.areaCode}.png`,
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
      ...toRefs(state),
      onGoToLink
    };
  },
};
</script>

<style lang="less">
#mapContainer {
  top: 54%;
  left: 49%;
  width: 50vw;
  height: 70vh;
  transform: translate(-49%, -46%);
  position: absolute;
  z-index: 1111;
}

#data-view {
  width: 100%;
  height: 100%;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("/img/res/bg_2.jpg");
    background-size: 100% 100%;
  }

  .main-view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows:auto 1fr;

    #banner {
      width: 100%;
      height: 20em;
      background-image: url(/img/res/banner.png);
      background-repeat: no-repeat;
      background-position: center top;
      background-size: 100% auto;
      display: grid;
      grid-template-columns:auto 1fr auto;
      grid-template-rows:auto;

      .banner-content {
        margin-top: 5.5em;
        display: grid;
        grid-template-columns:repeat(4, auto);
        grid-column-gap: 2em;
        align-items: start;
      }

      .banner-content:first-child {
        margin-left: 10em;
      }

      .banner-content:last-child {
        margin-right: 10em;
      }
    }

    .view-body {
      display: grid;
      height: 100%;
      grid-template-columns:1fr 2fr 1fr;
      grid-column-gap: 2em;
      align-items: start;

      .view-content {
        height: 100%;
        display: grid;
        grid-row-gap: 2em;
      }

      .content1 {
        grid-template-rows:auto;

        .view-box {

          .view-box-table {
            display: grid;
            grid-template-columns:1fr 1fr;
            grid-column-gap: 2em;
            align-items: center;

            div {
              text-align: center;

              text {
                font-size: 1em;
                color: #28A2CE;
              }
            }
          }

          .view-box-title {
            display: flex;
            align-items: center;
            justify-content: center; /*水平主轴居中*/
            color: #28A2CE;
            font-size: 1em;
            background-color: #0e136f;
            border-radius: 2em;
            padding: 1em;
            margin: 1em 0 0 3em;
          }

          .cun {
            display: grid;
            grid-template-columns:1fr 1fr;
            grid-column-gap: 2em;
            align-items: center;
            justify-content: center;

            img {
              width: 10em;
              height: 10em;
            }
          }
        }
      }

      .content2 {
        grid-template-rows:auto 1fr;

        .view-box {
          display: flex;
          justify-content: space-between;
        }

      }

      .content3 {
        grid-template-rows:auto;
        justify-self: center;

        .view-box {

          .view-box-label {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns:repeat(2, 1fr);
            grid-column-gap: 2em;
            justify-self: center;
            align-items: center;
          }
        }
      }
    }
  }

  .target-text {
    margin: 0.5em;
    color: #28A2CE;
  }

  .target-content {
    width: auto;
    margin: 0.3em;
  }
}
</style>