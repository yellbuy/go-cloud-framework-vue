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
		<el-tabs v-model="state.activeName" type="card" class="demo-tabs" @tab-change="onGetTableData" v-if="state.projectId > 0">
			<el-tab-pane label="资格评审" name="zgps">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" :height="proxy.$calcMainHeight(-170)" style="width: 100%" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="State" label="评分方式" width="150" show-overflow-tooltip>
						<template #default="scope">
							<el-radio v-model="scope.row.State" disabled :value="0">通过</el-radio>
							<el-radio v-model="scope.row.State" disabled :value="1">不通过</el-radio>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="技术评审" name="jsps">
				<el-table :data="state.tableData.data" style="width: 100%" v-loading="state.tableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed/>
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="TechnicalMaxScore" label="最高评分" width="150" show-overflow-tooltip />
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="经济评审" name="jjps">
				<el-form ref="jjFormRef" :model="state.tableData.form" size="small">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="采购控制价：" prop="PurchasePrice">{{ state.tableData.form.PurchasePrice }}</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="价格评审得分策略：">
								<el-radio-group v-model="state.tableData.form.ScoreMode" :disabled="state.state ? false : true">
									<el-radio :label="0" disabled>价格排名打分</el-radio>
									<el-radio :label="1" disabled>基础价格打分</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="state.tableData.form.ScoreMode == 0">
							<div class="mb20">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
							<div class="mb20">
								从第二名起，价格得分减少
								<span>{{ state.tableData.form.PriceScore }}</span>
								分。超出采购控制价的供应商得零分。
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="state.tableData.form.ScoreMode == 1">
							<div class="mb20">
								价格评审最高分的
								<span>{{ state.tableData.form.PricePercentage }}</span>
								%为基础价格得分;
							</div>
							<div class="mb20">
								评审报价比招标控制价每下浮1个百分点，则得分增加
								<span>{{ state.tableData.form.QualificationScore }}</span>
								分;
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :offset="1" class="mb20">
							<div class="mb20">本项目技术评审最高分：{{ state.tableData.form.TechnicalScore }}分，最终评审价格最高分：{{ state.tableData.form.TechnicalMaxScore }} 分。</div>
							<div class="mb20">如需修改请返回调整技术评审各得分项。</div>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';


const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const token = Session.get('token');
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});
const state = reactive({
	projectList: [],
	projectForm: {},
	activeName:"zgps",
	state: true,
	tableData:{
		data: [],
		form: {},
		loading: false,
		param: {
			current: 1,
			pageSize: 1000,
		},
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

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

//获取评审参数列表
const onGetTableData = async () => {
	state.tableData.loading = true;
	try {
		state.tableData.param.projectId = state.projectForm.Id
		const res = await proxy.$api.erp.projectsettingline.getListByScope(state.activeName, 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data
		if (state.activeName == "jjps") {
			state.tableData.form = res.data[0]
		}
	} finally {
		state.tableData.loading = false;
	}
};

// 页面加载时
onMounted(() => {
	onGetProjectTableData();
});

</script>
