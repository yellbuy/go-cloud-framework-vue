<template>
	<div>
		<el-row>
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectForm.Location }}</el-descriptions-item>
					<el-descriptions-item label="评委编号：">
						<el-select v-model="state.expertId" placeholder="请选择" @change="selectProjectExpert">
							<el-option v-for="(item, index) in state.projectExpertList" :key="index" :label="item.Name" :value="item.Uid"/>
						</el-select>
					</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div style="text-align: center;font-size: 20px; padding-bottom: 15px;">
					<h>报价得分表</h>
				</div>
			</el-col>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="CompanyName" label="投标方名称" width="300" show-overflow-tooltip/>
					<el-table-column prop="Amount" label="总报价（元）" align="right" width="200" show-overflow-tooltip/>
					<el-table-column prop="ReviewPrice" label="最终评审报价（元）" align="right" show-overflow-tooltip/>
					<el-table-column prop="PriceScore" label="价格得分" align="right" show-overflow-tooltip/>
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { reactive, onMounted, getCurrentInstance } from 'vue';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectForm: {},
	expertId: "",
	projectExpertList: [],
	projectExpertForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			kind: 'bjdf', 
			current: 1, 
			pageSize: 20,
		}
	},
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	onGetProjectExpertList()
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
};

const selectProjectExpert = async (event) => {
    state.projectExpertForm = state.projectExpertList.find(item => item.Uid === event);
	onGetTableData()
}

//	获取该项目参与的所有专家列表
const onGetProjectExpertList = async () => {
	try {
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, {projectId: state.projectForm.Id, pageIndex: 0, pageSize: 20,});
		if (res.errcode != 0) {
			return
		}
		state.projectExpertList = res.data;
	} finally {
	}
};

const onGetTableData = async () => {
	try {
		state.tableData.param.projectId = state.projectForm.Id
		state.tableData.param.kind = 'bid'
		const projectCompanyRes = await proxy.$api.erp.projectcompany.signUpList(state.tableData.param);
		if (projectCompanyRes.errcode != 0) {
			return;
		}
		//获取项目专家评审结果表
		state.tableData.param.expertId = state.expertId
		state.tableData.param.isGather = 0
		const projectReviewRes = await proxy.$api.erp.projectreview.getListByScope("jjpsGather", 0, 0, state.tableData.param);
		if (projectReviewRes.errcode != 0) {
			return;
		}
		state.tableData.data = []
		for (let val of projectCompanyRes.data) {
			let model = {}
			model.Id = "0"
			model.Kind = "bjdf"
			model.ProjectId = state.projectId
			model.CompanyId = val.CompanyId
			model.CompanyName = val.CompanyName
			model.ReviewPrice = 0
			model.PriceScore = 0
			model.Amount = val.Amount
			state.tableData.data.push(model)
			for	(let item of projectReviewRes.data){
				if (item.CompanyId == val.CompanyId) {
					model.Id = item.Id
					model.ReviewPrice = item.ReviewPrice
					model.PriceScore = item.PriceScore
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
