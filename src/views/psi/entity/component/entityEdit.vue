<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="40%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="单位名称" prop="Name">
							<el-input
								v-model="ruleForm.Name"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="单位编码" prop="Code">
							<el-input
								v-model="ruleForm.Code"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="所属类别" prop="CategoryId">
							<el-tree-select
								v-model="ruleForm.CategoryId"
								placeholder="请选择所属类别"
								default-expand-all
								node-key="Id"
								:value-key="Id"
								:current-node-key="ruleForm.CategoryId"
								:data="categoryList"
								:props="{ label: 'Name', value: 'Id', children: 'Children' }"
								check-strictly
							/>
						</el-form-item>
						
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="状态" prop="State">
							<el-switch
								v-model="ruleForm.State"
								inline-prompt
								width="50"
								active-text="启用"
								inactive-text="禁用"
								:active-value="1"
								:inactive-value="0"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="助记符" prop="Pinyin">
							<el-input
								v-model="ruleForm.Pinyin"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="别名" prop="Alias">
							<el-input
								v-model="ruleForm.Alias"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">

					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">	
						<el-form-item label="备注" prop="Remark" >
							<el-input
								v-model="ruleForm.Remark"
								:rows="3"
								type="textarea"
								placeholder="请输入"/>
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
		<el-dialog v-model="ImageVisible">
			<img class="dialog-image" w-full :src="dialogImageUrl" alt="Preview Image" />
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
	name: 'productEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		//	文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
		};

		const onRemove = (file: UploadFile) => {
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};

		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		//	显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url!
			state.ImageVisible = true
		}
		
		const tableData = reactive({
			data: [],
			loading: false,
			param: {
				pageNum: 1,
				pageSize: 10000,
			},
		});
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			dialogImageUrl: "",
			ImageVisible: false,
			//	表单
			ruleForm: {
				Id: '0',				
				Kind: 'info',
				Name: '',
				Code:'',
				Pinyin:'',
				State:1,
				Pics:'',
				CategoryId:'0',
			},
			dialogVisible: false,
			categoryList:[],
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
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Code: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CategoryId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			]
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, categoryList:any,categoryId:string, disable: boolean) => {
			state.Files = [];
			state.ruleForm.Kind = kind;
			state.ruleForm.CategoryId = categoryId;
			state.categoryList = categoryList;
			try {
				state.disable = disable;
				if (disable) {
					state.title = t('message.action.see');
					getByIdRow(id);
				} else if (id && id != '0') {
					getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = '0';
					state.ruleForm.State=1;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.psi.entity.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};

		//	预览文件
		const onPreview = (uploadFile: any) => {
			//	当格式为图片就预览图片，否则下载文件
			let filename = uploadFile.name;
			if (!uploadFile.name || uploadFile.name == '') {
				filename = uploadFile.url;
			}
			let fileurl = uploadFile.url;
			let fileExtension = '';
			//	校检文件类型
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
				//	预览图片
				state.dialogImageUrl[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
			} else {
				//	下载文件
				state.dialogVisible = false;
				window.open(fileurl, '_self');
			}
		};

		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					if (state.Files) {
						state.ruleForm.Pics = state.Files.join(',');
					}
					try {
						const res = await proxy.$api.psi.entity.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetTableData();
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

		//	页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			getByIdRow,
			onSuccessFile,
			onPreview,
			onRemove,
			onBeforeImageUpload,
			showImage,
			dateFormatYMD,
			getUserInfos,
			tableData,
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
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>