<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="480px" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="20">
					<el-col :sm="24" class="mb20">
						<el-form-item label="日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								style="width: 100%"
								type="date"
								placeholder="日期"
								format="YYYY-MM-DD">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" class="mb20">
						<el-form-item label="重量" prop="Weight">
							<el-input-number
								v-model="ruleForm.Weight"
								style="width: 150px"
								:precision="2"
								step="1"
								min="0"
								max="10000">
							</el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'freightLineEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		//文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			// state.FilesList.push(image);
			console.log(state.FilesList);
		};
		const onRemove = (file: UploadFile) => {
			console.log(file);
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};
		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		//显示表格图片
		const showImage = (Files: string) => {
			let fileUrl = '';
			let filList = Files.split(',');
			fileUrl = state.httpsText + filList[0];
			return fileUrl;
		};
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'trade',
				BusinessBillId:"0",
				State:1,
				BillTime: new Date(),
				Weight:0,
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				StartTime: '',
				EndTime:'',
				Kind: 'trade',
			},
			dialogVisible: false,
			truckTypeList: [],
			plateColorList:[],
			energyTypeList:[],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
		});
		const token = Session.get('token');
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			BillTime: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			
		});
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, businessBillId:string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: kind, StartTime: '' };
			try {
				
				state.disable = disable;
				if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.BusinessBillId = businessBillId;
					state.ruleForm.State=1;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.businessBillLine.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				if(!res.data.BeginState){
					res.data.BeginTime=""
				}
				if(!res.data.FinishState){
					res.data.FinishTime=""
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onMainGetTableData();
		};
		//修改按钮
		const onModelEdit = (item: object) => {
			state.tableItem = item;
			console.log(state.tableItem.Files);
			if (state.tableItem.Files != '') {
				state.Files = item.Files.split(',');
				state.FilesList = [];
				for (let i = 0; i < state.Files.length; i++) {
					let image = { url: '' };
					image.url = state.httpsText + state.Files[i];
					state.FilesList.push(image);
				}
			}
			state.saveState = false;
			state.dialogVisible = true;
		};		
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.erp.businessBillLine.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onMainGetTableData();
							proxy.$parent.onChildGetTableData();
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
		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png' &&
				rawFile.type !== 'image/ico' &&
				rawFile.type !== 'image/bmp' &&
				rawFile.type !== 'image/gif' &&
				rawFile.type !== 'image/svg'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			return true;
		};
		const { dateFormatYMD } = commonFunction();
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			onBeforeImageUpload,
			onModelEdit,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		Plus,
	},
	data() {
		return {};
	},
	methods: {},
};
</script>
<style scoped lang="scss">
.el-select {
	width: 100%;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	text-align: center;
	padding: 40px;
}
</style>