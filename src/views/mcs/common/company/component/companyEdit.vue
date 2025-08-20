<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="客户名称" prop="CompanyName">
							<el-input
								v-model="ruleForm.CompanyName"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="证件号码" prop="Idno">
							<el-input
								v-model="ruleForm.Idno"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="简称" prop="CompanyAlias">
							<el-input
								v-model="ruleForm.CompanyAlias"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="地址" prop="Address">
							<el-input
								v-model="ruleForm.Address"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="注册资金" prop="RegisteredCapital">
							<el-input-number style="width:180px;"
								v-model="ruleForm.RegisteredCapital"
								min="0"
								step="10"
								max="100000000"
								placeholder="请输入" > 
								<template #prefix>
									<span>￥</span>
								</template>
								<template #suffix>
									<span>万元</span>
								</template>
								</el-input-number>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="纳税人类型" prop="TaxpayerKind">
							<el-input
								v-model="ruleForm.TaxpayerKind"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="开户行" prop="BankName">
							<el-input
								v-model="ruleForm.BankName"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="开户行账号" prop="BankNo">
							<el-input
								v-model="ruleForm.BankNo"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="证件有效起始日期" prop="BusinessStartTime">
							<el-date-picker
								v-model="ruleForm.BusinessStartTime"
								type="date"
								placeholder="选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="证件有效到期日期" prop="BusinessEndTime">
							<el-date-picker
								v-model="ruleForm.BusinessEndTime"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
						<el-form-item label="经营范围" prop="BusinessScope">
							<el-input
								v-model="ruleForm.BusinessScope"
								:rows="3"
    							type="textarea"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">资质照片*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="16" :sm="16" :md="16" :lg="16" :offset="2"  class="mb12">
						<div >
							<imageUpload :uploadUrl="`/v1/file/upload/company`" list-type="picture-card"
								@on-image-change="onPicChange" :ids="ruleForm.Pics" :limit="30">
								<template #default>
									<el-icon>
										<plus />
									</el-icon>
								</template>
							</imageUpload>
						</div>
					</el-col>
				</el-row>
				<el-divider content-position="left">扩展信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="企业邮箱" prop="Im">
							<el-input
								v-model="ruleForm.Im"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="传真" prop="Fax">
							<el-input
								v-model="ruleForm.Fax"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="Email" prop="Email">
							<el-input
								v-model="ruleForm.Email"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="网站" prop="WebSite">
							<el-input
								v-model="ruleForm.WebSite"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">联系人信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="联系人" prop="Linkman">
							<el-input
								v-model="ruleForm.Linkman"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="电话：" prop="Tel">
							<el-input
								v-model="ruleForm.Tel"
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
import { Plus } from '@element-plus/icons-vue';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import imageUpload from '/@/components/imageUpload/index.vue';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'companyEdit',
	components: { imageUpload,Plus },
	setup() {

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
				BankName:'',
				BankNo:'',
				WebSite: '',
				Fax: '',
				Im: '',
				Pics:'',
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

		//	打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
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
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};
		const onPicChange= (picIds:String,fileList:any)=>{
			state.ruleForm.Pics=picIds;
			console.log('onPicChange:',state.ruleForm.Pics, fileList)
		}

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
			onPicChange,
			tableData,
			categoryRules,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
	data() {
		return {};
	},
	methods: {},
};
</script>
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>