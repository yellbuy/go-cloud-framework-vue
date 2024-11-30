<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-form-item label="选择参与项目：" prop="Id">
					<el-select v-model="state.projectId" filterable placeholder="请选择" @change="selectProject">
						<el-option v-for="(item, index) in state.projectList" :key="index" :label="item.Name" :value="item.Id" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;" v-if="state.projectId > 0">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectForm.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<div v-if="state.expertUid > 0">
					<el-button type="primary" @click="onReturn">退回重评</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<el-form-item label="评委编号：" v-if="state.projectExpertList.length > 0">
					<el-select v-model="state.expertUid" placeholder="请选择" @change="selectProjectExpert">
						<el-option v-for="(item, index) in state.projectExpertList" :key="index" :label="item.Name" :value="item.Uid"/>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<div style="float: right;" v-if="state.expertUid > 0">
					<el-button type="primary" @click="onSubmit">提交</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="state.expertUid > 0">
			<el-col :span="8">
			</el-col>
			<el-col :span="8">
				<div style="text-align: center;font-size: 20px; padding-bottom: 15px;">
					<h>报价得分表</h>
				</div>
			</el-col>
			<el-col :span="8">
			</el-col>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="CompanyName" label="投标方名称" show-overflow-tooltip/>
					<el-table-column prop="Price" label="总报价（元）" align="right" width="200" show-overflow-tooltip/>
					<el-table-column prop="ReviewPrice" label="最终评审报价（元）" align="right" width="200" show-overflow-tooltip>
						<template #default="scope">
							<el-input-number style="width: 100%;" v-model="scope.row.ReviewPrice" :precision="2" :step="1" :min="0"/>
						</template>
					</el-table-column>
					<el-table-column prop="PriceScore" label="价格得分" align="right" width="200" show-overflow-tooltip>
						<template #default="scope">
							<el-input-number style="width: 100%;" v-model="scope.row.PriceScore" :precision="0" :step="1" :min="0"/>
						</template>
					</el-table-column>
					<!-- <el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(70)" fixed="right">
						<template #default="scope">
							<el-button text bg type="primary" @click="onSubmit(scope.row)">保存</el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, computed, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
import { Session } from '/@/utils/storage';

const token = Session.get('token');
const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectId: '',
	expertUid: '',
	token: token,
	projectList: [],
	projectForm: {},
	projectExpertList: [],
	projectExpertForm: {},
	projectTableData: {
		data: [],
		ruleForm: {},
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1, 
			pageSize: 20,
		}
	},
	ruleForm: {},
});

state.projectTableData.param.pageIndex = computed(() => {
	return state.projectTableData.param.current - 1;
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

const selectProject = async (event) => {
    state.projectForm = state.projectList.find(item => item.Id === event);
	state.expertUid = null
	state.tableData.data = []
	onGetProjectExpertList()
}

const selectProjectExpert = async (event) => {
    state.projectExpertForm = state.projectExpertList.find(item => item.Uid === event);
	onGetTableData()
}

//	获取专家参与的项目列表
const onGetProjectTableData = async () => {
	try {
		const res = await proxy.$api.erp.projectexpert.expertParticipateList();
		if (res.errcode != 0) {
			return;
		}
		state.projectList = res.data;
	} finally {
	}
};

//	获取该项目参与的所有专家列表
const onGetProjectExpertList = async () => {
	try {
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, {projectId: state.projectId, pageIndex: 0, pageSize: 20,});
		if (res.errcode != 0) {
			return
		}
		state.projectExpertList = res.data;
	} finally {
	}
};

//获取投标方列表
const onGetTableData = async () => {
	try {
		const projectCompanyRes = await proxy.$api.erp.projectcompany.getListByScope("bid", 0, 0,{projectId: state.projectId, kind: 'bid', pageIndex: 0, pageSize: 20,});
		if (projectCompanyRes.errcode != 0) {
			return;
		}
		//获取项目专家评审结果表
		state.tableData.param.projectId = state.projectId
		state.tableData.param.expertUid = state.expertUid
		state.tableData.param.isGather = 0
		const projectReviewRes = await proxy.$api.erp.projectreview.getListByScope("jjps", 0, 0, state.tableData.param);
		if (projectReviewRes.errcode != 0) {
			return;
		}
		state.tableData.data = []
		for (let val of projectCompanyRes.data) {
			let model = {}
			model.Id = "0"
			model.Kind = "jjps"
			model.ProjectId = state.projectId
			model.CompanyId = val.CompanyId
			model.CompanyName = val.CompanyName
			model.ReviewPrice = 0
			model.PriceScore = 0
			model.Amount = val.Amount
			model.Price = val.Price
			state.tableData.data.push(model)
			for	(let item of projectReviewRes.data){
				if (item.CompanyId == val.CompanyId) {
					model.Id = item.Id
					model.Uid = item.Uid
					model.ReviewPrice = item.ReviewPrice
					model.PriceScore = item.PriceScore
				}
			}

		}
	} finally {
	}
};

const onReturn = async () => {
	ElMessageBox.confirm(`确定要回退重评吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectreview.gatherReturnSave(state.projectId);
			if (res.errcode != 0) {
				return;
			}
			onGetTableData()
			ElMessage('回退成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('回退汇总')
	});
};

const onSubmit = async () => {
	ElMessageBox.confirm(`确定要提交报价分数吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectreview.reviewSave("jjps", state.projectId, state.tableData.data);
			if (res.errcode != 0) {
				onGetTableData()
				ElMessage('提交失败')
				return;
			}
			onGetTableData()
			ElMessage('报价分数提交成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('取消提交')
	});
};

// 页面加载时
onMounted(() => {
	onGetProjectTableData()
});

</script>

<style scoped lang="scss">
</style>
