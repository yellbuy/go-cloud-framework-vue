<template>
  <div id="digitalVillageStat">
    <div class="digital-container">
      <div class="flex-row">
        <div class="digital-flop-item">
          <div class="center-flex">
              <div>
                  <div class="digital-flop-item-title"><b>城镇化率</b></div>
                  <div style="margin-top:1vh;">
                    <dv-digital-flop class="digital-flop-item-digital"
                    :config="{number:[61.28],toFixed: 2,content: '{nt} %',style:{fill: '#fff',fontSize:16}}"
                    />
                  </div>
              </div>
          </div>
        </div>
        <div class="digital-flop-item">
          <div class="center-flex">
            <div>
                <div class="digital-flop-item-title"><b>区生产总值</b></div>
                <div style="margin-top:1vh;">
                  <dv-digital-flop class="digital-flop-item-digital"
                  :config="{number:[287.32],toFixed: 2,content: '{nt} 亿元',style:{fill: '#fff',fontSize:16}}"
                  />
                </div>
              </div>
          </div>
        </div> 
                
        <div class="digital-flop-item">
          <div class="center-flex">
            <div>
                <div class="digital-flop-item-title"><b>人均生产总值</b></div>
                <div style="margin-top:1vh;">
                  <dv-digital-flop class="digital-flop-item-digital"
                  :config="{number:[10.72],toFixed: 2,content: '{nt} 万元',style:{fill: '#fff',fontSize:16}}"
                  />
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
	name: 'digitalVillageStat',
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
    
    margin:2vh 2vw 0px;

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
      padding:0px 1vh 0px 1vh;
      margin-right:auto;
      text-align: center;
      flex-direction: column;
      text-align:center;
      // border-left: 3px solid rgb(6, 30, 93);
      // border-right: 3px solid rgb(6, 30, 93);
      .digital-flop-item-title {
        font-family: 'LiSu';
        font-size:20px;
        padding-top:2vh;
        margin-bottom:1.5vh;
        text-align:center;
        color:#e3dc0f
      }
      .digital-flop-item-digital {
        width:100%;
        height:2vh;
      }
      .digital-flop-item-progress{
        width:90%;
        height:5vh;
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
      padding-top:2vh;
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
