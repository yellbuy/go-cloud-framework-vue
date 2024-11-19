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
		<el-row style="padding: 15px;" v-if="state.projectId > 0">
			<el-col :span="24">
				<div style="text-align: center; font-size: 20px;">
					<h>评审材料</h>
				</div>
			</el-col>
			<el-col :span="24">
				<div>
					<el-button type="primary" @click="onMuitSubmit">批量签章</el-button>
				</div>
			</el-col>
			<el-col :span="24">
				<div style="text-align: left; font-size: 15px; color: red;">
					<h>注意：组长一旦开始签章，之前的评分环节不能再退回重评！请组长先查看各表，确认无误再签章！</h>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<el-table :data="state.tableData.data" style="width: 100%" size="small" border stripe highlight-current-row @select="select" @select-all="selectAll">
					<el-table-column type="selection" width="50" fixed />
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="Content" label="材料名称" show-overflow-tooltip/>
					<el-table-column prop="IsSignature" label="状态" align="center" width="100" show-overflow-tooltip>
						<template #default="scope">
							<el-tag effect="danger" v-if="scope.row.IsSignature === 0">尚未签章</el-tag>
							<el-tag effect="success" v-else-if="scope.row.IsSignature === 1">签章完成</el-tag>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(140)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="onSubmit(scope.row)">签章</el-button>
							<!-- <el-button text bg type="primary" @click="">查看</el-button> -->
						</template>
					</el-table-column>
				</el-table>
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
	projectId: '',
	projectList: [],
	projectForm: {},
	tableData: {
		data:[],
		list: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
});
state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

const select = (selection: Array<object>) => {
	state.tableData.list = selection;
};
const selectAll = (selection: Array<object>) => {
	state.tableData.list = selection;
};


const selectProject = async (event) => {
    state.projectForm = state.projectList.find(item => item.Id === event);
	onGetTableData()
}

//	获取专家参与的项目列表
const onGetProjectTableData = async () => {
	try {
		const res = await proxy.$api.erp.projectexpert.expertParticipateList();
		if (res.errcode != 0) {
			return;
		}
		state.projectList = res.data;
	} finally {
	}
};

//获取投标方列表
const onGetTableData = async () => {
	try {
		//获取项目专家评审结果表
		state.tableData.param.projectId = state.projectId
		const res = await proxy.$api.erp.projectreview.getListByScope("signature", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data
	} finally {
	}
};

const onSubmit = async (data: {}) => {
	state.tableData.list = []
	state.tableData.list.push(data)
	onMuitSubmit()
}

const onMuitSubmit = async () => {
	ElMessageBox.confirm(`确定要签章吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const gatherRes = await proxy.$api.erp.projectreview.signatureSave(state.projectId, state.tableData.list);
			if (gatherRes.errcode != 0) {
				return;
			}
			onGetTableData()
			ElMessage('签章成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('取消签章')
	});
};

// 页面加载时
onMounted(() => {
	onGetProjectTableData()
});

</script>

<style scoped lang="scss">
</style>
