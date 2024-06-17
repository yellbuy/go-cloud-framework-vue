<template>
  <div id="map-board">
    <div style="width:100%;" >
      <div style="position: absolute;left:-20px;top:-20px;">
        <dv-active-ring-chart :config="conicalConfig" style="width:18rem;height:18rem;"/>
        <!-- <dv-conical-column-chart :config="conicalConfig" style="width:33rem;height:12rem;" /> -->
      </div> 
    <!-- <div style="position: absolute;left:30px;top:30px;">
      <dv-capsule-chart style="width:25rem;height:12rem"  :config="capsuleConfig"  />
    </div> -->
    <dv-flyline-chart :config="mapConfig" :dev="true" style="width:100%;height:42vh;" />
    </div>


    <!-- <dv-scroll-board :config="{header: ['通告内容','通知时间'],data:[['关于XXXX下达加强安全管理的通知1','2023-03-15'],['关于XXXX下达加强安全管理的通知2','2023-03-14'],['关于XXXX下达加强安全管理的通知3','2023-03-13'],['关于XXXX下达加强安全管理的通知4','2023-03-12'],['关于XXXX下达加强安全管理的通知5','2023-03-11'],['关于XXXX下达加强安全管理的通知6','2023-03-10']],columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:200px;margin-top:16px" /> -->
    <div>

    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import mapImg from "/@/assets/img/map_sichuan.png";
export default {
	name: 'RankingWaybillCompanyBoard',
	components: {  },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
      conicalConfig:{
        lineWidth: 40,
        showOriginValue:false,
        digitalFlopStyle: {
          fontSize: 16,
          fill: 'pink',
        },
        data:[],
        columnColor:'rgba(204, 102, 153, 0.6)',
        color: ['#E6A23C','#F56C6C','#67C23A','#e062ae', '#e690d1', '#32c5e9', '#fb7293'],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '万吨',
        //digitalFlopUnit:'万吨',
        sort:false,
        showValue:true,
        fontSize:10,
        numToFixed:2,
        labelNum: 8,
      },
      capsuleConfig:{
        data:[],
        colors: ['#E6A23C','#F56C6C','#67C23A','#e062ae', '#e690d1', '#32c5e9', '#fb7293'],
        unit: '万吨',
        showValue:true,
        fontSize:16,
        labelNum: 8,
      },
      
      mapConfig:{
          bgImgUrl:mapImg,
          k: 0.5,
          centerPoint: [0.31, 0.78],
          points: [
          {
            position: [0.31, 0.78],
            text: '攀枝花',
          },{
            position: [0.42, 0.58],
            text: '西昌',
          },{
            position: [0.38, 0.68],
            text: '永郎',
          },{
            position: [0.36, 0.72],
            text: '米易',
          },{
            position: [0.59, 0.31],
            text: '青白江',
          },{
            position: [0.6, 0.35],
            text: '成都',
          },{
            position: [0.62, 0.12],
            text: '江油',
          }
        ]
        }
    });
		
		
		// 页面加载时
		onMounted(async () => {
      const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 

      const res = await proxy.$api.erp.waybill.getCompanyStatListByScope("freight",0, 0,{limit:6,startTime:startTime,endTime:endTime});
      if(res.errcode==0){
        state.conicalConfig.data=res.data.map((val:any)=>{return {name:val.Name,value:val.Weight}});
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getCompanyStatListByScope("freight",0, 0,{limit:6,startTime:startTime,endTime:endTime});
        if(res.errcode==0){
          state.conicalConfig.data=res.data.map((val:any)=>{return {name:val.Name,value:val.Weight}});
        }	
      }, 60000);	
		});
		return {
			t,
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" >
#ranking-board {
  width: 95%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  margin-right: 30px;
  margin-left:10px;
  padding: 0 15px;

  .ranking-board-title {
    height: 40px;
    display: flex;
    font-family: 'LiSu';
    align-items: center;
    font-size: 18px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
  .row-item{
    height:50px !important;
  }
}
</style>
