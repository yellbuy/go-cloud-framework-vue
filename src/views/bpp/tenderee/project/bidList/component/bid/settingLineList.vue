<template>
	<div v-if="state.isShowPage">
		<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="请选择当前项目包号：">
					<el-select v-model="state.projectLineIndex" placeholder="请选择" @change="changeLine">
						<el-option
							v-if="state.projectForm.ProjectLineList && state.projectForm.ProjectLineList.length > 0"
							v-for="item in state.projectForm.ProjectLineList"
							:key="item.Id"
							:label="item.Name"
							:value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-tabs v-model="state.activeName" type="card" class="demo-tabs" @tab-change="tabsName">
			<el-tab-pane label="资格评审" name="zgps">
				<el-form :model="state.zgTableData.param" label-width="60px" :inline="true" style="margin-bottom: 10px;">
					<el-form-item>
						<el-button type="primary" @click="onSettingLineEditDialog()">创建</el-button>
						<el-button type="info" @click="onGetDefault()">恢复默认</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="state.zgTableData.data" v-loading="state.zgTableData.loading" :height="proxy.$calcMainHeight(-240)" style="width: 100%" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="State" label="评分方式" width="150" show-overflow-tooltip>
						<template #default="scope">
							<el-radio v-model="scope.row.State" disabled :value="0">通过</el-radio>
							<el-radio v-model="scope.row.State" disabled :value="1">不通过</el-radio>
						</template>
					</el-table-column>
					<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
						<template #default="scope">
							<el-button type="primary" @click="onSettingLineEditDialog(scope.row.Id)">编辑</el-button>
							<el-button type="danger" @click="onSettingLineDel(scope.row.Id, scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="技术评审" name="jsps">
				<el-form :model="state.jsTableData.param" label-width="60px" :inline="true" style="margin-bottom: 10px;">
					<el-form-item>
						<el-button type="primary" @click="onSettingLineEditDialog()">创建</el-button>
						<el-button type="info" @click="onGetDefault">恢复默认</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="state.jsTableData.data" style="width: 100%" v-loading="state.jsTableData.loading" :height="proxy.$calcMainHeight(-240)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
					<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
						<template #default="scope">
							<el-button type="primary" @click="onSettingLineEditDialog(scope.row.Id)">编辑</el-button>
							<el-button type="danger" @click="onSettingLineDel(scope.row.Id, scope.$index)">删除</el-button>
						</template>
					</el-table-column>
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
		<settingLineEdit ref="settingLineEditRef" />
	</div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
import { useRoute } from 'vue-router';
import settingLineEdit from './settingLineEdit.vue';
import { stat } from 'fs';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const route = useRoute();
const moduleKey = proxy.$parent.moduleKey;
const scopeMode = route.params.scopeMode || 0;
const scopeValue = route.params.scopeValue || 0;
const token = Session.get('token');
const settingLineEditRef = ref()
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});
const state = reactive({
	moduleKey,
	activeName:"zgps",
	isShowDialog: false,
	title: t('message.action.add'),
	loading: false,
	token: token,
	baseUrl: import.meta.env.VITE_API_URL,
	dialogImageUrl: [],
	dialogTitle: '',
	dialogVisible: false,
	isParameterReview: true,
	projectLineIndex: '',
	projectForm: {},
	settingForm: {},
	tableData:{
		data: [],
		loading: false,
		param: {
			mode: 1,
			current: 1,
			pageSize: 20,
			projectId: 0,
			categoryId: null,
			name: '',
		},
	},
	ruleForm: {
		Id: 0,
		Kind: '',
		Name: '',
		No: '',
		Sn: '',
		ProjectType: 1,
		RemoteState: 0,
		BidFee: 0,
		EnsureFee: 0,
		Location: '',
		Content: '',
		Files: '',
		AutoSwitchState: 0,
		StartTime: '', //报名开始时间
		EndTime: '', //报名结束时间
		BeginTime: '', //投标开始时间
		FinishTime: '', //投标结束时间
		ReviewTime: '', //评选时间
		BidOpenTime: '',
		ProjectLineList: [],
		ProjectSettingLineList: [],
	},
	zgTableData: {
		data: [],
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	jsTableData: {
		data: [],
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	jjForm: {
		Id: '0',
		Kind: 'jjps',
		PurchasePrice: 0, //采购控制价
		ScoreMode: 0, //价格得分模式
		PriceScore: 0, //价格得分减少
		PricePercentage: 50, //价格百分比
		QualificationScore: 0, //价格分数
		TechnicalScore: 0,
		TechnicalMaxScore: 0,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	SupplierIds: [],
	companyOption: [],
	methodList: [],
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	Files: [],
	homeBaseUrl: import.meta.env.VITE_URL as any,
	FilesList: [],
});

state.zgTableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

state.jsTableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	state.isShowPage = true
	onGetSettingLineTableData()
};

//	关闭页面
const closePage = async () => {
	try {
		getScore()
        const res = proxy.$api.erp.projectsettingline.save(state.jjForm);
        res.then(result => {
            if (result.errcode != 0) {
            return
            }
        })
    } finally {
    }
	state.projectForm = {}
	state.tableData.data = []
	state.zgTableData.data = []
	state.jsTableData.data = []
	state.jjForm = {}
	state.SupplierIds = []
	state.companyOption = []
	state.methodList = []
	state.Files = []
	state.FilesList = []
	state.isShowPage = false
}

//	打开评审参数编辑弹窗
const onSettingLineEditDialog = async (id: string) => {
	settingLineEditRef.value.openDialog(id, state.activeName)
};

const getScore = () => {
	if (state.jsTableData.data && state.jsTableData.data.length > 0) {
		state.jjForm.TechnicalScore = 0;
		for (let item of state.jsTableData.data) {
			state.jjForm.TechnicalScore += item.TechnicalMaxScore;
		}
		state.jjForm.TechnicalMaxScore = 100 - state.jjForm.TechnicalScore;
	}
};

//恢复默认模板参数
const onGetDefault = async () => {
	switch (state.activeName){
		case "zgps":
			try {
				const res = await proxy.$api.erp.projectsettingline.default(state.activeName, state.projectForm.Id);
				if (res.errcode != 0) {
					return;
				}
				onGetSettingLineTableData()
			} finally {
			}
			break;
		case "jsps":
			state.jsTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectsettingline.default(state.activeName, state.projectForm.Id);
				if (res.errcode != 0) {
					return;
				}
				onGetSettingLineTableData()
			} finally {
				state.jsTableData.loading = false;
			}
			break;
	}
};

//获取评审参数列表
const onGetSettingLineTableData = async () => {
	switch (state.activeName){
		case "zgps":
			state.zgTableData.loading = true;
			try {
				state.zgTableData.param.kind = state.activeName
				state.zgTableData.param.projectId = state.projectForm.Id
				const res = await proxy.$api.erp.projectsettingline.getListByScope(state.activeName, 0, 0, state.zgTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.zgTableData.data = res.data
			} finally {
				state.zgTableData.loading = false;
			}
			break;
		case "jsps":
			state.jsTableData.loading = true;
			try {
				state.jsTableData.param.kind = state.activeName
				state.jsTableData.param.projectId = state.projectForm.Id
				const res = await proxy.$api.erp.projectsettingline.getListByScope(state.activeName, 0, 0, state.jsTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.jsTableData.data = res.data
				getScore()
			} finally {
				state.jsTableData.loading = false;
			}
			break;
		case "jjps":
			try {
				state.jjForm.param.kind = state.activeName
				state.jjForm.param.projectId = state.projectForm.Id
				const res = await proxy.$api.erp.projectsettingline.getListByScope(state.activeName, 0, 0, state.jjForm.param);
				if (res.errcode != 0) {
					return;
				}
				state.jjForm.Id = res.data[0].Id
				state.jjForm.PricePercentage = res.data[0].PricePercentage
				state.jjForm.PriceScore = res.data[0].PriceScore
				state.jjForm.PurchasePrice = res.data[0].PurchasePrice
				state.jjForm.QualificationScore = res.data[0].QualificationScore
				state.jjForm.ScoreMode = res.data[0].ScoreMode
				state.jjForm.TechnicalMaxScore = res.data[0].TechnicalMaxScore
				state.jjForm.TechnicalScore = res.data[0].TechnicalScore
				getScore()
			} finally {
			}
			break;
	}
};

//获取评审参数模版列表
const onGetSettingTableData = async () => {
	ElMessageBox.confirm(`确定要恢复默认模板参数吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		switch (state.activeName){
		case "zgps":
			state.zgTableData.loading = true;
			try {
				state.zgTableData.data = []
				state.zgTableData.param.projectId = null
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.zgTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.zgTableData.data = res.data
			} finally {
				state.zgTableData.loading = false;
			}
			break;
		case "jsps":
			state.jsTableData.loading = true;
			try {
				state.jsTableData.data = []
				state.jsTableData.param.projectId = null
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.jsTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.jsTableData.data = res.data
				getScore()
			} finally {
				state.jsTableData.loading = false;
			}
			break;
		}
	});
};

//切换页面
const tabsName = () => {
	onGetSettingLineTableData();
};

const onSettingLineDel = (id: number, index: number) => {
	ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectsettingline.delete(id);
			if (res.errcode == 0) {
				if (state.activeName == 'zgps') {
					state.zgTableData.data.splice(index, 1);
				} else if (state.activeName == 'jsps') {
					state.jsTableData.data.splice(index, 1);
					getScore();
				}
			}
		} finally {
			return false;
		}
	});
};

// 页面加载时
onMounted(() => {

});

defineExpose({openPage, closePage, onGetSettingLineTableData})
</script>
