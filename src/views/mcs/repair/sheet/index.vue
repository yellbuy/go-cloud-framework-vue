<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="60px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
					</el-form-item>
					<el-form-item label="进厂时间" style="width:250px; white-space: nowrap;" >
						<el-date-picker
							v-model="timeRange"
							type="daterange"
							unlink-panels
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							format="YYYY-MM-DD"
							date-format="YYYY/MM/DD"/>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select v-model="tableData.param.state" placeholder="维修状态" style="width: 90px">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="未开单" :value="0"></el-option>
							<el-option label="已开单" :value="1"></el-option>
							<el-option label="已完工" :value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="委外：">
						<el-select v-model="tableData.param.isExternal" placeholder="是否委外" style="width: 80px">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="否" :value="0"></el-option>
							<el-option label="是" :value="1"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
						<el-button type="primary" @click="onAddWorkerOpenDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
					<el-form-item></el-form-item>
				</el-form>
			</div>
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				style="width: 100%"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="BillNo" label="维修单号" width="110" sortable  fixed></el-table-column>
				<el-table-column prop="VehicleNumber" label="车牌号" width="100" sortable fixed></el-table-column>
				<el-table-column label="是否委外" prop="IsExternal" width="90" align="center" sortable show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.IsExternal"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_vehicle', 'is_external', scope.row.Id, scope.row.IsExternal)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"/>
						<el-tag type="success" effect="plain" v-if="scope.row.IsExternal" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="State" width="80" align="center" sortable show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="danger" effect="plain" v-if="!scope.row.State">{{ $t('pages.mcs.action.not_billing') }}</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.State==1">{{ $t('pages.mcs.action.has_billed') }}</el-tag>
						<el-tag type="success" effect="plain" v-else>{{ $t('pages.mcs.action.has_finished') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="StartTime" label="进厂时间" width="120" sortable :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="EndTime" label="出厂时间" width="120" sortable :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<!-- <el-table-column prop="BillTime" label="开单时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column> -->
				<el-table-column prop="CompanyName" label="客户名称" width="120" sortable show-overflow-tooltip></el-table-column>
				
				<el-table-column prop="Brand" label="车辆品牌" width="100" sortable fixed></el-table-column>
				<el-table-column  prop="VehicleType" label="车型" width="110" sortable align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Linkman" label="联系人" sortable width="90"></el-table-column>
				<el-table-column prop="Phone" label="联系电话" sortable width="120"  show-overflow-tooltip></el-table-column>
				<el-table-column  prop="ExamState" label="维修类型" sortable width="90" align="center" show-overflow-tooltip>
					<template #default="scope">
						<div v-for="val in repairTypeList" :key="val.Id" >
							<el-tag :type="val.Value" effect="plain"  v-if="val.Code==scope.row.ExamState">{{val.Name }}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(240)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg @click="onSeeWorkerOpenDlg(scope.row.Id, true)">
							{{ $t('message.action.see') }}
						</el-button>
						<el-button text bg type="primary" @click="onOpenPrintDlg(scope.row.Id)">
							{{ $t('message.action.print') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<editDlg ref="editDlgRef" />
		<addWorkerDlg ref="addWorkerDlgRef" />
		<seeWorkerDlg ref="seeWorkerDlgRef" />
		<printDlg ref="printDlgRef"/>
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import addWorkerDlg from './component/sheetAdd.vue';
import editDlg from './component/sheetEdit.vue';
import printDlg from './component/sheetPrint.vue';
import seeWorkerDlg from './component/sheetSee.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'repairSheetList',
	components: { editDlg,printDlg,addWorkerDlg,seeWorkerDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const router =  useRouter();
		const kind = "repair";
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		console.log("scope:",scopeMode,scopeValue);
		const moduleKey = `api_repair_sheet`;
		const editDlgRef = ref();
		const printDlgRef=ref()
		const addWorkerDlgRef = ref();
		const seeWorkerDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			timeRange: [],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					enterStartTime:"",
					enterEndTime:"",
					state:-1,
					isExternal:-1,
					pageNum: 1,
					pageSize: 20,
				},
			},
			repairTypeList:[],
			examList:{},
		});
		const loadExamList= async()=>{
			const res = await proxy.$api.common.commondata.getConcreteDataListByScope("repair_type", 1, 2);
			if (res.errcode != 0) {
				return;
			}
			if (res.data.length>0){
				state.repairTypeList=res.data
				for(let item of res.data){
					//console.log("循环数据",item)
					state.examList[item.Code] =item.Name
				}
			}
			console.log("repair_type list:",state.examList)
		}
		
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			state.tableData.param.state = -1;
			state.tableData.param.isExternal = -1;
			onGetTableData(true);
		};

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (state.timeRange && state.timeRange.length>1) {
				state.tableData.param.enterStartTime = state.timeRange[0]
				state.tableData.param.enterEndTime = state.timeRange[1]
			}
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.vehicle.getListByScope("repair", scopeMode, scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};
		// 打开弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
		};
		// 打开弹窗
		const onOpenPrintDlg = (id: string) => {
			printDlgRef.value.onPrintJs(id);
		};
		// 删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.vehicle.delete(Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};
		// 页面跳转
		const routerPath= ()=>{
			//console.log(router)
			router.push('/admin/mcs/repair/sheet/0/0');
		}
		// 页面加载时
		onMounted(() => {
			onGetTableData();
			loadExamList()
		});

		const { dateFormatYMDHM } = commonFunction();

		const onAddWorkerOpenDlg = (id: string, ishow: boolean) => {
			addWorkerDlgRef.value.openDialog(state.kind, id, ishow);
		};
		const onSeeWorkerOpenDlg = (id: string, ishow: boolean) => {
			seeWorkerDlgRef.value.openDialog(state.kind, id, ishow);
		};

		return {
			proxy,
			editDlgRef,
			printDlgRef,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
			onOpenPrintDlg,
			onAddWorkerOpenDlg,
			onSeeWorkerOpenDlg,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			routerPath,
			addWorkerDlgRef,
			seeWorkerDlgRef,
			loadExamList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">

</style>
