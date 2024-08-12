<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="60px" :inline="true">
					<el-form-item label="手机号">
						<el-input placeholder="请输入关键字" v-model="tableData.param.mobile" style="width: 150px;"/>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input placeholder="请输入关键字" v-model="tableData.param.name" style="width: 150px;"/>
					</el-form-item>
					
					<el-form-item label="部门">
							<el-select multiple v-model="tableData.param.kind" placeholder="请选择" style="width: 150px;">
								<el-option v-for="(item, index) in companyOption" :key="index" :label="item.Name" :value="item.Id" />
							</el-select>
						</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							&#8197;{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
						<el-button type="primary" @click="onOpenAddUser">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ '创建' }}
						</el-button>
					</el-form-item>
					<el-form-item> </el-form-item>
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
				<el-table-column prop="Id" label="专家编号" align="right" width="150" fixed />
				<el-table-column prop="Mobile" label="专家手机号" width="100" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Name" label="专家姓名" width="80" show-overflow-tooltip></el-table-column>
				<el-table-column prop="WorkPlace" label="工作单位/科室" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Position" label="职务" width="110" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Alias" label="职称" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Remark" label="评审范围" width="300" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Address" label="通信地址" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row)">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ '编辑' }}
						</el-button>
						<el-button text bg type="danger" @click="onRowDel(scope.row)">
							<el-icon>
								<CloseBold />
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
				v-model:current-page="tableData.param.current"
				background
				v-model:page-size="tableData.param.size"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total">
			</el-pagination>
		</el-card>
		<expertEdit ref="expertEditRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import expertEdit from './component/expertEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'baseUsers',
	components: { expertEdit },
	setup() {
		const moduleKey = 'api_base_org';
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const vip = route.params.vip;
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		console.log('路由', route.query);
		const IsState = route.query.hasParentid;
		const expertEditRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			vip,
			kind,
			scopeMode,
			scopeValue,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					isExternal: 1,
					name: '',
					current: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.account = '';
			state.tableData.param.name = '';
			onGetTableData(true);
		};
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.current+1;
		// })

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.current = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.base.user.getList(state.tableData.param);
				// const res = await proxy.$api.base.user.getList(state.tableData.param);
				if (res.errcode == 0) {
					state.tableData.data = res.data;
					state.tableData.total = res.total;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		// 打开新增用户弹窗
		const onOpenAddUser = () => {
			expertEditRef.value.openDialog({}, IsState, parseInt(state.vip));
		};
		// 打开修改用户弹窗
		const onOpenEditDlg = (row: Object) => {
			expertEditRef.value.openDialog(row, IsState);
		};
		// 删除用户
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除账户“${row.Name}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.base.user.delete(row.Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
			});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
			onGetTableData();
		};
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			expertEditRef,
			IsState,
			onGetTableData,
			onResetSearch,
			onOpenAddUser,
			onOpenEditDlg,
			onRowDel,
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
