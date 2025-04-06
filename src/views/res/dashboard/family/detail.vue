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
      <div class="margin-lg">
        <div class="dialog-title">基本情况</div>
        <div class="dialog-body">
          <el-row>
            <el-col :span="2" class="text-right">户主：</el-col>
            <el-col :span="2" class="text-left dialog-body-text"><span>{{ tableData["姓名"] }}</span></el-col>
            <el-col :span="2" class="text-right">家庭人数：</el-col>
            <el-col :span="3" class="text-left dialog-body-text">5</el-col>
            <el-col :span="2" class="text-right">联系方式：</el-col>
            <el-col :span="3" class="text-left dialog-body-text">130****1234</el-col>
            <el-col :span="3" class="text-right">“一增”是否实现</el-col>
            <el-col :span="2" class="text-left dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="3" class="text-right">“五好”是否实现</el-col>
            <el-col :span="2" class="text-left dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>
          </el-row>
          <el-row class="dialog-title">
            <el-col :span="1" class="text-center"></el-col>
            <el-col :span="2" class="text-center">姓名</el-col>
            <el-col :span="2" class="text-center">性别</el-col>
            <el-col :span="2" class="text-center">年龄</el-col>
            <el-col :span="2" class="text-center">与户主关系</el-col>
            <el-col :span="2" class="text-center">文化程度</el-col>
            <el-col :span="3" class="text-center">健康状况</el-col>
            <el-col :span="3" class="text-center">劳动技能</el-col>
            <el-col :span="3" class="text-center">是否购买基本养老保险</el-col>
            <el-col :span="3" class="text-center">是否购买基本医疗保险</el-col>
            <el-col :span="1" class="text-center"></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="1" class="text-center"></el-col>
            <el-col :span="2" class="text-center">{{ tableData["姓名"] }}</el-col>
            <el-col :span="2" class="text-center">男</el-col>
            <el-col :span="2" class="text-center">41</el-col>
            <el-col :span="2" class="text-center">户主</el-col>
            <el-col :span="2" class="text-center">高中</el-col>
            <el-col :span="3" class="text-center">健康</el-col>
            <el-col :span="3" class="text-center">无</el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="1" class="text-center"></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="1" class="text-center"></el-col>
            <el-col :span="2" class="text-center">张*秀</el-col>
            <el-col :span="2" class="text-center">女</el-col>
            <el-col :span="2" class="text-center">40</el-col>
            <el-col :span="2" class="text-center">妻子</el-col>
            <el-col :span="2" class="text-center">初中</el-col>
            <el-col :span="3" class="text-center">健康</el-col>
            <el-col :span="3" class="text-center">无</el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="1" class="text-center"></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="1" class="text-center"></el-col>
            <el-col :span="2" class="text-center">郭*</el-col>
            <el-col :span="2" class="text-center">男</el-col>
            <el-col :span="2" class="text-center">62</el-col>
            <el-col :span="2" class="text-center">父亲</el-col>
            <el-col :span="2" class="text-center">初中</el-col>
            <el-col :span="3" class="text-center dialog-body-warning">残疾</el-col>
            <el-col :span="3" class="text-center">无</el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="1" class="text-center"></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="1" class="text-center"></el-col>
            <el-col :span="2" class="text-center">陈*萍</el-col>
            <el-col :span="2" class="text-center">女</el-col>
            <el-col :span="2" class="text-center">60</el-col>
            <el-col :span="2" class="text-center">目前</el-col>
            <el-col :span="2" class="text-center">小学</el-col>
            <el-col :span="3" class="text-center">健康</el-col>
            <el-col :span="3" class="text-center">无</el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="1" class="text-center"></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="1" class="text-center"></el-col>
            <el-col :span="2" class="text-center">郭*冰</el-col>
            <el-col :span="2" class="text-center">男</el-col>
            <el-col :span="2" class="text-center">16</el-col>
            <el-col :span="2" class="text-center">儿子</el-col>
            <el-col :span="2" class="text-center">高中</el-col>
            <el-col :span="3" class="text-center">健康</el-col>
            <el-col :span="3" class="text-center">无</el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="1" class="text-center"></el-col>
          </el-row>
        </div>
        <div class="dialog-title">资产资源情况</div>
          <div class="dialog-body">
            <el-row class="margin-tb-sm">
              <el-col :span="3" class="text-right">车辆（辆）：</el-col>
              <el-col :span="1" class="text-left dialog-body-text">1</el-col>
              <el-col :span="3" class="text-right">自建房（平方米）：</el-col>
              <el-col :span="1" class="text-left dialog-body-text">206</el-col>
              <el-col :span="3" class="text-right">商品房（平米）：</el-col>
              <el-col :span="1" class="text-left dialog-body-text">0</el-col>
              <el-col :span="3" class="text-right">商铺（平方米）：</el-col>
              <el-col :span="1" class="text-left dialog-body-text">0</el-col>
              <el-col :span="3" class="text-right">土地（亩）：</el-col>
              <el-col :span="1" class="text-left dialog-body-text">1.2</el-col>
              <el-col :span="3" class="text-right">林地（亩）：</el-col>
              <el-col :span="1" class="text-left dialog-body-text">0.2</el-col>
            </el-row>
          </div>
          <div class="dialog-title">收入情况</div>
          <div class="dialog-body">
            <el-row class="margin-tb-sm">
              <el-col :span="3" class="text-right">家庭年收入（元）：</el-col>
              <el-col :span="7" class="text-left dialog-body-text">¥ 50000.00</el-col>
              <el-col :span="3" class="text-right">家庭人均年收入（元）：</el-col>
              <el-col :span="6" class="text-left dialog-body-warning">¥ 10000.00</el-col>
            </el-row>
            <el-row class="margin-tb-sm">
              <el-col :span="3" class="text-right">经营性收入(元）：</el-col>
              <el-col :span="2" class="text-left dialog-body-text">¥ 50000.00</el-col>
              <el-col :span="3" class="text-right">工资性收入(元）：</el-col>
              <el-col :span="2" class="text-left dialog-body-text">¥ 0</el-col>
              <el-col :span="3" class="text-right">财产性收入(元）：</el-col>
              <el-col :span="2" class="text-left dialog-body-text">¥ 0</el-col>
              <el-col :span="3" class="text-right">转移性收入(元）：</el-col>
              <el-col :span="2" class="text-left dialog-body-text">¥ 0</el-col>
              <el-col :span="3" class="text-right">经营成本(元）：</el-col>
              <el-col :span="1" class="text-left dialog-body-text">¥ 0</el-col>
            </el-row>
          </div>
      </div>
      <div class="main-rows">
        <div class="margin-lr-xl">
          <!-- TODO: 显示身份证号给管理员 -->
          

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
  color: rgb(40,157,202);
  background-image: url("./img/bg_3.png");
  #dv-full-screen-container {
    background-image: url("./img/bg_3.png");
    background-color: #0d0d45;
    background-size: 100% 100%;
  }
}

.dialog-body {
    margin-top: 1rem;
    margin-bottom: 1rem;
    .dialog-body-text {
      color:rgb(248,248,0);
      line-height: 1.8rem;
      vertical-align: bottom;
    }
    .dialog-body-warning {
      color:rgb(248, 74, 0);
      line-height: 1.8rem;
      vertical-align: bottom;
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

</style>