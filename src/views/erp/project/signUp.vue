<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="比选编号">
						<el-input placeholder="请输入比选编号查询" v-model="tableData.param.no"> </el-input>
					</el-form-item>
					<el-form-item label="比选项目">
						<el-input placeholder="请输入比选项目查询" v-model="tableData.param.name"> </el-input>
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
						<el-button type="primary" @click="onModelEdit(0)" v-auth:[moduleKey]="'btn.Add'">
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
				<el-table-column prop="ProjectName" label="项目名称" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="LineName" label="包名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="BiddingTime" label="开标时间" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="SignUpTime" label="报名时间" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="LineState" label="状态" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.LineState == 0">已投标</span>
						<span v-else-if="scope.row.LineState == 1">已付款</span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
					<template #default="scope">
						<el-button text bg type="info" @click="onModelSee(scope.row.Id, methodList[scope.row.ProjectType], false)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.see') }}
						</el-button>
						<el-button
							text
							bg
							type="primary"
							@click="onModelSee(scope.row.Id, methodList[scope.row.ProjectType], true)"
							v-auth:[moduleKey]="'btn.signup'"
							>{{ $t('message.action.signUp') }}</el-button
						>
						<el-button text bg type="primary" @click="onModelEdit(scope.row.Id)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
							<el-icon>
								<CloseBold />
							</el-icon>
							&#8197;{{ $t('message.action.delete') }}
						</el-button>
						<el-button text bg type="primary" @click="onToRouter(scope.row.Id)" v-auth:[moduleKey]="'btn.Selection'">
							{{ $t('message.action.selection') }}
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
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'signup',
	components: {},
	setup() {
		const store = useStore();
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_pro_project_signup`;
		const { proxy } = getCurrentInstance() as any;
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
					name: '',
					no: '',
					pageNum: 1,
					pageSize: 20,
					companyId: store.state.userInfos.userInfos.tid,
				},
			},
		});
		console.log(store.state.userInfos.userInfos);
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
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
				state.tableData.param.pageNum = 1;
			}
			// const res = await proxy.$api.erp.project.signUpList(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
			state.tableData.loading = true;
			try {
				state.tableData;
				const res = await proxy.$api.erp.projectcompany.signUpList(state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
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
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
		};
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			onGetTableData,
			onResetSearch,
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
