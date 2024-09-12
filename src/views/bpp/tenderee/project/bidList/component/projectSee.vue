<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" destroy-on-close width="60%" :before-close="closeDialog">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="项目详情" name="first" style="height: 400px">
					<el-row :gutter="20">
						<el-col :span="24">
							<el-descriptions :column="2">
								<el-descriptions-item label="比选编号：">{{ ruleForm.No }}</el-descriptions-item>
								<el-descriptions-item label="比选项目：">{{ ruleForm.Name }}</el-descriptions-item>
								<el-descriptions-item label="发布日期：">{{ ruleForm.BidOpenTime }}</el-descriptions-item>
								<el-descriptions-item label="报名截止时间：">{{ ruleForm.EndTime }}</el-descriptions-item>
								<el-descriptions-item label="投标截止时间：">{{ ruleForm.FinishTime }}</el-descriptions-item>
								<el-descriptions-item label="评选日期：">{{ ruleForm.ReviewTime }}</el-descriptions-item>
								<el-descriptions-item label="项目类型：">
									<span v-if="ruleForm.ProjectType == 1">公开招标</span>
									<span v-else-if="ruleForm.ProjectType == 2">邀请招标</span>
									<span v-else-if="ruleForm.ProjectType == 3">竞争性谈判</span>
									<span v-else-if="ruleForm.ProjectType == 4">单一来源采购</span>
									<span v-else-if="ruleForm.ProjectType == 5">询价采购</span>
								</el-descriptions-item>
							</el-descriptions>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
							项目共用包1个：
							<el-table :data="packageTableData.data" v-loading="packageTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
								<el-table-column type="selection" width="50" fixed />
								<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed />
								<el-table-column prop="PackageId" label="包号" width="150" show-overflow-tooltip fixed/>
								<el-table-column prop="LineName" label="设备名称" width="150" show-overflow-tooltip/>
								<el-table-column prop="Count" label="数量" width="80" align="right" show-overflow-tooltip/>
								<el-table-column prop="Note" label="备注"  show-overflow-tooltip/>
							</el-table>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="比选公告" name="second" style="height: 400px">
					<el-scrollbar>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-descriptions :column="2">
									<el-descriptions-item label="采购项目编号：">test</el-descriptions-item>
									<el-descriptions-item label="采购方式：">test</el-descriptions-item>
									<el-descriptions-item label="行政区划：">test</el-descriptions-item>
									<el-descriptions-item label="采购人：">{{ ruleForm.PurchaseManangerName }}</el-descriptions-item>
									<el-descriptions-item label="采购人地址：">test</el-descriptions-item>
									<el-descriptions-item label="采购人联系方式：">{{ ruleForm.PurchaseManangerMobile }}</el-descriptions-item>
									<el-descriptions-item label="项目联系人：">{{ ruleForm.ProjectManagerName }}</el-descriptions-item>
									<el-descriptions-item label="供应商资格条件：">test</el-descriptions-item>
									<el-descriptions-item label="标书发售方式：">test</el-descriptions-item>
									<el-descriptions-item label="项目包个数：">test</el-descriptions-item>
									<el-descriptions-item label="报名时间：">test</el-descriptions-item>
									<el-descriptions-item label="标书售价：">{{ ruleForm.BidFee }}</el-descriptions-item>
									<el-descriptions-item label="投标时间：">test</el-descriptions-item>
								</el-descriptions>
							</el-col>
						</el-row>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="投标名单" v-if="!isShow" name="third" style="height: 400px">
					<el-table :data="comparativeTableData.data" v-loading="comparativeTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" width="70" align="right" fixed />
						<el-table-column prop="SupplierId" label="供应商编号" width="120" align="right" show-overflow-tooltip/>
						<el-table-column prop="SupplierName" label="供应商名称" show-overflow-tooltip/>
						<el-table-column prop="CheckTime" label="报到时间" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
						<el-table-column prop="ComparativeTime" label="比选时间" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
						<el-table-column prop="PackageId" label="项目包号" show-overflow-tooltip/>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="比选文件" v-if="!isShow" name="fourth" style="height: 400px">
					<div v-for="(val, index) in FilesList" :key="index">
						<a :href="val.url" target="_blank">点击下载</a>
					</div>
				</el-tab-pane>
			</el-tabs>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="info" @click="closeDialog">取消</el-button>
					<el-button type="primary" @click="closeDialog">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TabsPaneContext } from 'element-plus';
import commonFunction from '/@/utils/commonFunction';
import { ElMessageBox, ElMessage } from 'element-plus';
export default {
	name: 'categoryEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.see'),
			ruleForm: {},
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			projectType: '',
			signUpData: [],
			signUp: {
				ProjectId: 0,
			},
			isShow: false,
			getList: [],
			packageTableData:{
				data: [],
				loading: false,
				param: {
					current: 1,
					pageSize: 10000,
				},
			},
			comparativeTableData: {
				data: [],
				loading: false,
				param: {
					current: 1,
					pageSize: 10000,
				},
			},
		});
		const { dateFormat, dateFormatYMDHM } = commonFunction();
		const activeName = ref('first');
		const handleClick = (tab: TabsPaneContext, event: Event) => {};
		// 打开弹窗
		const openDialog = (id: string, isShow: boolean) => {
			state.isShow = isShow;
			state.signUp.ProjectId = id;
			GetByIdRow(id);
			if (!isShow) {
				GetSignUpList(id);
			}
			state.isShowDialog = true;
		};
		const GetSignUpList = async (id: string) => {
			try {
				const res = await proxy.$api.erp.projectcompany.signUpList({ projectId: id });
				if (res.errcode != 0) {
					return;
				}
				state.signUpData = res.data;
			} finally {
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};

		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				res.data.ProjectType = res.data.ProjectType.toString();
				if (res.data.ProjectLineList) {
					state.tableData.data = res.data.ProjectLineList;
				}
				if (state.ruleForm.Files != '') {
					let Files = res.data.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < Files.length; i++) {
						let image = { url: '' };
						image.url = state.httpsText + Files[i];
						state.FilesList.push(image);
					}
				}
			} finally {
				state.isShowDialog = true;
			}
		};
		const onSubmit = async () => {
			console.log('是否报名');
			ElMessageBox.confirm(`确定要报名该项目吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.projectcompany.signup(state.signUp);
					if (res.errcode != 0) {
						return;
					}
					ElMessage.success('报名成功！');
				} finally {
					closeDialog();
				}
			});
		};

		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			activeName,
			handleClick,
			dateFormat,
			onSubmit,
			t,
			GetByIdRow,
			openDialog,
			closeDialog,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>
