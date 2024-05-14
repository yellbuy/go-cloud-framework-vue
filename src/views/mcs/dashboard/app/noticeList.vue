<template>
  <div id="noticeList">
    <dv-scroll-board :config="{header: ['通告内容','发布日期'],
    align: ['center','left','center'],
    data:list,columnWidth:[50,330,120],index: true,rowNum:3}" style="width:100%;height:120px;margin-top:16px" />
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'dashboardLeftTop',
	components: {  },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			list:[]
		});
		
		
		// 页面加载时
		onMounted(async () => {
      const res = await proxy.$api.cms.article.getList("notice", 2, {state:1,pageNum: 1,pageSize: 10});
      if (res.errcode != 0) {
        return;
      }
      state.list=res.data.map((val:any)=>{
        return [val.Title, val.PublishTime.substr(0,10)]
      })
      setInterval(async () => {
        const res = await proxy.$api.cms.article.getList("notice", 2, {state:1,pageNum: 1,pageSize: 10});
        if (res.errcode != 0) {
          return;
        }
        state.list=res.data.map((val:any)=>{
          return [val.Title, val.PublishTime.substr(0,10)]
        })	
      }, 300000);
				
		});
		return {
			t,
			...toRefs(state),
		};
	},
};
</script>

<style lang="less">

</style>
