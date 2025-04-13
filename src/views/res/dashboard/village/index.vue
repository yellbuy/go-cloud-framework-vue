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
        <el-row :gutter="0">
          <el-col :span="7">
            <div class="margin-left">
              <Title title="村情介绍"/>
              <div class="target-container-h4 target-text target-content text-left">
                <p class="margin-sm" style="text-align: left;font-size:1.2rem;line-height: 1.8rem;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;混撒拉村位于仁和区南部，距城区17.5km。辖区面积21平方公里，平均海拔1400m,现有村民380户1527人，少数民族人口占比65%，设有1个党总支，3个党支部，共有党员55名。全村耕地848亩、林地8160亩，以种植芒果、乡村旅游等产业为主，辖区内有企业2家、商户12家、农民专业合作社7个、家庭农场43家、村级卫生室1家，正在建设美丽乡村试点县项目。
                </p>
              </div>
              <div class="target-container-h3 margin-top target-text target-content text-left">
                <Title title="重点监测群体"/>
                <div class="margin-tb">
                  <environmental-excellence
                      :XAxisLabel="false"
                      :XLabel="['']"
                      :YAxisLabel="false"
                      :YFormatter="'{value}户'"
                      :color="['#da0000','#e4a423']"
                      :data="[[16],[98]]"
                      :formatter="'户'"
                      :label="['低收入重点监测群体','低收入一般监测群体']"
                      :left="'0'"
                      :objStyle="'height:calc((100vh - 6rem) / 4 - 0.4rem)'"
                      :top="'30%'"
                      @click="onClickMainMonitoring"></environmental-excellence>
                </div>

              </div>
              <div class="target-content margin-top" style="width: 100%;height:calc(100vh  - 20rem - 22.5rem)">
                <antvImageMap :areaCode="areaCode" :center="[500,480]" :zoom="1.6" areaGoTo="village"></antvImageMap>
              </div>
            </div>

          </el-col>
          <el-col :span="17">
            <el-row>
              <el-col :span="14">
                <div class="padding-top-xl margin-lr-sm text-center">
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <Label :text="'总户数'" :title="380" color="yellow"/>
                    </el-col>
                    <el-col :span="6">
                      <Label :text="'总人口'" :title="1527" color="yellow"/>
                    </el-col>
                    <el-col :span="6">
                      <Label :text="'夯实户数'" :title="'193'" color="lightgreen"/>
                    </el-col>
                    <el-col :span="6">
                      <Label :text="'夯实户占比'" :title="'16.7%'" color="lightgreen"/>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <div class="margin">
                    <el-popover
                        class="box-item"
                        content='“⼾夯实”实现⼾占⽐超50%，全村⼈均年可⽀配收⼊超全市农村⼈均年可⽀配收⼊，村集体经济稳定收⼊超20万元'
                        placement="top-start">
                      <template #reference>
                        <Title title="三超"/>
                      </template>
                    </el-popover>
                    <div class="target-content">
                      <el-row :gutter="10">
                        <el-col :span="12">
                          <div class="text-center margin-top">
                            <div class="target-value"><i class="fa fa-angle-double-down margin-right-sm"/>“户夯实”实现户占比
                            </div>
                            <environmental-excellence :YAxisLabel="'false'"
                                                      :bottom="'20%'"
                                                      :color="['#DADA00FF']"
                                                      :data="[[50,50,50],[25.68, 29.1, 50.79]]"
                                                      :formatter="'%'"
                                                      :label="['目标', '现状']"
                                                      :left="'0'"
                                                      :legendShow="true"
                                                      :objStyle="'height:7.3rem'"
                                                      :top="'40%'"/>
                            <!-- <text class="target-text">“户夯实”实现户</text> -->
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="text-center margin-top">
                            <text class="target-value"><i class="fa fa-angle-double-down margin-right-sm"/>村集体经济收入超20万元
                            </text>
                            <environmental-excellence :YAxisLabel="'false'"
                                                      :bottom="'20%'"
                                                      :color="['#DADA00FF']"
                                                      :data="[[20,20,20],[25.68, 29.1, 170.8]]"
                                                      :formatter="'万'"
                                                      :label="['目标', '现状']"
                                                      :left="'0'"
                                                      :legendShow="true"
                                                      :objStyle="'height:7.3rem'"
                                                      :top="'40%'"/>
                            <!-- <text class="target-text">村集体经济收入</text> -->
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <div class="text-center margin-tb-lg">
                            <text class="target-value"><i class="fa fa-angle-double-down margin-right-sm"/>全村人均年可支配收入超全市农村人均年可支配收入
                            </text>
                            <environmental-excellence :YAxisLabel="'false'"
                                                      :bottom="'20%'"
                                                      :color="['#DADA00FF']"
                                                      :data="[[2.19,2.30,2.45],[2.5, 2.68, 3.24]]"
                                                      :formatter="'万'"
                                                      :label="['目标', '现状']"
                                                      :left="'0'"
                                                      :legendShow="true"
                                                      :objStyle="'height:7.5rem'"
                                                      :top="'40%'"/>
                            <!-- <text class="target-text">农村人均年可支配收入</text> -->
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="10">
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
                              <div class="margin-left margin-top-lg margin-bottom"
                                   style="color:#fff;font-size: 1.2rem;">
                                组织强
                              </div>
                            </template>
                          </el-popover>
                          <environmental-excellence :XLabel="['“三个身边”群众工作机制反映问题办结率']"
                                                    :YAxisLabel="false"
                                                    :YFormatter="'{value}万'"
                                                    :color="['#d8f695','#eabdf4','#e8e6d8']"
                                                    :data="[[100],[98.5]]"
                                                    :label="['2030年', '2024年']"
                                                    :left="'0'"
                                                    :mark-line="0"
                                                    :objStyle="'height:9rem'"/>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="target-text padding-lg target-content" style="text-align: left;">
                          <el-popover
                              class="box-item"
                              content="居民自治体系健全，居民公约完善，自治组织运行有序有效“四议两公开”规范化建设,一村一民(辅)警，一村一法律顾问。法律公共服务室与法律援助率100%。矛盾纠纷一式处理，化解率达95%，性质恶劣命案零发生"
                              placement="top-start">
                            <template #reference>
                              <div class="margin-left margin-top-lg margin-bottom"
                                   style="color:#fff;font-size: 1.2rem;">
                                治理强
                              </div>
                            </template>
                          </el-popover>
                          <environmental-excellence :XLabel="['化解矛盾纠纷化解率']"
                                                    :YAxisLabel="'false'"
                                                    :YFormatter="'{value}万'"
                                                    :color="['#d8f695','#eabdf4','#e8e6d8']"
                                                    :data="[[100],[98]]"
                                                    :label="['2030年', '2024年']"
                                                    :left="'0'"
                                                    :mark-line="0"
                                                    :objStyle="'height:9rem'"/>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="margin-left margin-right margin-bottom">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <div>
                        <ProportionOfAgeGroups :age-data="[2.031,3.342,12.779,64.417,15.596,1.835]"/>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="target-header">
                        <span class="target-title">家庭年收入结构图</span>
                      </div>
                      <div class="target-content">
                        <div class="text-center">
                          <environmental-excellence
                              :XLabel="['10万以下', '10万-50万', '50万以上']"
                              :YAxisLabel="'false'"
                              :bottom="'20%'"
                              :data="[[30,69.7, 0.3]]"
                              :label="['2024年']"
                              :color="['#d8f695','#eabdf4','#e8e6d8']"
                              :left="'0'"
                              :mark-line="0"/>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>

            <div class="margin-left margin-right margin-bottom">
              <Title title="四优"/>
              <div class="target-content">
                <el-row>
                  <el-col :span="12">
                    <div class="">
                      <div class="margin-top" style="color:lightgreen;font-size: 1.2rem;"><i
                          class="fa fa-angle-double-down margin-right-sm"/>服务优
                      </div>
                      <div class="target-text padding-lg" style="text-align: left">
                        <environmental-excellence
                            :XLabel="['学前教育三\n年⽑⼊园率', '基本养老\n保险参保率', '基本医疗保\n险参保率']"
                            :YAxisLabel="'false'"
                            :bottom="'20%'"
                            :data="[[99.7,100, 100],[99.7,100, 100],[99.7,100, 100]]"
                            :label="['2022年', '2023年', '2024年']"
                            :left="'0'"
                            :color="['#00dada','#90b7d5','#df87c6']"
                            :mark-line="0"
                            :objStyle="'height:11rem'"/>
                      </div>
                    </div>
                    <div class="">
                      <div class="" style="color:lightgreen;font-size: 1.2rem;"><i
                          class="fa fa-angle-double-down margin-right-sm"/>环境优
                      </div>
                      <div class="target-text margin-top-sm">
                        <environmental-excellence
                            :XLabel="['⾃来⽔普及率', '农村卫⽣\n厕所普及率', '⽣活污⽔有\n效治理覆盖率', '自然村（组）\n通硬化路率']"
                            :YAxisLabel="'false'"
                            :YFontSize="'10'"
                            :bottom="'20%'"
                            :data="[[77.1, 100, 100, 100],[77.1, 100, 100, 100],[77.1, 100, 100, 100],[77.1, 100, 100, 100]]"
                            :label="['2022年', '2023年', '2024年']"
                            :left="'0'"
                            :color="['#00dada','#90b7d5','#df87c6']"
                            :mark-line="0"
                            :objStyle="'height:10.5rem'"/>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="">
                      <div class="margin-top" style="color:lightgreen;font-size: 1.2rem;"><i
                          class="fa fa-angle-double-down margin-right-sm"/>文化优
                      </div>
                      <div class="target-text margin-top" style="text-align: left">
                        <el-row class="margin-sm text-center">
                          <el-col :span="6" class="text-right">
                            <div class="margin-tb-sm ">文化广场
                            </div>
                          </el-col>
                          <el-col :span="6" class="text-left">
                            <label class="margin-sm"
                                   style="color:#1AFD9BFF;font-size: 1.4rem;line-height: 2rem">1</label>个
                          </el-col>
                          <el-col :span="6" class="text-right">
                            <div class="margin-tb-sm ">村史馆
                            </div>
                          </el-col>
                          <el-col :span="6" class="text-left">
                            <label class="margin-sm"
                                   style="color:#1AFD9BFF;font-size: 1.4rem;line-height: 2rem">1</label>个
                          </el-col>
                          <el-col :span="6" class="text-right">
                            <div class="margin-tb-sm ">乡村推荐官
                            </div>
                          </el-col>
                          <el-col :span="6" class="text-left">
                            <label class="margin-sm"
                                   style="color:#1AFD9BFF;font-size: 1.4rem;line-height: 2rem">1</label>人
                          </el-col>
                          <el-col :span="6" class="text-right">
                            <div class="margin-tb-xs ">文艺队伍
                            </div>
                          </el-col>
                          <el-col :span="6" class="text-left">
                            <label class="margin-sm"
                                   style="color:#1AFD9BFF;font-size: 1.4rem;line-height: 2rem">1</label>支
                          </el-col>
                          <el-col :span="12">
                            <div class="margin-tb-sm">文旅品牌：<label class="margin-xs"
                                                                      style="color:#1AFD9BFF;">混撒拉旅游度假区</label>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="margin-tb-sm">综合文化服务率<label class="margin-sm"
                                                                           style="color:#1AFD9BFF;font-size: 1.4rem">95</label>%
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="" style="color:lightgreen;font-size: 1.2rem;"><i
                        class="fa fa-angle-double-down "/>产业优
                    </div>
                    <div class="margin-top">
                      <div class="target-text">
                        <environmental-excellence :XLabel="['蔬菜产值占比', '芒果产值占比']"
                                                  :YAxisLabel="'false'"
                                                  :YFormatter="'{value}万'"
                                                  :data="industrialAdvantage"
                                                  :label="['2022年', '2023年', '2024年']"
                                                  :left="'0'"
                                                  :color="['#00dada','#90b7d5','#df87c6']"
                                                  :formatterMode="formatterMode"
                                                  :mark-line="0"/>
                        <div>农业社会化服务协办员1名</div>
                        <div>姓名：<span style="color:#1AFD9BFF;">李*</span> &nbsp;&nbsp;职务：<span
                            style="color:#1AFD9BFF;">主任</span> &nbsp;&nbsp;电话：<span
                            style="color:#1AFD9BFF;">135****8935</span></div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import {reactive, toRefs} from 'vue';
import {useRoute, useRouter} from "vue-router";
import pieEllipse from "/@/components/pieEllipse/index.vue";
import antvImageMap from "/@/views/res/dashboard/component/antvImageMap.vue";
import barNestedChart from "/@/views/res/dashboard/component/barNestedChart.vue";
import Label from "/@/views/res/dashboard/component/Label.vue";
import ColumnChart from "/@/views/res/dashboard/village/ColumnChart.vue";
import EnvironmentalExcellence from "/@/views/res/dashboard/village/EnvironmentalExcellence.vue";
import ProportionOfAgeGroups from "/@/views/res/dashboard/village/ProportionOfAgeGroups.vue";
import Title from "/@/views/res/dashboard/village/Title.vue";
import TopTwoAndTopFour from "/@/views/res/dashboard/village/TopTwoAndTopFour.vue";
import {ElMessageBox} from "element-plus";

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
    const onClickMainMonitoring = () => {
      const html = `
      <div>
       <table style="border-collapse: collapse;" cellspacing="6" cellpadding="6" border="1">
       <thread>
             <th style="padding: 0.5rem">区</th>
             <th style="padding: 0.5rem">乡</th>
             <th style="padding: 0.5rem">村</th>
             <th style="padding: 0.5rem">姓名</th>
             <th style="padding: 0.5rem">年龄</th>
             <th style="padding: 0.5rem">收入</th>
      </thread>
      <tr>
      <td style="padding: 0.5rem">仁和</td>
      <td style="padding: 0.5rem">大龙潭彝族乡</td>
      <td style="padding: 0.5rem">荤撒拉村</td>
      <td style="padding: 0.5rem">邓*志</td>
      <td style="padding: 0.5rem">32</td>
      <td style="padding: 0.5rem">30000</td>
</tr>
      <tr>
      <td style="padding: 0.5rem">仁和</td>
      <td style="padding: 0.5rem">大龙潭彝族乡</td>
      <td style="padding: 0.5rem">荤撒拉村</td>
      <td style="padding: 0.5rem">邓*志</td>
      <td style="padding: 0.5rem">32</td>
      <td style="padding: 0.5rem">30000</td>
</tr>
      <tr>
      <td style="padding: 0.5rem">仁和</td>
      <td style="padding: 0.5rem">大龙潭彝族乡</td>
      <td style="padding: 0.5rem">荤撒拉村</td>
      <td style="padding: 0.5rem">邓*志</td>
      <td style="padding: 0.5rem">32</td>
      <td style="padding: 0.5rem">30000</td>
</tr>
      <tr>
      <td style="padding: 0.5rem">仁和</td>
      <td style="padding: 0.5rem">大龙潭彝族乡</td>
      <td style="padding: 0.5rem">荤撒拉村</td>
      <td style="padding: 0.5rem">邓*志</td>
      <td style="padding: 0.5rem">32</td>
      <td style="padding: 0.5rem">30000</td>
</tr>
      <tr>
      <td style="padding: 0.5rem">仁和</td>
      <td style="padding: 0.5rem">大龙潭彝族乡</td>
      <td style="padding: 0.5rem">荤撒拉村</td>
      <td style="padding: 0.5rem">邓*志</td>
      <td style="padding: 0.5rem">32</td>
      <td style="padding: 0.5rem">30000</td>
</tr>
      </table>
      </div>`
      ElMessageBox.alert(html, '低收入重点监测群体清单', {dangerouslyUseHTMLString: true, width: '1000px'})
    };

    const formatterMode = function (params) {
      var result = params[0].axisValue + '<br/>';
      params.forEach(function (item) {
        result += item.marker + '' + item.seriesName + ': <br/>占比：' + item.value + '%' + "<br/>产值：" + item.data.extra + "吨";
        result += '<br/>';
      });
      return result;
    }

    const industrialAdvantage =
        [
          [
            {
              value: 26.14,
              extra: 21000
            },
            {
              value: 28.32,
              extra: 40700
            },
          ],
          [
            {
              value: 26.14,
              extra: 21000
            },
            {
              value: 28.32,
              extra: 40700
            },
          ],
          [
            {
              value: 26.14,
              extra: 21000
            },
            {
              value: 28.32,
              extra: 40700
            },
          ]
        ];

    return {
      ...toRefs(state),
      onClickMainMonitoring,
      formatterMode,
      industrialAdvantage,
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

#dv-full-screen-container {
  background-image: url("/img/res/bg_2.png");
  background-size: 100% 100%;
}
</style>