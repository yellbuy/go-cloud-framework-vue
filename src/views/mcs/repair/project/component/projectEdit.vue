<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="40%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="项目名称" prop="Name">
							<el-input
								v-model="ruleForm.Name"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="项目编号" prop="No">
							<el-input
								v-model="ruleForm.No"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="预估工时" prop="Qty">
							<el-input-number
								v-model.number="ruleForm.Qty"
								placeholder="请输入"
								:controls="true"
								precision="0"
								min="0"
								max="1000000000"
								step="1"
								oninput="this.value = this.value.replace(/[^0-9]/g, '')" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="工时单价" prop="Price">
							<el-input-number
								v-model="ruleForm.Price"
								placeholder="请输入"
								:controls="true"
								precision="2"
								min="0"
								max="1000000000"
								step="1"
								oninput="this.value = this.value.replace(/[^0-9]/g, '')" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="是否启用" prop="No">
							<el-switch
								v-model="ruleForm.State"
								:active-icon="Check"
								:inactive-icon="Close"
								:active-value="1"
								:inactive-value="0"
								inline-prompt />				
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
						<el-form-item label="服务内容" prop="Content" >
							<el-input
								v-model="ruleForm.Content"
								:rows="3"
								type="textarea"
								placeholder="请输入" />
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
								placeholder="请输入" />
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
import { Check, Close, Plus } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'projectEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
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
			//	表单
			ruleForm: {
				Id: '0',				
				Kind: 'repair',
				Name: '',
				No: '',
				Qty: 0,
				Price: 0,
				Content:"",
				Remark: '',
				State:1,
			},
			tableItem: {
				Id: '0',				
				Kind: 'repair',
				Name: '',
				No: '',
				Qty: 0,
				Price: 0,
				Content:"",
				Remark: '',
			},
			vehicleTypeList: [],
			brandList: [],
			Files: [],
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
			No: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Qty: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			]
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', No: '', Name: '', Files: '', Kind: kind, Content: '' };
			try {
				const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_type', 0, 2);
				if (resTruckTypes.errcode == 0) {
					state.vehicleTypeList = resTruckTypes.data;
				}else{
					console.log("error:",resTruckTypes.errmsg)
				}
				const resBrands = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_brand', 0, 2);
				if (resBrands.errcode == 0) {
					state.brandList = resBrands.data;
				}else{
					console.log("error:",resBrands.errmsg)
				}
				state.disable = disable;
				if (id && id != '0') {
					getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal=0;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				if(res.data.EndTime < '2000-01-01'){
					res.data.EndTime='';
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};

		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData(true);
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.erp.project.save(state.ruleForm);
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
		
		//	时间格式
		const { dateFormatYMD } = commonFunction();

		//	页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			getByIdRow,
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
.el-select .el-date-picker .el-input .el-input-number{
	width: 100%;
}
</style>