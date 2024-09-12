<template>
	<div class="system-edit-user-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="40%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" size="mini" label-width="130px" v-loading="state.loading">
				<!-- <el-form-item label="评审项" prop="Name">
					<el-input v-model="state.ruleForm.Name"/>
				</el-form-item> -->
				<el-form-item label="评审内容" prop="Content">
					<el-input v-model="state.ruleForm.Content"/>
				</el-form-item>
				<el-form-item label="评审标准" prop="Standard">
					<el-input v-model="state.ruleForm.Standard" type="textarea"/>
				</el-form-item>
				
				
				<!-- <el-form-item label="评审结果" v-if="ruleForm.Kind == 'zgps'" prop="TechnicalMaxScore">
					<el-switch
							v-model="state.ruleForm.State"
							inline-prompt
							active-text="通过"
							inactive-text="不通过"
							:active-value="1"
							:inactive-value="0"
						/>
				</el-form-item>				 -->
				<el-form-item label="最高评分" v-if="state.ruleForm.Kind == 'jsps'" prop="TechnicalMaxScore">
					<el-input-number v-model="state.ruleForm.TechnicalMaxScore" :min="0" controls-position="right" :precision="1" />
				</el-form-item>
				<!-- <el-form-item label="排序：" prop="Order">
					<el-input-number v-model="state.ruleForm.Order" :min="0" :max="10000000" controls-position="right" :precision="0" /> 
				</el-form-item> -->
				<el-form-item label="备注" prop="Remark">
					<el-input v-model="state.ruleForm.Remark" type="textarea"/>
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

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const state = reactive({
	isShowDialog: false,
	title: t('message.action.add'),
	loading: false,
	ruleForm: {},
});

const rules = reactive({
	Name: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Standard: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	TechnicalMaxScore: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});

// 打开弹窗
const openDialog = (Type: string, id: string) => {
	if (id != '0') {
		getRowById(id);
		state.title = t('message.action.edit');
	} else {
		state.ruleForm.Id = 0;
		state.ruleForm.Order=100;
		state.title = t('message.action.add');
	}
	state.ruleForm.Kind = Type;
	state.isShowDialog = true;
};

// 获取审核参数详细信息
const getRowById = async (Id: string) => {
	try {
		const res = await proxy.$api.erp.projectsetting.getById(Id);
		if (res.errcode != 0) {
			state.isShowDialog = false;
			return;
		}
		state.ruleForm = res.data;
	} finally {
		state.isShowDialog = true;
	}
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
	proxy.$refs.ruleFormRef.validate(async (valid: any) => {
		if (valid) {
			try {
				state.ruleForm.Id = state.ruleForm.Id.toString();
				const res = await proxy.$api.erp.projectsetting.save(state.ruleForm);
				if (res.errcode != 0) {
					return
				}
				closeDialog();
				proxy.$parent.onGetZgTableData();
			} finally {
				state.loading = false;
			}
			return false;
		} else {
			return false;
		}
	});
};

// 页面加载时
onMounted(() => {});

defineExpose({openDialog})

</script>
