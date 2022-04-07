<template>
	<div class="base-concretedata-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabsName">
				<el-tab-pane v-for="(item, key) in concreteDataList.data" :key="key" :label="item.Name" :name="item.Code"> </el-tab-pane>
				<el-tab-pane label="基础代码" name="concretedata"> </el-tab-pane>
			</el-tabs>
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-90)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" width="50" align="right" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Name" label="名称" show-overflow-tooltip />
				<el-table-column prop="Code" label="编码" show-overflow-tooltip />
				<el-table-column prop="Status" label="状态" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" effect="plain"  v-if="scope.row.Status">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain"  v-else>{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="80" align="right" show-overflow-tooltip />
				<el-table-column fixed="right" label="操作" width="180" show-overflow-tooltip>
					<template #header>
						<el-button  type="primary" @click="onOpenCommonDataDlg(0)">
							<el-icon>
								<elementCirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<elementRefresh />
							</el-icon>
							&#8197;{{ $t('message.action.refresh') }}
						</el-button>
					</template>
					<template #default="scope">
						<el-button  type="primary" plain @click="onOpenCommonDataDlg(scope.row.Id)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button  type="danger" plain @click="onRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
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
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<concreteDataEdit ref="commondataEditRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import concreteDataEdit from './component/concreteDataEdit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import request from '/@/utils/request';
export default {
	name: 'baseUsers',
	components: { concreteDataEdit },
	setup() {
		const commondataEditRef = ref();
		const moduleKey = 'api_common_concretedata';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			activeName: 'concretedata',
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					type: 'concretedata',
					pageNum: 1,
					pageSize: 20,
					name: '',
				},
			},
			concreteDataList: {
				data: [],
				loading: false,
				param: {
					type: 'concretedata',
					pageNum: 1,
					pageSize: 20,
					name: '',
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onGetConcreteData(true);
		});
		//切换页面
		const tabsName = () => {
			state.tableData.param.type = state.activeName;
			state.tableData.param.name = '';
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (gotoFirstPage: boolean) => {
			onGetTableData(gotoFirstPage);
		};
		// 打开弹窗
		const onOpenCommonDataDlg = (id: string) => {
			commondataEditRef.value.openDialog(state.activeName, id, false);
		};
		const onGetConcreteData = (isInit:boolean=false) => {
			state.tableData.param.pageNum = 1;
			state.tableData.param.pageSize = 10;
			request({ url: `/v1/admin/common/commondata`, method: 'get',params:{type:'concretedata',pateSize:100000}})
				.then((res) => {
					if (res.errcode == 0) {
						state.concreteDataList.data = res.data;
						if(isInit && res.data && res.data.length>0){
							state.activeName=res.data[0].Code;
							onLoadTable(true);
						}
					}
				})
				.catch(() => {});
		};
		//查询表格数据
		const onGetTableData = (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			request({ url: `/v1/admin/common/commondata`, method: 'get',params:{type:state.tableData.param.type} })
				.then((res) => {
					state.tableData.loading = false;
					if (res.errcode != 0) {
						if (res.errcode != 0) {
							ElMessage.warning(res.errmsg);
							return;
						}
					}
					if (state.activeName == 'concretedata') {
						onGetConcreteData();
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
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					state.tableData.loading = true;

					const url = `/v1/admin/common/commondata/delete/${Id}`;
					request({
						url: url,
						method: 'post',
					})
						.then((res) => {
							state.tableData.loading = false;
							if (res.errcode == 0) {
								onGetTableData();
							}
							if (state.activeName == 'concretedata') {
								onGetConcreteData();
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
			onOpenCommonDataDlg,
			onGetTableData,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
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
