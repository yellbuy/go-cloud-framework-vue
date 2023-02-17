<template>
	<div class="base-role-container">
		<el-descriptions class="margin-top" :column="2">
			<el-descriptions-item label="项目名称：">{{ project.Name }}</el-descriptions-item>
			<el-descriptions-item label="项目编号：">{{ project.No }}</el-descriptions-item>
			<el-descriptions-item label="评选时间：">{{ project.ReviewTime }}</el-descriptions-item>
			<el-descriptions-item label="评选地点：">{{ project.Location }} </el-descriptions-item>
		</el-descriptions>
		<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="CompanyName" label="公司名称" width="120" show-overflow-tooltip></el-table-column>
			<!-- <el-table-column prop="LineName" label="品目号" show-overflow-tooltip></el-table-column> -->
			<el-table-column prop="SignUpTime" label="报名时间" show-overflow-tooltip></el-table-column>
			<el-table-column prop="LineState" label="付款状态" show-overflow-tooltip>
				<template #default="scope">
					<span v-if="scope.row.LineState == 0">已投标</span>
					<span v-else-if="scope.row.LineState == 1">已付款</span>
				</template>
			</el-table-column>
			<el-table-column prop="BiddingTime" label="投标文件送达时间" show-overflow-tooltip>
				<template #default="scope">
					<span v-if="scope.row.BiddingTime > '0001.01.01 00:00:00'">{{ scope.row.BiddingTime }}</span>
					<span v-else></span>
				</template>
			</el-table-column>
		</el-table>
	</div>
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
				data: [],
				total: 0,
				loading: false,
			},
		});
		//获取项目品目信息
		const getCompanyList = async () => {
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
		};

		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			getCompanyList,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
