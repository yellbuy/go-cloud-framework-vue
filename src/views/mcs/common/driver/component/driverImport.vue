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
							:data="ruleForm.DriverList"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row
						>
							<el-table-column prop="Name" label="姓名" width="80" fixed>
								<template #default="scope">
									<el-input v-model="scope.row.Name" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Gender" label="性别" width="80">
								<template #default="scope">
									<el-input v-model="scope.row.Gender" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Nation" label="民族" width="80">
								<template #default="scope">
									<el-input v-model="scope.row.Nation" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Birthday" label="出生日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.Birthday"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="NativePlace" label="籍贯" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.NativePlace" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="IDNumber" label="身份证号" width="180">
								<template #default="scope">
									<el-input v-model="scope.row.IDNumber" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="IDEndDate" label="身份证截止日" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.IDEndDate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenceType" label="驾驶证类型" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.DrivingLicenceType" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenseRecordDate" label="驾驶证登记日" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DrivingLicenseRecordDate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenseIndate" label="驾驶证有效期" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.DrivingLicenseIndate" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenseEndDate" label="驾驶证截止日" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DrivingLicenseEndDate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="Phone" label="手机号" width="120">
								<template #default="scope">
									<el-input v-model="scope.row.Phone" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="HouseAddress" label="家庭地址" width="400">
								<template #default="scope">
									<el-input v-model="scope.row.HouseAddress" ></el-input> 
								</template>
							</el-table-column>
							<!-- <el-table-column prop="TransportLicenseEndDate" label="所属公司" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.TransportLicenseEndDate"
										type="date"
										placeholder="生效日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column> -->
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
				DriverList:[],
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
				
				state.ruleForm.DriverList=[];
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
				if(!list.length||list.length<2){
					return;
				}
				state.ruleForm.DriverList=[];
				for(let i=2;i<list.length;i++){
					const row=list[i];
					const Name=row["__EMPTY"]||"";
					console.log(Name)
					if(!Name){
						continue;
					}
					const model={};
					model.Name=Name;
					model.Gender=row["__EMPTY_1"]||"";
					model.Nation=row["__EMPTY_2"]||"";
					model.Birthday=row["__EMPTY_3"]||new Date();
					model.NativePlace=row["__EMPTY_4"]||"";
					model.IDNumber=row["__EMPTY_5"]||"";
					model.IDEndDate=row["__EMPTY_6"]||new Date();
					model.DrivingLicenceType=row["__EMPTY_7"]||"";
					model.DrivingLicenseRecordDate=row["__EMPTY_8"]||new Date();
					model.DrivingLicenseIndate=row["__EMPTY_9"]||"";
					model.DrivingLicenseEndDate=row["__EMPTY_10"]||new Date();
					model.Phone=row["__EMPTY_11"]||"";
					model.HouseAddress=row["__EMPTY_12"]||"";
					state.ruleForm.DriverList.push(model);
				}
			}
		}

		const onAddRow = () => {
		 	state.ruleForm.DriverList=[{},...state.ruleForm.DriverList]
		};
		const onClearRow = () => {
		 	state.ruleForm.DriverList=[]
		};
		// 下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/vehicle.xlsx";
			a.download = '司机台账模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};
		const onDelRow = (index:number) => {
			state.ruleForm.DriverList.splice(index,1)
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
						const res = await proxy.$api.erp.driver.saveMulti(state.ruleForm.Kind, state.ruleForm.DriverList);
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
.el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}
</style>