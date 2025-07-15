<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="600px">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="120px" v-loading="loading">
				<el-row :gutter="10">
					<el-col :span="24" class="mb20">
						<el-form-item label="专家姓名" prop="Name">
							<el-input v-model="ruleForm.Name" placeholder="请输入" maxlength="32" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="性别" prop="Gender">
							<el-radio-group v-model="ruleForm.Gender">
								<el-radio :label="1" size="large">男</el-radio>
								<el-radio :label="2" size="large">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="专家手机号" prop="Mobile">
							<el-input v-model="ruleForm.Mobile" placeholder="请输入" maxlength="24" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="工作单位/科室" prop="WorkPlace">
							<el-input v-model="ruleForm.WorkPlace" placeholder="请输入" maxlength="50" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="职务" prop="Position">
							<el-input v-model="ruleForm.Position" placeholder="请输入" maxlength="50" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="专家职称" prop="Alias">
							<el-input v-model="ruleForm.Alias" placeholder="请输入" maxlength="50" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="评选范围" prop="Remark">
							<el-input v-model="ruleForm.Remark" placeholder="请输入" maxlength="50" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="通讯地址" prop="Address">
							<el-input v-model="ruleForm.Address" placeholder="请输入" maxlength="50" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="上传签名：" prop="Pics">
							<div style="width: 50%">
								<el-upload
									class="avatar-uploader"
									:action="uploadURL"
									:headers="proxy.$getRequestHeaders()"
									:show-file-list="false"
									:on-progress="onUploadingFile"
									:on-success="onSuccessFile"
								>
									<img v-if="imageUrl" :src="imageUrl" class="avatar" />
									<el-icon v-if="imageUrl" class="avatar-delete-icon" @click.stop="onRemove"><Delete /></el-icon>
									<!-- <span v-if="imageUrl" class="el-upload-list__item-actions">										
										<span  class="el-upload-list__item-delete"
											@click="onRemove"
										>
											<el-icon><Delete /></el-icon>
										</span>
									</span> -->
									<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
								</el-upload>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="info" @click="onCancel">取消</el-button>
					<el-button type="primary" @click="onSubmit(true)" :loading="loading" >确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { Delete, Plus } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
export default {
	name: 'baseUserEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const token = Session.get('token');
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const route = useRoute();
		const store = useStore();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			Pics: [],
			homeBaseUrl: import.meta.env.VITE_URL as any,
			baseUrl: import.meta.env.VITE_API_URL,
			imageUrl: '',
			dialogTitle: '',
			dialogVisible: false,
			PicsList: [],
			token: token,
			ruleForm: {
				Id: 0,
				Username: '', // 账户名称
				Name: '', // 用户昵称
				Code: '',
				Enable: 1,
				Order: 100, // 排序
				Mobile: '',
				Tel: '',
				Email: '',				
				Address: '',
				IsExternal: 1,
				Parentid: '',
				Gender: 0, // 性别
			},
		});

		const rules = reactive({
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 50,
					message: t('message.validRule.lengthRange', { min: 1, max: 50 }),
					trigger: 'change',
				},
			],
			Gender: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Mobile: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (row: Object) => {
			state.loading = false;
			const model = JSON.parse(JSON.stringify(row));
			state.ruleForm = model;
			state.ruleForm.IsExternal=1;
			if (row && row.Id > 0) {
				state.title = t('message.action.edit');
				
			} else {
				state.title = t('message.action.add');
				state.ruleForm.Id = 0;
				state.ruleForm.Enable = 1;
				state.ruleForm.Order = 100;
				state.ruleForm.Pics="";
			}
			if(state.ruleForm.Pics!=""){
				state.imageUrl=state.homeBaseUrl+state.ruleForm.Pics;
			}else{
				state.imageUrl=""
			}
		
			state.isShowDialog = true;
			// //加载角色数据
			// onInitRoleData(row.RoleIds || '');
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = Number.parseInt(state.ruleForm.Order || 0);
					
					state.loading = true;
					console.log(state.ruleForm);
					try {
						const res = await proxy.$api.base.user.save(state.ruleForm);
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
				} else {
					return false;
				}
			});
		};

		const onUploadingFile= (file: UploadFile) => {
			state.loading=true;
		};
		//上传成功
		const onSuccessFile = (file: UploadFile) => {
			state.loading=false;
			state.imageUrl=state.homeBaseUrl + file.data.src
			state.ruleForm.Pics=file.data.src;
		};
		//删除上传文件
		const onRemove = (file: UploadFile) => {
			state.imageUrl=''
			state.ruleForm.Pics=''
		};
		const imgOnClose = () => {
			state.dialogVisible = false;
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
			var imageTypes = ['png', 'jpg', 'jpeg'];
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
				state.imageUrl[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
			} else {
				//下载文件
				state.dialogVisible = false;
				// openWindow(fileurl, { target: "_self" });
				window.open(fileurl, '_self');
			}
		};

		// 页面加载时
		onMounted(() => {
			// initTableData();
		});
		return {
			t,
			openDialog,
			closeDialog,
			getUserInfos,
			onCancel,
			onUploadingFile,
			onSuccessFile,
			imgOnClose,
			onPreview,
			onRemove,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 240px;
  height: 90px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 240px;
  height: 90px;
  text-align: center;
}

.el-icon.avatar-delete-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  text-align: center;
}
</style>