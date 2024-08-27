<template>
  <div>
    <div>
      <div class="digital-title" v-if="list.length>0">{{title}}</div>
      <div style="display: flex;flex-direction: row;">
        <div style="width:20%;margin:4px;align-items: center;justify-content: space-between;" v-for="(val,index) in list" :key="index">
          <ringProgress  :title="val.Name" :planValue="val.PlanQty" :actualValue="val.Weight" unit="吨" ></ringProgress>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import ringProgress from "./ringProgress.vue";
export default {

  name: "ringProgressList",
  components: {
    ringProgress
  },
  props: {
    title: {
      type: String,
    },
    kind: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    timeSpan: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
    },
  },
  setup(props) {
    console.log("progressList props:",props)
    const { proxy } = getCurrentInstance() as any;
    const now = dayjs();
    const modelName:any = props.modelName||"waybill"
    const limit=props.limit||0
    const timeSpan:any = props.timeSpan||"month"
    const startTime=now.startOf(timeSpan).format()
    const endTime=now.endOf(timeSpan).format()
    const state = reactive({
        title:props.title,
        list: [],
      });
      // 页面加载时
		onMounted(async () => {
      if(modelName=="waybill"){
        const res = await proxy.$api.erp.waybill.getProgressStatByScope(props.kind, 0, 0, {startTime,endTime,limit});
        console.log("waybill:",res.data)
          if (res.errcode != 0) {
            return;
          }
          state.list=res.data
      } else {
        const res = await proxy.$api.erp.businessBill.getProgressStatByScope(props.kind, 0, 0, {startTime,endTime,limit});
        console.log("businessBill:",res.data)
        if (res.errcode != 0) {
          return;
        }
        state.list=res.data
      }
      setInterval(async () => {
        if(modelName=="waybill"){
          const res = await proxy.$api.erp.waybill.getProgressStatByScope(props.kind, 0, 0, {startTime,endTime,limit});
          console.log("waybill:",res.data)
            if (res.errcode != 0) {
              return;
            }
            state.list=res.data
        } else {
          const res = await proxy.$api.erp.businessBill.getProgressStatByScope(props.kind, 0, 0, {startTime,endTime,limit});
          console.log("businessBill:",res.data)
            if (res.errcode != 0) {
              return;
            }
            state.list=res.data
        }
      }, 60000);
		});
    
    return {
      ...toRefs(state)
    };
  },
};
</script>
<style lang="less" scoped>
.digital-title {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      font-size:18pt;
      font-family: 'LiSu';
      text-align: center;
      padding-top:16px;
      margin-bottom: 10px;
    }
</style>