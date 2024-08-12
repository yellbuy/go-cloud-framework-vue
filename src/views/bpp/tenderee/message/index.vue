<template>
	<div class="base-user-container">
		<el-card>
			<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="tabsName">
				<el-tab-pane label="未读消息" name="unread">
					<el-row>
						<el-col :span="24">
							<div style="float: right;">
								<el-button text bg type="primary" @click="">批量标记</el-button>
								<el-button text bg type="primary" @click="">批量删除</el-button>
							</div>
						</el-col>
					</el-row>
					<el-table :data="unreadTableData.data" v-loading="unreadTableData.loading" :height="proxy.$calcMainHeight(-170)" style="width: 100%" border stripe highlight-current-row>
						<el-table-column type="selection" width="50" fixed />
						<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
						<el-table-column prop="Content" label="标题" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
							<template #default="scope">
								<el-button type="primary" @click="onOpenCommondata(scope.row.Id)">编辑</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onHandleSizeChange"
						@current-change="onHandleCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30]"
						v-model:current-page="unreadTableData.param.current"
						background
						v-model:page-size="unreadTableData.param.size"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="unreadTableData.total">
					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="已读消息" name="read">
					<el-row>
						<el-col :span="24">
							<div style="float: right;">
								<el-button text bg type="primary" @click="">批量标记</el-button>
								<el-button text bg type="primary" @click="">批量删除</el-button>
							</div>
						</el-col>
					</el-row>
					<el-table :data="readTableData.data" style="width: 100%" v-loading="readTableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
						<el-table-column type="selection" width="50" fixed />
						<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
						<el-table-column prop="Content" label="标题" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
							<template #default="scope">
								<el-button type="primary" @click="onOpenCommondata(scope.row.Id)">编辑</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row.Id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onHandleSizeChange"
						@current-change="onHandleCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30]"
						v-model:current-page="readTableData.param.current"
						background
						v-model:page-size="readTableData.param.size"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="readTableData.total">
					</el-pagination>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'cmsArticleFrontendList',
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeLevel = route.params.scopeValue || 0;
		const { proxy } = getCurrentInstance() as any;
		const state: any = reactive({
			kind,
			scopeLevel,
			activeName: "unread",
			unreadTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					title: '',
					state:1,
					//auditState: 1,
					// isHot: 1,
					current: 1,
					size: 30,
				},
			},
			readTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					title: '',
					state:1,
					//auditState: 1,
					// isHot: 1,
					current: 1,
					size: 30,
				},
			},
		});
		state.unreadTableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});
		state.readTableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			// if (gotoFirstPage) {
			// 	state.tableData.param.current = 1;
			// }
			// state.tableData.loading = true;
			// state.tableData.data = [];
			// try {
			// 	console.log(route);
			// 	const res = await proxy.$api.cms.article.getList(state.kind, state.scopeLevel, state.tableData.param);
			// 	if (res.errcode != 0) {
			// 		return;
			// 	}
			// 	state.tableData.total = res.total;
			// 	state.tableData.data = res.data;
			// } finally {
			// 	state.tableData.loading = false;
			// }
		};

		//切换页面
		const tabsName = () => {
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (refresh: boolean) => {
			console.log(state.activeName);
			if (state.activeName == 'unread') {
				onGetTableData(refresh);
			} else if (state.activeName == 'read') {
				onGetTableData(refresh);
			}
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			if (state.activeName == 'unread') {
				state.unreadTableData.param.size = val;
				onGetTableData();
			} else if (state.activeName == 'read') {
				state.readTableData.param.size = val;
				onGetTableData();
			}
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			if (state.activeName == 'unread') {
				state.unreadTableData.param.current = val;
				onGetTableData();
			} else if (state.activeName == 'read') {
				state.readTableData.param.current = val;
				onGetTableData();
			}
		};
		const onCellClick = async (row: any, column: any, cell: any, event: any) => {
			console.log(column);
			if (row && column.property == 'Title') {
				window.open(`/#/article/detail/${row.Id}`, '_blank');
			}
		};
		// 页面加载时
		onMounted(() => {
			// onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			onGetTableData,
			tabsName,
			onHandleSizeChange,
			onHandleCurrentChange,
			onCellClick,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.title-readed-link {
	text-decoration: none;
	color: var(--el-color-info);
	cursor: pointer;
}
.title-link {
	text-decoration: none;
	color: var(--el-color-primary-dark-2);
	cursor: pointer;
}
.title-link:hover,
.title-readed-link:hover {
	text-decoration: none;
	border-bottom: 1px solid var(--el-color-primary-dark-2); /* #555换成链接的颜色 */
	display: inline-block;
	padding-bottom: 0px;
	color: var(--el-color-primary-dark-2);
	cursor: pointer;
}
</style>
