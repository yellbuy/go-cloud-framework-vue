<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-row :gutter="10">
				<el-col :span="10"
					><div class="grid-content ep-bg-purple" />
					<div class="">
						<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
							<el-form-item :label="'关键字：'">
								<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="info" @click="onResetSearch">
									<el-icon>
										<RefreshLeft />
									</el-icon>
									&#8197;{{ $t('message.action.reset') }}
								</el-button>
								<el-button type="info" @click="onGetTableData(true)">
									<el-icon>
										<Search />
									</el-icon>
									&#8197;{{ $t('message.action.search') }}
								</el-button>
							</el-form-item>
							<el-form-item> </el-form-item>
						</el-form>
					</div>
					<el-table
						:data="tableData.data"
						style="width: 100%"
						v-loading="tableData.loading"
						:height="proxy.$calcMainHeight(-75)"
						border
						stripe
						highlight-current-row
						@row-click="rowclick"
					>
						<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
						<el-table-column prop="Idno" width="120" label="统一信用代码证号" show-overflow-tooltip />
						<el-table-column prop="Name" width="180" label="公司名称" show-overflow-tooltip />
						<el-table-column prop="ShortName" width="120" label="公司简称" show-overflow-tooltip />
						<el-table-column prop="Linkman" width="80" label="联系人名称" show-overflow-tooltip />
						<el-table-column prop="LinkmanMobile" width="120" label="联系人手机号" show-overflow-tooltip />
						<el-table-column prop="AuditTime" width="120" :formatter="dateFormatYMDHM" label="审核时间" show-overflow-tooltip />
						<el-table-column prop="AuditBy" width="120" label="审核人" show-overflow-tooltip />
						<el-table-column fixed="right" prop="AuditState" width="120" label="审核状态" show-overflow-tooltip>
							<template #default="scope">
								<el-tag type="success" style="margin-right: 10px" effect="plain" v-if="scope.row.AuditState == 0">已审核</el-tag>
								<el-tag type="danger" style="margin-right: 10px" effect="plain" v-else>未审核</el-tag>
							</template>
						</el-table-column>
						<el-table-column fixed="right" prop="State" label="状态" width="80" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-switch
									v-model="scope.row.State"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.TableEdit'"
									@change="proxy.$api.common.table.updateById('common_enterprise', 'State', scope.row.Id, scope.row.State)"
									:active-text="$t('message.action.enable')"
									:inactive-text="$t('message.action.disable')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.EnterpriseEdit'">{{
									$t('message.action.enable')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.EnterpriseEdit'">{{ $t('message.action.disable') }}</el-tag>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onHandleSizeChange"
						@current-change="onHandleCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30]"
						v-model:current-page="tableData.param.pageNum"
						background
						v-model:page-size="tableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="tableData.total"
					>
					</el-pagination
				></el-col>
				<el-col :span="14"
					><div class="grid-content ep-bg-purple-light" />
					<view style="float: right">
						<el-tag type="info" style="margin-right: 10px" effect="plain" v-if="ruleForm.Id == 0">未认证</el-tag>
						<el-tag type="success" style="margin-right: 10px" effect="plain" v-else-if="ruleForm.AuditState == 0">已审核</el-tag>
						<el-tag type="danger" style="margin-right: 10px" effect="plain" v-else>未审核</el-tag>
						<el-button bg type="primary" @click="onModelSave">{{ $t('message.action.submit') }} </el-button>
					</view>
					<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
						<el-divider content-position="left"><span class="text-red mr3">*</span>基本信息</el-divider>
						<el-row :gutter="10">
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10"
								><el-form-item label="单位名称" prop="Name" required>
									<el-input v-model="ruleForm.Name" placeholder="单位名称" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位曾用名称" prop="Alias">
									<el-input v-model="ruleForm.Alias" placeholder="单位曾用名称" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位简称" prop="ShortName">
									<el-input v-model="ruleForm.ShortName" placeholder="单位简称" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="统一信用代码" prop="Idno" required>
									<el-input v-model="ruleForm.Idno" placeholder="单位统一信用代码证号" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="法人姓名" prop="CorporationName" required>
									<el-input v-model="ruleForm.CorporationName" placeholder="法人姓名或名称" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="法人身份证号" prop="CorporationIdno" required>
									<el-input v-model="ruleForm.CorporationIdno" placeholder="法人身份证号或统一信用代码" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="法人手机号" prop="CorporationMobile" required>
									<el-input v-model="ruleForm.CorporationMobile" placeholder="法人手机号" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="开户银行" prop="BankName" required>
									<el-input v-model="ruleForm.BankName" placeholder="开户银行" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="银行账户" prop="BankNo" required>
									<el-input v-model="ruleForm.BankNo" placeholder="银行账户" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位电话" prop="Tel" required>
									<el-input v-model="ruleForm.Tel" placeholder="单位电话" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位邮箱" prop="Email" required>
									<el-input v-model="ruleForm.Email" placeholder="单位邮箱" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位邮编" prop="Zip"> <el-input v-model="ruleForm.Zip" placeholder="单位邮编" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位传真" prop="Fax"> <el-input v-model="ruleForm.Fax" placeholder="单位传真" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位网址" prop="WebSite">
									<el-input v-model="ruleForm.WebSite" placeholder="单位网址" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="注册资金(万元)" prop="RegisteredCapital" required>
									<el-input-number
										v-model="ruleForm.RegisteredCapital"
										style="width: 100%"
										:min="1"
										size="small"
										controls-position="right"
										disabled
									/> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位规模" prop="MemberNumber" required>
									<el-select v-model="ruleForm.MemberNumber" placeholder="单位规模" style="width: 100%" disabled>
										<el-option label="请选择" :value="0"></el-option>
										<el-option label="1-9人" :value="1"></el-option>
										<el-option label="10-99人" :value="10"></el-option>
										<el-option label="100-999人" :value="100"></el-option>
										<el-option label="1000人以上" :value="1000"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位类型" prop="TaxpayerType" required>
									<el-select v-model="ruleForm.TaxpayerType" placeholder="单位类型" style="width: 100%" disabled>
										<el-option label="请选择" :value="0"></el-option>
										<el-option label="小规模纳税人" :value="1"></el-option>
										<el-option label="一般纳税人" :value="2"></el-option>
									</el-select> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="所属行业" prop="Industry">
									<el-input v-model="ruleForm.Industry" placeholder="所属行业" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="单位性质" prop="EnterpriseType">
									<el-input v-model="ruleForm.Industry" placeholder="单位性质" disabled></el-input> </el-form-item
							></el-col>
							<!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位简介" prop="EnterpriseProfile">
							<el-input v-model="ruleForm.EnterpriseProfile" placeholder="单位简介"></el-input> </el-form-item
					></el-col> -->
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="注册地址" prop="Address">
									<el-input v-model="ruleForm.Address" placeholder="注册地址" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="经营范围" prop="BusinessScope">
									<el-input v-model="ruleForm.BusinessScope" placeholder="经营范围" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="纳税人类型" prop="TaxpayerKind">
									<el-input v-model="ruleForm.TaxpayerKind" placeholder="纳税人类型" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="经营期限" prop="BusinessStartTime" required>
									<el-date-picker
										style="width: 100%"
										v-model="ruleForm.BusinessStartTime"
										type="date"
										placeholder="开始日期"
										format="YYYY-MM-DD"
										disabled
									></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="至" prop="BusinessEndTime" required>
									<el-date-picker
										style="width: 100%"
										v-model="ruleForm.BusinessEndTime"
										type="date"
										placeholder="结束日期"
										format="YYYY-MM-DD"
										disabled
									></el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="20">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
								<el-form-item label="公司简介" prop="EnterpriseProfile" required>
									<el-input v-model="ruleForm.EnterpriseProfile" type="textarea" placeholder="公司简介" disabled></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
								<el-form-item label="主营业务" prop="PrimaryBusiness">
									<el-input v-model="ruleForm.PrimaryBusiness" type="textarea" placeholder="主营业务" disabled></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
								<el-form-item label="业绩简介" prop="AchievementProfile">
									<el-input v-model="ruleForm.AchievementProfile" type="textarea" placeholder="业绩简介" disabled></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left"><span class="text-red mr3">*</span>联系人</el-divider>
						<el-row :gutter="20">
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10"
								><el-form-item label="姓名" prop="Linkman" required>
									<el-input v-model="ruleForm.Linkman" placeholder="姓名" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="手机号码" prop="LinkmanMobile" required>
									<el-input v-model="ruleForm.LinkmanMobile" placeholder="手机号码" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="QQ" prop="LinkmanQq"> <el-input v-model="ruleForm.LinkmanQq" placeholder="QQ" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="电子邮箱" prop="LinkmanEmail" required>
									<el-input v-model="ruleForm.LinkmanEmail" placeholder="电子邮箱" disabled></el-input> </el-form-item
							></el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
								<el-form-item label="职务" prop="LinkmanPosition">
									<el-input v-model="ruleForm.LinkmanPosition" placeholder="职务" disabled></el-input> </el-form-item
							></el-col>
						</el-row>
						<el-divider content-position="left"><span class="text-red mr3">*</span>资质文件</el-divider>
						<el-table
							:data="lineTableData.data"
							v-loading="lineTableData.loading"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-500)"
							border
							stripe
							highlight-current-row
						>
							<el-table-column type="index" label="序号" align="right" width="70" fixed />
							<el-table-column prop="CertificateType" label="资质类型" show-overflow-tooltip fixed>
								<template #default="scope">
									<span v-if="scope.row.CertificateType == 1">营业执照（三证合一证件）</span>
									<span v-else-if="scope.row.CertificateType == 2">法定代表人（负责人）身份证明</span>
									<span v-else-if="scope.row.CertificateType == 4">资信承诺</span>
									<span v-else-if="scope.row.CertificateType == 100">其他类相关资质</span>
								</template>
							</el-table-column>
							<el-table-column prop="IssuingAgency" label="颁发机构" show-overflow-tooltip> </el-table-column>
							<el-table-column prop="StartTime" label="颁发日期" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>
							<el-table-column prop="EndTime" label="有效日期" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>
							<el-table-column prop="ImgUrl" label="影印件" show-overflow-tooltip align="center">
								<template #default="scope">
									<el-button text type="primary" @click="showImage(scope.row.ImgUrl)">查看</el-button>
								</template>
							</el-table-column>
							<el-table-column prop="Remark" label="备注" show-overflow-tooltip> </el-table-column>
						</el-table>
						<el-pagination
							small
							@size-change="onLineHandleSizeChange"
							@current-change="onLineHandleCurrentChange"
							class="mt15"
							:page-sizes="[10, 20, 30, 50, 100]"
							v-model:current-page="lineTableData.param.pageNum"
							background
							v-model:page-size="lineTableData.param.pageSize"
							layout="->, total, sizes, prev, pager, next, jumper"
							:total="lineTableData.total"
						>
						</el-pagination>
						<el-image-viewer v-if="imgViewerVisible" @close="closeImgViewer" hide-on-click-modal :url-list="imgList" />
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
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
					pageNum: 1,
					pageSize: 20,
				},
			},
			lineTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					id: 0,
					pageNum: 1,
					pageSize: 20,
				},
			},
			imgList: [],
			imgViewerVisible: false,
			imgUrl: import.meta.env.VITE_URL,
		});
		// 页面加载时
		onMounted(() => {
			onGetTableData(true);
		});

		//表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
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
			state.tableData.param.name = '';
			onGetTableData(true);
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};
		// 分页改变
		const onLineHandleCurrentChange = (val: number) => {
			state.lineTableData.param.pageNum = val;
			onGetTableData();
		};
		const onLineHandleSizeChange = (val: number) => {
			state.lineTableData.param.pageSize = val;
			onGetTableData();
		};
		const rowclick = async (model: object) => {
			state.ruleForm = model;
			state.lineTableData.param.id = model.Tid;
			onGetMainTableData(true);
		};
		const onGetMainTableData = async (gotoFirstPage: boolean) => {
			if (gotoFirstPage) {
				state.lineTableData.param.pageNum = 1;
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
		const { dateFormatYMDHM } = commonFunction();
		return {
			getUserInfos,
			onResetSearch,
			onGetTableData,
			onHandleSizeChange,
			onHandleCurrentChange,
			onLineHandleCurrentChange,
			onLineHandleSizeChange,
			showImage,
			closeImgViewer,
			rowclick,
			onGetMainTableData,
			proxy,
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
