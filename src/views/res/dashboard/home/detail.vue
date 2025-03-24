<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:10px;" click="onGoToLink(`/admin/dashboard/home/index`)">区建成
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
          <dv-button style="display:inline-block;margin-right:10px;" fontSize="12" @click="onGoToLink(`/admin/dashboard/home/index`)" border="Border4" color="#409EFF">返回</dv-button>
        </div>
      </div>
      
      <!-- <div style="position:absolute;top:10px;right:10px">
        <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
      </div> -->
      <div class="main-rows">
          <div style="width:33%;padding-left:10px;">
            <div class="target-header">
              <div class="target-title" @click="onClickTargetDetail('经济优建')">经济优建</div>
            </div>
            <div class="target-content target-container-h2 target-text">
                <el-row class="margin-top-xl padding-top-xl">
                  <el-col :span="12">
                    <el-row :gutter="20">
                      <el-col :span="8" class="text-right">
                        <i class="fa fa-cubes" aria-hidden="true" style="font-size: 3rem; color: orange;" />
                      </el-col>
                      <el-col :span="16" class="text-left">
                        <div>地区生产总值</div>
                        <div><b class="target-value" style="color:orange">411</b> 亿元</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row :gutter="20">
                      <el-col :span="8" class="text-right">
                        <i class="fa fa-users" aria-hidden="true" style="font-size: 3rem; color: orange;" />
                      </el-col>
                      <el-col :span="16" class="text-left">
                        <div>人均地区生产总值</div>
                        <div><b class="target-value" style="color:orange">15.39</b> 万元</div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="margin-top-xl">
                  <el-col :span="12">
                    <el-row :gutter="20">
                      <el-col :span="8" class="text-right">
                        <i class="fa fa-codiepie mt10" aria-hidden="true" style="font-size: 3rem; color: orange;" />
                      </el-col>
                      <el-col :span="16" class="text-left">
                        <div>城乡居民人均<br/>可支配收入占比</div>
                        <div><b class="target-value" style="color:orange">1.9</b></div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row :gutter="20">
                      <el-col :span="8" class="text-right">
                        <i class="fa fa-pied-piper-alt mt10" aria-hidden="true" style="font-size: 3rem; color: orange;" />
                      </el-col>
                      <el-col :span="16" class="text-left">
                        <div>特色农业产值占农林牧渔业总产值比重</div>
                        <div><b class="target-value" style="color:orange">75</b>%</div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="margin-top-xl">
                  <el-col :span="12">
                    <el-row :gutter="20">
                      <el-col :span="8" class="text-right">
                        <i class="fa fa-codepen mt10" aria-hidden="true" style="font-size: 3rem; color: orange;" />
                      </el-col>
                      <el-col :span="16" class="text-left">
                        <div>攀果创富共同体</div>
                        <div><b class="target-value" style="color:orange">3</b>个</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row :gutter="20">
                      <el-col :span="8" class="text-right">
                        <i class="fa fa-money mt10" aria-hidden="true" style="font-size: 3rem; color: orange;" />
                      </el-col>
                      <el-col :span="16" class="text-left">
                        <div>攀果创富共同体产值</div>
                        <div><b class="target-value" style="color:orange">10</b>亿</div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            <div class="target-header margin-top-sm">
              <div class="target-title" @click="onClickTargetDetail('环境优宜')">环境优宜</div>
            </div>
            <div class="target-content target-container-h2">
              <el-row class="mt20">
                  <el-col :span="12">
                    <dv-water-level-pond class="m10" :config="{data: [75,88],shape: 'round',waveOpacity:0.6,waveHeight:10,}" style="width:200px;height:200px"/>
                    <div>城市建成区绿化覆盖率</div>
                  </el-col>
                  <el-col :span="12">
                    <dv-water-level-pond class="m10" :config="{data: [86,95],shape: 'round',waveOpacity:0.6,waveHeight:10,colors:['#E6A23C','#E6A23C']}" style="width:200px;height:200px"/>
                    <div>生活垃圾无害化处理率</div>
                  </el-col>
                </el-row>
            </div>
          </div>
          <div style="width:34%;padding:0 10px;">
            <div class="target-header">
              <div class="target-title" @click="onClickTargetDetail('民生优享')">民生优享</div>
            </div>
            <div class="target-content target-container-h2">
              
              <!-- <dv-capsule-chart :config="msyxConfig" style="width:100%;height:100%" /> -->
              <el-row>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress1" id="gaugeProgress1" text="中等收入群体占比" />
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="年收入达20万村占比"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="社会养老保险综合参保率"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="全民基本医疗参保率"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="基本养老保险综合参保率"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="常住人口城镇化率"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="学前教育三年毛入园率"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="公办幼儿园占比"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="学前教育三年毛入园率"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="义务教育阶段入学率"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="义务教育巩固率"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress containerId="gaugeProgress2" id="gaugeProgress2" text="残疾儿童入学率"/>
                  </el-col>
                </el-row>
            </div>
            <div class="target-header margin-top-sm">
              <div class="target-title" @click="onClickTargetDetail('社会优质')">社会优质</div>
            </div>
            <div class="target-content target-container-h2">
              <dv-capsule-chart :config="shyzConfig" style="width:100%;height:90%" />
              <div>社会治安满意度</div>
            </div>
          </div>
          
          <div style="width:33%;padding-right:10px;">
            <div class="target-header">
              <div class="target-title" @click="onClickTargetDetail('文明优创')">文明优创</div>
            </div>
            <div class="target-content target-container-h2">
              <el-row class="mt50">
                  <el-col :span="8" class="text-right">
                    <i class="fa fa-building m10" aria-hidden="true" style="font-size: 80px; color: orange;" />
                  </el-col>
                  <el-col :span="16" class="text-left ">
                    <div style="font-size:24px">公共文化服务设施面积</div>
                    <div class="m20" style="font-size:20px">每万人<b class="target-value m10" style="color:orange;font-size:3rem">2200</b>平米</div>
                  </el-col>
                </el-row>
            </div>
            <div class="target-header margin-top-sm">
              <div class="target-title" @click="onClickTargetDetail('党建优促')">党建优促</div>
            </div>
            <div class="target-content target-container-h2">
                <barCountyDjyc/>
            </div>
          </div>
        </div>
    </dv-full-screen-container>
    
</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import actVillage from "../component/actVillage.vue";
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
    barVillageInsurance,
    pieCoutyGdp,
    rangeVillageGdp,
    radarLgsh,
    radarCounty,
    radarStreet,
    radarVillage,
    radarFamily,
    lineFamily,
    gaugeProgress,
  },
  setup() {
    const route = useRoute();
		console.log('路由', route.query);
    const router =  useRouter();
    const mapContainer = ref();
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      baseUrl: import.meta.env.VITE_API_URL,
      imgUrl: import.meta.env.VITE_URL,
      curTime: dayjs().format("YYYY年MM月DD日"),
      msyxConfig : {
        data: [
          {
            name: '中等收入群体',
            value: 60
          },
          {
            name: '村集体经济达标村占比',
            value: 100
          },
          {
            name: '社会养老保险综合参保率',
            value: 95
          },
          {
            name: '全民基本医疗参保率',
            value: 95
          },
          {
            name: '基本养老保险综合参保率',
            value: 95
          },
          {
            name: '常住人口城镇化率',
            value: 63.6
          },
          {
            name: '学前教育三年毛入园率',
            value: 99
          },{
            name: '普惠性幼儿园覆盖率稳',
            value: 90
          },{
            name: '公办幼儿园占比',
            value: 60
          },{
            name: '义务教育阶段入学率',
            value: 100
          },{
            name: '进城务工随迁子女率',
            value: 100
          },{
            name: '残疾儿童入学率',
            value: 97
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '%',
        showValue:true,
        labelNum: 5,
      },
      shyzConfig : {
        data: [
          {
            name: '2024',
            value: 92
          },
          {
            name: '2025',
            value: 93
          },
          {
            name: '2026',
            value: 95
          },
          {
            name: '2030',
            value: 98
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '%',
        showValue:true,
        fontSize:16,
        labelNum: 6,
      }
    })
    const onFullScreen = () => {
			//admin/dashboard/app/fullScreen
      state.isFullScreen=!state.isFullScreen
		};
    //导航链接
    const onGoToLink = (url:string) => {
      router.push(url)
    }
    //指标解读
    const onClickTargetDetail= (title:string) => {
      let content=""
      switch(title){
        case '经济优建': {
          content='地区生产总值超<b>400</b>亿元，人均地区生产总值超<b>15</b>万元，城乡居民人均可支配收入比保持在<b>1.9</b>左右，特色农业产值占农林牧渔业总产值比重75%，建成<b>3</b>个攀果创富共同体、产值达<b>10</b>亿元。'
          break;
        }
        case '民生优享': {
          content='三口之家家庭年收入<b>50</b>万元的中等收入群体占比<b>60%</b>，村集体经济年收基本养老保险参保率<b>95%</b>，基本医疗参保率<b>95%</b>以入达到<b>20</b>万元以上的行政村占比达<b>100%</b>。上。常住人口城镇化率超<b>63%</b>。普惠性幼儿园覆盖率稳定在<b>90%</b>以上，义务教育阶段入学率达到<b>100%</b>，进城务工随迁子女<b>100%</b>就读公办学校，残疾儿童入学率<b>97%</b>以上。'
          break;
        }
        case '文明优创': {
          content='每万人拥有公共文化服务设施面积<b>830</b>平方米以上。环境优宜:城市建成区绿化覆盖率超<b>45%</b>，生活垃圾七解率达到<b>95%</b>以上，社会治安安全感满意度达到社会优质:矛盾纠纷无害化处理率<b>100%</b>。<b>98%</b>以上。'
          break;
        }
        case '环境优宜': {
          content='城市建成区绿化覆盖率达<b>44.8%</b>，生活垃圾无害化处理率<b>100%</b>。'
          break;
        }
        case '社会优质': {
          content='矛盾纠纷无害化处理率<b>100%</b>。<b>98%</b>以上，社会治安安全感满意度达到<b>98%</b>以上。'
          break;
        }
        case '党建优促': {
          content='“三个身边”工作机制群众反映问题工单办结率达100%。'
          break;
        }
      }
      // const html=`
      // <div>
      //   <p><b>经济优建：</b>地区生产总值超400亿元，人均地区生产总值超15万元，城乡居民人均可支配收入比保持在1.9左右，特色农业产值占农林牧渔业总产值比重75%，建成3个攀果创富共同体、产值达10亿元。</p>
      //   <p><b>民生优享：</b>三口之家家庭年收入1)-50万元的中等收入群体占比60%，村集体经济年收基本养老保险参保率95%，基本医疗参保率95%以入达到20万元以上的行政村占比达100%。上。常住人口城镇化率超63%。普惠性幼儿园覆盖率稳定在90%以上，义务教育阶段入学率达到100%，进城务工随迁子女100%就读公办学校，残疾儿童入学率97%以上。</p>
      //   <p><b>文明优创：</b>每万人拥有公共文化服务设施面积830平方米以上。环境优宜:城市建成区绿化覆盖率超45%，生活垃圾七解率达到95%以上，社会治安安全感满意度达到社会优质:矛盾纠纷无害化处理率100%。98%以上。</p>
      //   <p><b>环境优宜：</b>城市建成区绿化覆盖率达44.8%，生活垃圾无害化处理率100%。</p>
      //   <p><b>社会优质：</b>矛盾纠纷无害化处理率100%。98%以上，社会治安安全感满意度达到98%以上。</p>
      //   <p><b>党建优促：</b>“三个身边”工作机制群众反映问题工单办结率达100%。</p>
      // </div>`
      ElMessageBox.alert(content, title, { dangerouslyUseHTMLString: true,  width:'80%'})
    }
    
    
    // 页面加载时
    onMounted(() => {
      
    });
    return {
      onFullScreen,
      onGoToLink,
      onClickTargetDetail,
        ...toRefs(state),
    };
  },
};
</script>


<style lang="less">
#app{
 .el-aside,.el-header,.layout-navbars-tagsview{
  display: none;
 }
}

#data-view{
  background-image: url("/img/res/bg.png");
}

#data-view {
  width: 100%;
  height: 100%;
  color: #000;


  #dv-full-screen-container {
    background-image: url("/img/res/bg.png");
    background-size: 100% 100%;
  }

}

</style>
