<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-row :gutter="0">
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
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="paginatedData"
							
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed>
								<template #default="scope">
									<el-input
										v-model="scope.row.VehicleNumber"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BillNo" label="编号" width="80">
								<template #default="scope">
									<el-input
										v-model="scope.row.BillNo"
										placeholder="请输入"></el-input> 
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
									<el-input
										v-model="scope.row.Shipper"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="VehicleType" label="车辆类型" width="100">
								<template #default="scope">
									<el-input
										v-model="scope.row.VehicleType"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Linkman" label="联系人" width="100">
								<template #default="scope">
									<el-input
										v-model="scope.row.Linkman"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Phone" label="联系电话" width="110">
								<template #default="scope">
									<el-input
										v-model="scope.row.Phone"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Driver" label="司机姓名" width="100">
								<template #default="scope">
									<el-input
										v-model="scope.row.Driver"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DriverMobile" label="司机电话" width="110">
								<template #default="scope">
									<el-input
										v-model="scope.row.DriverMobile"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicense" label="行驶证号" width="150">
								<template #default="scope">
									<el-input
										v-model="scope.row.DrivingLicense"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenseStartDate" label="行驶证有效开始日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DrivingLicenseStartDate"
										type="date"
										placeholder="生效日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="DrivingLicenseEndDate" label="行驶证有效截止日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DrivingLicenseEndDate"
										type="date"
										placeholder="生效日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="TransportLicense" label="道路运输许可证" width="150">
								<template #default="scope">
									<el-input
										v-model="scope.row.TransportLicense"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="TransportLicenseStartDate" label="许可证有效开始日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.TransportLicenseStartDate"
										type="date"
										placeholder="请选择时间"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="TransportLicenseEndDate" label="许可证有效截止日期" width="150">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.TransportLicenseEndDate"
										type="date"
										placeholder="请选择时间"
										format="YYYY-MM-DD"></el-date-picker>
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
						<el-pagination
							small
							class="mt15"
							:page-sizes="[15, 30]"
							v-model:current-page="tableData.param.pageNum"
							background
							v-model:page-size="tableData.param.pageSize"
							layout="->, total, sizes, prev, pager, next, jumper"
							:total="tableData.total">
						</el-pagination>
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
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from "xlsx"; //引入
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'vehicleImport',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		
		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//	表单
			ruleForm: {
				Kind: 'info',
				VehicleList:[],
			},
			tableData: {
				total: 0,
				param: {
					pageNum: 1,
					pageSize: 15,
				},
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
		
		//	打开弹窗
		const openDialog = async (kind: string, ) => {
			state.Files = [];
			state.ruleForm.Kind = kind;
			try {				
				
				state.ruleForm.VehicleList=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		//	导入功能
		const onImportXlsx = (e: any) => {
			const unique = {}
			const rows = []
			const tip = [[], []]
			const reader = new FileReader()
			reader.readAsArrayBuffer(e.raw)
			reader.onload = (ev: any) => {
				const workbook = XLSX.read(ev.target.result, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length < 1){
					return;
				}

				const list = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header: ["Index", "VehicleNumber",  "BillNo", 
					"VehicleType", "IsExternal", "Shipper", "Linkman", "Phone", "Driver", "DriverMobile", "DrivingLicense", "DrivingLicenseStartDate", 
					"DrivingLicenseEndDate", "TransportLicense", "TransportLicenseStartDate", "TransportLicenseEndDate"], range: 2})
					
				list.forEach(item => {
					item.Index = parseInt(item.Index)
					item.VehicleNumber = String(item.VehicleNumber)
					item.BillNo = String(item.BillNo)
					if(item.Shipper){
						item.IsExternal = parseInt(1)
					}else{
						item.IsExternal = parseInt(0)
					}
					item.Phone = String(item.Phone)
					item.DriverMobile = String(item.DriverMobile)
					item.DrivingLicense = String(item.DrivingLicense)
					item.DrivingLicenseStartDate = dayjs(item.DrivingLicenseStartDate).add(2,"hour")
					item.DrivingLicenseEndDate = dayjs(item.DrivingLicenseEndDate).add(2,"hour")
					item.TransportLicense = String(item.TransportLicense)
					item.TransportLicenseStartDate = dayjs(item.TransportLicenseStartDate).add(2,"hour")
					item.TransportLicenseEndDate = dayjs(item.TransportLicenseEndDate).add(2,"hour")
					console.log("测试", item)
					if (item.VehicleNumber == "") {
						tip[0].push(item.Index)
					}
					if (unique[item.VehicleNumber]) {
						tip[1].push(item.Index)
						tip[1].push(unique[item.VehicleNumber])
					}else {
						unique[item.VehicleNumber] = item.Index
						rows.push(item)
						
					}
				});
				if (tip[0].length > 0) {
					ElMessageBox.alert('原因是Excel序号为（' + tip[0] + '）的车牌号为空，请检查修改表格数据后重新导入！', '导入失败', {
						confirmButtonText: '确定',
						})
				} else if (tip[1].length > 0) {
					ElMessageBox.alert('原因是Excel序号为（' + tip[1] + '）的车牌号存在重复，请检查修改表格数据后重新导入！', '导入失败', {
						confirmButtonText: '确定',
						})
				} else {
					state.ruleForm.VehicleList = rows
					state.tableData.total = rows.length
				}

			}
		}

		const onAddRow = () => {
		 	state.ruleForm.VehicleList=[{},...state.ruleForm.VehicleList]
		};

		const onClearRow = () => {
		 	state.ruleForm.VehicleList=[]
		};

		//	下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/vehicle.xlsx";
			a.download = '车辆管理模板_' + new Date().getTime() + '.xlsx'; //	下载后的文件名称
			a.click();
		};

		const onDelRow = (index:number) => {
			state.ruleForm.VehicleList.splice(index,1)
		};

		//	分页改变
		const paginatedData = computed(() => {
			const start = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize;
			const end = start + state.tableData.param.pageSize;
			const list= state.ruleForm.VehicleList.slice(start, end);
			return list;
		});

		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};
		
		//	提交
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

		const { dateFormatYMD } = commonFunction();

		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			paginatedData,
			onAddRow,
			onDelRow,
			onClearRow,
			onDownloadTpl,
			onImportXlsx,
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
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>


