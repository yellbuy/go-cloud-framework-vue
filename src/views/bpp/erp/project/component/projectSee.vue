<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="项目详情" name="first" style="height: 400px">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"> 比选编号：{{ ruleForm.No }} </el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"> 比选项目：{{ ruleForm.Name }} </el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"> 发布日期：{{ dateFormat(ruleForm.StartTime) }} </el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"> 报名截止时间：{{ dateFormat(ruleForm.EndTime) }} </el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"> 投标截止时间：{{ dateFormat(ruleForm.BeginTime) }} </el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"> 评选日期：{{ dateFormat(ruleForm.ReviewTime) }} </el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
							项目类型： <span v-if="ruleForm.ProjectType == 1">公开招标</span>
							<span v-else-if="ruleForm.ProjectType == 2">邀请招标</span>
							<span v-else-if="ruleForm.ProjectType == 3">竞争性谈判</span>
							<span v-else-if="ruleForm.ProjectType == 4">单一来源采购</span>
							<span v-else-if="ruleForm.ProjectType == 5">询价采购</span></el-col
						>
					</el-row>
					<el-table
						:data="tableData.data"
						v-loading="tableData.loading"
						style="width: 100%"
						size="small"
						border
						stripe
						highlight-current-row
						@select="select"
						@select-all="selectAll"
					>
						<el-table-column v-if="isShow" type="selection" width="55" />
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="Sn" label="包号" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="No" label="品目号" show-overflow-tooltip></el-table-column>
						<el-table-column prop="Name" label="名称" show-overflow-tooltip></el-table-column>
						<el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
						<el-table-column prop="Qty" label="数量" show-overflow-tooltip></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="比选公告" name="second" style="height: 400px">
					<div v-html="ruleForm.Content"></div>
					<h4 v-if="ruleForm.AutoSwitchState == 1">原公开比选项目如不足三家供应商参与，则该项目自动转为院内谈判项目。详见平台采购须知说明。</h4>
				</el-tab-pane>
				<el-tab-pane label="比选名单" name="third" style="height: 400px">
					<el-table :data="signUpData" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="CompanyName" label="公司名称" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="LineName" label="包号名称" show-overflow-tooltip></el-table-column>
						<el-table-column prop="BiddingTime" label="比选时间" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						<el-table-column prop="SignUpTime" label="报名时间" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="比选文件" name="fourth" style="height: 400px">
					<div v-for="(val, index) in FilesList" :key="index">
						<a :href="val.url" target="_blank">点击下载</a>
					</div>
				</el-tab-pane>
			</el-tabs>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="primary" v-if="isShow" @click="onSubmit" v-auth:[$parent.moduleKey]="'btn.signup'">{{
						$t('message.action.signUp')
					}}</el-button>
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
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
				LineIds: '',
			},
			isShow: false,
			getList: [],
			tableData: {
				data: [],
				loading: false,
				param: {
					pageNum: 1,
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
			GetSignUpList(id);
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
			state.projectType = '';
			state.tableData.data = [];
			state.ruleForm = {};
			state.signUpData = [];
			state.signUp = {
				ProjectId: 0,
				LineIds: '',
			};
			state.getList = [];
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
		const select = (selection: Array<object>) => {
			state.getList = selection;
		};
		const selectAll = (selection: Array<object>) => {
			state.getList = selection;
		};
		const onSubmit = async () => {
			state.signUp.LineIds = '';
			let idArry = [];
			if (state.getList && state.getList.length > 0) {
				for (let item of state.getList) {
					idArry.push(item.Id);
				}
				state.signUp.LineIds = idArry.toString();
			}
			try {
				const res = await proxy.$api.erp.projectcompany.signup(state.signUp);
				if (res.errcode != 0) {
					return;
				}
			} finally {
				closeDialog();
			}
		};

		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			activeName,
			handleClick,
			dateFormat,
			onSubmit,
			select,
			selectAll,
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
