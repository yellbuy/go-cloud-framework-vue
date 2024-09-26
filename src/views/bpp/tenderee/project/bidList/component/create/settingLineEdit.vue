<template>
	<div>
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
					<el-button text bg type="info" @click="closeDialog">取消</el-button>
					<el-button type="primary" @click="onSubmit()">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state = reactive({
	isShowDialog: false,
	isAdd: false,
	title: t('message.action.add'),
	loading: false,
	index: 0,
	ruleForm: {},
});

const rules = reactive({
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Standard: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	TechnicalMaxScore: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});

// 打开弹窗
const openDialog = (row: object, kind: string, index: number) => {
	state.ruleForm = {};
	if (row) {
		state.index = index;
		state.isAdd = true;
		state.ruleForm = JSON.parse(JSON.stringify(row));
		state.title = t('message.action.edit');
	} else {
		state.ruleForm.Id = "0";
		state.ruleForm.Kind = kind
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

// 新增
const onSubmit = () => {
	if (state.isAdd && state.ruleForm.Kind == 'zgps') {
		proxy.$parent.zgTableData.data
	} 
	closeDialog()
	return state.ruleForm
};

// 页面加载时
onMounted(() => {});

defineExpose({openDialog, closeDialog, ...toRefs(state)})

</script>
