<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="1" :sm="1" class="mb20">
						<el-upload ref="uploadRef" class="upload-demo" :before-upload="
								() => {return false;}" :auto-upload="false" :on-change="onImportXlsx" :show-file-list="false">
							<template #trigger>
								<el-button bg type="primary">
									{{ $t('message.action.import') }}
								</el-button>
							</template>
						</el-upload>
					</el-col>
					<el-col :xs="1" :sm="1" class="mb20 ml10">
						<el-button bg type="danger" @click="onClearRow()">
							{{ $t('message.action.clear') }}
						</el-button>
					</el-col>
					<el-col :xs="1" :sm="1" class="mb20 ml10">
						<el-button bg type="info" @click="onDownloadTpl()">
							{{ $t('message.action.download_tpl') }}
						</el-button>
					</el-col>
				</el-row>	
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="paginatedData"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="VehicleNumber" label="车牌号" width="100" align="left" fixed="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.VehicleNumber"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="StartTime" label="保险生效日期" width="120" align="center">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.StartTime"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="EndTime" label="保险结束日期" width="120" align="center">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.EndTime"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CompanyName" label="保险公司" width="180" align="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.CompanyName"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="No" label="保单号" width="180" align="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.No"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BillTime" label="购买日期" width="120" align="center">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.BillTime"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryAmount" label="交强险保额" width="180" align="right">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CompulsoryAmount"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryFee" label="交强险购买费用" width="180" align="right">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CompulsoryFee"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryStartDate" label="交强险生效日期" width="120" align="center">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CompulsoryStartDate"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryEndDate" label="交强险结束日期" width="120" align="center">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CompulsoryEndDate"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialAmount" label="商业险保额" width="180" align="right">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CommercialAmount"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialFee" label="商业险购买费用" width="180" align="right">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CommercialFee"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialStartDate" label="商业险起始日期" width="120" align="center">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CommercialStartDate"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialEndDate" label="商业险结束日期" width="120" align="center">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CommercialEndDate"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="TaxFee" label="车船税费用" width="180" align="right">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.TaxFee"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
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
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from "xlsx"; //引入
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'insuranceImport',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			//	表单
			ruleForm: {
				Kind: 'info',
				InsuranceList:[],
			},
			tableData: {
				total: 0,
				param: {
					pageNum: 1,
					pageSize: 15,
				},
			},
			Files: [],
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
		const openDialog = async (kind: string) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {				
				
				state.ruleForm.InsuranceList=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		//	导入功能
		const onImportXlsx = (e: any) => {
			const file = e.raw
			const reader = new FileReader()
			reader.readAsArrayBuffer(file)
			reader.onload = (ev: any) => {
				const rows=[]
				const unique = {};
				let data = ev.target.result
				const workbook = XLSX.read(data, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length==0){
					return;
				}
				const wsname = workbook.SheetNames[0]
				const list = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
				for(let i = 1; i < list.length; i++){
					const row=list[i];
					const vehicleNumber=row["__EMPTY"]||"";
					if(!vehicleNumber || unique[vehicleNumber]){
						continue;
					}
					unique[vehicleNumber] = true
					const model={};
					model.VehicleNumber=vehicleNumber;
					model.StartTime=row["__EMPTY_1"]||new Data();
					model.EndTime=row["__EMPTY_2"]||new Data();
					model.CompanyName=row["__EMPTY_3"]||"";
					model.No=String(row["__EMPTY_4"]||"");

					model.BillTime=row["__EMPTY_5"]||new Data();
					model.CompulsoryAmount=row["__EMPTY_6"]||"";
					model.CompulsoryFee=row["__EMPTY_7"]||"";
					model.CompulsoryStartDate=row["__EMPTY_8"]||new Data();
					model.CompulsoryEndDate=row["__EMPTY_9"]||new Data();
					model.CommercialAmount=row["__EMPTY_10"]||"";
					model.CommercialFee=row["__EMPTY_11"]||"";
					model.CommercialStartDate=row["__EMPTY_12"]||new Data();
					model.CommercialEndDate=row["__EMPTY_13"]||new Data();
					model.TaxFee=row["__EMPTY_14"]||"";
					rows.push(model);
				}
				state.tableData.total=rows.length
				state.ruleForm.InsuranceList=rows;
			}
		}

		//	导出列表新增记录
		const onAddRow = () => {
		 	state.ruleForm.InsuranceList=[{},...state.ruleForm.InsuranceList]
		};

		//	导入列表清空记录
		const onClearRow = () => {
		 	state.ruleForm.InsuranceList=[]
		};

		//	下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/insurance.xlsx";
			a.download = '保险管理模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};

		//	导入列表删除单条记录
		const onDelRow = (index:number) => {
			state.ruleForm.InsuranceList.splice(index,1)
		};

		//	分页改变
		const paginatedData = computed(() => {
			const start = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize;
			const end = start + state.tableData.param.pageSize;
			const list= state.ruleForm.InsuranceList.slice(start, end);
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
						const res = await proxy.$api.erp.vehicleinsurance.saveMulti(state.ruleForm.Kind, state.ruleForm.InsuranceList);
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

		//	时间格式
		const { dateFormatYMD } = commonFunction();

		//	页面加载时
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