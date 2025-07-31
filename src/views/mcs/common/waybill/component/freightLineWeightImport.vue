<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-row :gutter="0">
					<el-col :xs="2" :sm="1" class="mb20">
						<el-upload ref="uploadRef" class="upload-demo" :with-credentials="true" :before-upload="
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
							<el-table-column prop="VehicleNumber" label="车牌号" width="120" fixed>
								<template #default="scope">
									<el-input
										v-model="scope.row.VehicleNumber"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BeginTime" label="发货时间" width="180">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.BeginTime"
										type="datetime"
										empty-values=""
										format="YYYY-MM-DD HH:mm:ss"
										date-format="YYYY-MM-DD"
										time-format="HH:mm"
										placeholder="请输入发货时间"
										style="width:150px;"
									/>
								</template>
							</el-table-column>
							<el-table-column prop="SenderTotalWeight" label="发货总重" width="100">
								<template #default="scope">
									<el-input-number :min="0" controls-position="right" :precision="2" style="width:90px;"
										v-model="scope.row.SenderTotalWeight"
										placeholder="请输入"></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="SenderTruckWeight" label="发货车重" width="100">
								<template #default="scope">
									<el-input-number :min="0" controls-position="right" :precision="2" style="width:90px;"
										v-model="scope.row.SenderTruckWeight"
										placeholder="请输入"></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="SenderNetWeight" label="发货净重" width="100">
								<template #default="scope">
									<el-input-number :min="0" controls-position="right" :precision="2" style="width:90px;"
										v-model="scope.row.SenderNetWeight"
										placeholder="请输入"></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="SenderBillNo" label="发货磅单号" width="150">
								<template #default="scope">
									<el-input
										v-model="scope.row.SenderBillNo"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="FinishTime" label="卸货时间" width="180">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.FinishTime"
										type="datetime"
										empty-values=""
										format="YYYY-MM-DD HH:mm:ss"
										date-format="YYYY-MM-DD"
										time-format="HH:mm"
										placeholder="请输入卸货时间"
										style="width:150px;"
									/>
								</template>
							</el-table-column>
							<el-table-column prop="ReceiverTotalWeight" label="卸货总重" width="100">
								<template #default="scope">
									<el-input-number :min="0" controls-position="right" :precision="2" style="width:90px;"
										v-model="scope.row.ReceiverTotalWeight"
										placeholder="请输入"></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="ReceiverTruckWeight" label="卸货车重" width="100">
								<template #default="scope">
									<el-input-number :min="0" controls-position="right" :precision="2" style="width:90px;"
										v-model="scope.row.ReceiverTruckWeight"
										placeholder="请输入"></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="ReceiverNetWeight" label="卸货净重" width="100">
								<template #default="scope">
									<el-input-number :min="0" controls-position="right" :precision="2" style="width:90px;"
										v-model="scope.row.ReceiverNetWeight"
										placeholder="请输入"></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="ReceiverBillNo" label="卸货磅单号" width="150">
								<template #default="scope">
									<el-input
										v-model="scope.row.ReceiverBillNo"
										placeholder="请输入"></el-input> 
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
				Kind: 'plan',
				WaybillId:"0",
				WaybillLineList:[],
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
		const openDialog = async (kind: string, waybillId:number|string) => {
			state.Files = [];
			state.ruleForm.Kind = kind;
			state.ruleForm.WaybillId=waybillId;
			try {				
				
				state.ruleForm.WaybillLineList=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		//	导入功能
		const onImportXlsx = (e: any) => {
			console.log("onImportXlsx")
			const rows = []
			const tip = [[], []]
			const reader = new FileReader()
			reader.readAsArrayBuffer(e.raw)
			reader.onload = (ev: any) => {
				console.log("测试")
				const workbook = XLSX.read(ev.target.result, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length < 1){
					return;
				}
				
				const list = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header: ["VehicleNumber", "SenderBillNo", "BeginTime", "SenderTotalWeight", "SenderTruckWeight", "SenderNetWeight", "ReceiverBillNo", "FinishTime",  "ReceiverTotalWeight", "ReceiverTruckWeight", "ReceiverNetWeight"], range: 2})
					
				list.forEach(item => {
					console.log("item.BeginTime :",item.BeginTime)
					const curTime=dayjs().format("YYYY-MM-DD HH:mm:ss");
					item.VehicleNumber = String(item.VehicleNumber||"")
					item.BeginTime = dayjs(item.BeginTime||"").format("YYYY-MM-DD HH:mm:ss");
					item.FinishTime = dayjs(item.FinishTime||"").format("YYYY-MM-DD HH:mm:ss");
					item.SenderTotalWeight = Number.parseFloat(item.SenderTotalWeight)||0
					item.SenderTruckWeight = Number.parseFloat(item.SenderTruckWeight)||0
					item.SenderNetWeight = Number.parseFloat(item.SenderNetWeight)||0
					if(item.SenderNetWeight>0){
						item.BeginState=1
						if(!item.BeginTime){
							item.BeginTime=curTime
						}else{
							item.BeginTime=item.BeginTime||"";
						}
					} else{
						item.BeginState=0
						item.BeginTime=''
					}
					item.SenderBillNo = String(item.SenderBillNo||"")

					item.ReceiverTotalWeight = Number.parseFloat(item.ReceiverTotalWeight)||0
					item.ReceiverTruckWeight = Number.parseFloat(item.ReceiverTruckWeight)||0
					item.ReceiverNetWeight = Number.parseFloat(item.ReceiverNetWeight)||0
					if(item.ReceiverNetWeight>0){
						item.ReceiverState=1
						if(!item.BeginTime){
							item.ReceiverTime=curTime
						} else{
							item.ReceiverTime=item.ReceiverTime||"";
						}
					} else{
						item.ReceiverState=0
						item.ReceiverTime=''
					}
					item.ReceiverBillNo = String(item.ReceiverBillNo||"")
					rows.push(item)
					
					if (item.VehicleNumber == "") {
						tip[0].push(item.VehicleNumber)
					}
				});
				if (tip[0].length > 0) {
					ElMessageBox.alert('车牌号为空，请检查修改表格数据后重新导入！', '导入失败', {
						confirmButtonText: '确定',
						})
				} else {
					state.ruleForm.WaybillLineList = rows
					state.tableData.total = rows.length
				}

			}
		}

		const onAddRow = () => {
		 	state.ruleForm.WaybillLineList=[{},...state.ruleForm.WaybillLineList]
		};

		const onClearRow = () => {
		 	state.ruleForm.WaybillLineList=[]
		};

		//	下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/waybillline_freight_import.xlsx";
			a.download = '任务单运量模板_' + new Date().getTime() + '.xlsx'; //	下载后的文件名称
			a.click();
		};

		const onDelRow = (index:number) => {
			state.ruleForm.WaybillLineList.splice(index,1)
		};

		//	分页改变
		const paginatedData = computed(() => {
			const start = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize;
			const end = start + state.tableData.param.pageSize;
			const list= state.ruleForm.WaybillLineList.slice(start, end);
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
						const res = await proxy.$api.erp.waybillLine.importMulti(state.ruleForm.Kind,state.ruleForm.WaybillId,state.ruleForm.WaybillLineList);
						if (res.errcode == 0) {
							closeDialog();
							if(state.ruleForm.Kind=="plan"){
								proxy.$parent.onPlanGetTableData();
							} else{
								proxy.$parent.onChildGetTableData();
							}
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


