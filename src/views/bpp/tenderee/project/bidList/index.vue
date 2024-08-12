<template>
	<div>
		<el-card v-if="isShowPage">
			<div>
				<div>
					<el-form ref="searchFormRef" :model="tableData.param" label-width="60px" :inline="true">
						<el-form-item label="比选编号">
							<el-input placeholder="请输入比选编号查询" v-model="tableData.param.no" style="width: 150px;"/>
						</el-form-item>
						<el-form-item label="比选项目">
							<el-input placeholder="请输入比选项目查询" v-model="tableData.param.name" style="width: 150px;"/>
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
							<el-button type="primary" @click="onProjectEdit()">{{ '新建项目立项' }}</el-button>
						</el-form-item>
						<el-form-item></el-form-item>
					</el-form>
				</div>
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
					<el-table-column prop="No" label="招标编号" show-overflow-tooltip fixed/>
					<el-table-column prop="Kind" label="招标类型" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.ProjectType == 1">公开招标</span>
							<span v-else-if="scope.row.ProjectType == 2">邀请招标</span>
							<span v-else-if="scope.row.ProjectType == 3">竞争性谈判</span>
							<span v-else-if="scope.row.ProjectType == 4">单一来源采购</span>
							<span v-else-if="scope.row.ProjectType == 5">询价采购</span>
						</template>
					</el-table-column>
					<el-table-column prop="Name" label="招标项目" show-overflow-tooltip/>
					<el-table-column prop="fanwei" label="招标范围" show-overflow-tooltip/>
					<el-table-column prop="EndTime" label="报名截止日期" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
					<el-table-column prop="ReviewTime" label="开标日期" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button text bg type="info" @click="onProjectSee()">项目详情</el-button>
							<el-button text bg type="primary" @click="onProjectBidEdit()">项目评选</el-button>
						</template>
					</el-table-column>
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
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total"/>
				<seeDlg ref="seeDlgRef" />
			</div>
		</el-card>
		<bidEdit ref="bidEditRef" />
		<projectEdit ref="projectEditRef"/>
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import bidEdit from './component/bidEdit.vue';
import projectEdit from './component/projectEdit.vue';
import seeDlg from './component/projectSee.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'project',
	components: { seeDlg, bidEdit, projectEdit },
	setup() {
		const store = useStore();
		const route = useRoute();
		const kind = route.params.kind;
		const mode = route.params.mode;
		const isBid = route.params.isBid;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_pro_project_${kind}_${mode}`;
		const { proxy } = getCurrentInstance() as any;
		const seeDlgRef = ref();
		const bidEditRef = ref();
		const projectEditRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			tableData: {
				data: [{No:'MYXRMYY20190614324', Kind:5, Name:'XX集团光交换机招标公告', Fanwei:'网络', EndTime:'2024-7-30', ReviewTime:'2024-7-1'}],
				total: 0,
				loading: false,
				param: {
					name: '',
					no: '',
					current: 1,
					size: 20,
					isBid: Boolean(isBid),
				},
			},
			isShowPage: true,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.name = '';
			state.tableData.param.no = '';
			onGetTableData(true);
		};

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.current = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};
		// 打开项目编辑页
		const onProjectEdit = () => {
			state.isShowPage = false;
			projectEditRef.value.openPage();
		};
		//打开项目查看弹窗

		const onProjectSee = (Id: string, state: boolean) => {
			seeDlgRef.value.openDialog(Id, state);
		};
		//打开项目开标编辑页
		const onProjectBidEdit = () => {
			state.isShowPage = false;
			bidEditRef.value.GetByIdRow();
		};
		// 删除用户
		const onModelDel = (Id: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.erp.project.delete(Id);
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
			state.tableData.param.size = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
		};
		const isSeletionTime = (model) => {
			let isTime = false;
			if (
				model.BeginTime <= dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') &&
				dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') < model.FinishTime &&
				model.State == 0
			) {
				isTime = true;
			}
			return isTime;
		};
		const isEditTime = (model) => {
			let isTime = false;
			if (model.BeginTime > dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') && model.State == 0) {
				isTime = true;
			}
			return isTime;
		};
		const isSignUpTime = (model) => {
			let isTime = false;
			if (
				model.StartTime <= dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') &&
				dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') < model.EndTime &&
				model.State == 0
			) {
				isTime = true;
			}
			return isTime;
		};
		// 页面加载时
		onMounted(() => {
			// onGetTableData();
		});

		const { dateFormatYMDHM, dateFormat } = commonFunction();

		return {
			proxy,
			seeDlgRef,
			bidEditRef,
			projectEditRef,
			onGetTableData,
			onResetSearch,
			onProjectEdit,
			onProjectSee,
			onProjectBidEdit,
			isSeletionTime,
			isEditTime,
			isSignUpTime,
			onModelDel,
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
