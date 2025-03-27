<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">区建成
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px;"
                     @click="onGoToLink(`/admin/dashboard/street/index?areaCode=${streetAreaCode}`)">
            乡进入
          </dv-button>
          <dv-button key="" border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/village/index?areaCode=${areaCode}`)">村实现
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/family/index?areaCode=${areaCode}&areaName=${areaName}`)">
            户达标
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">

          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>{{
              curTime
            }}</b></p>
          <!-- <dv-button border="Border4" color="#409EFF"
                     fontSize="12" style="display:inline-block;margin-right:10px;"
                     @click="onGoToLink(`/admin/dashboard/home/detail`)">六优指标
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-right:10px;" @click="onClickCountDetail">区情介绍
          </dv-button> -->
        </div>
      </div>

      <div class="main-view">
        <div class="view-body">
          <div>
            <div class="margin-left">
              <Title title="村情介绍"/>
              <div class="target-text target-content text-left">
                <p class="margin" style="font-size: 2rem;text-align: left;">
                  混撒拉村是四川省攀枝花市仁和区大龙潭彝族乡下辖村，曾被四川省委城乡基层治理委员会评为“四川省首批乡村治理示范村镇”。
                </p>
              </div>

            </div>
            <div class="margin">
              <Title title="三超"/>
              <el-row :gutter="20" class="margin">
                <el-col :span="12">
                  <div class="text-center">
                    <column-chart :data="[3.1, 3.52, 3.7]" :label="['2022年', '2023年', '2024年']" :mark-line="2.45"/>
                    <text class="target-text">全村人均年可支配收入超全市农村人均年可支配收入</text>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="text-center">
                    <column-chart :data="[25.68, 29.1, 70.8]" :label="['2022年', '2023年', '2024年']"
                                  :mark-line="20"/>
                    <text class="target-text">村集体经济收入超20万元</text>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="margin">
              <el-popover
                  class="box-item"
                  content="村党组织战斗堡垒作用强，“三个身边”工作机制群众反映问题工单办结率100%。“先富”带“后富”机制完善特困、低保等重点群体托底保障机制健全。"
                  placement="top-start"
              >
                <template #reference>
                  <Title title="组织强"/>
                </template>
              </el-popover>
              <div class="target-text target-content padding-lg" style="text-align: left">
                <div class="margin-sm">
                  1.党组织1个（党委1个 党总支1个 党支部1个）<br/>
                  2.党员1个<br/>
                  3.党代表1个
                </div>

              </div>
              <div class="margin-top">
                <el-popover
                    class="box-item"
                    content="居民自治体系健全，居民公约完善，自治组织运行有序有效“四议两公开”规范化建设,一村一民(辅)警，一村一法律顾问。法律公共服务室与法律援助率100%。矛盾纠纷一式处理，化解率达95%，性质恶劣命案零发生"
                    placement="top-start"
                >
                  <template #reference>
                    <Title title="治理强"/>
                  </template>
                </el-popover>
                <div class="target-content">
                  <el-row :gutter="10" class="margin">
                    <el-col :span="8">
                      <div>
                        <text class="margin-sm">一村一民(辅)警</text>
                        <img alt="" class="margin-sm" height="160rem;" src="./img/pic.webp" width="120rem;">
                        <p>姓名：邓*志</p>
                        <p>职务：民警</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div>
                        <text>一村一法律顾问</text>
                        <img alt="" class="margin-sm" height="160rem;" src="./img/pic.webp" width="120rem;">
                        <p>姓名：邓*志</p>
                        <p>职务：顾问</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div>
                        <text>专职人民调解员</text>
                        <img alt="" class="margin-sm" height="160rem;" src="./img/pic.webp" width="120rem;">
                        <p>姓名：邓*志</p>
                        <p>职务：调解员</p>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="margin target-text">
                    <div>矛盾纠纷<b>1</b>件 已化解<b>1</b>件</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <dv-border-box1 class="view-content content2">
            <div class="view-box padding-top-xl margin-lr-xl">
              <Label :text="'总户数'" :title="3685"/>
              <Label :color="'#FCAE26FF'" :text="'达标户'" :title="2043"/>
              <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'55%'"/>
            </div>
            <div class="column-center" style="width: 100%;height:calc(48vh - 5.6rem)">
              <antvImageMap :center="[500,410]" :zoom="2" areaCode="510411200207" areaGoTo="street"></antvImageMap>
            </div>
            <div class="view-box">
              <div class="view-box-bottom">
                <Title title="五好指标户数"/>
                <div class="target-text">
                  <div class="target-content target-content-height">
                    <dv-capsule-chart :config="shyzConfig" style="width:100%;height:18rem;"/>
                  </div>
                </div>
              </div>
              <div class="view-box-bottom">
                <Title title="五不好指标户数"/>
                <div class="target-text">
                  <div class="target-content target-content-height">
                    <dv-capsule-chart :config="wbhConfig" style="width:100%;height:18rem;"/>
                  </div>
                </div>
              </div>
            </div>
            <div/>
          </dv-border-box1>

          <div>
            <div class="view-box">
              <Title title="两强四优"/>
              <div class="target-text target-content">
                <TopTwoAndTopFour/>
              </div>
            </div>
            <div class="margin-top">
              <Title title="产业优"/>
              <ProportionOfAgeGroups/>
            </div>
            <div class="margin-top">
              <Title title="环境优"/>
              <div class="target-text target-content">
                <environmental-excellence :data="[77.1, 100, 100,100, 100]"
                                          :label="['⾃来⽔', '卫⽣厕所', '⽣活污⽔', '⽣活垃圾', '硬化路率']"
                                          :mark-line="0"/>
              </div>
            </div>
            <div class="margin-top">
              <Title title="文化优"/>
              <div class="target-text target-content" style="text-align: left">
                <el-row class="margin-sm">
                  <el-col :span="12">
                    文化广场：220㎡
                  </el-col>
                  <el-col :span="12">
                    村史馆：1个
                  </el-col>
                  <el-col :span="12">
                    乡村推荐官：1人
                  </el-col>
                  <el-col :span="12">
                    文艺队伍：1支
                  </el-col>
                  <el-col :span="12">
                    文旅品牌：蜜雪冰城
                  </el-col>
                  <el-col :span="12">
                    综合文化服务率：54%
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="margin-top">
              <Title title="服务优"/>
              <div class="target-text target-content padding-lg" style="text-align: left">
                <el-row class="margin-sm">
                  <el-col :span="12">
                    公共停车场：1个
                  </el-col>
                  <el-col :span="12">
                    前教育毛入园率：40%
                  </el-col>
                  <el-col :span="12">
                    基本养老保险参保率：40%
                  </el-col>
                  <el-col :span="12">
                    基本医疗保险参保率：40%
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import {reactive, toRefs} from 'vue';
import {useRoute, useRouter} from "vue-router";
import antvImageMap from "/@/views/res/dashboard/component/antvImageMap.vue";
import Label from "/@/views/res/dashboard/component/Label.vue";
import ColumnChart from "/@/views/res/dashboard/village/ColumnChart.vue";
import EnvironmentalExcellence from "/@/views/res/dashboard/village/EnvironmentalExcellence.vue";
import ProportionOfAgeGroups from "/@/views/res/dashboard/village/ProportionOfAgeGroups.vue";
import Title from "/@/views/res/dashboard/village/Title.vue";
import TopTwoAndTopFour from "/@/views/res/dashboard/village/TopTwoAndTopFour.vue";

export default {
  name: "IndexDashboard",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    antvImageMap,
    EnvironmentalExcellence,
    ProportionOfAgeGroups,
    TopTwoAndTopFour,
    ColumnChart,
    Label,
    Title
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const areaCode = route.query.areaCode;
    const areaName = route.query.areaName || "";
    const streetAreaCode = areaCode?.toString().slice(0, 9)
    const countyAreaCode = areaCode?.toString().slice(0, 6)
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      curTime: dayjs().format("YYYY年MM月DD日"),
      areaCode: areaCode,
      areaName: areaName,
      streetAreaCode: streetAreaCode,
      countyAreaCode: countyAreaCode,
      shyzConfig: {
        data: [
          {
            name: '基本养老保险购',
            value: 55
          },
          {
            name: '生活用水安全',
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
        fontSize: 11
      },
      wbhConfig: {
        data: [
          {
            name: '养老保险',
            value: 55
          },
          {
            name: '未买医保',
            value: 21
          },
          {
            name: '缺水',
            value: 67
          },
          {
            name: 'D级危房',
            value: 98
          },
          {
            name: '辍学学生',
            value: 88
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '人',
        showValue: true,
        labelNum: 5,
        fontSize: 11
      },
    })
    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }
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
      }

      .content1 {
        grid-template-rows:auto;

        .view-box {

          .view-box-table {
            display: grid;
            grid-template-columns:1fr 1fr;
            grid-column-gap: 2em;
            align-items: start;
            justify-content: flex-end;

            div {
              text-align: center;

              text {
                font-size: 1em;
                color: #28A2CE;
              }
            }
          }

          .box-zl {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 1rem;

            div {
              display: flex;
              flex-direction: column;
              align-items: center;


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
            margin: 1em 0 0 0;
          }
        }
      }

      .content2 {
        grid-template-rows:auto 1fr;

        .view-box {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .view-box-bottom {
            width: 100%;
          }
        }

      }

      .content3 {
        width: 100%;
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


}
</style>