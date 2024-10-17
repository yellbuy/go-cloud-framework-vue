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
		<el-row>
			<el-col :span="8">
				<div>
					<el-button text bg type="primary" @click="onCompile">组长确认</el-button>
					<el-button text bg type="primary" @click="">退回重评</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<el-form-item label="评委编号：">
					<el-select v-model="state.ruleForm.Id" placeholder="请选择" @change="getProjectReviewList">
						<el-option v-for="(item, index) in state.projectExpertTableData.data" :key="index" :label="item.Name" :value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
			</el-col>
		</el-row>
		<el-col :span="24">
			<div style="text-align: center;font-size: 20px; padding-bottom: 15px;">
				<h>报价得分表</h>
			</div>
		</el-col>
		<el-row>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Id" label="投标方名称" width="120" show-overflow-tooltip/>
					<el-table-column prop="Name" label="总报价（元）" show-overflow-tooltip/>
					<el-table-column prop="Name" label="最终评审报价（元）" show-overflow-tooltip/>
					<el-table-column prop="Name" label="价格得分" show-overflow-tooltip/>
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
	projectLineIndex:'',
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
	projectExpertTableData: {
		data: [],
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
			size: 20,
		},
	},
	ruleForm: {},
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


//	获取专家汇总信息
const getProjectReviewList = async () => {
	state.tableData.loading = true
	try {
		state.tableData.param.projectId = state.project.Id
		state.tableData.param.expertUid = state.ruleForm.Id
		const res = await proxy.$api.erp.projectreview.getList("zgps", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return
		}
		state.tableData.data = res.data.RecordList;
	} finally {
		state.tableData.loading = false
	}
};

//获取项目品目信息
const getCompanyList = async (isState: boolean) => {
	if (isState) {
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
	}
};

const onCompile = async (Id: Number) => {
	if (!Id) {
		ElMessage.error('当前页面没有数据，不能汇总！');
		return;
	}
	ElMessageBox.confirm(`确定汇总吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		// try {
		// 	const res = await proxy.$api.common.enterprise.audit(state.ruleForm);
		// 	if (res.errcode != 0) {
		// 		return;
		// 	}
		// 	state.ruleForm.AuditState = 0;
		// } finally {
		// 	onGetTableData(true);
		// }
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
	onGetProjectTableData()
});

</script>

<style scoped lang="scss">
</style>
