<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="tabsName">
				<el-tab-pane label="资格评审" name="zgps">
					<el-form :model="jsTableData.param" label-width="90px" :inline="true">
						<!-- <el-form-item label="类别">
							<el-select v-model="jsTableData.param.categoryId" class="m-2" placeholder="请选择类别" clearable>
								<el-option v-for="item in supKindData" :key="item.Id" :label="item.Name" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item label="名称">
							<el-input placeholder="请输入名称" v-model="jsTableData.param.name"> </el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="onResetSearch">
								<el-icon>
									<RefreshLeft />
								</el-icon>
								&#8197;{{ $t('message.action.reset') }}
							</el-button>
							<el-button type="info" @click="onGetJsTableData(true)">
								<el-icon>
									<Search />
								</el-icon>
								&#8197;{{ $t('message.action.search') }}
							</el-button>
							<el-button type="primary" @click="onOpenCommondata(0)">
								<el-icon>
									<CirclePlusFilled />
								</el-icon>
								&#8197;{{ $t('message.action.add') }}
							</el-button>
						</el-form-item>
						<el-form-item></el-form-item>
					</el-form>
					<el-table
						:data="zgTableData.data"
						style="width: 100%"
						v-loading="zgTableData.loading"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row
					>
						<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
						<!-- <el-table-column label="类别" show-overflow-tooltip>
							<template #default="scope">
								<div v-for="(item, key) in supKindData" :key="key">
									<span v-if="item.Id == scope.row.CategoryId">{{ item.Name }}</span>
								</div>
							</template>
						</el-table-column> -->
						<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenCommondata(scope.row.Id)" v-auth:[moduleKey]="'btn.SettingEdit'">
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.SettingDel'">
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
						v-model:current-page="zgTableData.param.pageNum"
						background
						v-model:page-size="zgTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="zgTableData.total"
					>
					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="技术评审" name="jsps">
					<el-form :model="jsTableData.param" label-width="90px" :inline="true">
						<!-- <el-form-item label="类别">
							<el-select v-model="zgTableData.param.categoryId" class="m-2" placeholder="请选择类别" clearable>
								<el-option v-for="item in supKindData" :key="item.Id" :label="item.Name" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item label="名称">
							<el-input placeholder="请输入名称" v-model="zgTableData.param.name"> </el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="onResetSearch">
								<el-icon>
									<RefreshLeft />
								</el-icon>
								&#8197;{{ $t('message.action.reset') }}
							</el-button>
							<el-button type="info" @click="onGetZgTableData(true)">
								<el-icon>
									<Search />
								</el-icon>
								&#8197;{{ $t('message.action.search') }}
							</el-button>
							<el-button type="primary" @click="onOpenCommondata(0)">
								<el-icon>
									<Plus />
								</el-icon>
								&#8197;{{ $t('message.action.add') }}
							</el-button>
						</el-form-item>
						<el-form-item></el-form-item>
					</el-form>
					<el-table
						:data="jsTableData.data"
						style="width: 100%"
						v-loading="jsTableData.loading"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row
					>
						<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
						<!-- <el-table-column label="类别" show-overflow-tooltip>
							<template #default="scope">
								<div v-for="(item, key) in supKindData" :key="key">
									<span v-if="item.Id == scope.row.CategoryId">{{ item.Name }}</span>
								</div>
							</template>
						</el-table-column> -->
						<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
						<el-table-column prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenCommondata(scope.row.Id)" v-auth:[moduleKey]="'btn.SettingEdit'">
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.SettingDel'">
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
						v-model:current-page="jsTableData.param.pageNum"
						background
						v-model:page-size="jsTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
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
import commondataEdit from './component/edit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import request from '/@/utils/request';
import { getPageCategoryList } from '../../../api/common/category';
import { Refresh } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
export default {
	name: 'systemParameter',
	components: { commondataEdit },
	setup() {
		const commondataEditRef = ref();
		const route = useRoute();
		// const activeName = ref('zg');
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = 'api_pro_parameter';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			// supKindData: [], //类型
			activeName: 'zgps',
			scopeMode,
			scopeValue,
			zgTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					mode: 1,
					pageNum: 1,
					pageSize: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			jsTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					pageNum: 1,
					pageSize: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onLoadTable(true);
			// getPageCategoryList({ kind: 'supplier', pageNum: 1, pageSize: 10000 }).then((res) => {
			// 	if (res.errcode != 0) {
			// 		ElMessage.warning(res.errmsg);
			// 		return;
			// 	} else {
			// 		state.supKindData = res.data;
			// 	}
			// });
		});
		//切换页面
		const tabsName = () => {
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (refresh: boolean) => {
			console.log(state.activeName);
			if (state.activeName == 'zgps') {
				onGetZgTableData(refresh);
			} else if (state.activeName == 'jsps') {
				onGetJsTableData(refresh);
			}
		};
		// 打开弹窗
		const onOpenCommondata = (id: string) => {
			commondataEditRef.value.openDialog(state.activeName, id);
		};
		const onResetSearch = () => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.name = '';
				state.zgTableData.param.categoryId = null;
				onGetZgTableData(true);
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.name = '';
				state.jsTableData.param.categoryId = null;
				onGetJsTableData(true);
			}
		};
		//技术表格
		const onGetJsTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.jsTableData.param.pageNum = 1;
			}
			state.jsTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.scopeMode, state.scopeValue, state.jsTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.jsTableData.total = res.total;
				state.jsTableData.data = res.data;
			} finally {
				state.jsTableData.loading = false;
			}
		};
		//查询表格数据
		const onGetZgTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.zgTableData.param.pageNum = 1;
			}
			state.zgTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.scopeMode, state.scopeValue, state.zgTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.zgTableData.total = res.total;
				state.zgTableData.data = res.data;
			} finally {
				state.zgTableData.loading = false;
			}
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
		const onRowDel = (Id: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.zgTableData.loading = true;
				state.jsTableData.loading = true;
				try {
					const res = await proxy.$api.cms.article.delete(Id);
					if (res.errcode == 0) {
						if (res.errcode == 0) {
							if (state.activeName == 'zgps') {
								onGetZgTableData();
							} else if (state.activeName == 'jsps') {
								onGetJsTableData();
							}
						}
					}
				} finally {
					state.zgTableData.loading = false;
					state.jsTableData.loading = false;
				}

				return false;
			});
		};
		return {
			commondataEditRef,
			onOpenCommondata,
			onGetJsTableData,
			onGetZgTableData,
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
