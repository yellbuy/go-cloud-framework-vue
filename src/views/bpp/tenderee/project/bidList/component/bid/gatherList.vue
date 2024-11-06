<template>
	<div>
		<el-row>
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectForm.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-240)" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="CompanyName" label="投标方名称" show-overflow-tooltip fixed />
			<el-table-column prop="ReviewPrice" label="投标评审价（元）" show-overflow-tooltip align="right" />
			<el-table-column prop="PriceScore" label="报价得分" show-overflow-tooltip align="right" />
			<el-table-column prop="TechnicalScore" label="技术得分" show-overflow-tooltip align="right" />
			<el-table-column prop="GatherScore" label="最终得分" show-overflow-tooltip align="right" />
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed, getCurrentInstance } from 'vue';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	onGetTableData()
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
};

//获取评分汇总
const onGetTableData = async () => {
	try {
		state.tableData.param.projectId = state.projectForm.Id
		state.tableData.param.kind = "bid"
		const projectCompanyRes = await proxy.$api.erp.projectcompany.signUpList(state.tableData.param);
		if (projectCompanyRes.errcode != 0) {
			return;
		}
		state.tableData.param.kind = null
		//获取项目专家评审结果表

		state.tableData.param.isGather = 2
		const projectReviewRes = await proxy.$api.erp.projectreview.getListByScope("gather", 0, 0, state.tableData.param);
		if (projectReviewRes.errcode != 0) {
			return;
		}
		state.tableData.param.isGather = null
		state.tableData.data = []
		for (let val of projectCompanyRes.data) {
			let model = {}
			model.CompanyName = val.CompanyName
			model.ReviewPrice = 0
			model.PriceScore = 0
			model.GatherScore = 0
			model.TechnicalScore = 0
			state.tableData.data.push(model)
			for	(let item of projectReviewRes.data){
				if (item.CompanyId == val.CompanyId) {
					model.Id = item.Id
					model.ReviewPrice = item.ReviewPrice
					model.PriceScore = item.PriceScore
					model.GatherScore = item.GatherScore
					model.TechnicalScore = item.TechnicalScore
				}
			}

		}
	} finally {
	}
};

// 页面加载时
onMounted(() => {

});

defineExpose({openPage, closePage})
</script>

<style scoped lang="scss"></style>
