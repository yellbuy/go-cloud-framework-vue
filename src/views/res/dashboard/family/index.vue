<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container v-if="isFullScreen">
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#615ea8" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="onGoToLink(`/admin/index`)">区建成
          </dv-button>
          <dv-button border="Border4" color="#615ea8" fontSize="12" style="display:inline-block;margin-left:10px;"
                     @click="onGoToLink(`/admin/dashboard/street/index?areaCode=${streetAreaCode}`)">
            乡进入
          </dv-button>
          <dv-button key="" border="Border4" color="#615ea8" fontSize="12"
                     style="display:inline-block;margin-left:10px">村实现
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12" style="display:inline-block;margin-left:10px"
                     @click="onGoToLink(`/admin/dashboard/family/index?areaCode=${streetAreaCode}`)">
            户达标
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">

          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>{{
              curTime
            }}</b></p>
          <dv-button border="Border4" color="#409EFF"
                     fontSize="12" style="display:inline-block;margin-right:10px;"
                     @click="onGoToLink(`/admin/dashboard/home/detail`)">六优指标
          </dv-button>
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-right:10px;" @click="onClickCountDetail">区情介绍
          </dv-button>
        </div>
      </div>

      <div class="main-rows">
        <div style="width:25%">
          <Funnel @click="onClickTargetDetail"/>
          <FiveGoods/>
          <Category/>
        </div>

        <dv-border-box1 style="height:calc(100% - 21rem);width:50%;">
          <div style="text-align: center;margin: 1.5rem 1.5rem 0 1.5rem">
            <Label :text="'总户数'" :title="10000"/>
            <Label :color="'#FCAE26FF'" :text="'达标户'" :title="9500" style="margin: 0 20rem 2rem;"/>
            <Label :color="'#1AFD9BFF'" :text="'占比'" :title="'95%'"/>
          </div>
          <div style="margin: 1rem 2rem">
            <main-monitoring @click="onClickMainMonitoring"/>
          </div>
          <div style="flex: 1;display: flex;flex-direction: row;">
            <div style="width: 50%;margin: 0 2rem">
              <LineGraph/>
            </div>
            <div style="width: 50%;margin-right: 2rem">
              <div class="target-header">
                <div class="target-title">帮扶人数</div>
              </div>
              <div class="target-content target-content-height">
                <dv-capsule-chart :config="shyzConfig" style="width:100%;height:25rem;"/>
              </div>
            </div>
          </div>
          <div style="flex: 1;display: flex;flex-direction: row;">
            <div style="width: 50%;margin:  1rem 2rem">
              <sex/>
            </div>
            <div style="width: 50%;margin: 1rem 2rem 0 0">
              <ProportionOfAgeGroups/>
            </div>
          </div>
        </dv-border-box1>

        <div style="width:25%;">
          <Table/>
        </div>
      </div>

      <Dialog :isShow="false"/>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import {ElMessageBox} from "element-plus";
import {reactive, toRefs} from 'vue';
import {useRoute} from 'vue-router';
import Label from "../component/Label.vue";
import numberVillageStat from "../component/numberVillageStat.vue";
import Category from "./Category.vue";
import FiveGoods from "./FiveGoods.vue";
import Funnel from "./Funnel.vue";
import LineGraph from "./LineGraph.vue";
import ProportionOfAgeGroups from "./ProportionOfAgeGroups.vue";
import Table from "./Table.vue";
import Dialog from "/@/views/res/dashboard/family/Dialog.vue";
import MainMonitoring from "/@/views/res/dashboard/family/MainMonitoring.vue";
import Sex from "/@/views/res/dashboard/family/sex.vue";

export default {
  name: "IndexDashboard",
  components: {
    Sex,
    // eslint-disable-next-line vue/no-reserved-component-names
    Dialog,
    MainMonitoring,
    ProportionOfAgeGroups,
    Funnel,
    Category,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Table,
    FiveGoods,
    LineGraph,
    // eslint-disable-next-line vue/no-unused-components
    numberVillageStat,
// eslint-disable-next-line vue/no-reserved-component-names
    Label
  },
  setup() {
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
    const route = useRoute();
    route.query.areaCode = "510411200200";
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      shyzConfig: {
        data: [
          {
            name: '垃圾不乱堆帮扶情况',
            value: 55
          },
          {
            name: '供电稳定帮扶情况',
            value: 21
          },
          {
            name: '卫生厕所帮扶情况',
            value: 67
          },
          {
            name: '家用网络帮扶情况',
            value: 98
          },
          {
            name: '生活用水帮扶情况',
            value: 88
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '人',
        showValue: true,
        labelNum: 5,
        fontSize: 18
      }
    })
    const onFullScreen = () => {
      state.isFullScreen = !state.isFullScreen
    }

    return {
      onFullScreen,
      ...toRefs(state),
      onClickTargetDetail,
      onClickMainMonitoring
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