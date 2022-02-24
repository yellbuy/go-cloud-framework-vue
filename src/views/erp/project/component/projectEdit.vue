<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="onCancel">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="发布项目" name="project">
					<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
						<el-form-item label="项目编号" prop="No">
							<el-input v-model="ruleForm.No"></el-input>
						</el-form-item>
						<el-form-item label="项目名称" prop="Name">
							<el-input v-model="ruleForm.Name"></el-input>
						</el-form-item>
						<el-form-item label="项目方式" prop="ProjectType">
							<el-input v-model="ruleForm.ProjectType"></el-input>
						</el-form-item>
						<el-form-item label="视频会议" prop="RemoteState">
							<el-switch v-model="ruleForm.RemoteState" active-text="开启" inactive-text="关闭" active-value="0" inactive-value="1" />
						</el-form-item>
						<el-form-item label="标书费用" prop="BidFee">
							<el-input-number v-model="ruleForm.BidFee" :min="0" controls-position="right" precision="2" />
						</el-form-item>
						<el-form-item label="评选地点" prop="Location">
							<el-input v-model="ruleForm.Location"></el-input>
						</el-form-item>
						<el-form-item label="项目内容" prop="content">
							<el-input v-model="ruleForm.content"></el-input>
						</el-form-item>
						<el-form-item label="项目附件" prop="Files">
							<el-upload
								class="upload-demo"
								:action="uploadURL"
								:headers="{ Appid: 158625451365892097, Authorization: token }"
								:on-success="onSuccessFile"
								:file-list="FilesList"
								:on-remove="onRemove"
							>
								<el-button :icon="Upload">上传</el-button>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="评审" name="review"></el-tab-pane>
			</el-tabs>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.BidProjectEdit', 'btn.BidProjectAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type';
import { Session } from '/@/utils/storage';
export default {
	name: 'projectEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const activeName = ref('project');
		const onSuccessFile = (file: UploadFile) => {
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			state.FilesList.push(image);
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
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: 0,
				Kind: 'zgps',
				Name: '',
				Ext: '',
				Value: '',
				Code: '',
			},
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
			Ext: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Value: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (id: string, Type: string) => {
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			state.ruleForm.Type = Type;
			state.isShowDialog = true;
		};
		const GetByIdRow = (Id: string) => {
			const url = `/v1/common/commondata/${Id}`;
			request({
				url: url,
				method: 'get',
			})
				.then((res) => {
					if (res.errcode == 0) {
						state.ruleForm = res.data;
					} else {
						ElMessage.warning(res.errmsg);
					}
				})
				.catch((err) => {});
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};
		// 取消
		const onCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.ruleForm.Value = '';
			state.loading = false;
			state.isShowDialog = false;
		};
		const onLoadTable = () => {
			if (state.ruleForm.Type == 'zgps') {
				proxy.$parent.onGetZgTableData();
			} else if (state.ruleForm.Type == 'jsps') {
				proxy.$parent.onGetJsTableData();
			}
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				if (valid) {
					state.loading = true;
					const url = state.ruleForm.Id > 0 ? `/v1/common/commondata/${state.ruleForm.Id}` : `/v1/common/commondata`;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Code = state.ruleForm.Name;
					if (state.ruleForm.Type == 'zgps') {
						state.ruleForm.Value = '1';
					}
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					})
						.then((res) => {
							state.loading = false;
							if (res.errcode == 0) {
								if (isCloseDlg) {
									closeDialog();
								} else {
									proxy.$refs.ruleFormRef.resetFields();
									state.ruleForm.Id = 0;
								}
							}
						})
						.catch(() => {
							state.loading = false;
						});
					return false;
				} else {
					return false;
				}
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			t,
			openDialog,
			closeDialog,
			onCancel,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			rules,
			activeName,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		Upload,
	},
};
</script>
