<template>
	<el-card v-if="isShowPage">
		<el-row>
			<el-col :span="24">
				<div style="float: right;">
					<el-button type="primary" @click="closeDialog">返回</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-form-item label="工商信息：" prop="No"/>
				<el-descriptions :column="2">
					<el-descriptions-item label="企业全称：">test</el-descriptions-item>
					<el-descriptions-item label="客商编码：">test</el-descriptions-item>
					<el-descriptions-item label="营业执照编码：">test</el-descriptions-item>
					<el-descriptions-item label="登录用户名：">test</el-descriptions-item>
					<el-descriptions-item label="法定代表人：">test</el-descriptions-item>
					<el-descriptions-item label="法定代表人身份证：">test</el-descriptions-item>
					<el-descriptions-item label="注册资金：">test</el-descriptions-item>
					<el-descriptions-item label="币种：">test</el-descriptions-item>
					<el-descriptions-item label="成立日期：">test</el-descriptions-item>
					<el-descriptions-item label="注册地址：">test</el-descriptions-item>
					<el-descriptions-item label="多证合一：">test</el-descriptions-item>
					<el-descriptions-item label="企业机构类型：">test</el-descriptions-item>
					<el-descriptions-item label="纳税人类型：">test</el-descriptions-item>
					<el-descriptions-item label="营业/业务期限：">test</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-form-item label="资质信息：" prop="No"/>
				<el-table :data="lineTableData.data" v-loading="lineTableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-500)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="IssuingAgency" label="供应商类别" width="120" show-overflow-tooltip/>
					<el-table-column prop="IssuingAgency" label="证书名称" width="200" show-overflow-tooltip/>
					<el-table-column prop="IssuingAgency" label="有效期至" width="150" show-overflow-tooltip/>
					<el-table-column prop="CertificateType" label="证件状态" width="100" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.CertificateType == 0">有效</span>
							<span v-else-if="scope.row.CertificateType == 1">过期</span>
						</template>
					</el-table-column>
					<el-table-column prop="Remark" label="证件附件" show-overflow-tooltip/>
				</el-table>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-form-item label="基本信息：" prop="No"/>
				<el-descriptions :column="2">
					<el-descriptions-item label="办公地址：">test</el-descriptions-item>
					<el-descriptions-item label="联系电话：">test</el-descriptions-item>
					<el-descriptions-item label="生产经营地址：">test</el-descriptions-item>
					<el-descriptions-item label="企业邮箱：">test</el-descriptions-item>
					<el-descriptions-item label="官方网址：">test</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-form-item label="联系人信息：" prop="No"/>
				<el-descriptions :column="2">
					<el-descriptions-item label="注册人姓名：">test</el-descriptions-item>
					<el-descriptions-item label="注册人手机号：">test</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
	</el-card>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'enterpriseList',
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_sys_common_enterprise`;
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			moduleKey: moduleKey,
			isShowPage: false,
			kind,
			scopeMode,
			scopeValue,
			ruleForm: {},
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					current: 1,
					size: 20,
				},
			},
			lineTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					id: 0,
					current: 1,
					size: 20,
				},
			},
			imgList: [],
			imgViewerVisible: false,
			imgUrl: import.meta.env.VITE_URL,
		});
		// 页面加载时
		onMounted(() => {
			// onGetTableData(true);
		});

		//表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.current = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.common.enterprise.getList(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.size = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
			onGetTableData();
		};
		// 分页改变
		const onLineHandleCurrentChange = (val: number) => {
			state.lineTableData.param.current = val;
			onGetTableData();
		};
		const onLineHandleSizeChange = (val: number) => {
			state.lineTableData.param.size = val;
			onGetTableData();
		};
		const rowclick = async (model: object) => {
			state.ruleForm = model;
			state.lineTableData.param.id = model.Tid;
			onGetMainTableData(true);
		};
		const onModelSave = async () => {
			if (!state.ruleForm.Id) {
				ElMessage.error('请选择要审核的记录！');
				return;
			}
			ElMessageBox.confirm(`确定要审核这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.common.enterprise.audit(state.ruleForm);
					if (res.errcode != 0) {
						return;
					}
					state.ruleForm.AuditState = 0;
				} finally {
					onGetTableData();
					onGetMainTableData(true);
				}
				return false;
			});
		};
		const onGetMainTableData = async (gotoFirstPage: boolean) => {
			if (gotoFirstPage) {
				state.lineTableData.param.current = 1;
			}
			state.lineTableData.loading = true;
			state.lineTableData.data = [];
			try {
				const res = await proxy.$api.common.certificate.getList(state.lineTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.lineTableData.total = res.total;
				state.lineTableData.data = res.data;
			} finally {
				state.lineTableData.loading = false;
			}
		};
		const showImage = (imgUrl: string) => {
			state.imgList = [];
			if (imgUrl != '' && imgUrl) {
				state.imgViewerVisible = true;
				state.imgList.push(state.imgUrl + imgUrl);
			} else {
				ElMessage.error('暂无影印件');
			}
		};
		const closeImgViewer = () => {
			state.imgViewerVisible = false;
		};
		
		// 打开页面
		const openPage = async () => {
			state.isShowPage = true;
		};
		const closeDialog = async() => {
			state.isShowPage = false
			proxy.$parent.isShowPage = true;
		}
		const { dateFormatYMDHM } = commonFunction();
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			getUserInfos,
			onResetSearch,
			openPage,
			closeDialog,
			onGetTableData,
			onHandleSizeChange,
			onHandleCurrentChange,
			onLineHandleCurrentChange,
			onLineHandleSizeChange,
			showImage,
			closeImgViewer,
			rowclick,
			onGetMainTableData,
			onModelSave,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
	padding: 32px;
	background-color: #f4f5f7;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
