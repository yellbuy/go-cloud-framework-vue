<template>
	<div class="ims-case-firstaudit-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item :label="'报案号：'">
						<el-input placeholder="请输入报案号查询" v-model="tableData.param.no"> </el-input>
					</el-form-item>
					<el-form-item :label="'状态：'">
						<el-select v-model="tableData.param.state" placeholder="请选择" style="width: 90px">
							<el-option v-for="item in stateData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'委托单位：'" v-if="tid == '0'">
						<el-select v-model="tableData.param.tids" multiple placeholder="请选择" style="width: 240px">
							<el-option v-for="item in tidData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'专家姓名：'" v-if="tid == '0'">
						<el-select v-model="expertAuditUids" multiple placeholder="请选择" style="width: 80px">
							<el-option v-for="item in userData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'完成时间：'">
						<el-date-picker
							v-model="timeList"
							type="datetimerange"
							:shortcuts="shortcuts"
							range-separator="到"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							value-format="YYYY-MM-DD HH:mm:ss"
						/>
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
						<el-button type="info" @click="exportExcel()" v-auth:[moduleKey]="'btn.Export'">
							<el-icon>
								<Download />
							</el-icon>
							&#8197;{{ $t('message.action.export') }}
						</el-button>
					</el-form-item>
					<el-form-item> </el-form-item>
				</el-form>
			</div>
			<el-table
				:data="tableData.data"
				:span-method="objectSpanMethod"
				v-loading="tableData.loading"
				style="width: 100%"
				size="small"
				:height="proxy.$calcMainHeight(-125)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="CaseNo" label="报案号" width="100" fixed></el-table-column>
				<el-table-column prop="TName" label="委托单位" width="110"></el-table-column>
				<el-table-column prop="UName" label="委托人" width="70" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Sn" label="编号" width="130" show-overflow-tooltip></el-table-column>
				<el-table-column prop="PersonName" label="伤者姓名" width="80" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CaseMode" label="委托类型" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.CaseMode == 1">估损</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.CaseMode == 2">核损</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.CaseMode == 10">鉴定</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="CaseType" label="分类" width="100" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.CaseType == 1">门诊就医</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.CaseType == 2">住院非手术</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.CaseType == 3">住院手术</el-tag>
						<el-tag type="danger" effect="plain" v-else-if="scope.row.CaseType == 10">死亡</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ExpertAuditBy" label="专家姓名" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<!-- <el-table-column prop="ExpertAuditReceiveTime" label="接单时间" width="115" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column> -->
				<el-table-column prop="ExpertAuditTime" label="审核时间" width="115" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertReviewTime" label="完成时间" width="115" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="State" label="状态" width="90" align="center" fixed="right">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.ExpertReviewState == 10">已完成</el-tag>
						<el-tag type="danger" effect="plain" v-else-if="scope.row.ExpertReviewState == 5">复审驳回</el-tag>
						<el-tag type="primary" effect="plain" v-else-if="scope.row.ExpertAuditState == 10">复审待审</el-tag>
						<el-tag type="danger" effect="plain" v-else-if="scope.row.ExpertAuditState == 5">专家驳回</el-tag>
						<el-tag type="primary" effect="plain" v-else-if="scope.row.InsurerAuditState == 10">保司通过</el-tag>
						<el-tag type="danger" effect="plain" v-else-if="scope.row.InsurerAuditState == 5">保司驳回</el-tag>
						<el-tag type="primary" effect="plain" v-else>保司待审</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ExpertReviewBy" label="审核专家" width="80" show-overflow-tooltip> </el-table-column>
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

import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
export default {
	name: 'baseUsers',
	setup() {
		const moduleKey = 'api_ims_case_stat';
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const dlgEditRef = ref();
		const defaultTime = new Date(2000, 1, 1, 12, 0, 0);
		const state: any = reactive({
			moduleKey: moduleKey,
			uid: store.state.userInfos.userInfos.uid,
			tid: store.state.userInfos.userInfos.tid,
			timeList: [],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					kind: 'insurance',
					searchPage: 0, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode: 0, //0：所有，1：待审，2：已审，3：我审核的
					no: '', //报案号
					tids: [],
					expertAuditUids: '',
					state: -1,
					pageNum: 1,
					pageSize: 20,
					expertReviewStatTime: '',
					expertReviewEndTime: '',
					isExport: false,
				},
			},
			tidData: [], //委托单位
			userData: [], //用户
			expertAuditUids: [],
			stateData: [
				{ Id: -1, Name: '全部' },
				{
					Id: 1,
					Name: '已提交',
				},
				{
					Id: 2,
					Name: '已完成',
				},
				{
					Id: 3,
					Name: '未通过',
				},
			],
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.no = '';
			state.expertAuditUids = [];
			state.tableData.param.state = -1;
			state.tableData.param.tids = [];
			state.tableData.param.expertAuditUids = '';
			state.expertReviewStatTime = '';
			state.expertReviewEndTime = '';
			state.timeList = [];
			onGetTableData(true);
		};
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })

		//导出
		const exportExcel = async () => {
			state.tableData.param.expertAuditUids = state.expertAuditUids.toString();

			if (state.timeList && state.timeList.length == 2) {
				state.tableData.param.expertReviewStatTime = state.timeList[0];
				state.tableData.param.expertReviewEndTime = state.timeList[1];
			} else {
				state.tableData.param.expertReviewStatTime = '';
				state.tableData.param.expertReviewEndTime = '';
			}
			state.tableData.param.isExport = true;
			const res = await proxy.$api.ims.casepersonline.export(state.tableData.param);
			if (res.data.size == 0) {
				return;
			} else {
				// 返回不为空
				var url = window.URL.createObjectURL(res.data);
				var a = document.createElement('a');
				a.href = url;
				a.download = '案件统计_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
				a.click();
			}

			// if (res.errcode !== 0) {
			// 	return;
			// }
		};
		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			console.log('加载表格数据', state.timeList);
			state.tableData.param.isExport = false;
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				console.log(state.tableData.param);
				state.tableData.param.expertAuditUids = state.expertAuditUids.toString();
				if (state.timeList && state.timeList.length == 2) {
					state.tableData.param.expertReviewStatTime = state.timeList[0];
					state.tableData.param.expertReviewEndTime = state.timeList[1];
				} else {
					state.tableData.param.expertReviewStatTime = '';
					state.tableData.param.expertReviewEndTime = '';
				}

				const res = await proxy.$api.ims.casepersonline.getList(state.tableData.param);
				if (res.errcode !== 0) {
					return;
				}
				state.tableData.total = res.total;
				let caseId = '0';
				//合并单元格
				for (const i in res.data) {
					const index = Number.parseInt(i);
					const item = res.data[index];
					item.rowSpan = 1;
					if (item.CaseId != caseId) {
						let curIndex = index;
						caseId = item.CaseId;
						while (++curIndex < res.data.length) {
							if (caseId == res.data[curIndex].CaseId) {
								item.rowSpan += 1;
							} else {
								break;
							}
						}
					} else {
						item.rowSpan = 0;
					}
					//console.log("item.rowSpan:",item.rowSpan)
				}
				state.tableData.data = res.data;
			} finally {
				state.tableData.loading = false;
			}
		};
		interface SpanMethodProps {
			row: any;
			column: TableColumnCtx<any>;
			rowIndex: number;
			columnIndex: number;
		}
		const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
			if (columnIndex >= 1 && columnIndex < 6) {
				//console.log("row.rowSpan：",row.rowSpan)
				if (row.rowSpan > 0) {
					return [row.rowSpan, 1];
				} else {
					return [0, 0];
				}
			}
		};
		const getLoadData = async () => {
			if (state.tid == '0') {
				const tidRes = await proxy.$api.base.tenant.getList({ pageNum: 1, pageSize: 10000 });
				if (tidRes.errcode != 0) {
					return;
				}
				state.tidData = tidRes.data;
			}

			const res = await proxy.$api.base.user.getList({ pageNum: 1, pageSize: 10000 });
			if (res.errcode != 0) {
				return;
			}
			state.userData = res.data;
			onGetTableData();
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
			getLoadData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			dlgEditRef,
			defaultTime,
			objectSpanMethod,
			onGetTableData,
			onResetSearch,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			exportExcel,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
