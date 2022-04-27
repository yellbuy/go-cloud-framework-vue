<template>
	<div class="cms_article-container">
		<el-card shadow="hover">
			<!-- <div class="">
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
					</el-form-item>
					<el-form-item>
					</el-form-item>
				</el-form>
			</div> -->
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%"  
				:height="proxy.$calcMainHeight(180)" @cell-click="onCellClick"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
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
				<el-table-column prop="Title" label="标题" >
					<template #default="scope">
						<SvgIcon name="fa fa-angle-right"/><span class="title-link ml5">{{scope.row.Title}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="Description" width="270" label="描述" show-overflow-tooltip>
				</el-table-column>
				<!-- <el-table-column prop="SpecialName" label="所属专题" width="180" ></el-table-column> -->
				
				<el-table-column prop="PublishTime" label="发布时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				
				<el-table-column prop="IsTop" label="置顶" width="70" align="center">
					<template #default="scope">
						<el-tag type="success" effect="plain"  v-if="scope.row.IsTop">{{ $t('message.action.yes') }}</el-tag>
						<el-tag type="danger" effect="plain"  v-else>{{ $t('message.action.no') }}</el-tag>
					</template>
				</el-table-column>

				
				<el-table-column prop="ViewNum" label="阅读量" width="80" align="right">
				</el-table-column>
				
				<el-table-column prop="LikeNum" label="点赞数" width="80" align="right"></el-table-column>
				<el-table-column prop="CommentNum" label="评论数" width="80" align="right"></el-table-column>
				<el-table-column prop="CreateBy" label="创建人" width="70" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
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
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from 'element-plus';
import other from '/@/utils/other';
export default {
	name: 'cmsArticleFrontendList',
	setup() {
		const route=useRoute();
		const kind = route.params.kind;
		const scopeLevel=route.params.scopeLevel||0;
		const { proxy } = getCurrentInstance() as any;
		const state: any = reactive({
			kind,
			scopeLevel,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					searchPage:10, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode:2, //0：所有，1：待审，2：已审，3：我审核的
					loadRelatedSel:false, //不加载栏目关联数据
					keyword:"",
					pageNum: 1,
					pageSize: 30,
				},
			},
		});
		state.tableData.param.pageIndex=computed(()=>{
			return state.tableData.param.pageNum-1;
		})

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
			state.tableData.loading=true;
			state.tableData.data =[];
			try{
				const res = await proxy.$api.cms.article.getFrontEndList(state.kind, state.tableData.param);
				if(res.errcode!=0){
					return;
				}
				state.tableData.total=res.total;
				state.tableData.data = res.data;
			}finally{
				state.tableData.loading=false;
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
		const onCellClick= async (row:any, column:any, cell:any, event:any) => {
			console.log(column)
			if(row && column.property=="Title"){
				window.open(`/#/article/detail/${row.Id}`,"_blank")
			}
		};
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();
	
		return {
			proxy,
			onGetTableData,
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
