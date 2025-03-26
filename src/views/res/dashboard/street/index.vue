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
          <el-col :span="6">
            <div class="">
              <Title title="乡情介绍"/>
              <div class="target-text">
                <div class="margin">
                  大龙潭彝族乡为彝、汉族杂居的民族乡。最高海拔2105米，最低海拔970米，乡境内多为山地，立体气候明显，属南亚热带半干旱季风气候，年平均气温20.5℃，年降雨量800毫米，无霜期长达350天左右。辖区面积242.8平方公里，下辖裕民村、拉鲊村、新街村、干坝子村、大龙潭村、混撒拉村6个行政村，共55个村民小组，常住人口3712户14321人。
                  <br/>总村数6个，总户数3712户14321人。

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
                    <div style="text-align: center">
                      <radarEchart :style="'height:13rem'" :indicatorNameData="[{ name: '组织强', max: 100 },  { name: '治理强', max: 100 }]" :series1ValueData="[100,100]" :series2ValueData="[80,90]"></radarEchart>
                      <div class="margin-top-xs">两强</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="margin-top">
              <div class="text-center">
                <Label :text="'总户数'" :title="3712" class="margin-lr-10"/>
                <Label :color="'#FCAE26FF'" :text="'达标村数'" :title="1" class="margin-lr-10"/>
                <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'16.7%'" class="margin-lr-10" @click="onClickPleaseWait('查看未达标户数')"/>
              </div>
            </div>
            <div >
              <antvImageMap :areaCode="areaCode" areaGoTo="village"/>
            </div>
            <div >
              <el-row style="z-index: 2000;">
              <el-col :span="12">
                <div class="target-header margin-top" @click="onClickPleaseWait('查看帮扶家庭户')">
                <div class="target-title">帮扶户数统计</div>
              </div>
              <div class="target-content target-container-h3" @click="onClickPleaseWait('查看帮扶家庭户')">
                <dv-scroll-board :config="bfhsConfig" style="width:100%;height:22vh" @click="clickHandler"
                                @mouseover="mouseoverHandler"/>
              </div>
              </el-col>
              <el-col :span="12">
                <div class="target-header margin-top" @click="onClickPleaseWait('查看“五好”不达标家庭户')">
                  <div class="target-title" style="width:10vw">“五好”不达标户数</div>
                </div>
                <div class="target-content target-container-h3" @click="onClickPleaseWait('查看“五好”不达标家庭户')">
                  <dv-scroll-board :config="whbdbConfig" style="width:100%;height:22vh" @click="clickHandler"
                                  @mouseover="mouseoverHandler"/>
                </div>
              </el-col>
            </el-row>
            </div>
            
            
            
          </el-col>
          <el-col :span="6">
            <div class="">
              <Title title="公共服务均等化"/>
              <div class="target-text">
                <div class="target-content padding">
                  <el-row :gutter="8">
                    <el-col :span="6">
                        <div class=" padding-tb">
                          <label>学前教育三年毛<br>入园率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />2%
                        </div>

                    </el-col>
                    <el-col :span="6">
                        <div class="padding-tb">
                          <label>全民医疗保险<br>参保率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">98.5%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />3.5%
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="padding-tb">
                          <label>特殊人群医疗保险<br>参保率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />2%
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="padding-tb">
                          <label>农村客运<br>覆盖率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />
                        </div>
                    </el-col>
                  </el-row>
                </div>
                <!-- <div class="margin-tb-10">
                  实现了幼有善育、学有优教、病有良医、老有康养、住有宜居、弱有帮扶。 一所中小学和附属中心幼儿园。
                  实现了农村客运全覆盖,村村通邮。建有农业社会化服务站。
                </div> -->
              </div>
            </div>
            <div class="">
              <Title title="基础设施一体化"/>
              <div class="target-text">
                <div class="target-content padding">
                  <el-row :gutter="0">
                    <el-col :span="8">
                      <div class="padding-tb">
                          <label>自来水普及率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="padding-tb">
                          <label>自然村通硬化路率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">82.6%</label><i class="fa fa-arrow-down margin-left-sm margin-right-xs" style="font-size: 1rem; color: orange;" />17.4%
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="padding-tb">
                          <label>卫生厕所达标率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />2%
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <div class="">
              <Title title="乡村治理现代化"/>
              <div class="target-text">
                <div class="target-content padding">
                  <el-row :gutter="0">
                    <el-col :span="8">
                      <div class="padding-tb">
                          <label>法律援助率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />2%
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="padding-tb">
                          <label>雪亮工程覆盖率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">100%</label><i class="fa fa-arrow-down margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />2%
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="padding-tb">
                          <label>矛盾纠纷化解率</label>
                          <br><br>
                          <label style="color:#1AFD9BFF;font-size: 1.4rem">98%</label><i class="fa fa-arrow-up margin-left-sm margin-right-xs" style="font-size: 1rem; color: lightgreen;" />3%
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <div class="">
              <Title title="产业发展规模化"/>
              <div class="target-text margin-tb-10">
                产业发展规模化
              </div>
            </div>
            <!-- <div class="target-header margin-top" @click="onClickPleaseWait">
              <div class="target-title">帮扶户数统计</div>
            </div>
            <div class="target-content target-container-h3" @click="onClickPleaseWait">
              <dv-scroll-board :config="bfhsConfig" style="width:100%;height:22vh" @click="clickHandler"
                              @mouseover="mouseoverHandler"/>
            </div> -->
            
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
      //基础设施补短情况配置 改帮扶统计
      bfhsConfig :{
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
        align: ['center'],
      },
      //综合帮扶情况配置
      whbdbConfig :{
        header: ['村', '不达标户数'],
        data: [
          ['混撒拉村', '<span style="color:#32c5e9;">80</span>'],
          ['裕民村', '<span style="color:#9fe6b8;">160</span>'],
          ['拉鲊村', '120'],
          ['新街村', '<span style="color:#ff9f7f;">90</span>'],
          ['干坝子村', '60'],
          ['大龙潭村', '<span style="color:#e062ae;">75</span>'],
        ],
    }
  })
    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }
    //指标解读
    const onClickPleaseWait = (name:string='') => {
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