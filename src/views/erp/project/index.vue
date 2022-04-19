<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef"  :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="比选编号">
						<el-input  placeholder="请输入比选编号查询" v-model="tableData.param.no"> </el-input>
					</el-form-item>
					<el-form-item label="比选项目">
						<el-input  placeholder="请输入比选项目查询" v-model="tableData.param.name"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<elementRefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<elementSearch />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
						<el-button  type="primary" @click="onModelAdd" v-auth:[moduleKey]="'btn.BidProjectAdd'">
							<el-icon>
								<elementCirclePlusFilled />
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
				highlight-current-row
			>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="No" label="比选编号" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="leix" label="比选类型" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Name" label="比选项目" show-overflow-tooltip></el-table-column>
				<el-table-column prop="fanwei" label="比选范围" show-overflow-tooltip></el-table-column>
				<el-table-column prop="EndTime" label="报名截止日期" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="ReviewTime" label="评选日期" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button  type="primary" @click="onModelEdit(scope.row.Id)" v-auth:[moduleKey]="'btn.BidProjectEdit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button  type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.BidProjectDel'">
							<el-icon>
								<elementCloseBold />
							</el-icon>
							&#8197;{{ $t('message.action.delete') }}
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
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import editDlg from './component/projectEdit.vue';

export default {
	name: 'baseRoles',
	components: { editDlg },
	setup() {
		const moduleKey = 'api_pro_bidproject';
		const { proxy } = getCurrentInstance() as any;

		const editDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					name: '',
					no: '',
					pageNum: 1,
					pageSize: 20,
				},
			},
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
		const onGetTableData = (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			request({ url: '/v1/erp/project', method: 'get', params: state.tableData.param })
				.then((res) => {
					state.tableData.loading = false;
					if (res.errcode != 0) {
						return;
					}
					state.tableData.data = res.data;
					state.tableData.total = res.total;
				})
				.catch(() => {
					state.tableData.loading = false;
				});
		};
		// 打开新增用户弹窗
		const onModelAdd = () => {
			editDlgRef.value.openDialog(0);
		};
		// 打开修改用户弹窗
		const onModelEdit = (Id: number) => {
			editDlgRef.value.openDialog(Id);
		};
		// 删除用户
		const onModelDel = (Id: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					state.tableData.loading = true;
					const url = `/v1/erp/project/delete/${Id}`;
					request({
						url: url,
						method: 'post',
					})
						.then((res) => {
							state.tableData.loading = false;
							if (res.errcode == 0) {
								onGetTableData();
							}
						})
						.catch((err) => {
							state.tableData.loading = false;
						});
					return false;
				})
				.catch((err) => {});
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
			editDlgRef,
			onGetTableData,
			onResetSearch,
			onModelAdd,
			onModelEdit,
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
