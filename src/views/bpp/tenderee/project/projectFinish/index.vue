<template>
	<div class="base-role-container">
		<div>
			<el-card shadow="hover">
				<div class="">
					<el-form ref="searchFormRef" :model="tableData.param" label-width="60px" :inline="true">
						<el-form-item label="名称">
							<el-input placeholder="请输入关键字" v-model="tableData.param.no" style="width: 150px;"/>
						</el-form-item>
						<el-form-item label="类别">
							<el-select multiple v-model="tableData.param.kind" placeholder="请选择" style="width: 150px;">
								<el-option v-for="(item, index) in companyOption" :key="index" :label="item.Name" :value="item.Id" />
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
						</el-form-item>
						<el-form-item></el-form-item>
					</el-form>
				</div>
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="Name" label="比选编号" show-overflow-tooltip/>
					<el-table-column prop="Kind" label="比选类型" width="120" show-overflow-tooltip/>
					<el-table-column prop="Info" label="比选项目" width="120" show-overflow-tooltip/>
					<el-table-column prop="Kind" label="比选范围" width="120" show-overflow-tooltip/>
					<el-table-column prop="Companytime" label="报名截止日期" width="120" show-overflow-tooltip/>
					<el-table-column prop="Usertime" label="评选日期" width="120" show-overflow-tooltip/>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
						<template #default="scope">
							<el-button text bg @click="onModelSee(scope.row.Id, false)">
								{{ $t('message.action.see') }}
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
					v-model:current-page="tableData.param.current"
					background
					v-model:page-size="tableData.param.pageSize"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</el-card>
			<!-- <editDlg ref="editDlgRef" /> -->
		</div>
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import commonFunction from '/@/utils/commonFunction';
// import editDlg from '../bid/component/projectSee.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'manager',
	components: {  },
	setup() {
		const store = useStore();
		const route = useRoute();
		const kind = route.params.kind;
		const mode = route.params.mode;
		const isBid = route.params.isBid;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_pro_project_${kind}_${mode}`;
		const { proxy } = getCurrentInstance() as any;
		const editDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			tableData: {
				data: [{Name:"攀枝花xx公司", Kind:"网络", Info:2, Companytime:"2024-7-19", Usertime:"2023-7-19"}],
				total: 0,
				loading: false,
				param: {
					name: '',
					no: '',
					phone:'',
					kind:'',
					current: 1,
					pageSize: 20,
					isBid: Boolean(isBid),
				},
			},
			isSelection: true,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.name = '';
			state.tableData.param.no = '';
			state.tableData.current = 1
			state.tableData.pageSize = 20
			onGetTableData();
		};

		// 初始化表格数据
		const onGetTableData = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 打开修改用户弹窗
		const onModelEdit = (Id: number) => {
			editDlgRef.value.openDialog(state.kind, Id);
		};

		//打开查看数据弹窗
		const onModelSee = (Id: string, state: boolean) => {
			editDlgRef.value.openDialog(Id, state);
		};

		// 删除用户
		const onModelDel = (Id: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.erp.project.delete(Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};

		// 改变单页数量
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};

		// 改变页数
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
		};

		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM, dateFormat } = commonFunction();

		return {
			proxy,
			editDlgRef,
			onGetTableData,
			onResetSearch,
			onModelEdit,
			onModelSee,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
