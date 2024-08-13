<template>
	<el-card>
		<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="请选择当前项目包号：">
					<el-select v-model="projectLineIndex" placeholder="请选择" @change="changeLine">
						<el-option
							v-if="project.ProjectLineList && project.ProjectLineList.length > 0"
							v-for="item in project.ProjectLineList"
							:key="item.Id"
							:label="item.Name"
							:value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">test</el-descriptions-item>
					<el-descriptions-item label="项目编号：">test</el-descriptions-item>
					<el-descriptions-item label="开标时间：">test</el-descriptions-item>
					<el-descriptions-item label="开标地点：">test</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="tabsName">
			<el-tab-pane label="资格评审" name="zgps">
				<el-table :data="zgTableData.data" v-loading="zgTableData.loading" :height="proxy.$calcMainHeight(-170)" style="width: 100%" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="State" label="评分方式" width="120" show-overflow-tooltip>
						<template #default="scope">
							<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
								<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span >通过</span>
							</div>
							<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
								<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
								<span>不通过</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="zgTableData.param.current"
					background
					v-model:page-size="zgTableData.param.size"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="zgTableData.total">
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane label="技术评审" name="jsps">
				<el-table :data="jsTableData.data" style="width: 100%" v-loading="jsTableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
					<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
					<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
					<el-table-column prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="jsTableData.param.current"
					background
					v-model:page-size="jsTableData.param.size"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="jsTableData.total">
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane label="经济评审" name="jjps">
				<el-form ref="jjFormRef" :model="jjForm" size="small">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="采购控制价：" prop="PurchasePrice">
								<el-input-number
									v-model="jjForm.PurchasePrice"
									:min="0"
									controls-position="right"
									:precision="2"
									@change="saveJjps"
									:disabled="state ? false : true"/>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="价格评审得分策略：">
								<el-radio-group v-model="jjForm.ScoreMode" @change="saveJjps" :disabled="state ? false : true">
									<el-radio :label="0">价格排名打分</el-radio>
									<el-radio :label="1">基础价格打分</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="jjForm.ScoreMode == 0">
							<div class="mb20">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
							<div class="mb20">
								从第二名起，价格得分减少
								<span>
									<el-input-number
										v-model="jjForm.PriceScore"
										:min="0"
										:max="100"
										controls-position="right"
										@change="saveJjps"
										:disabled="state ? false : true"/>
								</span>
								分。超出采购控制价的供应商得零分。
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1" v-if="jjForm.ScoreMode == 1">
							<div class="mb20">
								价格评审最高分的
								<span>
									<el-input-number
										v-model="jjForm.PricePercentage"
										:min="0"
										:max="100"
										controls-position="right"
										@change="saveJjps"
										:disabled="state ? false : true"/>
								</span>
								%为基础价格得分;
							</div>
							<div class="mb20">
								评审报价比招标控制价每下浮1个百分点，则得分增加
								<span>
									<el-input-number
										v-model="jjForm.QualificationScore"
										:min="0"
										:max="100"
										controls-position="right"
										@change="saveJjps"
										:disabled="state ? false : true"/>
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
</template>

<script lang="ts">
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
export default {
	name: 'projectEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const moduleKey = proxy.$parent.moduleKey;
		const store = useStore();
		const token = Session.get('token');
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			moduleKey,
			project: store.state.project.project,
			projectLineIndex: '',
			activeName:"zgps",
			isShowDialog: false,
			token: token,
			
			baseUrl: import.meta.env.VITE_API_URL,
			zgTableData: {
				data: [],
				loading: false,
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: '279082270076182531',
					categoryId: null,
					name: '',
				},
			},
			jsTableData: {
				data: [],
				loading: false,
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: '279082270076182531',
					categoryId: null,
					name: '',
				},
			},
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
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: '279082270076182531',
					categoryId: null,
					name: '',
				},
			},
			companyOption: [],
		});

		const getScore = () => {
			if (state.jsTableData.data && state.jsTableData.data.length > 0) {
				state.jjForm.TechnicalScore = 0;
				for (let item of state.jsTableData.data) {
					state.jjForm.TechnicalScore += item.TechnicalMaxScore;
				}
				state.jjForm.TechnicalMaxScore = 100 - state.jjForm.TechnicalScore;
			}
		};


		//切换页面标签
		const tabsName = () => {
			onLoadTable(true);
		};

		//刷新表格
		const onLoadTable = (refresh: boolean) => {
			if (state.activeName == 'zgps') {
				onGetZgTableData(refresh);
			} else if (state.activeName == 'jsps') {
				onGetJsTableData(refresh);
			} else if (state.activeNmae == 'jjps'){
				onGetJjFormData(refresh);
			}
		};

		//资格评审表格
		const onGetZgTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.zgTableData.param.current = 1;
			}
			state.zgTableData.loading = true;
			try {
				state.zgTableData.param.kind = state.activeName
				const res = await proxy.$api.erp.projectsettingline.getListByScope(state.zgTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.zgTableData.total = res.total;
				state.zgTableData.data = res.data;
			} finally {
				state.zgTableData.loading = false;
			}
		};

		//技术表格
		const onGetJsTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.jsTableData.param.current = 1;
			}
			state.jsTableData.loading = true;
			try {
				state.jsTableData.param.kind = state.activeName
				const res = await proxy.$api.erp.projectsettingline.getListByScope(state.jsTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.jsTableData.total = res.total;
				state.jsTableData.data = res.data;
			} finally {
				state.jsTableData.loading = false;
			}
		};

		//经济表
		const onGetJjFormData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.jjForm.param.current = 1;
			}
			state.jjForm.loading = true;
			try {
				state.jjForm.param.kind = state.activeName
				const res = await proxy.$api.erp.projectsettingline.getListByScope(state.jjForm.param);
				if (res.errcode != 0) {
					return;
				}
				state.jjForm.PurchasePrice = res.PurchasePrice
				state.jjForm.ScoreMode = res.ScoreMode
				state.jjForm.PriceScore = res.PriceScore
				state.jjForm.PricePercentage = res.PricePercentage
				state.jjForm.QualificationScore = res.QualificationScore
				state.jjForm.TechnicalScore = res.TechnicalScore
				state.jjForm.TechnicalMaxScore = res.TechnicalMaxScore
			} finally {
				state.jjForm.loading = false;
			}
		};

		const onGetCompanyData = async () => {
			let param = {
				current: 1,
				size: 10000,
			};
			try {
				const res = await proxy.$api.base.tenant.getList(param);
				if (res.errcode != 0) {
					return;
				}
				state.companyOption = res.data;
			} finally {
			}
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.size = val;
				onGetZgTableData();
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.size = val;
				onGetJsTableData();
			}
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.current = val;
				onGetZgTableData();
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.current = val;
				onGetJsTableData();
			}
		};

		// 页面加载时
		onMounted(() => {
			onLoadTable(true);
		});
		return {
			proxy,
			t,
			onGetCompanyData,
			onHandleSizeChange,
			onHandleCurrentChange,
			tabsName,
			getUserInfos,
			getScore,
			...toRefs(state),
		};
	},
	components: {
		Upload,
	},
};
</script>
