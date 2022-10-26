<template>
	<div class="home-container">
		<el-card shadow="hover">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-divider content-position="left"><span class="text-red mr3">*</span>基本信息</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10"
						><el-form-item label="单位名称" prop="Name"> <el-input v-model="ruleForm.Name" placeholder="单位名称"></el-input> </el-form-item
					></el-col>

					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位曾用名称" prop="Alias"> <el-input v-model="ruleForm.Alias" placeholder="单位曾用名称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位简称" prop="ShortName"> <el-input v-model="ruleForm.ShortName" placeholder="单位简称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="统一信用代码" prop="Idno">
							<el-input v-model="ruleForm.Idno" placeholder="单位统一信用代码证号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="法人姓名" prop="CorporationName">
							<el-input v-model="ruleForm.CorporationName" placeholder="法人姓名或名称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="法人身份证号" prop="CorporationIdno">
							<el-input v-model="ruleForm.CorporationIdno" placeholder="法人身份证号或统一信用代码"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="法人手机号" prop="CorporationMobile">
							<el-input v-model="ruleForm.CorporationMobile" placeholder="法人手机号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="开户银行" prop="BankName"> <el-input v-model="ruleForm.BankName" placeholder="开户银行"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="银行账户" prop="BankNo"> <el-input v-model="ruleForm.BankNo" placeholder="银行账户"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位电话" prop="Tel"> <el-input v-model="ruleForm.Tel" placeholder="单位电话"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位邮箱" prop="Email"> <el-input v-model="ruleForm.Email" placeholder="单位邮箱"></el-input> </el-form-item
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
						<el-form-item label="注册资金" prop="RegisteredCapital">
							<el-input v-model="ruleForm.RegisteredCapital" placeholder="注册资金"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位规模" prop="MemberNumber">
							<el-input v-model="ruleForm.MemberNumber" placeholder="单位规模"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位类型" prop="TaxpayerType">
							<el-input v-model="ruleForm.TaxpayerType" placeholder="单位类型"></el-input> </el-form-item
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
							<el-date-picker v-model="ruleForm.BusinessStartTime" type="date" placeholder="开始日期" format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="至" prop="BusinessStartTime" required>
							<el-date-picker v-model="ruleForm.BusinessStartTime" type="date" placeholder="开始日期" format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left"><span class="text-red mr3">*</span>联系人</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10"
						><el-form-item label="姓名" prop="Linkman"> <el-input v-model="ruleForm.Linkman" placeholder="姓名"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="手机号码" prop="LinkmanMobile">
							<el-input v-model="ruleForm.LinkmanMobile" placeholder="手机号码"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="电子邮箱" prop="LinkmanEmail">
							<el-input v-model="ruleForm.LinkmanEmail" placeholder="电子邮箱"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="职务" prop="LinkmanPosition">
							<el-input v-model="ruleForm.LinkmanPosition" placeholder="职务"></el-input> </el-form-item
					></el-col>
				</el-row>
				<el-divider content-position="left"><span class="text-red mr3">*</span>资质文件</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10"
						><el-form-item label="单位名称" prop="Name"> <el-input v-model="ruleForm.Name" placeholder="单位名称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位简称" prop="ShortName"> <el-input v-model="ruleForm.ShortName" placeholder="单位简称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="单位曾用名" prop="Alias"> <el-input v-model="ruleForm.Alias" placeholder="单位曾用名"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="统一信用代码" prop="Idno">
							<el-input v-model="ruleForm.Idno" placeholder="单位统一信用代码证号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="货币类型" prop="CurrencyType">
							<el-input v-model="ruleForm.CurrencyType" placeholder="货币类型"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="开户人" prop="BankAccountName">
							<el-input v-model="ruleForm.BankAccountName" placeholder="开户人"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="注册地址" prop="Address"> <el-input v-model="ruleForm.Address" placeholder="注册地址"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="经营范围" prop="BusinessScope">
							<el-input v-model="ruleForm.BusinessScope" placeholder="经营范围"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="经营期限" prop="BusinessStartTime" required>
							<el-date-picker v-model="ruleForm.BusinessStartTime" type="date" placeholder="开始日期" format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb10">
						<el-form-item label="至" prop="BusinessStartTime" required>
							<el-date-picker v-model="ruleForm.BusinessStartTime" type="date" placeholder="开始日期" format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onActivated, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
export default {
	name: 'admin',
	setup() {
		const moduleKey = 'api_sys_home_alias';
		const router = useRouter();
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
				CompanyCategoryList: [],
			},
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
			const res = await proxy.$api.base.tenant.getById(getUserInfos.value.tid);
			if (res.errcode == 0) {
				state.ruleForm = res.data;
			}
		};

		// 页面加载时
		onMounted(() => {
			loadTenant();
		});
		// 由于页面缓存原因，keep-alive
		onActivated(() => {});

		return {
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
