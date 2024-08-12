<template>
	<div class="cms_article-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="60px" :inline="true">
					<el-form-item :label="'标题：'">
						<el-input placeholder="请输入标题查询" v-model="tableData.param.title"/>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							&#8197;{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
					</el-form-item>
					<el-form-item> </el-form-item>
				</el-form>
			</div>
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				style="width: 100%"
				:height="proxy.$calcMainHeight(-30)"
				@cell-click="onCellClick"
				stripe
				highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="ImgUrl" label="封面图" width="60" align="center">
					<template #default="scope">
						<el-image
							v-if="scope.row.ImgUrl"
							lazy
							preview-teleported
							style="width: 20px; height: 20px"
							:src="proxy.$utils.staticUrlParse(scope.row.ImgUrl)"
							hide-on-click-modal
							:preview-src-list="[proxy.$utils.staticUrlParse(scope.row.ImgUrl)]"
							:initial-index="0"
							fit="cover">
							<template #error>
								<div class="image-slot">
									<SvgIcon name="ele-Picture" />
								</div>
							</template>
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="Title" label="标题">
					<template #default="scope">
						<el-text tag="ins" class="title-link">{{scope.row.Title}}</el-text>
						<!-- <SvgIcon name="fa fa-angle-right" /><span class="ml5" :class="scope.row.IsClick ? 'title-readed-link' : 'title-link'">{{
							scope.row.Title
						}}</span> -->
					</template>
				</el-table-column>
				<el-table-column prop="Description" width="270" label="描述" show-overflow-tooltip/>
				<!-- <el-table-column prop="SpecialName" label="所属专题" width="180" ></el-table-column> -->

				<el-table-column prop="PublishTime" label="发布时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip/>

				<el-table-column prop="IsTop" label="置顶" width="70" align="center">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.IsTop">{{ $t('message.action.yes') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else>{{ $t('message.action.no') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ClickNum" label="阅读量" width="70" align="right"/>
				<el-table-column prop="FaviorNum" label="点赞数" width="70" align="right"/>
				<el-table-column prop="ReplyNum" label="评论数" width="70" align="right"/>
				<el-table-column prop="CreateBy" label="创建人" width="80" show-overflow-tooltip/>
				<el-table-column prop="CreateTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.current"
				background
				v-model:page-size="tableData.param.size"
				layout="->, sizes, prev, next"
				:total="tableData.total"/>
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
			tableData: {
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
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.current = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				console.log(route);
				const res = await proxy.$api.cms.article.getList(state.kind, state.scopeLevel, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.total = res.total;
				state.tableData.data = res.data;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.size = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
			onGetTableData();
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
