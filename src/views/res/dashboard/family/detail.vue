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
      <div style="  max-height: 65rem; /* 或者你需要的任何高度 */overflow: auto;position: relative;">
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
              <el-col :span="3" class="text-center">普通劳动力</el-col>
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
              <el-col :span="3" class="text-center">普通劳动力</el-col>
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
              <el-col :span="3" class="text-center">弱劳动力</el-col>
              <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
              <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
              <el-col :span="1" class="text-center"></el-col>
            </el-row>
            <el-row class="margin-tb-sm">
              <el-col :span="1" class="text-center"></el-col>
              <el-col :span="2" class="text-center">陈*萍</el-col>
              <el-col :span="2" class="text-center">女</el-col>
              <el-col :span="2" class="text-center">60</el-col>
              <el-col :span="2" class="text-center">母亲</el-col>
              <el-col :span="2" class="text-center">小学</el-col>
              <el-col :span="3" class="text-center">健康</el-col>
              <el-col :span="3" class="text-center">弱劳动力</el-col>
              <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
              <el-col :span="3" class="text-center"><i class="fa fa-check margin-left"></i></el-col>
              <el-col :span="1" class="text-center"></el-col>
            </el-row>
            <el-row class="margin-tb-sm">
              <el-col :span="1" class="text-center"></el-col>
              <el-col :span="2" class="text-center">郭*冰</el-col>
              <el-col :span="2" class="text-center">男</el-col>
              <el-col :span="2" class="text-center">15</el-col>
              <el-col :span="2" class="text-center">儿子</el-col>
              <el-col :span="2" class="text-center">高中</el-col>
              <el-col :span="3" class="text-center">健康</el-col>
              <el-col :span="3" class="text-center">无劳动力</el-col>
              <el-col :span="3" class="text-center">-</el-col>
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
          <div class="dialog-title">五好情况</div>
          <el-row class="dialog-title">
            <el-col :span="7" class="text-center">生活好</el-col>
            <el-col :span="5" class="text-center">教育好</el-col>
            <el-col :span="5" class="text-center">医疗好</el-col>
            <el-col :span="4" class="text-center">住房好</el-col>
            <el-col :span="3" class="text-center">家风好</el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="3" class="text-center">基本养老保险应保尽保</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="2" class="text-center">污水有效处理</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="4" class="text-center">学龄前儿童就近入园</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="4" class="text-center">基本医疗保险应保尽保</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="3" class="text-center">住房安全(无D级危房)</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="2" class="text-center">无不良记录</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="3" class="text-center">生活用水安全稳定</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="2" class="text-center">供电稳定</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="4" class="text-center">无义务教育阶段辍学情况</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="4" class="text-center">十类人群有签约家庭医生</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="3" class="text-center">卫生厕所达标</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="2" class="text-center"></el-col>
            <el-col :span="1" class="dialog-body-text"></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="3" class="text-center">生产用水有保障</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="2" class="text-center">家用网络质量好</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="4" class="text-center">助学政策应享尽享</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>

            <el-col :span="4" class="text-center"></el-col>
            <el-col :span="1" class="text-center"></el-col>

            <el-col :span="3" class="text-center"></el-col>
            <el-col :span="1" class="text-center"></el-col>

            <el-col :span="2" class="text-center"></el-col>
            <el-col :span="1" class="dialog-body-text"></el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="3" class="text-center">垃圾集中转运</el-col>
            <el-col :span="1" class="dialog-body-text"><i class="fa fa-check margin-left"></i></el-col>
            <el-col :span="2" class="text-center"></el-col>
            <el-col :span="1" class="text-center"></el-col>

            <el-col :span="4" class="text-center"></el-col>
            <el-col :span="1" class="text-center"></el-col>

            <el-col :span="4" class="text-center"></el-col>
            <el-col :span="1" class="text-center"></el-col>

            <el-col :span="3" class="text-center"></el-col>
            <el-col :span="1" class="text-center"></el-col>

            <el-col :span="2" class="text-center"></el-col>
            <el-col :span="1" class="text-center"></el-col>
          </el-row>
          <div class="dialog-title">包联帮带情况</div>
          <el-row class="margin-tb-sm">
            <el-col :span="8" class="text-center">包联单位</el-col>
            <el-col :span="2" class="dialog-body-text text-left">村委会</el-col>
            <el-col :span="4" class="text-center">包联责任人</el-col>
            <el-col :span="5" class="dialog-body-text">邓*志</el-col>
            <el-col :span="2" class="text-center">包联责任人联系电话</el-col>
            <el-col :span="3" class="dialog-body-text">135****2590</el-col>
          </el-row>
          <el-row class="margin-tb-sm">
            <el-col :span="8" class="text-center">家庭具体困难</el-col>
            <el-col :span="8" class="text-center">帮带需求</el-col>
            <el-col :span="8" class="text-center">帮带措施落实情况</el-col>
          </el-row>
          <el-row  class="margin-tb-sm">
            <el-col :span="8" class="text-center dialog-body-text">有家庭成员患大病</el-col>
            <el-col :span="8" class="text-center dialog-body-text">医疗帮扶</el-col>
            <el-col :span="8" class="text-center dialog-body-text">大病救助</el-col>
          </el-row>
          <!-- <el-row v-for="data in [0,0,0,0,0,0,0]" class="margin-tb-sm">
            <el-col :span="8" class="text-center dialog-body-text">家庭成员健康状态不佳</el-col>
            <el-col :span="8" class="text-center dialog-body-text">医疗帮扶</el-col>
            <el-col :span="8" class="text-center dialog-body-text">医疗保障</el-col>
          </el-row> -->
          <!-- <div style="color: red">
            备注:<br>
            1.文化程度分为文盲或半文盲、小学、初中、高中、大专、本科及以上<br>
            2.健康状况分为:健康、长期慢性病、大病、残疾<br>
            3.劳动技能分为:普通劳动力、技能劳动力、丧失劳动力、无劳动力、弱劳动力或半劳动力<br>
            4.车辆不包含农用机械车和摩托车<br>
            5.土地面积:包含承包地、自留地、自开地等
          </div> -->
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
  color: #ccc;
  background-image: url("./img/bg_3.png");

  #dv-full-screen-container {
    background-image: url("./img/bg_3.png");
    background-color: #0d0d45;
    background-size: 100% 100%;
  }
}

.dialog-body-text {
  color: rgb(248, 248, 0);
  line-height: 1.8rem;
  vertical-align: bottom;
}

.dialog-body {
  margin-top: 1rem;
  margin-bottom: 1rem;

  .dialog-body-warning {
    color: rgb(248, 74, 0);
    line-height: 1.8rem;
    vertical-align: bottom;
  }

  span {
    color: rgb(248, 248, 0);
  }

  div {
    font-size: 1.2rem;
  }
}


.dialog-title {
  width: 100%;
  height: 3rem;
  background-color: rgb(2, 30, 93);
  color: #ddd;
  font-size: 1.5rem;
  text-align: center;
  line-height: 3rem;
}

</style>