<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="45%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="姓名" prop="Name" required>
							<el-input
								v-model="ruleForm.Name"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
						<el-form-item label="手机号码" prop="Mobile" required>
							<el-input
								v-model="ruleForm.Mobile"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
						<el-form-item label="身份证号码" prop="Idno" required>
							<el-input
								v-model="ruleForm.Idno"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
						<el-form-item label="民族" prop="Nation">
							<el-select
								v-model="ruleForm.Nation"
								style="width: 100%"
								filterable="true"
								default-first-option="true"
								:reserve-keyword="false"
								placeholder="请选择">
								<el-option v-for="(item,index) in NationList" :key="index" :label="item" :value="item"> </el-option>
							</el-select> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="性别" prop="Gender" required>
							<div mb-2 flex items-center>
								<el-radio-group v-model="ruleForm.Gender">
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">女</el-radio>
							</el-radio-group>
							</div>
						</el-form-item>
						<el-form-item label="出生日期" prop="Birthdate" required>
							<el-date-picker
								v-model="ruleForm.Birthdate"
								style="width: 100%"
								type="date"
								placeholder="选择日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="身份证截止日期" prop="IdnoEndDate"  required>
							<el-date-picker
								v-model="ruleForm.IdnoEndDate"
								style="width: 100%"
								type="date"
								placeholder="选择日期"
								format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
						<el-form-item label="籍贯" prop="NativePlace">
							<el-input
								v-model="ruleForm.NativePlace"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col>
						<el-form-item label="家庭地址" prop="Address">
							<el-input
								v-model="ruleForm.Address"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">驾照信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="驾照类型" prop="DriverLicenseType" required>
							<el-select
								v-model="ruleForm.DriverLicenseType"
								style="width: 100%"
								filterable="true"
								default-first-option="true"
								:reserve-keyword="false"
								placeholder="请选择">
								<el-option v-for="(item,index) in DriverLicenseTypeList" :key="index" :label="item" :value="item"> </el-option>
							</el-select> 
						</el-form-item>
						<el-form-item label="驾照生效日期" prop="DriverLicenseStartDate" required>
							<el-date-picker
								v-model="ruleForm.DriverLicenseStartDate"
								style="width: 100%"
								type="date"
								placeholder="选择日期"
								format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="驾照登记日期" prop="RegistrationDate"  required>
							<el-date-picker
								v-model="ruleForm.RegistrationDate"
								style="width: 100%"
								type="date"
								placeholder="选择日期"
								format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
						<el-form-item label="驾照截止日期" prop="DriverLicenseEndDate"  required>
							<el-date-picker
								v-model="ruleForm.DriverLicenseEndDate"
								style="width: 100%"
								type="date"
								placeholder="选择日期"
								format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>				
				</el-row>	
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
		
	</div>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'driverEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		//文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			// state.FilesList.push(image);
			console.log(state.FilesList);
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
		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
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
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'info',
				IsExternal:0,
				Idno: '',
				IdnoEndDate : '',			
				Gender: 1,
				State: 1,
				NativePlace: '',
				Birthdate:'',
				RegistrationDate:'',				
				Mobile: '',
				Nation: '',
				DriverLicenseStartDate: '',
				DriverLicenseEndDate: '',
				Address: '',
				Tname:'',
				DriverLicenseType:'',
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				StartTime: '',
				EndTime:'',
				Kind: 'info',
			},
			dialogVisible: false,
			truckTypeList: [],
			energyTypeList: [],
			NationList: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","布依族","白族","朝鲜族","侗族","哈尼族","哈萨克族","满族","土家族","瑶族","达斡尔族",
			"东乡族","高山族","景颇族","柯尔克孜族","拉祜族","纳西族","畲族","傣族","黎族","傈僳族","仫佬族","阿昌族","布朗族","毛南族","普米族","撒拉族","塔吉克族",
			"锡伯族","保安族","德昂族","俄罗斯族","鄂温克族","京族","怒族","乌孜别克族","裕固族","独龙族","鄂伦春族","赫哲族","基诺族","珞巴族","门巴族"],
			DriverLicenseTypeList: ["A1","A2","A3","B1","B2","C1","C2","C3","C4","D","E","F","M","N","P"],
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
			Gender: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Mobile: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Birthdate: [
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
			IdnoEndDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DriverLicenseType: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			RegistrationDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DriverLicenseStartDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DriverLicenseEndDate: [
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
				const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_type', 0, 2);
				if (resTruckTypes.errcode == 0) {
					state.truckTypeList = resTruckTypes.data;
				}else{
					console.log("error:",resTruckTypes.errmsg)
				}
				const resEnergyTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('energy_type', 0, 2);
				if (resEnergyTypes.errcode == 0) {
					state.energyTypeList = resEnergyTypes.data;
				}else{
					console.log("error:",resEnergyTypes.errmsg)
				}
				state.disable = disable;
				if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.Gender=1;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.driver.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			console.log('关闭页面表单', state.ruleForm);
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		//修改按钮
		const onModelEdit = (item: object) => {
			state.tableItem = item;
			console.log(state.tableItem.Files);
			if (state.tableItem.Files != '') {
				state.Files = item.Files.split(',');
				state.FilesList = [];
				for (let i = 0; i < state.Files.length; i++) {
					let image = { url: '' };
					image.url = state.httpsText + state.Files[i];
					state.FilesList.push(image);
				}
			}
			state.saveState = false;
			state.dialogVisible = true;
		};		
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					//console.log("提交参数",state.ruleForm)
					try {
						const res = await proxy.$api.erp.driver.save(state.ruleForm);
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
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			onModelEdit,
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
</style>