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
          <dv-button border="Border4" color="#409EFF"
                     fontSize="12" style="display:inline-block;margin-right:10px;"
                     @click="onGoToLink(`/admin/dashboard/family/index?areaCode=${areaCode}&areaName=${areaName}`)">返回
          </dv-button>
        </div>
      </div>

      <div class="main-rows">
        <div class="main-rows-detail margin-lr-xl">
          <div class="dialog-title">基本情况</div>
          <div class="dialog-body">
            <el-row>
              <el-col :span="4" class="text-right">户主：</el-col>
              <el-col :span="4" class="text-left dialog-body-text"><span>{{ tableData["姓名"] }}</span></el-col>
              <el-col :span="4" class="text-right">家庭人数：</el-col>
              <el-col :span="4" class="text-left dialog-body-text">5</el-col>
              <el-col :span="4" class="text-right">联系方式：</el-col>
              <el-col :span="4" class="text-left dialog-body-text">130****1234</el-col>
            </el-row>
          </div>
          <!-- TODO: 显示身份证号给管理员 -->
          <div class="dialog-title margin-top-lg">资产情况</div>
          <div class="target-content">
            <div class="dialog-body" style="">
              <div>车辆（辆）：<span>轿车 五菱宏光2021款 1.5L改款 S基本型 液压助力LAR</span></div>
              <div>商品房（平方米）：<span>120</span></div>
              <div>自建房（平方米）：<span>120</span></div>
              <div>承包地：<span>无</span></div>
              <div>产业：<span>无</span></div>
            </div>
          </div>

          <div class="dialog-title margin-top-lg">收入情况</div>
          <div class="target-content">
            <div class="dialog-body margin-bottom" style="">
              <div>工资性收入：<span>¥ 0.00</span> 元</div>
              <div>经营性收入：<span>¥ 170000.00</span> 元</div>
              <div>财产性收入：<span>¥ 0.00</span> 元</div>
              <div>转移性收入：<span>¥ 2123.00</span> 元</div>
              <div>经营成本：<span>¥ 20000.00</span> 元</div>
            </div>
            <div class="dialog-body margin-bottom" style="">
              <div>人均收入：<span>¥ 34424.6</span> 元</div>
            </div>
          </div>

          <div class="dialog-title margin-top-lg">五好情况</div>
          <div class="dialog-body target-content margin-bottom-lg">
            <div>
              <div>生活好</div>
              <div class="margin-top" style="text-align: left"><span>1、1人购买养老保险</span></div>
              <div style="text-align: left"><span>2、生活用水安全稳定</span></div>
              <div style="text-align: left"><span>3、供电稳定不断电</span></div>
            </div>
            <div>
              <div>教育好</div>
              <div class="margin-top" style="text-align: left"><span>1、适龄儿童1人</span></div>
              <div style="text-align: left"><span>2、学龄儿童0名</span></div>
              <div style="text-align: left"><span>3、辍学儿童0名</span></div>
            </div>
            <div>
              <div>医疗好</div>
              <div class="margin-top" style="text-align: left"><span>1、1人购买医保</span></div>
            </div>
            <div>
              <div>住房好</div>
              <div class="margin-top" style="text-align: left"><span>1、住房安全</span></div>
            </div>
            <div>
              <div>无不良记录</div>
              <div class="margin-top" style="text-align: left"><span>1、家庭和美</span></div>
              <div style="text-align: left"><span>2、亲友和睦</span></div>
              <div style="text-align: left"><span>3、遵纪守法</span></div>
            </div>
          </div>

          <div class="dialog-title margin-top-lg">帮扶需求</div>
          <div class="target-content margin-bottom-lg">
            <div class="dialog-body" style="flex-direction: row;">
              <div>
                <div style="margin-left: 2rem;text-align: left"><span>教育帮扶、医疗救助</span></div>
                <div style="margin-left: 2rem;text-align: left"><span>其他：给予帮扶情况其他情况说明</span></div>
              </div>
              <div>
                <div style="margin-left: 2rem;text-align: left">
                  <span style="color: #28A2CE">包联责任人</span>
                </div>
                <div class="margin-top" style="margin-left: 2rem;text-align: left">
                  <span>姓名：李*江</span>
                </div>
                <div style="margin-left: 2rem;text-align: left">
                  <span>电话：133****8935</span>
                </div>
                <div style="margin-left: 2rem;text-align: left">
                  <span>职务：委员</span>
                </div>
              </div>
            </div>

            <div class="dialog-body" style="justify-content: space-between">
              <div style="flex: 1;margin-right: 1rem">
                <div class="dialog-title margin-bottom-lg">匹配政策</div>
                <div style="margin-left: 2rem"><span>《教育帮扶政策》</span></div>
                <div style="margin-left: 2rem"><span>《医疗救助政策》</span></div>
              </div>
              <div style="flex: 1">
                <div class="dialog-title margin-bottom-lg">政策落实情况</div>
                <div style="margin-left: 2rem"><span>已落实</span></div>
              </div>
            </div>
          </div>

        </div>

        <div style="width:25%;">
          <Table :tableDataList="tableDataList" :areaCode="areaCode" :areaName="areaName"/>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import * as d3 from "d3";
import dayjs from 'dayjs';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from "./Table.vue";

export default {
  name: "IndexDashboard",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Table
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const areaCode = route.query.areaCode;
    const areaName = route.query.areaName || "";
    const streetAreaCode = areaCode?.toString().slice(0, 9)
    const countyAreaCode = areaCode?.toString().slice(0, 6)

    const state: any = reactive({
      isFullScreen: true,
      curTime: dayjs().format("YYYY年MM月DD日"),
      areaCode: areaCode,
      areaName: areaName,
      streetAreaCode: streetAreaCode,
      countyAreaCode: countyAreaCode,
      tableDataList: {},
      tableData: {}
    })
    const onFullScreen = () => {
      state.isFullScreen = !state.isFullScreen
    }

    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }

    onMounted(async () => {
      const tableDataList = await d3.csv(`/data/res/family/HSL帮扶户数统计329.csv`);
      state.tableDataList = tableDataList;
      if (tableDataList && tableDataList.length > 0) {
        state.tableData = tableDataList[route.query.index];
      }
      console.log(state.tableDataList);
      console.log(state.tableData);
    })

    return {
      onFullScreen,
      ...toRefs(state),
      onGoToLink
    };
  }
}
</script>


<style lang="less" scoped>
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
  color: #0d0d45;
  background-image: url("./img/bg_3.png");
  #dv-full-screen-container {
    background-image: url("./img/bg_3.png");
    background-color: #0d0d45;
    background-size: 100% 100%;
  }
}

.main-rows-detail {
  width: 75%;
  color: #28A2CE;


  .dialog-body {
    padding: 1rem 0;
    background-color: rgba(0, 19, 55, 0.47);
    .dialog-body-text {
      color:rgb(248,248,0);
    }
    span {
      color: rgb(248,248,0);
    }
    div {
      font-size: 1.2rem;
    }
  }

  

  .dialog-title {
    width: 100%;
    height: 3rem;
    background-color: rgb(2,30,93);
    color: rgb(39,159,204);
    font-size: 1.5rem;
    text-align: center;
    line-height: 3rem;
  }
}
</style>