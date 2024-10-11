<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="Name" label="专家姓名" width="120" show-overflow-tooltip/>
					<el-table-column prop="IsSignIn" label="是否签到" width="100" align="center" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.IsSignIn == 0">否</span>
							<span v-else-if="scope.row.IsSignIn == 1">是</span>
						</template>
					</el-table-column>
					<el-table-column prop="LeaderUid" label="是否投票" width="100" align="center" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.LeaderUid != '0'">是</span>
							<span v-else>否</span>
						</template>
					</el-table-column>
					<el-table-column prop="PollNum" label="的票数" show-overflow-tooltip/>
					<el-table-column prop="IsLeader" label="是否是组长" width="100" align="center" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.IsLeader == 0">否</span>
							<span v-else-if="scope.row.IsLeader == 1">是</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="onModelSave(scope.row)">推荐组长</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="state.tableData.param.current"
					background
					v-model:page-size="state.tableData.param.pageSize"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="state.tableData.total"/>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, computed, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
			projectId: '',
			roles: 1,
		},
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//	获取该项目专家列表
const onGetTableData = async () => {
	state.tableData.loading = true
	try {
		state.tableData.param.projectId = state.project.Id
		state.tableData.param.roles = 0
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total
	} finally {
		state.tableData.loading = false
	}
};

const onModelSave = async (data: {}) => {
	if (!data.Id) {
		ElMessage.error('请选择人员进行推荐！');
		return;
	}
	ElMessageBox.confirm(`推荐机会只有一次，确定要推荐他为组长吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectexpert.expertLeader(data.Id, data);
			if (res.errcode != 0) {
				return;
			}
			ElMessage('推荐成功')
			onGetTableData()
		} finally {
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
	state.tableData.param.current = val;
};

// 页面加载时
onMounted(() => {
	onGetTableData()
});

</script>

<style scoped lang="scss">
</style>
