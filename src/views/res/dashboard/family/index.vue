<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container v-if="isFullScreen">
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">区迈入
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px;"
                     @click="onGoToLink(`/admin/dashboard/street/index?areaCode=${streetAreaCode}`)">
            乡推进
          </dv-button>
          <dv-button key="" border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/village/index?areaCode=${areaCode}&areaName=${areaName}`)">村共创
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/family/index?areaCode=${areaCode}&areaName=${areaName}`)">
            户夯实
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">
          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>{{
              curTime
            }}</b></p>
        </div>
      </div>

      <div class="main-rows">
        <div style="width:25%" class="margin-left-sm">
          <!--          <div class="margin-top-sm">-->
          <!--            <sex :man="mainData['男性比例']" :woman="mainData['女性比例']"/>-->
          <!--          </div>-->

          <div class="margin-top-sm">
            <div class="target-header">
              <span class="target-title">五好达标情况</span>
            </div>
            <div class="target-content target-container-h3 padding-top">
              <radarEchart/>
            </div>
          </div>
        </div>

        <dv-border-box1 style="width:50%;">
          <div class="margin-lr-xl margin-top-xl"
               style="display: flex;flex-direction: row;justify-content: space-between;align-items: flex-end;">
            <Label :text="'总户数'" :title="mainData['总户数']"/>
            <Label :text="'总人口'" :title="mainData['总人口']"/>
            <Label :color="'#FCAE26FF'" :text="'夯实户数'" :title="mainData['达标户']"/>
            <Label :color="'#FCAE26FF'" :text="'夯实户占比'" :title="(mainData['达标户占比']||'50')+'%'"/>
          </div>
          <div class="margin-lr-lg margin-top-sm" style="flex: 1;display: flex;flex-direction: row;">
            <div style="width:50%;" @click="onClickTargetDetail">
              <div class="target-header">
                <span class="target-title">家庭年收入结构图</span>
              </div>
              <div class="target-content">
                <div class="text-center">
                  <pieEllipse :data='[{name:"10万以下",value:"30%",darkColor:"green",lightColor:"lightgreen",nameStyle:"fill:#ddd;text-anchor:middle;font-size:60;",valueStyle:"fill:#bbb;text-anchor:start;font-size:54;"}
                    ,{name:"10万-50万",value:"69.7%",darkColor:"#E6A23C",lightColor:"yellow",nameStyle:"fill:#ddd;text-anchor:middle;font-size:60;",valueStyle:"fill:#bbb;text-anchor:end;font-size:54;"}
                    ,{name:"50万以上",value:"0.3%",darkColor:"rgb(29, 72, 196)",lightColor:"rgb(29, 72, 196)",nameStyle:"fill:#ddd;text-anchor:middle;font-size:60;",valueStyle:"fill:#ddd;text-anchor:start;font-size:54;"}]'
                              style="height:12rem;transform:scale(0.4,0.3) translate(0, -10rem);"/>
                </div>
              </div>
            </div>

            <div style="width:50%;">
              <div class="target-header">
                <span class="target-title">家庭年收入分类</span>
              </div>
              <div class="target-content">
                <Category :incomeFromProperty="mainData['财产性收入']" :incomeFromWageAndSalary="mainData['工资性收入']"
                          :operationalIncome="mainData['经营性收入']" :transferIncome="mainData['转移性收入']"/>
              </div>
            </div>
          </div>
          <div class="margin-lr-lg margin-top-sm">
            <div class="target-header">
              <span class="target-title">主要监测群体（2025）</span>
            </div>
            <div class="target-content">
              <main-monitoring :keyPoint="mainData['低收入重点监测群体占比']"
                               :ordinary="mainData['低收入一般监测群体占比']"
                               @click="onClickMainMonitoring"/>
            </div>
          </div>
          <div class="margin">
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="target-header">
                  <span class="target-title">五好指标预警</span>
                </div>
                <div class="target-content target-content-height">
                  <!-- TODO:每个村的预警不一样 -->
                  <LineGraph
                      :data="[mainData['未买医保']||0,mainData['D级危房']||0,mainData['缺水']||0,mainData['辍学学生']||0]"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="target-header">
                  <span class="target-title">帮扶需求</span>
                </div>
                <div class="target-content target-content-height">
                  <dv-capsule-chart :config="shyzConfig" style="width:100%;height:14rem;"/>
                </div>
              </el-col>
            </el-row>
          </div>
        </dv-border-box1>

        <div style="width:25%;">
          <Table :tableDataList="tableDataList" :areaCode="areaCode" :areaName="areaName"/>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import dayjs from 'dayjs';
import {ElMessageBox} from "element-plus";
import {onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Label from "../component/Label.vue";
import numberVillageStat from "../component/numberVillageStat.vue";
import radarEchart from "../component/radarEchart.vue";
import Category from "./Category.vue";
import LineGraph from "./LineGraph.vue";
import ProportionOfAgeGroups from "./ProportionOfAgeGroups.vue";
import Table from "./Table.vue";
import pieEllipse from "/@/components/pieEllipse/index.vue";
import MainMonitoring from "/@/views/res/dashboard/family/MainMonitoring.vue";
import Sex from "/@/views/res/dashboard/family/sex.vue";

export default {
  name: "IndexDashboard",
  components: {
    Sex,
    MainMonitoring,
    ProportionOfAgeGroups,
    pieEllipse,
    Category,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Table,
    radarEchart,
    LineGraph,
    // eslint-disable-next-line vue/no-unused-components
    numberVillageStat,
    // eslint-disable-next-line vue/no-reserved-component-names
    Label
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
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      mainData: {}, //总表数据
      tableDataList: {},
      shyzConfig: {
        data: [],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '户',
        showValue: true,
        labelNum: 5,
        fontSize: 12,
        sort: true
      }
    })
    //指标解读
    const onClickTargetDetail = () => {
      const html = `
      <div>
        具体措施如下：
        <p>大病补助</p>
        <p>就业推荐</p>
        <p>教育培训</p>
      </div>`
      ElMessageBox.alert(html, '低收入群体托底举措', {dangerouslyUseHTMLString: true, width: '80%'})
    };
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

    const onFullScreen = () => {
      state.isFullScreen = !state.isFullScreen
    }

    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }

    onMounted(async () => {
      // 暂时不处理分区域
      // const mainDataList = await d3.csv(`/data/res/family/${areaCode}/总表.csv`);
      const mainDataList = await d3.csv(`/data/res/family/总表.csv`);
      console.log("mainData:", mainDataList)
      if (mainDataList && mainDataList.length > 0) {
        console.log(mainDataList[0])
        state.mainData = mainDataList[0];
      }
      // TODO: 按数据大小排列
      state.shyzConfig.data = [
        {
          name: '产业帮扶',
          value: state.mainData['产业帮扶']
        },
        {
          name: '就业促进',
          value: state.mainData['就业促进']
        },
        {
          name: '教育帮扶',
          value: state.mainData['教育帮扶']
        },
        {
          name: '最低生活保障',
          value: state.mainData['最低生活保障']
        },
        {
          name: '医疗救助',
          value: state.mainData['医疗救助']
        },
        {
          name: '住房保障',
          value: state.mainData['住房保障']
        },
        {
          name: '临时救助',
          value: state.mainData['临时救助']
        },
        {
          name: '慈善救助',
          value: state.mainData['慈善救助']
        },
        {
          name: '其他',
          value: state.mainData['其他']
        },]

      state.tableDataList = await d3.csv(`/data/res/family/HSL帮扶户数统计329.csv`);
    })

    return {
      onFullScreen,
      ...toRefs(state),
      onClickTargetDetail,
      onClickMainMonitoring,
      onGoToLink
    }
  }
  ,
}
;
</script>

<style lang="less">
#app {
  .el-aside, .el-header, .layout-navbars-tagsview {
    display: none;
  }
}

#map {
  height: 100%;
  width: 500px;
}

#data-view {
  width: 100%;
  height: 100%;
  color: #000;

  #dv-full-screen-container {
    background-image: url("/img/res/bg_2.png");
    background-size: 100% 100%;
  }
}
</style>