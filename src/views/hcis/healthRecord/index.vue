<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item label="是否跟进：">
						<el-select v-model="tableData.param.isFollowUp" placeholder="请选择" style="width:80px">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="未跟进" :value="0"></el-option>
							<el-option label="已跟进" :value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否干预：">
						<el-select v-model="tableData.param.isIntervene" style="width:80px" placeholder="请选择">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="未干预" :value="0"></el-option>
							<el-option label="已干预" :value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" style="width:120px" v-model="tableData.param.keyword"> </el-input>
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
						<el-button type="primary" @click="onOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
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
				<el-table-column prop="Name" label="姓名" width="70" fixed show-overflow-tooltip></el-table-column>
				<el-table-column prop="Sn" label="编号" width="110"></el-table-column>
				<el-table-column label="性别" width="60" align="center">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.Gender==1">{{ $t('message.action.male') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else>{{ $t('message.action.female') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Contact" label="联系方式" width="100"></el-table-column>
				<el-table-column prop="Linkman" label="联系人" width="70"></el-table-column>				
				<el-table-column prop="Phone" label="电话" width="100"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="Birthday" label="出生年月" width="80" :formatter="dateFormatYM" show-overflow-tooltip> </el-table-column>
				<!-- <el-table-column prop="Mileage" label="公里数" width="70" align="right"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="DrivingLicense" label="行驶证" width="120"  show-overflow-tooltip></el-table-column> -->
				
				<!-- <el-table-column prop="TransportLicense" label="道路运输证" width="120"  show-overflow-tooltip></el-table-column> -->
				<el-table-column label="状态" width="70" align="center">
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('hcis_health_record', 'state', scope.row.Id, scope.row.State)"
							:active-text="$t('message.action.valid')"
							:inactive-text="$t('message.action.invalid')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Address" label="地址" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateBy" label="录入人" width="80" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="primary" @click="onOpenFollowUpDlg(scope.row, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('pages.hcis.healthRecord.follow_up') }}
						</el-button>
						<el-button text bg type="primary" @click="onOpenInterveneUpDlg(scope.row, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('pages.hcis.healthRecord.intervene') }}
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
		<followUpEditDlg ref="editFollowUpRef" />
		<interveneEditDlg ref="editInterveneRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import followUpEditDlg from './component/followUpEdit.vue';
import editDlg from './component/healthRecordEdit.vue';
import interveneEditDlg from './component/interveneEdit.vue';
// import interveneEditDlg from './component/healthRecordEdit.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'healthRecordInfo',
	components: { editDlg,followUpEditDlg,interveneEditDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_hcis_healthrecord`;
		const editDlgRef = ref();
		const editFollowUpRef=ref();
		const editInterveneRef=ref();
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
					isFollowUp:-1,
					isIntervene:-1,
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
			state.tableData.param.isIntervene = -1;
			state.tableData.param.isFollowUp = -1;
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
				const res = await proxy.$api.hcis.healthRecord.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};
		// 打开编辑弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
		};
		// 打开编辑弹窗
		const onOpenFollowUpDlg = (row: object, ishow: boolean) => {
			editFollowUpRef.value.openDialog(state.kind, row.Id,row.Name, ishow);
		};
		// 打开编辑弹窗
		const onOpenInterveneUpDlg = (row: object, ishow: boolean) => {
			editInterveneRef.value.openDialog(state.kind, row.Id,row.Name, ishow);
		};
		
		// 删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.hcis.healthRecord.delete(Id);
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
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYM } = commonFunction();

		return {
			proxy,
			editDlgRef,
			editFollowUpRef,
			editInterveneRef,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
			onOpenFollowUpDlg,
			onOpenInterveneUpDlg,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
