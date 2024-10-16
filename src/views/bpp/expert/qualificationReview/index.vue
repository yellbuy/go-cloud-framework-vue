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
							<el-select v-model="state.ruleForm" placeholder="请选择" @change="selectCompany()">
								<el-option v-for="(item, index) in state.projectCompanyList" :key="index" :label="item.CompanyName" :value="item"/>
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
						<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" fixed />
							<el-table-column prop="Content" label="评审内容" width="200" show-overflow-tooltip/>
							<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip/>
							<el-table-column label="评审" width="70" show-overflow-tooltip>
								<template #default="scope">
									<el-switch
										v-model="scope.row.ReviewState"
										inline-prompt
										:width="55"
										@change=""
										:active-text="'通过'"
										:inactive-text="'不通过'"
										:active-value="1"
										:inactive-value="0"/>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
				<el-row style="padding: 15px;">
					<el-col :span="24">
						<el-card>
							<el-collapse v-model="state.activeName" @change="handleChange">
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
	activeName: '',
	projectCompanyList: [],
	swFile:[],
	jsFile:[],
	qtFile:[],
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	ruleForm: {},
});

// interface Tree {
//   label: string
//   children?: Tree[]
// }

// const computedData = computed(() => {
// 	const data: Tree[] = [
// 		{
// 			label: '商务文件：',
// 			children: state.swFile.map(item => ({ label: item })),
// 		},
// 		{
// 			label: '技术文件：',
// 			children: state.jsFile.map(item => ({ label: item })),
// 		},
// 		{
// 			label: '其他文件：',
// 			children: state.qtFile.map(item => ({ label: item })),
// 		},
// 	]
// 	return data
// });

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//获取投标方列表
const onGetProjectCompanyList = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.signUpList({kind: 'bid', pageIndex: 0, pageSize: 20,});
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyList = res.data;
	} finally {
	}
};

//获取评标参数信息
const onGetTableData = async () => {
	state.tableData.total = true
	try {
		//获取项目评审参数表
		state.tableData.param.projectId = state.ruleForm.ProjectId
		const projectSettingLineRes = await proxy.$api.erp.projectsettingline.getListByScope("zgps", 0, 0, state.tableData.param);
		if (projectSettingLineRes.errcode != 0) {
			return;
		}
		state.tableData.data = projectSettingLineRes.data
		//获取项目专家评审结果表
		state.tableData.param.companyId = state.ruleForm.CompanyId
		const projectReviewRes = await proxy.$api.erp.projectreview.getListByScope("zgps", 0, 0, state.tableData.param);
		if (projectReviewRes.errcode != 0) {
			return;
		}
		state.tableData.param.companyId = null
		for (let i = 0; i < projectSettingLineRes.data.length; i++) {
			state.tableData.data[i].ProjectSettingLineId = state.tableData.data[i].Id
			state.tableData.data[i].CompanyId = state.ruleForm.CompanyId
			for (let j = 0; j < projectReviewRes.data.length; j++) {
				if (projectSettingLineRes.data[i].Id == projectReviewRes.data[j].ProjectSettingLineId) {
					state.tableData.data[i].ProjectSettingLineId = projectReviewRes.data[j].ProjectSettingLineId
					state.tableData.data[i].CompanyId = projectReviewRes.data[j].CompanyId
					state.tableData.data[i].ReviewState = projectReviewRes.data[j].ReviewState
					state.tableData.data[i].Id = projectReviewRes.data[j].Id
				} 
			}
		}
		//获取项目报名文件表
		state.tableData.param.projectCompanyId = state.ruleForm.ProjectCompanyId
		const projectCompanyLineRes = await proxy.$api.erp.projectcompanyline.getListByScope(state.tableData.param);
		state.tableData.param.projectCompanyId = null
		if (projectCompanyLineRes.errcode != 0) {
			return;
		}
		state.swFile = []
		state.jsFile = []
		state.qtFile = []
		for (let item of projectCompanyLineRes.data) {
			if (item.Kind == "zgps") {
				state.swFile.push(item)
			}
			if (item.Kind == "jsps") {
				state.jsFile.push(item)
			}
			if (item.Kind == "qt") {
				state.qtFile.push(item)
			}
		}
	} finally {
		state.tableData.total = false
	}
};

const selectCompany = async () => {
	onGetTableData()
}

const onModelSave = async () => {
	ElMessageBox.confirm(`确定要提交评审参数吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectreview.expertSave("zgps", state.tableData.data);
			if (res.errcode != 0) {
				return;
			}
			onGetTableData()
			ElMessage('评审参数提交成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		onGetTableData()
		ElMessage('取消提交')
	});
};

// 页面加载时
onMounted(() => {
	onGetProjectCompanyList()
});

</script>

<style scoped lang="scss">
</style>
