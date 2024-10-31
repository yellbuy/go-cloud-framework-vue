<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-form-item label="选择参与项目：" prop="Id">
					<el-select v-model="state.projectId" filterable placeholder="请选择" @change="selectProject">
						<el-option v-for="(item, index) in state.projectList" :key="index" :label="item.Name" :value="item.Id" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;" v-if="state.projectId > 0">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectForm.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<div>
					<el-button text bg type="primary" @click="onDownloadFile">下载评标报告</el-button>
					<el-button text bg type="primary" @click="">刷新</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<div style="text-align: center; font-size: 40px;">
					<h>PDF预览</h>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, ref, getCurrentInstance } from 'vue';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectId: '',
	projectList: [],
	projectForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {},
	},
});

const selectProject = async (event) => {
    state.projectForm = state.projectList.find(item => item.Id === event);
}

//	获取专家参与的项目列表
const onGetProjectTableData = async () => {
	try {
		const res = await proxy.$api.erp.projectbid.expertParticipateList("bid", 0, 4);
		if (res.errcode != 0) {
			return;
		}
		state.projectList = res.data;
	} finally {
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
