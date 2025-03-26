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
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="onGoToLink(`/admin/dashboard/home/detail`)" border="Border4" color="#409EFF">六优指标</dv-button>
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="onClickCountDetail" border="Border4" color="#409EFF">区情介绍</dv-button>
        </div>
      </div>

      <!-- <div style="position:absolute;top:10px;right:10px">
        <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
      </div> -->
      <div class="main-rows">
        <div style="width:25%;" class="padding-lr-12">
          <div class="target-header" @click="onClickPleaseWait">
            <div class="target-title">乡进入情况</div>
          </div>
          <div @click="onClickPleaseWait">
            <rankingCounty/>
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <div class="target-title">村实现情况</div>
          </div>
          <div @click="onClickPleaseWait">
            <rankingVillage/>
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <div class="target-title">户达标情况</div>
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
            <div class="target-title">收入结构分析</div>
          </div>
          <div class="target-content target-container-h3" @click="onClickPleaseWait">

            <img height="100%" src="/img/res/glt.png" width="100%"/>
            <div style="position:relative;top:-15rem;font-size:1.2rem;color:white">
              区 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              农村&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              城市
            </div>
            <div style="position:relative;top:-13rem;font-size:1rem;color:white">
              高收入 1.5% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              高收入 0.5%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              高收入 3.5%
            </div>
            <div style="position:relative;top:-10rem;font-size:1rem;color:white">
              中等收入 80% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              中等收入 85%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              中等收入 88%
            </div>
            <div style="position:relative;top:-8rem;font-size:1rem;color:white">
              低收入 19.5% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              低收入 20%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              低收入 8.5%
            </div>
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <div class="target-title">帮扶户数统计</div>
          </div>
          <div class="target-content target-container-h3" @click="onClickPleaseWait">
            <dv-scroll-board :config="bfhsConfig" style="width:100%;height:22vh" @click="clickHandler"
                             @mouseover="mouseoverHandler"/>
           
          </div>
          <div class="target-header margin-top" @click="onClickPleaseWait">
            <div class="target-title" style="width:10vw">“五好”不达标户数</div>
          </div>
          <div class="target-content target-container-h3" @click="onClickPleaseWait">
            <dv-scroll-board :config="whbdbConfig" style="width:100%;height:22vh" @click="clickHandler"
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
      ElMessageBox.alert(html, '六优指标解读', {dangerouslyUseHTMLString: true, width: '80%'})
    }
    //基础设施补短情况配置 改帮扶统计
    const bfhsConfig = reactive({
      header: ['乡镇', '帮扶户数'],
      data: [
        ['仁和镇', '<span style="color:#32c5e9;">80</span>'],
        ['前进镇', '<span style="color:#9fe6b8;">160</span>'],
        ['大河中路街道', '120'],
        ['平地镇', '<span style="color:#ff9f7f;">90</span>'],
        ['大田镇', '60'],
        ['福田镇', '<span style="color:#e062ae;">75</span>'],
        ['福田镇', '<span style="color:#e690d1;">60</span>'],
        ['布德镇', '<span style="color:#e7bcf3;">36</span>'],
      ],
      index: true,
      rowNum: 5,
      columnWidth: [50],
      align: ['center'],
    })
    //综合帮扶情况配置
    const whbdbConfig = reactive({
      header: ['乡镇', '不达标户数'],
      data: [
        ['仁和镇', '<span style="color:#32c5e9;">186</span>'],
        ['前进镇', '<span style="color:#9fe6b8;">60</span>'],
        ['大河中路街道', '180'],
        ['平地镇', '<span style="color:#ff9f7f;">40</span>'],
        ['大田镇', '90'],
        ['福田镇', '<span style="color:#e062ae;">65</span>'],
        ['福田镇', '<span style="color:#e690d1;">60</span>'],
        ['布德镇', '<span style="color:#e7bcf3;">46</span>'],
      ],
      index: true,
      rowNum: 5,
      headerBGC: '#00AA77',
      oddRowBGC: '#002B31',
      evenRowBGC: '#071722',
      columnWidth: [50],
      align: ['center'],
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
      bfhsConfig,
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
