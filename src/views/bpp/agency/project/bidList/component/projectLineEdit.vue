<template>
	<div class="system-edit-user-container">
		<el-dialog v-model="isShowDialog" title="品目信息" :destroy-on-close="true"  width="40%">
			<el-divider content-position="left">品目信息</el-divider>
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-width="130px" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="品目号：" prop="No">
							<el-input v-model="ruleForm.No" placeholder="品目号"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="物资编码：" prop="Sn">
							<el-input v-model="ruleForm.Sn" placeholder="包号"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="名称：" prop="Name">
							<el-input v-model="ruleForm.Name" placeholder="名称"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="备注：" prop="Remark">
							<el-input v-model="ruleForm.Remark" placeholder="备注"/>
							</el-form-item>
						</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
						<el-form-item label="数量：" prop="Qty">
							<el-input-number v-model="ruleForm.Qty" :min="0" controls-position="right" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<!-- <el-divider content-position="left">资格评审</el-divider>
			<el-form size="small" label-width="90px" :inline="true">
				<el-form-item>
					<el-button size="small" type="primary" @click="onOpenItemDialog('zgps', true)">
						<el-icon>
							<CirclePlusFilled />
						</el-icon>
						{{ $t('message.action.add') }}
					</el-button>
					<el-button size="small" @click="onOpenListDialog('zgps')">
						<el-icon><Edit /></el-icon>
						获取
					</el-button>
				</el-form-item>
				<el-form-item></el-form-item>
			</el-form>
			<el-table :data="zgTableData.data" v-loading="zgTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
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
						<el-button
							text
							bg
							type="danger"
							@click="onModelDel('zgps', scope.$index, scope.row.Id)"
							v-auth:[$parent.moduleKey]="'btn.SettingLineDel'"
						>
							<el-icon>
								<CloseBold />
							</el-icon>
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-divider content-position="left">技术评审</el-divider>
			<el-form size="small" label-width="90px" :inline="true">
				<el-form-item>
					<el-button size="small" type="primary" @click="onOpenItemDialog('jsps', true)">
						<el-icon>
							<Plus />
						</el-icon>
						{{ $t('message.action.add') }}
					</el-button>
					<el-button size="small" @click="onOpenListDialog('jsps')">
						<el-icon><Edit /></el-icon>
						获取
					</el-button>
				</el-form-item>
				<el-form-item></el-form-item>
			</el-form>
			<el-table :data="jsTableData.data" v-loading="jsTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
				<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
				<el-table-column prop="TechnicalMaxScore" label="最高分数" show-overflow-tooltip />
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenItemDialog('jsps', false, scope.row)" v-auth:[$parent.moduleKey]="'btn.SettingLineEdit'">
							<el-icon>
								<Edit />
							</el-icon>
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button
							text
							bg
							type="danger"
							@click="onModelDel('jsps', scope.$index, scope.row.Id)"
							v-auth:[$parent.moduleKey]="'btn.SettingLineDel'"
						>
							<el-icon>
								<CloseBold />
							</el-icon>
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-divider content-position="left">经济评审</el-divider>
			<el-form ref="jjFormRef" :model="jjForm" size="small" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10" :offset="1"
						><el-form-item label="采购控制价：" prop="PurchasePrice"
							><el-input-number v-model="jjForm.PurchasePrice" :min="0" controls-position="right" :precision="2" /> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10" :offset="1"
						><el-form-item label="价格评审得分策略：">
							<el-radio-group v-model="jjForm.ScoreMode">
								<el-radio :label="0">价格排名打分</el-radio>
								<el-radio :label="1">基础价格打分</el-radio>
							</el-radio-group>
						</el-form-item></el-col
					>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10" :offset="1" v-if="jjForm.ScoreMode == 0">
						<div class="mb10">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
						<div class="mb10">
							从第二名起，价格得分减少<span><el-input-number v-model="jjForm.PriceScore" :min="0" :max="100" controls-position="right" /> </span
							>分。超出采购控制价的供应商得零分。
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10" :offset="1" v-if="jjForm.ScoreMode == 1">
						<div class="mb10">
							价格评审最高分的<span><el-input-number v-model="jjForm.PricePercentage" :min="0" :max="100" controls-position="right" /> </span>
							%为基础价格得分;
						</div>
						<div class="mb10">
							评审报价比招标控制价每下浮1个百分点，则得分增加<span
								><el-input-number v-model="jjForm.QualificationScore" :min="0" :max="100" controls-position="right" />
							</span>
							分;
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :offset="1" class="mb10">
						<div class="mb10">本项目技术评审最高分：{{ jjForm.TechnicalScore }}分，最终评审价格最高分：{{ jjForm.TechnicalMaxScore }} 分。</div>
						<div class="mb10">如需修改请返回调整技术评审各得分项。</div>
					</el-col>
				</el-row>
			</el-form>-->
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit">{{ $t('message.action.save') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<!-- <editItemDlg ref="editItemDlgRef" />
	<editLineListDlg ref="editLineListDlgRef" /> -->
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
// import editLineListDlg from './projectLineList.vue';
// import editItemDlg from './templateEdit.vue';

import { ElMessageBox } from 'element-plus';
export default {
	name: 'projectLineEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		// const editItemDlgRef = ref();
		// const editLineListDlgRef = ref();

		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			isadd: false,
			index: 0,
			ruleForm: {
				Id: '0',
				Name: '',
				Kind: 'project_category',
				No: '',
				Sn: '',
				Remark: '',
				Qty: 0,
				ProjectSettingLineList: [],
			},
			// jjForm: {
			// 	Id: '0',
			// 	Kind: 'jjps',
			// 	PurchasePrice: 0, //采购控制价
			// 	ScoreMode: 0, //价格得分模式
			// 	PriceScore: 0, //价格得分减少
			// 	PricePercentage: 50, //价格百分比
			// 	QualificationScore: 0, //价格分数
			// 	TechnicalScore: 0,
			// 	TechnicalMaxScore: 0,
			// },
			// zgTableData: {
			// 	data: [],
			// 	loading: false,
			// },
			// jsTableData: {
			// 	data: [],
			// 	loading: false,
			// },
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
		const openDialog = (item: object, isAdd: boolean, index: number) => {
			state.isadd = isAdd;
			console.log('获取到的数据', item);
			if (!state.isadd) {
				state.index = index;
				state.ruleForm = JSON.parse(JSON.stringify(item));
				// if (state.ruleForm.ProjectSettingLineList) {
				// 	for (let item of state.ruleForm.ProjectSettingLineList) {
				// 		if (item.Kind == 'zgps') {
				// 			state.zgTableData.data.push(item);
				// 		} else if (item.Kind == 'jsps') {
				// 			state.jsTableData.data.push(item);
				// 		} else if (item.Kind == 'jjps') {
				// 			state.jjForm = item;
				// 		}
				// 	}
				// }
				//计算得分
				// getScore();
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = '0';
				// state.zgTableData.data = [];
				// state.jsTableData.data = [];
				state.title = t('message.action.add');
			}
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			// proxy.$refs.ruleFormRef.resetFields();
			// proxy.$refs.jjFormRef.resetFields();
			// state.jjForm = {
			// 	Id: '0',
			// 	Kind: 'jjps',
			// 	PurchasePrice: 0, //采购控制价
			// 	ScoreMode: 0, //价格得分模式
			// 	PriceScore: 0, //价格得分减少
			// 	PricePercentage: 50, //价格百分比
			// 	QualificationScore: 0, //价格分数
			// 	TechnicalScore: 0,
			// 	TechnicalMaxScore: 0,
			// };
			state.ruleForm = {
				Id: '0',
				Name: '',
				Kind: 'project_category',
				No: '',
				Sn: '',
				Remark: '',
				Qty: 0,
				// ProjectSettingLineList: [],
			};
			console.log('清除');
			// state.zgTableData.data = [];
			// state.jsTableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
		};
		// const getScore = () => {
		// 	if (state.jsTableData.data && state.jsTableData.data.length > 0) {
		// 		console.log(state.jjForm);
		// 		state.jjForm.TechnicalScore = 0;
		// 		for (let item of state.jsTableData.data) {
		// 			state.jjForm.TechnicalScore += item.TechnicalMaxScore;
		// 		}
		// 		state.jjForm.TechnicalMaxScore = 100 - state.jjForm.TechnicalScore;
		// 	}
		// };
		// 新增
		const onSubmit = () => {
			console.log('触发');
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				if (valid) {
					console.log('提交', proxy.$parent.tableData);
					// state.ruleForm.ProjectSettingLineList = [...state.zgTableData.data, ...state.jsTableData.data];
					// state.jjForm.Id = state.jjForm.Id.toString();
					// state.ruleForm.ProjectSettingLineList.push(state.jjForm);
					let item = JSON.parse(JSON.stringify(state.ruleForm));
					if (state.isadd) {
						proxy.$parent.tableData.data.push(item);
					} else {
						proxy.$parent.tableData.data[state.index] = item;
					}
					closeDialog();
					return false;
				} else {
					return false;
				}
			});
		};
		//删除
		// const onModelDel = (kind: string, index: number, Id: number) => {
		// 	ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
		// 		confirmButtonText: '确认',
		// 		cancelButtonText: '取消',
		// 		type: 'warning',
		// 	}).then(async () => {
		// 		if (Id == 0) {
		// 			if (kind == 'jsps') {
		// 				state.jsTableData.data.splice(index, 1);
		// 			} else if (kind == 'zgps') {
		// 				state.zgTableData.data.splice(index, 1);
		// 			}
		// 		} else {
		// 			try {
		// 				const res = await proxy.$api.erp.projectsettingline.delete(Id);
		// 				if (res.errcode == 0) {
		// 					if (kind == 'jsps') {
		// 						state.jsTableData.data.splice(index, 1);
		// 					} else if (kind == 'zgps') {
		// 						state.zgTableData.data.splice(index, 1);
		// 					}
		// 				}
		// 			} finally {
		// 			}
		// 		}
		// 		return false;
		// 	});
		// };
		// const onOpenItemDialog = (kind: string, isAdd: boolean, item: object) => {
		// 	// let model = {};
		// 	// if (item) {
		// 	// 	model = JSON.parse(JSON.stringify(item));
		// 	// }
		// 	editItemDlgRef.value.openDialog(kind, isAdd, item, false);
		// };
		// const onOpenListDialog = (kind: string) => {
		// 	editLineListDlgRef.value.openDialog(kind, false);
		// };
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			// getScore,
			// onModelDel,
			rules,
			// editItemDlgRef,
			// editLineListDlgRef,
			// onOpenItemDialog,
			// onOpenListDialog,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		// editItemDlg,
		// editLineListDlg,
	},
};
</script>
