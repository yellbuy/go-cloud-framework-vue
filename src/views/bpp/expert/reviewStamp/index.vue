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
				<div style="text-align: left; font-size: 15px; color: red;">
					<h>注意：组长一旦开始签章，之前的评分环节不能再退回重评！请组长先查看各表，确认无误再签章！</h>
				</div>
			</el-col>
			<el-col :span="24">
				<div style="text-align: center; font-size: 20px;">
					<h>评审材料（个人签章部分）</h>
				</div>
			</el-col>
			<el-col :span="24">
				<div>
					<el-button text bg type="primary" @click="onSubmit">批量签章</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="selection" width="50" fixed />
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Id" label="材料名称" show-overflow-tooltip/>
					<el-table-column prop="CheckState" label="状态" width="150" show-overflow-tooltip>
						<template #default="scope">
							<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
								<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span >签章完成</span>
							</div>
							<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
								<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span>尚未签章</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="">签章</el-button>
							<el-button text bg type="primary" @click="">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;" v-if="state.projectId > 0">
			<el-col :span="24">
				<div style="text-align: center; font-size: 20px;">
					<h>评审材料（集体签章部分）</h>
				</div>
			</el-col>
			<el-col :span="24">
				<div>
					<el-button text bg type="primary" @click="">批量签章</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="state.projectId > 0">
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="selection" width="50" fixed />
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Id" label="材料名称" show-overflow-tooltip/>
					<el-table-column prop="CheckState" label="状态" width="150" show-overflow-tooltip>
						<template #default="scope">
							<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
								<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span >签章完成</span>
							</div>
							<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
								<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span>尚未签章</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="">签章</el-button>
							<el-button text bg type="primary" @click="">查看</el-button>
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
	ElMessageBox.confirm(`确定要签章吗?`, '提示', {
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
