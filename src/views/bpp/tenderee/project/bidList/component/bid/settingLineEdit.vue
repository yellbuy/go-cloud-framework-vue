<template>
    <el-dialog :title="state.title" v-model="state.isShowDialog" width="40%" :before-close="closeDialog">
        <el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" size="mini" label-width="130px" v-loading="state.loading">
            <el-form-item label="评审内容" prop="Content">
                <el-input v-model="state.ruleForm.Content"/>
            </el-form-item>
            <el-form-item label="评审标准" prop="Standard">
                <el-input v-model="state.ruleForm.Standard" type="textarea"/>
            </el-form-item>
            <el-form-item label="最高评分" v-if="state.ruleForm.Kind == 'jsps'" prop="TechnicalMaxScore">
                <el-input-number v-model="state.ruleForm.TechnicalMaxScore" :min="0" controls-position="right" :precision="1" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="closeSettingDialog()">取消</el-button>
                <el-button type="success" @click="submit()">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const moduleKey = proxy.$parent.moduleKey;
const state = reactive({
    project: store.state.project.project,
	moduleKey,
    isShowDialog: false,
    loading: false,
    title: t('message.action.add'),
    ruleForm: {},
});

const rules = reactive({
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Standard: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	TechnicalMaxScore: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});

// 打开弹窗
const openDialog = (id: string, kind: string, ) => {
    state.loading = false
	if (id && id != '0') {
		getRowById(id);
		state.title = t('message.action.edit');
	} else {
        state.ruleForm.Id = '0';
        state.ruleForm.Kind = kind;
		state.ruleForm.State = 0
        state.ruleForm.ProjectId = state.project.Id
		state.title = t('message.action.add');
	}
	
	state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
	state.loading = false;
	state.ruleForm = {};
	proxy.$refs.ruleFormRef.clearValidate();
};

//获取参数详情
const getRowById = async (id: string) => {
	try {
		const res = await proxy.$api.erp.projectsettingline.getById(id);
		if (res.errcode != 0) {
			return;
		}
        state.ruleForm = res.data
	} finally {
	}
};

//	确定评审参数
const submit = () => {
    try {
        const res = proxy.$api.erp.projectsettingline.save(state.ruleForm);
        res.then(result => {
            if (result.errcode != 0) {
            return
            }
            if (state.ruleForm.Id == '0') {
                ElMessage('评审参数创建成功')
            } else {
                ElMessage('评审参数修改成功')
            }
            proxy.$parent.onGetSettingLineTableData()
            closeDialog()
        })
    } finally {
    }
};

// 页面加载时
onMounted(() => {});

defineExpose({openDialog, closeDialog, ...toRefs(state)})
</script>