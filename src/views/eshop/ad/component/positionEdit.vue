<template>
	<div class="eshop-edit-position-container">
		<el-dialog :title="title" v-model="isShowDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-form-item label="名称" prop="PositionName">
							<el-input v-model="ruleForm.PositionName" autofocus placeholder="请输入名称" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="宽度" prop="AdWidth">
							<el-input-number v-model="ruleForm.AdWidth" :min="0"  :step="10"/>
						</el-form-item>
						<el-form-item label="高度" prop="AdHeight">
							<el-input-number v-model="ruleForm.AdHeight" :min="0"  :step="10"/>
						</el-form-item>
						<el-form-item label="风格" prop="PositionStyle">
							<el-input v-model="ruleForm.PositionStyle" placeholder="请输入风格名称" maxlength="36" clearable></el-input>
						</el-form-item>
						<!-- <el-form-item prop="State" label="状态">
							<el-radio v-model="ruleForm.State" :label="0">草稿</el-radio>
							<el-radio v-model="ruleForm.State" :label="1">发布</el-radio>
						</el-form-item> -->
						<el-form-item label="排序" prop="Order">
							<el-input-number v-model="ruleForm.Order" :min="0" :step="10" />
						</el-form-item>
						

						<el-form-item label="描述" prop="PositionDesc">
							<el-input
								v-model="ruleForm.PositionDesc"
								placeholder="描述"
								maxlength="255"
								clearable
								type="textarea"
								:autosize="{ minRows: 3, maxRows: 6 }"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" v-auth:[$parent.moduleKey]="'btn.PositionAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button
						type="primary"
						@click="onSubmit(true)"
						:loading="loading"
						v-auths:[$parent.moduleKey]="['btn.PositionEdit', 'btn.PositionAdd']"
						>{{ $t('message.action.save') }}</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance, computed } from 'vue';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { Session } from '/@/utils/storage';
import { useStore } from '/@/store/index';
export default {
	name: 'eshopAdPositionEdit',
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
			PositionName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 100,
					message: t('message.validRule.lengthRange', { min: 1, max: 50 }),
					trigger: 'change',
				},
			],
			AdWidth: [{
				required: true,
				message: t('message.validRule.required'),
				trigger: 'blur',
			}],
			AdHeight: [{
				required: true,
				message: t('message.validRule.required'),
				trigger: 'blur',
			}],
			Order: [{
				required: true,
				message: t('message.validRule.required'),
				trigger: 'blur',
			}],
		});

		// 打开弹窗
		const openDialog = (row: Object, cateList: any) => {
			state.loading = false;
			const model = JSON.parse(JSON.stringify(row));
			state.ruleForm = model;
			if (row && row.Id > 0) {
				state.title = t('message.action.edit');
			} else {
				state.title = t('message.action.add');
				state.ruleForm.Id = 0;
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
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = Number.parseInt(state.ruleForm.Order || 0);
					// if(!state.ruleForm.Description){
					// 	//未填入主题，截取正文纯文本
					// 	var ue = window.UE.getEditor('editor-content');
					// 	state.ruleForm.Description=ue.getContentTxt().substr(0,255);
					// }
					state.loading = true;
					try {
						const res = await proxy.$api.eshop.adPosition.save(state.ruleForm);
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
</style>