<template>
	<div class="common-concretedata-container">
		<el-card shadow="hover">
			<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
				<el-form-item label="日志时间：" style="width:300px; white-space: nowrap;" >
					<el-date-picker
						v-model="timeRange"
						type="daterange"
						:shortcuts="dateShortcuts()"
						unlink-panels
						range-separator="至"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						format="YYYY-MM-DD"
						date-format="YYYY/MM/DD"/>
				</el-form-item>
				<el-form-item label="模型名：">
					<el-input placeholder="请输入模型名查询" v-model="tableData.param.formname"> </el-input>
				</el-form-item>
				<el-form-item label="关键字：">
					<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
				</el-form-item>
				<el-form-item label="日志级别：">
					<el-select v-model="tableData.param.loglevel" placeholder="日志级别" style="width:70px; white-space: nowrap;">
						<el-option label="不限" :value="-1"></el-option>
						<el-option label="调试" :value="1"></el-option>
						<el-option label="信息" :value="2"></el-option>
						<el-option label="警告" :value="3"></el-option>
						<el-option label="错误" :value="4"></el-option>
						<el-option label="致命" :value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="info" @click="onGetTableData(true)">
						<el-icon>
							<Search />
						</el-icon>
						&#8197;{{ $t('message.action.search') }}
					</el-button>
				</el-form-item>
				<el-form-item></el-form-item>
			</el-form>
			<el-table :data="tableData.data" v-loading="tableData.loading" :height="proxy.$calcMainHeight(-90)" border stripe highlight-current-row>
				<el-table-column type="index" width="50" align="right" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Id" label="编号" width="170" show-overflow-tooltip />
				<el-table-column prop="FormName" label="模型名称" width="110" show-overflow-tooltip />
				<el-table-column prop="Title" label="标题" width="210" show-overflow-tooltip />
				<el-table-column prop="Content" label="内容" show-overflow-tooltip />
				<el-table-column prop="Exception" label="消息" width="160" show-overflow-tooltip />
				<el-table-column prop="CreateTime" label="操作时间" width="160" sortable :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateBy" label="操作人" width="90" show-overflow-tooltip />
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
		<!-- <editDlg ref="editDlg" /> -->
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
// import editDlg from './component/edit.vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'commonLog',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_common_log`;
		const state: any = reactive({
			moduleKey: moduleKey,
			scopeMode,
			scopeValue,
			timeRange:[dayjs().startOf("day"), dayjs().endOf("day")],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					formName:'',
					loglevel:-1,
					pageNum: 1,
					pageSize: 20,
				},
			},
			
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
			
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			state.tableData.param.loglevel = -1;
			onGetTableData(true);
		};

		// 查询表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (state.timeRange && state.timeRange.length>1) {
				state.tableData.param.startTime = state.timeRange[0]
				state.tableData.param.endTime = state.timeRange[1]
			}
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.common.commonlog.getListByScope(state.scopeMode, state.scopeValue, state.tableData.param);
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

		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});
		const { dateFormatYMDHM,dateFormatHMS,dateFormatHM,dateShortcuts } = commonFunction();
		return {
			onGetTableData,
			onHandleSizeChange,
			onHandleCurrentChange,
			onResetSearch,
			dateFormatYMDHM,dateFormatHMS,dateFormatHM,dateShortcuts,
			proxy,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
