<template>
	<div class="system-user-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="small" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-button size="small" type="primary" class="ml10">
					<el-icon>
						<Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="small" type="success" class="ml10" @click="onOpenAddUser">
					<el-icon>
						<FolderAdd />
					</el-icon>
					新增用户
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="50" />
				<el-table-column prop="userName" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userNickname" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleSign" label="关联角色" show-overflow-tooltip></el-table-column>
				<el-table-column prop="department" label="部门" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="describe" label="用户描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)">
					<template #default="scope">
						<el-button text bg :disabled="scope.row.userName === 'admin'" type="primary" @click="onOpenEditUser(scope.row)">修改</el-button>
						<el-button text bg :disabled="scope.row.userName === 'admin'" type="danger" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30,50,100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<AddUer ref="addUserRef" />
		<EditUser ref="editUserRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddUer from '/@/views/system/user/component/addUser.vue';
import EditUser from '/@/views/system/user/component/editUser.vue';
export default {
	name: 'systemUser',
	components: { AddUer, EditUser },
	setup() {
		const addUserRef = ref();
		const editUserRef = ref();
		const state: any = reactive({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
			},
		});
		// 初始化表格数据
		const initTableData = () => {
			const data: Array<object> = [];
			for (let i = 0; i < 2; i++) {
				data.push({
					userName: i === 0 ? 'admin' : 'test',
					userNickname: i === 0 ? '我是管理员' : '我是普通用户',
					roleSign: i === 0 ? 'admin' : 'common',
					department: i === 0 ? ['vueNextAdmin', 'IT外包服务'] : ['vueNextAdmin', '资本控股'],
					phone: '12345678910',
					email: 'vueNextAdmin@123.com',
					sex: '女',
					password: '123456',
					overdueTime: new Date(),
					status: true,
					describe: i === 0 ? '不可删除' : '测试用户',
					createTime: new Date().toLocaleString(),
				});
			}
			state.tableData.data = data;
			state.tableData.total = state.tableData.data.length;
		};
		// 打开新增用户弹窗
		const onOpenAddUser = () => {
			addUserRef.value.openDialog();
		};
		// 打开修改用户弹窗
		const onOpenEditUser = (row: Object) => {
			editUserRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
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
			initTableData();
		});
		return {
			addUserRef,
			editUserRef,
			onOpenAddUser,
			onOpenEditUser,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.system-user-container {
}
</style>
