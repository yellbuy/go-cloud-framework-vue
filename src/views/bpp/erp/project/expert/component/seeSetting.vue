<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="tabsName">
				<el-tab-pane label="资格评审" name="zgps">
					<el-table
						:data="zgTableData.data"
						style="width: 100%"
						v-loading="zgTableData.loading"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row
					>
						<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
						<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="技术评审" name="jsps">
					<el-table
						:data="jsTableData.data"
						style="width: 100%"
						v-loading="jsTableData.loading"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row
					>
						<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
						<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
						<el-table-column prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="经济评审" name="jjps">
					<el-form ref="jjFormRef" :model="jjForm" :disabled="true" size="small">
						<el-row :gutter="20">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1"
								><el-form-item label="采购控制价：" prop="PurchasePrice"
									><el-input-number
										v-model="jjForm.PurchasePrice"
										:min="0"
										controls-position="right"
										:precision="2"
										@change="saveJjps"
									/> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1"
								><el-form-item label="价格评审得分策略：">
									<el-radio-group v-model="jjForm.ScoreMode" @change="saveJjps">
										<el-radio :label="0">价格排名打分</el-radio>
										<el-radio :label="1">基础价格打分</el-radio>
									</el-radio-group>
								</el-form-item></el-col
							>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="jjForm.ScoreMode == 0">
								<div class="mb20">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
								<div class="mb20">
									从第二名起，价格得分减少<span
										><el-input-number v-model="jjForm.PriceScore" :min="0" :max="100" controls-position="right" @change="saveJjps" /> </span
									>分。超出采购控制价的供应商得零分。
								</div>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="jjForm.ScoreMode == 1">
								<div class="mb20">
									价格评审最高分的<span
										><el-input-number v-model="jjForm.PricePercentage" :min="0" :max="100" controls-position="right" @change="saveJjps" />
									</span>
									%为基础价格得分;
								</div>
								<div class="mb20">
									评审报价比招标控制价每下浮1个百分点，则得分增加<span
										><el-input-number v-model="jjForm.QualificationScore" :min="0" :max="100" controls-position="right" @change="saveJjps" />
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
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
export default {
	name: 'expertSeeSetting',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			activeName: 'zgps',
			zgTableData: {
				data: [],
				loading: false,
			},
			jsTableData: {
				data: [],
				loading: false,
			},
			jjForm: {},
		});
		//切换页面
		const tabsName = () => {
			onLoadTable();
		};
		//刷新表格
		const onLoadTable = async () => {
			state.zgTableData.data = [];
			state.jsTableData.data = [];
			state.jjForm = {};
			//请求获取数据
			try {
				const res = await proxy.$api.erp.projectsettingline.getListByScope({
					projectid: store.state.project.projectId,
				});
				if (res.errcode != 0) {
					return;
				}
				if (res.data && res.data.length > 0) {
					for (let model of res.data) {
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
			} finally {
			}
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
		const saveJjps = async () => {
			if (state.projectLineIndex != '' && state.projectLineIndex != 0) {
				try {
					const res = await proxy.$api.erp.projectsettingline.save(state.jjForm);
					if (res.errcode != 0) {
						return;
					}
				} finally {
				}
			}
		};
		// 页面加载时
		onMounted(() => {
			onLoadTable();
		});

		return {
			proxy,
			tabsName,
			saveJjps,
			onLoadTable,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
