<template>
	<div>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
					<el-descriptions-item label="评委编号：">
						<el-select v-model="state.expertId" placeholder="请选择" @change="selectProjectExpert">
							<el-option v-for="(item, index) in state.projectExpertList" :key="index" :label="item.Name" :value="item.Uid"/>
						</el-select>
					</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-240)" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="SetLineContent" label="评分点" width="300" align="right" show-overflow-tooltip/>
			<el-table-column prop="SetLineStandard" label="评分标准" show-overflow-tooltip/>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { reactive, onMounted, getCurrentInstance } from 'vue';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	projectForm: {},
	expertId: "",
	projectExpertList: [],
	projectExpertForm: {},
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

//	打开页面
const openPage = async (row: {}) => {
	state.projectForm = row
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
};

const selectProjectExpert = async (event) => {
    state.projectExpertForm = state.projectExpertList.find(item => item.Uid === event);
	onGetTableData()
}

//	获取该项目参与的所有专家列表
const getProjectExpertList = async () => {
	try {
		state.tableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectexpert.getListByScope("zgps", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return
		}
		state.projectExpertList = []
		state.projectExpertList = res.data;
		state.projectExpertList.push({Name: "全部汇总", Uid: "0"})
	} finally {
	}
};

//	获取专家汇总信息列表
const onGetTableData = async () => {
	state.tableData.loading = true
	try {
		state.tableData.param.expertId = state.expertId
		state.tableData.param.projectId = state.projectId
		const res = await proxy.$api.erp.projectreview.getGatherListByScope('zgps', 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return
		}
		state.tableData.data = res.data.RecordList;
		state.tableData.headerList = res.data.HeaderList
	} finally {
		state.tableData.loading = false
	}
};


// 页面加载时
onMounted(() => {
	getProjectExpertList()
});

defineExpose({openPage, closePage})
</script>

<style scoped lang="scss"></style>
