<template>
	<div class="base-role-container">
		<h1 v-if="indexLine == '1-1'">1-1</h1>
		<h1 v-if="indexLine == '1-2'">1-2</h1>
		<div v-if="indexLine == '1-3'">
			<div>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label="当前项目包号：">
						<el-select v-model="projectLineIndex" placeholder="请选择" @change="changeLine">
							<el-option
								v-if="project.ProjectLineList && project.ProjectLineList.length > 0"
								v-for="item in project.ProjectLineList"
								:key="item.Id"
								:label="item.Name"
								:value="item.Id"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-divider content-position="left">资格评审</el-divider>
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
								<el-button text bg type="primary" @click="onOpenItemDialog('zgps', false, scope.row)">
									<el-icon>
										<Edit />
									</el-icon>
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg type="danger" @click="onModelDel('zgps', scope.$index, scope.row.Id)">
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
								<el-button text bg type="primary" @click="onOpenItemDialog('jsps', false, scope.row)">
									<el-icon>
										<Edit />
									</el-icon>
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg type="danger" @click="onModelDel('jsps', scope.$index, scope.row.Id)">
									<el-icon>
										<CloseBold />
									</el-icon>
									{{ $t('message.action.delete') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-divider content-position="left">经济评审</el-divider>
					<el-form ref="jjFormRef" :model="jjForm" size="small">
						<el-row :gutter="20">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1"
								><el-form-item label="采购控制价：" prop="PurchasePrice"
									><el-input-number v-model="jjForm.PurchasePrice" :min="0" controls-position="right" :precision="2" /> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1"
								><el-form-item label="价格评审得分策略：">
									<el-radio-group v-model="jjForm.ScoreMode">
										<el-radio :label="0">价格排名打分</el-radio>
										<el-radio :label="1">基础价格打分</el-radio>
									</el-radio-group>
								</el-form-item></el-col
							>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="jjForm.ScoreMode == 0">
								<div class="mb20">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
								<div class="mb20">
									从第二名起，价格得分减少<span><el-input-number v-model="jjForm.PriceScore" :min="0" :max="100" controls-position="right" /> </span
									>分。超出采购控制价的供应商得零分。
								</div>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="jjForm.ScoreMode == 1">
								<div class="mb20">
									价格评审最高分的<span><el-input-number v-model="jjForm.PricePercentage" :min="0" :max="100" controls-position="right" /> </span>
									%为基础价格得分;
								</div>
								<div class="mb20">
									评审报价比招标控制价每下浮1个百分点，则得分增加<span
										><el-input-number v-model="jjForm.QualificationScore" :min="0" :max="100" controls-position="right" />
									</span>
									分;
								</div>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :offset="1" class="mb20">
								<div class="mb20">本项目技术评审最高分：{{ jjForm.TechnicalScore }}分，最终评审价格最高分：{{ jjForm.TechnicalMaxScore }} 分。</div>
								<div class="mb20">如需修改请返回调整技术评审各得分项。</div>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</div>
		</div>
		<editItemDlg ref="editItemDlgRef" />
		<editLineListDlg ref="editLineListDlgRef" />
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useRoute, useRouter } from 'vue-router';
import project from '/@/api/erp/project';
import editItemDlg from '../templateEdit.vue';
import editLineListDlg from '../projectLineList.vue';
export default {
	name: 'baseRoles',
	props: ['indexLine'],
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const router = useRouter();
		const editItemDlgRef = ref();
		const editLineListDlgRef = ref();
		const state: any = reactive({
			project: {},
			projectLineIndex: '',
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
			},
			zgTableData: {
				data: [],
				loading: false,
			},
			jsTableData: {
				data: [],
				loading: false,
			},
		});
		const store = useStore();
		const getProject = () => {
			state.project = store.state.project.project;
		};

		const changeLine = () => {
			state.zgTableData.data = [];
			state.jsTableData.data = [];
			state.jjForm = {};

			if (state.projectLineIndex != '') {
				for (let item of state.project.ProjectLineList) {
					if (item.Id == state.projectLineIndex) {
						if (item.ProjectSettingLineList) {
							for (let model of item.ProjectSettingLineList) {
								if (model.Kind == 'zgps') {
									state.zgTableData.data.push(model);
								} else if (model.Kind == 'jsps') {
									state.jsTableData.data.push(model);
								} else if (model.Kind == 'jjps') {
									state.jjForm = model;
								}
							}
						}
						//计算得分
						getScore();
					}
				}
			}
		};
		const getScore = () => {
			if (state.jsTableData.data && state.jsTableData.data.length > 0) {
				console.log(state.jjForm);
				state.jjForm.TechnicalScore = 0;
				for (let item of state.jsTableData.data) {
					state.jjForm.TechnicalScore += item.TechnicalMaxScore;
				}
				state.jjForm.TechnicalMaxScore = 100 - state.jjForm.TechnicalScore;
			}
		};
		const onOpenItemDialog = (kind: string, isAdd: boolean, item: object) => {
			// let model = {};
			// if (item) {
			// 	model = JSON.parse(JSON.stringify(item));
			// }
			editItemDlgRef.value.openDialog(kind, isAdd, item);
		};
		const onOpenListDialog = (kind: string) => {
			editLineListDlgRef.value.openDialog(kind);
		};
		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			project,
			changeLine,
			editItemDlgRef,
			editLineListDlgRef,
			getProject,
			onOpenItemDialog,
			onOpenListDialog,
			...toRefs(state),
		};
	},
	components: {
		editItemDlg,
		editLineListDlg,
	},
};
</script>

<style scoped lang="scss">
</style>
