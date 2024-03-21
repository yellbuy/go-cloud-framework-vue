<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="2" :sm="1" class="mb20">
						<el-upload ref="uploadRef" class="upload-demo" :before-upload="
								() => {return false;}" :auto-upload="false" :on-change="onImportXlsx" :show-file-list="false">
							<template #trigger>
								<el-button bg type="primary">
									{{ $t('message.action.import') }}
								</el-button>
							</template>
						</el-upload>
					</el-col>
					<el-col :xs="2" :sm="1" class="mb20 ml10">
						<el-button bg type="danger" @click="onClearRow()">
							{{ $t('message.action.clear') }}
						</el-button>
					</el-col>
					<el-col :xs="2" :sm="1" class="mb20 ml10">
						<el-button bg type="info" @click="onDownloadTpl()">
							{{ $t('message.action.download_tpl') }}
						</el-button>
					</el-col>
				</el-row>	
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="ruleForm.VehicleList"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row
						>
							<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed>
								<template #default="scope">
									<el-input v-model="scope.row.VehicleNumber" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="IsExternal" label="车辆类别" width="100" align="center">
								<template #default="scope">
									<el-tag type="danger" effect="plain" v-if="scope.row.IsExternal">外部车</el-tag>
									<el-tag type="success" effect="plain" v-else>内部车</el-tag>
								</template>
							</el-table-column>
							<el-table-column prop="Shipper" label="相关方" width="180">
								<template #default="scope">
									<el-input v-model="scope.row.Shipper" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="VehicleType" label="车辆类型" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.VehicleType" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Linkman" label="联系人" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.Linkman" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Phone" label="联系电话" width="110">
								<template #default="scope">
									<el-input v-model="scope.row.Phone" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Driver" label="司机姓名" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.Driver" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DriverMobile" label="司机电话" width="110">
								<template #default="scope">
									<el-input v-model="scope.row.DriverMobile" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicense" label="行驶证号" width="150">
								<template #default="scope">
									<el-input v-model="scope.row.DrivingLicense" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenseStartDate" label="行驶证有效开始日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DrivingLicenseStartDate"
										type="date"
										placeholder="生效日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenseEndDate" label="行驶证有效截止日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DrivingLicenseEndDate"
										type="date"
										placeholder="生效日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="TransportLicense" label="道路运输许可证" width="150">
								<template #default="scope">
									<el-input v-model="scope.row.TransportLicense" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="TransportLicenseStartDate" label="许可证有效开始日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.TransportLicenseStartDate"
										type="date"
										placeholder="生效日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="TransportLicenseEndDate" label="许可证有效截止日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.TransportLicenseEndDate"
										type="date"
										placeholder="生效日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column :width="proxy.$calcWidth(70)" fixed="right">
								<template #header>
									<el-button bg type="primary" @click="onAddRow()">
										{{ $t('message.action.add') }}
									</el-button>
								</template>
								<template #default="scope">
									<el-button text bg type="danger" @click="onDelRow(scope.$index)">
										{{ $t('message.action.delete') }}
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)">
						{{ $t('message.action.save')}}
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from "xlsx"; //引入
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'freightEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		//显示表格图片
		const showImage = (Files: string) => {
			let fileUrl = '';
			let filList = Files.split(',');
			fileUrl = state.httpsText + filList[0];
			return fileUrl;
		};
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//表单
			ruleForm: {
				Kind: 'info',
				VehicleList:[],
			},
			
			dialogVisible: false,

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
		
		// 打开弹窗
		const openDialog = async (kind: string, ) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {				
				
				state.ruleForm.VehicleList=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}


		//导入地址
		const onImportXlsx = (e: any) => {
			const file = e.raw
			const reader = new FileReader()
			reader.readAsArrayBuffer(file)
			reader.onload = (ev: any) => {
				let data = ev.target.result
				const workbook = XLSX.read(data, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length==0){
					return;
				}
				const wsname = workbook.SheetNames[0]
				const list = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
				console.log("get xlsx data：",list)
				if(!list.length||list.length<3){
					return;
				}
				state.ruleForm.VehicleList=[];
				for(let i=2;i<list.length;i++){
					const row=list[i];
					const vehicleNumber=row["__EMPTY"]||"";
					if(!vehicleNumber){
						continue;
					}
					const model={};
					model.VehicleNumber=vehicleNumber;
					model.VehicleType=row["__EMPTY_1"]||"";
					model.Shipper=row["__EMPTY_3"]||"";
					if(model.Shipper){
						model.IsExternal=1
					}else{
						model.IsExternal=0
					}
					model.Linkman=row["__EMPTY_4"]||"";
					model.Phone=row["__EMPTY_5"]||""+""; //转字符串
					model.Driver=row["__EMPTY_6"]||"";
					model.DriverMobile=row["__EMPTY_7"]||""+""; //转字符串

					model.DrivingLicense=row["__EMPTY_8"]||"";
					model.DrivingLicenseStartDate=row["__EMPTY_9"]||new Date();
					model.DrivingLicenseEndDate=row["__EMPTY_10"]||new Date();
					model.RegistrationDate=new Date();
					model.TransportLicense=row["__EMPTY_11"]||"";
					model.TransportLicenseStartDate=row["__EMPTY_12"]||new Date();
					model.TransportLicenseEndDate=row["__EMPTY_13"]||new Date();
					state.ruleForm.VehicleList.push(model);
				}
			}
		}

		const onAddRow = () => {
		 	state.ruleForm.VehicleList=[{},...state.ruleForm.VehicleList]
		};
		const onClearRow = () => {
		 	state.ruleForm.VehicleList=[]
		};
		// 下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/vehicle.xlsx";
			a.download = '车辆台账模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};
		const onDelRow = (index:number) => {
			state.ruleForm.VehicleList.splice(index,1)
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		
		//修改按钮
		const onModelEdit = (item: object) => {
			
			state.saveState = false;
			state.dialogVisible = true;
		};		
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					try {
						const res = await proxy.$api.erp.vehicle.saveMulti(state.ruleForm.Kind,state.ruleForm.VehicleList);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
							}
							proxy.$parent.onGetTableData(true);
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
		const { dateFormatYMD } = commonFunction();
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			onAddRow,
			onDelRow,
			onClearRow,
			onDownloadTpl,
			onImportXlsx,
			onBeforeImageUpload,
			onModelEdit,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
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