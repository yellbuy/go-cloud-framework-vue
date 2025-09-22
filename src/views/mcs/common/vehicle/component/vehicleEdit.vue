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
					<!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
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
					</el-col> -->
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
						<el-form-item label="登记日期" prop="RegistrationDate">
							<el-date-picker
								v-model="ruleForm.RegistrationDate"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="到期日期" prop="DrivingLicenseEndDate">
							<el-date-picker
								v-model="ruleForm.DrivingLicenseEndDate"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="16" :sm="16" :md="16" :lg="16" :offset="2"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />行驶证图片：<a :href="baseUrl+'/static/img/mcs/vehicle_license.png'" target="_blank" class="mb5 login-copyright-company">上传图例</a></div>
						<div>
							<imageUpload :uploadUrl="`/v1/admin/common/ocr/mixedmultivehicle`" title="行驶证"
								@on-image-change="onVehicleLicensePicChange" @on-upload-success="onVehicleLicensePicUploadSuccess" :ids="ruleForm.DrivingLicensePics" :limit="2">
							</imageUpload>
							<!-- <el-upload :action="`${baseApiUrl}/v1/admin/common/ocr/mixedmultivehicle`" list-type="picture-card"
								:headers="httpHeaders"
								:with-credentials="true"
								:on-success="onVehicleLicensePicUploadSuccess" :file-list="DrivingLicensePicList" :limit="2" :on-remove="onRemoveVehicleLicensePic"
								:on-preview="showImage" :before-upload="onBeforeImageUpload">
								<template #default>
									<el-icon>
										<plus />
									</el-icon>
								</template>
							</el-upload> -->
						</div>
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
						<el-form-item label="到期日期" prop="TransportLicenseEndDate" >
							<el-date-picker
								v-model="ruleForm.TransportLicenseEndDate"
								type="date"
								placeholder="请选择到期日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row :gutter="0">	
					<el-col :xs="16" :sm="16" :md="16" :lg="16" :offset="2"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />道路运输证图片：<a :href="baseUrl+'/static/img/mcs/transport_license.png'" target="_blank" class="mb5 login-copyright-company">上传图例</a></div>
						<div>
							<imageUpload :uploadUrl="`/v1/admin/common/ocr/roadtransportcertificate`" title="道路运输证"
								@on-image-change="onTransportLicensePicChange" @on-upload-success="onTransportLicensePicUploadSuccess" :ids="ruleForm.TransportLicensePics" :limit="2">
							</imageUpload>
							<!-- <el-upload :action="`${baseApiUrl}/v1/admin/common/ocr/roadtransportcertificate`" list-type="picture-card"
								:headers="httpHeaders"
								:with-credentials="true"
								:on-success="onTransportLicensePicUploadSuccess" :file-list="TransportLicensePicList" :limit="2" :on-remove="onRemoveTransportLicensePic"
								:on-preview="showImage" :before-upload="onBeforeImageUpload">
								<template #default>
									<el-icon>
										<plus />
									</el-icon>
								</template>
							</el-upload> -->
						</div>
					</el-col>
				</el-row>
				<el-divider content-position="left">驾驶证信息*</el-divider>
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
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
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
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="驾驶证到期日期" prop="DriverLicenseEndDate">
							<el-date-picker
								v-model="ruleForm.DriverLicenseEndDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>		
				</el-row>	
				<el-row :gutter="0">
					<el-col :xs="16" :sm="16" :md="16" :lg="16" :offset="2"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />驾驶证图片：<a :href="baseUrl+'/static/img/mcs/driver_license.png'" target="_blank" class="mb5 login-copyright-company">上传图例</a></div>
						<div>
							<imageUpload :uploadUrl="`/v1/admin/common/ocr/mixedmultivehicle`" title="驾驶证"
								@on-image-change="onDriverLicensePicChange" @on-upload-success="onDriverLicensePicUploadSuccess" :ids="ruleForm.DriverLicensePics" :limit="2">
							</imageUpload>
							<!-- <el-upload :action="`${baseApiUrl}/v1/admin/common/ocr/mixedmultivehicle`" list-type="picture-card"
								:headers="httpHeaders"
								:with-credentials="true"
								:on-success="onDriverLicensePicUploadSuccess" :file-list="DriverLicensePicList" :limit="2" :on-remove="onRemoveDriverLicensePic"
								:on-preview="showImage" :before-upload="onBeforeImageUpload">
								<template #default>
									<el-icon>
										<plus />
									</el-icon>
								</template>
							</el-upload> -->
						</div>
					</el-col>
				</el-row>
				<el-divider content-position="left">从业资格证信息*</el-divider>
				<el-row :gutter="0">		
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="资格证到期日期" prop="QualificationCertEndDate" >
							<el-date-picker
								v-model="ruleForm.QualificationCertEndDate"
								type="date"
								placeholder="请选择到期日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">	
					<el-col :xs="16" :sm="16" :md="16" :lg="16" :offset="2"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />从业资格证图片</div>
						<div>
							<imageUpload :uploadUrl="`/v1/file/upload/driver`" title="从业资格证"
								@on-image-change="onQualificationCertPicChange" :ids="ruleForm.QualificationCertPics" :limit="10">
							</imageUpload>
							</div>
					</el-col>
				</el-row>
				<el-divider content-position="left">二级维护信息*</el-divider>
				<el-row :gutter="0">		
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="二级维护日期" prop="MaintenanceDate" >
							<el-date-picker
								v-model="ruleForm.MaintenanceDate"
								type="date"
								placeholder="请选择维护日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">	
					<el-col :xs="16" :sm="16" :md="16" :lg="16" :offset="2"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />二级维护图片</div>
						<div>
							<imageUpload :uploadUrl="`/v1/file/upload/vehicle_maintenance`" title="二级维护"
								@on-image-change="onMaintenancePicChange" :ids="ruleForm.MaintenancePics" :limit="10">
							</imageUpload>
							</div>
					</el-col>
				</el-row>
				<el-divider content-position="left">车辆保险信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="保险到期日期" prop="InsuranceEndDate"  required>
							<el-date-picker
								v-model="ruleForm.InsuranceEndDate"
								type="date"
								placeholder="请选择到期日期"
								@change="onInsuranceEndDateChange"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="交强险保额(元)" prop="CompulsoryAmount">
							<el-input-number
								v-model="ruleForm.CompulsoryAmount"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="交强险到期日期" prop="CompulsoryEndDate" >
							<el-date-picker
								v-model="ruleForm.CompulsoryEndDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="商业险保额(元)" prop="CommercialAmount">
							<el-input-number
								v-model="ruleForm.CommercialAmount"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="商业险到期日期" prop="CommercialEndDate">
							<el-date-picker
								v-model="ruleForm.CommercialEndDate"
								type="date"
								placeholder="请选择到期日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="雇主责任险保额(元)" prop="TaxFee">
							<el-input-number
								v-model="ruleForm.TaxFee"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">保单上传*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />交强险图片</div>
						<imageUpload :uploadUrl="`/v1/file/upload/vehicle_insurance`" title="交强险"
							@on-image-change="onCompulsoryPicChange" :ids="ruleForm.CompulsoryPics" :limit="20">
						</imageUpload>
						<!-- <el-upload :action="`${baseApiUrl}/v1/file/upload/vehicle_insurance`" 
							list-type="picture-card"
							:headers="httpHeaders"
							:with-credentials="true"
							:on-success="onSuccessUploadCompulsoryPic" :file-list="CompulsoryPicList" :limit="10" :on-remove="onRemoveCompulsoryPic"
							:on-preview="showImage" :before-upload="onBeforeImageUpload">
							<template #default>
								<el-icon>
									<plus />
								</el-icon>
							</template>
						</el-upload> -->
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />商业险图片</div>
							<div>
								<imageUpload :uploadUrl="`/v1/file/upload/vehicle_insurance`" title="商业险"
									@on-image-change="onCommercialPicChange" :ids="ruleForm.CommercialPics" :limit="20">
								</imageUpload>
								<!-- <el-upload :action="`${baseApiUrl}/v1/file/upload/vehicle_insurance`" list-type="picture-card"
									:headers="httpHeaders"
									:with-credentials="true"
									:on-success="onSuccessUploadCommercialPic" :file-list="CommercialPicList" :limit="10" :on-remove="onRemoveCommercialPic"
									:on-preview="showImage" :before-upload="onBeforeImageUpload">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload> -->
							</div>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8"  class="mb12">
						<div class="margin-bottom"><SvgIcon name="fa fa-info-circle margin-right-xs" />雇主责任险图片</div>
							<div >
								<imageUpload :uploadUrl="`/v1/file/upload/vehicle_insurance`" title="雇主责任险"
									@on-image-change="onTaxPicChange" :ids="ruleForm.TaxPics" :limit="20">
								</imageUpload>
								<!-- <el-upload :action="`${baseApiUrl}/v1/file/upload/vehicle_insurance`" list-type="picture-card"
									:headers="httpHeaders"
									:with-credentials="true"
									:on-success="onSuccessUploadTaxPic" :file-list="TaxPicList" :limit="10" :on-remove="onRemoveTaxPic"
									:on-preview="showImage" :before-upload="onBeforeImageUpload">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload> -->
							</div>
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
			<el-image class="dialog-image" w-full :src="dialogImageUrl" fit="contain" />
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import imageUpload from '/@/components/imageUpload/index.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'vehicleEdit',
	components: { imageUpload },
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
			httpHeaders:proxy.$getRequestHeaders(),
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_URL as any, //	后台路径根目录
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
				DriverLicensePics: '',
				IdnoPics: '',
				CompulsoryPics:'',
				CommercialPics:'',
				MaintenancePics:'',
				QualificationCertPics:'',
				TaxPics:'',
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
			
			DrivingLicensePicList: [],
			TransportLicensePicList: [],
			DriverLicensePicList:[],
			IdnoPicList:[],
			CompulsoryPicList:[],
			CommercialPicList:[],
			TaxPicList:[],
			MaintenancePicList:[],
			QualificationCertPicList:[],
			DriverLicenseTypeList: ["A1","A2","A3","B1","B2","C1","C2","C3","C4","D","E","F","M","N","P"],
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
			DrivingLicenseEndDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			TransportLicenseEndDate: [
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
			DriverMobile: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			QualificationCertEndDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			MaintenanceDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			InsuranceEndDate: [
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
				state.DrivingLicensePicList=[];
				state.TransportLicensePicList=[];
				state.DriverLicensePicList=[];
				state.IdnoPicList=[];
				state.CompulsoryPicList=[];
				state.CommercialPicList=[];
				state.TaxPicList=[];
				state.MaintenancePicList=[];
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
			} finally {
				state.isShowDialog = true;
			}
		};

		const onInsuranceStartDateChange=(val: [Date, null | Date])=>{
			state.ruleForm.CompulsoryStartDate=val
			state.ruleForm.CommercialStartDate=val
		}
		const onInsuranceEndDateChange=(val: [Date, null | Date])=>{
			state.ruleForm.CompulsoryEndDate=val
			state.ruleForm.CommercialEndDate=val
		}

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


		//	行驶证文件列表更新
		const onVehicleLicensePicChange = (picIds:String,fileList:any)=>{
			state.ruleForm.DrivingLicensePics=picIds;
		};

		//	行驶证文件列表上传成功
		const onVehicleLicensePicUploadSuccess = (res: any) => {
			if(res.data){
				if(res.data.VehicleNumber){
					state.ruleForm.VehicleNumber=res.data.VehicleNumber
				}
				if(res.data.RecordNo){
					state.ruleForm.DrivingLicense=res.data.RecordNo
				}
				if(res.data.Vin){
					state.ruleForm.Vin=res.data.Vin
				}
				//if(res.data.IssuedDate){
				//	state.ruleForm.DrivingLicenseStartDate=res.data.IssuedDate
				//}
				if(res.data.RegistedDate){
					state.ruleForm.RegistrationDate=res.data.RegistedDate
				}
				//if(res.data.StartDate){
					//state.ruleForm.DrivingLicenseStartDate=res.data.StartDate
				//}
				if(res.data.EndDate){
					state.ruleForm.DrivingLicenseEndDate=res.data.EndDate
				}
				if(res.data.VehicleType){
					state.ruleForm.VehicleType=res.data.VehicleType
				}
				if(res.data.Owner){
					state.ruleForm.Owner=res.data.Owner
				}
				if(res.data.Errmsg){
					//错误提示信息
					ElMessage.error(res.data.Errmsg);
				}
			}
			
		};
		
		//	道路证文件列表更新
		const onTransportLicensePicChange = (picIds:String,fileList:any)=>{
			state.ruleForm.TransportLicensePics=picIds;
		};
		//	道路运输证文件上传成功
		const onTransportLicensePicUploadSuccess = (res: any) => {
			if(res.data){
				state.ruleForm.TransportLicense=res.data.Idno
				//state.ruleForm.TransportLicenseStartDate=res.data.IssuedDate
				if(res.data.Errmsg){
					//错误提示信息
					ElMessage.error(res.data.Errmsg);
				}
			}
		};

		//	驾驶证文件列表更新
		const onDriverLicensePicChange = (picIds:String,fileList:any)=>{
			state.ruleForm.DriverLicensePics=picIds;
		};
		//	驾驶证文件证上传成功
		const onDriverLicensePicUploadSuccess = (res: any) => {
			if(res.data){
				if(res.data.Name){
					state.ruleForm.Driver=res.data.Name
				}
				if(res.data.Gender){
					state.ruleForm.DriverGender=res.data.Gender=='女'?2:1;
				}
				if(res.data.No){
					state.ruleForm.DriverLicense=res.data.No
					state.ruleForm.Idno=res.data.No
				}
				//if(res.data.StartDate){
				//	state.ruleForm.DriverLicenseStartDate=res.data.StartDate;
				//}
				if(res.data.EndDate){
					state.ruleForm.DriverLicenseEndDate=res.data.EndDate;
				}
				if(res.data.BirthDate){
					state.ruleForm.DriverBirthdate=res.data.BirthDate ;
				}
				//if(res.data.RegistedDate){
				//	state.ruleForm.RegistrationDate=res.data.RegistedDate ;
				//}
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
			
		//	从业资格证照片上传成功后更新
		const onQualificationCertPicChange = (picIds:any) => {
			state.ruleForm.QualificationCertPics=picIds
		};
		//	二级维护照片上传成功后更新
		const onMaintenancePicChange = (picIds:any) => {
			state.ruleForm.MaintenancePics=picIds
		};

		//	交强险图片更新
		const onCompulsoryPicChange = (picIds:any) => {
			state.ruleForm.CompulsoryPics=picIds
		};

		//	商业险图片更新
		const onCommercialPicChange = (picIds:any) => {
			state.ruleForm.CommercialPics=picIds
		};
		//	雇主责任险图片更新
		const onTaxPicChange = (picIds:any) => {
			state.ruleForm.TaxPics=picIds
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
			onVehicleLicensePicChange,
			onVehicleLicensePicUploadSuccess,
			onTransportLicensePicUploadSuccess,
			onMaintenancePicChange,
			onDriverLicensePicUploadSuccess,
			onTransportLicensePicChange,
			onDriverLicensePicChange,
			onQualificationCertPicChange,
			onCompulsoryPicChange,
			onCommercialPicChange,
			onTaxPicChange,
			onInsuranceStartDateChange,
			onInsuranceEndDateChange,
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