<template>
	<div class="base-role-container">
		<el-form-item :label="'投标方名称：'">
			<el-select v-model="companyId" placeholder="请选择" @change="getExpertList()">
				<el-option v-for="item in signUpList" :key="item.CompanyId" :label="item.CompanyName" :value="item.CompanyId" />
			</el-select>
			<el-button style="margin-left: 10px" type="primary" @click="onSubmit(false)">{{ $t('message.action.save') }}</el-button>
			<el-button type="primary" @click="onSubmit(true)">{{ $t('message.action.submit') }}</el-button>
		</el-form-item>
		<el-row :gutter="10">
			<el-col :span="12">
				<el-table
					:data="tableData.data"
					v-loading="tableData.loading"
					style="width: 100%"
					:height="proxy.$calcMainHeight(-175)"
					border
					stripe
					highlight-current-row
				>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="SetLineContent" label="参数内容" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.SetLineContent == ''">【结论】评审汇总</span>
							<span v-else>{{ scope.row.SetLineContent }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="SetLineStandard" label="通过内容" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.SetLineStandard == ''">符合通过，不符合则不通过</span>
							<span v-else>{{ scope.row.SetLineStandard }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="ReviewState" label="是否通过" show-overflow-tooltip>
						<template #default="scope">
							<el-radio-group v-model="scope.row.ReviewState" class="ml-4" @change="changeRadio" :disabled="scope.row.IsGather == 1 ? true : false">
								<el-radio :label="1">通过</el-radio>
								<el-radio :label="0">不通过</el-radio>
							</el-radio-group>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="12">
				<el-table
					:data="fileTableData.data"
					v-loading="fileTableData.loading"
					style="width: 100%"
					:height="proxy.$calcMainHeight(-175)"
					border
					stripe
					highlight-current-row
				>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Files" label="审核文件" align="center" show-overflow-tooltip>
						<template #default="scope">
							<div class="demo-image__preview">
								<el-image
									style="width: 70px; height: 50px"
									:src="getRowFiles(scope.row.Files)"
									@click="getRowFilesList(scope.row.Files)"
									afit="cover"
								/>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="Name" label="文件名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
					<el-table-column prop="CompanyName" label="投标公司" show-overflow-tooltip></el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<div class="img-viewer-box">
			<el-image-viewer v-if="showFiles" :url-list="showFilList" @close="showFiles = false" />
		</div>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { Item } from 'ant-design-vue/lib/menu';
export default {
	name: 'zgps',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: store.state.project.project,
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
			signUpList: [],
			companyId: 0,
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			fileTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					current: 1,
					size: 10000,
					projectId: 0,
					projectCompanyId: 0,
				},
			},
			httpsText: import.meta.env.VITE_URL as any,
			kind: 'zgps',
			showFiles: false,
			showFilList: [],
		});
		const getExpertList = async () => {
			console.log('获取的数据', state.companyId);
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { kind: state.kind, companyId: state.companyId });
				if (res.errcode == 0) {
					state.tableData.data = res.data;
					state.fileTableData.param.projectId = store.state.project.projectId;
					state.fileTableData.param.projectCompanyId = state.companyId;
					onGetTableData(true);
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.fileTableData.param.current = 1;
			}
			state.fileTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectcompanylog.getListByScope('qualifications', 0, 1, state.fileTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.fileTableData.data = res.data;
				state.fileTableData.total = res.total;
			} finally {
				state.fileTableData.loading = false;
			}
		};
		const GetSignUpList = async (isState: boolean) => {
			try {
				const res = await proxy.$api.erp.projectcompany.signUpList({ projectId: store.state.project.projectId, state: 1, auditState: 1 });
				if (res.errcode != 0) {
					return;
				}
				state.signUpList = res.data;
				state.companyId = res.data[0].CompanyId;
				if (isState) {
					getExpertList();
				}
				state.signUpData = res.data;
			} finally {
			}
		};
		const changeRadio = () => {
			let reviewState = true;
			for (let item of state.tableData.data) {
				console.log('是否通过', item);
				if (item.IsGather != 1) {
					if (item.ReviewState == 0) {
						reviewState = false;
					}
				} else {
					if (reviewState) {
						item.ReviewState = 1;
					} else {
						item.ReviewState = 0;
					}
				}
			}
		};
		const onSubmit = async (isSubmit: boolean) => {
			try {
				if (isSubmit) {
					state.tableData.data.forEach((item) => {
						item.State = 1;
					});
					ElMessageBox.confirm(`确定要提交吗?`, '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}).then(async () => {
						let data = JSON.stringify(state.tableData.data);
						const res = await proxy.$api.erp.projectreview.expertSave(state.kind, data);
						if (res.errcode == 0) {
							ElMessage.success('操作成功');
							getExpertList();
						}
					});
				} else {
					let data = JSON.stringify(state.tableData.data);
					const res = await proxy.$api.erp.projectreview.expertSave(state.kind, data);
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						getExpertList();
					}
				}
			} finally {
			}
		};
		const getRowFiles = (Files: string) => {
			let fileUrl = '';
			let filList = Files.split(',');
			fileUrl = state.httpsText + filList[0];
			return fileUrl;
		};
		const getRowFilesList = (Files: string) => {
			state.showFilList = [];
			if (Files != '') {
				state.showFilList = Files.split(',');
				state.showFilList.forEach((item: any, i: number) => {
					state.showFilList[i] = state.httpsText + item;
				});
				state.showFiles = true;
			}
		};
		// 页面加载时
		onMounted(() => {
			GetSignUpList(false);
		});
		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			onSubmit,
			getRowFiles,
			getRowFilesList,
			project,
			changeRadio,
			onGetTableData,
			getExpertList,
			GetSignUpList,
			...toRefs(state),
			dateFormatYMDHM,
		};
	},
};
</script>

<style scoped lang="scss"></style>
