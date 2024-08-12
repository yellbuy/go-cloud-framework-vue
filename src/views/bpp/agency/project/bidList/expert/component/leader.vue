<template>
	<div class="base-role-container">
		<el-table
			:data="tableData.data"
			v-loading="tableData.loading"
			style="width: 100%"
			:height="proxy.$calcMainHeight(-175)"
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
			<el-table-column prop="PollNum" label="得票数" show-overflow-tooltip align="right" />
			<el-table-column prop="IsLeader" label="是否是组长" show-overflow-tooltip fixed>
				<template #default="scope">
					<span v-if="scope.row.IsLeader == 0">组员</span>
					<span v-else>组长</span>
				</template>
			</el-table-column>
			<el-table-column v-if="isState" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" fixed="right">
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
	name: 'leader',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: store.state.project.project,
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
			isState: false,
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			kind: 'leader',
		});
		const getExpertList = async (isState: boolean) => {
			state.isState = isState;
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { kind: state.kind });
				if (res.errcode == 0) {
					state.tableData.data = res.data;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const onLeader = async (row) => {
			ElMessageBox.confirm(`确定要推荐吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.projectreview.expertLeader(store.state.project.projectId, row);
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						getExpertList(state.isState);
					}
				} finally {
				}
			});
		};

		// 页面加载时
		onMounted(() => {
			getExpertList(state.isState);
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
