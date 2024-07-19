<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<el-row>
				<el-col :span="8">
					<div class="">
						<el-form label-width="90px" :inline="true">
							<el-form-item>
								<el-button info @click="onGetMainTableData(true)">
									<el-icon>
										<Search />
									</el-icon>
									&#8197;{{ $t('message.action.refresh') }}
								</el-button>
								<el-button type="primary" @click="onOpenCategoryDlg()" v-auth:[moduleKey]="'btn.CategoryAdd'">
									<el-icon>
										<CirclePlusFilled />
									</el-icon>
									&#8197;{{ $t('message.action.add') }}
								</el-button>
							</el-form-item>
							<el-form-item> </el-form-item>
						</el-form>
					</div>
					<el-table
						:data="mainTableData.data"
						v-loading="mainTableData.loading"
						style="width: 100%"
						:height="proxy.$calcMainHeight(-35)"
						border
						stripe
						highlight-current-row
						default-expand-all
						row-key="Id"
						:tree-props="{ children: 'Children' }"
						@cell-click="onMainCellClick">
						<el-table-column prop="Name" label="分类名称" show-overflow-tooltip fixed></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="left">
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenCategoryDlg(0, scope.row.Id)" v-auth:[moduleKey]="'btn.Add'">
									{{ $t('message.action.add') }}
								</el-button>
								<el-button text bg type="primary" @click="onOpenCategoryDlg(scope.row.Id, scope.row.Parentid,false)" v-auth:[moduleKey]="'btn.Edit'">
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg type="danger" @click="onCategoryDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
									{{ $t('message.action.delete') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="16">
					<div class="">
						<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
							<el-form-item label="关键字：">
								<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword" />
							</el-form-item>
							<el-form-item>
								<el-button type="info" @click="onResetSearch">
									<el-icon>
										<RefreshLeft />
									</el-icon>
									{{ $t('message.action.reset') }}
								</el-button>
								<el-button type="info" @click="onGetTableData(true)">
									<el-icon>
										<Search />
									</el-icon>
									&#8197;{{ $t('message.action.search') }}
								</el-button>
								<el-button type="primary" @click="onOpenProductDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
									<el-icon>
										<CirclePlusFilled />
									</el-icon>
									&#8197;{{ $t('message.action.add') }}
								</el-button>
							</el-form-item>
							<el-form-item></el-form-item>
						</el-form>
					</div>
					<el-table
						:data="tableData.data"
						v-loading="tableData.loading"
						style="width: 100%"
						:height="proxy.$calcMainHeight(-75)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="GoodsName" label="产品名称" width="120" show-overflow-tooltip fixed />
						<el-table-column prop="GoodsSn" label="产品编码" width="90" show-overflow-tooltip />
						<el-table-column prop="GoodsUnit" label="产品单位" width="70" align="right" />
						<el-table-column label="供货状态" show-overflow-tooltip>
							<template #default="scope">
								<el-switch
									v-model="scope.row.SupplierState"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.Edit'"
									@change="proxy.$api.common.table.updateById('wms_goods', 'supplier_state', scope.row.Id, scope.row.SupplierState)"
									:active-text="$t('message.action.enable')"
									:inactive-text="$t('message.action.disable')"
									:active-value="1"
									:inactive-value="0" />
								<el-tag type="success" effect="plain" v-if="scope.row.SupplierState" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="GoodsPics" label="产品图片" show-overflow-tooltip>
							<template #default="scope">		
								<el-image
									style="width: 30px; height: 30px"
									:src="imgUrl(scope.row.GoodsPics)"
									:zoom-rate="1.2"
									:max-scale="7"
									:min-scale="0.2"
									:preview-src-list="imgUrlList(scope.row.GoodsPics)"
									fit="cover"
									:preview-teleported="true" />			
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenProductDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg @click="onOpenProductDlg(scope.row.Id, true)">
									{{ $t('message.action.see') }}
								</el-button>
								<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
									{{ $t('message.action.delete') }}
								</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="SellerNote" label="备注" show-overflow-tooltip />
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
						:total="tableData.total" />
				</el-col>
			</el-row>
		</el-card>
		<prodDlg ref="prodDlgRef" />
		<cateDlg ref="cateDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import cateDlg from './component/categoryEdit.vue';
import prodDlg from './component/productEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'projectList',
	components: { prodDlg, cateDlg},
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const route = useRoute();

		const kind = route.params.kind;

		const scopeMode = route.params.scopeMode || 0;

		const scopeValue = route.params.scopeValue || 0;

		const moduleKey = `api_wms_goods_${kind}`;

		const prodDlgRef = ref();

		const cateDlgRef = ref();

		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			mainTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			httpsText: import.meta.env.VITE_URL as any,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};

		//	初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.wms.goods.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 初始化表格数据
		const onGetMainTableData = async (loadFirstChildData: boolean = false) => {
			state.mainTableData.loading = true;
			state.mainTableData.data = [];
			try {
				const res = await proxy.$api.common.category.getHierarchyDataList(state.kind, state.scopeMode, state.scopeValue, state.mainTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.mainTableData.total = res.total;
				state.mainTableData.data = res.data;
			} finally {
				state.mainTableData.loading = false;
			}
		};

		//	打开弹窗
		const onOpenProductDlg = (id: string, ishow: boolean) => {
			console.log(state.CategoryId)
			prodDlgRef.value.openDialog(state.kind, id, ishow,state.CategoryId);
		};

		// 打开弹窗
		const onOpenCategoryDlg = (id: string, ishow: boolean) => {
			cateDlgRef.value.openDialog(state.kind, id, ishow);
		};

		// 删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.wms.goods.delete(Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};

		// 删除用户
		const onCategoryDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.common.category.delete(Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.mainTableData.loading = false;
				}
				return false;
			});
		};

		const onMainCellClick = async (row: any, column: any, cell: any, event: any) => {
			console.log(column);
			state.tableData.param.categoryId = row.Id || '0';
			state.CategoryId = state.tableData.param.categoryId;
			onGetTableData();
		};

		//	分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};

		//	分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};

		//	页面加载时
		onMounted(() => {
			onGetTableData();
			onGetMainTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		const imgUrlList=(GoodsPics)=>{
			let imgList = [];
			if(GoodsPics!=""){
				imgList = GoodsPics.split(",");
				if (imgList.length>0){
					imgList.forEach(function(element, index, array) {
  					array[index] = state.httpsText+element;
				});
				}
			}
			return imgList

		};

		const imgUrl = (GoodsPics) =>{
			let url = "";
			if (GoodsPics!=""){
				let imgList =GoodsPics.split(",");
				url = state.httpsText+imgList[0];
			}
			return url

		}

		return {
			proxy,
			prodDlgRef,
			cateDlgRef,
			onGetTableData,
			onGetMainTableData,
			onMainCellClick,
			onResetSearch,
			onOpenProductDlg,
			onOpenCategoryDlg,
			onModelDel,
			onCategoryDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			imgUrlList,
			imgUrl,
			...toRefs(state),
		};
	},
};
</script>