<template>
	<div class="common-concretedata-container">
		<el-card shadow="hover">
			<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
				<el-form-item label="发送时间：" style="width:300px; white-space: nowrap;" >
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
				
				<el-form-item label="状态">
					<el-select v-model="tableData.param.state" placeholder="提交状态" style="width:90px; white-space: nowrap;">
						<el-option label="不限" :value="-2"></el-option>
						<el-option label="未提交" :value="0"></el-option>
						<el-option label="提交成功" :value="1"></el-option>
						<el-option label="提交失败" :value="-1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类">
					<el-select v-model="tableData.param.actType" placeholder="消息分类" style="width:80px; white-space: nowrap;">
						<el-option label="不限" :value="0"></el-option>
						<el-option label="短信" :value="1"></el-option>
						<el-option label="Email" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关键字：">
					<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
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
				<el-table-column prop="Id" label="ID" width="170" show-overflow-tooltip />
				
				<el-table-column prop="SendTo" label="发送目标" width="100" show-overflow-tooltip />
				<el-table-column prop="ActType" label="分类" width="70" align="center">
					<template #default="scope">
						<el-tag type="success" class="mr4" effect="dark" v-if="scope.row.ActType==1">短信</el-tag>
						<el-tag type="danger" class="mr4" effect="dark" v-else-if="scope.row.ActType==2">Email</el-tag>
						<el-tag type="warning" class="mr4" effect="dark" v-else>其他</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="State" label="发送状态" width="80" align="center">
					<template #default="scope">
						<el-tag type="warning" class="mr4" effect="dark" v-if="scope.row.State==0">待发</el-tag>
						<el-tag type="success" class="mr4" effect="dark" v-if="scope.row.State==1">成功</el-tag>
						<el-tag type="danger" class="mr4" effect="dark" v-else>失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Title" label="标题" width="210" show-overflow-tooltip />
				<el-table-column prop="Content" label="内容" show-overflow-tooltip />
				<el-table-column prop="CreateTime" label="创建时间" width="140" sortable :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateBy" label="操作人" width="90" show-overflow-tooltip />
				<el-table-column prop="Errcode" label="响应代码" width="90" show-overflow-tooltip />
				<el-table-column prop="Errmsg" label="响应消息" width="200" show-overflow-tooltip />
				<el-table-column prop="IsDel" label="消息状态" width="70" align="center">
					<template #default="scope">
						<el-tag type="success" class="mr4" effect="dark" v-if="scope.row.IsDel==0">正常</el-tag>
						<el-tag type="danger" class="mr4" effect="dark" v-else>失效</el-tag>
					</template>
				</el-table-column>
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
	name: 'commonSms',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_common_sms`;
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
					actType:0,
					state:-2,
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
				const res = await proxy.$api.common.sms.getListByScope(state.scopeMode, state.scopeValue, state.tableData.param);
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
