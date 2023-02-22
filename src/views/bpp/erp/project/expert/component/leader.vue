<template>
	<div class="base-role-container">
		<el-descriptions class="margin-top" :column="2">
			<el-descriptions-item label="项目名称：">{{ project.Name }}</el-descriptions-item>
			<el-descriptions-item label="项目编号：">{{ project.No }}</el-descriptions-item>
			<el-descriptions-item label="评选时间：">{{ project.ReviewTime }}</el-descriptions-item>
			<el-descriptions-item label="评选地点：">{{ project.Location }} </el-descriptions-item>
		</el-descriptions>
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
			<el-table-column prop="ExpertAccount" label="专家账号" show-overflow-tooltip fixed />
			<el-table-column prop="ExpertName" label="专家姓名" show-overflow-tooltip fixed />
			<el-table-column prop="ReviewState" label="是否投票" show-overflow-tooltip fixed>
				<template #default="scope">
					<span v-if="scope.row.ReviewState == 0">未投票</span>
					<span v-else>已投票</span>
				</template>
			</el-table-column>
			<el-table-column prop="TicketNum" label="得票数" show-overflow-tooltip fixed />
			<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" fixed="right">
				<template #default="scope">
					<el-button text bg type="primary" @click="onLeader(scope.row)"> 推荐组长 </el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
export default {
	name: 'expertEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: {},
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
		});
		const getExpertList = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectreview.expertLeaderList(store.state.project.projectId);
				if (res.errcode == 0) {
					state.tableData.data = res.data;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const onLeader = async (row) => {
			try {
				const res = await proxy.$api.erp.projectreview.expertLeader(row);
				if (res.errcode == 0) {
					getExpertList();
				}
			} finally {
			}
		};

		// 页面加载时
		onMounted(() => {
			state.project = store.state.project.project;
			getExpertList();
		});

		return {
			proxy,
			onLeader,
			project,
			getExpertList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
