<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">区迈⼊
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px;">
            乡推进
          </dv-button>
          <dv-button key="" border="Border4" color="#615ea8" fontSize="12"
                     style="display:inline-block;margin-left:10px">村共创
          </dv-button>
          <dv-button border="Border4" color="#615ea8" fontSize="12" style="display:inline-block;margin-left:10px">
            户夯实
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">
          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>{{
              curTime
            }}</b></p>
        </div>
      </div>
      <div class="margin-lr-sm">
        <el-row :gutter="10">
          <el-col :span="6">
            <Title title="乡情介绍"/>
            <div class="target-content target-container-h3">
              <div class="target-text">
                <div class="margin text-left" style="font-size:1.3rem">
                  大龙潭彝族乡为彝、汉族杂居的民族乡。最高海拔2105米，最低海拔970米，乡境内多为山地，立体气候明显，属南亚热带半干旱季风气候，年平均气温20.5℃，年降雨量800毫米，无霜期长达350天左右。辖区面积242.8平方公里，下辖裕民村、拉鲊村、新街村、干坝子村、大龙潭村、混撒拉村6个行政村，共55个村民小组，常住人口3712户14321人。
                  <!--                  {{ mainData['乡情介绍'] || areaName }}-->
                </div>
              </div>
            </div>
            <div style="height:calc(57vh - 3.6rem)" class="margin-top-lg">
              <antvImageMap :areaCode="areaCode" areaGoTo="village" :center="[500,450]" :zoom="2.2"/>
            </div>

            
          </el-col>
          <el-col :span="12">
            <div class="margin-top">
              <div class="text-center">
                <Label :color="'#1AFD9BFF'" :text="'总村数'" :title="'6'" class="margin-lr-xl"
                       @click="onClickPleaseWait('查看未达标户数')"/>
                <Label :text="'总户数'" :title="3712" class="margin-lr-xl"/>
                <Label :color="'#FCAE26FF'" :text="'总人口'" :title="14321" class="margin-lr-xl"/>
              </div>
            </div>
            
            <div class="margin-top">
              <el-row :gutter="10">
                <el-col :span="12">
                  <div class="margin-top">
                      <el-popover
                          class="box-item"
                          content='户夯实实现户数占比高于50%。基本富裕实现村数占比高于75%。'
                          placement="top-start"
                      >
                        <template #reference>
                          <Title title="两高"/>
                        </template>
                      </el-popover>

                      <div class="target-content" style="height:calc((100vh - 3.6rem) / 7">
                        <el-row>
                          <el-col :span="12">
                            <gaugeProgress :axisLabelFontSize="10" :colorTickData="[{name:'目标 50%',value:0.50}]"
                                          :colorValueData="[[0.50, '#FDDD60'], [1, '#7CFFB2']]" :detailFontSize="18"
                                          :style="'height:11rem'"
                                          :titleFontSize="12" :value="mainData['基本富裕达标户数占比'] || 0.2755"
                                          text="共3712户，夯实户1023户"/>
                          </el-col>
                          <el-col :span="12">
                            <gaugeProgress :axisLabelFontSize="10" :colorTickData="[{name:'目标 75%',value:0.75}]"
                                          :colorValueData="[[0.75, '#FDDD60'], [1, '#7CFFB2']]" :detailFontSize="18"
                                          :style="'height:11rem'"
                                          :titleFontSize="12" :value="mainData['基本富裕实现村数占比'] || 0.16"
                                          text="共6村，实现1村"/>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="margin-top">
                      <Title title="重点监测群体各村分布户数图"/>
                      <div class="target-content target-container-h3">
                        <column-chart :data="[24,16,11,28,35,51]"
                                      :label="['大龙潭村','混撒拉村','拉鲊村','新街村','裕民村','干坝子村']"/>
                      </div>
                    </div>
                    <div class="margin-top">
                      <Title title="全乡家庭年收入结构图"/>
                      <div class="target-content target-container-h3">
                        <!-- <div class="text-center padding">
                          <img alt="" class="margin" src="./img/橄榄图.png" style="height:20vh"/>
                        </div> -->
                        <div>
                                <pieEllipse style="height:12vh;transform:scale(0.6,0.5);translate(0, 0);" :data='[{name:"10万以下",value:"30%",darkColor:"green",lightColor:"lightgreen",nameStyle:"fill:#ddd;text-anchor:middle;font-size:48;",valueStyle:"fill:#bbb;text-anchor:start;font-size:36;"}
                    ,{name:"10万-50万",value:"35.4%",darkColor:"#E6A23C",lightColor:"yellow",nameStyle:"fill:#ddd;text-anchor:middle;font-size:48;",valueStyle:"fill:#bbb;text-anchor:end;font-size:36;"}
                    ,{name:"50万以上",value:"0.11%",darkColor:"rgb(29, 72, 196)",lightColor:"rgb(29, 72, 196)",nameStyle:"fill:#ddd;text-anchor:middle;font-size:48;",valueStyle:"fill:#ddd;text-anchor:start;font-size:36;"}]'/>
                              </div>
                      </div>
                    </div>
                </el-col>
                <el-col :span="12">
                  <div class="margin-top">
                    <Title title="村共创完成情况" @click="onClickPleaseWait('查看未完成村信息')"/>
                    <div class="target-content">
                      <div  @Click="onClickTargetDetail('四优指标解读',`<b>产业优：</b>具备至少一个特色富民产业，富民产业产值占产业总产值60%以上。
                        <br/><b>环境优：</b>生活用水安全稳定，自来水普及率达95%以上，农村卫生厕所普及率达到98%，生活污水得到有效治理，生活垃圾有效运转处置。住房安全，村容村貌整洁，无乱搭乱建，自然村（组）通硬化路率达100%。
      <br/><b>文化优：</b>建成一文化广场、一文艺队伍、一村史馆、一乡村推荐官、一文旅品牌，综合文化服务80%以上常住人口。
      <br><b>服务优：</b>公共服务保障完善。每个村有1名农村社会化服务协办员，开展农业社会化服务。残疾儿童实现随班就读或送教上门。有家庭医生服务团队。成功创建市级健康村。适龄人员养老保险参保率达95%。`)">
                        <line-chart
                                  :seriesData1="[100, 100, 100]"
                                  :seriesData2="[20, 18, 30]"
                                  :xAxisData="['户夯实实现户', '村集体经济收入', '人均可支配收入']"/>
                      </div>
                      <div @Click="onClickTargetDetail('两强指标解读',`<b>组织强：</b>村党组织战斗堡垒作用强，“三个身边”工作机制群众反映问题工单办结率达100%。“先富”带“后富”机制完善，特困、低保等重点群体托底保障机制健全。
                        <br/><b>治理强：</b>居民自治体系健全，居民公约完善，自治组织运行有序有效。“四议两公开”规范化建设，一村一民（辅）警，一村一法律顾问。法律公共服务室与法律援助率达100%。矛盾纠纷一站式处理，化解率达95%以上，性质恶劣命案零发生。`)">
                        <line-chart
                                :seriesData1="[100, 100, 100, 100]"
                                :color1="'#dfafaf'"
                                :color2="'#e13434'"
                                :seriesData2="[60, 56, 75, 30]"
                                :xAxisData="['产业优', '环境优', '文化优', '服务优']"/>
                      </div>
                      <div>
                        <line-chart
                                :seriesData1="[100, 100]"
                                :color1="'#825bb1'"
                                :color2="'#a2b5c8'"
                                :seriesData2="[90, 80]"
                                :xAxisData="['治理强', '组织强']"/>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <Title title="四化" @click="onClickTargetDetail('四化解读',`公共服务均等化:幼有善育、学有优教、病有良医、老有康养、住有宜居、弱有帮扶。有一所中小
学和附属中心幼儿园。乡镇学校教学质量与城区进一步缩小，在编教师本科及以
上学历与在编教师总数占比达90%，学前教育三年毛入园率达到95%以上，农村
千人口拥有托育托位数达到3.8个；乡镇卫生院服务能力显著提升，居民医疗保险
参保率95%以上，特殊人群达100%，适龄妇女“两癌”筛查覆盖率达到52%以上；
农村客运全覆盖，村村通邮。建有农业社会化服务站。<br/>基础设施一体化:自来水普及率达95%以上、自然村（组）通硬化路率达
100%，文化健身等基础设施配套完善，公共基础设施管
理、运行、养护机制健全。生活垃圾收转运处置体系行
政村覆盖率100%。<br/>乡村治理现代化:社会主义核心价值观深入人心，乡级综治中心规范化
建设，建有数字乡村平台，实现雪亮工程全覆盖。矛
盾纠纷妥善化解，自治、法治、德治相结合的治理体
系基本构建，物质富足、精神富有、乡风文明。<br/>产业发展规模化:产业适度规模化发展`)"/>
            <div class="target-content">
              <div class="margin-top-xs">
                <div style="color:#3e98f6;font-size: 1.2rem;text-align: center;line-height: 2rem;">产业发展规模化</div>
                <div class="target-text">
                  <div class="target-content padding target-container-h4">
                    <el-row :gutter="0">
                      <el-col :span="12">
                        <div class="padding-tb">
                          <div class="margin-tb-sm" style="font-size:1.2rem">芒果</div>
                          <div class="margin-tb-xs">种植面积达<label class="margin-lr-sm"
                                                                     style="color:#1AFD9BFF;font-size: 1.4rem">10万</label>亩
                          </div>
                          <div class="margin-tb-xs">产量<label class="margin-lr-sm"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">4.7万</label>吨
                          </div>
                          <div class="margin-tb-xs">产值<label class="margin-lr-sm"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">1.3亿</label>元
                          </div>
                          <div class="margin-tb-xs">农业产值占比<label class="margin-lr-sm"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">28.32</label>%
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <div class="margin-tb-sm" style="font-size:1.2rem">蔬菜</div>
                          <div class="margin-tb-xs">种植面积达<label class="margin-lr-sm"
                                                                     style="color:#1AFD9BFF;font-size: 1.4rem">1.4万</label>亩
                          </div>
                          <div class="margin-tb-xs">产量<label class="margin-lr-sm"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">4.07万</label>吨
                          </div>
                          <div class="margin-tb-xs">产值<label class="margin-lr-sm"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">1.2亿</label>元
                          </div>
                          <div class="margin-tb-xs">农业产值占比<label class="margin-lr-sm"
                                                               style="color:#1AFD9BFF;font-size: 1.4rem">26.14</label>%
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="margin-top-xs">
                <div style="color:#3e98f6;font-size: 1.2rem;text-align: center;line-height: 2rem;">公共服务均等化</div>
                <div class="target-text">
                  <div class="target-content padding target-container-h4">
                    <el-row :gutter="8">
                      <el-col :span="12">
                        <div class=" padding-tb">
                          <label>学前教育三年毛入园率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>95%
                        </div>

                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>居民医疗保险参保率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">98.5%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>95%
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>特殊人群医疗保险参保率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>100%
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>农村客运覆盖率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>100%
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="margin-top-xs">
                <div style="color:#3e98f6;font-size: 1.2rem;text-align: center;line-height: 2rem;">基础设施一体化</div>
                <div class="target-text">
                  <div class="target-content padding target-container-h4">
                    <el-row :gutter="0">
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>自来水普及率</label>
                          <br><br>
                          <label style="color:orange;font-size: 1.4rem">82.6%</label><i
                            class="fa fa-arrow-down margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: orange;"/>95%
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>自然村通硬化路率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: #1AFD9BFF;"/>100%
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>卫生厕所达标率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>100%
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="margin-top-xs">
                <div style="color:#3e98f6;font-size: 1.2rem;text-align: center;line-height: 2rem;">乡村治理现代化</div>
                <div class="target-text">
                  <div class="target-content padding target-container-h4">
                    <el-row :gutter="0">
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>法律援助率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>100%
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>雪亮工程覆盖率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>100%
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="padding-tb">
                          <label>矛盾纠纷化解率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">98%</label><i
                            class="fa fa-arrow-up margin-left-sm margin-right-xs"
                            style="font-size: 1rem; color: lightgreen;"/>95%
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>

    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from "vue-router";
import antvImageMap from "../component/antvImageMap.vue";
import gaugeProgress from "../component/gaugeProgress.vue";
import radarEchart from "../component/radarEchart.vue";
import pieEllipse from "/@/components/pieEllipse/index.vue";
import Label from "/@/views/res/dashboard/component/Label.vue";
import Label1 from "/@/views/res/dashboard/component/Label1.vue";
import LineChart from "/@/views/res/dashboard/component/LineChart.vue";
import ColumnChart from "/@/views/res/dashboard/street/ColumnChart.vue";
import OvalShape from "/@/views/res/dashboard/street/OvalShape.vue";
import Title from "/@/views/res/dashboard/village/Title.vue";
export default {
  name: "IndexDashboard",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {LineChart, ColumnChart, OvalShape, Label1, pieEllipse, Label, Title, antvImageMap, gaugeProgress, radarEchart},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      curTime: dayjs().format("YYYY年MM月DD日"),
      areaCode: route.query.areaCode,
      areaName: route.query.areaName || "",
      dialogVisible: true,
      mainData: {}, //总表数据
      //基础设施补短情况配置 改帮扶统计
      bfhsConfig: {
        header: ['村', '帮扶户数'],
        data: [
          ['混撒拉村', '<span style="color:#32c5e9;">80</span>'],
          ['裕民村', '<span style="color:#9fe6b8;">160</span>'],
          ['拉鲊村', '120'],
          ['新街村', '<span style="color:#ff9f7f;">90</span>'],
          ['干坝子村', '60'],
          ['大龙潭村', '<span style="color:#e062ae;">75</span>'],
        ],
        index: true,
        rowNum: 5,
        columnWidth: [50],
        align: ['center', 'center', 'right'],
      },
      //综合帮扶情况配置
      whbdbConfig: {
        header: ['村', '不达标户数'],
        data: [
          ['混撒拉村', '<span style="color:#32c5e9;">80</span>'],
          ['裕民村', '<span style="color:#9fe6b8;">160</span>'],
          ['拉鲊村', '120'],
          ['新街村', '<span style="color:#ff9f7f;">90</span>'],
          ['干坝子村', '60'],
          ['大龙潭村', '<span style="color:#e062ae;">75</span>'],
        ],
        index: true,
        rowNum: 5,
        columnWidth: [50],
        align: ['center', 'center', 'right'],
      }
    })
    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }
    //指标解读
    const onClickPleaseWait = (name: string = '') => {
      const html = `此处为${name}功能`
      ElMessageBox.alert(html, '温馨提示', {dangerouslyUseHTMLString: true, type: 'info',})
    }
    const onClickTargetDetail = (title: String, content: String) => {
      ElMessageBox.alert(content, title, {dangerouslyUseHTMLString: true, width: '80%'})
    }

    // 页面加载时
    onMounted(async () => {
      try {
        const list = await d3.csv(`/data/res/street/${state.areaCode}/乡总表.csv`);
        console.log("mainData:", list)
        if (list && list.length > 0) {
          state.mainData = list[0];
        }
      } catch (er) {
        console.log(er)
      }

      try {
        const list = await d3.csv(`/data/res/street/${state.areaCode}/帮扶户数统计.csv`);
        console.log("bfhsConfig data:", list)
        const rows = []
        Object.keys(list).forEach((key) => {
          if (list[key]['村名']) {
            rows.push([list[key]['村名'], list[key]['户数']])
          }
        })
        state.bfhsConfig.data = rows;
      } catch (er) {
        console.log(er)
      }

      try {
        const list = await d3.csv(`/data/res/street/${state.areaCode}/五好不达标户数统计.csv`);
        console.log("bfhsConfig data:", list)
        const rows = []
        Object.keys(list).forEach((key) => {
          if (list[key]['村名']) {
            rows.push([list[key]['村名'], list[key]['户数']])
          }
        })
        state.whbdbConfig.data = rows;
      } catch (er) {
        console.log(er)
      }

    });
    return {
      onGoToLink,
      onClickPleaseWait,
      onClickTargetDetail,
      ...toRefs(state),

    };
  },
};
</script>

<style lang="less">


#data-view {
  width: 100%;
  height: 100%;
  color: rgb(7, 2, 28);

  #dv-full-screen-container {
    background-image: url("/img/res/bg_2.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .main-view {
    width: 100%;
    height: 100%;
  }

}
</style>