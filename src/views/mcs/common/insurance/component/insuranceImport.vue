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
							:data="ruleForm.InsuranceList"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="VehicleNumber" label="车牌号" width="100" align="left" show-overflow-tooltip fixed="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.VehicleNumber"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="StartTime" label="保险生效日期" width="120" align="center" show-overflow-tooltip>
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.StartTime"
										style="width: 100%"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="EndTime" label="保险结束日期" width="120" align="center" show-overflow-tooltip>
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.EndTime"
										style="width: 100%"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CompanyName" label="保险公司" width="180" align="left" show-overflow-tooltip>
								<template #default="scope">
									<el-input
										v-model="scope.row.CompanyName"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="No" label="保单号" width="180" align="left" show-overflow-tooltip>
								<template #default="scope">
									<el-input
										v-model="scope.row.No"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BillTime" label="购买日期" width="120" align="center" show-overflow-tooltip>
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.BillTime"
										style="width: 100%"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryAmount" label="交强险保额" width="180" align="right" show-overflow-tooltip>
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CompulsoryAmount"
										style="width: 100%"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryFee" label="交强险购买费用" width="180" align="right" show-overflow-tooltip>
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CompulsoryFee"
										style="width: 100%"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryStartDate" label="交强险生效日期" width="120" align="center" show-overflow-tooltip>
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CompulsoryStartDate"
										style="width: 100%"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CompulsoryEndDate" label="交强险结束日期" width="120" align="center" show-overflow-tooltip>
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CompulsoryEndDate"
										style="width: 100%"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialAmount" label="商业险保额" width="180" align="right" show-overflow-tooltip>
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CommercialAmount"
										style="width: 100%"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialFee" label="商业险购买费用" width="180" align="right" show-overflow-tooltip>
								<template #default="scope">
									<el-input-number
										v-model="scope.row.CommercialFee"
										style="width: 100%"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialStartDate" label="商业险起始日期" width="120" align="center" show-overflow-tooltip>
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CommercialStartDate"
										style="width: 100%"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="CommercialEndDate" label="商业险结束日期" width="120" align="center" show-overflow-tooltip>
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.CommercialEndDate"
										style="width: 100%"
										type="date"
										placeholder="请选择日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="TaxFee" label="车船税费用" width="180" align="right" show-overflow-tooltip>
								<template #default="scope">
									<el-input-number
										v-model="scope.row.TaxFee"
										style="width: 100%"
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
				Kind: 'repair',
				InsuranceListList:[],
			},
			
			dialogVisible: false,

			tableData: [],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			GoodsAlisaList: [],
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
				let num = 0
				if(!list.length||list.length<2){
					num = 0
				}else if (list.length>100){
					num = 100;
				}else{
					num = list.length;
				}
				state.ruleForm.InsuranceList=[];
				const rows=[]
				for(let i=1;i<num;i++){
					//console.log("测试。。。。。。。。。。。。")
					const row=list[i];
					const VehicleNumber=row["__EMPTY"]||"";
					
					if(!VehicleNumber){
						continue;
					}
					const model={};

					model.VehicleNumber=VehicleNumber;
					model.StartTime=row["__EMPTY_1"]||new Data();
					model.EndTime=row["__EMPTY_2"]||new Data();
					model.CompanyName=row["__EMPTY_3"]||"";
					model.No=row["__EMPTY_4"]||"";
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
				state.ruleForm.InsuranceList=rows;
			}
		}

		const onAddRow = () => {
		 	state.ruleForm.InsuranceList=[{},...state.ruleForm.InsuranceList]
		};
		const onClearRow = () => {
		 	state.ruleForm.InsuranceList=[]
		};
		// 下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/insurance.xlsx";
			a.download = '保险管理模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};
		const onDelRow = (index:number) => {
			state.ruleForm.InsuranceList.splice(index,1)
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
						const res = await proxy.$api.erp.vehicleInsurance.saveMulti(state.ruleForm.Kind, state.ruleForm.InsuranceList);
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