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
			<el-col :span="24">
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Id" label="专家编号" width="120" show-overflow-tooltip/>
					<el-table-column prop="Name" label="专家姓名" width="120" show-overflow-tooltip/>
					<el-table-column prop="CheckState" label="是否签到" width="150" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.CheckState == 0">是</span>
							<span v-else-if="scope.row.CheckState == 1">否</span>
						</template>
					</el-table-column>
					<el-table-column prop="VoteState" label="是否投票" width="150" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.VoteState == 0">是</span>
							<span v-else-if="scope.row.VoteState == 1">否</span>
						</template>
					</el-table-column>
					<el-table-column prop="VoteCount" label="的票数" show-overflow-tooltip/>
					<el-table-column prop="LeaderState" label="是否是组长" width="150" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.LeaderState == 0">是</span>
							<span v-else-if="scope.row.LeaderState == 1">否</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="onModelSave(scope.row.Id)">{{ '推荐组长' }}</el-button>
						</template>
					</el-table-column>
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
			project: {},
			tableData: {
				data: [{Id:123 ,Name: "张三", CheckState: 1,VoteState: 1, VoteCount: 5, LeaderState: 1}],
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
		//获取项目专家列表信息
		const onGetTableData = async (isState: boolean) => {
			if (isState) {
				state.project = store.state.project.project;
				state.tableData.data = [];
				try {
					//请求获取列表
					const res = await proxy.$api.erp.project.expertList(state.project);
					//获取存储的项目数据
					if (res.errcode != 0) {
						return;
					}
					state.tableData.data = res.data;
				} finally {
				}
			}
		};

		const onModelSave = async (Id: Number) => {
			if (!Id) {
				ElMessage.error('请选择人员进行推荐！');
				return;
			}
			ElMessageBox.confirm(`确定要推荐他为组长吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.project.expertLeader(state.ruleForm);
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
			// onGetTableData(true)
		});

		return {
			proxy,
			onGetTableData,
			onHandleSizeChange,
			onHandleCurrentChange,
			onModelSave,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
