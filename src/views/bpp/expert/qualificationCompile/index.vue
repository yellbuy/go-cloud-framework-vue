<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<div>
					<el-button type="primary" @click="onCompile()">汇总</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<el-form-item label="评委编号：">
					<el-select v-model="state.ruleForm.Id" placeholder="请选择" @change="getProjectReviewList">
						<el-option v-for="(item, index) in state.projectExpertTableData.data" :key="index" :label="item.Name" :value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<div style="float: right;">
					<el-button type="primary" @click="">退回重评</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="Content" label="评分内容" width="200" show-overflow-tooltip/>
					<el-table-column prop="Standard" label="评审标准" width="200" show-overflow-tooltip/>
					<el-table-column width="200" show-overflow-tooltip v-for="(item, index) in state.projectCompanyTableData.data" :key="index" :label="item.CompanyName" :value="item">
						<template #default="scope">
							<el-tag effect="success" v-if="item.CompanyId == scope.row.CompanyId && scope.row.State == 1">通过</el-tag>
							<el-tag effect="danger" v-else-if="item.CompanyId == scope.row.CompanyId && scope.row.State == 0">不通过</el-tag>
						</template>
					</el-table-column>
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

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	projectLineIndex:'',
	projectExpertTableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	projectCompanyTableData: {
		data: [],
		param: {
			kind: 'bid',
			current: 1,
			pageSize: 20,
		},
	},
	projectReviewTableData: {
		data: [],
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
		param: {},
	},
	ruleForm: {},
});

state.projectExpertTableData.param.pageIndex = computed(() => {
	return state.projectExpertTableData.param.current - 1;
});
state.projectReviewTableData.param.pageIndex = computed(() => {
	return state.projectReviewTableData.param.current - 1;
});

//	获取该项目专家列表
const getProjectExpertList = async () => {
	state.projectExpertTableData.loading = true
	try {
		state.projectExpertTableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, state.projectExpertTableData.param);
		if (res.errcode != 0) {
			return
		}
		state.projectExpertTableData.data = res.data;
		state.projectExpertTableData.total = res.total
	} finally {
		state.projectExpertTableData.loading = false
	}
};

//获取投标方列表
const getProjectCompanyList = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.signUpList(state.projectCompanyTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyTableData.data = res.data;
	} finally {
	}
};

//获取评审参数列表
const onGetProjectReviewTableData = async () => {
	state.projectReviewTableData.loading = true;
	try {
		state.projectReviewTableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectreview.getListByScope("zgps", 0, 0, state.projectReviewTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.projectReviewTableData.data = res.data
	} finally {
		state.projectReviewTableData.loading = false;
	}
};

//	获取专家汇总信息
const getProjectReviewList = async () => {
	state.tableData.loading = true
	try {
		state.tableData.param.projectId = state.project.Id
		state.tableData.param.expertUid = state.ruleForm.Id
		const res = await proxy.$api.erp.projectreview.getList("zgps", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return
		}
		state.tableData.data = res.data.RecordList;
	} finally {
		state.tableData.loading = false
	}
};

const selectCompany = async () => {
	state.projectReviewTableData.data = []
	onGetProjectReviewTableData()
}

//获取项目品目信息
const getCompanyList = async (isState: boolean) => {
	if (isState) {
		let params = {};
		state.project = store.state.project.project;
		state.tableData.data = [];
		try {
			params.projectId = store.state.project.projectId;
			params.state = 1;
			//重新请求数据

			const res = await proxy.$api.erp.projectcompany.comparisonList(params);
			//获取存储的项目数据
			if (res.errcode != 0) {
				return;
			}
			state.tableData.data = res.data;
		} finally {
		}
	}
};

const onCompile = async (Id: Number) => {
	if (!Id) {
		ElMessage.error('当前没有正在评选的项目包，请刷新重试。');
		return;
	}
	ElMessageBox.confirm(`确定汇总吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		// try {
		// 	const res = await proxy.$api.common.enterprise.audit(state.ruleForm);
		// 	if (res.errcode != 0) {
		// 		return;
		// 	}
		// 	state.ruleForm.AuditState = 0;
		// } finally {
		// 	onGetTableData(true);
		// }
		return false;
	});
};

// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.current = val;
};

// 页面加载时
onMounted(() => {
	getProjectExpertList()
	getProjectCompanyList()
});

</script>

<style scoped lang="scss">
</style>
