<template>
	<div class="eshop-goods-container">
		
			<splitpanes class="default-theme" @resize="paneSize = $event[0].size">
				<pane :size="30">
					<el-card shadow="hover">
						<div class="">
							<el-form label-width="90px" :inline="true">
								<el-form-item>
									<el-button type="info" @click="onGetMainTableData(true)">
										<el-icon>
											<elementSearch />
										</el-icon>
										&#8197;{{ $t('message.action.search') }}
									</el-button>
									<el-button  type="primary" @click="onOpenMainEditDlg()"  v-auth:[moduleKey]="'btn.CategoryAdd'">
										<el-icon>
											<elementCirclePlusFilled />
										</el-icon>
										&#8197;{{ $t('message.action.add') }}
									</el-button>
								</el-form-item>
								<el-form-item>
								</el-form-item>
							</el-form>
						</div>
						<el-table :data="mainTableData.data" row-key="Id" table-layout="fixed" :lazy="false" v-loading="mainTableData.loading" 
							:height="proxy.$calcMainHeight(-35)" @cell-click="onMainCellClick" default-expand-all
							 stripe highlight-current-row style="width:100%">
							<el-table-column prop="Title" label="类别" show-overflow-tooltip width="200" >
							</el-table-column>
							<el-table-column prop="Id" label="标识" width="160" align="right">
							</el-table-column>
							
							
							
							<el-table-column prop="IsTop" label="置顶" width="70" align="center">
								<template #default="scope">
									<el-switch v-model="scope.row.IsTop" inline-prompt v-auth:[moduleKey]="'btn.CategoryEdit'"
									@change="proxy.$api.common.table.updateById('common_category','IsTop',scope.row.Id,scope.row.IsTop)" 
									:active-text="$t('message.action.yes')" :inactive-text="$t('message.action.no')" :active-value="1" :inactive-value="0"/>
									<el-tag type="success" effect="plain"  v-if="scope.row.IsTop" v-no-auth:[moduleKey]="'btn.CategoryEdit'">{{ $t('message.action.yes') }}</el-tag>
									<el-tag type="danger" effect="plain"  v-else v-no-auth:[moduleKey]="'btn.CategoryEdit'">{{ $t('message.action.no') }}</el-tag>
								</template>
							</el-table-column>

							<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
								<template #default="scope">
									<el-button  type="primary" plain @click="onOpenMainEditDlg(scope.row)" v-auth:[moduleKey]="'btn.CategoryEdit'">
										<el-icon>
											<elementEdit />
										</el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button  type="danger" plain @click="onMainRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.CategoryDel'">
										<el-icon>
											<elementCloseBold />
										</el-icon>
										&#8197;{{ $t('message.action.delete') }}
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-card>
				</pane>
				<pane :size="70">
					<el-card shadow="hover">
						<div class="">
							<el-form ref="searchFormRef"  :model="childTableData.param" label-width="90px" :inline="true">
								<el-form-item :label="'关键字：'">
									<el-input  placeholder="请输入关键字查询" v-model="childTableData.param.keyword"> </el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="info" @click="onChildResetSearch">
										<el-icon>
											<elementRefreshLeft />
										</el-icon>
										&#8197;{{ $t('message.action.reset') }}
									</el-button>
									<el-button type="info" @click="onGetChildTableData(true)">
										<el-icon>
											<elementSearch />
										</el-icon>
										&#8197;{{ $t('message.action.search') }}
									</el-button>
									<el-button  type="primary" @click="onOpenChildEditDlg()"  v-no-auth:[moduleKey]="'btn.GoodsAdd'">
										<el-icon>
											<elementCirclePlusFilled />
										</el-icon>
										&#8197;{{ $t('message.action.add') }}
									</el-button>
								</el-form-item>
								<el-form-item>
								</el-form-item>
							</el-form>
						</div>
						<el-table :data="childTableData.data" v-loading="childTableData.loading" style="width:100%"
							:height="proxy.$calcMainHeight(-75)"
							border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70"/>
							
							<el-table-column prop="ImgUrl" label="封面图" width="60" align="center">
								<template #default="scope">
									<el-image v-if="scope.row.ImgUrl" lazy preview-teleported
										style="width: 20px; height: 20px"
										:src="proxy.$utils.staticUrlParse(scope.row.ImgUrl)"
										hide-on-click-modal
										:preview-src-list="[proxy.$utils.staticUrlParse(scope.row.ImgUrl)]"
										:initial-index="0"
										fit="cover" >
											<template #error>
												<div class="image-slot">
													<SvgIcon name="elementPicture"/>
												</div>
											</template>
									</el-image>
								</template>
							</el-table-column>
							<el-table-column prop="Title" label="名称" width="200" >
							</el-table-column>
							<!-- <el-table-column prop="SpecialName" label="所属专题" width="180" ></el-table-column> -->
							<el-table-column prop="PublishTime" label="发布时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
							<!-- <el-table-column prop="State" label="状态" width="80" align="center">
								<template #default="scope">
									<el-switch v-model="scope.row.State" inline-prompt width="50" v-auth:[moduleKey]="'btn.ArticleEdit'"
									@change="proxy.$api.common.table.updateById('cms_article','State',scope.row.Id,scope.row.State)" 
									:active-text="$t('message.action.publish')" :inactive-text="$t('message.action.draft')" :active-value="1" :inactive-value="0"/>
									<el-tag type="success" effect="plain"  v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ $t('message.action.publish') }}</el-tag>
									<el-tag type="danger" effect="plain"  v-else v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ $t('message.action.draft') }}</el-tag>
								</template>
							</el-table-column> -->
							<el-table-column prop="IsTop" label="置顶" width="70" align="center">
								<template #default="scope">
									<el-switch v-model="scope.row.IsTop" inline-prompt v-auth:[moduleKey]="'btn.GoodsEdit'"
									@change="proxy.$api.common.table.updateById('eshop_goods','IsTop',scope.row.Id,scope.row.IsTop)" 
									:active-text="$t('message.action.yes')" :inactive-text="$t('message.action.no')" :active-value="1" :inactive-value="0"/>
									<el-tag type="success" effect="plain"  v-if="scope.row.IsTop" v-no-auth:[moduleKey]="'btn.GoodsEdit'">{{ $t('message.action.yes') }}</el-tag>
									<el-tag type="danger" effect="plain"  v-else v-no-auth:[moduleKey]="'btn.GoodsEdit'">{{ $t('message.action.no') }}</el-tag>
								</template>
							</el-table-column>

							<el-table-column prop="Id" label="标识" width="160" align="right">
							</el-table-column>
							<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
								<template #default="scope">
									<el-button  type="primary" plain @click="onOpenChildEditDlg(scope.row)" v-auth:[moduleKey]="'btn.GoodsEdit'">
										<el-icon>
											<elementEdit />
										</el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button  type="danger" plain @click="onRowChildDel(scope.row.Id)" v-auth:[moduleKey]="'btn.GoodsDel'">
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
							@size-change="onHandleChildSizeChange"
							@current-change="onHandleChildCurrentChange"
							class="mt15"
							:page-sizes="[10, 20, 30, 50, 100]"
							v-model:current-page="childTableData.param.pageNum"
							background
							v-model:page-size="childTableData.param.pageSize"
							layout="->, total, sizes, prev, pager, next, jumper"
							:total="childTableData.total"
						>
						</el-pagination>
					</el-card>
				</pane>
			</splitpanes>
			
			
		
		<dlgMainEdit ref="dlgMainEditRef" :allow-edit-category="false" :allow-edit-special="false" :step="25" />
		<dlgChildEdit ref="dlgChildEditRef" :allow-edit-category="false" :allow-edit-special="false" :step="25" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgMainEdit from './component/categoryEdit.vue';
import dlgChildEdit from './component/virtualEdit.vue';
import other from '/@/utils/other';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
export default {
	name: 'cmsArticleCommon',
	components: { dlgMainEdit,dlgChildEdit,Splitpanes, Pane },
	setup() {
		const route=useRoute();
		const kind = route.params.kind;
		const scopeMode=route.params.scopeMode||0;
		const scopeValue=route.params.scopeValue||0;
		const moduleKey=`api_eshop_goods_${kind}`;
		const { proxy } = getCurrentInstance() as any;
		const dlgMainEditRef = ref();
		const dlgChildEditRef = ref();
		const state: any = reactive({
			moduleKey:moduleKey,
			kind,
			scopeMode,
			scopeValue,
			mainTableData: {
				data: [{Id:1,Title:"特斯拉",children:[{Id:2,Title:'特斯拉 modle3',children:[{Id:3,Title:'cmp'}]}]}],
				total: 0,
				loading: false,
				param: {
					loadRelatedSel:false, //不加载栏目关联数据
				},
			},
			childTableData: {
				data: [{Id:1,Title:"cmp 001"},{Id:2,Title:"cmp 002"},{Id:2,Title:"cmp 003"}],
				total: 0,
				loading: false,
				param: {
					searchPage:10, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode:2, //0：所有，1：待审，2：已审，3：我审核的
					loadRelatedSel:false, //不加载栏目关联数据
					keyword:"",
					pageNum: 1,
					pageSize: 20,
				},
			},
		});

		/* 主表相关 */
		
		//刷新
		const onMainRefresh=()=>{
			onGetMainTableData()
		}

		// 初始化表格数据
		const onGetMainTableData = async () => {
			
			state.mainTableData.loading=true;
			state.mainTableData.data =[];
			try{
				const res = await proxy.$api.common.category.getListByScope(state.kind,state.scopeMode, state.scopeValue, state.mainTableData.param);
				if(res.errcode!=0){
					return;
				}
				state.mainTableData.total=res.total;
				state.mainTableData.data = res.data;
			}finally{
				state.mainTableData.loading=false;
			}
		};
		
		// 打开修改弹窗
		const onOpenMainEditDlg = async (row: Object) => {
			if(!row){
				row = { Kind:state.kind, Parentid:"0", Order:50 }
			}
			dlgMainEditRef.value.openDialog(row);
		};
		// 删除记录
		const onMainRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Title}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.mainTableData.loading=true;
				try{
					const res = await proxy.$api.common.category.delete(row.Id);
					if(res.errcode == 0){
						onGetMainTableData();
					}
				} finally{
					state.childTableData.loading=false;
				}
				return false;
			});
		};
		
		const onMainCellClick= async (row:any, column:any, cell:any, event:any) => {
			console.log(column)
			// if(row && column.property=="Title"){
			// 	// const res=await proxy.$api.cms.article.getById(row.Id)
			// 	// if(res.errcode==0){
			// 	// 	dlgDetailRef.value.openDialog(res.data);
			// 	// }
				
			// }
		};

		/* 子表相关 */
		state.childTableData.param.pageIndex=computed(()=>{
			return state.childTableData.param.pageNum-1;
		})

		//重置查询条件
		const onChildResetSearch=()=>{
			state.childTableData.param.keyword="";
			onGetChildTableData(true)
		}
		// effect(()=>{
		// 	state.childTableData.param.pageIndex = state.childTableData.param.pageNum+1;
		// })
		

		// 初始化表格数据
		const onGetChildTableData = async (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.childTableData.param.pageNum=1;
			}
			state.childTableData.loading=true;
			state.childTableData.data =[];
			try{
				const res = await proxy.$api.cms.article.getListByScope(state.kind,state.scopeMode, state.scopeValue, state.childTableData.param);
				if(res.errcode!=0){
					return;
				}
				state.childTableData.total=res.total;
				state.childTableData.data = res.data;
			}finally{
				state.childTableData.loading=false;
			}
		};
		
		// 打开修改弹窗
		const onOpenChildEditDlg = async (row: Object) => {
			if(!row){
				row = { Kind:state.kind, CategoryId:"0", SpecialId:"0" }
			}
			dlgChildEditRef.value.openDialog(row);
		};
		// 删除记录
		const onChildRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Title}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.childTableData.loading=true;
				try{
					const res = await proxy.$api.cms.article.delete(row.Id);
					if(res.errcode == 0){
						onGetChildTableData();
					}
				} finally{
					state.childTableData.loading=false;
				}
				return false;
			});
		};
		// 分页改变
		const onHandleChildSizeChange = (val: number) => {
			state.childTableData.param.pageSize = val;
			onGetChildTableData();
		};
		// 分页改变
		const onHandleChildCurrentChange = (val: number) => {
			state.childTableData.param.pageNum = val;
			onGetChildTableData();
		};


		// 页面加载时
		onMounted(() => {
			//onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();
	
		return {
			proxy,
			dlgMainEditRef,
			dlgChildEditRef,
			onMainRefresh,
			onGetMainTableData,
			onOpenMainEditDlg,
			onMainRowDel,
			onMainCellClick,

			onChildResetSearch,
			onOpenChildEditDlg,
			onChildRowDel,
			onHandleChildSizeChange,
			onHandleChildCurrentChange,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">

.title-link{
	text-decoration:none; 
	color:var(--el-color-primary-dark-2);
	cursor: pointer;
}
.title-link:hover{
	text-decoration:none; 
	border-bottom:1px solid var(--el-color-primary-dark-2); /* #555换成链接的颜色 */
	display: inline-block; 
	padding-bottom:0px; 
	color:var(--el-color-primary-dark-2);
	cursor: pointer;
}

</style>
