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
			project: {},
			projectLineIndex: '',
			activeName:"zgps",
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			token: token,
			baseUrl: import.meta.env.VITE_API_URL,
			dialogImageUrl: [],
			dialogTitle: '',
			dialogVisible: false,
			isParameterReview: true,
			tableData:{
				data: [],
				loading: false,
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			ruleForm: {
				Id: 0,
				Kind: '',
				Name: '',
				No: '',
				Sn: '',
				ProjectType: 1,
				RemoteState: 0,
				BidFee: 0,
				EnsureFee: 0,
				Location: '',
				Content: '',
				Files: '',
				AutoSwitchState: 0,
				StartTime: '', //报名开始时间
				EndTime: '', //报名结束时间
				BeginTime: '', //投标开始时间
				FinishTime: '', //投标结束时间
				ReviewTime: '', //评选时间
				BidOpenTime: '',
				ProjectLineList: [],
				ProjectSettingLineList: [],
			},
			zgTableData: {
				data: [{Content:"测试", Standard:"测试", Standard:"符合通过", State:0}],
				loading: false,
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			jsTableData: {
				data: [{Content:"测试999", Standard:"测试999", TechnicalMaxScore:100}],
				loading: false,
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: 0,
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
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			// tableData: {
			// 	data: [],
			// 	loading: false,
			// 	param: {
			// 		current: 1,
			// 		size: 10000,
			// 	},
			// },
			SupplierIds: [],
			companyOption: [],
			methodList: [],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			Files: [],
			homeBaseUrl: import.meta.env.VITE_URL as any,
			FilesList: [],
		});
		const startTimeRule = (rule: any, value: any, callback: any) => {
			switch (rule.field) {
				case 'StartTime':
					if (value == '') {
						callback(new Error('请选择时间'));
					} else if (value >= state.ruleForm.EndTime) {
						callback(new Error('报名开始时间应小于报名结束时间'));
					} else {
						callback();
					}
					break;
				case 'EndTime':
					if (value == '') {
						callback(new Error('请选择时间'));
					} else if (value <= state.ruleForm.StartTime) {
						callback(new Error('报名结束时间应大于于报名开始时间'));
					} else {
						callback();
					}
					break;
				case 'BeginTime':
					if (value == '') {
						callback(new Error('请选择时间'));
					} else if (value <= state.ruleForm.EndTime) {
						callback(new Error('招标开始时间应大于报名结束时间'));
					} else if (value >= state.ruleForm.FinishTime) {
						callback(new Error('招标开始时间应小于招标结束时间'));
					} else {
						callback();
					}
					break;
				case 'FinishTime':
					if (value == '') {
						callback(new Error('请选择时间'));
					} else if (value <= state.ruleForm.BeginTime) {
						callback(new Error('招标结束时间应大于招标开始时间'));
					} else {
						callback();
					}
					break;
				case 'ReviewTime':
					if (value == '') {
						callback(new Error('请选择时间'));
					} else if (value <= state.ruleForm.FinishTime) {
						callback(new Error('评选时间应大于招标结束时间'));
					} else {
						callback();
					}
					break;
			}
		};
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			No: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Sn: [
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
			ProjectType: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Content: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			StartTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			EndTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			BeginTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			FinishTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
			ReviewTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
		});
		//上传成功
		const onSuccessFile = (file: UploadFile) => {
			state.Files.push(file.data.src);
			const imgPath = { url: state.homeBaseUrl + file.data.src };
			state.FilesList.push(imgPath);
		};
		//删除上传文件
		const onRemove = (file: UploadFile) => {
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.FilesList.length; i++) {
				if (state.FilesList[i] == removeUrl) {
					state.FilesList.splice(i, 1);
					break;
				}
			}
		};
		const imgOnClose = () => {
			state.dialogVisible = false;
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
		//预览文件
		const onPreview = (uploadFile: any) => {
			// 当格式为图片就预览图片，否则下载文件
			let filename = uploadFile.name;
			if (!uploadFile.name || uploadFile.name == '') {
				filename = uploadFile.url;
			}
			let fileurl = uploadFile.url;
			let fileExtension = '';
			// 校检文件类型
			var imageTypes = ['png', 'jpg', 'jpeg', 'gif'];
			if (filename.lastIndexOf('.') > -1) {
				fileExtension = filename.slice(filename.lastIndexOf('.') + 1);
			}
			const isTypeOk = imageTypes.some((type) => {
				if (fileExtension && fileExtension.indexOf(type) > -1) {
					return true;
				}
			});
			if (isTypeOk) {
				//预览图片
				state.dialogImageUrl[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
			} else {
				//下载文件
				state.dialogVisible = false;
				// openWindow(fileurl, { target: "_self" });
				window.open(fileurl, '_self');
			}
		};

		//修改按钮
		// const onModelEdit = (isadd: boolean, item: object, index: object) => {
		// 	lineEditDlgRef.value.openDialog(item, isadd, index);
		// };
		// 打开弹窗
		const openPage = async (id: string) => {
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			// state.ruleForm.Kind = kind;
			state.isShowDialog = true;
		};

		//技术表格
		const onGetJsTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.jsTableData.param.current = 1;
			}
			state.jsTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.scopeMode, state.scopeValue, state.jsTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.jsTableData.total = res.total;
				state.jsTableData.data = res.data;
			} finally {
				state.jsTableData.loading = false;
			}
		};
		//查询表格数据
		const onGetZgTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.zgTableData.param.current = 1;
			}
			state.zgTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.scopeMode, state.scopeValue, state.zgTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.zgTableData.total = res.total;
				state.zgTableData.data = res.data;
			} finally {
				state.zgTableData.loading = false;
			}
		};

		//切换页面
		const tabsName = () => {
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (refresh: boolean) => {
			console.log(state.activeName);
			if (state.activeName == 'zgps') {
				onGetZgTableData(refresh);
			} else if (state.activeName == 'jsps') {
				onGetJsTableData(refresh);
			}
		};
		const GetByIdRow = async (id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(id);
				if (res.errcode != 0) {
					return;
				}
				console.log(res);
				// if (res.data.ProjectLineList) {
				// 	state.tableData.data = res.data.ProjectLineList;
				// }
				state.ruleForm = JSON.parse(JSON.stringify(res.data));
				if (state.ruleForm.Files != '') {
					state.Files = res.data.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < state.Files.length; i++) {
						let image = { url: '', name: '' };
						image.url = state.homeBaseUrl + state.Files[i];
						image.name = state.homeBaseUrl + state.Files[i];
						state.FilesList.push(image);
					}
				}
				if (state.ruleForm.ProjectSettingLineList) {
					for (let item of state.ruleForm.ProjectSettingLineList) {
						if (item.Kind == 'zgps') {
							state.zgTableData.data.push(item);
						} else if (item.Kind == 'jsps') {
							state.jsTableData.data.push(item);
						} else if (item.Kind == 'jjps') {
							state.jjForm = item;
						}
					}
				}

				// 计算得分
				getScore();
			} finally {
				state.isShowDialog = true;
			}
		};
		// 取消
		const onCancel = () => {
			state.loading = false;
			state.isShowDialog = false;
		};
		// const onLoadTable = () => {
		// 	// proxy.$parent.onGetTableData();
		// };
		// 新增
		const onSubmit = () => {
		};
		const onModelLineDel = (kind: string, index: number, Id: number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				if (Id == 0) {
					if (kind == 'jsps') {
						state.jsTableData.data.splice(index, 1);
						getScore();
					} else if (kind == 'zgps') {
						state.zgTableData.data.splice(index, 1);
					}
				} else {
					try {
						const res = await proxy.$api.erp.projectsettingline.delete(Id);
						if (res.errcode == 0) {
							if (kind == 'jsps') {
								state.jsTableData.data.splice(index, 1);
								getScore();
							} else if (kind == 'zgps') {
								state.zgTableData.data.splice(index, 1);
							}
						}
					} finally {
						return false;
					}
				}
			});
		};
		const onOpenItemDialog = (kind: string, isAdd: boolean, item: object, index: number) => {
			// let model = {};
			// if (item) {
			// 	model = JSON.parse(JSON.stringify(item));
			// }
			editItemDlgRef.value.openDialog(kind, isAdd, item, false, index);
		};
		const onOpenListDialog = (kind: string) => {
			editLineListDlgRef.value.openDialog(kind, false);
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
			// onGetCompanyData();
		});
		return {
			proxy,
			t,
			openPage,
			onCancel,
			onLoadTable,
			GetByIdRow,
			onPreview,
			onSuccessFile,
			onRemove,
			imgOnClose,
			onGetCompanyData,
			onHandleSizeChange,
			onHandleCurrentChange,
			// onModelDel,
			// onModelEdit,
			rules,
			tabsName,
			// lineEditDlgRef,
			getUserInfos,
			onSubmit,
			onOpenListDialog,
			onOpenItemDialog,
			onModelLineDel,
			getScore,
			startTimeRule,
			...toRefs(state),
		};
	},
	components: {
		Upload,
	},
};
</script>
