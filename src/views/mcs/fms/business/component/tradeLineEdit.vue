<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="20%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
						<el-form-item label="日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								type="date"
								placeholder="日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
						<el-form-item label="重量" prop="Weight">
							<el-input-number
								v-model="ruleForm.Weight"
								:precision="2"
								step="1"
								min="0"
								max="10000" /> 
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
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'tradeLineEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
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
		
		//	打开弹窗
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

		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onMainGetTableData();
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.BusinessBillType=2; //1：计划，2：生产
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

		const { dateFormatYMD } = commonFunction();

		//	页面加载时
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