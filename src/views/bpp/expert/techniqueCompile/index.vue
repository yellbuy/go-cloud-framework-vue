<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">test</el-descriptions-item>
					<el-descriptions-item label="项目编号：">test</el-descriptions-item>
					<el-descriptions-item label="开标时间：">test</el-descriptions-item>
					<el-descriptions-item label="开标地点：">test</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<div>
					<el-button type="primary" @click="onCompile(tableData.param.projectId)">汇总</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<el-form-item label="评委编号：">
					<el-select v-model="projectLineIndex" placeholder="请选择" @change="">
						<el-option v-for="(item, index) in project.ProjectLineList" :key="index" :label="item.Name" :value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<div style="float: right;">
					<el-button type="primary" @click="onReturnReview(tableData.param.projectId)">退回重评</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="TechnicalScore" label="评分点" width="120" show-overflow-tooltip/>
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip/>
					<el-table-column prop="" label="满分" show-overflow-tooltip/>
					<el-table-column prop="" label="一号公司" show-overflow-tooltip/>
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="tableData.param.current"
					background
					v-model:page-size="tableData.param.size"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total"/>
			</el-col>
		</el-row>
	</el-card>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
export default {
	name: 'companyEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			projectLineIndex:'',
			activeName:"jsps",
			project: {},
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					size: 20,
					projectId: '279082270076182531',
					categoryId: null,
					name: '',
				},
			},
		});

		//技术表格
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.current = 1;
			}
			state.tableData.loading = true;
			try {
				state.tableData.param.kind = state.activeName
				const res = await proxy.$api.erp.projectsettingline.getListByScope(state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.total = res.total;
				state.tableData.data = res.data;
			} finally {
				state.tableData.loading = false;
			}
		};

		//获取项目品目信息
		const getCompanyList = async (isState: boolean) => {
			if (isState) {
				let params = {};
				state.project = store.state.project.project;
				state.tableData.data = [];
				try {
					params.projectId = store.state.project.projectId;
					params.state = 1;
					//重新请求数据

					const res = await proxy.$api.erp.projectcompany.comparisonList(params);
					//获取存储的项目数据
					if (res.errcode != 0) {
						return;
					}
					state.tableData.data = res.data;
				} finally {
				}
			}
		};

		const onCompile = async (Id: Number) => {
			if (!Id) {
				ElMessage.error('当前没有正在评选的项目包，请刷新重试。');
				return;
			}
			ElMessageBox.confirm(`确定汇总吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.projectreview.expertGatherSave(state.tableData.params.projectId ,params);
					if (res.errcode != 0) {
						return;
					}
					state.ruleForm.AuditState = 0;
				} finally {
					onGetTableData(true);
				}
				return false;
			});
		};

		const onReturnReview = async (Id: Number) => {
			if (!Id) {
				ElMessage.error('当前没有可退回重评的项目包。');
				return;
			}
			ElMessageBox.confirm(`确定退回重评吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.projectreview.expertGatherReturn(state.tableData.params.projectId ,params);
					if (res.errcode != 0) {
						return;
					}
					state.ruleForm.AuditState = 0;
				} finally {
					onGetTableData(true);
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

		// 页面加载时
		onMounted(() => {
			onGetTableData(true);
		});

		return {
			proxy,
			getCompanyList,
			onCompile,
			onReturnReview,
			onHandleSizeChange,
			onHandleCurrentChange,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
