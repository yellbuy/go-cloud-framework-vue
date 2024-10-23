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
				<div v-if="state.tableData.data.length > 0">
					<el-button type="primary" @click="onSubmit()">汇总</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<el-form-item label="评委编号：" v-if="state.projectExpertList.length > 0">
					<el-select v-model="state.expertId" placeholder="请选择" @change="selectProjectExpert">
						<el-option v-for="(item, index) in state.projectExpertList" :key="index" :label="item.Name" :value="item.Uid"/>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<div style="float: right;" v-if="state.tableData.data.length > 0">
					<el-button type="primary" @click="">退回重评</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="state.tableData.data.length > 0">
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="Content" label="评分内容" width="150" show-overflow-tooltip/>
					<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip/>
					<el-table-column width="150" show-overflow-tooltip v-for="(item, index) in state.tableData.headerList" :key="index" :label="item.CompanyName" :prop="item.HeaderName">
						<template #default="scope">
							<el-tag effect="success" v-if="scope.row[item.HeaderName] == 1">通过</el-tag>
							<el-tag effect="danger" v-else-if="scope.row[item.HeaderName] == 0">不通过</el-tag>
							<el-tag v-else-if="scope.row[item.HeaderName] == 'notReview'">专家未评审</el-tag>
							<el-tag v-else-if="scope.row[item.HeaderName] == 'notSummary'">待汇总</el-tag>
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
import project from '/@/api/erp/project';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectId: '',
	expertId: '',
	projectList: [],
	projectForm: {},
	projectExpertList: [],
	projectExpertForm: {},
	tableData: {
		headerList: [],
		data: [],
		total: 0,
		loading: false,
		param: {},
	},
	ruleForm: {},
});

const selectProject = async (event) => {
    state.projectForm = state.projectList.find(item => item.Id === event);
	state.expertId = null
	state.tableData.data = []
	getProjectExpertList()
};

const selectProjectExpert = async (event) => {
    state.projectExpertForm = state.projectExpertList.find(item => item.CompanyId === event);
	getProjectReviewList()
}

//	获取专家参与的项目列表
const onGetProjectTableData = async () => {
	try {
		const res = await proxy.$api.erp.projectbid.expertParticipateList("bid", 0, 4);
		if (res.errcode != 0) {
			return;
		}
		state.projectList = res.data;
	} finally {
	}
};

//	获取该项目参与的所有专家列表
const getProjectExpertList = async () => {
	try {
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, {projectId: state.projectId, current: 1, pageSize: 20,});
		if (res.errcode != 0) {
			return
		}
		state.projectExpertList = res.data;
		state.projectExpertList.push({Name: "全部汇总", Uid: "0"})
	} finally {
	}
};

//	获取专家汇总信息列表
const getProjectReviewList = async () => {
	state.tableData.loading = true
	try {
		state.tableData.param.expertId = state.expertId
		state.tableData.param.projectId = state.projectId
		const res = await proxy.$api.erp.projectreview.getList("zgps", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return
		}
		state.tableData.data = res.data.RecordList;
		state.tableData.headerList = res.data.HeaderList
	} finally {
		state.tableData.loading = false
	}
};

const onSubmit = async () => {
	if (state.projectId <= 0) {
		ElMessage.error('当前没有正在评选的项目包，请刷新重试。');
		return;
	}
	ElMessageBox.confirm(`确定汇总吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectreview.expertGatherSave(state.projectId, {kind: 'zgps', expertId: state.expertId});
			if (res.errcode != 0) {
				return
			}
		} finally {
		}
		getProjectReviewList()
		ElMessage('汇总完成')
		return false;
	}).catch(async () => {
		ElMessage('取消汇总')
	});
};

// 页面加载时
onMounted(() => {
	onGetProjectTableData()
});

</script>

<style scoped lang="scss">
</style>
