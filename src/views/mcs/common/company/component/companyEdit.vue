<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="40%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20"
						><el-form-item label="客户名称：" prop="CompanyName">
							<el-input
								v-model="ruleForm.CompanyName"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="证件号码：" prop="Idno">
							<el-input
								v-model="ruleForm.Idno"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="经营范围：" prop="BusinessScope">
							<el-input
								v-model="ruleForm.BusinessScope"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="经营起始日期：" prop="BusinessStartTime">
							<el-date-picker
								v-model="ruleForm.BusinessStartTime"
								style="width: 100%"
								type="date"
								placeholder="选择时间"
								format="YYYY-MM-DD">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="简称：" prop="CompanyAlias">
							<el-input
								v-model="ruleForm.CompanyAlias"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="地址：" prop="Address">
							<el-input
								v-model="ruleForm.Address"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="纳税人类型：" prop="TaxpayerKind">
							<el-input
								v-model="ruleForm.TaxpayerKind"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="经营结束日期" prop="BusinessEndTime">
							<el-date-picker
								v-model="ruleForm.BusinessEndTime"
								style="width: 100%"
								type="date"
								placeholder="选择时间"
								format="YYYY-MM-DD">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">扩展信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="网站：" prop="WebSite">
							<el-input
								v-model="ruleForm.WebSite"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="Email：" prop="Email">
							<el-input
								v-model="ruleForm.Email"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="企业邮箱：" prop="Im">
							<el-input
								v-model="ruleForm.Im"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
						<el-form-item label="传真：" prop="Fax">
							<el-input
								v-model="ruleForm.Fax"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">联系人信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="联系人：" prop="Linkman">
							<el-input
								v-model="ruleForm.Linkman"
								style="width: 100%"
								placeholder="请输入">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="电话：" prop="Tel">
							<el-input
								v-model="ruleForm.Tel"
								style="width: 100%"
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
import { Plus } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'companyEdit',
	setup() {

		const store = useStore();
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();

		//	资质表格
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
			//	表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'supplier',
				CompanyName: '',
				CompanyAlias: '',
				CurrencyType: '人民币',
				BankAccountName: '',
				EsNo: '',
				Address: '',
				BusinessEndTime: new Date(),
				BusinessStartTime: new Date(),
				Linkman: '',
				BusinessScope: '',
				State: 1,
				AuditState: 1,
				TaxpayerKind: '',
				WebSite: '',
				Fax: '',
				Im: '',
				CompanyCategoryList: [],
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				StartTime: '',
				EndTime:'',
				Kind: 'bpp',
			},
			dialogVisible: false,
			//	供应商类型
			industryList: [],
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
			CompanyName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Idno: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			BusinessStartTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			BusinessEndTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		const categoryRules = reactive({
			Name: [
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
					trigger: 'change',
				},
			],
			StartTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			EndTime: [
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
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: kind, StartTime: '' };
			try {
				const res = await proxy.$api.common.category.getConcreteDataList('industry', 0, 2, { pageNum: 1, pageSize: 10000 });
				if (res.errcode != 0) {
					return;
				}
				state.industryList = res.data;
				state.disable = disable;
				if (id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.company.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				tableData.data = res.data.CompanyCategoryList;
			} finally {
				state.isShowDialog = true;
			}
		};
		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			console.log('关闭页面表单', state.ruleForm);
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};

		//	新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.CompanyCategoryList = tableData.data;
					try {
						const res = await proxy.$api.erp.company.save(state.ruleForm);
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
			tableData,
			categoryRules,
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