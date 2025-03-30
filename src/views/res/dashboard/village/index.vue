<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">区迈⼊
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px;"
                     @click="onGoToLink(`/admin/dashboard/street/index?areaCode=${streetAreaCode}`)">
            乡推进
          </dv-button>
          <dv-button key="" border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/village/index?areaCode=${areaCode}`)">村共创
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/family/index?areaCode=${areaCode}&areaName=${areaName}`)">
            户夯实
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">
          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>
            {{ curTime }}
          </b></p>
        </div>
      </div>

      <div class="main-view">
        <div class="view-body">
          <div class="content">
            <div class="margin-left">
              <Title title="村情介绍"/>
              <div class="target-text target-content text-left target-container-h3">
                <p class="margin" style="text-align: left;font-size:1.3rem">
                  混撒拉村位于仁和区南部，距城区17.5km。辖区面积21平方公里，平均海拔1400m,现有村民520户2020人，少数民族人口占比65%，设有1个党总支，3个党支部，共有党员55名。全村耕地848亩、林地8160亩，以种植芒果、乡村旅游等产业为主，辖区内有企业2家、商户12家、农民专业合作社7个、家庭农场43家、村级卫生室1家，正在建设美丽乡村试点县项目。
                </p>
              </div>
            </div>

            <div class="margin-left margin-top">
              <div class="target-content">
                <Title title="两强"/>
                <el-popover
                    class="box-item"
                    content="村党组织战斗堡垒作用强，“三个身边”工作机制群众反映问题工单办结率100%。“先富”带“后富”机制完善特困、低保等重点群体托底保障机制健全。"
                    placement="top-start"
                >
                  <template #reference>
                    <div class="margin-top-lg margin-bottom" style="color:#3e98f6;font-size: 1.2rem;">组织强
                    </div>
                  </template>
                </el-popover>
                <div class="target-text padding-lg target-content" style="text-align: left">
                  <div class="margin-sm">
                    <i class="fa fa-star margin-right-sm" style="color: orange"></i>全省5A先进村党组织<br/>
                    <div class="text-center margin-top">
                      党组织<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">1</label>个
                    </div>
                    <div class="text-center margin-top-xs">
                      （党委<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">1</label>个
                      党总支<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">1</label>个
                      党支部<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">3</label>个）
                    </div>
                    <div class="text-center margin-tb-lg">
                      党员<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">55</label>人
                      党总支<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">1</label>人
                      党代表<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">3</label>人
                    </div>
                  </div>

                </div>
                <div class="margin-top">
                  <el-popover
                      class="box-item"
                      content="居民自治体系健全，居民公约完善，自治组织运行有序有效“四议两公开”规范化建设,一村一民(辅)警，一村一法律顾问。法律公共服务室与法律援助率100%。矛盾纠纷一式处理，化解率达95%，性质恶劣命案零发生"
                      placement="top-start"
                  >
                    <template #reference>
                      <div class="margin-top-lg margin-bottom" style="color:#3e98f6;font-size: 1.2rem;">治理强
                      </div>
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
                      <div>
                        矛盾纠纷<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">198</label>件
                        已化解<label class="margin-xs" style="color:#1AFD9BFF;font-size: 1.4rem">68</label>件
                      </div>
                    </div>
                  </div>

              </div>


              </div>
            </div>

          </div>
          <dv-border-box1 class="view-content content2">
            <div class="view-box padding-top-xl margin-lr-xl">
              <Label :text="'总户数'" :title="380"/>
              <Label :text="'总人口'" :title="1527"/>
              <Label :text="'达标户'" :title="'193'"/>
              <Label :text="'占比'" :title="'50.79%'"/>
            </div>
            <div class="column-center" style="width: 100%;height:calc(100vh  - 18rem - 21.6rem)">
              <antvImageMap :areaCode="areaCode" :center="[500,410]" :zoom="2" areaGoTo="village"></antvImageMap>
            </div>
            <div class="view-box">
              <div style="width: 100%">
                <Title title="三超"/>
                <div class="target-content">
                  <el-row :gutter="24" class="margin">
                    <el-col :span="12">
                      <div class="text-center">
                        <column-chart :data="[2.5, 2.68, 3.24]" :label="['2022年', '2023年', '2024年']"
                                      :mark-line="[2.19,2.30,2.45]"/>
                        <text class="target-text">全村人均年可支配收入超全市农村人均年可支配收入</text>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="text-center">
                        <column-chart :data="[25.68, 29.1, 170.8]" :label="['2022年', '2023年', '2024年']"
                                      :mark-line="[20,20,20]"/>
                        <text class="target-text">村集体经济收入超20万元</text>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <div/>
          </dv-border-box1>

          <div>
            <Title title="四优"/>
            <div class="target-content">
              <div class="margin-top" style="color:#3e98f6;font-size: 1.2rem;">产业优</div>
              <div class="margin-top">
                <ProportionOfAgeGroups/>
              </div>
              <div class="margin-top">
                <div class="margin-tb" style="color:#3e98f6;font-size: 1.2rem;">环境优</div>
                <div class="target-text target-content">
                  <environmental-excellence :data="[77.1, 100, 100,100, 100]"
                                            :label="['⾃来⽔', '卫⽣厕所', '⽣活污⽔', '⽣活垃圾', '硬化路率']"
                                            :mark-line="0"/>
                </div>
              </div>
              <div class="margin-top">
                <div class="margin-tb" style="color:#3e98f6;font-size: 1.2rem;">文化优</div>
                <div class="target-text target-content target-container-h6" style="text-align: left">
                  <el-row class="margin-sm text-center">
                    <el-col :span="12">
                      <div class="margin-tb-xs">文化广场<label class="margin-xs"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">1</label>个
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="margin-tb-xs">村史馆<label class="margin-xs"
                                                             style="color:#1AFD9BFF;font-size: 1.4rem">1</label>个
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="margin-tb-xs">乡村推荐官<label class="margin-xs"
                                                                 style="color:#1AFD9BFF;font-size: 1.4rem">1</label>人
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="margin-tb-xs">文艺队伍<label class="margin-xs"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">1</label>支
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="margin-tb-xs padding-top-xs">文旅品牌：<label class="margin-xs"
                                                                               style="color:#1AFD9BFF;">混撒拉旅游度假区</label>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="margin-tb-xs">综合文化服务率<label class="margin-xs"
                                                                     style="color:#1AFD9BFF;font-size: 1.4rem">95</label>%
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="margin-top">
                <div class="margin-tb" style="color:#3e98f6;font-size: 1.2rem;">服务优</div>
                <div class="target-text target-content padding-lg" style="text-align: left">
                  <environmental-excellence :data="[100,99.7, 100]"
                                            :label="['适龄儿童入学率', '基本医疗保险参保率', '特殊人群']"
                                            :mark-line="0"/>
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
import dayjs from 'dayjs';
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from "vue-router";
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

      //.content {
      //  display: flex;
      //  flex-direction: column;
      //  justify-content: space-between;
      //  height: 100%;
      //}

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
    }
  }

  .target-content {
    width: auto;
  }

}
</style>