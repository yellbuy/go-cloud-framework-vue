<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
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
						<el-button type="info" @click="onGetXlsData()" v-auth:[moduleKey]="'btn.ExportXls'">
							<el-icon>
								<Download />
							</el-icon>
							&#8197;{{ $t('message.action.export') }}
						</el-button>
						<el-button type="primary" @click="onOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
						<el-button type="primary" @click="onOpenImportDlg" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.import') }}
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
				highlight-current-row
			>
				<el-table-column type="index" label="序号" align="right" width="50" fixed />
				<el-table-column prop="Name" label="姓名" width="100" fixed></el-table-column>
				<el-table-column prop="Gender" label="性别" :formatter="formatGender" width="100" fixed>
				</el-table-column>
				<!-- <el-table-column label="性别" sortable width="70" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.Gender"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_driver', 'gender', scope.row.Id, scope.row.Gender)"
							:active-text="$t('message.action.male')"
							:inactive-text="$t('message.action.female')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.Gender==1" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.male') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.female') }}</el-tag>
					</template>
				</el-table-column> -->
				<el-table-column prop="Nation" label="民族" sortable width="120" show-overflow-tooltip></el-table-column>
				<!-- <el-table-column prop="Idno" label="身份证号" width="120" show-overflow-tooltip></el-table-column> -->
				<!-- <el-table-column label="外部车" width="70" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.IsExternal"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_vehicle', 'is_external', scope.row.Id, scope.row.IsExternal)"
							:active-text="$t('message.action.yes')"
							:inactive-text="$t('message.action.no')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column> -->


				<el-table-column prop="IdnoEndDate" label="身份证截止日" width="120" align="left" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="Tname" label="所属公司" width="200" show-overflow-tooltip></el-table-column>
				<el-table-column prop="DriverLicenseType" label="驾照类型" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="IdnoEndDate" label="驾照截止日" width="120" align="left" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="Mobile" label="手机号" width="120"  show-overflow-tooltip></el-table-column>
				
				<!-- <el-table-column prop="NativePlace" label="籍贯" width="120"  show-overflow-tooltip></el-table-column> -->
				<!-- <el-table-column prop="Birthdate" label="出生日期" width="120"  show-overflow-tooltip :formatter="dateFormatYMD"></el-table-column> -->
				<el-table-column prop="Address" label="住址" show-overflow-tooltip></el-table-column>
	
				<!-- <el-table-column label="状态" width="70" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_vehicle', 'state', scope.row.Id, scope.row.State)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column> -->
				
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.see') }}
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
		<importDlg ref="importDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editDlg from './component/driverEdit.vue';
import commonFunction from '/@/utils/commonFunction';
import importDlg from './component/driverImport.vue';

export default {
	name: 'driverInfo',
	components: { editDlg,importDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_baseinfo_driver`;
		const editDlgRef = ref();
		const importDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.driver.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
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

		//打开导入窗
		const onOpenImportDlg = () => {
			importDlgRef.value.openDialog(state.kind);
		};

		// 删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.driver.delete(Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};

			// 导出表格数据
		const onGetXlsData = async () => {
			const res = await proxy.$api.erp.vehicle.exportXlsByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
			if (!res.data || res.data.size == 0) {
				return;
			} 
			// 返回不为空
			var url = window.URL.createObjectURL(res.data);
			var a = document.createElement('a');
			a.href = url;
			a.download = '司机台账_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
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
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		//性别展示
		const formatGender = (row: object) => {
			return row.gender === 1 ? '男' : '女'
		};

		const { dateFormatYMD } = commonFunction();

		return {
			proxy,
			editDlgRef,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMD,
			onGetXlsData,
			onOpenImportDlg,
			importDlgRef,
			formatGender,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
