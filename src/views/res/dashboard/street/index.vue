<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">区建成
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px;">
            乡进入
          </dv-button>
          <dv-button key="" border="Border4" color="#615ea8" fontSize="12"
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
          <!-- <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="onGoToLink(`/admin/dashboard/home/detail`)" border="Border4" color="#409EFF">六优指标</dv-button>
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="onClickCountDetail" border="Border4" color="#409EFF">区情介绍</dv-button> -->
        </div>
      </div>
      <div>
        <el-row :gutter="0">
          <el-col :span="7">
            <div class="">
              <Title title="乡情介绍"/>
              <div class="target-text">
                <div class="m20">
                  大龙潭彝族乡，隶属于四川省攀枝花市仁和区，地处仁和区东南部，东隔金沙江与会理市相望，南与平地镇相连，西与大田镇、仁和镇毗邻，北与金江镇接壤。
                  辖区总面积243.69平方千米。截至2018年末，大龙潭彝族乡户籍人口15650人。原属云南省永仁县第三区。1984年，改为大龙潭彝族乡。
                  截至到2020年6月，大龙潭彝族乡下辖6个行政村， 乡人民政府驻裕民街43号。
                </div>
              </div>
            </div>
            <Title title="两高"/>
            <div>
              <el-row>
                <el-col :span="12">
                    <gaugeProgress  :colorValueData="[[0.50, '#FDDD60'], [1, '#7CFFB2']]" :axisLabelFontSize="10" :titleFontSize="14" :detailFontSize="18"
                    :colorTickData="[{name:'目标 50%',value:0.50}]" :value="0.30" text="基本富裕达标户数占比" :style="'height:12rem'"/>
                </el-col>
                <el-col :span="12">
                    <gaugeProgress :colorValueData="[[0.50, '#FDDD60'], [1, '#7CFFB2']]" :axisLabelFontSize="10" :titleFontSize="14" :detailFontSize="18"
                  :colorTickData="[{name:'目标 50%',value:0.50}]" :value="0.20" text="基本富裕实现村数占比" :style="'height:12rem'"/>
                </el-col>
              </el-row>
            </div>
            <div style="margin-top:-2rem">
              <Title title="村实现完成情况"/>
              <div class="margin-top">
                <el-row :gutter="2" >
                  <el-col :span="12">
                    <div style="text-align: center;">
                      <div :style="'min-height:12rem'">
                        <radarEchart :style="'height:13rem'" :startAngle="150" :indicatorNameData="[ { name: '基本富裕', max: 100 },  { name: '人均收入', max: 100 },  { name: '集体经济', max: 100 }]" :series1ValueData="[100,100,100]" :series2ValueData="[20,18,30]"></radarEchart>
                      </div>
                      <div class="margin-top-xs">三超</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="text-align: center">
                      <radarEchart :style="'height:13rem'" :startAngle="45" :indicatorNameData="[{ name: '产业优', max: 100 },  { name: '环境优', max: 100 },  { name: '文化优', max: 100 },  { name: '服务优', max: 100 }]" :series1ValueData="[100,100,100,100]" :series2ValueData="[56,60,30,75]"></radarEchart>
                      <div class="margin-top-xs">四优</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="text-align: center" class="margin-top-xl">
                      <radarEchart :style="'height:13rem'" :indicatorNameData="[{ name: '组织强', max: 100 },  { name: '治理强', max: 100 }]" :series1ValueData="[100,100]" :series2ValueData="[80,90]"></radarEchart>
                      <div class="margin-top-xs">两强</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="margin-top">
              <div class="text-center">
                <Label :text="'总户数'" :title="10000" class="margin-lr-10"/>
                <Label :color="'#FCAE26FF'" :text="'达标村数'" :title="12" class="margin-lr-10"/>
                <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'20%'" class="margin-lr-10" @click="onClickPleaseWait('查看未达标户数')"/>
              </div>
            </div>
            <div class="column-center margin-bottom">
              <antvImageMap :areaCode="areaCode" areaGoTo="village"/>
            </div>
            
          </el-col>
          <el-col :span="7">
            <div class="">
              <Title title="公共服务均等化"/>
              <div class="target-text">
                <div class="-label">
                  <el-row :gutter="0">
                    <el-col :span="12">
                      <div class="margin-right-10 margin-tb-10">
                        <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'学前教育三年毛入园率(%)'"
                                class="target-content "/>
                      </div>

                    </el-col>
                    <el-col :span="12">
                      <div class="margin-right-10  margin-tb-10">
                        <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'全民医疗保险参保率(%)'"
                                class="target-content"/>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="0">
                    <el-col :span="12">
                      <div class="margin-right-10">
                        <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'特殊人群医疗保险参保率(%)'"
                                class="target-content"/>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="margin-right-10">
                        <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'农村客运覆盖率(%)'" class="target-content"/>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="margin-tb-10">
                  实现了幼有善育、学有优教、病有良医、老有康养、住有宜居、弱有帮扶。 一所中小学和附属中心幼儿园。
                  实现了农村客运全覆盖,村村通邮。建有农业社会化服务站。
                </div>
              </div>
            </div>
            <div class="">
              <Title title="基础设施一体化"/>
              <el-row :gutter="0">
                <el-col :span="12">
                  <div class="target-text margin-right-10 margin-tb-10">
                    <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'自来水普及率(%)'" class="target-content"/>
                  </div>

                </el-col>
                <el-col :span="12">
                  <div class="target-text margin-right-10  margin-tb-10">
                    <Label1 :color="'#1AFD9BFF'" :text="'100'" :title="'自然村通硬化路率(%)'" class="target-content"/>
                  </div>
                </el-col>
              </el-row>

              <div class="target-text margin-tb-10">
                文化健身等基础设施配套完善,公共基础设施管理、运行、养护机制完善健全。生活垃圾收转运处置体系行政村覆盖率100%。
              </div>
            </div>
            <div class="">
              <Title title="乡村治理现代化"/>
              <div class="target-text margin-tb-10">
                社会主义核心价值观深入人心，乡级综治中心规范化建设，建有数字乡村平台，实现雪亮工程全盖。矛盾纠纷妥善化解，自治、法治、德治相结合的治理体系基本构建，物质富足、精神富有、乡风文明。
              </div>
            </div>
            <div class="">
              <Title title="产业发展规模化"/>
              <div class="target-text margin-tb-10">
                产业发展规模化
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
import { ElMessageBox } from 'element-plus';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from "vue-router";
import antvImageMap from "../component/antvImageMap.vue";
import gaugeProgress from "../component/gaugeProgress.vue";
import radarEchart from "../component/radarEchart.vue";
import Label from "/@/views/res/dashboard/component/Label.vue";
import Label1 from "/@/views/res/dashboard/component/Label1.vue";
import OvalShape from "/@/views/res/dashboard/street/OvalShape.vue";
import Title from "/@/views/res/dashboard/village/Title.vue";
export default {
  name: "IndexDashboard",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {OvalShape, Label1, Label, Title, antvImageMap,gaugeProgress,radarEchart},
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
    //指标解读
    const onClickPleaseWait = (name:string) => {
      const html = `请等待，${name}功能正在开发中...`
      ElMessageBox.alert(html, '温馨提示', {dangerouslyUseHTMLString: true,type: 'info',})
    }
    // 页面加载时
    onMounted(() => {


    });
    return {
      onGoToLink,
      onClickPleaseWait,
      ...toRefs(state),
     
    };
  },
};
</script>

<style lang="less">


#data-view {
  width: 100%;
  height: 100%;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("/img/res/bg_2.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center middle;
  }

  .main-view {
    width: 100%;
    height: 100%;
  }

}
</style>