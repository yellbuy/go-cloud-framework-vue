<template>
	<div class="cms-detail-article-container">
		<div class="text-center font24 mb10">{{ruleForm.Title}}</div>
		<div class="text-center sub-title">
			<el-space spacer=" | ">
				<div>发布时间：{{ruleForm.PublishTime}}</div>
				<div>来源：{{ruleForm.Source}}</div>
				<div>阅读：{{ruleForm.ClickNum}}</div>
			</el-space>
		</div>
		<!-- <div class="divider"/> -->
		<div class="text-center" v-if="ruleForm.IsShowCover && ruleForm.ImgUrl">
			<img :src="proxy.$utils.staticUrlParse(ruleForm.ImgUrl)">
		</div>
		<div class="mt10" v-html="ruleForm.Content"></div>
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, onMounted, ref, getCurrentInstance,computed } from 'vue';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useRoute,useRouter } from "vue-router";
import { useStore } from '/@/store/index';
export default {
	name: 'baseArticleDetail',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const route=useRoute();
		const router=useRouter();
		const id = route.params.id;
		const state = reactive({
			ruleForm: {},
		});
		const { dateFormatYMDHM } = commonFunction();
		// 页面加载时
		onMounted(async () => {
			const res=await proxy.$api.cms.article.getById(id)
			if(res.errcode==0){
				state.ruleForm=res.data
			} else{
				router.push("/404")
			}
		});
		return {
			t,
			proxy,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
.cms-detail-article-container{
	margin:20px;
}
.sub-title{
	padding:10px;
	color:var(--el-color-info);
	background-color: var(--el-color-info-light-9);
	margin-bottom: 10px;
	
}
.divider{
	margin:10px 0;
	border-bottom: 1px dashed var(--el-color-info-light-5);
}

</style>