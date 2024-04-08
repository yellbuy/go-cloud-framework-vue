<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="150px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="车牌号" prop="VehicleNumber">
							<el-input
								v-model="ruleForm.VehicleNumber"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="保险生效日期" prop="StartTime" required>
							<el-date-picker
								v-model="ruleForm.StartTime"
								style="width: 100%"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="保险结束日期" prop="EndTime"  required>
							<el-date-picker
								v-model="ruleForm.EndTime"
								style="width: 100%"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="保险公司" prop="CompanyName">
							<el-input
								v-model="ruleForm.CompanyName"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="保单号" prop="No">
							<el-input
								v-model="ruleForm.No"
								style="width: 100%"
								placeholder="请输入"></el-input> 
						</el-form-item>
                    </el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="购买日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								style="width: 100%"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
                    </el-col>
                </el-row>
				<el-row :gutter="20">    
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="交强险保额(元)" prop="CompulsoryAmount">
							<el-input-number
								v-model="ruleForm.CompulsoryAmount"
								style="width: 100%"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入"></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="交强险购买费用(元)" prop="CompulsoryFee">
							<el-input-number
								v-model="ruleForm.CompulsoryFee"
								style="width: 100%"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入"></el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20"> 
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="交强险生效日期" prop="CompulsoryStartDate">
							<el-date-picker
								v-model="ruleForm.CompulsoryStartDate"
								style="width: 100%"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
                    </el-col>
					
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="交强险结束日期" prop="CompulsoryEndDate" >
							<el-date-picker
								v-model="ruleForm.CompulsoryEndDate"
								style="width: 100%"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20"> 
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="商业险保额(元)" prop="CommercialAmount">
							<el-input-number
								v-model="ruleForm.CommercialAmount"
								style="width: 100%"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入"></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="商业险购买费用(元)" prop="CommercialFee">
							<el-input-number
								v-model="ruleForm.CommercialFee"
								style="width: 100%"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入"></el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20"> 
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="商业险生效日期" prop="CommercialStartDate">
							<el-date-picker
								v-model="ruleForm.CommercialStartDate"
								style="width: 100%"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="商业险结束日期" prop="CommercialEndDate">
							<el-date-picker
								v-model="ruleForm.CommercialEndDate"
								style="width: 100%"
								type="date"
								placeholder="请选择日期"
								format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20"> 
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="车船税费用(元)" prop="TaxFee">
							<el-input-number
								v-model="ruleForm.TaxFee"
								style="width: 100%"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入"></el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">保单上传*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" class="mb12">
						<el-form-item label="交强险图片" prop="Files">
							<div style="width: 50%">
								<el-upload :action="`${baseUrl}/v1/file/upload`" list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile" :file-list="FilesList" :limit="10" :on-remove="onRemove"
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
					<el-col :xs="24" :sm="12" :md="8" class="mb12">
						<el-form-item label="商业险图片" prop="Files1">
							<div style="width: 50%">
								<el-upload :action="`${baseUrl}/v1/file/upload`" list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile1" :file-list="FilesList1" :limit="10" :on-remove="onRemove1"
									:on-preview="showImage1" :before-upload="onBeforeImageUpload1">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload>
							</div>
							 <div>
								<el-image-viewer v-if="dialogVisible1" @close="imgOnClose()" :url-list="dialogImageUrl1" />
							</div> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" class="mb12">
						<el-form-item label="车船税图片" prop="Files2">
							<div style="width: 50%">
								<el-upload :action="`${baseUrl}/v1/file/upload`" list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile2" :file-list="FilesList2" :limit="10" :on-remove="onRemove2"
									:on-preview="showImage2" :before-upload="onBeforeImageUpload2">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload>
							</div>
							 <div>
								<el-image-viewer v-if="dialogVisible2" @close="imgOnClose()" :url-list="dialogImageUrl2" />
							</div> 
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
		<el-dialog v-model="ImageVisible">
			<img class="dialog-image" w-full :src="dialogImageUrl" alt="Preview Image" />
		</el-dialog>
		<el-dialog v-model="ImageVisible1">
			<img class="dialog-image" w-full :src="dialogImageUrl1" alt="Preview Image" />
		</el-dialog>
		<el-dialog v-model="ImageVisible2">
			<img class="dialog-image" w-full :src="dialogImageUrl2" alt="Preview Image" />
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
		console.log("message.action.add:",t('message.action.add'))
		//文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			 state.FilesList.push(image);
			console.log(state.FilesList);
		};
		//文件列表更新
		const onSuccessFile1 = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files1.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			 state.FilesList1.push(image);
			console.log(state.FilesList1);
		};
		//文件列表更新
		const onSuccessFile2 = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files2.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			 state.FilesList2.push(image);
			console.log(state.FilesList2);
		};
		const onRemove = (file: UploadFile) => {
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				console.log("删除文件",state.Files[i],removeUrl)
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};
		const onRemove1 = (file: UploadFile) => {
			console.log(file);
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.Files1.length; i++) {
				if (state.Files1[i] == removeUrl) {
					state.Files1.splice(i, 1);
				}
			}
		};
		const onRemove2 = (file: UploadFile) => {
			console.log(file);
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.Files2.length; i++) {
				if (state.Files2[i] == removeUrl) {
					state.Files2.splice(i, 1);
				}
			}
		};
		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		//显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url!
			state.ImageVisible = true
		}
		//显示表格图片
		const showImage1: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl1 = uploadFile.url!
			state.ImageVisible1 = true
		}
		//显示表格图片
		const showImage2: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl2 = uploadFile.url!
			state.ImageVisible2 = true
		}
		//预览文件
		const onPreview = (uploadFile: any) => {
			// 当格式为图片就预览图片，否则下载文件
			let filename = uploadFile.name;
			if (!uploadFile.name || uploadFile.name == '') {
				filename = uploadFile.url;
			}
			let fileurl = uploadFile.url;
			let fileExtension = '';
			// 校检文件类型
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
				//预览图片
				state.dialogImageUrl[0] = fileurl;
				state.dialogImageUrl1[0] = fileurl;
				state.dialogImageUrl2[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
				state.dialogVisible1 = true;
				state.dialogVisible2 = true;
			} else {
				//下载文件
				state.dialogVisible = false;
				state.dialogVisible1 = false;
				state.dialogVisible2 = false;
				// openWindow(fileurl, { target: "_self" });
				window.open(fileurl, '_self');
			}
		};
		
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
			dialogImageUrl: "",
			dialogImageUrl1: "",
			dialogImageUrl2: "",
			ImageVisible: false,
			ImageVisible1: false,
			ImageVisible2: false,
			//表单
			ruleForm: {
				Id: 0,
				Kind: 'info',
                VehicleNumber:'',
				State: 1,
                StartTime: '',
				EndTime:'',
				Tname:'',				
				CompulsoryFee: '',
                CompulsoryAmount: '',
                BillTime: '',
				CompulsoryStartDate: '',
				CompulsoryEndDate: '',
				CommercialPics: '',
				CompulsoryPics: '',
				CommercialAmount: '',
				TaxFee: '',
				TaxPics: '',
				CommercialFee: '',
				CommercialStartDate: '',
				CommercialEndDate: '',
				CompanyName: '',
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				Files1: '',
				Files2: '',
				StartTime: '',
				EndTime:'',
				Kind: 'info',
			},
			dialogVisible: false,
			dialogVisible1: false,
			dialogVisible2: false,
			truckTypeList: [],
			energyTypeList:[],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			Files1: [],
			Files2: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			FilesList1: [],
			FilesList2: [],
		});
		const token = Session.get('token');
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			VehicleNumber: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			BillTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
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
			CompulsoryStartDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CompulsoryEndDate: [
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
			state.Files1 = [];
			state.Files2 = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Files1: '', Files2: '',Kind: kind, StartTime: '' };
			try {
				// const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_type', 0, 2);
				// if (resTruckTypes.errcode == 0) {
				// 	state.truckTypeList = resTruckTypes.data;
				// }else{
				// 	console.log("error:",resTruckTypes.errmsg)
				// }
				// const resEnergyTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('energy_type', 0, 2);
				// if (resEnergyTypes.errcode == 0) {
				// 	state.energyTypeList = resEnergyTypes.data;
				// }else{
				// 	console.log("error:",resEnergyTypes.errmsg)
				// }
				state.disable = disable;
				if (disable) {
					state.title = t('message.action.see');
					GetByIdRow(id);
				} else if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal = 0;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.vehicleInsurance.getById(Id);
				if (res.errcode != 0) {
					return;
				}

				state.ruleForm = res.data;
				state.Files = state.ruleForm.CommercialPics.split(",");
				state.Files1 = state.ruleForm.CompulsoryPics.split(",");
				state.Files2 = state.ruleForm.TaxPics.split(",");
				state.FilesList = [];
				state.FilesList1 = [];
				state.FilesList2 = [];
				if (state.ruleForm.CommercialPics != "") {
					for (let i = 0; i < state.Files.length; i++) {
						let image = { url: '', name: '' };
						image.url = state.httpsText + state.Files[i];
						image.name = state.httpsText + state.Files[i];
						state.FilesList.push(image);
					}
				}
				if ( state.ruleForm.CompulsoryPics != "") {
					for (let i = 0; i < state.Files1.length; i++) {
						let image = { url: '', name: '' };
						image.url = state.httpsText + state.Files1[i];
						image.name = state.httpsText + state.Files1[i];
						state.FilesList1.push(image);
					}
				}
				if ( state.ruleForm.TaxPics != "") {
					for (let i = 0; i < state.Files2.length; i++) {
						let image = { url: '', name: '' };
						image.url = state.httpsText + state.Files2[i];
						image.name = state.httpsText + state.Files2[i];
						state.FilesList2.push(image);
					}
				}
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			console.log('关闭页面表单', state.ruleForm);
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '',Files1: '',Files2: '', Kind: 'supplier', StartTime: '' };
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
		//修改按钮
		const onModelEdit1 = (item: object) => {
			state.tableItem = item;
			console.log(state.tableItem.Files1);
			if (state.tableItem.Files1 != '') {
				state.Files1 = item.Files1.split(',');
				state.FilesList1 = [];
				for (let i = 0; i < state.Files1.length; i++) {
					let image = { url: '' };
					image.url = state.httpsText + state.Files1[i];
					state.FilesList1.push(image);
				}
			}
			state.saveState = false;
			state.dialogVisible1 = true;
		};
		//修改按钮
		const onModelEdit2 = (item: object) => {
			state.tableItem = item;
			console.log(state.tableItem.Files2);
			if (state.tableItem.Files2 != '') {
				state.Files2 = item.Files2.split(',');
				state.FilesList2 = [];
				for (let i = 0; i < state.Files2.length; i++) {
					let image = { url: '' };
					image.url = state.httpsText + state.Files2[i];
					state.FilesList2.push(image);
				}
			}
			state.saveState = false;
			state.dialogVisible2 = true;
		};
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					if (state.Files) {
						state.ruleForm.CommercialPics = state.Files.join(',');
					}
					if (state.Files1) {
						state.ruleForm.CompulsoryPics = state.Files1.join(',');
					}
					if (state.Files2) {
						state.ruleForm.TaxPics = state.Files2.join(',');
					}
					//console.log("提交参数",state.ruleForm)
					try {
						const res = await proxy.$api.erp.vehicleInsurance.save(state.ruleForm);
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
		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png' &&
				rawFile.type !== 'image/ico' &&
				rawFile.type !== 'image/bmp' &&
				rawFile.type !== 'image/gif' &&
				rawFile.type !== 'image/svg'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			return true;
		};
		const onBeforeImageUpload1: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png' &&
				rawFile.type !== 'image/ico' &&
				rawFile.type !== 'image/bmp' &&
				rawFile.type !== 'image/gif' &&
				rawFile.type !== 'image/svg'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			return true;
		};
		const onBeforeImageUpload2: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png' &&
				rawFile.type !== 'image/ico' &&
				rawFile.type !== 'image/bmp' &&
				rawFile.type !== 'image/gif' &&
				rawFile.type !== 'image/svg'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			return true;
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
			onSuccessFile1,
			onSuccessFile2,
			onRemove,
			onRemove1,
			onRemove2,
			onBeforeImageUpload,
			onBeforeImageUpload1,
			onBeforeImageUpload2,
			onModelEdit,
			onModelEdit1,
			onModelEdit2,
			showImage,
			showImage1,
			showImage2,
			dateFormatYMD,
			getUserInfos,
			tableData,
			rules,
			token,
			onSubmit,
            onPreview,
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
.el-select {
	width: 100%;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	text-align: center;
	padding: 40px;
}
</style>