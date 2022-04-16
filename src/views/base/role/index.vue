<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef"  :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="角色名称：">
						<el-input  placeholder="请输入角色名称查询" v-model="tableData.param.name"> </el-input>
					</el-form-item>
					<el-form-item>
							<el-button type="info" @click="onResetSearch">
								<el-icon>
									<elementRefreshLeft />
								</el-icon>
								&#8197;{{ $t('message.action.reset') }}
							</el-button>
							<el-button type="info" @click="onGetTableData(true)">
								<el-icon>
									<elementSearch />
								</el-icon>
								&#8197;{{ $t('message.action.search') }}
							</el-button>
							<el-button  type="primary" @click="onModelAdd" v-auth:[moduleKey]="'btn.Add'">
								<el-icon>
									<elementCirclePlusFilled />
								</el-icon>
								&#8197;{{ $t('message.action.add') }}
							</el-button>
					</el-form-item>
					<el-form-item></el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data"
				v-loading="tableData.loading" style="width: 100%"  :height="proxy.$calcMainHeight(-75)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="Name" label="角色名称" width="120" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Code" label="角色代码" width="120" show-overflow-tooltip></el-table-column>
				
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
				
				<el-table-column label="操作" width="180" fixed="right">
					<template #default="scope">
						<el-button plain  type="primary" @click="onModelEdit(scope.row)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button plain  type="danger" @click="onModelDel(scope.row)" v-auth:[moduleKey]="'btn.Del'">
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
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import editDlg from './component/roleEdit.vue';

export default {
	name: 'baseRoles',
	components: { editDlg },
	setup() {
		const moduleKey='api_base_role';
		const { proxy } = getCurrentInstance() as any;

		const editDlgRef = ref();
		const state: any = reactive({
			moduleKey:moduleKey,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
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
		
		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
			state.tableData.loading=true;
			try{
				const res=await proxy.$api.base.role.getList(state.tableData.param);
				if(res.errcode!=0){
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading=false;
			}
		};
		// 打开新增用户弹窗
		const onModelAdd = () => {
			editDlgRef.value.openDialog({});
		};
		// 打开修改用户弹窗
		const onModelEdit = (row: Object) => {
			editDlgRef.value.openDialog(row);
		};
		// 删除用户
		const onModelDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除角色“${row.Name}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading=true;
				try{
					const res=await proxy.$api.base.role.delete(row.Id);
					if(res.errcode!=0){
						return;
					}
					onGetTableData();
				} finally {
					state.tableData.loading=false;
				}
				return false;
			}).catch((err) => {
			});
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
