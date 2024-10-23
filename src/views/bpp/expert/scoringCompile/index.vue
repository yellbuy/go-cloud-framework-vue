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
			<el-col :span="6">
				<div>
					<el-button type="primary" @click="onSubmit">汇总</el-button>
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
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="CompanyName" label="投标方名称" show-overflow-tooltip/>
					<el-table-column prop="ReviewPrice" label="投标评审价（元）" width="150" show-overflow-tooltip/>
					<el-table-column prop="PriceScore" label="报价得分" width="150" show-overflow-tooltip/>
					<el-table-column prop="TechnicalScore" label="技术得分" width="150" show-overflow-tooltip/>
					<el-table-column prop="" label="最终得分" width="150" show-overflow-tooltip/>
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
	projectId: '',
	projectList: [],
	projectForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			kind: 'pfhz',
			current: 1,
			pageSize: 20,
		},
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

const selectProject = async (event) => {
    state.projectForm = state.projectList.find(item => item.Id === event);
	state.tableData.data = []
	onGetTableData()
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

//获取投标方列表
const onGetTableData = async () => {
	try {
		const projectCompanyRes = await proxy.$api.erp.projectcompany.signUpList({projectId: state.projectId, kind: 'bid', pageIndex: 0, pageSize: 20,});
		if (projectCompanyRes.errcode != 0) {
			return;
		}
		//获取项目专家评审结果表
		state.tableData.param.projectId = state.projectId
		state.tableData.param.isGather = 1
		const projectReviewRes = await proxy.$api.erp.projectreview.getListByScope("gather", 0, 0, state.tableData.param);
		if (projectReviewRes.errcode != 0) {
			return;
		}
		state.tableData.data = []
		for (let val of projectCompanyRes.data) {
			let model = {}
			model.CompanyName = val.CompanyName
			model.ReviewPrice = 0
			model.PriceScore = 0
			model.GatherScore = 0
			model.TechnicalScore = 0
			state.tableData.data.push(model)
			for	(let item of projectReviewRes.data){
				if (item.CompanyId == val.CompanyId) {
					model.Id = item.Id
					model.ReviewPrice = item.ReviewPrice
					model.PriceScore = item.PriceScore
					model.GatherScore = item.GatherScore
					model.TechnicalScore = item.TechnicalScore
				}
			}

		}
	} finally {
	}
};

const onSubmit = async () => {
	ElMessageBox.confirm(`确定要汇总吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectreview.scoreGatherSave(state.projectId, {kind: "gather"});
			if (res.errcode != 0) {
				return;
			}
			onGetTableData()
			ElMessage('汇总成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('取消汇总')
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
