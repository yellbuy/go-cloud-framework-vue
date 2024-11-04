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
				<div>
					<el-button type="primary" @click="confirm">组长确认</el-button>
					<el-button type="primary" @click="onReturn">退回重评</el-button>
				</div>
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
					<el-table-column prop="TechnicalScore" label="最终得分" width="150" show-overflow-tooltip/>
					<el-table-column prop="Extattr" label="推荐中标候选人" width="150" show-overflow-tooltip>
						<template #default="scope">
							<el-input style="width: 100%;" v-model="scope.row.Extattr" :precision="2" :step="1" :min="0"/>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button bg type="primary" @click="onSubmit(scope.row)">保存</el-button>
						<el-button text bg type="primary" @click="">编辑</el-button>
					</template>
				</el-table-column>
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
import { StampAnnotationElement } from 'pdfjs-dist/types/src/display/annotation_layer';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectId: '',
	projectList: [],
	projectForm: {},
	projectCompany: [],
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
		state.projectCompany = projectCompanyRes.data
		//获取项目专家评审结果表
		state.tableData.param.projectId = state.projectId
		state.tableData.param.isGather = 2
		const projectReviewRes = await proxy.$api.erp.projectreview.getListByScope("gather", 0, 0, state.tableData.param);
		if (projectReviewRes.errcode != 0) {
			return;
		}
		state.tableData.data = []
		for (let val of projectCompanyRes.data) {
			let model = {}
			model.ProjectCompanyId = val.ProjectCompanyId
			model.CompanyName = val.CompanyName
			model.ReviewPrice = 0
			model.PriceScore = 0
			model.GatherScore = 0
			model.TechnicalScore = 0
			model.Extattr = val.Extattr
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

//保存推荐
const onSubmit = async (data: {}) => {
	ElMessageBox.confirm(`确定要推荐供应商吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			let model = {}
			model.Id = data.ProjectCompanyId
			model.Extattr = data.Extattr
			const res = await proxy.$api.erp.projectcompany.recommendationUpdate(data.ProjectCompanyId, model);
			if (res.errcode != 0) {
				return;
			}
			onGetTableData()
			ElMessage('推荐供应商成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('取消推荐供应商')
	});
};

//组长回退
const onReturn = async () => {
	ElMessageBox.confirm(`确定要回退重评吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectreview.gatherReturnSave(state.projectId);
			if (res.errcode != 0) {
				return;
			}
			onGetTableData()
			ElMessage('回退成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('回退汇总')
	});
};

//组长确认
const confirm = async () => {
	ElMessageBox.confirm(`确定完成评审吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectcompany.confirmUpdate(state.projectForm.Id);
			if (res.errcode != 0) {
				return;
			}
			onGetTableData()
			ElMessage('评审已完成')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('取消')
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
