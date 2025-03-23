<template>
  <div id="data-view" dv-bg>
    <div id="mapContainer" ref="mapContainer"/>
    <dv-full-screen-container>
      <div class="main-view">
        <div id="banner">
          <div class="banner-content">
            <dv-button border="Border4" color="#615ea8" fontSize="22.5" @click="onGoToLink(`/admin/index`)">
              区建成
            </dv-button>
            <dv-button border="Border4"
                       color="#409EFF" fontSize="22.5" @click="onGoToLink(`/admin/dashboard/street/index?areaCode=${areaCode}&areaName=${areaName}`)">
              乡进入
            </dv-button>
            <dv-button key="" border="Border4" color="#615ea8"
                       fontSize="22.5">
              村实现
            </dv-button>
            <dv-button border="Border4" color="#615ea8" fontSize="22.5"
                       @click="onGoToLink(`/admin/dashboard/family/index`)">
              户达标
            </dv-button>
          </div>
          <div/>
          <div class="banner-content">
            <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:2em"><b>{{
                curTime
              }}</b></p>
            <dv-button border="Border4" color="#409EFF"
                       fontSize="22.5" @click="onClickTargetDetail">六优指标
            </dv-button>
            <dv-button border="Border4" color="#409EFF"
                       fontSize="22.5" @click="onClickCountDetail">区情介绍
            </dv-button>
          </div>
        </div>

        <div class="view-body">
          <div class="view-content content1">
            <div class="view-box">
              <Title title="乡情介绍"/>
              <div class="target-text">
                <div class="mt20">
                  大龙潭彝族乡，隶属于四川省攀枝花市仁和区，地处仁和区东南部，东隔金沙江与会理市相望，南与平地镇相连，西与大田镇、仁和镇毗邻，北与金江镇接壤。
                  辖区总面积243.69平方千米。截至2018年末，大龙潭彝族乡户籍人口15650人。原属云南省永仁县第三区。1984年，改为大龙潭彝族乡。
                  截至到2020年6月，大龙潭彝族乡下辖6个行政村， 乡人民政府驻裕民街43号。
                </div>
              </div>
            </div>
            <div class="view-box">
              <Title title="两高"/>
              <div class="target-text">
                <oval-shape/>
              </div>
            </div>
            <div class="view-box">
              <Title title="村实现完成情况"/>
              <div class="target-text cun">
                <div style="text-align: center">
                  <img src="./img/ldt.png"/>
                  <div>三超</div>
                </div>
                <div style="text-align: center">
                  <img src="./img/ldt.png"/>
                  <div>四优</div>
                </div>
                <div style="text-align: center">
                  <img src="./img/ldt.png"/>
                  <div>两强</div>
                </div>
              </div>
            </div>
          </div>

          <div class="view-content content2">
            <div class="view-box">
              <Label :text="'总户数'" :title="10000"/>
              <Label :color="'#FCAE26FF'" :text="'达标村数'" :title="6"/>
              <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'95%'"/>
            </div>
            <div/>
          </div>

          <div class="view-content content3">
            <div class="view-box">
              <Title title="公共服务均等化"/>
              <div class="target-text">
                <div class="view-box-label">
                  <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'学前教育三年毛入园率(%)'" class="target-content"/>
                  <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'全民医疗保险参保率(%)'" class="target-content"/>
                  <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'特殊人群医疗保险参保率(%)'"
                          class="target-content"/>
                  <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'农村客运覆盖率(%)'" class="target-content"/>
                </div>
                <div class="mt20">
                  实现了幼有善育、学有优教、病有良医、老有康养、住有宜居、弱有帮扶。 一所中小学和附属中心幼儿园。
                  实现了农村客运全覆盖,村村通邮。建有农业社会化服务站。
                </div>
              </div>
            </div>
            <div class="view-box">
              <Title title="基础设施一体化"/>
              <div class="target-text">
                <div class="view-box-label">
                  <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'自来水普及率(%)'" class="target-content"/>
                  <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'自然村通硬化路率(%)'" class="target-content"/>
                </div>
                <div class="mt20">
                  文化健身等基础设施配套完善,公共基础设施管理、运行、养护机制完善健全。生活垃圾收转运处置体系行政村覆盖率100%。
                </div>
              </div>
            </div>
            <div class="view-box">
              <Title title="乡村治理现代化"/>
              <div class="target-text">
                <div class="mt20">
                  社会主义核心价值观深入人心，乡级综治中心规范化建设，建有数字乡村平台，实现雪亮工程全盖。矛盾纠纷妥善化解，自治、法治、德治相结合的治理体系基本构建，物质富足、精神富有、乡风文明。
                </div>
              </div>
            </div>
            <div class="view-box">
              <Title title="产业发展规模化"/>
              <div class="target-text">
                <div class="mt20">
                  产业发展规模化
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
import {ImageLayer, Map, PointLayer, Scene} from '@antv/l7';
import dayjs from 'dayjs';
import {onMounted, reactive, toRefs} from 'vue';
import Title from "/@/views/res/dashboard/village/Title.vue";
import Label from "/@/views/res/dashboard/component/Label.vue";
import Label1 from "/@/views/res/dashboard/component/Label1.vue";
import OvalShape from "/@/views/res/dashboard/village/OvalShape.vue";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "IndexDashboard",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {OvalShape, Label1, Label, Title},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      curTime: dayjs().format("YYYY年MM月DD日"),
      areaCode: route.query.areaCode,
      areaName: route.query.areaName,
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
          zoom: 3.5,
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
  left: 40%;
  width: 100vw;
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
        margin-top: -3em;
        height: 100%;
        display: grid;
        grid-row-gap: 2em;
      }

      .content1 {
        grid-template-rows:auto;

        .view-box {
          margin-left: 3em;

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
          margin-right: 3em;

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
    font-size: 2em;
    margin: 0.5em;
    color: #28A2CE;
  }

  .target-content {
    width: auto;
    margin: 0.3em;
  }
}
</style>