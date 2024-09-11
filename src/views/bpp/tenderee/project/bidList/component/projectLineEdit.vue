<template>
	<div>
		<el-dialog v-model="state.isShowDialog" title="品目信息" :destroy-on-close="true"  width="40%">
			<el-divider content-position="left">品目信息</el-divider>
			<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" size="small" label-width="130px" v-loading="state.loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="品目号：" prop="No">
							<el-input v-model="state.ruleForm.No" placeholder="品目号"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="物资编码：" prop="Sn">
							<el-input v-model="state.ruleForm.Sn" placeholder="包号"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="名称：" prop="Name">
							<el-input v-model="state.ruleForm.Name" placeholder="名称"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="备注：" prop="Remark">
							<el-input v-model="state.ruleForm.Remark" placeholder="备注"/>
							</el-form-item>
						</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="数量：" prop="Qty">
							<el-input-number v-model="state.ruleForm.Qty" :min="0" controls-position="right" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit">{{ $t('message.action.save') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, defineProps, defineEmits, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox } from 'element-plus';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const emit = defineEmits(['submitProjectLine']);
const props = defineProps({
	parentData: []
});
const state = reactive({
	isShowDialog: false,
	title: t('message.action.add'),
	loading: false,
	isadd: false,
	index: 0,
	ruleForm: {},
});
const rules = reactive({
	Sn: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	No: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Name: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Qty: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});

// 打开弹窗
const openDialog = (item: object, isAdd: boolean, index: number, kind: string) => {
	state.isadd = isAdd;
	if (state.isadd) {
		state.ruleForm.Id = '0';
		state.title = t('message.action.add');
	} else {
		state.index = index;
		state.ruleForm = JSON.parse(JSON.stringify(item));
		state.title = t('message.action.edit');
	}
	state.ruleForm.Kind = kind;
	state.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	state.loading = false;
	state.isShowDialog = false;
};

// 新增
const onSubmit = () => {
	proxy.$refs.ruleFormRef.validate((valid: any) => {
		if (valid) {
			let item = JSON.parse(JSON.stringify(state.ruleForm));
			if (state.isadd) {
				props.parentData.push(item)
			} else {
				props.parentData[state.index] = item;
			}
			emit('submitProjectLine', props.parentData);
			closeDialog();
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
