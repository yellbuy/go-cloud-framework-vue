<template>
  <div id="centerTop">
    <div class="digital-container" v-if="index==0">
        <div class="flex-row">
          <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>0">
                    <div class="digital-flop-item-title"><b>{{list[0].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[0].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>1">
                    <div class="digital-flop-item-title"><b>{{list[1].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[1].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
                  
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>2">
                    <div class="digital-flop-item-title"><b>{{list[2].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[2].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div class="flex-row">
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>3">
                    <div class="digital-flop-item-title"><b>{{list[3].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[3].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>4">
                    <div class="digital-flop-item-title"><b>{{list[4].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[4].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>5">
                    <div class="digital-flop-item-title"><b>{{list[5].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[5].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
      </div>
      <div class="digital-container" v-if="index==1 && list.length>6">
        <div class="flex-row">
          <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>6">
                    <div class="digital-flop-item-title"><b>{{list[6].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[6].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>7">
                    <div class="digital-flop-item-title"><b>{{list[7].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[7].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
                  
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>8">
                    <div class="digital-flop-item-title"><b>{{list[8].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[8].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div class="flex-row">
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>9">
                    <div class="digital-flop-item-title"><b>{{list[9].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[9].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>10">
                    <div class="digital-flop-item-title"><b>{{list[10].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[10].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div class="digital-flop-item">
              <div class="center-flex">
                <div style="background-image:url('./img/bg_dashboard_digital_2.png');width:150px;height:75px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                  <div v-if="list.length>11">
                    <div class="digital-flop-item-title"><b>{{list[11].Name}}</b></div>
                    <div style="margin-top:10px;">
                      <dv-digital-flop class="digital-flop-item-digital"
                      :config="{number:[list[11].Weight],toFixed: 2,content: '{nt} 万吨',style:{fill: '#fff',fontSize:14}}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'dashboardCenterTop',
	components: {  },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
      index:0,
			list:[]
		});
		
		
		// 页面加载时
		onMounted(async () => {
      const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 

      const res = await proxy.$api.erp.waybill.getGoodsNameStatListByScope("freight",0, 0,{limit:12,startTime:startTime,endTime:endTime});
      if(res.errcode==0){
        state.list=res.data;
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getGoodsNameStatListByScope("freight",0, 0,{limit:12,startTime:startTime,endTime:endTime});
        if(res.errcode==0){
          state.list=res.data;
        }	
      }, 60000);

      setInterval(async () => {
        //切换屏幕
        state.index=state.index==0?1:0;
      }, 10000);
				
		});
		return {
			t,
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
  .digital-container {
    
    margin:10px 10px -7px;
    background-color: rgba(6, 30, 93, 0.5);

    .dv-decoration-2 {
      position: absolute;
      width: 95%;
      left: 2.5%;
      height: 5px;
      bottom: 0px;
    }

    .flex-row {
      display: flex;
      flex-direction: row;
      align-content: center;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      text-align:center;
    }
    .digital-flop-item {
      width: 33%;
      padding:6px;
      margin-right:auto;
      text-align: center;
      flex-direction: column;
      text-align:center;
      // border-left: 3px solid rgb(6, 30, 93);
      // border-right: 3px solid rgb(6, 30, 93);
      .digital-flop-item-title {
        font-family: 'LiSu';
        font-size:16px;
        padding-top:6px;
        text-align:center;
        color:#e3dc0f
      }
      .digital-flop-item-digital {
        width:100%;
        height:24px;
      }
      .digital-flop-item-progress{
        width:90%;
        height:40px;
        margin:auto
      }
    }

    
  }
  .digital-title {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      color:lightgray;
      text-align: center;
      font-size: 20px;
      padding-top:10px;
      margin-bottom: 0px;
    }

  .unit {
    box-sizing: border-box;
    padding-bottom: 8px;
  }
  .center-flex {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
</style>
