<template>
	<div>
		<el-row>
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectForm.Location }}</el-descriptions-item>
					<el-descriptions-item label="评委编号：">
						<el-select v-model="state.expertUid" placeholder="请选择" @change="selectProjectExpert">
							<el-option v-for="(item, index) in state.projectExpertList" :key="index" :label="item.Name" :value="item.Uid"/>
						</el-select>
					</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="60" fixed />
			<el-table-column prop="QualificationScore" label="评分点" align="right" width="150" show-overflow-tooltip/>
			<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip/>
			<el-table-column prop="TechnicalMaxScore" label="最高分" align="right" width="60" show-overflow-tooltip/>
			<el-table-column width="150" align="right" show-overflow-tooltip v-for="(item, index) in state.tableData.headerList" :key="index" :label="item.CompanyName" :prop="item.HeaderName">
				<template #default="scope">
					<el-tag v-if="scope.row[item.HeaderName] == 'notSummary'">待汇总</el-tag>
					<el-tag v-else-if="scope.row[item.HeaderName] == 'notReview'">专家未评审</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
// import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import { Item } from 'ant-design-vue/lib/menu';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectForm: {},
	expertUid: "",
	projectExpertList: [],
	projectExpertForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param:{},
	},
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	onGetProjectExpertList()
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
const onGetProjectExpertList = async () => {
	try {
		state.tableData.param.projectId = state.projectForm.Id
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, {projectId: state.projectForm.Id, pageIndex: 0, pageSize: 20,});
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
		state.tableData.param.expertUid = state.expertUid
		state.tableData.param.projectId = state.projectForm.Id
		const res = await proxy.$api.erp.projectreview.getGatherListByScope('jspsGather', 0, 0, state.tableData.param);
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

});

defineExpose({openPage, closePage})

</script>

<style scoped lang="scss"></style>
