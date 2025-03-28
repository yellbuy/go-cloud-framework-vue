<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container v-if="isFullScreen">
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
                     style="display:inline-block;margin-left:10px" @click="onGoToLink(`/admin/dashboard/village/index?areaCode=${areaCode}&areaName=${areaName}`)">村实现
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
        </div>
      </div>

      <div class="main-rows">
        <div style="width:25%" class="margin-left-sm">
          <div @click="onClickTargetDetail">
            <div class="target-header">
              <span class="target-title">家庭年收入结构图</span>
            </div>

            <div class="target-container-h3 target-content">
              <div class="text-center padding">
                <img src="./img/橄榄图.png" class="margin" style="height:20vh"/>
              </div>
            </div>
          </div>
          <div class="margin-top-sm">
            <div class="target-header">
              <span class="target-title">家庭年收入分类</span>
            </div>
            <div class="target-content target-container-h3">
              <Category/>
            </div>
          </div>
          <div class="margin-top-sm">
            <div class="target-header">
              <span class="target-title">五好达标情况</span>
            </div>
            <div class="target-content target-container-h3 padding-top">
              <radarEchart :style="'height:16rem;padding-top:2rem'" :startAngle="230" :indicatorNameData=" [
            {name: '住房好', max: 100},
            {name: '家风好', max: 100},
            {name: '医疗好', max: 100},
            {name: '生活好', max: 100},
            {name: '教育好', max: 100},
          ]" :series1ValueData="[100,100,100,100,100]" :series2ValueData="[100, 100, 99.7, 61.8, 98.4]"></radarEchart>
            </div>
          </div>
        </div>

        <dv-border-box1 style="width:50%;">
          <div class="margin-lr-xl margin-top-xl"
              style="display: flex;flex-direction: row;justify-content: space-between;align-items: flex-end;">
            <Label :text="'总户数'" :title="mainData['总户数'] || 380"/>
            <Label :text="'总人口'" :title="mainData['总人口'] || 1527"/>
            <Label :color="'#FCAE26FF'" :text="'达标户'" :title="mainData['达标户'] || 193"/>
          </div>
          <div class="margin-lr-lg margin-top-sm" style="flex: 1;display: flex;flex-direction: row;">
            <div class="margin-top-sm" style="width: 50%;">
              <sex/>
            </div>
            <div class="margin-top-sm" style="width: 50%;">
              <ProportionOfAgeGroups/>
            </div>
          </div>
          <div class="margin-lr-lg margin-top-sm">
            <div class="target-header">
              <span class="target-title">主要监测群体</span>
            </div>
            <div class="target-content">
              <main-monitoring @click="onClickMainMonitoring"/>
            </div>
            
          </div>
          <div class="margin-lr-lg margin-top-sm" style="flex: 1;display: flex;flex-direction: row;">
            <div style="width: 50%;">
              <div class="target-header">
                <span class="target-title">五好指标预警</span>
              </div>
              <div class="target-content target-content-height">
                <LineGraph/>
              </div>
              
            </div>
            <div style="width: 50%;">
              <div class="target-header">
                <span class="target-title">帮扶需求</span>
              </div>
              <div class="target-content target-content-height">
                <dv-capsule-chart :config="shyzConfig" style="width:100%;height:24vh;"/>
              </div>

            </div>
          </div>

        </dv-border-box1>

        <div style="width:25%;">
          <Table :areaCode="areaCode"/>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import dayjs from 'dayjs';
import { ElMessageBox } from "element-plus";
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Label from "../component/Label.vue";
import numberVillageStat from "../component/numberVillageStat.vue";
import radarEchart from "../component/radarEchart.vue";
import Category from "./Category.vue";
import LineGraph from "./LineGraph.vue";
import ProportionOfAgeGroups from "./ProportionOfAgeGroups.vue";
import Table from "./Table.vue";
import MainMonitoring from "/@/views/res/dashboard/family/MainMonitoring.vue";
import Sex from "/@/views/res/dashboard/family/sex.vue";
export default {
  name: "IndexDashboard",
  components: {
    Sex,
    MainMonitoring,
    ProportionOfAgeGroups,
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
    const areaName = route.query.areaName||"";
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
      mainData:{}, //总表数据
      shyzConfig: {
        data: [
          {
            name: '产业帮扶',
            value: 67
          },
          {
            name: '就业促进',
            value: 43
          },
          {
            name: '教育帮扶',
            value: 15
          },
          {
            name: '医疗救助',
            value: 1
          },
          {
            name: '住房保障',
            value: 0
          },
          {
            name: '最低生活保障',
            value: 10
          },
          {
            name: '临时救助',
            value: 0
          },
          {
            name: '慈善救助',
            value: 0
          },
          {
            name: '其他',
            value: 0
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '人',
        showValue: true,
        labelNum: 5,
        fontSize: 12
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
     onMounted(async()=>{
      try{
        const mainDataList=await d3.csv(`/data/res/family/${areaCode}/总表.csv`);
        console.log("mainData:",mainDataList)
        if(mainDataList && mainDataList.length>0){
          state.mainData=mainDataList[0];
        }
      }catch(er){
        console.log(er)
      }
      
      

    })
    return {
      onFullScreen,
      ...toRefs(state),
      onClickTargetDetail,
      onClickMainMonitoring,
      onGoToLink
    };
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
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
  }
}
</style>