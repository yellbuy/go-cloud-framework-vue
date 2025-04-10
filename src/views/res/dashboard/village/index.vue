<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">
            区迈⼊
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px;"
                     @click="onGoToLink(`/admin/dashboard/street/index?areaCode=${streetAreaCode}`)">
            乡推进
          </dv-button>
          <dv-button key="" border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/village/index?areaCode=${areaCode}`)">
            村共创
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
              <div class="target-container-h4 target-text target-content text-left">
                <p class="margin" style="text-align: left;font-size:1.2rem;line-height: 1.2rem;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;混撒拉村位于仁和区南部，距城区17.5km。辖区面积21平方公里，平均海拔1400m,现有村民380户1527人，少数民族人口占比65%，设有1个党总支，3个党支部，共有党员55名。全村耕地848亩、林地8160亩，以种植芒果、乡村旅游等产业为主，辖区内有企业2家、商户12家、农民专业合作社7个、家庭农场43家、村级卫生室1家，正在建设美丽乡村试点县项目。
                </p>
              </div>
              <div class="target-container-h3 target-text target-content text-left">
                <Title title="重点监测群体"/>
                <barNestedChart
                    :color1="['#b19a5f','#b19a5f','#b19a5f']"
                    :formatter="'户'"
                    :seriesData1="[100, 100, 100]"
                    :seriesData2="[90, 80, 80]"
                    :objStyle="'height:calc(24.9vh - 2.5rem)'"
                    :xAxisData="['2022年', '2023年', '2024年']"/>
              </div>
            </div>
            <div style="width: 100%;height:calc(100vh  - 20rem - 21.6rem)">
              <antvImageMap :areaCode="areaCode" :center="[500,480]" :zoom="1.6" areaGoTo="village"></antvImageMap>
            </div>

          </div>
          <div class="view-content content2">

            <div class="view-box padding-top-xl margin-lr-xl">
              <Label :text="'总户数'" color="yellow" :title="380"/>
              <Label :text="'总人口'" color="yellow" :title="1527"/>
              <Label :text="'夯实户数'" color="lightgreen" :title="'193'"/>
              <Label :text="'夯实户占比'" color="lightgreen" :title="'16.7%'"/>
            </div>

            <div class="view-box">
              <div class="margin" style="width:50%;">
                <el-popover
                    class="box-item"
                    content='“⼾夯实”实现⼾占⽐超50%，全村⼈均年可⽀配收⼊超全市农村⼈均年可⽀配收⼊，村集体经济稳定收⼊超20万元'
                    placement="top-start">
                  <template #reference>
                    <Title title="三超"/>
                  </template>
                </el-popover>
                <div class="target-content">
                  <el-row :gutter="24">
                    <el-col :span="24">
                      <div class="text-center margin-top">
                        <div class="target-value">“户夯实”实现户占比</div>
                        <environmental-excellence :YAxisLabel="'false'"
                                                  :bottom="'20%'"
                                                  :data="[[20,20,20],[25.68, 29.1, 50.79]]"
                                                  :formatter="'%'"
                                                  :label="['目标', '现状']"
                                                  :left="'0'"
                                                  :objStyle="'height:7rem'"/>
                        <text class="target-text">“户夯实”实现户</text>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="text-center">
                        <text class="target-value">全村人均年可支配收入超全市农村人均年可支配收入</text>
                        <environmental-excellence :YAxisLabel="'false'"
                                                  :bottom="'20%'"
                                                  :data="[[2.19,2.30,2.45],[2.5, 2.68, 3.24]]"
                                                  :formatter="'万'"
                                                  :label="['目标', '现状']"
                                                  :left="'0'"
                                                  :objStyle="'height:7rem'"/>
                        <text class="target-text">农村人均年可支配收入</text>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="text-center margin-top">
                        <text class="target-value">村集体经济收入超20万元</text>
                        <environmental-excellence :YAxisLabel="'false'"
                                                  :bottom="'20%'"
                                                  :data="[[20,20,20],[25.68, 29.1, 170.8]]"
                                                  :formatter="'万'"
                                                  :label="['目标', '现状']"
                                                  :left="'0'"
                                                  :objStyle="'height:7rem'"/>
                        <text class="target-text">村集体经济收入</text>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="margin-left margin-right margin-bottom" style="width:50%;">
                <div class="margin-top-sm">
                  <ProportionOfAgeGroups :age-data="[2.031,3.342,12.779,64.417,15.596,1.835]"/>
                </div>
                <div>
                  <div class="target-header">
                    <span class="target-title">家庭年收入结构图</span>
                  </div>
                  <div class="target-content">
                    <div class="text-center">
                      <pieEllipse :data='[{name:"10万以下",value:"30%",darkColor:"green",lightColor:"lightgreen",nameStyle:"fill:#ddd;text-anchor:middle;font-size:60;",valueStyle:"fill:#bbb;text-anchor:start;font-size:54;"}
                    ,{name:"10万-50万",value:"69.7%",darkColor:"#E6A23C",lightColor:"yellow",nameStyle:"fill:#ddd;text-anchor:middle;font-size:60;",valueStyle:"fill:#bbb;text-anchor:end;font-size:54;"}
                    ,{name:"50万以上",value:"0.3%",darkColor:"rgb(29, 72, 196)",lightColor:"rgb(29, 72, 196)",nameStyle:"fill:#ddd;text-anchor:middle;font-size:60;",valueStyle:"fill:#ddd;text-anchor:start;font-size:54;"}]'
                                  style="height:12rem;transform:scale(0.4,0.3) translate(0, -8rem);"/>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class="margin-left margin-right margin-top margin-bottom">
              <Title title="两强"/>
              <div>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <div class="target-text padding-lg target-content" style="text-align: left;">
                      <el-popover
                          class="box-item"
                          content="村党组织战斗堡垒作用强，“三个身边”工作机制群众反映问题工单办结率100%。“先富”带“后富”机制完善特困、低保等重点群体托底保障机制健全。"
                          placement="top-start"
                      >
                        <template #reference>
                          <div class="margin-left margin-top-lg margin-bottom" style="color:#fff;font-size: 1.2rem;">
                            组织强
                          </div>
                        </template>
                      </el-popover>
                      <environmental-excellence :XLabel="['“三个身边”群众工作机制反映问题办结率']"
                                                :YAxisLabel="'false'"
                                                :YFormatter="'{value}万'"
                                                :data="[[100],[98.5]]"
                                                :label="['目标', '现状']"
                                                :left="'0'"
                                                :mark-line="0"
                                                :objStyle="'height:12rem'"/>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="target-text padding-lg target-content" style="text-align: left;">
                      <el-popover
                          class="box-item"
                          content="居民自治体系健全，居民公约完善，自治组织运行有序有效“四议两公开”规范化建设,一村一民(辅)警，一村一法律顾问。法律公共服务室与法律援助率100%。矛盾纠纷一式处理，化解率达95%，性质恶劣命案零发生"
                          placement="top-start">
                        <template #reference>
                          <div class="margin-left margin-top-lg margin-bottom" style="color:#fff;font-size: 1.2rem;">
                            治理强
                          </div>
                        </template>
                      </el-popover>
                      <environmental-excellence :XLabel="['化解矛盾纠纷化解率']"
                                                :YAxisLabel="'false'"
                                                :YFormatter="'{value}万'"
                                                :data="[[100],[98]]"
                                                :label="['目标', '现状']"
                                                :left="'0'"
                                                :mark-line="0"
                                                :objStyle="'height:12rem'"/>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div>
            <Title title="四优"/>
            <div class="target-content">
              <div class="margin-top" style="color:#fff;font-size: 1.2rem;">产业优</div>
              <div class="margin-top">
                <div class="target-text target-content">
                  <environmental-excellence :YFormatter="'{value}万'"
                                            :XLabel="['蔬菜产值', '芒果产值']"
                                            :data="[[26.14,28.32],[26.14,28.32],[26.14,28.32]]"
                                            :label="['2022年', '2023年', '2024年']"
                                            :YAxisLabel="'false'"
                                            :left="'0'"
                                            :mark-line="0"/>
                  <div>农业社会化服务协办员1名</div>
                  <div>姓名：<span style="color:#1AFD9BFF;">李*</span> &nbsp;&nbsp;职务：<span
                      style="color:#1AFD9BFF;">主任</span> &nbsp;&nbsp;电话：<span
                      style="color:#1AFD9BFF;">135****8935</span></div>
                </div>
              </div>
              <div class="margin-top">
                <div class="margin-tb" style="color:#fff;font-size: 1.2rem;">环境优</div>
                <div class="target-text target-content">
                  <environmental-excellence
                      :XLabel="['⾃来⽔普及率', '农村卫⽣\n厕所普及率', '⽣活污⽔有\n效治理覆盖率', '自然村（组）\n通硬化路率']"
                      :YFontSize="'10'"
                      :bottom="'20%'"
                      :YAxisLabel="'false'"
                      :left="'0'"
                      :data="[[77.1, 100, 100, 100],[77.1, 100, 100, 100],[77.1, 100, 100, 100],[77.1, 100, 100, 100]]"
                      :label="['2022年', '2023年', '2024年']"
                      :mark-line="0"/>
                </div>
              </div>
              <div class="margin-top">
                <div class="margin-tb" style="color:#fff;font-size: 1.2rem;">文化优</div>
                <div class="target-text target-content target-container-h6" style="text-align: left">
                  <el-row class="margin-sm text-center">
                    <el-col :span="6" class="text-right">
                      <div class="margin-tb-xs ">文化广场
                      </div>
                    </el-col>
                    <el-col :span="6" class="text-left">
                      <label class="margin-xs"
                             style="color:#1AFD9BFF;font-size: 1.4rem">1</label>个
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <div class="margin-tb-xs ">村史馆
                      </div>
                    </el-col>
                    <el-col :span="6" class="text-left">
                      <label class="margin-xs"
                             style="color:#1AFD9BFF;font-size: 1.4rem">1</label>个
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <div class="margin-tb-xs ">乡村推荐官
                      </div>
                    </el-col>
                    <el-col :span="6" class="text-left">
                      <label class="margin-xs"
                             style="color:#1AFD9BFF;font-size: 1.4rem">1</label>人
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <div class="margin-tb-xs ">文艺队伍
                      </div>
                    </el-col>
                    <el-col :span="6" class="text-left">
                      <label class="margin-xs"
                             style="color:#1AFD9BFF;font-size: 1.4rem">1</label>支
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
                <div class="margin-tb" style="color:#fff;font-size: 1.2rem;">服务优</div>
                <div class="target-text target-content padding-lg" style="text-align: left">
                  <environmental-excellence
                      :XLabel="['学前教育三\n年⽑⼊园率', '基本养老\n保险参保率', '基本医疗保\n险参保率']"
                      :YAxisLabel="'false'"
                      :bottom="'20%'"
                      :data="[[99.7,100, 100],[99.7,100, 100],[99.7,100, 100]]"
                      :label="['2022年', '2023年', '2024年']"
                      :left="'0'"
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
import {reactive, toRefs} from 'vue';
import {useRoute, useRouter} from "vue-router";
import antvImageMap from "/@/views/res/dashboard/component/antvImageMap.vue";
import Label from "/@/views/res/dashboard/component/Label.vue";
import ColumnChart from "/@/views/res/dashboard/village/ColumnChart.vue";
import EnvironmentalExcellence from "/@/views/res/dashboard/village/EnvironmentalExcellence.vue";
import ProportionOfAgeGroups from "/@/views/res/dashboard/village/ProportionOfAgeGroups.vue";
import Title from "/@/views/res/dashboard/village/Title.vue";
import TopTwoAndTopFour from "/@/views/res/dashboard/village/TopTwoAndTopFour.vue";
import pieEllipse from "/@/components/pieEllipse/index.vue";
import barNestedChart from "/@/views/res/dashboard/component/barNestedChart.vue";

export default {
  name: "IndexDashboard",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    barNestedChart,
    pieEllipse,
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
    background-image: url("/img/res/bg_2.png");
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

      .view-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
  }

  .target-content {
    width: auto;
  }

}
</style>