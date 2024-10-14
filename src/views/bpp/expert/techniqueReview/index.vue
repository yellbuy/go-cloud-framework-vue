<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<el-row>
					<el-col :span="18">
						<el-form-item label="投标方名称：">
							<el-select v-model="state.ruleForm" placeholder="请选择" @change="selectCompany">
								<el-option v-for="(item, index) in state.projectCompanyTableData.data" :key="index" :label="item.CompanyName" :value="item"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<div style="float: right;">
							<el-button type="primary" @click="onModelSave()">确认提交</el-button>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-table :data="state.projectReview.data" v-loading="state.projectReview.loading" style="width: 100%" size="small" border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="60" fixed />
							<el-table-column prop="QualificationScore" label="评分点" align="right" width="80" show-overflow-tooltip/>
							<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip/>
							<el-table-column prop="TechnicalMaxScore" label="最高分" align="right" width="120" show-overflow-tooltip/>
							<el-table-column label="评审" show-overflow-tooltip>
								<template #default="scope">
									<el-input-number v-model="scope.row.TechnicalScore" style="width: 100%" :precision="2" :step="1" :min="0" :max="scope.row.TechnicalMaxScore"/>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
				<el-row style="padding: 15px;">
					<el-col :span="24">
						<el-card>
							<el-collapse v-model="state.activeNames" @change="handleChange">
								<el-collapse-item title="商务文件：" name="1">
									<el-row v-for="(item, index) in state.swFile"  :key="index" :label="item.Name" :value="item">
										<el-col :span="24">
											<a>{{ item.Name }}</a>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="技术文件：" name="2">
									<el-row v-for="(item, index) in state.jsFile"  :key="index" :label="item.Name" :value="item">
										<el-col :span="24">
											<a>{{ item.Name }}</a>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其他文件：" name="3">
									<el-row v-for="(item, index) in state.qtFile"  :key="index" :label="item.Name" :value="item">
										<el-col :span="24">
											<a>{{ item.Name }}</a>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="12" >
				<div style=" float: center; font-size: 50px;">
					<h>PDF预览</h>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, computed, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	projectLineIndex:'',
	activeNames: '',
	swFile:[],
	jsFile:[],
	qtFile:[],
	projectCompanyTableData: {
		data: [],
		param: {
			kind: 'bid',
			current: 1,
			pageSize: 20,
		},
	},
	projectCompanyLineTableData: {
		data: [],
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	projectReview: {
		data: [],
		total: 0,
		loading: false,
		param: {
			kind: 'jsps',
			current: 1,
			pageSize: 20,
		},
	},
	ruleForm: {},
});

state.projectCompanyTableData.param.pageIndex = computed(() => {
	return state.projectCompanyTableData.param.current - 1;
});
state.projectReview.param.pageIndex = computed(() => {
	return state.projectReview.param.current - 1;
});

//获取投标方列表
const getProjectCompanyList = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.signUpList(state.projectCompanyTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyTableData.data = res.data;
	} finally {
	}
};

//获取文件列表
const getProjectCompanyLineList = async () => {
	try {
		state.projectCompanyLineTableData.param.projectId = state.ruleForm.ProjectId
		state.projectCompanyLineTableData.param.projectCompanyId = state.ruleForm.ProjectCompanyId
		const res = await proxy.$api.erp.projectcompanyline.getListByScope(state.projectCompanyLineTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.swFile = [];
		state.jsFile = [];
		state.qtFile = [];
		for (let item of res.data) {
			if (item.Kind == "zgps") {
				state.swFile.push(item)
			}
			if (item.Kind == "jjps") {
				state.jsFile.push(item)
			}
			if (item.Kind == "qt") {
				state.qtFile.push(item)
			}
		}
	} finally {
	}
};

//获取评标参数信息
const getProjectReviewTableData = async () => {
	state.projectReview.total = true
	try {
		state.projectReview.param.projectId = state.ruleForm.ProjectId
		state.projectReview.param.companyId = state.ruleForm.CompanyId
		const res = await proxy.$api.erp.projectreview.getListByScope("jsps", 0, 0, state.projectReview.param);
		//获取存储的项目数据
		if (res.errcode != 0) {
			return;
		}
		state.projectReview.data = res.data;
	} finally {
		state.projectReview.total = false
	}
};

const selectCompany = async () => {
	getProjectReviewTableData()
	getProjectCompanyLineList()
}

const onModelSave = async () => {
	ElMessageBox.confirm(`确定要提交评审参数吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectreview.expertSave("jsps", state.projectReview.data);
			if (res.errcode != 0) {
				return;
			}
			getProjectReviewTableData();
			getProjectCompanyLineList();
			ElMessage('评审参数提交成功')
		} finally {
		}
		return false;
	});
};

// 页面加载时
onMounted(() => {
	getProjectCompanyList()
});

</script>

<style scoped lang="scss">
</style>
