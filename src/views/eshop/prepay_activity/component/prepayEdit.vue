<template>
	<div class="cms-edit-article-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
				<el-row>
					<el-col :sm="24" :md="12">
						<el-form-item label="活动名称" prop="ActName">
							<el-input v-model.trim="ruleForm.ActName" autofocus placeholder="请输入活动名称" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12">
						<el-form-item :label="'有效时间'">
							<el-date-picker
								v-model="timeList"
								type="datetimerange"
								:shortcuts="shortcuts"
								range-separator="到"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
								format="YYYY-MM-DD HH:mm"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="mt20">
					<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-if="ruleForm.ActMode != 10">
						<el-form-item label="售价" prop="PayAmount">
							<el-input-number v-model.number="ruleForm.PayAmount" :precision="2" :step="1" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
						<el-form-item :label="ruleForm.ActType == 0 ? '面值' : '上账'" prop="Amount" v-if="ruleForm.ActMode == 0">
							<el-input-number v-model.number="ruleForm.Amount" :precision="0" :step="1" :min="0" />
						</el-form-item>
						<el-form-item
							:label="
								ruleForm.ActType == 1 ? '兑换积分' : ruleForm.ActType == 2 || ruleForm.ActType == 13 || ruleForm.ActType == 15 ? '金币数量' : ''
							"
							prop="Point"
							v-else-if="ruleForm.ActMode != 0"
						>
							<el-input-number v-model.number="ruleForm.Point" :precision="0" :step="1" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-if="ruleForm.ActType >= 10">
						<el-form-item :label="timeName(ruleForm.ActType)" prop="Qty">
							<el-input-number v-model.number="ruleForm.Qty" :step="1" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
						<el-form-item label="排序" prop="State">
							<el-input-number v-model.number="ruleForm.Order" :precision="0" :step="10" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
						<el-form-item label="状态" prop="State">
							<el-switch
								v-model.number="ruleForm.State"
								:width="50"
								inline-prompt
								:active-text="$t('message.action.enable')"
								:inactive-text="$t('message.action.disable')"
								:active-value="1"
								:inactive-value="0"
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="活动图片" class="mt20" prop="ActImg">
					<el-input v-model="ruleForm.ActImg" placeholder="上传或输入" maxlength="255" clearable></el-input>
					<div class="mt10" style="border: 1px gray dashed">
						<el-upload
							class="avatar-uploader"
							:action="`${baseUrl}/v1/file/upload`"
							name="file"
							:headers="{ Appid: getUserInfos.appid, Authorization: token }"
							:show-file-list="false"
							:on-success="onImageUploadSuccess"
							:before-upload="onBeforeImageUpload"
						>
							<img v-if="ruleForm.ActImg" :src="proxy.$utils.staticUrlParse(ruleForm.ActImg)" width="150" height="150" class="avatar" />
							<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon" />
						</el-upload>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" v-auth:[$parent.moduleKey]="'btn.Add'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button type="primary" @click="onSubmit(true)" :loading="loading" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance, computed } from 'vue';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { formatDate } from '/@/utils/formatTime';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { Session } from '/@/utils/storage';
import { useStore } from '/@/store/index';
export default {
	name: 'basePrepayAmountEdit',
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
			timeList: [dayjs(new Date()), dayjs(new Date()).add(1, 'year')],
			ruleForm: {},
		});

		const rules = reactive({
			ActName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 100,
					message: t('message.validRule.lengthRange', { min: 1, max: 100 }),
					trigger: 'change',
				},
			],
		});

		// 打开弹窗
		const openDialog = (row: Object, cateList: any) => {
			state.loading = false;
			const model = JSON.parse(JSON.stringify(row));
			state.ruleForm = model;
			state.cateList = cateList;
			if (row && row.Id > 0) {
				state.title = t('message.action.edit');
			} else {
				state.title = t('message.action.add');
				state.ruleForm.Id = '0';
				state.ruleForm.State = 1;
				state.ruleForm.Order = 100;
				state.ruleForm.StartTime = dayjs(new Date());
				state.ruleForm.EndTime = dayjs(new Date()).add(1, 'year');
			}
			state.timeList = [dayjs(state.ruleForm.StartTime), dayjs(state.ruleForm.EndTime)];
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
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.StartTime = state.timeList[0];
					state.ruleForm.EndTime = state.timeList[1];
					if (state.ruleForm.PayPoint <= 0) {
						state.ruleForm.PayPoint = state.ruleForm.Point;
					}
					if (state.ruleForm.ActType >= 10) {
						switch (state.ruleForm.ActType) {
							case 10:
								state.ruleForm.Unit = '时';
								break;
							case 11:
								state.ruleForm.Unit = '天';
								break;
							case 12:
								state.ruleForm.Unit = '周';
								break;
							case 13:
								state.ruleForm.Unit = '月';
								break;
							case 14:
								state.ruleForm.Unit = '季';
								break;
							case 15:
								state.ruleForm.Unit = '年';
								break;
							default:
								break;
						}
					}
					state.loading = true;
					try {
						const res = await proxy.$api.eshop.prepay_activity.save(state.ruleForm);
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

		const onImageUploadSuccess: UploadProps['onSuccess'] = (res, uploadFile) => {
			console.log('onSuccess:', res);
			if (res.errcode != 0) {
				ElMessage.error(res.errmsg);
				return;
			}
			state.ruleForm.ActImg = res.data.src;
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
		const timeName = (ActType: Number) => {
			let text = '兑换时间';
			switch (ActType) {
				case 10:
					text = text + '(时)';
					break;
				case 11:
					text = text + '(天)';
					break;
				case 12:
					text = text + '(周)';
					break;
				case 13:
					text = text + '(月)';
					break;
				case 14:
					text = text + '(季)';
					break;
				case 15:
					text = text + '(年)';
					break;

				default:
					break;
			}
			return text;
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
			timeName,
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