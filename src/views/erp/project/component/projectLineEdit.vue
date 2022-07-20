<template>
	<div class="system-edit-user-container">
		<el-dialog v-model="isShowDialog" title="品目信息" width="80%">
			<el-divider content-position="left">品目信息</el-divider>
			<el-form ref="categoryFormRef" :model="tableItem" :rules="rules" size="mini" label-width="130px" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="包号：" prop="Sn"> <el-input v-model="tableItem.Sn" placeholder="包号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="品目号：" prop="No"> <el-input v-model="tableItem.No" placeholder="品目号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="名称：" prop="Name"> <el-input v-model="tableItem.Name" placeholder="名称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="备注：" prop="Remark"> <el-input v-model="tableItem.Remark" placeholder="备注"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="数量：" prop="Qty"><el-input-number v-model="tableItem.Qty" :min="0" controls-position="right" /> </el-form-item
					></el-col>
				</el-row>
			</el-form>
			<el-divider content-position="left">资格评审</el-divider>
			<el-form size="mini" label-width="90px" :inline="true">
				<el-form-item>
					<el-button size="mini" type="primary" @click="onOpenItemDialog('zgps', true)">
						<el-icon>
							<CirclePlusFilled />
						</el-icon>
						{{ $t('message.action.add') }}
					</el-button>
					<el-button size="mini" @click="onOpenItemDialog()">
						<el-icon><Edit /></el-icon>
						获取
					</el-button>
				</el-form-item>
				<el-form-item></el-form-item>
			</el-form>
			<el-table :data="zgTableData.data" v-loading="zgTableData.loading" style="width: 100%" size="mini" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
				<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenItemDialog('zgps', false, scope.row)" v-auth:[$parent.moduleKey]="'btn.SettingLineEdit'">
							<el-icon>
								<Edit />
							</el-icon>
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row, scope.$index)" v-auth:[$parent.moduleKey]="'btn.SettingLineDel'">
							<el-icon>
								<CloseBold />
							</el-icon>
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-divider content-position="left">技术评审</el-divider>
			<el-form size="mini" label-width="90px" :inline="true">
				<el-form-item>
					<el-button size="mini" type="primary" @click="onOpenItemDialog('jsps', true)">
						<el-icon>
							<Plus />
						</el-icon>
						{{ $t('message.action.add') }}
					</el-button>
					<el-button size="mini" @click="onOpenItemDialog()">
						<el-icon><Edit /></el-icon>
						获取
					</el-button>
				</el-form-item>
				<el-form-item></el-form-item>
			</el-form>
			<el-table :data="jsTableData.data" v-loading="jsTableData.loading" style="width: 100%" size="mini" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
				<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
				<el-table-column prop="TechnicalMaxScore" label="最高分数" show-overflow-tooltip />
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenItemDialog('zgps', false, scope.row)" v-auth:[$parent.moduleKey]="'btn.SettingLineEdit'">
							<el-icon>
								<Edit />
							</el-icon>
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row, scope.$index)" v-auth:[$parent.moduleKey]="'btn.SettingLineDel'">
							<el-icon>
								<CloseBold />
							</el-icon>
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-divider content-position="left">经济评审</el-divider>
			<!-- <el-form ref="categoryFormRef" :model="tableItem" :rules="categoryrules" size="mini" label-width="130px" v-loading="loading">
				<el-form-item label="Resources">
					<el-radio-group v-model="form.resource">
						<el-radio label="Sponsor"></el-radio>
						<el-radio label="Venue"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="数量：" prop="Qty"><el-input-number v-model="tableItem.Qty" :min="0" controls-position="right" /> </el-form-item>
			</el-form> -->
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="ProjectLineClose">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="ProjectLineSave">{{ $t('message.action.save') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<editItemDlg ref="editItemDlgRef" />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import editItemDlg from './templateEdit.vue';

import { ElMessageBox, ElMessage } from 'element-plus';
export default {
	name: 'projectLineEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const editItemDlgRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			tableItem: {
				Id: '0',
				Name: '',
				Kind: 'project_category',
				No: '',
				Sn: '',
				Remark: '',
				Qty: 0,
			},
			editState: false,
			saveState: false,
			zgTableData: {
				data: [],
				loading: false,
			},
			jsTableData: {
				data: [],
				loading: false,
			},
		});
		const rules = reactive({
			Sn: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			No: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],

			Qty: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		// 打开弹窗
		const openDialog = (item: object) => {
			console.log('打开');
			if (item) {
				state.editState = true;
				state.ruleForm = JSON.parse(JSON.stringify(item));
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.editState = false;
				state.title = t('message.action.add');
			}
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.clearValidate();
			state.loading = false;
			state.isShowDialog = false;
		};
		// 新增
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				if (valid) {
					console.log(state.ruleForm);
					// if (state.ruleForm.Kind == 'zgps') {
					// 	if (!state.editState) {
					// 		proxy.$parent.zgTableData.data.push(state.ruleForm);
					// 	}
					// } else if (state.ruleForm.Kind == 'jsps') {
					// 	if (!state.editState) {
					// 		proxy.$parent.jsTableData.data.push(state.ruleForm);
					// 	}
					// }
					closeDialog();
					return false;
				} else {
					return false;
				}
			});
		};
		const onOpenItemDialog = (kind: string, isAdd: boolean, item: object) => {
			// let model = {};
			// if (item) {
			// 	model = JSON.parse(JSON.stringify(item));
			// }
			editItemDlgRef.value.openDialog(kind, isAdd, item);
		};
		const ProjectLineClose = () => {
			proxy.$refs.categoryFormRef.clearValidate();
			state.isShowDialog = false;
		};
		//弹窗保存按钮
		const ProjectLineSave = () => {
			proxy.$refs.categoryFormRef.validate((valid: any) => {
				console.log('是否符合规则', valid);
				if (valid) {
					if (state.saveState) {
						if (!Array.isArray(tableData.data)) {
							tableData.data = [];
						}
						tableData.data.push(state.tableItem);
					}
					state.isShowDialog = false;
				}
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			rules,
			editItemDlgRef,
			onOpenItemDialog,
			ProjectLineSave,
			ProjectLineClose,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		editItemDlg,
	},
};
</script>
