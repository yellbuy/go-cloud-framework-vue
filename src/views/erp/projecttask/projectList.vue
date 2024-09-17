<template>
	<div class="base-freight-container">
			<splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 100%">
				<pane :size="40">
					<el-card shadow="hover">
						<div>
							<el-form ref="searchFormRef" :model="mainTableData.param" label-suffix="："  label-width="60px" :inline="true">
								<el-form-item label="关键字" style="width:130px">
									<el-input
										placeholder="输入关键字查询"
										v-model="mainTableData.param.keyword"/>
								</el-form-item>
								<el-form-item label="状态">
									<el-select v-model="mainTableData.param.state" placeholder="项目状态" style="width: 80px">
										<el-option label="不限" :value="-1"></el-option>
										<el-option label="进行中" :value="1"></el-option>
										<el-option label="未开始" :value="0"></el-option>
										<el-option label="已完成" :value="2"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="info" @click="onMainResetSearch">
										<el-icon>
											<RefreshLeft />
										</el-icon>
										{{ $t('message.action.reset') }}
									</el-button>
									<el-button type="info" @click="onMainGetTableData(true)">
										<el-icon>
											<Search />
										</el-icon>
										&#8197;{{ $t('message.action.search') }}
									</el-button>
									<el-button type="primary" @click="onMainOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.ProjectAdd'">
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
						ref="mainTableRef"
						:data="mainTableData.data"
						@current-change="onMainCurrentChange"
						v-loading="mainTableData.loading"
						:default-sort="{ prop: 'Sn' }"
						style="width: 100%"
						:height="proxy.$calcMainHeight(-125)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="Sn" label="流水号" width="110" sortable  fixed></el-table-column>
						<el-table-column prop="Name" label="项目名称" width="160" sortable  show-overflow-tooltip></el-table-column>
						<el-table-column prop="State" label="状态" width="70" sortable align="center">
							<template #default="scope">
								<el-tag type="danger"  v-if="scope.row.State==0" effect="dark">未开始</el-tag> 
								<el-tag type="success" v-else-if="scope.row.State==1" effect="dark">进行中</el-tag>
								<el-tag type="primary" v-else-if="scope.row.State==2" effect="dark">已结束</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="StartTime" label="开始时间" width="90" sortable  :formatter="dateFormatYMD" ></el-table-column>
						<el-table-column prop="Remark" label="项目备注" width="240" show-overflow-tooltip></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)" fixed="right">
							<template #default="scope">
								<el-dropdown split-button >
									{{ $t('message.action.operate') }}
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item @click="onMainCopy(scope.row.Id, false)" v-auth:[moduleKey]="'btn.ProjectAdd'">
												<el-text type="primary" >{{ $t('message.action.copy') }}</el-text>
											</el-dropdown-item>
											<el-dropdown-item @click="onMainOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.ProjectEdit'">
												<el-text type="primary" >{{ $t('message.action.edit') }}</el-text>
											</el-dropdown-item>
											<el-dropdown-item @click="onMainOpenEditDlg(scope.row.Id, true)">
												<el-text >{{ $t('message.action.see') }}</el-text>
											</el-dropdown-item>
											<el-dropdown-item divided @click="onMainDel(scope.row.Id)" v-auth:[moduleKey]="'btn.ProjectDel'">
												<el-text type="danger" >{{ $t('message.action.delete') }}</el-text>
											</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onMainHandleSizeChange"
						@current-change="onMainHandleCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="mainTableData.param.pageNum"
						background
						v-model:page-size="mainTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="mainTableData.total">
					</el-pagination>
				</el-card>
				</pane>
				<pane :size="60">
					<el-card shadow="hover">
						<div >
							<el-form ref="searchFormRef" :model="childTableData.param" label-suffix="：" label-width="60px" :inline="true">
								<el-form-item label="关键字">
									<el-input placeholder="输入关键字查询" style="width:80px" v-model="childTableData.param.keyword"> </el-input>
								</el-form-item>
								<el-form-item label="日期" style="width:250px; white-space: nowrap;" >
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
								<el-form-item label="" >
									<el-checkbox v-model="childTableData.param.allProject" :true-label="true" :false-label="false">不限项目</el-checkbox>
								</el-form-item>
								<el-form-item>
									<el-button type="info" @click="onChildResetSearch">
										<el-icon>
											<RefreshLeft />
										</el-icon>
										{{ $t('message.action.reset') }}
									</el-button>
									<el-button type="info" @click="onChildQuery()">
										<el-icon>
											<Search />
										</el-icon>
										&#8197;{{ $t('message.action.search') }}
									</el-button>
									<el-button type="primary" @click="onChildBatchFinish()" v-auth:[moduleKey]="'btn.TaskEdit'">
										<el-icon>
											<CirclePlusFilled />
										</el-icon>
										&#8197;{{ $t('message.action.finish') }}
									</el-button>
									<el-button type="primary" @click="onChildOpenAddDlg(0, false)" v-auth:[moduleKey]="'btn.TaskAdd'">
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
							ref="childTableRef"
							:data="childTableData.data"
							v-loading="childTableData.loading"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-125)"
							border
							stripe
							selectable
							highlight-current-row>
							<el-table-column type="selection" width="55" align="center" fixed />
							<!-- <el-table-column type="expand" fixed>
								<template #default="props">
									<el-card shadow="hover" :body-style="{ padding: '6px' }">
									<h2><el-text class="mx-1" type="info">任务单号: </el-text><el-text class="mx-1" type="primary">{{ props.row.WaybillBillNo }}</el-text></h2>
									<h3><el-text class="mx-1" type="info">客户名称: </el-text><el-text class="mx-1" >{{ props.row.WaybillCustomerName }}</el-text></h3>
									<h3><el-text class="mx-1" type="info">品名规格: </el-text><el-text class="mx-1" >{{ props.row.WaybillGoodsName }}</el-text></h3>
									<h3><el-text class="mx-1" type="info">发货地址: </el-text><el-text class="mx-1" >{{ props.row.WaybillSenderAddress }}</el-text></h3>
									<h3><el-text class="mx-1" type="info">收货地址: </el-text><el-text class="mx-1" >{{ props.row.WaybillReceiverAddress }}</el-text></h3>
									</el-card>
								</template>
							</el-table-column> -->
							<el-table-column prop="Sn" label="流水号" width="110" sortable fixed></el-table-column>
							<el-table-column prop="Name" label="工单分类" width="90" sortable align="center" fixed show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="Title" label="工单标题" width="120" sortable show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="TaskType" label="工单类型" width="90" sortable align="center">
							</el-table-column>
							<el-table-column prop="TaskMode" label="处理方式" width="90" sortable align="center">
								<template #default="scope">
									<el-tag type="success" v-if="scope.row.TaskMode==1" effect="dark">现场</el-tag>
									<el-tag type="primary" v-else-if="scope.row.TaskMode==2" effect="dark">远程</el-tag>
								</template>
							</el-table-column>
							
							<el-table-column label="处理完成" width="90" sortable align="center" >
								<template #default="scope">
									<el-switch
										v-model="scope.row.FinishState"
										inline-prompt
										:width="46"
										v-auth:[moduleKey]="'btn.TaskEdit'"
										@change="proxy.$api.common.table.updateExtById('erp_project_task', 'finish_state', scope.row.Id, scope.row.FinishState,'finish_time')"
										:active-text="$t('message.action.yes')"
										:inactive-text="$t('message.action.no')"
										:active-value="1"
										:inactive-value="0"/> 
									<el-tag type="success" effect="plain" v-if="scope.row.FinishState" v-no-auth:[moduleKey]="'btn.TaskEdit'">{{ $t('message.action.yes') }}</el-tag>
									<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.TaskEdit'">{{ $t('message.action.no') }}</el-tag>
								</template>
							</el-table-column>
							<el-table-column prop="TaskTime" label="工单时间" width="90" sortable :formatter="dateFormatYMD" ></el-table-column>
							<el-table-column prop="Address" label="地点" align="center" width="70" sortable show-overflow-tooltip></el-table-column>
							<el-table-column prop="Content" label="处理内容" show-overflow-tooltip>
							</el-table-column>
							<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)" fixed="right">
								<template #default="scope">
									<el-dropdown split-button>
										{{ $t('message.action.operate') }}
										<template #dropdown>
											<el-dropdown-menu>
												<el-dropdown-item @click="onChildCopy(scope.row.Id, false)" v-auth:[moduleKey]="'btn.TaskAdd'">
													<el-text type="primary" >{{ $t('message.action.copy') }}</el-text>
												</el-dropdown-item>
												<el-dropdown-item @click="onChildOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.TaskEdit'">
													<el-text type="primary" >{{ $t('message.action.edit') }}</el-text>
												</el-dropdown-item>
												<el-dropdown-item @click="onChildOpenEditDlg(scope.row.Id, true)">
													<el-text  >{{ $t('message.action.see') }}</el-text>
												</el-dropdown-item>
												<el-dropdown-item @click="onChildDel(scope.row.Id,scope.row.projectId)" divided v-auth:[moduleKey]="'btn.TaskDel'">
													<el-text type="danger">{{ $t('message.action.delete') }}</el-text>
												</el-dropdown-item>
											</el-dropdown-menu>
										</template>
									</el-dropdown>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination
							small
							@size-change="onChildHandleSizeChange"
							@current-change="onChildHandleCurrentChange"
							class="mt15"
							:page-sizes="[10, 20, 30, 50, 100]"
							v-model:current-page="childTableData.param.pageNum"
							background
							v-model:page-size="childTableData.param.pageSize"
							layout="->, total, sizes, prev, pager, next, jumper"
							:total="childTableData.total">
						</el-pagination>
					</el-card>
				</pane>
			</splitpanes>
		<editMainDlg ref="editMainDlgRef" />
		<editChildDlg ref="editChildDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editMainDlg from './component/projectEdit.vue';
import editChildDlg from './component/taskEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'projectTaskList',
	components: { editMainDlg, editChildDlg, Splitpanes, Pane },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_erp_projecttask`;
		const editMainDlgRef = ref();
		const editChildDlgRef = ref();
		const mainTableRef = ref();
		const childTableRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			paneSize: 100,
			kind,
			scopeMode,
			scopeValue,
			mainCurrentRow:null,
			timeRange: [],
			mainTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					state: 1,
					pageNum: 1,
					pageSize: 20,
				},
			},
			childTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					allProject:true, //查询所有项目
					projectId:'0',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
		});
		state.mainTableData.param.pageIndex = computed(() => {
			return state.mainTableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onMainResetSearch = () => {
			state.mainTableData.param.keyword = '';
			onMainGetTableData(true);
		};

		const onMainCurrentChange = (row) => {
			if(!row){
				return;
			}
			state.mainCurrentRow = row
			if(row){
				state.childTableData.param.allProject=false;
			} else {
				state.childTableData.param.allProject=true;
			}
			onChildGetTableData(true)
		}

		//	初始化表格数据
		const onMainGetTableData = async (gotoFirstPage: boolean = false) => {
			
			if (gotoFirstPage) {
				state.mainTableData.param.pageNum = 1;
			}
			state.mainTableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.mainTableData.param);
				if (res.errcode != 0) {
					return;
				}
				
				state.mainTableData.data = res.data;
				state.mainTableData.total = res.total;
			} finally {
				state.mainTableData.loading = false;
			}
		};

		//	复制
		const onMainCopy = async (id: string, ishow: boolean) => {
			state.mainTableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.copy(id);
				if (res.errcode == 0) {
					onMainGetTableData(true)
				}
			} finally {
				state.mainTableData.loading = false;
			}
			return false;
		};
		//	打开弹窗
		const onMainOpenEditDlg = (id: string, ishow: boolean) => {
			editMainDlgRef.value.openDialog(state.kind, id, ishow);
		};
		//	删除用户
		const onMainDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.project.delete(Id);
					if (res.errcode == 0) {
						onMainGetTableData();
					}
				} finally {
					state.mainTableData.loading = false;
				}
				return false;
			});
		};

		//	分页改变
		const onMainHandleSizeChange = (val: number) => {
			state.mainTableData.param.pageSize = val;
			onMainGetTableData();
		};

		//	分页改变
		const onMainHandleCurrentChange = (val: number) => {
			state.mainTableData.param.pageNum = val;
			onMainGetTableData();
		};

		state.childTableData.param.pageIndex = computed(() => {
			return state.childTableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onChildResetSearch = () => {
			state.childTableData.param.keyword = '';
			state.childTableData.param.isTodayAll=state.childTableData.isTodayAll
			onChildGetTableData(true);
		};

		//重置查询条件
		const onChildQuery = () => {
			onChildGetTableData(true);
		};

		// 初始化表格数据
		const onChildGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.childTableData.param.pageNum = 1;
			}
			state.childTableData.loading = true;
			if(state.childTableData.param.allProject || !state.mainCurrentRow){
				state.childTableData.param.projectId='0'				
			} else{
				state.childTableData.param.projectId=state.mainCurrentRow.Id
			}
			try {
				const res = await proxy.$api.erp.projectTask.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.childTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.childTableData.data = res.data;
				state.childTableData.total = res.total;
			} finally {
				state.childTableData.loading = false;
			}
		};

		//	复制
		const onChildCopy = async (id: string, ishow: boolean) => {
			state.childTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectTask.copy(id);
				if (res.errcode == 0) {
					onChildGetTableData(true)
				}
			} finally {
				state.childTableData.loading = false;
			}
			return false;
		};

		//	打开弹窗
		const onChildOpenAddDlg = (id: string, ishow: boolean) => {
			editChildDlgRef.value.openDialog(state.kind, '0', state.mainCurrentRow?.Id||'',state.mainCurrentRow?.Name||"", ishow);
		};
		//	打开弹窗
		const onChildOpenEditDlg = (id: string, ishow: boolean) => {
			editChildDlgRef.value.openDialog(state.kind, id, '0','', ishow);
		};
		//批量结束
		const onChildBatchFinish= async ()=>{
			const rows=childTableRef.value.getSelectionRows();
			const ids=rows.map((val)=>{return val.Id});
			const success= await proxy.$api.common.table.updateExtByIds('erp_project_task', 'finish_state', ids, 1,'finish_time')	
			if(success){
				onChildGetTableData();
			}
		}
		

		//	删除用户
		const onChildDel = (id: string,projectId:string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.projectTask.delete(id,projectId);
					if (res.errcode == 0) {
						onMainGetTableData();
						onChildGetTableData();
					}
				} finally {
					state.childTableData.loading = false;
				}
				return false;
			});
		};

		//	分页改变
		const onChildHandleSizeChange = (val: number) => {
			state.childTableData.param.pageSize = val;
			onChildGetTableData();
		};

		//	分页改变
		const onChildHandleCurrentChange = (val: number) => {
			state.childTableData.param.pageNum = val;
			onChildGetTableData();
		};

		//	页面加载时
		onMounted(() => {
			onMainGetTableData();
			onChildGetTableData();
		});

		const { dateFormatYMD } = commonFunction();

		return {
			proxy,
			editMainDlgRef,
			editChildDlgRef,
			mainTableRef,
			childTableRef,
			onMainCurrentChange,
			onMainGetTableData,
			onMainResetSearch,
			onMainOpenEditDlg,
			onMainCopy,
			onMainDel,
			onMainHandleSizeChange,
			onMainHandleCurrentChange,
			onChildQuery,
			onChildGetTableData,
			onChildResetSearch,
			onChildOpenAddDlg,
			onChildOpenEditDlg,
			onChildCopy,
			onChildBatchFinish,
			onChildDel,
			onChildHandleSizeChange,
			onChildHandleCurrentChange,
			dateFormatYMD,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.splitpanes__pane {
	justify-content: center;
	align-items: center;
	display: flex;
	position: relative;
	color: var(--color-primary-light-5);
	border: 1px solid #ebeef5;
}
</style>
