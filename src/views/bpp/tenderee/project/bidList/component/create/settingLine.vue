<template>
    <div v-if="state.isShowPage">
        <el-tabs v-model="state.activeName" type="card" class="demo-tabs" style="width: 100%;" @tab-change="state.activeName">
            <el-tab-pane label="资格评审" name="zgps">
                <el-form :model="state.zgTableData.param" label-width="60px" :inline="true" style="margin-bottom: 10px;">
                    <el-form-item>
                        <el-button type="primary" @click="onSettingLineDialog()">创建</el-button>
                        <el-button type="info" @click="onGetSettingTableData()">恢复默认</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="state.zgTableData.data" v-loading="state.zgTableData.loading" :height="proxy.$calcMainHeight(-240)" style="width: 100%" border stripe highlight-current-row>
                    <el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
                    <el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
                    <el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
                    <el-table-column prop="State" label="评分方式" width="120" show-overflow-tooltip>
                        <template #default="scope">
                            <div v-if="scope.row.State == 0" style="display: flex; align-items: center;">
                                <span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
                                <span >通过</span>
                            </div>
                            <div v-else-if="scope.row.State == 1" style="display: flex; align-items: center;">
                                <span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
                                <span>不通过</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
                        <template #default="scope">
                            <el-button type="primary" @click="onSettingLineDialog(scope.row, scope.$index)">编辑</el-button>
                            <el-button type="danger" @click="onDelSetting(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="技术评审" name="jsps">
                <el-form :model="state.jsTableData.param" label-width="60px" :inline="true" style="margin-bottom: 10px;">
                    <el-form-item>
                        <el-button type="primary" @click="onSettingLineDialog()">创建</el-button>
                        <el-button type="info" @click="onGetSettingTableData()">恢复默认</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="state.jsTableData.data" style="width: 100%" v-loading="state.jsTableData.loading" :height="proxy.$calcMainHeight(-240)" border stripe highlight-current-row>
                    <el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
                    <el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
                    <el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
                    <el-table-column prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
                    <el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
                        <template #default="scope">
                            <el-button type="primary" @click="onSettingLineDialog(scope.row, scope.$index)">编辑</el-button>
                            <el-button type="danger" @click="onDelSetting(scope.$index)">删除</el-button>
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
                                :precision="2"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
                        <el-form-item label="价格评审得分策略：">
                            <el-radio-group v-model="state.jjForm.ScoreMode">
                                <el-radio :label="0">价格排名打分</el-radio>
                                <el-radio :label="1">基础价格打分</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
                        <div class="mb20">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
                        <div class="mb20">
                            从第二名起，价格得分减少
                            <span>
                                <el-input-number
                                    v-model="state.jjForm.PriceScore"
                                    :min="0"
                                    :max="100"
                                    controls-position="right"/>
                            </span>
                            分。超出采购控制价的供应商得零分。
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
                        <div class="mb20">
                            价格评审最高分的
                            <span>
                                <el-input-number
                                    v-model="state.jjForm.PricePercentage"
                                    :min="0"
                                    :max="100"
                                    controls-position="right"/>
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
                                    controls-position="right"/>
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
        <el-dialog :title="state.title" v-model="state.isShowDialog" width="40%" :before-close="closeSettingDialog">
			<el-form ref="ruleFormRef" :model="state.settingTableData.form" :rules="rules" size="mini" label-width="130px" v-loading="state.settingTableData.loading">
				<el-form-item label="评审内容" prop="Content">
					<el-input v-model="state.settingTableData.form.Content"/>
				</el-form-item>
				<el-form-item label="评审标准" prop="Standard">
					<el-input v-model="state.settingTableData.form.Standard" type="textarea"/>
				</el-form-item>
				<el-form-item label="最高评分" v-if="state.settingTableData.form.Kind == 'jsps'" prop="TechnicalMaxScore">
					<el-input-number v-model="state.settingTableData.form.TechnicalMaxScore" :min="0" controls-position="right" :precision="1" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="danger" @click="closeSettingDialog()">取消</el-button>
					<el-button type="success" @click="submitSetting()">保存</el-button>
				</span>
			</template>
		</el-dialog>
    </div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import commonFunction from '/@/utils/commonFunction';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const moduleKey = proxy.$parent.moduleKey;
const state = reactive({
	moduleKey,
	isShowPage: false,
    isShowDialog: false,
    isAdd: false,
    activeName: 'zgps',
    title: t('message.action.add'),
	index: 0,
    zgTableData: {
		data: [],
		loading: false,
		param: {
			kind: 'zgps',
			pageIndex: 0,
			pageSize: 10000,
		},
	},
	jsTableData: {
		data: [],
		loading: false,
		param: {
			kind: 'jsps',
			pageIndex: 0,
			pageSize: 10000,
		},
	},
	jjForm: {
		Id: "0",
		Kind: "jjps",
		PurchasePrice: null,
		ScoreMode: null,
		PriceScore: null,
		PricePercentage: null,
		QualificationScore: null,
		TechnicalScore: null,
		TechnicalMaxScore: null,
	},
    settingTableData: {
		data: [],
		loading: false,
        form: {},
		param: {
			pageIndex: 0,
			pageSize: 10000,
		},
	},
    ruleForm: {
		ProjectSettingLineList: [],
	},
});

const rules = reactive({
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Standard: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	TechnicalMaxScore: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});

// 打开页面
const openPage = async () => {
	state.isShowPage = true
};

//  传出数据
const outData = async () => {
    if (state.zgTableData.data.length > 0) {
        for (let item of state.zgTableData.data) {
        item.Id = "0"
        item.Kind = 'zgps'
        state.ruleForm.ProjectSettingLineList.push(item)
        }
    }
    if (state.jsTableData.data.length > 0) {
        for (let item of state.jsTableData.data) {
        item.Id = "0"
        item.Kind = 'jsps'
        state.ruleForm.ProjectSettingLineList.push(item)
        }
    }
    if (state.jjForm.PurchasePrice) {
        state.ruleForm.ProjectSettingLineList.push(state.jjForm)
    }
    return state.ruleForm
}

// 关闭页面
const closePage = async () => {
    state.activeName = 'zgps'
    state.ruleForm = {ProjectSettingLineList: [],},
    state.settingTableData.data = []
    state.zgTableData.data = []
    state.jsTableData.date = []
    state.jjForm = {Id: "0", Kind: "jjps", PurchasePrice: null, ScoreMode: null, PriceScore: null, PricePercentage: null, QualificationScore: null, TechnicalScore: null, TechnicalMaxScore: null,},
    state.isShowPage = false
};

//获取评审参数模版列表
const onGetSettingTableData = async () => {
    switch (state.activeName) {
        case 'zgps':
            state.zgTableData.data = []
            state.settingTableData.param.kind = 'zgps'
            break
        case 'jsps':
            state.jsTableData.data = []
            state.settingTableData.param.kind = 'jsps'
            break
    }
	try {
		const res = await proxy.$api.erp.projectsetting.getListByScope(state.settingTableData.param);
		if (res.errcode != 0) {
			return;
		}
        state.settingTableData.data = res.data
        let settingLineForm = {}
        for (let item of res.data) {
            settingLineForm = {}
            settingLineForm.Id = "0"
            settingLineForm.Kind = item.Kind
            settingLineForm.State = 0
            settingLineForm.ProjectSettingId = item.Id
            settingLineForm.Content = item.Content
            settingLineForm.Standard = item.Standard
            settingLineForm.TechnicalMaxScore = item.TechnicalMaxScore
            switch (item.Kind) {
            case 'zgps':
                state.zgTableData.data.push(settingLineForm)
                break
            case 'jsps':
                state.jsTableData.data.push(settingLineForm)
                break
            }
            getScore()
        }
	} finally {
	}
};

//	删除评审参数
const onDelSetting = (index: number) => {
	ElMessageBox.confirm(`确定要删除此参数吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
        switch (state.activeName) {
		case 'zgps':
			state.zgTableData.data.splice(index, 1);
			break
		case 'jsps':
			state.jsTableData.data.splice(index, 1);
			break
        }
        getScore()
	});
};

// 打开评审参数编辑弹窗
const onSettingLineDialog = (row: object, index: number) => {
	if (row) {
		state.index = index;
        state.isAdd = false;
		state.settingTableData.form = JSON.parse(JSON.stringify(row));
		state.title = t('message.action.edit');
	} else {
        state.isAdd = true;
		state.settingTableData.form.Id = "0";
		state.settingTableData.form.Kind = state.activeName
		state.title = t('message.action.add');
	}
	state.isShowDialog = true;
};

//	关闭评审参数编辑弹窗
const closeSettingDialog = () => {
	state.settingTableData.form = {};
	state.index = 0
	state.loading = false;
	state.isShowDialog = false;
    proxy.$refs.ruleFormRef.clearValidate();
};

//	确定评审参数
const submitSetting = () => {
    if (state.isAdd) {
        switch (state.activeName) {
            case 'zgps':
                state.zgTableData.data.push(state.settingTableData.form)
                break
            case 'jsps':
                state.jsTableData.data.push(state.settingTableData.form)
                break
        }
    } else {
        switch (state.activeName) {
            case 'zgps':
                state.zgTableData.data[state.index] = state.settingTableData.form
                break
            case 'jsps':
                state.jsTableData.data[state.index] = state.settingTableData.form
                break
        }
    }
	getScore()
    closeSettingDialog()
};

//	计算得分
const getScore = () => {
	if (state.jsTableData.data && state.jsTableData.data.length > 0) {
		state.jjForm.TechnicalScore = 0;
		for (let item of state.jsTableData.data) {
			state.jjForm.TechnicalScore += item.TechnicalMaxScore;
		}
		state.jjForm.TechnicalMaxScore = 100 - state.jjForm.TechnicalScore;
	}
};

// 页面加载时
onMounted(() => {});

defineExpose({openPage, closePage, outData, ...toRefs(state)})
</script>