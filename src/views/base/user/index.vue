<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef"  :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item label="账户名：">
						<el-input  placeholder="请输入账号名查询" v-model="tableData.param.username"> </el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input  placeholder="请输入姓名查询" v-model="tableData.param.name"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button  @click="onResetSearch">
							<el-icon>
								<elementRefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
					</el-form-item>
					<el-form-item>
						<el-button  @click="onGetTableData(true)">
							<el-icon>
								<elementSearch />
							</el-icon>
							{{ $t('message.action.search') }}
						</el-button>
					</el-form-item>
					<el-form-item v-auth:[moduleKey]="'btn.UserAdd'"> 
						<el-button  type="primary" @click="onOpenAddUser"  >
							<el-icon>
								<elementPlus />
							</el-icon>
							{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
					<el-form-item>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data" 
				v-loading="tableData.loading" style="width: 100%"  :height="proxy.$calcMainHeight(-90)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="Username" label="账户名" width="120" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Name" label="姓名" width="130" show-overflow-tooltip></el-table-column>
				
				<el-table-column prop="Tel" label="电话" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Email" label="邮箱" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Enable" label="用户状态" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" effect="plain"  v-if="scope.row.Enable">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain"  v-else>{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="80" align="right" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="LoginTime" label="最后登录时间" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template #default="scope">
						<el-button  plain type="primary" @click="onOpenuserEdit(scope.row)" v-auth:[moduleKey]="'btn.UserEdit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button  plain type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.UserDel'">
							<el-icon>
								<elementCloseBold />
							</el-icon>
							{{ $t('message.action.delete') }}
						</el-button>
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
		<userEdit ref="userEditRef" />
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import userEdit from './component/userEdit.vue';
import other from '/@/utils/other';
import { getUserList } from '/@/api/base/user';
export default {
	name: 'baseUsers',
	components: { userEdit },
	setup() {
		const moduleKey='api_base_org';
		const { proxy } = getCurrentInstance() as any;
		const userEditRef = ref();
		const state: any = reactive({
			moduleKey:moduleKey,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					username:"",
					name:"",
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.param.pageIndex=computed(()=>{
			return state.tableData.param.pageNum-1;
		})
		//重置查询条件
		const onResetSearch=()=>{
			state.tableData.param.username="";
			state.tableData.param.name="";
			onGetTableData(true)
		}
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })
		

		// 初始化表格数据
		const onGetTableData = (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
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
			userEditRef.value.openDialog({});
		};
		// 打开修改用户弹窗
		const onOpenuserEdit = (row: Object) => {
			userEditRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除账户“${row.Username}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				state.tableData.loading=true;
				const url=`/v1/base/user/delete/${row.Id}`;
				request({
					url: url,
					method: 'post',
				}).then((res)=>{
					state.tableData.loading=false;
					if(res.errcode==0){
						onGetTableData();
					}
				}).catch((err)=>{
					state.tableData.loading=false;
				});
				return false;
			}).catch((err) => {
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
