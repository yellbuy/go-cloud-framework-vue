<template>
  <div id="digitalVillageStat">
    <div class="digital-container">
      <div class="flex-row">
        <div class="digital-flop-item">
          <div class="center-flex">
            <div style="display:inline-block;" >
              <div class="target-content">
                <div style="display:inline-block;margin:0 20px;" >
                  <i class="fa fa-home" aria-hidden="true" style="font-size: 36px; color: lightblue;" />
                  </div>
                  <div style="display:inline-block;margin:0 10px">
                    <div>总村数</div>
                    <div><b class="target-value" style="color:lightblue">6</b> 个</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="digital-flop-item">
          <div class="center-flex">
            <div style="display:inline-block;" >
                <div class="target-content">
                  <div style="display:inline-block;margin:0 20px;" >
                    <i class="fa fa-bank" aria-hidden="true" style="font-size: 36px; color: orange;" />
                    </div>
                    <div style="display:inline-block;margin:0 10px">
                      <div>达标村数</div>
                      <div><b class="target-value" style="color:orange">5</b> 个</div>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div class="digital-flop-item">
          <div class="center-flex">
            <div style="display:inline-block;" >
                <div class="target-content">
                  <div style="display:inline-block;margin:0 20px;" >
                    <i class="fa fa-pie-chart" aria-hidden="true" style="font-size: 36px; color: red;" />
                    </div>
                    <div style="display:inline-block;margin:0 10px">
                      <div>达标占比</div>
                      <div><b class="target-value" style="color:red">80</b> %</div>
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
