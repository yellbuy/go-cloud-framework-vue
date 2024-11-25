<template>
	<div>
		<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" label-suffix="：" size="small" label-width="120px" v-loading="state.loading">
			<el-row>
				<el-col :span="24">
					<div style="text-align: center;font-size: 25px; padding-bottom: 15px;">
						<h>发布中标公告</h>
					</div>
				</el-col>
				<el-col :span="8" style="padding-top: 10px; padding-bottom: 10px;">
					<el-form-item label="招标编号" prop="No">{{ state.projectForm.No }}
					</el-form-item>
				</el-col>
				<el-col :span="8" style="padding-top: 10px; padding-bottom: 10px;">
					<el-form-item label="项目名称" prop="Name">{{ state.projectForm.Name }}
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8" style="padding-top: 10px; padding-bottom: 10px;">
					<el-form-item label="中标单位" prop="ProjectCompanyId">
						<el-select v-model="state.ruleForm.ProjectCompanyId" placeholder="请选择">
							<el-option v-for="(item, index) in state.projectCompanyList" :key="index" :label="item.CompanyName" :value="item.ProjectCompanyId"/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8" style="padding-top: 10px; padding-bottom: 10px;">
					<el-form-item label="中标金额" prop="Amount">
						<el-input-number v-model="state.ruleForm.Amount" style="width: 100%;" :precision="2" :step="1" :min="0"/>
					</el-form-item>
				</el-col>
				<el-col :span="8" style="padding-top: 10px; padding-bottom: 10px;">
					<el-form-item label="公示截止时间" prop="EndTime">
						<el-date-picker v-model="state.ruleForm.EndTime" type="datetime" placeholder="请选择时间"/>
					</el-form-item>
				</el-col>
				<el-col :span="24" style="padding-top: 10px; padding-bottom: 10px;">
					<el-form-item label="中标公告" prop="Content">
						<vue-ueditor-wrap
							:editor-id="`editor-content`"
							:editor-dependencies="['ueditor.config.js', 'ueditor.all.min.js', 'xiumi/xiumi-ue-dialog-v5.js', 'xiumi/xiumi-ue-v5.css']"
							v-model="state.ruleForm.Content"
							style = "z-index: 1"
							:config="{
								UEDITOR_HOME_URL: '/ueditor/',
								serverUrl: `${state.baseUrl}/v1/common/editor/${getUserInfos.appid}`,
								headers: { Authorization: token, Appid: getUserInfos.appid },
							}" >
						</vue-ueditor-wrap>
					</el-form-item>
				</el-col>
				<el-col>
					<span style="float: right; padding: 15px;">
						<el-button type="primary" @click="onSubmit">确定发布</el-button>
					</span>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
import projectnotice from '/@/api/erp/projectnotice';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const lineEditDlgRef = ref();
const store = useStore();
const token = Session.get('token');
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});

const state = reactive({
	token: token,
	baseUrl: import.meta.env.VITE_API_URL,
	loading: false,
	projectForm: {},
	projectCompanyList: [],
	ruleForm: {},
});

const rules = reactive({
	ProjectCompanyId: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Amount: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	EndTime: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	onGetProjectCompanyList()
	onGetProjectNoticet()
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
};

// 取消
const onCancel = () => {
	proxy.$refs.ruleFormRef.resetFields();
	state.loading = false;
	state.FilesList = [];
	state.Files = [];
	state.jsTableData.data = [];
	state.zgTableData.data = [];
};

//获取投标方列表
const onGetProjectCompanyList = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.signUpList({projectId: state.projectForm.Id, kind: 'bid', pageIndex: 0, pageSize: 20,});
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyList = res.data;
	} finally {
	}
};

//获取投标方列表
const onGetProjectNoticet = async () => {
	try {
		const res = await proxy.$api.erp.projectnotice.getListByScope("bid", 0, 0, {projectId: state.projectForm.Id, pageIndex: 0, pageSize: 1000,});
		if (res.errcode != 0) {
			return;
		}
		if (res.data[0]) {
			state.ruleForm.ProjectCompanyId = res.data[0].ProjectCompanyId
			state.ruleForm.Amount = res.data[0].Amount
			state.ruleForm.EndTime = res.data[0].EndTime
			state.ruleForm.Content = res.data[0].Content
		}
	} finally {
	}
};

// 新增
const onSubmit = async () => {
	try {
		state.ruleForm.Kind = "bid"
		state.ruleForm.Name = state.projectForm.Name
		state.ruleForm.No = state.projectForm.No
		state.ruleForm.ProjectId = state.projectForm.Id
		const res = await proxy.$api.erp.projectnotice.save(state.ruleForm);
		if (res.errcode != 0) {
			ElMessage.success('操作失败！');
			return;
		}
		ElMessage.success('操作成功，2秒后返回项目列表！');
		setTimeout(() => {
			proxy.$parent.$parent.$parent.$parent.closePage()
		}, 2000);
	} finally {
		state.loading = false;
	}
	return false;
};


// 页面加载时
onMounted(() => {
});

defineExpose({openPage, closePage})

</script>
