<template>
	<div v-if="state.isShowPage">
		<el-row>
			<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" label-suffix="：" size="small" label-width="120px" v-loading="state.loading">
				<el-row>
					<el-col :span="24">
						<div style="text-align: center;font-size: 25px; padding-bottom: 15px;">
							<h>发布中标公告</h>
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="比选编号" prop="No">
							<el-input v-model="state.ruleForm.No"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="公告名称" prop="Name">
							<el-input v-model="state.ruleForm.Name"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="公示截止时间" prop="Location">
							<el-date-picker v-model="state.ruleForm.Location" type="datetime" placeholder="请选择时间"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="中标公告" prop="Content">
							<vue-ueditor-wrap
								:editor-id="`editor-content`"
								:editor-dependencies="['ueditor.config.js', 'ueditor.all.min.js', 'xiumi/xiumi-ue-dialog-v5.js', 'xiumi/xiumi-ue-v5.css']"
								v-model="state.ruleForm.Content"
								style=" z-index: 1"
								:config="{
									UEDITOR_HOME_URL: '/ueditor/',
									serverUrl: `${state.baseUrl}/v1/common/editor/${getUserInfos.appid}`,
									headers: { Authorization: token, Appid: getUserInfos.appid },
								}" >
							</vue-ueditor-wrap>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<span style="float: right; padding: 15px;">
							<el-button text bg type="info" @click="onCancel()">取消</el-button>
							<el-button type="primary" @click="">确定发布</el-button>
						</span>
					</el-col>
				</el-row>
			</el-form>
		</el-row>	
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

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const moduleKey = proxy.$parent.moduleKey;
const lineEditDlgRef = ref();
const store = useStore();
const token = Session.get('token');
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});

const state = reactive({
	moduleKey,
	isShowPage: false,
	title: t('message.action.add'),
	loading: false,
	token: token,
	baseUrl: import.meta.env.VITE_API_URL,
	dialogImageUrl: [],
	dialogTitle: '',
	dialogVisible: false,
	projectForm: {},
	tableData:{
		data: [],
		loading: false,
	},
	ruleForm: {
		Id: 0,
		Kind: '',
		Name: '',
		No: '',
		Sn: '',
		ProjectType: 1,
		RemoteState: 0,
		BidFee: 0,
		EnsureFee: 0,
		Location: '',
		Content: '',
		Files: '',
		AutoSwitchState: 0,
		StartTime: '', //报名开始时间
		EndTime: '', //报名结束时间
		BeginTime: '', //投标开始时间
		FinishTime: '', //投标结束时间
		ReviewTime: '', //评选时间
		BidOpenTime: '',
		ProjectLineList: [],
		ProjectSettingLineList: [],
	},
	jjForm: {
		Id: '0',
		Kind: 'jjps',
		PurchasePrice: 0, //采购控制价
		ScoreMode: 0, //价格得分模式
		PriceScore: 0, //价格得分减少
		PricePercentage: 50, //价格百分比
		QualificationScore: 0, //价格分数
		TechnicalScore: 0,
		TechnicalMaxScore: 0,
	},
	zgTableData: {
		data: [],
		loading: false,
	},
	jsTableData: {
		data: [],
		loading: false,
	},
	// tableData: {
	// 	data: [],
	// 	loading: false,
	// 	param: {
	// 		current: 1,
	// 		pageSize: 10000,
	// 	},
	// },
	SupplierIds: [],
	companyOption: [],
	methodList: [],
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	Files: [],
	homeBaseUrl: import.meta.env.VITE_URL as any,
	FilesList: [],
});

const startTimeRule = (rule: any, value: any, callback: any) => {
	switch (rule.field) {
		case 'StartTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value >= state.ruleForm.EndTime) {
				callback(new Error('报名开始时间应小于报名结束时间'));
			} else {
				callback();
			}
			break;
		case 'EndTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.ruleForm.StartTime) {
				callback(new Error('报名结束时间应大于于报名开始时间'));
			} else {
				callback();
			}
			break;
		case 'BeginTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.ruleForm.EndTime) {
				callback(new Error('招标开始时间应大于报名结束时间'));
			} else if (value >= state.ruleForm.FinishTime) {
				callback(new Error('招标开始时间应小于招标结束时间'));
			} else {
				callback();
			}
			break;
		case 'FinishTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.ruleForm.BeginTime) {
				callback(new Error('招标结束时间应大于招标开始时间'));
			} else {
				callback();
			}
			break;
		case 'ReviewTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.ruleForm.FinishTime) {
				callback(new Error('评选时间应大于招标结束时间'));
			} else {
				callback();
			}
			break;
	}
};
const rules = reactive({
	isShowPage: false,
	title: t('message.action.add'),
	No: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Sn: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Name: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	ProjectType: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	StartTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	EndTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	BeginTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	FinishTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	ReviewTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	state.isShowPage = true
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
	state.isShowPage = false
};

// 取消
const onCancel = () => {
	proxy.$refs.ruleFormRef.resetFields();
	state.loading = false;
	state.FilesList = [];
	state.Files = [];
	state.jsTableData.data = [];
	state.zgTableData.data = [];
	state.isShowPage = false
};

// 新增
const onSubmit = () => {
	if (state.ruleForm.Content == '') {
		ElMessage.error('操作失败！请填写项目内容！');
		return;
	}
	proxy.$refs.ruleFormRef.validate(async (valid: any) => {
		if (valid) {
			try {
				if (state.Files) {
					state.ruleForm.Files = state.Files.join(',');
				}
				state.loading = true;
				state.ruleForm.Id = state.ruleForm.Id.toString();
				// state.ruleForm.ProjectLineList = state.tableData.data;
				state.ruleForm.RemoteState = parseInt(state.ruleForm.RemoteState);
				state.ruleForm.AutoSwitchState = parseInt(state.ruleForm.AutoSwitchState);
				state.ruleForm.ProjectType = parseInt(state.ruleForm.ProjectType);
				if (state.ruleForm.ProjectType != 1) {
					state.ruleForm.AutoSwitchState = 0;
				}
				if (state.SupplierIds.length > 0) {
					state.ruleForm.SupplierIds = state.SupplierIds.toString();
				}
				state.ruleForm.BidOpenTime = state.ruleForm.BeginTime;
				// state.ruleForm.ProjectLineList = state.tableData.data;
				state.ruleForm.ProjectSettingLineList = [...state.zgTableData.data, ...state.jsTableData.data];
				state.jjForm.Id = state.jjForm.Id.toString();
				state.ruleForm.ProjectSettingLineList.push(state.jjForm);
				const res = await proxy.$api.erp.project.save(state.ruleForm);
				if (res.errcode == 0) {
					ElMessage.success('操作成功！');
					onCancel();
				}
			} finally {
				state.loading = false;
			}
			return false;
		} else {
			return false;
		}
	});
};


// 页面加载时
onMounted(() => {
});

defineExpose({openPage, closePage})

</script>
