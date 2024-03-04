<template>
	<div class="base-role-container">
		<el-card shadow="hover">
				<div class="">
					<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
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
						<el-button type="primary" @click="onOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
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
				highlight-current-row
				
			>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="GoodsName" label="商品名称" show-overflow-tooltip fixed></el-table-column>
				<!-- <el-table-column prop="GoodsSn" label="商品编号" width="90" show-overflow-tooltip></el-table-column> -->
				<el-table-column prop="GoodsUnit" label="货品单位" width="70" align="center"></el-table-column>
				<el-table-column prop="ShopPrice" label="参考单价" width="70" align="right"></el-table-column>
				
				<el-table-column label="状态" width="70" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.SupplierState"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('wms_goods', 'is_on_sale', scope.row.Id, scope.row.IsOnSale)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.IsOnSale" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="GoodsPics" label="商品图片" width="70" show-overflow-tooltip>
					<template #default="scope">		
						<el-image
							style="width: 30px; height: 30px"
							:src="imgUrl(scope.row.GoodsPics)"
							:zoom-rate="1.2"
							:max-scale="7"
							:min-scale="0.2"
							:preview-src-list="imgUrlList(scope.row.GoodsPics)"
							fit="cover"
							:preview-teleported="true"
							/>			
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.see') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="SellerNote" label="备注" show-overflow-tooltip></el-table-column>
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
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editDlg from './component/goodsEdit.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'projectList',
	components: { editDlg},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = "repair";
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_${kind}_goods`;
		const editDlgRef = ref();
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
			httpsText: import.meta.env.VITE_URL as any,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};

		// 初始化表格数据
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
		// 打开弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
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

		const imgUrlList=(GoodsPics)=>{
			let imgList = [];
			if(GoodsPics!=""){
				imgList = GoodsPics.split(",");
				if (imgList.length>0){
					imgList.forEach(function(element, index, array) {
  					array[index] = state.httpsText+element;
				});
					
			//console.log("获得的数组",imgList)

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
			editDlgRef,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
			onModelDel,
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

<style scoped lang="scss">
</style>
