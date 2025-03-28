<template>
  <div id="data-view" dv-bg>

    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" @click="console.log('click')">区建成
          </dv-button>
          <dv-button border="Border4" color="#615ea8" fontSize="12" style="display:inline-block;margin-left:10px;">
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

          <p style="display:inline-block;color:white;margin-left:10px;margin-right:30px;font-size:14pt"><b>{{ curTime }}</b></p>
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="onGoToLink(`/admin/dashboard/home/detail`)" border="Border4" color="#409EFF">七优指标</dv-button>
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="onClickCountDetail" border="Border4" color="#409EFF">区情介绍</dv-button>
        </div>
      </div>

      <!-- <div style="position:absolute;top:10px;right:10px">
        <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
      </div> -->
      <div class="main-rows">
        <div style="width:25%;" class="padding-lr-12">
          <div class="target-header" @click="onClickPleaseWait">
            <span class="target-title">乡进入情况</span>
          </div>
          <div @click="onClickPleaseWait" class="target-container-h3 target-content text-center">
            <!-- <rankingCounty/> 3月27日换仪表图-->
            <el-row class="margin-top">
                <el-col :span="12">
                    <gaugeProgress  :colorValueData="[[0.50, '#FDDD60'], [1, '#7CFFB2']]" :axisLabelFontSize="10" :titleFontSize="14" :detailFontSize="18"
                    :colorTickData="[{name:'目标 50%',value:0.50}]" :value="0.26" text="基本富裕户达标乡占比" :style="'height:12rem'"/>
                    <div class="target-text" style="margin-top:-1.5rem">达标乡镇数(3/13)</div>
                </el-col>
                <el-col :span="12">
                    <gaugeProgress :colorValueData="[[0.50, '#FDDD60'], [1, '#7CFFB2']]" :axisLabelFontSize="10" :titleFontSize="14" :detailFontSize="18"
                  :colorTickData="[{name:'目标 50%',value:0.50}]" :value="0.175" text="基本富裕村实现乡达标占比" :style="'height:12rem'"/>
                  <div class="target-text" style="margin-top:-1.5rem">达标乡镇数(2/13)</div>
                </el-col>
              </el-row>
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <span class="target-title">村实现情况</span>
          </div>
          <div @click="onClickPleaseWait">
            <rankingVillage/>
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <span class="target-title">户达标情况</span>
          </div>
          <div @click="onClickPleaseWait">
            <rankingFamily/>
          </div>

          <!-- <rankingCounty/> -->
          <!-- <barAreaGdp/> -->
        </div>
        <dv-border-box1 style="width:50%;" class="">
          <!-- <digitalGoodsStat/> -->
          <numberCounty/>
          <div class="column-center margin-bottom">
            <antvImageMap areaCode="510411" areaGoTo="street"></antvImageMap>
          </div>
          <div class="column-footer">
            <!-- <dv-button @click="console.log('click')" style="margin-left:10px;z-index: 9999;" border="Border6" color="#e18a3b">经济优建</dv-button>
            <dv-button @click="console.log('click')" style="margin-left:10px" border="Border6" color="#e18a3b">民生优享</dv-button>
            <dv-button @click="console.log('click')" style="margin-left:10px" border="Border6" color="#e18a3b">文化优创</dv-button>
            <dv-button @click="console.log('click')" style="margin-left:10px" border="Border6" color="#e18a3b">环境优宜</dv-button>
            <dv-button @click="console.log('click')" style="margin-left:10px" border="Border6" color="#e18a3b">社会优质</dv-button>
            <dv-button @click="console.log('click')" style="margin-left:10px" border="Border6" color="#e18a3b">党建优促</dv-button> -->
          </div>
        </dv-border-box1>

        <div style="width:25%;" class="padding-lr-10">
          <div class="target-header" @click="onClickPleaseWait">
            <span class="target-title">收入结构分析</span>
          </div>
          <div class="target-content target-container-h3" @click="onClickPleaseWait">

            <img height="100%" src="/img/res/glt.png" width="100%"/>
            <div style="position:relative;top:-15rem;font-size:1.2rem;color:white;text-align:center">
              区 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              农村&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              城市
            </div>
            <div style="position:relative;top:-13rem;font-size:1rem;color:white;text-align:center">
              高收入 0.84% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              高收入 0.15%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              高收入 1.45%
            </div>
            <div style="position:relative;top:-10rem;font-size:1rem;color:white;text-align:center">
              中等收入 50.5% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              中等收入 30.41%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              中等收入 67.21%
            </div>
            <div style="position:relative;top:-8rem;font-size:1rem;color:white;text-align:center">
              低收入 48.66% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              低收入 69.49%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              低收入 31.34%
            </div>
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <span class="target-title">重点监测群体</span>
            
          </div>
          <div class="target-content target-container-h3" @click="onClickPleaseWait">
            <dv-scroll-board :config="zdjcqtConfig" style="width:100%;height:24.5vh" @click="clickHandler"
                             @mouseover="mouseoverHandler"/>
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <span class="target-title" style="width:10vw">“五好”不达标村数</span>
          </div>
          <div class="target-content target-container-h3" @click="onClickPleaseWait">
            <dv-scroll-board :config="whbdbConfig" style="width:100%;height:24.5vh" @click="clickHandler"
                             @mouseover="mouseoverHandler"/>
          </div>
        </div>
      </div>
    </dv-full-screen-container>

  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import actVillage from "../component/actVillage.vue";
import antvImageMap from "../component/antvImageMap.vue";
import barAgricultureGdp from "../component/barAgricultureGdp.vue";
import barAreaGdp from "../component/barAreaGdp.vue";
import barCountyDjyc from "../component/barCountyDjyc.vue";
import barFamilyGdp from "../component/barFamilyGdp.vue";
import barPeopleGdp from "../component/barPeopleGdp.vue";
import barStreet from "../component/barStreet.vue";
import barCoutyGdp from "../component/barVillageGdp.vue";
import barVillageInsurance from "../component/barVillageInsurance.vue";
import flareTarget from "../component/flareTarget.vue";
import gaugeProgress from "../component/gaugeProgress.vue";
import lineFamily from "../component/lineFamily.vue";
import numberCounty from "../component/numberCounty.vue";
import pieCoutyGdp from "../component/pieCountyGdp.vue";
import radarCounty from "../component/radarCounty.vue";
import radarFamily from "../component/radarFamily.vue";
import radarLgsh from "../component/radarLgsh.vue";
import radarStreet from "../component/radarStreet.vue";
import radarVillage from "../component/radarVillage.vue";
import rangeVillageGdp from "../component/rangeVillageGdp.vue";
import rankingCounty from "../component/rankingCounty.vue";
import rankingFamily from "../component/rankingFamily.vue";
import rankingVillage from "../component/rankingVillage.vue";
import barHuman from "/@/components/barHuman/index.vue";
export default {
  name: "IndexDashboard",
  components: {
    barHuman,
    flareTarget,
    barCountyDjyc,
    rankingCounty,
    rankingVillage,
    rankingFamily,
    numberCounty,
    barCoutyGdp,
    barAgricultureGdp,
    barPeopleGdp,
    barStreet,
    actVillage,
    barAreaGdp,
    barFamilyGdp,
    gaugeProgress,
    antvImageMap,
    barVillageInsurance,
    pieCoutyGdp,
    rangeVillageGdp,
    radarLgsh,
    radarCounty,
    radarStreet,
    radarVillage,
    radarFamily,
    lineFamily,
  },
  setup() {
    const route = useRoute();
    console.log('路由', route.query);
    const router = useRouter();
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      curTime: dayjs().format("YYYY年MM月DD日")
    })
    const onFullScreen = () => {
      //admin/dashboard/app/fullScreen
      state.isFullScreen = !state.isFullScreen
    };
    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }
    //区情介绍
    const onClickCountDetail = () => {
      const html = `
      <div>
        <p><b>人口数：</b><el-text class="mx-1" type="success">26.67万</el-text></p>
        <p><b>区面积：</b><el-text class="mx-1" type="success">1728.98平方公里</el-text></p>
        <p><b>下辖乡镇：</b>啊喇彝族乡、布德镇、大河中路街道、大龙潭彝族乡、大田镇、福田镇、平地镇、前进镇、仁和镇、太平乡、同德镇、中坝乡、务本乡‌共计12个。‌</p>
      </div>`
      ElMessageBox.alert(html, '仁和区情介绍', {
        dangerouslyUseHTMLString: true,
      })
    }
    //指标解读
    const onClickPleaseWait = (name:string) => {
      const html = `请等待，${name}功能正在开发中...`
      ElMessageBox.alert(html, '温馨提示', {dangerouslyUseHTMLString: true,type: 'info',})
    }

    //指标解读
    const onClickTargetDetail = () => {
      const html = `
      <div>
        <p><b>经济优建：</b>地区生产总值超400亿元，人均地区生产总值超15万元，城乡居民人均可支配收入比保持在1.9左右，特色农业产值占农林牧渔业总产值比重75%，建成3个攀果创富共同体、产值达10亿元。</p>
        <p><b>民生优享：</b>三口之家家庭年收入1)-50万元的中等收入群体占比60%，村集体经济年收基本养老保险参保率95%，基本医疗参保率95%以入达到20万元以上的行政村占比达100%。上。常住人口城镇化率超63%。普惠性幼儿园覆盖率稳定在90%以上，义务教育阶段入学率达到100%，进城务工随迁子女100%就读公办学校，残疾儿童入学率97%以上。</p>
        <p><b>文明优创：</b>每万人拥有公共文化服务设施面积830平方米以上。环境优宜:城市建成区绿化覆盖率超45%，生活垃圾七解率达到95%以上，社会治安安全感满意度达到社会优质:矛盾纠纷无害化处理率100%。98%以上。</p>
        <p><b>环境优宜：</b>城市建成区绿化覆盖率超45%，生活垃圾98%以上。党</p>
        <p><b>社会优质：</b>矛盾纠纷无害化处理率100%。98%以上，社会治安安全感满意度达到98%以上。</p>
        <p><b>党建优促：</b>“三个身边”工作机制群众反映问题工单办结率达100%。</p>
      </div>`
      ElMessageBox.alert(html, '七优指标解读', {dangerouslyUseHTMLString: true, width: '80%'})
    }
    //基础设施补短情况配置 改帮扶统计 继续改重点监测群体
    const zdjcqtConfig = reactive({
      header: ['乡镇', '重点监测群体', '总数'],
      data: [
        ['仁和镇', '<span style="color:#32c5e9;">80</span>',26540],
        ['前进镇', '<span style="color:#9fe6b8;">160</span>',3852],
        ['大河中路街道', '120',45026],
        ['平地镇', '<span style="color:#ff9f7f;">90</span>',6500],
        ['大田镇', '60',3900],
        ['福田镇', '<span style="color:#e062ae;">75</span>',3600],
        ['布德镇', '<span style="color:#e7bcf3;">36</span>',6500],
      ],
      index: true,
      rowNum: 5,
      columnWidth: [40,120],
      align: ['center','center','center','center'],
    })
    //综合帮扶情况配置
    const whbdbConfig = reactive({
      header: ['乡镇', '', '不达标 / 总数'],
      data: [
        ['仁和镇', '<progress value="3" max="9">60%</progress>','<span style="color:#9fe6b8;">3 / 9</span>'],
        ['前进镇', '<progress value="1" max="5">60%</progress>', '<span style="color:#9fe6b8;">1 / 5</span>'],
        ['大河中路街道', '<progress value="6" max="12">50%</progress>','6 / 12'],
        ['平地镇', '<progress value="3" max="8">60%</progress>', '3 / 8'],
        ['大田镇', '<progress value="3" max="9">60%</progress>','3 / 9'],
        ['福田镇', '<progress value="1" max="6">60%</progress>','1 / 6'],
        ['布德镇', '<progress value="1" max="3">60%</progress>', '<span style="color:#e7bcf3;">1 / 3</span>'],
      ],
      index: true,
      rowNum: 5,
      headerBGC: '#00AA77',
      oddRowBGC: '#002B31',
      evenRowBGC: '#071722',
      columnWidth: [40,120,180,120],
      align: ['center','right','left','center','center'],
    })

    // 页面加载时
    onMounted(() => {
    });
    return {
      onFullScreen,
      onGoToLink,
      onClickCountDetail,
      onClickTargetDetail,
      onClickPleaseWait,
      zdjcqtConfig,
      whbdbConfig,
      ...toRefs(state),
    };
  },
};
</script>


<style lang="less">
#app {
  .el-aside, .el-header, .layout-navbars-tagsview {
    display: none;
  }
}
progress{
  width:100%;
  background-color:rgb(240, 217, 12,0.5);

}
progress::-webkit-progress-bar

{

background-color:rgba(12, 240, 31, 1);

}

progress::-webkit-progress-value

{

  background-color:rgb(240, 217, 12,0.5);

}

#data-view {
  width: 100%;
  height: 100%;
  color: #000;
  background-image: url("/img/res/bg.png");

  #dv-full-screen-container {
    background-image: url("/img/res/bg.png");
    background-size: 100% 100%;
  }

}

</style>
