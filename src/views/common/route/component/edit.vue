<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="540px" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" v-loading="loading" :disabled="disable">
				<el-form-item label="发货地" prop="OriginSiteName">
					<el-input placeholder="发货地" v-model="ruleForm.OriginSiteName"> </el-input>
				</el-form-item>
				<el-form-item label="收货地" prop="DestinationSiteName">
					<el-input placeholder="收货地" v-model="ruleForm.DestinationSiteName"> </el-input>
				</el-form-item>
				<el-form-item label="排序" prop="Order">
					<el-input-number type="number" :min="0" :step="10" placeholder="排序" v-model="ruleForm.Order"> </el-input-number>
					<p title="" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>值小的靠前显示</span></p>
				</el-form-item>
				<el-form-item label="备注" prop="Remark">
					<el-input placeholder="备注" v-model="ruleForm.Remark"> </el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'Edit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: 0,
				Kind: 'route',
				OriginSiteName: '',
				State:1,
				DestinationSiteName:'',
				Order:100
			},
			disable: false, //是否隐藏
		});
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			OriginSiteName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DestinationSiteName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			if (id && id != '0') {
				const res = await proxy.$api.common.route.getById(id)
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.ruleForm.OriginSiteName='';
				state.ruleForm.DestinationSiteName='';
				state.ruleForm.State=1;
				state.ruleForm.Order=100;
				state.title = t('message.action.add');
			}

			state.ruleForm.Kind = kind;
			state.isShowDialog = true;
			state.disable = disable;
		};
		
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			console.log(state.ruleForm);
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				console.log(valid);
				if (valid) {
					// state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = parseInt(state.ruleForm.Order);
					const res = await proxy.$api.common.route.save(state.ruleForm)
					if (res.errcode == 0) {
						if (isCloseDlg) {
							closeDialog();
						} else {
							proxy.$refs.ruleFormRef.resetFields();
							state.ruleForm.Id = 0;
						}
					}
				} 
				return false;
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
