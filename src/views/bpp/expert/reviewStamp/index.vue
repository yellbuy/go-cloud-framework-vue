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
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<div style="text-align: left; font-size: 15px; color: red;">
					<h>注意：组长一旦开始签章，之前的评分环节不能再退回重评！请组长先查看各表，确认无误再签章！</h>
				</div>
			</el-col>
			<el-col :span="24">
				<div style="text-align: center; font-size: 20px;">
					<h>评审材料（个人签章部分）</h>
				</div>
			</el-col>
			<el-col :span="24">
				<div>
					<el-button text bg type="primary" @click="onCompile">批量签章</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="selection" width="50" fixed />
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Id" label="材料名称" show-overflow-tooltip/>
					<el-table-column prop="CheckState" label="状态" width="150" show-overflow-tooltip>
						<template #default="scope">
							<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
								<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span >签章完成</span>
							</div>
							<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
								<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span>尚未签章</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="">签章</el-button>
							<el-button text bg type="primary" @click="">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<div style="text-align: center; font-size: 20px;">
					<h>评审材料（集体签章部分）</h>
				</div>
			</el-col>
			<el-col :span="24">
				<div>
					<el-button text bg type="primary" @click="">批量签章</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="selection" width="50" fixed />
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Id" label="材料名称" show-overflow-tooltip/>
					<el-table-column prop="CheckState" label="状态" width="150" show-overflow-tooltip>
						<template #default="scope">
							<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
								<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span >签章完成</span>
							</div>
							<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
								<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span>尚未签章</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="">签章</el-button>
							<el-button text bg type="primary" @click="">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
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
			project: {},
			tableData: {
				data: [{Id:"AXDF123",Name: "张三", CheckState: 1,VoteState: 1, VoteCount: 5, LeaderState: 1}],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
		});
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
				ElMessage.error('选中列表都已签章！');
				return;
			}
			ElMessageBox.confirm(`确定批量签章吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				// try {
				// 	const res = await proxy.$api.common.enterprise.audit(state.ruleForm);
				// 	if (res.errcode != 0) {
				// 		return;
				// 	}
				// 	state.ruleForm.AuditState = 0;
				// } finally {
				// 	onGetTableData(true);
				// }
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
		onMounted(() => {});

		return {
			proxy,
			getCompanyList,
			onCompile,
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
