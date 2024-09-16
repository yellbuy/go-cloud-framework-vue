<template>
	<div>
		<el-row>
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-suffix="：" size="small" label-width="120px" v-loading="loading">
				<el-row>
					<el-col :span="24">
						<div style="text-align: center;font-size: 25px; padding-bottom: 15px;">
							<h>发布中标公告</h>
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="比选编号" prop="No">
							<el-input v-model="ruleForm.No"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="公告名称" prop="Name">
							<el-input v-model="ruleForm.Name"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="公示截止时间" prop="Location">
							<el-date-picker v-model="ruleForm.Location" type="datetime" placeholder="请选择时间"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="中标公告" prop="Content">
							<vue-ueditor-wrap
								:editor-id="`editor-content`"
								:editor-dependencies="['ueditor.config.js', 'ueditor.all.min.js', 'xiumi/xiumi-ue-dialog-v5.js', 'xiumi/xiumi-ue-v5.css']"
								v-model="ruleForm.Content"
								style=" z-index: 1"
								:config="{
									UEDITOR_HOME_URL: '/ueditor/',
									serverUrl: `${baseUrl}/v1/common/editor/${getUserInfos.appid}`,
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

<script lang="ts">
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
export default {
	name: 'projectEdit',
	components: { Upload },
	setup() {
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
			No: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Sn: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			ProjectType: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Content: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			StartTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			EndTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			BeginTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			FinishTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			ReviewTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
		});
		//上传成功
		const onSuccessFile = (file: UploadFile) => {
			state.Files.push(file.data.src);
			const imgPath = { url: state.homeBaseUrl + file.data.src };
			state.FilesList.push(imgPath);
		};
		//删除上传文件
		const onRemove = (file: UploadFile) => {
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.FilesList.length; i++) {
				if (state.FilesList[i] == removeUrl) {
					state.FilesList.splice(i, 1);
					break;
				}
			}
		};
		const imgOnClose = () => {
			state.dialogVisible = false;
		};
		const getScore = () => {
			if (state.jsTableData.data && state.jsTableData.data.length > 0) {
				state.jjForm.TechnicalScore = 0;
				for (let item of state.jsTableData.data) {
					state.jjForm.TechnicalScore += item.TechnicalMaxScore;
				}
				state.jjForm.TechnicalMaxScore = 100 - state.jjForm.TechnicalScore;
			}
		};
		//预览文件
		const onPreview = (uploadFile: any) => {
			// 当格式为图片就预览图片，否则下载文件
			let filename = uploadFile.name;
			if (!uploadFile.name || uploadFile.name == '') {
				filename = uploadFile.url;
			}
			let fileurl = uploadFile.url;
			let fileExtension = '';
			// 校检文件类型
			var imageTypes = ['png', 'jpg', 'jpeg', 'gif'];
			if (filename.lastIndexOf('.') > -1) {
				fileExtension = filename.slice(filename.lastIndexOf('.') + 1);
			}
			const isTypeOk = imageTypes.some((type) => {
				if (fileExtension && fileExtension.indexOf(type) > -1) {
					return true;
				}
			});
			if (isTypeOk) {
				//预览图片
				state.dialogImageUrl[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
			} else {
				//下载文件
				state.dialogVisible = false;
				// openWindow(fileurl, { target: "_self" });
				window.open(fileurl, '_self');
			}
		};

		//修改按钮
		const onModelEdit = (isadd: boolean, item: object, index: object) => {
			lineEditDlgRef.value.openDialog(item, isadd, index);
		};
		// 打开页面
		const openPage = async (id: string) => {
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			// state.ruleForm.Kind = kind;
			state.isShowPage = true
		};
		const GetByIdRow = async (id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(id);
				if (res.errcode != 0) {
					return;
				}
				console.log(res);
				// if (res.data.ProjectLineList) {
				// 	state.tableData.data = res.data.ProjectLineList;
				// }
				state.ruleForm = JSON.parse(JSON.stringify(res.data));
				if (state.ruleForm.Files != '') {
					state.Files = res.data.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < state.Files.length; i++) {
						let image = { url: '', name: '' };
						image.url = state.homeBaseUrl + state.Files[i];
						image.name = state.homeBaseUrl + state.Files[i];
						state.FilesList.push(image);
					}
				}
				if (state.ruleForm.ProjectSettingLineList) {
					for (let item of state.ruleForm.ProjectSettingLineList) {
						if (item.Kind == 'zgps') {
							state.zgTableData.data.push(item);
						} else if (item.Kind == 'jsps') {
							state.jsTableData.data.push(item);
						} else if (item.Kind == 'jjps') {
							state.jjForm = item;
						}
					}
				}

				// 计算得分
				getScore();
			} finally {
				state.isShowPage = true
			}
		};
		// 取消
		const onCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.FilesList = [];
			state.Files = [];
			// state.tableData.data = [];
			state.jsTableData.data = [];
			state.zgTableData.data = [];
			state.isShowPage = false
		};
		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
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
							onLoadTable();
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
		//删除
		// const onModelDel = (index: number, Id: number) => {
		// 	ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
		// 		confirmButtonText: '确认',
		// 		cancelButtonText: '取消',
		// 		type: 'warning',
		// 	}).then(async () => {
		// 		if (Id == 0) {
		// 			state.tableData.data.splice(index, 1);
		// 		} else {
		// 			try {
		// 				const res = await proxy.$api.erp.projectline.delete(Id);
		// 				if (res.errcode == 0) {
		// 					state.tableData.loading = false;
		// 				}
		// 			} finally {
		// 				state.tableData.loading = false;
		// 			}
		// 		}

		// 		return false;
		// 	});
		// };
		const onModelLineDel = (kind: string, index: number, Id: number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				if (Id == 0) {
					if (kind == 'jsps') {
						state.jsTableData.data.splice(index, 1);
						getScore();
					} else if (kind == 'zgps') {
						state.zgTableData.data.splice(index, 1);
					}
				} else {
					try {
						const res = await proxy.$api.erp.projectsettingline.delete(Id);
						if (res.errcode == 0) {
							if (kind == 'jsps') {
								state.jsTableData.data.splice(index, 1);
								getScore();
							} else if (kind == 'zgps') {
								state.zgTableData.data.splice(index, 1);
							}
						}
					} finally {
						return false;
					}
				}
			});
		};

		const onGetCompanyData = async () => {
			let param = {
				current: 1,
				pageSize: 10000,
			};
			try {
				const res = await proxy.$api.base.tenant.getList(param);
				if (res.errcode != 0) {
					return;
				}
				state.companyOption = res.data;
			} finally {
			}
		};
		// 页面渲染开关改变
		const onIsShowPageChange = async (val: boolean) => {
    		if (val===true){
				state.isShowPage = true
			} else if (val===false) {
				state.isShowPage = false
			} else {
				console.error('输入的参数不是布尔类型，请输入正确的布尔值');
				return;
			}
		};
		// 页面加载时
		onMounted(() => {
			// onGetCompanyData();
		});
		return {
			proxy,
			onIsShowPageChange,
			t,
			openPage,
			onCancel,
			onLoadTable,
			GetByIdRow,
			onPreview,
			onSuccessFile,
			onRemove,
			imgOnClose,
			onGetCompanyData,
			// onModelDel,
			onModelEdit,
			rules,
			lineEditDlgRef,
			getUserInfos,
			onModelLineDel,
			getScore,
			startTimeRule,
			...toRefs(state),
		};
	},
};
</script>
