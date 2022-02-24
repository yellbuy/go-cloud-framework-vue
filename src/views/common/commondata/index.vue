<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" type="card" class="demo-tabs">
				<el-tab-pane label="资格评审" name="zgps">
					<el-button size="mini" type="primary" @click="onOpenCommondata(0)">
						<el-icon>
							<elementPlus />
						</el-icon>
						{{ $t('message.action.add') }}
					</el-button>
					<el-table
						:data="zgTableData.data"
						style="width: 100%"
						v-loading="zgTableData.loading"
						size="mini"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row
					>
						<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
						<el-table-column prop="Name" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="Ext" label="评审标准" show-overflow-tooltip />
						<el-table-column fixed="right" label="评分方式" width="220" show-overflow-tooltip>
							<template #default="scope">
								<el-radio v-model="scope.row.Value" disabled label="0">通过</el-radio>
								<el-radio v-model="scope.row.Value" disabled label="1">不通过</el-radio>
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="220" show-overflow-tooltip>
							<template #default="scope">
								<el-button size="mini" type="primary" @click="onOpenCommondata(scope.row.Id)" v-auth:[moduleKey]="'btn.CommondataEdit'">
									<el-icon>
										<elementEdit />
									</el-icon>
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button size="mini" type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.CommondataDel'">
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
						:page-sizes="[10, 20, 30]"
						v-model:current-page="zgTableData.param.pageNum"
						background
						v-model:page-size="zgTableData.param.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="zgTableData.total"
					>
					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="技术评审" name="jsps">
					<el-button size="mini" type="primary" @click="onOpenCommondata(0)">
						<el-icon>
							<elementPlus />
						</el-icon>
						{{ $t('message.action.add') }}
					</el-button>
					<el-table
						:data="jsTableData.data"
						style="width: 100%"
						v-loading="jsTableData.loading"
						size="mini"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row
					>
						<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
						<el-table-column prop="Name" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="Ext" label="评审标准" show-overflow-tooltip />
						<el-table-column prop="Value" label="最高分" show-overflow-tooltip />
						<el-table-column fixed="right" label="操作" width="220" show-overflow-tooltip>
							<template #default="scope">
								<el-button size="mini" type="primary" @click="onOpenCommondata(scope.row.Id)" v-auth:[moduleKey]="'btn.CommondataEdit'">
									<el-icon>
										<elementEdit />
									</el-icon>
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button size="mini" type="danger" @click="onRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.CommondataDel'">
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
						:page-sizes="[10, 20, 30]"
						v-model:current-page="jsTableData.param.pageNum"
						background
						v-model:page-size="jsTableData.param.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="jsTableData.total"
					>
					</el-pagination>
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<commondataEdit ref="commondataEditRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { getPageDataList } from '../../../api/common/commondata';
import commondataEdit from './component/commondataEdit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import request from '/@/utils/request';
export default {
	name: 'systemParameter',
	components: { commondataEdit },
	setup() {
		const commondataEditRef = ref();
		// const activeName = ref('zg');
		const moduleKey = 'api_pro_parameter';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			activeName: 'zgps',
			zgTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					type: 'zgps',
					pageNum: 1,
					pageSize: 20,
				},
			},
			jsTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					type: 'jsps',
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onGetZgTableData(true);
			onGetJsTableData(true);
		});
		// 打开弹窗
		const onOpenCommondata = (id: string) => {
			commondataEditRef.value.openDialog(state.activeName, id);
		};
		//技术表格
		const onGetJsTableData = (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.jsTableData.param.pageNum = 1;
			}
			state.jsTableData.loading = true;
			getPageDataList(state.jsTableData.param)
				.then((res) => {
					state.jsTableData.loading = false;
					if (res.errcode != 0) {
						if (res.errcode != 0) {
							ElMessage.warning(res.errmsg);
							return;
						}
					}
					state.jsTableData.data = res.data;
					state.jsTableData.total = res.total;
				})
				.catch(() => {
					state.jsTableData.loading = false;
				});
		};
		//查询表格数据
		const onGetZgTableData = (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.zgTableData.param.pageNum = 1;
			}
			state.zgTableData.loading = true;
			getPageDataList(state.zgTableData.param)
				.then((res) => {
					state.zgTableData.loading = false;
					if (res.errcode != 0) {
						if (res.errcode != 0) {
							ElMessage.warning(res.errmsg);
							return;
						}
					}
					state.zgTableData.data = res.data;
					state.zgTableData.total = res.total;
				})
				.catch(() => {
					state.zgTableData.loading = false;
				});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.pageSize = val;
				onGetZgTableData();
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.pageSize = val;
				onGetJsTableData();
			}
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.pageNum = val;
				onGetZgTableData();
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.pageNum = val;
				onGetJsTableData();
			}
		};
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					state.zgTableData.loading = true;
					state.jsTableData.loading = true;

					const url = `/v1/common/commondata/delete/${row.Id}`;
					request({
						url: url,
						method: 'post',
					})
						.then((res) => {
							state.zgTableData.loading = false;
							state.jsTableData.loading = false;
							if (res.errcode == 0) {
								if (state.activeName == 'zgps') {
									onGetZgTableData();
								} else if (state.activeName == 'jsps') {
									onGetJsTableData();
								}
							}
						})
						.catch((err) => {
							state.zgTableData.loading = false;
							state.jsTableData.loading = false;
						});
					return false;
				})
				.catch((err) => {});
		};
		return {
			commondataEditRef,
			onOpenCommondata,
			onGetJsTableData,
			onGetZgTableData,
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
