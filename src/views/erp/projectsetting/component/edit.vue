<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-divider content-position="left">类别信息</el-divider>
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" v-loading="loading" :disabled="disable">
				<el-form-item label="类别" prop="CategoryId">
					<el-select v-model="ruleForm.CategoryId" class="m-2" placeholder="请选择类别" clearable>
						<el-option v-for="item in supKindData" :key="item.Id" :label="item.Name" :value="item.Id"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="名称" prop="Name">
					<el-input placeholder="请输入名称" v-model="ruleForm.Name"> </el-input>
				</el-form-item>
			</el-form>
			<!-- <div v-if="disable"> -->
			<el-divider content-position="left">详情信息</el-divider>
			<el-button type="primary" @click="onModelAdd">
				<el-icon>
					<CirclePlusFilled />
				</el-icon>
				&#8197;{{ $t('message.action.add') }}
			</el-button>
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
				<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
				<el-table-column prop="TechnicalMaxScore" label="最高分数" v-if="ruleForm.Kind != 'zgps'" show-overflow-tooltip />
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onModelEdit(scope.row)" v-auth:[$parent.moduleKey]="'btn.SettingLineEdit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row, scope.$index)" v-auth:[$parent.moduleKey]="'btn.SettingLineDel'">
							<el-icon>
								<CloseBold />
							</el-icon>
							&#8197;{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.SettingEdit', 'btn.SettingAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
			<el-dialog v-model="dialogVisible" title="明细信息" width="50%">
				<el-form ref="lineFormRef" :model="tableItem" :rules="lineRules" label-width="130px" v-loading="loading">
					<el-form-item label="评审内容" prop="Content">
						<el-input v-model="tableItem.Content"></el-input>
					</el-form-item>
					<el-form-item label="评审标准" prop="Standard">
						<el-input v-model="tableItem.Standard" type="textarea"></el-input>
					</el-form-item>
					<el-form-item label="最高评分" v-if="ruleForm.Kind != 'zgps'" prop="TechnicalMaxScore">
						<el-input-number v-model="tableItem.TechnicalMaxScore" :min="0" controls-position="right" :precision="1" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="LineClose" size="small">{{ $t('message.action.cancel') }}</el-button>
						<el-button type="primary" @click="LineSave" size="small">{{ $t('message.action.save') }}</el-button>
					</span>
				</template>
			</el-dialog>
			<!-- </div> -->
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage } from 'element-plus';
export default {
	name: 'Edit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: 0,
				Kind: 'zgps',
				Name: '',
				CategoryId: '',
				ProjectId: '0',
				LineList: [],
			},
			supKindData: [],
			tableItem: {
				Id: '0',
				Kind: 'zgps',
				Content: '',
				Standard: '',
				TechnicalMaxScore: 0,
			},
			saveState: true,
			dialogVisible: false, //是否打开明细弹窗
			disable: false, //是否隐藏
		});
		//明细表格
		const tableData = reactive({
			data: [],
			loading: false,
			param: {
				pageNum: 1,
				pageSize: 10000,
			},
		});
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			CategoryId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'change',
				},
			],
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		const lineRules = reactive({
			Content: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Standard: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			TechnicalMaxScore: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		// 打开弹窗
		const openDialog = (Type: string, id: string, disable: boolean) => {
			state.supKindData = proxy.$parent.supKindData;
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			console.log('状态', disable);
			state.ruleForm.Kind = Type;
			state.isShowDialog = true;
			state.disable = disable;
		};
		const GetByIdRow = (Id: string) => {
			const url = `/v1/erp/projectsetting/${Id}`;
			request({
				url: url,
				method: 'get',
			})
				.then((res) => {
					if (res.errcode == 0) {
						state.ruleForm = res.data;
						tableData.data = res.data.LineList;
					} else {
						ElMessage.warning(res.errmsg);
					}
				})
				.catch((err) => {});
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.ruleForm = {
				Id: 0,
				Kind: 'zgps',
				Name: '',
				CategoryId: '',
				ProjectId: '0',
				LineList: [],
			};
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			state.ruleForm.CategoryId = '';
			onLoadTable();
		};
		//弹窗取消
		const LineClose = () => {
			proxy.$refs.lineFormRef.clearValidate();
			state.tableItem = { Id: '0', Kind: 'zgps', Content: '', Standard: '', TechnicalMaxScore: 0 };
			state.dialogVisible = false;
		};
		//表格删除按钮
		const onModelDel = (item: Object, index: number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					if (item.Id != '0') {
						tableData.loading = true;
						const url = `v1/erp/projectsettingline/delete/${item.Id}`;
						request({
							url: url,
							method: 'post',
						})
							.then((res) => {
								tableData.loading = false;
								if (res.errcode == 0) {
									ElMessage.success('操作成功！');
									tableData.data.splice(index, 1);
								} else {
									ElMessage.warning(res.errmsg);
								}
							})
							.catch((err) => {
								tableData.loading = false;
							});
						return false;
					} else {
						ElMessage.success('操作成功！');
						tableData.data.splice(index, 1);
					}
				})
				.catch((err) => {});
		};
		//表格新增按钮
		const onModelAdd = () => {
			state.dialogVisible = true;
			state.saveState = true;
		};
		//修改按钮
		const onModelEdit = (item: object) => {
			state.tableItem = item;
			state.saveState = false;
			state.dialogVisible = true;
		};
		const LineSave = () => {
			proxy.$refs.lineFormRef.validate((valid: any) => {
				console.log('是否符合规则', valid);
				if (valid) {
					if (state.saveState) {
						//确定按钮
						if (!Array.isArray(tableData.data)) {
							tableData.data = [];
						}
						tableData.data.push(state.tableItem);
					}
					state.dialogVisible = false;
				}
			});
		};
		const onLoadTable = () => {
			if (state.ruleForm.Kind == 'zgps') {
				proxy.$parent.onGetZgTableData();
			} else if (state.ruleForm.Kind == 'jsps') {
				proxy.$parent.onGetJsTableData();
			}
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			console.log(state.ruleForm);
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				console.log(valid);
				if (valid) {
					console.log('请求', state.ruleForm.Id);
					// state.loading = true;
					const url = state.ruleForm.Id > 0 ? `/v1/erp/projectsetting/${state.ruleForm.Id}` : `/v1/erp/projectsetting`;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.LineList = tableData.data;
					console.log(state.ruleForm, tableData.data);
					// if (state.ruleForm.LineList.length >= 1) {
					// 	for (let key in state.ruleForm.LineList) {
					// 		state.ruleForm.LineList[key].Id = state.ruleForm.LineList[key].Id.toString();
					// 	}
					// }
					// state.ruleForm.CategoryId = parseInt(state.ruleForm.CategoryId);
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					})
						.then((res) => {
							state.loading = false;
							if (res.errcode == 0) {
								if (isCloseDlg) {
									closeDialog();
								} else {
									proxy.$refs.ruleFormRef.resetFields();
									state.ruleForm.Id = 0;
								}
							}
						})
						.catch(() => {
							state.loading = false;
						});
					return false;
				} else {
					return false;
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
			onLoadTable,
			GetByIdRow,
			onModelAdd,
			onModelDel,
			onModelEdit,
			LineClose,
			LineSave,
			rules,
			lineRules,
			tableData,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
