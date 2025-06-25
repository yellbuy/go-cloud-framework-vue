<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="70%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="车牌号" prop="VehicleNumber">
							<el-input
								v-model="ruleForm.VehicleNumber"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="编号" prop="BillNo">
							<el-input
								v-model="ruleForm.BillNo"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="车辆类别" prop="IsExternal">
							<div mb-2 flex items-center>
								<el-radio-group
									v-model="ruleForm.IsExternal">
									<el-radio :label="0">内部车</el-radio>
									<el-radio :label="1">外部车</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="相关方" prop="Shipper">
							<el-select
								v-model="ruleForm.Shipper"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in shipperList" :key="index" :label="item.CompanyName" :value="item.CompanyName" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="车辆类型" prop="VehicleType">
							<el-select
								v-model="ruleForm.VehicleType"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in truckTypeList" :key="index" :label="item.Name" :value="item.Name" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="车牌颜色" prop="PlateColor">
							<el-select
								v-model="ruleForm.PlateColor"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in plateColorList" :key="index" :label="item.Name" :value="item.Name" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="动力类型" prop="EnergyType">
							<el-select
								v-model="ruleForm.EnergyType"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in energyTypeList" :key="index" :label="item.Name" :value="item.Id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="车辆识别号" prop="Vin">
							<el-input
								v-model="ruleForm.Vin"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="发动机号" prop="EngineNumber">
							<el-input
								v-model="ruleForm.EngineNumber"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">联系人信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="联系人" prop="Linkman"> 
							<el-input
								v-model="ruleForm.Linkman"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="电话" prop="Phone"> 
							<el-input
								v-model="ruleForm.Phone"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="司机姓名" prop="Driver"> 
							<el-input
								v-model="ruleForm.Driver"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="司机电话" prop="DriverMobile"> 
							<el-input
								v-model="ruleForm.DriverMobile"
								placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20"></el-col>
				</el-row>
				<el-divider content-position="left">行驶证信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="行驶证号" prop="DrivingLicense">
							<el-input
								v-model="ruleForm.DrivingLicense"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="生效日期" prop="DrivingLicenseStartDate">
							<el-date-picker
								v-model="ruleForm.DrivingLicenseStartDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="登记日期" prop="RegistrationDate">
							<el-date-picker
								v-model="ruleForm.RegistrationDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="结束日期" prop="DrivingLicenseEndDate">
							<el-date-picker
								v-model="ruleForm.DrivingLicenseEndDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb12">
						<el-form-item label="证件图片" prop="Files">
							<div >
								<el-upload :action="`${baseApiUrl}/v1/admin/common/ocr/mixedmultivehicle`" list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onVehicleLicensePicUploadSuccess" :file-list="DrivingLicensePicList" :limit="2" :on-remove="onRemoveVehicleLicensePic"
									:on-preview="showImage" :before-upload="onBeforeImageUpload">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload>
							</div>
							<div>
								<el-image-viewer v-if="dialogVisible" @close="imgOnClose()" :url-list="dialogImageUrl" />
							</div> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">道路运输证信息*</el-divider>
				<el-row :gutter="0">	
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="道路运输证" prop="TransportLicense">
							<el-input
								v-model="ruleForm.TransportLicense"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>				
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="生效日期" prop="TransportLicenseStartDate">
							<el-date-picker
								v-model="ruleForm.TransportLicenseStartDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="结束日期" prop="TransportLicenseEndDate" >
							<el-date-picker
								v-model="ruleForm.TransportLicenseEndDate"
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
								<el-upload :action="`${baseApiUrl}/v1/admin/common/ocr/roadtransportcertificate`" list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onTransportLicensePicUploadSuccess" :file-list="TransportLicensePicList" :limit="2" :on-remove="onRemoveTransportLicensePic"
									:on-preview="showImage" :before-upload="onBeforeImageUpload">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload>
							</div>
							<div>
								<el-image-viewer v-if="dialogVisible" @close="imgOnClose()" :url-list="dialogImageUrl" />
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
		<el-dialog v-model="ImageVisible">
			<img class="dialog-image" w-full :src="dialogImageUrl" alt="Preview Image" />
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
	name: 'vehicleEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		const store = useStore();

		//	获取用户信息
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
			baseApiUrl: import.meta.env.VITE_API_URL,
			dialogImageUrl: "",
			ImageVisible: false,
			//	表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'info',
				VehicleNumber: '',
				BillNo:'',
				IsExternal:0,
				VehicleType: '',
				EnergyType: '',
				PlateColor:'',
				Vin: '',
				EngineNumber: '',
				Linkman: '',
				BusinessScope: '',
				DrivingLicensePics: '',
				TransportLicensePics: '',
				State: 1,
				TaxpayerKind: '',
				WebSite: '',
				Fax: '',
				Im: '',
			},
			dialogVisible: false,
			shipperList:[],
			truckTypeList: [],
			plateColorList:[],
			energyTypeList:[],
			saveState: false,
			baseUrl: import.meta.env.VITE_URL as any, //	后台路径根目录
			DrivingLicensePicList: [],
			TransportLicensePicList: [],
		});

		const token = Session.get('token');

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			VehicleNumber: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			IsExternal: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
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
			DrivingLicenseStartDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DrivingLicenseEndDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DriverMobile: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.DrivingLicensePics = "";
			state.TransportLicensePics = "";
			state.ruleForm.Kind = kind;
			try {
				const resShippers = await proxy.$api.erp.company.getListByScope("shipper", 0, 2, {pageSize:1000000});
				if (resShippers.errcode == 0) {
					state.shipperList = resShippers.data;
				}else{
					console.log("error:",resShippers.errmsg)
				}
				const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_type', 0, 2);
				if (resTruckTypes.errcode == 0) {
					state.truckTypeList = resTruckTypes.data;
				}else{
					console.log("error:",resTruckTypes.errmsg)
				}
				const resPlateColors = await proxy.$api.common.commondata.getConcreteDataListByScope('plate_color', 0, 2);
				if (resPlateColors.errcode == 0) {
					state.plateColorList = resPlateColors.data;
				}else{
					console.log("error:",resPlateColors.errmsg)
				}
				const resEnergyTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('energy_type', 0, 2);
				if (resEnergyTypes.errcode == 0) {
					state.energyTypeList = resEnergyTypes.data;
				}else{
					console.log("error:",resEnergyTypes.errmsg)
				}
				state.disable = disable;
				if (id && id != '0') {
					getRowById(id);
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

		const getRowById = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.vehicle.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				state.DrivingLicensePicList=[];
				if (state.ruleForm.DrivingLicensePics != "") {
					state.DrivingLicensePicList = state.ruleForm.DrivingLicensePics.split(",").map(path=>{
						const url=state.baseUrl+path;
						return { url:url, name:path }
					})
				}
				state.TransportLicensePicList=[];
				if (state.ruleForm.TransportLicensePics != "") {
					state.TransportLicensePicList = state.ruleForm.TransportLicensePics.split(",").map(path=>{
						const url=state.baseUrl+path;
						return { url:url, name:path }
					})
				}
			} finally {
				state.isShowDialog = true;
			}
		};

		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (!valid) {
					return false
				}
				if (state.DrivingLicensePicList) {
					state.ruleForm.DrivingLicensePics = state.DrivingLicensePicList.map(val=>{return val.name}).join(',');
				}
				if (state.TransportLicensePicList) {
					state.ruleForm.TransportLicensePics = state.TransportLicensePicList.map(val=>{return val.name}).join(',');
				}
				if(!state.ruleForm.IsExternal){
					state.ruleForm.Shipper=""
				} else if(state.ruleForm.Shipper==""){
					ElMessage.warning('请选择相关方');
					return false;
				}
				state.loading = true;
				state.ruleForm.Id = state.ruleForm.Id.toString();
				
				try {
					const res = await proxy.$api.erp.vehicle.save(state.ruleForm);
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
			});
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
			return true;
		};

		//	行驶证文件列表更新
		const onVehicleLicensePicUploadSuccess = (file: UploadFile) => {
			//debugger
			if(file.errcode){
				ElMessage.error(file.errmsg);
				return;
			}
			var res=file.data
			const url=state.baseUrl + res.src
			const model = { url: url,name:res.src };
			state.DrivingLicensePicList.push(model);
			
			if(res.data){
				if(res.data.VehicleNumber){
					state.ruleForm.VehicleNumber=res.data.VehicleNumber
				}
				if(res.data.Vin){
					state.ruleForm.DrivingLicense=res.data.Vin
				}
				if(res.data.IssuedDate){
					state.ruleForm.DrivingLicenseStartDate=res.data.IssuedDate
				}
				if(res.data.RegistedDate){
					state.ruleForm.RegistrationDate=res.data.RegistedDate
				}
				if(res.data.StartDate){
					state.ruleForm.DrivingLicenseStartDate=res.data.StartDate
				}
				if(res.data.EndDate){
					state.ruleForm.DrivingLicenseEndDate=res.data.EndDate
				}
				if(res.data.VehicleType){
					state.ruleForm.VehicleType=res.data.VehicleType
				}
				if(res.data.Owner){
					state.ruleForm.Owner=res.data.Owner
				}
			}
		};

		//	道路运输证文件列表更新
		const onTransportLicensePicUploadSuccess = (file: UploadFile) => {
			if(file.errcode){
				ElMessage.error(file.errmsg);
				return;
			}
			var res=file.data
			
			const url=state.baseUrl + res.src
			const model = { url: url, name:res.src };
			state.TransportLicensePicList.push(model);
			if(res.data){
				state.ruleForm.TransportLicense=res.data.Idno
				state.ruleForm.TransportLicenseStartDate=res.data.IssuedDate
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
		const onRemoveVehicleLicensePic = (file: UploadFile) => {
			console.log(file)
			const removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.DrivingLicensePicList.length; i++) {
				if (state.DrivingLicensePicList[i].name == removeUrl) {
					state.DrivingLicensePicList.splice(i, 1);
				}
			}
		};

		//	删除图片
		const onRemoveTransportLicensePic = (file: UploadFile) => {
			const removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.TransportLicensePicList.length; i++) {
				if (state.TransportLicensePicList[i].name == removeUrl) {
					state.TransportLicensePicList.splice(i, 1);
				}
			}
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
			onVehicleLicensePicUploadSuccess,
			onTransportLicensePicUploadSuccess,
			onRemoveVehicleLicensePic,
			onRemoveTransportLicensePic,
			onBeforeImageUpload,
			onPreview,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	}
};
</script>
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number {
	width: 100% !important;
}
</style>