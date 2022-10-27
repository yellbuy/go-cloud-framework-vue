<template>
	<div class="home-container">
		<el-card shadow="hover">
			<view style="float: right">
				<el-button bg type="primary" @click="onModelSave">{{ $t('message.action.submit') }} </el-button>
			</view>
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-divider content-position="left"><span class="text-red mr3">*</span>基本信息</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10"
						><el-form-item label="单位名称" prop="Name" required> <el-input v-model="ruleForm.Name" placeholder="单位名称"></el-input> </el-form-item
					></el-col>

					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位曾用名称" prop="Alias"> <el-input v-model="ruleForm.Alias" placeholder="单位曾用名称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位简称" prop="ShortName"> <el-input v-model="ruleForm.ShortName" placeholder="单位简称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="统一信用代码" prop="Idno" required>
							<el-input v-model="ruleForm.Idno" placeholder="单位统一信用代码证号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="法人姓名" prop="CorporationName" required>
							<el-input v-model="ruleForm.CorporationName" placeholder="法人姓名或名称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="法人身份证号" prop="CorporationIdno" required>
							<el-input v-model="ruleForm.CorporationIdno" placeholder="法人身份证号或统一信用代码"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="法人手机号" prop="CorporationMobile" required>
							<el-input v-model="ruleForm.CorporationMobile" placeholder="法人手机号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="开户银行" prop="BankName" required>
							<el-input v-model="ruleForm.BankName" placeholder="开户银行"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="银行账户" prop="BankNo" required>
							<el-input v-model="ruleForm.BankNo" placeholder="银行账户"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位电话" prop="Tel" required> <el-input v-model="ruleForm.Tel" placeholder="单位电话"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位邮箱" prop="Email" required> <el-input v-model="ruleForm.Email" placeholder="单位邮箱"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位邮编" prop="Zip"> <el-input v-model="ruleForm.BankNo" placeholder="单位邮编"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位传真" prop="Fax"> <el-input v-model="ruleForm.Fax" placeholder="单位传真"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位网址" prop="WebSite"> <el-input v-model="ruleForm.WebSite" placeholder="单位网址"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="注册资金(万元)" prop="RegisteredCapital" required>
							<el-input-number
								v-model="ruleForm.RegisteredCapital"
								style="width: 100%"
								:min="1"
								size="small"
								controls-position="right"
							/> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位规模" prop="MemberNumber" required>
							<el-select v-model="ruleForm.MemberNumber" placeholder="单位规模" style="width: 100%">
								<el-option label="1-9人" value="1"></el-option>
								<el-option label="10-99人" value="10"></el-option>
								<el-option label="100-999人" value="100"></el-option>
								<el-option label="1000人以上" value="1000"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位类型" prop="TaxpayerType" required>
							<el-select v-model="ruleForm.TaxpayerType" placeholder="单位类型" style="width: 100%">
								<el-option label="小规模纳税人" value="1"></el-option>
								<el-option label="一般纳税人" value="2"></el-option>
							</el-select> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="所属行业" prop="Industry"> <el-input v-model="ruleForm.Industry" placeholder="所属行业"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位性质" prop="EnterpriseType">
							<el-input v-model="ruleForm.Industry" placeholder="单位性质"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位简介" prop="EnterpriseProfile">
							<el-input v-model="ruleForm.EnterpriseProfile" placeholder="单位简介"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="注册地址" prop="Address"> <el-input v-model="ruleForm.Address" placeholder="注册地址"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="经营范围" prop="BusinessScope">
							<el-input v-model="ruleForm.BusinessScope" placeholder="经营范围"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="纳税人类型" prop="TaxpayerKind">
							<el-input v-model="ruleForm.TaxpayerKind" placeholder="纳税人类型"></el-input> </el-form-item
					></el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="经营期限" prop="BusinessStartTime" required>
							<el-date-picker
								style="width: 100%"
								v-model="ruleForm.BusinessStartTime"
								type="date"
								placeholder="开始日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="至" prop="BusinessStartTime" required>
							<el-date-picker
								style="width: 100%"
								v-model="ruleForm.BusinessStartTime"
								type="date"
								placeholder="开始日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
						<el-form-item label="公司简介" prop="EnterpriseProfile" required>
							<el-input v-model="ruleForm.EnterpriseProfile" type="textarea" placeholder="公司简介"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
						<el-form-item label="主营业务" prop="PrimaryBusiness">
							<el-input v-model="ruleForm.PrimaryBusiness" type="textarea" placeholder="主营业务"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
						<el-form-item label="业绩简介" prop="AchievementProfile">
							<el-input v-model="ruleForm.AchievementProfile" type="textarea" placeholder="业绩简介"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left"><span class="text-red mr3">*</span>联系人</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10"
						><el-form-item label="姓名" prop="Linkman" required> <el-input v-model="ruleForm.Linkman" placeholder="姓名"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="手机号码" prop="LinkmanMobile" required>
							<el-input v-model="ruleForm.LinkmanMobile" placeholder="手机号码"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="QQ" prop="LinkmanQq"> <el-input v-model="ruleForm.LinkmanQq" placeholder="QQ"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="电子邮箱" prop="LinkmanEmail" required>
							<el-input v-model="ruleForm.LinkmanEmail" placeholder="电子邮箱"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="职务" prop="LinkmanPosition">
							<el-input v-model="ruleForm.LinkmanPosition" placeholder="职务"></el-input> </el-form-item
					></el-col>
				</el-row>
				<el-divider content-position="left"><span class="text-red mr3">*</span>资质文件</el-divider>
				<el-row>
					<el-col :span="24" style="color: red; line-height: 25px"
						>集团外部供应商必须上传一下资质：营业执照（三证合一证件），法定代表人（负责人）身份证明、资信承诺、体系认证证书（生产商提供，不提供视为未获认证）、特种生产或经营许可证（属特种行业，国家规定需生产或经营许可证的供应商，须提供有效期内的生产或经营许可证等），请对照注册资料对照表上传资质文件。<a
							href=""
							>下载注册资料对照表</a
						></el-col
					>
				</el-row>
				<el-row>
					<el-col :span="24" style="color: red; line-height: 25px"
						>请下载资信承诺模板文件并签字盖章上传到资信承诺栏目。<a href="">下载资信承诺模板</a></el-col
					>
				</el-row>
				<el-row>
					<el-col :span="24" style="line-height: 25px">如果一下资质类型中没有你想上传的资质，请选择“其他证书”，并在备注中进行说明。</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" style="line-height: 25px">请将资质文件图片限制在5M之内。</el-col>
				</el-row>
				<view style="float: right">
					<el-button text bg type="primary" @click="tableDataAdd">{{ $t('message.action.certificatAdd') }} </el-button>
				</view>

				<el-table
					:data="tableData.data"
					v-loading="tableData.loading"
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
					<el-table-column prop="IssuingAgency" label="颁发机构" show-overflow-tooltip>
						<template #default="scope">
							<el-input v-model="scope.row.IssuingAgency" placeholder="请输入颁发机构" />
						</template>
					</el-table-column>
					<el-table-column prop="Name" label="颁发日期" show-overflow-tooltip>
						<template #default="scope">
							<el-date-picker
								v-model="scope.row.StartTime"
								type="date"
								placeholder="颁发日期"
								format="YYYY-MM-DD"
								style="width: 100%"
							></el-date-picker>
						</template>
					</el-table-column>
					<el-table-column prop="Name" label="有效日期" show-overflow-tooltip>
						<template #default="scope">
							<el-date-picker v-model="scope.row.EndTime" type="date" placeholder="有效日期" format="YYYY-MM-DD" style="width: 100%"></el-date-picker>
						</template>
					</el-table-column>
					<el-table-column prop="ImgUrl" label="影印件" show-overflow-tooltip align="center">
						<template #default="scope">
							<el-button text type="primary" @click="showImage(scope.row.ImgUrl)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
						<template #default="scope">
							<el-input v-model="scope.row.Remark" />
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
						<template #default="scope">
							<el-upload
								:action="`${baseUrl}/v1/file/upload`"
								name="file"
								:headers="{ Appid: getUserInfos.appid, Authorization: token }"
								:show-file-list="false"
								:on-success="onLogoUploadSuccess"
								:before-upload="onBeforeImageUpload"
							>
								<!-- @click="Upload(scope.row.Id, scope.$index)" -->
								<template #trigger>
									<el-button text bg type="primary" @click="Upload(scope.$index)">
										<el-icon>
											<Upload />
										</el-icon>
										&#8197;{{ $t('message.action.uploadPhotocopy') }}
									</el-button>
								</template>
								<el-button
									text
									bg
									type="danger"
									@click="onModelDel(scope.row.Id, scope.$index)"
									v-if="scope.row.CertificateType != 1 && scope.row.CertificateType != 2 && scope.row.CertificateType != 4"
									v-auth:[moduleKey]="'btn.Del'"
								>
									<el-icon>
										<CloseBold />
									</el-icon>
									&#8197;{{ $t('message.action.delete') }}
								</el-button>
							</el-upload>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30, 50, 100]"
					v-model:current-page="tableData.param.pageNum"
					background
					v-model:page-size="tableData.param.pageSize"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total"
				>
				</el-pagination>
				<el-image-viewer v-if="imgViewerVisible" @close="closeImgViewer" hide-on-click-modal :url-list="imgList" />
			</el-form>
		</el-card>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onActivated, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
export default {
	name: 'admin',
	setup() {
		const moduleKey = 'api_sys_home_identify';
		const router = useRouter();
		const { t } = useI18n();
		console.debug('router', router.currentRoute.value);
		//console.debug("route:",$route)
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const state = reactive({
			moduleKey: moduleKey,
			//表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'supplier',
				CompanyName: '',
				CompanyAlias: '',
				CurrencyType: '人民币',
				BankAccountName: '',
				EsNo: '',
				RegisteredCapital: 1,
				Address: '',
				BusinessEndTime: new Date(),
				BusinessStartTime: new Date(),
				Linkman: '',
				BusinessScope: '',
				State: 1,
				AuditState: 1,
				TaxpayerKind: '',
				WebSite: '',
				Fax: '',
				Im: '',
				CertificateList: [],
			},
			baseUrl: import.meta.env.VITE_API_URL,
			imgUrl: import.meta.env.VITE_URL,
			tableDataIndex: 0,
			modelData: [
				{
					Id: '0',
					CertificateType: 1, //三证合一
				},
				{
					Id: '0',
					CertificateType: 2, //法人身份证明
				},
				{
					Id: '0',
					CertificateType: 4, //承诺书
				},
			], //如果没有添加过，显示3个必要数据 1：统一信用代码证，2：法人身份证明，3：联系人身份证明，4：承诺书，100：其他
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					order: 'id',
					pageNum: 1,
					pageSize: 20,
				},
			},
			imgList: [],
			imgViewerVisible: false,
		});
		const rules = reactive({
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 当前时间提示语
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});

		const loadTenant = async () => {
			console.log(getUserInfos);
			const res = await proxy.$api.common.enterprise.getById(getUserInfos.value.tid);
			if (res.errcode == 0) {
				state.ruleForm = res.data;
			}
		};
		const onGetMainTableData = async (gotoFirstPage: boolean) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				const res = await proxy.$api.common.certificate.getList(state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				if (res.data.length > 0) {
					state.tableData.total = res.total;
					state.tableData.data = res.data;
				} else {
					state.tableData.total = 3;
					state.tableData.data = state.modelData;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const tableDataAdd = () => {
			state.tableData.data.push({
				Id: '0',
				CertificateType: 100,
			});
		};
		const onModelSave = async () => {
			for (let i = 0; i < state.tableData.data.length; i++) {
				let item = state.tableData.data[i];
				if (item.ImgUrl == '') {
					ElMessage.error('第' + (i + 1) + '行没有上传影印件，请上传影印件！');
					return;
				} else if (item.IssuingAgency == '') {
					ElMessage.error('第' + (i + 1) + '行没有填写颁发机构，请输入颁发机构！');
					return;
				} else if (item.StartTime == '') {
					ElMessage.error('第' + (i + 1) + '行没有选择颁发日期，请填写颁发日期！');
					return;
				} else if (item.EndTime == '') {
					ElMessage.error('第' + (i + 1) + '行没有选择有效日期，请填写有效日期！');
					return;
				} else if (item.EndTime <= item.StartTime) {
					ElMessage.error('第' + (i + 1) + '行颁发日期应该小于有效日期！');
					return;
				}
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.common.certificate.save(JSON.parse(JSON.stringify(state.tableData.data)));
				if (res.errcode != 0) {
					return;
				}
				onGetMainTableData(true);
			} finally {
				state.tableData.loading = false;
			}
		};
		const onModelDel = async (id: number, index: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				if (id != 0) {
					try {
						const res = await proxy.$api.common.certificate.delete(id);
						if (res.errcode != 0) {
							return;
						}
					} finally {
					}
				}
				state.tableData.data.splice(index, 1);
				return false;
			});
		};
		const onLogoUploadSuccess: UploadProps['onSuccess'] = (res) => {
			if (res.errcode != 0) {
				state.tableData.loading = false;
				ElMessage.error(res.errmsg);
				return;
			}
			state.tableData.data[state.tableDataIndex].ImgUrl = res.data.src;
			state.tableData.loading = false;
		};
		const onBeforeImageUpload: UploadProps['beforeUpload'] = () => {
			state.tableData.loading = true;
			return true;
		};
		const Upload = (index: number) => {
			state.tableDataIndex = index;
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
		// 页面加载时
		onMounted(() => {
			loadTenant();
			onGetMainTableData(true);
		});
		// 由于页面缓存原因，keep-alive
		onActivated(() => {});

		return {
			proxy,
			rules,
			getUserInfos,
			Upload,
			onBeforeImageUpload,
			tableDataAdd,
			onModelDel,
			onModelSave,
			showImage,
			closeImgViewer,
			onLogoUploadSuccess,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
@import '../../chart/chart.scss';
.home-container {
	overflow-x: hidden;
	.home-card-item {
		width: 100%;
		height: 150px;
		background: var(--el-text-color-secondary);
		border-radius: 4px;
		transition: all ease 0.3s;
		&:hover {
			box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
			transition: all ease 0.3s;
		}
	}
	.home-card-item-box {
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		&:hover {
			i {
				right: 0px !important;
				bottom: 0px !important;
				transition: all ease 0.3s;
			}
		}
		i {
			position: absolute;
			right: -10px;
			bottom: -10px;
			font-size: 70px;
			transform: rotate(-30deg);
			transition: all ease 0.3s;
		}
		.home-card-item-flex {
			padding: 0 20px;
			color: var(--color-whites);
			.home-card-item-title,
			.home-card-item-tip {
				font-size: 13px;
			}
			.home-card-item-title-num {
				font-size: 18px;
			}
			.home-card-item-tip-num {
				font-size: 13px;
			}
		}
	}
	.home-card-first {
		background: var(--el-color-white);
		border: 1px solid var(--el-border-color-light, #ebeef5);
		display: flex;
		align-items: center;
		img {
			width: 80px;
			height: 80px;
			border-radius: 100%;
			border: 2px solid var(--color-primary-light-5);
		}
		.home-card-first-right {
			flex: 1;
			display: flex;
			flex-direction: column;
			.home-card-first-right-title {
				color: var(--el-color-black);
			}
			.home-card-first-right-msg {
				font-size: 13px;
				color: var(--el-text-color-secondary);
			}
		}
	}
	.home-monitor {
		height: 200px;
		.flex-warp-item {
			width: 50%;
			height: 100px;
			display: flex;
			.flex-warp-item-box {
				margin: auto;
				height: auto;
				text-align: center;
				color: var(--el-text-color-primary);
			}
		}
	}
	.home-warning-card {
		height: 292px;
		::v-deep(.el-card) {
			height: 100%;
		}
	}
	.home-dynamic {
		height: 200px;
		.home-dynamic-item {
			display: flex;
			width: 100%;
			height: 60px;
			overflow: hidden;
			&:first-of-type {
				.home-dynamic-item-line {
					i {
						color: orange !important;
					}
				}
			}
			.home-dynamic-item-left {
				text-align: right;
				.home-dynamic-item-left-time1 {
				}
				.home-dynamic-item-left-time2 {
					font-size: 13px;
					color: var(--el-text-color-secondary);
				}
			}
			.home-dynamic-item-line {
				height: 60px;
				border-right: 2px dashed var(--el-border-color-light, #ebeef5);
				margin: 0 20px;
				position: relative;
				i {
					color: var(--color-primary);
					font-size: 12px;
					position: absolute;
					top: 1px;
					left: -6px;
					transform: rotate(46deg);
					background: var(--el-color-white);
				}
			}
			.home-dynamic-item-right {
				flex: 1;
				.home-dynamic-item-right-title {
					i {
						margin-right: 5px;
						border: 1px solid var(--el-border-color-light, #ebeef5);
						width: 20px;
						height: 20px;
						border-radius: 100%;
						padding: 3px 2px 2px;
						text-align: center;
						color: var(--color-primary);
					}
				}
				.home-dynamic-item-right-label {
					font-size: 13px;
					color: var(--el-text-color-secondary);
				}
			}
		}
	}
}
</style>
