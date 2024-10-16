<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-form-item label="选择参与项目：" prop="Id">
					<el-select v-model="state.tableData.param.projectId" filterable placeholder="请选择" @change="selectProject">
						<el-option v-for="(item, index) in state.projectTableData.data" :key="index" :label="item.Name" :value="item.Id" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.projectTableData.ruleForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectTableData.ruleForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectTableData.ruleForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectTableData.ruleForm.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;">
			<el-col :span="6">
				<div>
					<el-button text bg type="primary" @click="">刷新</el-button>
				</div>
			</el-col>
			<el-col :span="12">
				<div style="text-align: center; font-size: 20px;">
					<h>评分汇总表</h>
				</div>
			</el-col>
			<el-col :span="6">
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="Id" label="投标方名称" show-overflow-tooltip/>
					<el-table-column prop="Name" label="投标评审价（元）" width="150" show-overflow-tooltip/>
					<el-table-column prop="Name" label="报价得分" width="150" show-overflow-tooltip/>
					<el-table-column prop="Name" label="技术得分" width="150" show-overflow-tooltip/>
					<el-table-column prop="Name" label="最终得分" width="150" show-overflow-tooltip/>
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
import { toRefs, reactive, computed, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	projectTableData: {
		data: [],
		ruleForm: {},
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
});

state.projectTableData.param.pageIndex = computed(() => {
	return state.projectTableData.param.current - 1;
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

const selectProject = async (event) => {
    state.projectTableData.ruleForm = state.projectTableData.data.find(item => item.Id === event);
	getProjectExpertList()
}

const onGetProjectTableData = async () => {
	state.projectTableData.loading = true;
	try {
		const res = await proxy.$api.erp.projectbid.expertParticipateList("bid", 0, 4);
		if (res.errcode != 0) {
			return;
		}
		state.projectTableData.data = res.data;
		state.projectTableData.total = res.total;
	} finally {
		state.projectTableData.loading = false;
	}
};

//	获取该项目专家列表
const getProjectExpertList = async () => {
	state.projectExpertTableData.loading = true
	try {
		state.projectExpertTableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, state.projectExpertTableData.param);
		if (res.errcode != 0) {
			return
		}
		state.projectExpertTableData.data = res.data;
		state.projectExpertTableData.total = res.total
	} finally {
		state.projectExpertTableData.loading = false
	}
};

//获取评审参数列表
const onGetProjectReviewTableData = async () => {
	state.projectReviewTableData.loading = true;
	try {
		state.projectReviewTableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectreview.getListByScope("zgps", 0, 0, state.projectReviewTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.projectReviewTableData.data = res.data
	} finally {
		state.projectReviewTableData.loading = false;
	}
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
	onGetProjectTableData()
});

</script>

<style scoped lang="scss">
</style>
