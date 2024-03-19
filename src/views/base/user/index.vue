<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item label="账户名：">
						<el-input placeholder="请输入账号名查询" v-model="tableData.param.username"> </el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input placeholder="请输入姓名查询" v-model="tableData.param.name"> </el-input>
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
						<el-button type="primary" @click="onOpenAddUser" v-auth:[moduleKey]="'btn.UserAdd'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
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
				highlight-current-row
			>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="Username" label="登录账号" width="100" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Name" label="姓名" width="100" show-overflow-tooltip></el-table-column>

				<el-table-column prop="Tel" label="电话" width="110" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Email" label="邮箱" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Enable" label="状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.Enable"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.UserEdit'"
							@change="proxy.$api.common.table.updateById('base_user', 'Enable', scope.row.Id, scope.row.Enable)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.Enable" v-no-auth:[moduleKey]="'btn.UserEdit'">{{
							$t('message.action.enable')
						}}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.UserEdit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="100" align="center">
					<template #header>
						<el-button
							type="text"
							v-if="tableData.data"
							@click="proxy.$api.common.table.update('base_user', 'Order', tableData.data || [], 0)"
							v-auth:[moduleKey]="'btn.UserEdit'"
						>
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;排序{{ $t('message.action.update') }}
						</el-button>
						<span v-no-auth:[moduleKey]="'btn.UserEdit'">排序</span>
					</template>
					<template #default="scope">
						<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.UserEdit'">
						</el-input>
						<span v-no-auth:[moduleKey]="'btn.UserEdit'">{{ scope.row.Order }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="IsAdmin" label="管理员" width="70" align="center">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.IsAdmin">{{ $t('message.action.yes') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else>{{ $t('message.action.no') }}</el-tag>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="Order" label="排序" width="80" align="right" show-overflow-tooltip>
				</el-table-column> -->
				<el-table-column prop="RoleNames" label="所属角色" width="180" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="LoginTime" label="最后登录时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>

				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenuserEdit(scope.row)" v-auth:[moduleKey]="'btn.UserEdit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.UserDel'">
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
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<userEdit ref="userEditRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import userEdit from './component/userEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'baseUsers',
	components: { userEdit },
	setup() {
		const moduleKey = 'api_base_user';
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		console.log('路由', route.query);
		const IsState = route.query.hasParentid;
		const userEditRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					username: '',
					name: '',
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
			state.tableData.param.username = '';
			state.tableData.param.name = '';
			onGetTableData(true);
		};
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.base.user.getList(state.tableData.param);
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
			userEditRef.value.openDialog({}, IsState, 0);
		};
		// 打开修改用户弹窗
		const onOpenuserEdit = (row: Object) => {
			userEditRef.value.openDialog(row, IsState);
		};
		// 删除用户
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除账户“${row.Username}”吗?`, '提示', {
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
			userEditRef,
			IsState,
			onGetTableData,
			onResetSearch,
			onOpenAddUser,
			onOpenuserEdit,
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
