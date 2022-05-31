<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="tabsName">
				<el-tab-pane label="基础代码" name="commondata"> </el-tab-pane>
				<el-tab-pane v-for="(item, key) in tableKindData.data" :key="key" :label="item.Name" :name="item.Code"> </el-tab-pane>
			</el-tabs>
			<el-form  :model="tableData.param" label-width="90px" :inline="true">
				<el-form-item label="名称">
					<el-input  placeholder="请输入名称" v-model="tableData.param.name"> </el-input>
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
					<el-button  type="primary" @click="onOpenCommondata(0)">
						<el-icon>
							<CirclePlusFilled />
						</el-icon>
						&#8197;{{ $t('message.action.add') }}
					</el-button>
				</el-form-item>
				<el-form-item></el-form-item>
			</el-form>
			<el-table
				:data="tableData.data"
				style="width: 100%"
				v-loading="tableData.loading"
				
				:height="proxy.$calcMainHeight(-170)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Name" label="名称" show-overflow-tooltip />
				<el-table-column prop="Code" label="编码" show-overflow-tooltip />
				<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)">
					<template #default="scope">
						<el-button  type="primary" @click="onOpenCommondata(scope.row.Id)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button  type="danger" @click="onRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
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
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<commondataEdit ref="commondataEditRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import commondataEdit from './component/edit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import request from '/@/utils/request';
export default {
	name: 'baseUsers',
	components: { commondataEdit },
	setup() {
		const commondataEditRef = ref();
		const moduleKey = 'api_ims_parameter';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			activeName: 'commondata',
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					type: 'commondata',
					pageNum: 1,
					pageSize: 20,
					name: '',
				},
			},
			tableKindData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					type: 'commondata',
					pageNum: 1,
					pageSize: 20,
					name: '',
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onLoadTable(true);
		});
		//切换页面
		const tabsName = () => {
			state.tableData.param.type = state.activeName;
			state.tableData.param.name = '';
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (refresh: boolean) => {
			onGetTableData(refresh);
		};
		// 打开弹窗
		const onOpenCommondata = (id: string) => {
			commondataEditRef.value.openDialog(state.activeName, id, false);
		};
		const onResetSearch = () => {
			state.tableData.param.name = '';
			onGetTableData(true);
		};
		const onGetTableKindData = () => {
			state.tableData.param.pageNum = 1;
			state.tableData.param.pageSize = 10;
			request({ url: `/v1/common/commonpagedata`, method: 'get', params: state.tableKindData.param })
				.then((res) => {
					if (res.errcode != 0) {
						if (res.errcode != 0) {
							ElMessage.warning(res.errmsg);
							return;
						}
					}
					state.tableKindData.data = res.data;
					state.tableKindData.total = res.total;
				})
				.catch(() => {});
		};
		//查询表格数据
		const onGetTableData = (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			request({ url: `/v1/common/commonpagedata`, method: 'get', params: state.tableData.param })
				.then((res) => {
					state.tableData.loading = false;
					if (res.errcode != 0) {
						if (res.errcode != 0) {
							ElMessage.warning(res.errmsg);
							return;
						}
					}
					if (state.activeName == 'commondata') {
						onGetTableKindData();
					}
					state.tableData.data = res.data;
					state.tableData.total = res.total;
					console.log('执行');
				})
				.catch(() => {
					state.tableData.loading = false;
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
		const onRowDel = (Id: number) => {
			ElMessageBox.confirm(`确定要删除当前记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					state.tableData.loading = true;

					const url = `/v1/common/commondata/delete/${Id}`;
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
		return {
			commondataEditRef,
			onOpenCommondata,
			onGetTableData,
			onGetTableKindData,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			onResetSearch,
			tabsName,
			onLoadTable,
			proxy,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
	padding: 32px;
	background-color: #f4f5f7;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
