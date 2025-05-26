<template>
	<div class="common-concretedata-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" @tab-click="tabsName">
				<el-tab-pane v-for="(item, index) in concreteDataList.data" :key="index + 1" :label="item.Name" :name="item.Code"> </el-tab-pane>
				<el-tab-pane label="基础代码" :key="0" :name="commonTypeCode"> </el-tab-pane>
			</el-tabs>
			<el-table :data="tableData.data" v-loading="tableData.loading" :height="proxy.$calcMainHeight(-90)" border stripe highlight-current-row>
				<el-table-column type="index" width="50" align="right" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Name" label="名称" show-overflow-tooltip />
				<el-table-column prop="Code" label="编码" show-overflow-tooltip />
				<el-table-column prop="Predefined" label="内置" width="60" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.Predefined">{{ $t('message.action.yes') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else>{{ $t('message.action.no') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Status" label="状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.Status"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('common_data', 'status', scope.row.Id, scope.row.Status)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"
							:disabled="scope.row.Predefined"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.Status" v-no-auth:[moduleKey]="'btn.Edit'">{{
							$t('message.action.enable')
						}}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="100" align="center">
					<template #header>
						<el-button
							type="text"
							v-if="tableData.data"
							@click="proxy.$api.common.table.update('common_data', 'Order', tableData.data || [], 0)"
							v-auth:[moduleKey]="'btn.Edit'"
						>
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;排序{{ $t('message.action.update') }}
						</el-button>
						<span v-no-auth:[moduleKey]="'btn.Edit'">排序</span>
					</template>
					<template #default="scope">
						<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.Edit'">
						</el-input>
						<span v-no-auth:[moduleKey]="'btn.Edit'">{{ scope.row.Order }}</span>
					</template>
				</el-table-column>

				<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" show-overflow-tooltip>
					<template #header>
						<el-button type="primary" @click="onOpenCommonDataDlg()" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Refresh />
							</el-icon>
							&#8197;{{ $t('message.action.refresh') }}
						</el-button>
					</template>
					<template #default="scope">
						<el-button text bg type="primary" plain @click="onOpenCommonDataDlg(scope.row)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" plain @click="onRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'" v-if="!scope.row.Predefined">
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
				:page-sizes="[10, 20, 30,50,100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<concreteDataEdit ref="commondataEditRef" />
	</div>
</template>

<script lang="ts">
import type { TabsPaneContext } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import concreteDataEdit from './component/concreteDataEdit.vue';
export default {
	name: 'commonConcreteData',
	components: { concreteDataEdit },
	setup() {
		const commonTypeCode = 'concretecommondata';
		const commondataEditRef = ref();
		const moduleKey = 'api_common_concretedata';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			commonTypeCode,
			activeName: '',
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					type: commonTypeCode,
					pageNum: 1,
					pageSize: 20,
					name: '',
				},
			},
			concreteDataList: {
				data: [],
				loading: false,
				param: {
					type: commonTypeCode,
					name: '',
				},
			},
		});
		state.tableData.param.pageIndex=computed(()=>{
			return state.tableData.param.pageNum-1;
		})
		// 页面加载时
		onMounted(() => {
			onGetConcreteData(true);
		});
		//切换页面
		const tabsName = (tab: TabsPaneContext) => {
			state.activeName = String(tab.props.name);
			state.tableData.param.type = state.activeName;
			state.tableData.param.name = '';
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (gotoFirstPage: boolean) => {
			onGetTableData(gotoFirstPage);
		};

		// 打开弹窗
		const onOpenCommonDataDlg = (row?: object) => {
			let data = row;
			if (!data) {
				data = { Type: state.activeName||state.commonTypeCode, Status: 1, Order: 100 };
			} else {
				data = proxy.$utils.copyObj(row);
			}
			commondataEditRef.value.openDialog(data, false);
		};
		const onGetConcreteData = async (isInit: boolean = false) => {
			state.tableData.param.pageNum = 1;
			state.tableData.param.pageSize = 20;
			try {
				const res = await proxy.$api.common.commondata.getList({ type: commonTypeCode, pateSize: 100000 });
				if (res.errcode == 0) {
					state.concreteDataList.data = res.data;
					if (isInit && res.data && res.data.length > 0) {
						state.activeName = res.data[0].Code;
						state.tableData.param.type = state.activeName;
						state.tableData.param.name = '';
						onLoadTable(true);
					}
				}
			} finally {
			}
		};
		//查询表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				if (state.activeName == commonTypeCode) {
					await onGetConcreteData(false);
				}
				const res = await proxy.$api.common.commondata.getList(state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
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
		const onRowDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					state.tableData.loading = true;
					try {
						const res = await proxy.$api.common.commondata.delete(Id);
						if (res.errcode == 0) {
							debugger;
							if (state.activeName == commonTypeCode) {
								await onGetConcreteData();
							}
							await onGetTableData();
						}
					} finally {
						state.tableData.loading = false;
					}
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
</style>
