<template>
	<div class="system-user-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="small" placeholder="请输入用户名称" style="max-width: 180px" > </el-input>
				<el-button size="small" class="ml10" @click="onGetTableData">
					<el-icon>
						<elementSearch />
					</el-icon>
					{{ $t('message.action.search') }}
				</el-button>
				<el-button size="small" type="primary" class="ml10" @click="onOpenAddUser">
					<el-icon>
						<elementFolderAdd />
					</el-icon>
					{{ $t('message.action.add') }}
				</el-button>
			</div>
			<el-table :data="tableData.data"
				v-loading="tableData.loading" style="width: 100%" size="mini" 
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="Username" label="账户名" width="120" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Name" label="名称" width="130" show-overflow-tooltip></el-table-column>
				
				<el-table-column prop="Tel" label="电话" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Email" label="邮箱" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Enable" label="用户状态" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" size="mini" v-if="scope.row.Enable">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" size="mini" v-else>{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template #default="scope">
						<el-button size="mini" type="primary" @click="onOpenEditUser(scope.row)">
							<el-icon>
								<elementEdit />
							</el-icon>
					{{ $t('message.action.edit') }}</el-button>
						<el-button size="mini" type="danger" @click="onRowDel(scope.row)">
							<el-icon>
								<elementDelete />
							</el-icon>
							{{ $t('message.action.delete') }}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<EditUser ref="editUserRef" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect,onMounted, ref, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import EditUser from '/@/views/base/user/component/editUser.vue';

import { getUserList } from '/@/api/base/user';
export default {
	name: 'baseUsers',
	components: { EditUser },
	setup() {
		const editUserRef = ref();
		const state: any = reactive({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.param.pageIndex=computed(()=>{
			return state.tableData.param.pageNum-1;
		})
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })
		

		// 初始化表格数据
		const onGetTableData = () => {
			state.tableData.loading=true;
			getUserList(state.tableData.param).then((res)=>{
				state.tableData.loading=false;
				if(res.errcode!=0){
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			}).catch(() => {
				state.tableData.loading=false;
			});
			
		};
		// 打开新增用户弹窗
		const onOpenAddUser = () => {
			editUserRef.value.openDialog({});
		};
		// 打开修改用户弹窗
		const onOpenEditUser = (row: Object) => {
			editUserRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`此操作将删除账户：“${row.Username}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
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
			editUserRef,
			onGetTableData,
			onOpenAddUser,
			onOpenEditUser,
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
.system-user-container {
}
</style>
