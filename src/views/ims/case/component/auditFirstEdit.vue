<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-card shadow="hover" header="基本信息">
					<el-row>
						<el-col :span="24">
							<el-row>
								<el-col :xs="24" :sm="12" :md="6" :lg="5" class="base-info mb6">
									<div class="base-info-label">报案号：</div>
									<div class="base-info-value">{{ruleForm.CaseNo}}</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="6" :lg="7" class="base-info mb6">
									<div class="base-info-label">委托单位：</div>
									<div class="base-info-value">{{ruleForm.TName}}</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="6" :lg="4" class="base-info mb6">
									<div class="base-info-label">委托人：</div>
									<div class="base-info-value">{{ruleForm.UName}}</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="6" :lg="6" class="base-info mb6">
									<div class="base-info-label">委托时间：</div>
									<div class="base-info-value">{{ruleForm.CaseCreateTime=='0001-01-01 00:00:00'?'-':ruleForm.CaseCreateTime}}</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :xs="24" :sm="12" :md="6" :lg="5" class="base-info">
									<div class="base-info-label">伤者姓名：</div>
									<div class="base-info-value">{{ruleForm.PersonName}}</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="6" :lg="7" class="base-info">
									<div class="base-info-label">联系电话：</div>
									<div class="base-info-value">{{ruleForm.PersonTel}}</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="6" :lg="4" class="base-info">
									<div class="base-info-label">性别：</div>
									<div class="base-info-value">{{ruleForm.PersonGender==1?'男':ruleForm.PersonGender==2?'女':'-'}}</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="6" :lg="4" class="base-info">
									<div class="base-info-label">年龄：</div>
									<div class="base-info-value">{{ruleForm.PersonAge}}</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="6" :lg="4" class="base-info">
									<div class="base-info-label">民族：</div>
									<div class="base-info-value">{{ruleForm.PersonNation}}</div>
								</el-col>
								
							</el-row>
						</el-col>
					</el-row>
				</el-card>
				<el-card shadow="hover" class="mt15" header="简要案情">
					<el-row>
						<el-col :span="24" >
							<div class="base-info-text">{{ruleForm.CaseContent}}</div>
						</el-col>
					</el-row>
				</el-card>
				<el-row>
				<!-- 营销推荐 -->
				

				<!-- 更新信息 -->
				<el-col :span="24">
					<el-card shadow="hover" class="mt15 personal-edit" header="更新信息">
						<div class="personal-edit-title">基本信息</div>
						<el-form :model="ruleForm" size="small" label-width="40px" class="mt35 mb35">
							<el-row :gutter="35">
								<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
									<el-form-item label="昵称">
										<el-input v-model="ruleForm.name" placeholder="请输入昵称" clearable></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
									<el-form-item label="邮箱">
										<el-input v-model="ruleForm.email" placeholder="请输入邮箱" clearable></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
									<el-form-item label="签名">
										<el-input v-model="ruleForm.autograph" placeholder="请输入签名" clearable></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
									<el-form-item label="职业">
										<el-select v-model="ruleForm.occupation" placeholder="请选择职业" clearable class="w100">
											<el-option label="计算机 / 互联网 / 通信" value="1"></el-option>
											<el-option label="生产 / 工艺 / 制造" value="2"></el-option>
											<el-option label="医疗 / 护理 / 制药" value="3"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
									<el-form-item label="手机">
										<el-input v-model="ruleForm.phone" placeholder="请输入手机" clearable></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
									<el-form-item label="性别">
										<el-select v-model="ruleForm.sex" placeholder="请选择性别" clearable class="w100">
											<el-option label="男" value="1"></el-option>
											<el-option label="女" value="2"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
									<el-form-item>
										<el-button type="primary">
											<el-icon>
												<elementPosition />
											</el-icon>
											更新个人信息
										</el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						<div class="personal-edit-title mb15">账号安全</div>
						<div class="personal-edit-safe-box">
							<div class="personal-edit-safe-item">
								<div class="personal-edit-safe-item-left">
									<div class="personal-edit-safe-item-left-label">账户密码</div>
									<div class="personal-edit-safe-item-left-value">当前密码强度：强</div>
								</div>
								<div class="personal-edit-safe-item-right">
									<el-button type="text">立即修改</el-button>
								</div>
							</div>
						</div>
						<div class="personal-edit-safe-box">
							<div class="personal-edit-safe-item">
								<div class="personal-edit-safe-item-left">
									<div class="personal-edit-safe-item-left-label">密保手机</div>
									<div class="personal-edit-safe-item-left-value">已绑定手机：132****4108</div>
								</div>
								<div class="personal-edit-safe-item-right">
									<el-button type="text">立即修改</el-button>
								</div>
							</div>
						</div>
						<div class="personal-edit-safe-box">
							<div class="personal-edit-safe-item">
								<div class="personal-edit-safe-item-left">
									<div class="personal-edit-safe-item-left-label">密保问题</div>
									<div class="personal-edit-safe-item-left-value">已设置密保问题，账号安全大幅度提升</div>
								</div>
								<div class="personal-edit-safe-item-right">
									<el-button type="text">立即设置</el-button>
								</div>
							</div>
						</div>
						<div class="personal-edit-safe-box">
							<div class="personal-edit-safe-item">
								<div class="personal-edit-safe-item-left">
									<div class="personal-edit-safe-item-left-label">绑定QQ</div>
									<div class="personal-edit-safe-item-left-value">已绑定QQ：110****566</div>
								</div>
								<div class="personal-edit-safe-item-right">
									<el-button type="text">立即设置</el-button>
								</div>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.AuditEdit']">{{ $t('message.action.save') }}</el-button>
					
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'baseUserEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title:t('message.action.add'),
			loading:false,
			ruleForm: {
				Id:0,
				Username: '', // 账户名称
				Name: '', // 用户昵称
				Code:'',
				Enable:1,
				Order: 100, // 排序
				Password:'',
				PasswordConfirm:'',
				Mobile:'',
				Tel:'',
				Email:'',
				Addrcode:'',
				RoleIds:'',
				CheckedRoleList:[],
				RoleList:[],
				AllowBackendLogin:1,
				AllowFrontendLogin:1,
				IsExternal:0,
				department: [], // 部门
				Gender: 0 // 性别
			},
			deptData: [], // 部门数据
		});

		const rules = reactive({
			Username: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 50,
					message: t('message.validRule.lengthRange',{'min':1,'max':50}),
					trigger: 'change',
				},
			]
		});

		// 打开弹窗
		const openDialog = (row: Object) => {
			const model = JSON.parse(JSON.stringify(row))
			state.ruleForm = model;
			if(row && row.Id>0){
				state.title=t('message.action.audit');
			}else{
				state.title=t('message.action.audit');
				state.ruleForm.Id=0;
				state.ruleForm.Enable=1;
				state.ruleForm.Order=100;
				state.ruleForm.AllowBackendLogin=1;
				state.ruleForm.AllowFrontendLogin=1;
			}
			state.isShowDialog = true;

			//加载角色数据
			onInitRoleData(row.RoleIds||"");
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = (isCloseDlg:boolean) => {
			state.loading=true;
			proxy.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					const url=state.ruleForm.Id>0?`/v1/base/user/${state.ruleForm.Id}`:`/v1/base/user`;
					state.ruleForm.Id=state.ruleForm.Id.toString();
					state.ruleForm.Order=Number.parseInt(state.ruleForm.Order||0);
					state.ruleForm.RoleIds=state.ruleForm.CheckedRoleList.join(",");
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					}).then((res)=>{
						state.loading=false;
						if(res.errcode==0){
							if(isCloseDlg){
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id=0;
								state.ruleForm.PasswordConfirm='';
							}
							proxy.$parent.onGetTableData();
						}
					}).catch((err)=>{
						state.loading=false;
					});
					return false;
				} else {
					return false;
				}
			});
		};
		//加载角色数据
		const onInitRoleData=((roleIds:string)=>{
			
			state.ruleForm.RoleList=[];
			state.ruleForm.CheckedRoleList=[];
			//加载权限数据
			request({
				url: `v1/base/roles`,
				method: 'get',
				params:{pageSize:1000000}
			}).then((res)=>{
				if(res.errcode!=0){
					return;
				}
				
				const roleIdArr=roleIds.split(",");
				for (const val of res.data) {
					val.Checked=false;
					for(const id of roleIdArr){
						if(val.Id==id){
							state.ruleForm.CheckedRoleList.push(val.Id)
							val.Checked=true
							break;
						}
					}
				}
				state.ruleForm.RoleList=res.data;
			})
		})

		// 初始化部门数据
		const initTableData = () => {
			state.deptData.push({
				deptName: 'vueNextAdmin',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Number.parseInt(Math.random()),
				describe: '顶级部门',
				id: Math.random(),
				children: [
					{
						deptName: 'IT外包服务',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Number.parseInt(Math.random()),
						describe: '总部',
						id: Math.random(),
					},
					{
						deptName: '资本控股',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Number.parseInt(Math.random()),
						describe: '分部',
						id: Math.random(),
					},
				],
			});
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			t,
			openDialog,
			closeDialog,
			onCancel,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
@import '../../../../theme/mixins/mixins.scss';
.base-info {
	display: flex;
	align-items: center;
	font-size: 13px;
	
}
.base-info-label {
	width:70px;
	text-align: right;
	color: var(--el-text-color-secondary);
	@include text-ellipsis(1);
}
.base-info-value {
	text-align: left;
}
.base-info-text {
	color: var(--el-text-color-secondary);
}

.personal {
	.personal-user {
		height: 130px;
		display: flex;
		align-items: center;
		.personal-user-left {
			width: 100px;
			height: 130px;
			border-radius: 3px;
			::v-deep(.el-upload) {
				height: 100%;
			}
			.personal-user-left-upload {
				img {
					width: 100%;
					height: 100%;
					border-radius: 3px;
				}
				&:hover {
					img {
						animation: logoAnimation 0.3s ease-in-out;
					}
				}
			}
		}
		.personal-user-right {
			flex: 1;
			padding: 0 15px;
			.personal-title {
				font-size: 18px;
				@include text-ellipsis(1);
			}
			
		}
	}
	.personal-info {
		.personal-info-more {
			float: right;
			color: var(--el-text-color-secondary);
			font-size: 13px;
			&:hover {
				color: var(--color-primary);
				cursor: pointer;
			}
		}
		.personal-info-box {
			height: 130px;
			overflow: hidden;
			.personal-info-ul {
				list-style: none;
				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;
					.personal-info-li-title {
						display: inline-block;
						@include text-ellipsis(1);
						color: var(--el-text-color-secondary);
						text-decoration: none;
					}
					& a:hover {
						color: var(--color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}
	.personal-recommend-row {
		.personal-recommend-col {
			.personal-recommend {
				position: relative;
				height: 100px;
				color: var(--color-whites);
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;
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
				.personal-recommend-auto {
					padding: 15px;
					position: absolute;
					left: 0;
					top: 5%;
					.personal-recommend-msg {
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
	.personal-edit {
		.personal-edit-title {
			position: relative;
			padding-left: 10px;
			color: var(--el-text-color-regular);
			&::after {
				content: '';
				width: 2px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background: var(--color-primary);
			}
		}
		.personal-edit-safe-box {
			border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
			padding: 15px 0;
			.personal-edit-safe-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.personal-edit-safe-item-left {
					flex: 1;
					overflow: hidden;
					.personal-edit-safe-item-left-label {
						color: var(--el-text-color-regular);
						margin-bottom: 5px;
					}
					.personal-edit-safe-item-left-value {
						color: var(--el-text-color-secondary);
						@include text-ellipsis(1);
						margin-right: 15px;
					}
				}
			}
			&:last-of-type {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}
}
</style>
