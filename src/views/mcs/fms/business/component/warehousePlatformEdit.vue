<template>
	<div class="system-edit-main-container">
		<el-dialog :title="title" v-model="isShowDialog" width="25%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">平台信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="平台名称" prop="Name">
							<el-input
								v-model="ruleForm.Name"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="面积" prop="Volume">
							<el-input-number
								v-model="ruleForm.Volume"
								:controls="true"
								precision="2"
								placeholder="请输入"
								type="number"
								min="0"
								max="1000000000"
								step="1">
							</el-input-number>
						</el-form-item>
						<el-form-item label="备注" prop="Remark">
							<el-input
								v-model="ruleForm.Remark"
								type="textarea"
								:rows="4"
								placeholder="请输入">
							</el-input>
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
import dayjs from 'dayjs';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {

	name: 'warehousePlatformEdit',

	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();
		
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			//表单
			ruleForm: {
				Id:0,
				Kind:'warehouse_plateform',
				Name:"",
				Volume:0,
				Remark:"",
				SenderPlanTime:new Date(),
				ReceiverPlanTime:new Date(),
				IsExternal:0,
				State:1,
			},
			
			dialogVisible: false,
			saveState: false,
		});

		const token = Session.get('token');

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Name: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			Volume: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {
				state.disable = disable;
				if (id && id != '0' && disable == true) {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else if (id && id != '0' && disable == false){
					GetByIdRow(id);
					state.title = t('message.action.edit');1
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal=0;
					state.ruleForm.SenderPlanTime=new Date()
					state.ruleForm.ReceiverPlanTime=dayjs(new Date()).add(1, 'day')
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.businessBill.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		}

		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};

		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.erp.businessBill.save(state.ruleForm);
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
		

		//时间格式
		const { dateFormatYMD } = commonFunction();


		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			GetByIdRow,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number{
	width: 100%;
}
</style>