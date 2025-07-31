<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="45%" destroy-on-close :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="姓名" prop="Name" required>
							<el-input
								v-model="ruleForm.Name"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="审核状态" prop="AuditState">
							<div mb-2 flex items-center>
								<el-radio-group
									v-model="ruleForm.AuditState">
									<el-radio :label="0">未审</el-radio>
									<el-radio :label="1">已审</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</el-col>
					
				</el-row>
				
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="手机号码" prop="Mobile" required>
							<el-input
								v-model="ruleForm.Mobile"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="性别" prop="Gender" required>
							<div mb-2 flex items-center>
								<el-radio-group v-model="ruleForm.Gender">
									<el-radio :label="1">男</el-radio>
									<el-radio :label="2">女</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="身份证号码" prop="Idno" required>
							<el-input
								v-model="ruleForm.Idno"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="身份证截止日期" prop="IdnoEndDate"  required>
							<el-date-picker
								v-model="ruleForm.IdnoEndDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="出生日期" prop="Birthdate" required>
							<el-date-picker
								v-model="ruleForm.Birthdate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="民族" prop="Nation">
							<el-select
								v-model="ruleForm.Nation"
								filterable="true"
								default-first-option="true"
								:reserve-keyword="false"
								placeholder="请选择">
								<el-option v-for="(item,index) in NationList" :key="index" :label="item" :value="item" />
							</el-select> 
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="籍贯" prop="NativePlace">
							<el-input
								v-model="ruleForm.NativePlace"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="家庭地址" prop="Address">
							<el-input
								v-model="ruleForm.Address"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">驾照信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="驾照类型" prop="DriverLicenseType">
							<el-select
								v-model="ruleForm.DriverLicenseType"
								filterable="true"
								default-first-option="true"
								:reserve-keyword="false"
								placeholder="请选择">
								<el-option v-for="(item,index) in DriverLicenseTypeList" :key="index" :label="item" :value="item" />
							</el-select> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="驾照登记日期" prop="RegistrationDate">
							<el-date-picker
								v-model="ruleForm.RegistrationDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="驾照生效日期" prop="DriverLicenseStartDate">
							<el-date-picker
								v-model="ruleForm.DriverLicenseStartDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="驾照截止日期" prop="DriverLicenseEndDate">
							<el-date-picker
								v-model="ruleForm.DriverLicenseEndDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>				
				</el-row>	
				<el-row :gutter="0">	
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb12">
						
						<el-form-item label="证件图片" prop="Files1">
							<div >
								<el-upload :action="`${baseApiUrl}/v1/admin/common/ocr/mixedmultivehicle`" list-type="picture-card"
									:headers="httpHeaders"
									:with-credentials="true"
									:on-success="onDriverLicensePicUploadSuccess" :file-list="DriverLicensePicList" :limit="2" :on-remove="onRemoveDriverLicensePic"
									:on-preview="showImage" :before-upload="onBeforeImageUpload">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload>
							</div>
							<div title="" class="color-info-light text-help-info font10">
								<SvgIcon name="fa fa-info-circle" /><span><a :href="baseUrl+'/static/img/mcs/driver_license.png'" target="_blank" class="mb5 login-copyright-company">上传图例</a></span>
							</div>
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
import { ElMessage, UploadFile, UploadProps } from 'element-plus';
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

		const store = useStore();

		//	获取用户信息
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
			httpHeaders:proxy.$getRequestHeaders(),
			loading: false,
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_URL as any, //	后台路径根目录
			baseApiUrl: import.meta.env.VITE_API_URL,
			ImageVisible: false,
			DriverLicensePicList:[],
			//	表单
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
				Tname: '',
				DriverLicenseType: '',
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
			truckTypeList: [],
			energyTypeList: [],
			NationList: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","布依族","白族","朝鲜族","侗族","哈尼族","哈萨克族","满族","土家族","瑶族","达斡尔族",
			"东乡族","高山族","景颇族","柯尔克孜族","拉祜族","纳西族","畲族","傣族","黎族","傈僳族","仫佬族","阿昌族","布朗族","毛南族","普米族","撒拉族","塔吉克族",
			"锡伯族","保安族","德昂族","俄罗斯族","鄂温克族","京族","怒族","乌孜别克族","裕固族","独龙族","鄂伦春族","赫哲族","基诺族","珞巴族","门巴族"],
			DriverLicenseTypeList: ["A1","A2","A3","B1","B2","C1","C2","C3","C4","D","E","F","M","N","P"],
			Files: [],
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
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
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
				state.DriverLicensePicList=[];
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
				if (state.ruleForm.DriverLicensePics != "") {
					const pics=state.ruleForm.DriverLicensePics.split(",");
					for(let index=0;index<state.ruleForm.DriverLicensePicList.length;index++){
						const path=state.ruleForm.DriverLicensePicList[index]
						state.DriverLicensePicList.push({id:pics[index],url:state.baseUrl+path,name:path})
					}
				}
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

		//	图片上传
		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			state.httpHeaders=proxy.$getRequestHeaders()
			return true;
		};
		//	道路运输证文件列表更新
		const onDriverLicensePicUploadSuccess = (file: UploadFile) => {
			if(file.errcode){
				ElMessage.error(file.errmsg);
				return;
			}
			var res=file.data
			
			const url=state.baseUrl + res.src
			const model = { url: url, name:res.src, id:res.id };
			state.DriverLicensePicList.push(model);
			if(res.data){
				if(res.data.Name){
					state.ruleForm.Name=res.data.Name
				}
				if(res.data.Gender){
					state.ruleForm.Gender=res.data.Gender=='女'?2:1;
				}
				if(res.data.No){
					state.ruleForm.DriverLicense=res.data.No
					state.ruleForm.Idno=res.data.No
				}
				if(res.data.StartDate){
					state.ruleForm.DriverLicenseStartDate=res.data.StartDate;
				}
				if(res.data.EndDate){
					state.ruleForm.DriverLicenseEndDate=res.data.EndDate;
				}
				if(res.data.BirthDate){
					state.ruleForm.Birthdate=res.data.BirthDate ;
				}
				if(res.data.RegistedDate){
					state.ruleForm.RegistrationDate=res.data.RegistedDate ;
				}
				if(res.data.VehicleType){
					state.ruleForm.DriverLicenseType=res.data.VehicleType
				}
				if(res.data.Address){
					state.ruleForm.Address=res.data.Address ;
				}
				if(res.data.Errmsg){
					//错误提示信息
					ElMessage.error(res.data.Errmsg);
				}
			}
		};
		
		//	显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url
			state.ImageVisible = true
		}

		//	预览文件
		const onPreview = (uploadFile: any) => {
			//	当格式为图片就预览图片，否则下载文件
			let filename = uploadFile.name;
			if (!uploadFile.name || uploadFile.name == '') {
				filename = uploadFile.url;
			}
			let fileurl = uploadFile.url;
			let fileExtension = '';
			//	校检文件类型
			var imageTypes = ['png', 'jpg', 'jpeg', 'gif'];
			if (filename.lastIndexOf('.') > -1) {
				fileExtension = filename.slice(filename.lastIndexOf('.') + 1);
			}
			const isTypeOk = imageTypes.some((type) => {
				if (fileExtension && fileExtension.indexOf(type) > -1) {
					return true;
				}
			});
			if (isTypeOk) {
				//	预览图片
				state.dialogImageUrl[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
			} else {
				//	下载文件
				state.dialogVisible = false;
				window.open(fileurl, '_self');
			}
		};

		//	删除图片
		const onRemoveDriverLicensePic = (file: UploadFile) => {
			let removeUrl = file.id;
			console.log(state.DriverLicensePicList)
			for (let i = 0; i < state.DriverLicensePicList.length; i++) {
				if (state.DriverLicensePicList[i].id == removeUrl) {
					state.DriverLicensePicList.splice(i, 1);
				}
			}
		};
	
		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					if (state.DriverLicensePicList) {
						state.ruleForm.DriverLicensePics = state.DriverLicensePicList.map(val=>{return val.id}).join(',');
					}
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
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

		//	时间格式
		const { dateFormatYMD } = commonFunction();

		//	窗口页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			GetByIdRow,
			dateFormatYMD,
			getUserInfos,
			onRemoveDriverLicensePic,
			onBeforeImageUpload,
			onPreview,
			showImage,
			onDriverLicensePicUploadSuccess,
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
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>