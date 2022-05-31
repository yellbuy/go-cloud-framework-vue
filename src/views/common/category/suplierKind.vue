<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-button size="mini" type="primary" @click="onOpenCommondata(0)" v-auth:[moduleKey]="'btn.CategoryAdd'">
				<el-icon>
					<CirclePlusFilled />
				</el-icon>
				&#8197;{{ $t('message.action.add') }}
			</el-button>
			<el-table
				:data="kindTableData.data"
				style="width: 100%"
				v-loading="kindTableData.loading"
				size="mini"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Name" label="类别名称" show-overflow-tooltip />
				<el-table-column prop="Description" label="类别描述" show-overflow-tooltip />
				<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
					<template #default="scope">
						<el-button size="mini" type="primary" @click="onOpenCommondata(scope.row.Id)" v-auth:[moduleKey]="'btn.CategoryEdit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button size="mini" type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.CategoryDel'">
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
				v-model:current-page="kindTableData.param.pageNum"
				background
				v-model:page-size="kindTableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="kindTableData.total"
			>
			</el-pagination>
		</el-card>
		<suplierKindEdit ref="suplierKindEditRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { getPageCategoryList } from '../../../api/common/category';
import suplierKindEdit from '../category/component/suplierKindEdit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import request from '/@/utils/request';
export default {
	name: 'systemSupKind',
	components: { suplierKindEdit },
	setup() {
		const suplierKindEditRef = ref();
		const moduleKey = 'api_company_supkind';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			activeName: 'supplier',
			kindTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					kind: 'supplier',
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onGetKindTableData(true);
		});
		// 打开弹窗
		const onOpenCommondata = (id: string) => {
			suplierKindEditRef.value.openDialog(state.activeName, id);
		};
		//表格数据
		const onGetKindTableData = (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.kindTableData.param.pageNum = 1;
			}
			state.kindTableData.loading = true;
			getPageCategoryList(state.kindTableData.param)
				.then((res) => {
					state.kindTableData.loading = false;
					if (res.errcode != 0) {
						if (res.errcode != 0) {
							ElMessage.warning(res.errmsg);
							return;
						}
					}
					state.kindTableData.data = res.data;
					state.kindTableData.total = res.total;
				})
				.catch(() => {
					state.kindTableData.loading = false;
				});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.kindTableData.param.pageSize = val;
			onGetKindTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.kindTableData.param.pageNum = val;
			onGetKindTableData();
		};
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					state.kindTableData.loading = true;

					const url = `/v1/admin/common/category/delete/${row.Id}`;
					request({
						url: url,
						method: 'post',
					})
						.then((res) => {
							state.kindTableData.loading = false;
							if (res.errcode == 0) {
								onGetKindTableData();
							}
						})
						.catch((err) => {
							state.kindTableData.loading = false;
						});
					return false;
				})
				.catch((err) => {});
		};
		return {
			suplierKindEditRef,
			onOpenCommondata,
			onGetKindTableData,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
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
