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
				<div v-if="state.projectForm.ReportState == 0">
					<el-upload
						class="upload-demo"
						:action="state.uploadURL"
						:accept:="`application/pdf,application/docx,application/doc`"
						:headers="state.httpHeaders"
						:before-upload="onBeforeUpload"
						:on-success="onSuccessFile"
						:on-remove="onRemove"
						:limit="1"
						:file-list="state.filesList">
						<template #default>
							<el-button>
								<el-icon class="el-icon--right">
									<Upload />
								</el-icon>
								上传评标报告
							</el-button>
						</template>
					</el-upload>
				</div>
				<div v-else>
					<el-button type="primary" @click="onDownloadFile">下载</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<div style="text-align: center; font-size: 40px;">
					<h>PDF预览</h>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';

const getUserInfos = computed(() => {return store.state.userInfos.userInfos;});
const token = Session.get('token');
const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectId: '',
	httpHeaders:proxy.$getRequestHeaders(),
	baseUrl: import.meta.env.VITE_URL as any,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	projectList: [],
	projectForm: {},
	filesList: [],
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
		const res = await proxy.$api.erp.projectBid.getById(state.projectForm.Id)
		if (res.errcode != 0) {
			return;
		}
		state.projectForm = res.data;
	} finally {
	}
};
	const onBeforeUpload: UploadProps['beforeUpload'] = () => {
		state.httpHeaders=proxy.$getRequestHeaders()
		return true;
	};
//	上传成功
const onSuccessFile = (file: UploadFile) => {
	state.filesList.push(file.data)
	state.ruleForm.ReportFiles = file.data.src
	state.ruleForm.Id = state.projectForm.Id
	onSubmit()
};

//	删除上传文件
const onRemove = () => {
	ElMessageBox.confirm(`确定要删除文件吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		state.filesList = []
		state.ruleForm.ReportFiles = ''
	});
};

// 下载文件
const onDownloadFile = async () => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + state.projectForm.ReportFiles;
	a.download = state.projectForm.ReportRemark; // 下载后的文件名称
	a.click();
};

const onSubmit = async () => {
	try {
		const gatherRes = await proxy.$api.erp.projectBid.reportUpload(state.projectForm.Id, state.ruleForm);
		if (gatherRes.errcode != 0) {
			ElMessage.warning('上传报告失败！')
			return;
		}
		onProjectBidGetById()
		ElMessage.success('上传报告成功！')
	} finally {
	}
	return false;
};

// 页面加载时
onMounted(() => {
	onGetProjectTableData()
});

</script>
<style scoped lang="scss">
</style>
