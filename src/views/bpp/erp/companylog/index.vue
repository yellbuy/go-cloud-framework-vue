<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="比选编号">
						<el-input placeholder="请输入比选编号查询" v-model="tableData.param.no"> </el-input>
					</el-form-item>
					<el-form-item label="比选项目">
						<el-input placeholder="请输入比选项目查询" v-model="tableData.param.name"> </el-input>
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
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				style="width: 100%"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<!-- <el-table-column prop="No" label="比选编号" show-overflow-tooltip fixed></el-table-column> -->
				<el-table-column prop="Kind" label="文件类型" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.Kind == 'tender'">标书费</span>
						<span v-else-if="scope.row.Kind == 'bond'">招标保证金</span>
					</template>
				</el-table-column>
				<el-table-column prop="AuditState" label="审核状态" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.AuditState == 0">待审核</span>
						<span v-else-if="scope.row.AuditState == 1">通过</span>
						<span v-else-if="scope.row.AuditState == 2">未通过</span>
					</template>
				</el-table-column>
				<el-table-column prop="Name" label="文件名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateTime" label="上传日期" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateBy" label="上传人" show-overflow-tooltip></el-table-column>
				<el-table-column prop="AuditTime" label="审核日期" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="AuditBy" label="审核人" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(120)" fixed="right">
					<!-- <template #default="scope">
						</template> -->
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
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'project',
	components: {},
	setup() {
		const store = useStore();
		const route = useRoute();
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_pro_com_log`;
		const { proxy } = getCurrentInstance() as any;
		const state: any = reactive({
			scopeMode,
			scopeValue,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					kinds: 'tender,bond',
					pageNum: 1,
					pageSize: 20,
				},
			},
			isSelection: true,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.name = '';
			state.tableData.param.no = '';
			onGetTableData(true);
		};

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectcompanylog.getListByScope(state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
		};
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			onGetTableData,
			onResetSearch,
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
