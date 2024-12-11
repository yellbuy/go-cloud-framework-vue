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
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<el-card>
					<div style="text-align: center; margin-bottom: 50px; font-size: 20px;">
						<el-link :href="state.baseUrl + state.projectForm.ReportFiles" v-if="state.projectForm.ReportState == 1" target="_blank">评审报告：{{ state.projectForm.ReportFiles }}</el-link>	
					</div>
					<div style="text-align: center;" v-if="state.projectForm.ReportState == 1">
						<el-button style="width: 300px; height: 80px; font-size: 50px;" type="primary" @click="onSubmit">确认签章</el-button>
					</div>
				</el-card>
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
	projectId: '',
	projectList: [],
	projectForm: {},
	baseUrl: import.meta.env.VITE_URL as any,
	ruleForm: {},
});

const selectProject = async (event) => {
    state.projectForm = state.projectList.find(item => item.Id === event);
	onProjectBidGetById()
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

//	获取报告
const onProjectBidGetById = async () => {
	try {
		const res = await proxy.$api.erp.projectbid.getById(state.projectForm.Id)
		if (res.errcode != 0) {
			return;
		}
		state.projectForm = res.data;
	} finally {
	}
};

// 下载文件
const onDownloadFile = async () => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + state.projectForm.ReportFiles;
	a.download = state.projectForm.ReportRemark; // 下载后的文件名称
	a.click();
};

const onSubmit = async () => {
	ElMessageBox.confirm(`确定要签章报告吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			state.ruleForm.ReportSignPic = "test"
			state.ruleForm.Id = state.projectForm.Id
			const res = await proxy.$api.erp.projectbid.reportSignature(state.projectId, state.ruleForm);
			if (res.errcode != 0) {
				ElMessage.warning('报告签章失败！')
				return;
			}
			onProjectBidGetById()
			ElMessage.success('报告签章成功！')
		} finally {
		}
		return false;
	}).catch(async () => {
		onProjectBidGetById()
		ElMessage.info('取消报告签章')
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
	onGetProjectTableData()
});

</script>

<style scoped lang="scss">
</style>
