<template>
	<div class="cms_article-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef"  :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item :label="'关键字：'">
						<el-input  placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<elementRefreshLeft />
							</el-icon>
							&#8197;{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<elementSearch />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
						<el-button  type="primary" @click="onOpenEditDlg"  v-auth:[moduleKey]="'btn.ArticleAdd'">
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
			<el-table :data="tableData.data"  :span-method="objectSpanMethod"
				v-loading="tableData.loading" style="width: 100%"  :height="proxy.$calcMainHeight(-75)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="Id" label="标识" width="100" align="right"></el-table-column>
				<el-table-column prop="ImgUrl" label="封面图" width="70" align="center"></el-table-column>
				<el-table-column prop="Title" label="标题" width="200" ></el-table-column>
				<el-table-column prop="SpecialName" label="所属专题" width="180" ></el-table-column>
				<el-table-column prop="CreateBy" label="创建人" width="70" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" width="110" show-overflow-tooltip></el-table-column>
				<el-table-column prop="PublishTime" label="发布时间" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Status" label="状态" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain"  v-if="scope.row.Status==0">草稿</el-tag>
						<el-tag type="success" effect="plain"  v-else-if="scope.row.Status==1">发布</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="IsTop" label="置顶" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain"  v-if="scope.row.IsTop==0">否</el-tag>
						<el-tag type="success" effect="plain"  v-else-if="scope.row.IsTop==1">是</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="IsSwiper" label="轮播" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain"  v-if="scope.row.IsSwiper==0">否</el-tag>
						<el-tag type="success" effect="plain"  v-else-if="scope.row.IsSwiper==1">是</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="IsPromote" label="推荐" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain"  v-if="scope.row.IsPromote==0">否</el-tag>
						<el-tag type="success" effect="plain"  v-else-if="scope.row.IsPromote==1">是</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ViewNum" label="阅读量" width="80" align="right"></el-table-column>
				<el-table-column prop="LikeNum" label="点赞数" width="80" align="right"></el-table-column>
				<el-table-column prop="CommentNum" label="评论数" width="80" align="right"></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
					<template #default="scope">
						<el-button  type="primary" plain @click="onOpenEditDlg(scope.row)" v-auth:[moduleKey]="'btn.ArticleEdit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button  type="danger" plain @click="onRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.ArticleDel'">
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
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
			
		</el-card>
		<dlgEdit ref="dlgEditRef" :step="25" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgEdit from './component/articleEdit.vue';
import other from '/@/utils/other';
export default {
	name: 'cmsArticleCommon',
	components: { dlgEdit },
	setup() {
		const route=useRoute();
		const kind = route.params.kind;
		const scopeLevel=route.params.scopeLevel||0;
		const moduleKey=`api_cms_article_${kind}`;
		const { proxy } = getCurrentInstance() as any;
		const dlgEditRef = ref();
		const state: any = reactive({
			moduleKey:moduleKey,
			kind,
			scopeLevel,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					searchPage:10, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode:2, //0：所有，1：待审，2：已审，3：我审核的
					keyword:"",
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.param.pageIndex=computed(()=>{
			return state.tableData.param.pageNum-1;
		})

		const onChangeSearchMode=(mode:any)=>{
			if(state.tableData.param.searchMode==mode){
				return;
			}
			state.tableData.param.searchMode=mode;
			onGetTableData(true);
		}
		//重置查询条件
		const onResetSearch=()=>{
			state.tableData.param.keyword="";
			onGetTableData(true)
		}
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })
		

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
			state.tableData.loading=true;
			state.tableData.data =[];
			try{
				const res = await proxy.$api.cms.article.getList(state.kind, state.scopeLevel, state.tableData.param);
				if(res.errcode!=0){
					return;
				}
				state.tableData.total=res.total;
				state.tableData.data = res.data;
			}finally{
				state.tableData.loading=false;
			}
		};
		
		// 打开修改弹窗
		const onOpenEditDlg = async (row: Object) => {
			if(!row){
				row={}
			}
			dlgEditRef.value.openDialog(row);
		};
		// 删除记录
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Title}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading=true;
				try{
					const res = await proxy.$api.cms.article.delete(row.Id);
					if(res.errcode == 0){
						onGetTableData();
					}
				} finally{
					state.tableData.loading=false;
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
	
		return {
			proxy,
			dlgEditRef,
			onChangeSearchMode,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
