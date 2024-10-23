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
		<el-row style="padding: 15px;" v-if="state.projectId > 0">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.projectTableData.ruleForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectTableData.ruleForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectTableData.ruleForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectTableData.ruleForm.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
			<el-col :span="24">
				<div>
					<el-button text bg type="primary" @click="onDownloadFile">下载评标报告</el-button>
					<el-button text bg type="primary" @click="">刷新</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div style="text-align: center; font-size: 40px;">
					<h>PDF预览</h>
				</div>
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
		param: {},
	},
});

state.projectTableData.param.pageIndex = computed(() => {
	return state.projectTableData.param.current - 1;
});

const selectProject = async (event) => {
    state.projectTableData.ruleForm = state.projectTableData.data.find(item => item.Id === event);
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

// 下载文件
const onDownloadFile = async () => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + state.project.Files;
	a.download = state.project.Name + '《评标报告》'; // 下载后的文件名称
	a.click();
};

// 页面加载时
onMounted(() => {
	onGetProjectTableData()
});

</script>
<style scoped lang="scss">
</style>
