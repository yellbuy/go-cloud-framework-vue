<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="供应商：">
						<el-input placeholder="请输入供应商名称查询" v-model="tableData.param.name"> </el-input>
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
						<el-button type="primary" @click="onModelAdd(false)" v-auth:[moduleKey]="'btn.CompanyAdd'">
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
				size="mini"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="CompanyName" label="供应商名称" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="CompanyAlias" label="供应商别名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateBy" label="创建人" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateTime" label="公司注册时间" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="UpdateBy" label="更改人" show-overflow-tooltip></el-table-column>
				<el-table-column prop="UpdateTime" label="更新时间" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Linkman" label="联系人"></el-table-column>
				<el-table-column label="供应商状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.State == 0">开启</el-tag>
						<el-tag type="danger" v-if="scope.row.State == 1">禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" :width="proxy.$calcWidth(280)" fixed="right">
					<template #default="scope">
						<el-button size="mini" type="warning" @click="onModelDisable(scope.row)" v-auth:[moduleKey]="'btn.CompanyDisable'">
							<span v-if="scope.row.State == 0">{{ $t('message.action.disable') }}</span>
							<span v-if="scope.row.State == 1">{{ $t('message.action.enable') }}</span>
						</el-button>
						<el-button size="mini" type="primary" @click="onModelEdit(scope.row.Id, false)" v-auth:[moduleKey]="'btn.CompanyEdit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button size="mini" @click="onModelEdit(scope.row.Id, true)" v-auth:[moduleKey]="'btn.CompanyEdit'">
							{{ $t('message.action.see') }}
						</el-button>
						<el-button size="mini" type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.CompanyDel'">
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
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import editDlg from './component/companyEdit.vue';

export default {
	name: 'companyInfo',
	components: { editDlg },
	setup() {
		const moduleKey = 'api_company_info';
		const { proxy } = getCurrentInstance() as any;

		const editDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					kind: 'erp_company_supplier',
					name: '',
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
			state.tableData.param.name = '';
			onGetTableData(true);
		};

		// 初始化表格数据
		const onGetTableData = (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			request({ url: '/v1/erp/company', method: 'get', params: state.tableData.param })
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
		const onModelAdd = (state: boolean) => {
			editDlgRef.value.openDialog(0, state);
		};
		// 打开修改用户弹窗
		const onModelEdit = (id: string, state: boolean) => {
			editDlgRef.value.openDialog(id, state);
		};
		// 删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					state.tableData.loading = true;
					const url = `/v1/erp/company/delete/${Id}`;
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
		const onModelDisable = (row: object) => {
			var disableState = 1;
			if (row.State == 1) {
				disableState = 0;
			}
			request({
				url: 'v1/erp/company/disable',
				method: 'post',
				params: { id: row.Id, state: disableState },
			})
				.then((res) => {
					state.tableData.loading = false;
					if (res.errcode == 0) {
						setTimeout(() => {
							ElMessage.success('操作成功！');
						}, 300);
						onGetTableData();
					}
				})
				.catch((err) => {
					state.tableData.loading = false;
				});
			return false;
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

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			editDlgRef,
			onGetTableData,
			onResetSearch,
			onModelAdd,
			onModelEdit,
			onModelDel,
			onModelDisable,
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
