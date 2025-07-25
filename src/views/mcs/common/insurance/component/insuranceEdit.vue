<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="150px" label-suffix="：" v-loading="loading" :disabled="disable">
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
						<el-form-item label="保险生效日期" prop="StartTime" required>
							<el-date-picker
								v-model="ruleForm.StartTime"
								type="date"
								placeholder="请选择时间"
								@change="onStartTimeChange"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="保险结束日期" prop="EndTime"  required>
							<el-date-picker
								v-model="ruleForm.EndTime"
								type="date"
								placeholder="请选择时间"
								@change="onEndTimeChange"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="保险公司" prop="CompanyName">
							<el-input
								v-model="ruleForm.CompanyName"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="保单号" prop="No">
							<el-input
								v-model="ruleForm.No"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="购买日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								type="date"
								placeholder="请选择时间"
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
						<el-form-item label="交强险购买费用(元)" prop="CompulsoryFee">
							<el-input-number
								v-model="ruleForm.CompulsoryFee"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="交强险生效日期" prop="CompulsoryStartDate">
							<el-date-picker
								v-model="ruleForm.CompulsoryStartDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="交强险结束日期" prop="CompulsoryEndDate" >
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
						<el-form-item label="商业险购买费用(元)" prop="CommercialFee">
							<el-input-number
								v-model="ruleForm.CommercialFee"
								min="0"
								step="100"
								max="100000000"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="商业险生效日期" prop="CommercialStartDate">
							<el-date-picker
								v-model="ruleForm.CommercialStartDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="商业险结束日期" prop="CommercialEndDate">
							<el-date-picker
								v-model="ruleForm.CommercialEndDate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="车船税费用(元)" prop="TaxFee">
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
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="交强险图片" prop="Files">
							<div style="width: 50%">
								<el-upload :action="`${baseUrl}/v1/file/upload/vehicle_insurance`" list-type="picture-card"
									:headers="httpHeaders"
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
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="商业险图片" prop="Files1">
							<div >
								<el-upload :action="`${baseUrl}/v1/file/upload/vehicle_insurance`" list-type="picture-card"
									:headers="httpHeaders"
									:on-success="onSuccessFile1" :file-list="FilesList1" :limit="10" :on-remove="onRemove1"
									:on-preview="showImage1" :before-upload="onBeforeImageUpload">
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
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="车船税图片" prop="Files2">
							<div >
								<el-upload :action="`${baseUrl}/v1/file/upload/vehicle_insurance`" list-type="picture-card"
									:headers="httpHeaders"
									:on-success="onSuccessFile2" :file-list="FilesList2" :limit="10" :on-remove="onRemove2"
									:on-preview="showImage2" :before-upload="onBeforeImageUpload">
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
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
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
	name: 'insuranceEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		//	文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			if(file.errcode){
				ElMessage.error(file.errmsg);
				return;
			}
			state.Files.push(file.data.id);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			image.id=file.data.id;
			image.name=file.data.src;
			state.FilesList.push(image);
			console.log(state.FilesList);
		};

		//	文件列表更新
		const onSuccessFile1 = (file: UploadFile) => {
			if(file.errcode){
				ElMessage.error(file.errmsg);
				return;
			}
			state.Files1.push(file.data.id);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			image.name=file.data.src;
			image.id=file.data.id;
			state.FilesList1.push(image);
		};

		//	文件列表更新
		const onSuccessFile2 = (file: UploadFile) => {
			if(file.errcode){
				ElMessage.error(file.errmsg);
				return;
			}
			state.Files2.push(file.data.id);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			image.id=file.data.id;
			image.name=file.data.src;
			state.FilesList2.push(image);
		};

		const onRemove = (file: UploadFile) => {
			let removeUrl = file.id;
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};

		const onRemove1 = (file: UploadFile) => {
			let removeUrl = file.id;
			for (let i = 0; i < state.Files1.length; i++) {
				if (state.Files1[i] == removeUrl) {
					state.Files1.splice(i, 1);
				}
			}
		};

		const onRemove2 = (file: UploadFile) => {
			let removeUrl = file.id;
			for (let i = 0; i < state.Files2.length; i++) {
				if (state.Files2[i] == removeUrl) {
					state.Files2.splice(i, 1);
				}
			}
		};
		
		//	显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url
			state.ImageVisible = true
		}

		//	显示表格图片
		const showImage1: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl1 = uploadFile.url
			state.ImageVisible1 = true
		}

		//	显示表格图片
		const showImage2: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl2 = uploadFile.url
			state.ImageVisible2 = true
		}

		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});


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
				state.dialogImageUrl1[0] = fileurl;
				state.dialogImageUrl2[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
				state.dialogVisible1 = true;
				state.dialogVisible2 = true;
			} else {
				//	下载文件
				state.dialogVisible = false;
				state.dialogVisible1 = false;
				state.dialogVisible2 = false;
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
			httpHeaders:proxy.$getRequestHeaders(),
			loading: false,
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			dialogImageUrl: "",
			dialogImageUrl1: "",
			dialogImageUrl2: "",
			ImageVisible: false,
			ImageVisible1: false,
			ImageVisible2: false,
			//	表单
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
			Files: [],
			Files1: [],
			Files2: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			FilesList1: [],
			FilesList2: [],
		});

		const onStartTimeChange=(val: [Date, null | Date])=>{
			state.ruleForm.CompulsoryStartDate=val
			state.ruleForm.CommercialStartDate=val
		}
		const onEndTimeChange=(val: [Date, null | Date])=>{
			state.ruleForm.CompulsoryEndDate=val
			state.ruleForm.CommercialEndDate=val
		}

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
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Files1: '', Files2: '',Kind: kind, StartTime: '' };
			try {
				state.disable = disable;
				state.FilesList = [];
				state.FilesList1 = [];
				state.FilesList2 = [];
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
				const res = await proxy.$api.erp.vehicleinsurance.getById(Id);
				if (res.errcode != 0) {
					return;
				}

				state.ruleForm = res.data;
				state.Files = state.ruleForm.CommercialPics.split(",");
				state.Files1 = state.ruleForm.CompulsoryPics.split(",");
				state.Files2 = state.ruleForm.TaxPics.split(",");
				
				if (state.ruleForm.CommercialPics != "") {
					const pics=state.ruleForm.CommercialPics.split(",");
					for(let index=0;index<state.ruleForm.CommercialPicList.length;index++){
						const path=state.ruleForm.CommercialPicList[index]
						state.FilesList.push({id:pics[index],url:state.httpsText+path,name:path})
					}
				}
				if ( state.ruleForm.CompulsoryPics != "") {
					const pics=state.ruleForm.CompulsoryPics.split(",");
					for(let index=0;index<state.ruleForm.CompulsoryPicList.length;index++){
						const path=state.ruleForm.CompulsoryPicList[index]
						state.FilesList1.push({id:pics[index],url:state.httpsText+path,name:path})
					}
				}
				if ( state.ruleForm.TaxPics != "") {
					const pics=state.ruleForm.TaxPics.split(",");
					for(let index=0;index<state.ruleForm.TaxPicList.length;index++){
						const path=state.ruleForm.TaxPicList[index]
						state.FilesList2.push({id:pics[index],url:state.httpsText+path,name:path})
					}
				}
			} finally {
				state.isShowDialog = true;
			}
		};

		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '',Files1: '',Files2: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData(true);
		};

		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					console.log("state.Files:", state.Files)
					if (state.Files) {
						state.ruleForm.CommercialPics = state.Files.join(',');
					}
					if (state.Files1) {
						state.ruleForm.CompulsoryPics = state.Files1.join(',');
					}
					if (state.Files2) {
						state.ruleForm.TaxPics = state.Files2.join(',');
					}
					try {
						const res = await proxy.$api.erp.vehicleinsurance.save(state.ruleForm);
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

		//	图片上传
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
			state.httpHeaders=proxy.$getRequestHeaders()
			return true;
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
			onSuccessFile,
			onSuccessFile1,
			onSuccessFile2,
			onRemove,
			onRemove1,
			onRemove2,
			onStartTimeChange,
			onEndTimeChange,
			onBeforeImageUpload,
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
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>