<template>
  <div id="data-view" dv-bg>
    <dv-full-screen-container>
      <div class="banner">
        <div class="banner-content">
          <dv-button border="Border4" color="#409EFF" fontSize="12"
                     style="display:inline-block;margin-left:1rem;" @click="onGoToLink(`/admin/dashboard/home/index`)">区迈入
          </dv-button>
          <dv-button border="Border4" color="#615ea8" fontSize="12" style="display:inline-block;margin-left:1rem;">
            乡推进
          </dv-button>
          <dv-button key="" border="Border4" color="#615ea8" fontSize="12"
                     style="display:inline-block;margin-left:1rem">村共创
          </dv-button>
          <dv-button border="Border4" color="#615ea8" fontSize="12" style="display:inline-block;margin-left:1rem">
            户夯实
          </dv-button>
        </div>
        <div class="banner-content" style="text-align: right;float:right;">

          <p style="display:inline-block;color:white;margin-left:1rem;margin-right:30px;font-size:14pt"><b>{{ curTime }}</b></p>
          <dv-button style="display:inline-block;margin-right:1rem;" fontSize="12" @click="onGoToLink(`/admin/dashboard/home/index`)" border="Border4" color="#409EFF">返回</dv-button>
        </div>
      </div>
      
      <!-- <div style="position:absolute;top:1rem;right:1rem">
        <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:1rem;z-index:99999999;">{{isFullScreen?'退出全屏':'全屏'}}</dv-button>
      </div> -->
      <div class="main-rows">
          <div style="width:25%;padding-left:1rem;">
            <div class="target-header">
              <span class="target-title" @click="onClickTargetDetail('经济优建')">经济优建</span>
            </div>
            <div class="target-content target-text">
                <el-row class="" :gutter="6">
                  <el-col :span="24">
                    <barAreaGdp></barAreaGdp>
                  </el-col>
                  <el-col :span="24">
                    <barPeopleGdp></barPeopleGdp>
                  </el-col>
                  <el-col :span="24">
                    <barResearchFee></barResearchFee>
                  </el-col>
                  <el-col :span="24">
                    <barCityRate></barCityRate>
                  </el-col>
                  <!-- <el-col :span="12">
                    <barFamilyGdp></barFamilyGdp>
                  </el-col> -->
                  <!-- <el-col :span="12">
                    <barTownGdp></barTownGdp>
                  </el-col>
                  <el-col :span="24">
                    <barAgricultureGdp></barAgricultureGdp>
                  </el-col> -->
                </el-row>
                
              
            <!-- <div class="target-header margin-top-sm">
              <span class="target-title" @click="onClickTargetDetail('环境优宜')">环境优宜</span>
            </div>
            <div class="target-content target-container-h2 padding-xl">
              <el-row class="margin-xl padding-top-xl text-center" :gutter="10">
                  <el-col :span="12" class="text-center">
                    <div class="text-center margin-left-xl padding-left-lg">
                      <dv-water-level-pond class="margin-xl" :config="{data: [44.80],shape: 'round',waveOpacity:0.6,waveHeight:10,}" style="width:10rem;height:10rem"/>
                    </div>
                    
                    <div class="text-center" style="font-size:1.2rem">城市建成区绿化覆盖率</div>
                  </el-col>
                  <el-col :span="12" class="text-center">
                    <div class="text-center margin-left-xl padding-left-lg">
                      <dv-water-level-pond class="margin-xl" :config="{data: [86],shape: 'round',waveOpacity:0.6,waveHeight:10,colors:['#E6A23C','#E6A23C']}" style="width:10rem;height:10rem"/>
                    </div>
                    <div class="text-center" style="font-size:1.2rem">生活垃圾无害化处理率</div>
                  </el-col>
                </el-row>
            </div> -->
          </div>
          <div class="target-header margin-top-sm">
              <span class="target-title" @click="onClickTargetDetail('社会优和')">社会优和</span>
            </div>
            <div class="target-content">
              <barCountyShyh/>
            </div>
          </div>
          <div style="width:50%;padding:0 1rem;">
            <div class="target-header">
              <span class="target-title" @click="onClickTargetDetail('民生优享')">民生优享</span>
            </div>
            <div class="target-content">
              <el-row class="" :gutter="6">
                  <el-col :span="8" class="padding-bottom-sm">
                    <barFamilyGdp></barFamilyGdp>
                  </el-col>
                  <!-- <el-col :span="8" class="padding-bottom-sm">
                    <barTownGdp></barTownGdp>
                  </el-col> -->
                  <el-col :span="8" class="padding-bottom-sm">
                    <lineAntvChart :style="'height:16.7vh;'" type="line" color="yellow" title="人均公共服务支出(万元)" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:'2023',值:0.43},{年份:'2024',值:0.42},{年份:'2030',值:0.45}]"></lineAntvChart>
                  </el-col>
                  
                  <el-col :span="8" class="padding-bottom-sm">
                    <lineAntvChart :style="'height:16.7vh;'" color="orange" title="城乡居民人均可支配收入倍差" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:'2023',值:1.91},{年份:'2024',值:1.88},{年份:'2030',值:1.77}]"></lineAntvChart>
                  </el-col>
                  <el-col :span="6" class="padding-bottom-sm">
                    <gaugeProgress :style="'height:16.7vh;'"  :value="0.65" :colorValueData="[[0.50, '#FDDD60'],  [0.75, '#58D9F9'], [1, '#7CFFB2']]" :colorTickData="[{name: '2023 50%', value: 0.375},{name: '2024 65%', value: 0.625}, {name: '2030 100%', value: 0.875}]"   text="宜居宜业和美乡村占比" :detailFontSize="18" :titleFontSize="14" />
                  </el-col>
                  <el-col :span="6" class="padding-bottom-sm">
                    <gaugeProgress :style="'height:16.7vh;'" :value="0.4"   text="年收入达20万村占比" :detailFontSize="18" :titleFontSize="14"/>
                  </el-col>
                   <el-col :span="6" class="padding-bottom-sm">
                    <gaugeProgress :style="'height:16.7vh;'" :value="0.9165"  text="普惠性幼⼉园覆盖率" :detailFontSize="18" :titleFontSize="14"/>
                  </el-col>
                  <el-col :span="6" class="padding-bottom-sm">
                    <gaugeProgress :style="'height:16.7vh;'" :value="1"  text="义务教育阶段⼊学率" :detailFontSize="18" :titleFontSize="14"/>
                  </el-col>
                  <el-col :span="8" class="padding-bottom-sm" style="margin-top:-3rem">
                    <barAntvChart :style="'height:16.7vh;'" color="l(270) 0:rgb(235.9, 245.3, 255,1) 0.4:rgb(159.5, 206.5, 255) 0.8:#409EFF" title="城镇新增就业人口(万人)" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:'2023',值:0.33},{年份:'2024',值:0.33},{年份:'2030',值:0.37}]"></barAntvChart>
                    <!-- <barAgricultureGdp></barAgricultureGdp> -->
                  </el-col>
                  <el-col :span="8" class="padding-bottom-sm" style="margin-top:-3rem">
                    <barAntvChart :style="'height:16.7vh;'" color="l(270) 0:rgb(239.8, 248.9, 235.3) 0.4:rgb(179, 224.5, 156.5) 0.8:#67C23A" title="每千人拥有执业(助理)医师数(人)" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:2023,值:2.53},{年份:2024,值:2.56},{年份:2030,值:2.59}]"></barAntvChart>
                  </el-col>
                  <el-col :span="8" class="padding-bottom-sm" style="margin-top:-3rem">
                    <barAntvChart :style="'height:16.7vh;'" color="l(270) 0:rgb(252.5, 245.7, 235.5) 0.4:rgb(242.5, 208.5, 157.5) 0.8:#E6A23C" title="城乡护理型床位比值(%)" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:2023,值:109},{年份:2024,值:107},{年份:2030,值:105}]"></barAntvChart>
                  </el-col>

                  <el-col :span="6" >
                    <gaugeProgress :style="'height:16.7vh;'" :value="1" :text="'进城务工随迁⼦⼥公办学校就读率'" :detailFontSize="18" :titleFontSize="11"/>
                  </el-col>
                  <el-col :span="6" >
                    <gaugeProgress :style="'height:16.7vh;'" :value="0.945" :colorTickData="[{name: '2024 94%', value: 0.75}, {name: '2025 94.5%', value: 0.90}, {name: '2030 96%', value: 0.875}]" text="基本养老保险综合参保率" :detailFontSize="18" :titleFontSize="14"/>
                  </el-col>
                  <el-col :span="6" >
                    <gaugeProgress :style="'height:16.7vh;'" :value="0.8649"  text="基本医疗保险综合参保率" :detailFontSize="18" :titleFontSize="14"/>
                  </el-col>
                  <el-col :span="6">
                    <gaugeProgress :style="'height:16.7vh;'" :value="0.29" :colorTickData="[{name: '2023 28.5%', value: 0.125}, {name: '2024 29%', value: 0.375}, {name: '2030 30.5%', value: 0.625}]" :colorValueData="[[0.125, '#FDDD60'],  [0.25, '#58D9F9'], [1, '#7CFFB2']]" text="城镇常住人口住房保障率" :detailFontSize="18" :titleFontSize="14"/>
                  </el-col>    

                  
                  <el-col :span="8"  style="margin-top:-3rem" :style="'height:15vh;'"class="padding-bottom-sm">
                    <barAntvChart  :style="'height:16.7vh;'" color="l(0) 0:rgb(254, 240.3, 240.3) 0.4:rgb(250, 181.5, 181.5) 0.8:#F56C6C" title="每千人口拥有3岁以下婴幼儿托位数" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:2023,值:3.5},{年份:2024,值:3.6},{年份:2030,值:4.2}]"></barAntvChart>
                  </el-col>
                  <el-col :span="8"  style="margin-top:-3rem" class="padding-bottom-sm">
                    <barAntvChart :style="'height:16.7vh;'" color="l(0) 0:rgb(197.7, 225.9, 255) 0.4:#409EFF 0.8:rgb(51.2, 126.4, 204)" title="居民人均预期寿命" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:2023,值:79.3},{年份:2024,值:79.7},{年份:2030,值:80.9}]"></barAntvChart>
                  </el-col>
                  <el-col :span="8"  style="margin-top:-3rem" class="padding-bottom-sm">
                    <barAntvChart :style="'height:16.7vh;'" color="l(0) 0:rgb(242.5, 208.5, 157.5) 0.4:#E6A23C 0.8:rgb(184, 129.6, 48)" title="中等收入群体占比(%)" encodeX="年份" encodeY="值" encodeV="值" :data="[{年份:2023,值:47.02},{年份:2024,值:50.5},{年份:2030,值:69.5}]"></barAntvChart>
                    <!-- <gaugeProgress :style="'height:16.7vh;'"  :value="0.505" :colorValueData="[[0.375, '#FDDD60'],  [0.50, '#58D9F9'], [1, '#7CFFB2']]" :colorTickData="[{name: '2023 47.02%', value: 0.25},{name: '2024 50.5%', value: 0.50}, {name: '2030 69.5%', value: 0.875}]"  text="中等收入群体占比" :detailFontSize="18" :titleFontSize="14" /> -->
                  </el-col>
                  
                              
                </el-row>
            </div>
            
          </div>
          
          <div style="width:25%;padding-right:1rem;">
            <div class="target-header">
              <span class="target-title" @click="onClickTargetDetail('文明优创')">文明优创</span>
            </div>
            <div class="target-content">
              <el-row class="margin-bottom-sm margin-top-xl">
                <el-col :span="8" class="text-right">
                  <i class="fa fa-building margin-right" aria-hidden="true" style="font-size: 4rem; color: orange;" />
                </el-col>
                <el-col :span="16" class="text-left ">
                  <div style="font-size:1rem">公共文化服务设施面积</div>
                  <div class="margin-tb" style="font-size:1.2rem">每万人<b class="target-value margin-lr-xs" style="color:orange;font-size:1.5rem">735.24</b>
                    <i
                        class="fa fa-arrow-down margin-lr-sm"
                        style="font-size: 0.8rem; color: orange;"/>830&nbsp;平米</div>
                </el-col>
              </el-row>
              <el-row class="margin-tb-sm">
                <el-col :span="8" class="text-right">
                  <i class="fa fa-pie-chart margin-right" aria-hidden="true" style="font-size: 4rem; color: orange;" />
                </el-col>
                <el-col :span="16" class="text-left ">
                  <div style="font-size:1rem">居民教育文化娱乐支出占生活消费支出比</div>
                  <div class="margin-tb" style="font-size:1.2rem">2024<b class="target-value margin-lr-sm" style="color:orange;font-size:1.5rem">10.5%</b>
                    <i
                        class="fa fa-arrow-down margin-lr-sm"
                        style="font-size: 1rem; color: orange;"/>11.5%</div>
                </el-col>
              </el-row>
              <el-row class="margin-tb-sm">
                <el-col :span="12" class="text-center">
                  <div class="text-center">
                    <dv-water-level-pond :config="{data: [93.71],shape: 'round',waveOpacity:0.6,waveHeight:5,colors:['orange','orange']}" style="margin-left:auto;margin-right:auto;width:8rem;height:8rem"/>
                  </div>
                  
                  <div class="text-center margin-tb" style="font-size:0.9rem">城市文明建设城乡居民参与度</div>
                </el-col>
                <el-col :span="12" class="text-center">
                  <div class="text-center">
                    <dv-water-level-pond :config="{data: [95.06],shape: 'round',waveOpacity:0.6,waveHeight:5,colors:['yellow','yellow']}" style="margin-left:auto;margin-right:auto;width:8rem;height:8rem"/>
                  </div>
                  <div class="text-center margin-tb" style="font-size:0.9rem">人民群众对文明实践工作的满意度</div>
                </el-col>
              </el-row>
            </div>
            <div class="target-header margin-top-sm">
              <span class="target-title" @click="onClickTargetDetail('环境优宜')">环境优宜</span>
            </div>
            <div class="target-content">
              <el-row class="text-center margin-xl" :gutter="10">
                  <el-col :span="8" class="text-center">
                    <div class="text-center">
                      <dv-water-level-pond :config="{data: [44.80],shape: 'round',waveOpacity:0.6,waveHeight:10,}" style="margin-left:auto;margin-right:auto;width:8rem;height:8rem"/>
                    </div>
                    
                    <div class="text-center margin-top" style="font-size:1.1rem">城市建成区绿化覆盖率</div>
                  </el-col>
                  <el-col :span="8" class="text-center">
                    <div class="text-center">
                      <dv-water-level-pond :config="{data: [100],shape: 'round',waveOpacity:0.6,waveHeight:10,colors:['#E6A23C','#E6A23C']}" style="margin-left:auto;margin-right:auto;width:8rem;height:8rem"/>
                    </div>
                    <div class="text-center margin-top" style="font-size:1.1rem">生活垃圾无害化处理率</div>
                  </el-col>
                  <!-- <el-col :span="6" class="text-center">
                    <div class="text-center">
                      <dv-water-level-pond :config="{data: [96.4],shape: 'round',waveOpacity:0.6,waveHeight:10,colors:['green','green']}" style="margin-left:2rem;width:8rem;height:8rem"/>
                    </div>
                    <div class="text-center margin-top margin-left-xl" style="font-size:1.1rem">空⽓质量优良天数⽐率</div>
                  </el-col> -->
                  <el-col :span="8" class="text-center">
                    <div class="text-center">
                      <dv-water-level-pond :config="{data: [100],shape: 'round',waveOpacity:0.6,waveHeight:10,colors:['lightgreen','lightgreen']}" style="margin-left:auto;margin-right:auto;width:8rem;height:8rem"/>
                    </div>
                    <div class="text-center margin-top" style="font-size:1.1rem">地表水达到或优于‖类比例</div>
                  </el-col>
                </el-row>
            </div>
            
            <div class="target-header margin-top-sm">
              <span class="target-title" @click="onClickTargetDetail('党建优促')">党建优促</span>
            </div>
            <div class="target-content">
              <dv-capsule-chart :config="djycConfig" style="width:100%;height:17.8vh" />
              <div class="margin-bottom">“三个身边”群众工作机制反映问题工单办结率</div>
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
import areaAntvChart from "../component/areaAntvChart.vue";
import barAgricultureGdp from "../component/barAgricultureGdp.vue";
import barAntvChart from "../component/barAntvChart.vue";
import barAreaGdp from "../component/barAreaGdp.vue";
import barCityRate from "../component/barCityRate.vue";
import barCountyShyh from "../component/barCountyShyh.vue";
import barFamilyGdp from "../component/barFamilyGdp.vue";
import barPeopleGdp from "../component/barPeopleGdp.vue";
import barPeopleRate from "../component/barPeopleRate.vue";
import barResearchFee from "../component/barResearchFee.vue";
import barStreet from "../component/barStreet.vue";
import barTownGdp from "../component/barTownGdp.vue";
import barCoutyGdp from "../component/barVillageGdp.vue";
import barVillageInsurance from "../component/barVillageInsurance.vue";
import flareTarget from "../component/flareTarget.vue";
import gaugeProgress from "../component/gaugeProgress.vue";
import lineAntvChart from "../component/lineAntvChart.vue";
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
    barPeopleRate,
    barCountyShyh,
    rankingCounty,
    rankingVillage,
    rankingFamily,
    numberCounty,
    barCoutyGdp,
    barAntvChart,
    lineAntvChart,
    areaAntvChart,
    barAgricultureGdp,
    barPeopleGdp,
    barCityRate,
    barResearchFee,
    barStreet,
    actVillage,
    barAreaGdp,
    barFamilyGdp,
    barTownGdp,
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
      djycConfig : {
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
            value: 100
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
          content='每万人拥有公共文化服务设施面积<b>830</b>平方米以上。环境优宜:城市建成区绿化覆盖率超<b>45%</b>，生活垃圾七解率达到<b>95%</b>以上，社会治安安全感满意度达到社会优和:矛盾纠纷无害化处理率<b>100%</b>。<b>98%</b>以上。'
          break;
        }
        case '环境优宜': {
          content='城市建成区绿化覆盖率达<b>44.8%</b>，生活垃圾无害化处理率<b>100%</b>。'
          break;
        }
        case '社会优和': {
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
      //   <p><b>文明优创：</b>每万人拥有公共文化服务设施面积830平方米以上。环境优宜:城市建成区绿化覆盖率超45%，生活垃圾七解率达到95%以上，社会治安安全感满意度达到社会优和:矛盾纠纷无害化处理率100%。98%以上。</p>
      //   <p><b>环境优宜：</b>城市建成区绿化覆盖率达44.8%，生活垃圾无害化处理率100%。</p>
      //   <p><b>社会优和：</b>矛盾纠纷无害化处理率100%。98%以上，社会治安安全感满意度达到98%以上。</p>
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
