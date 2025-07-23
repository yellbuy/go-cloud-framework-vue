<template>
	<div>
		<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" size="small" label-width="120px" label-suffix="：" v-loading="state.loading">
			<el-row>
				<el-col :span="24">
					<el-form-item label="上传标书" prop="Files">
						<div style="width: 50%">
							<el-upload
								:action="state.uploadURL"
								name="file"
								:accept:="`application/pdf,application/docx,application/doc`"
								:headers="state.httpHeaders"
								:before-upload="onBeforeUpload"
								:on-success="(file) => onSuccessFile(file)"
								:on-remove="onRemove"
								:show-file-list="true"
								:limit="1"
								:file-list="state.ruleForm.FilesList">
								<template #default>
									<el-button>
										<el-icon class="el-icon--right">
											<Upload />
										</el-icon>
										上传
									</el-button>
								</template>
							</el-upload>
						</div>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="项目包个数" prop="Location">
						<el-input v-model="state.ruleForm.Number"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<div style="float: right;">
						<el-button size="small" type="primary" @click="onProjectLineDialog()" class="mb16">添加品目</el-button>
					</div>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb16">
					<el-table :data="state.projectLineTableData.data" v-loading="state.projectLineTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="No" label="品目号" width="120" show-overflow-tooltip/>
						<el-table-column prop="Name" label="设备名称" show-overflow-tooltip/>
						<el-table-column prop="Remark" label="备注" show-overflow-tooltip/>
						<el-table-column prop="Qty" label="数量" show-overflow-tooltip/>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
							<template #default="scope">
								<el-button text bg type="primary" @click="onProjectLineDialog(scope.row, scope.$index)">编辑</el-button>
								<el-button text bg type="danger" @click="onDelProjectLine(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="报名开始时间" prop="StartTime" required>
						<el-date-picker v-model="state.ruleForm.StartTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="报名结束时间" prop="EndTime" required>
						<el-date-picker v-model="state.ruleForm.EndTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="投标开始时间" prop="BeginTime" required>
						<el-date-picker v-model="state.ruleForm.BeginTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="投标结束时间" prop="FinishTime" required>
						<el-date-picker v-model="state.ruleForm.FinishTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="评选时间" prop="ReviewTime" required>
						<el-date-picker v-model="state.ruleForm.ReviewTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20" v-if="state.ruleForm.ProjectType == 1">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item>
						<a style="font-size: 20px; padding-top: 20px; padding-bottom: 20px;">注意：如果此公开比选项目不足三家供应商参与，是否自动转为竞争性谈判项目？</a>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item prop="AutoSwitchState">
						<el-checkbox v-model="state.ruleForm.AutoSwitchState" :true-label="1" :false-label="0">不足三家供应商参与，比选方式转换为竞争性谈判项目</el-checkbox>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-dialog :title="state.title" v-model="state.isShowDialog" :destroy-on-close="true"  width="40%" :before-close="closeProjectLineDialog">
			<el-divider content-position="left">品目信息</el-divider>
			<el-form ref="ruleFormRef" :model="state.projectLineTableData.form" :rules="rules" size="small" label-width="130px" label-suffix="：" v-loading="state.projectLineTableData.loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="品目号" prop="No">
							<el-input v-model="state.projectLineTableData.form.No" placeholder="品目号"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="名称" prop="Name">
							<el-input v-model="state.projectLineTableData.form.Name" placeholder="名称"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="数量" prop="Qty">
							<el-input-number v-model="state.projectLineTableData.form.Qty" :min="0" controls-position="right" style="width: 100%;"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
						<el-form-item label="备注" prop="Remark">
							<el-input v-model="state.projectLineTableData.form.Remark" placeholder="备注"/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeProjectLineDialog">取消</el-button>
					<el-button text bg type="primary" @click="submitProjectLine">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
//	获取用户信息 vuex
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});
const moduleKey = proxy.$parent.moduleKey;
const store = useStore();
const token = Session.get('token');


const state = reactive({
	isShowPage: false,
	isShowDialog: false,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	title: t('message.action.add'),
	moduleKey,
	httpHeaders:proxy.$getRequestHeaders(),
	token: token,
	activeIndex: 1,
	loading: false,
	isAdd: true,
	index: 0,
	projectLineTableData:{
		kind: "bid",
		data: [],
		loading: false,
		form: {}
	},
	ruleForm: {
		Number: null,
		StartTime: "",
		EndTime: "",
		BeginTime: "",
		FinishTime: "",
		ReviewTime: "",
		AutoSwitchState: null,
		ProjectManagerUid: "",
		ProjectLineList: [],
		FilesList: [],
	},
});

const startTimeRule = (rule: any, value: any, callback: any) => {
	switch (rule.field) {
		case 'StartTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value >= state.projectLineTableData.form.EndTime) {
				callback(new Error('报名开始时间应小于报名结束时间'));
			} else {
				callback();
			}
			break;
		case 'EndTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectLineTableData.form.StartTime) {
				callback(new Error('报名结束时间应大于于报名开始时间'));
			} else {
				callback();
			}
			break;
		case 'BeginTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectLineTableData.form.EndTime) {
				callback(new Error('招标开始时间应大于报名结束时间'));
			} else if (value >= state.projectLineTableData.form.FinishTime) {
				callback(new Error('招标开始时间应小于招标结束时间'));
			} else {
				callback();
			}
			break;
		case 'FinishTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectLineTableData.form.BeginTime) {
				callback(new Error('招标结束时间应大于招标开始时间'));
			} else {
				callback();
			}
			break;
		case 'ReviewTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectLineTableData.form.FinishTime) {
				callback(new Error('评选时间应大于招标结束时间'));
			} else {
				callback();
			}
			break;
	}
};

const rules = reactive({
	isShowPage: false,
	StartTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	EndTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	BeginTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	FinishTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	ReviewTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
});
const onBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
		state.httpHeaders=proxy.$getRequestHeaders();
		return true;
	};
//	上传成功
const onSuccessFile = (file: UploadFile) => {
	state.ruleForm.FilesList.push(file.data)
	state.ruleForm.Files = file.data.src
};

//	删除上传文件
const onRemove = () => {
	ElMessageBox.confirm(`确定要删除文件吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		state.FilesList = []
		state.ruleForm.Files = ''
	});
};

// 打开页面
const openPage = (data: Object) => {
	state.ruleForm = data
	// state.FilesList = []
	// state.FilesList.push(data.Files)
	state.projectLineTableData.data = data.ProjectLineList
};

//  传出数据
const getPageData = () => {
	return state.ruleForm
};

//	删除品目
const onDelProjectLine = (index: number) => {
	ElMessageBox.confirm(`确定要删除此参数吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
        state.projectLineTableData.data.splice(index, 1);
	});
};

//	打开品目编辑弹窗
const onProjectLineDialog = async (row: object, index: number) => {
	if (row) {
		state.index = index;
        state.isAdd = false;
		state.projectLineTableData.form = JSON.parse(JSON.stringify(row));
		state.title = t('message.action.edit');
	} else {
        state.isAdd = true;
		state.projectLineTableData.form.Id = "0"
		state.projectLineTableData.form.Kind = "bid"
		state.title = t('message.action.add');
	}
	state.isShowDialog = true;
};

//	关闭品目编辑弹窗
const closeProjectLineDialog = () => {
	state.projectLineTableData.form = {Id: "", Kind: "", No: "", Name: "", Qty: null, Remark: "",}
	state.index = 0
	state.projectLineTableData.loading = false;
	state.isShowDialog = false;
};

//	确定品目
const submitProjectLine = () => {
	if (state.isAdd) {
		state.projectLineTableData.form.Id = "0"
		state.projectLineTableData.form.Kind = "bid"
		state.projectLineTableData.data.push(state.projectLineTableData.form)
	}else{
		state.projectLineTableData.data[state.index] = state.projectLineTableData.form
	}
	closeProjectLineDialog()
};

// 时间格式
const { dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {
});

defineExpose({openPage, getPageData, ...toRefs(state)})
</script>
