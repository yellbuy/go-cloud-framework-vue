<template>
  <div id="noticeList">
    <dv-scroll-board :config="{header: ['通告内容','发布日期'],
    align: ['center','left','center'],headerBGC: '#337ecc',
    data:list,columnWidth:[50,360,120],index: true,rowNum:5,headerHeight:30}" class="noticeList-board" />
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
        return [`<span title='${val.Title}'>${val.Title}</span>`, val.PublishTime.substr(0,10)]
      })
      setInterval(async () => {
        const res = await proxy.$api.cms.article.getList("notice", 2, {state:1,pageNum: 1,pageSize: 10});
        if (res.errcode != 0) {
          return;
        }
        state.list=res.data.map((val:any)=>{
          return [`<span title='${val.Title}'>${val.Title}</span>`, val.PublishTime.substr(0,10)]
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
#noticeList{
  margin:0px 2vh;
  .noticeList-board{
    width:100%;
    height:32vh;
  }
}
</style>
