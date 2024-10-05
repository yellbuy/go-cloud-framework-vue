<template>
	<el-card>
		<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="请选择当前项目包号：">
					<el-select v-model="state.projectLineIndex" placeholder="请选择" @change="changeLine">
						<el-option
							v-if="state.project.ProjectLineList && state.project.ProjectLineList.length > 0"
							v-for="item in state.project.ProjectLineList"
							:key="item.Id"
							:label="item.Name"
							:value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
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
		<el-tabs v-model="state.activeName" type="card" class="demo-tabs" @tab-change="onGetTableData">
			<el-tab-pane label="资格评审" name="zgps">
				<el-table :data="state.zgList" v-loading="state.tableData.loading" :height="proxy.$calcMainHeight(-170)" style="width: 100%" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="State" label="评分方式" width="120" show-overflow-tooltip>
						<template #default="scope">
							<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
								<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span >通过</span>
							</div>
							<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
								<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span>不通过</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="技术评审" name="jsps">
				<el-table :data="state.jsList" style="width: 100%" v-loading="state.tableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="经济评审" name="jjps">
				<el-form ref="jjFormRef" :model="state.jjForm" size="small">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="采购控制价：" prop="PurchasePrice">
								<el-input-number
									v-model="state.jjForm.PurchasePrice"
									:min="0"
									controls-position="right"
									:precision="2"
									@change="saveJjps"
									:disabled="state.state ? false : true"/>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="价格评审得分策略：">
								<el-radio-group v-model="state.jjForm.ScoreMode" @change="saveJjps" :disabled="state.state ? false : true">
									<el-radio :label="0">价格排名打分</el-radio>
									<el-radio :label="1">基础价格打分</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="state.jjForm.ScoreMode == 0">
							<div class="mb20">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
							<div class="mb20">
								从第二名起，价格得分减少
								<span>
									<el-input-number
										v-model="state.jjForm.PriceScore"
										:min="0"
										:max="100"
										controls-position="right"
										@change="saveJjps"
										:disabled="state.state ? false : true"/>
								</span>
								分。超出采购控制价的供应商得零分。
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="state.jjForm.ScoreMode == 1">
							<div class="mb20">
								价格评审最高分的
								<span>
									<el-input-number
										v-model="state.jjForm.PricePercentage"
										:min="0"
										:max="100"
										controls-position="right"
										@change="saveJjps"
										:disabled="state.state ? false : true"/>
								</span>
								%为基础价格得分;
							</div>
							<div class="mb20">
								评审报价比招标控制价每下浮1个百分点，则得分增加
								<span>
									<el-input-number
										v-model="state.jjForm.QualificationScore"
										:min="0"
										:max="100"
										controls-position="right"
										@change="saveJjps"
										:disabled="state.state ? false : true"/>
								</span>
								分;
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :offset="1" class="mb20">
							<div class="mb20">本项目技术评审最高分：{{ state.jjForm.TechnicalScore }}分，最终评审价格最高分：{{ state.jjForm.TechnicalMaxScore }} 分。</div>
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
const moduleKey = proxy.$parent.moduleKey;
const store = useStore();
const token = Session.get('token');
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});
const state = reactive({
	project: store.state.project.project,
	moduleKey,
	projectLineIndex: '',
	activeName:"zgps",
	isShowDialog: false,
	token: token,
	baseUrl: import.meta.env.VITE_API_URL,
	tableData:{
		data: [],
		loading: false,
		param: {
			current: 1,
			pageSize: 1000,
		},
	},
	zgList: [],
	jsList: [],
	jjForm: {},
	companyOption: [],
});

//获取评审参数列表
const onGetTableData = async () => {
	state.zgList = []
	state.jsList = []
	state.jjForm = {}
	state.tableData.loading = true;
	try {
		state.tableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectsettingline.getListByScope(state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		for (let item of res.data) {
			switch (item.Kind) {
			case 'zgps':
				state.zgList.push(item)
				break
			case 'jsps':
				state.jsList.push(item)
				break
			case 'jjps':
				state.jjForm = item
				break
			}
		}
	} finally {
		state.tableData.loading = false;
	}
};

// 页面加载时
onMounted(() => {
	onGetTableData();
});

</script>
