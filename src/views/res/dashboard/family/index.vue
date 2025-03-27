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
        <div style="width:25%">
          <Funnel @click="onClickTargetDetail"/>
          <Category/>
          <FiveGoods/>
        </div>

        <dv-border-box1 style="height:calc(100% - 21rem);width:50%;">
          <div
              style="margin: 1.5rem 1.5rem 0 1.5rem;display: flex;flex-direction: row;justify-content: space-between;align-items: flex-end;">
            <Label :text="'总户数'" :title="380"/>
            <Label :text="'总人口'" :title="1527"/>
            <Label :color="'#FCAE26FF'" :text="'达标户'" :title="193"/>
          </div>
          <div style="flex: 1;display: flex;flex-direction: row;">
            <div style="width: 50%;margin:  1rem 2rem">
              <sex/>
            </div>
            <div style="width: 50%;margin: 1rem 2rem 0 0">
              <ProportionOfAgeGroups/>
            </div>
          </div>
          <div style="margin: 1rem 2rem">
            <main-monitoring @click="onClickMainMonitoring"/>
          </div>
          <div style="flex: 1;display: flex;flex-direction: row;margin-bottom: 3rem">
            <div style="width: 50%;margin: 0 2rem">
              <LineGraph/>
            </div>
            <div style="width: 50%;margin-right: 2rem">
              <div class="target-header">
                <div class="target-title">帮扶需求</div>
              </div>
              <div class="target-content target-content-height">
                <dv-capsule-chart :config="shyzConfig" style="width:100%;height:25rem;"/>
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
import dayjs from 'dayjs';
import { ElMessageBox } from "element-plus";
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Label from "../component/Label.vue";
import numberVillageStat from "../component/numberVillageStat.vue";
import Category from "./Category.vue";
import FiveGoods from "./FiveGoods.vue";
import Funnel from "./Funnel.vue";
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
        fontSize: 15
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