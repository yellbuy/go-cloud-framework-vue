<template>
	<div class="cms-edit-article-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :destroy-on-close="true">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
						<el-form-item label="名称" prop="Name">
							<el-input v-model="ruleForm.Name" autofocus placeholder="请输入名称" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="标识" prop="Key">
							<el-input v-model="ruleForm.Key" placeholder="可为空，如填写标识则必须唯一" maxlength="100" clearable></el-input>
						</el-form-item>

						<el-form-item label="父级" prop="Parentid">
							<el-tree-select
								v-model="ruleForm.Parentid"
								placeholder="请选择父级"
								default-expand-all
								node-key="Id"
								:data="cateList"
								:props="{ label: 'Name', value: 'Id', children: 'Children' }"
								check-strictly
							/>
						</el-form-item>
						<!-- <el-form-item prop="State" label="状态">
							<el-radio v-model="ruleForm.State" :label="0">草稿</el-radio>
							<el-radio v-model="ruleForm.State" :label="1">发布</el-radio>
						</el-form-item> -->
						<el-form-item label="排序" prop="Order">
							<el-input-number v-model="ruleForm.Order" :min="0" />
						</el-form-item>
						<el-form-item label="全称" prop="Title">
							<el-input v-model="ruleForm.Title" autofocus placeholder="请输入全称" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="别名" prop="ChildrenTitle">
							<el-input v-model="ruleForm.ChildrenTitle" autofocus placeholder="请输入别名" maxlength="100" clearable></el-input>
						</el-form-item>

						<el-form-item label="封面图" prop="ImgUrl">
							<el-input v-model="ruleForm.ImgUrl" placeholder="上传或输入" maxlength="255" clearable></el-input>
							<div class="mt10" style="border: 1px gray dashed">
								<el-upload
									class="avatar-uploader"
									:action="`${baseUrl}/v1/file/upload`"
									name="file"
									:headers="proxy.$getRequestHeaders()"
									:show-file-list="false"
									:on-success="onImageUploadSuccess"
									:before-upload="onBeforeImageUpload"
								>
									<img v-if="ruleForm.ImgUrl" :src="proxy.$utils.staticUrlParse(ruleForm.ImgUrl)" width="150" height="150" class="avatar" />
									<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon" />
								</el-upload>
							</div>
						</el-form-item>

						<el-form-item label="图标" prop="Icon">
							<el-input v-model="ruleForm.Icon" placeholder="图标类名" maxlength="50" clearable></el-input>
						</el-form-item>

						<el-form-item label="关键字" prop="Keywords">
							<el-input v-model="ruleForm.Keywords" placeholder="关键字" maxlength="50" clearable></el-input>
						</el-form-item>

						<el-form-item label="描述" prop="Description">
							<el-input
								v-model="ruleForm.Description"
								placeholder="描述"
								maxlength="255"
								clearable
								type="textarea"
								:autosize="{ minRows: 3, maxRows: 6 }"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
						<vue-ueditor-wrap
							:editor-id="`editor-category-content`"
							:editor-dependencies="['ueditor.config.js', 'ueditor.all.min.js', 'xiumi/xiumi-ue-dialog-v5.js', 'xiumi/xiumi-ue-v5.css']"
							v-model="ruleForm.Content"
							:config="{
								UEDITOR_HOME_URL: '/ueditor/',
								serverUrl: `${baseUrl}/v1/common/editor/${getUserInfos.appid}`,
								headers: { Authorization: token, Appid: getUserInfos.appid },
							}"
						></vue-ueditor-wrap>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" v-auth:[$parent.moduleKey]="'btn.CategoryAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button
						type="primary"
						@click="onSubmit(true)"
						:loading="loading"
						v-auths:[$parent.moduleKey]="['btn.CategoryEdit', 'btn.CategoryAdd']"
						>{{ $t('message.action.save') }}</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
export default {
	name: 'baseUserEdit',
	props: {
		allowEditCategory: { type: Boolean, default: true },
		allowEditSpecial: { type: Boolean, default: true },
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const token = Session.get('token');
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			token: token,
			baseUrl: import.meta.env.VITE_API_URL,
			cateList: [],
			ruleForm: {},
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
			Parentid: [{ required: true, message: t('message.validRule.required'), trigger: 'blur' }],
		});

		// 打开弹窗
		const openDialog = (row: Object, cateList: any) => {
			state.loading = false;
			const model = JSON.parse(JSON.stringify(row));
			state.ruleForm = model;
			state.cateList = [{ Id: '0', Name: '---顶级---' }].concat(cateList);
			if (row && row.Id > 0) {
				state.title = t('message.action.edit');
			} else {
				state.title = t('message.action.add');
				state.ruleForm.Id = 0;
				state.ruleForm.State = 1;
				state.ruleForm.Order = 50;
			}
			state.isShowDialog = true;
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
					if (state.ruleForm.Parentid > 0 && state.ruleForm.Id == state.ruleForm.Parentid) {
						ElMessage.error('所属父级不能为自身');
						return;
					}
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = Number.parseInt(state.ruleForm.Order || 0);
					// if(!state.ruleForm.Description){
					// 	//未填入主题，截取正文纯文本
					// 	var ue = window.UE.getEditor('editor-content');
					// 	state.ruleForm.Description=ue.getContentTxt().substr(0,255);
					// }
					state.loading = true;
					try {
						const res = await proxy.$api.common.category.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetMainTableData();
						}
					} finally {
						state.loading = false;
					}
				} else {
					return false;
				}
			});
		};

		const onImageUploadSuccess: UploadProps['onSuccess'] = (res, uploadFile) => {
			console.log('onSuccess:', res);
			if (res.errcode != 0) {
				ElMessage.error(res.errmsg);
				return;
			}
			state.ruleForm.ImgUrl = res.data.src;
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
		// 页面加载时
		onMounted(() => {
			//initTableData();
		});
		return {
			t,
			proxy,
			openDialog,
			closeDialog,
			onCancel,
			getUserInfos,
			rules,
			onImageUploadSuccess,
			onBeforeImageUpload,
			onSubmit,
			...toRefs(state),
		};
	},
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