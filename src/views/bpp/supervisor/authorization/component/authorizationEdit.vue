<template>
	<div>
		<el-dialog :title="title" v-model="isShowDialog" width="50%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-row :gutter="10">
					<el-col :span="24" class="mb20">
						<div>您确定需要将以下项目的监审授权给授权人（吴xx）？</div>
					</el-col>
					<el-col :span="24" class="mb20">
						<div>项目编号：test</div>
					</el-col>
					<el-col :span="24" class="mb20">
						<div>项目名称：xx集团网络设备科xx项目招标公告</div>
					</el-col>
					<el-col :span="24" class="mb20">
						<div>被授权人（吴xx）将获得该项目的所有监审权限，包括签章评标报告</div>
					</el-col>
					<el-col :span="24" class="mb20">
						<div>点击确认后，该项目将从您的代办项目中移除，账号也将登出系统！</div>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="info" @click="onCancel">取消</el-button>
					<el-button type="primary" @click="" :loading="loading" >确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import request from '/@/utils/request';
import { computed, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { Session } from '/@/utils/storage';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
export default {
	name: 'baseUserEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const token = Session.get('token');
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const route = useRoute();
		const store = useStore();
		const state = reactive({
			isShowDialog: false,
			title: '监审授权',
			loading: false,
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			Files: [],
			homeBaseUrl: import.meta.env.VITE_URL as any,
			baseUrl: import.meta.env.VITE_API_URL,
			dialogImageUrl: [],
			dialogTitle: '',
			dialogVisible: false,
			FilesList: [],
			token: token,
			ruleForm: {
				Id: 0,
				Account: '', // 账户名称
				Name: '', // 用户昵称
				Code: '',
				Enable: 1,
				Order: 100, // 排序
				Password: '',
				PasswordConfirm: '',
				Mobile: '',
				Tel: '',
				Email: '',
				Addrcode: '',
				RoleIds: '',
				CheckedRoleList: [],
				RoleList: [],
				AllowBackendLogin: 1,
				AllowFrontendLogin: 1,
				IsExternal: 0,
				Parentid: '',
				Vip: 0,
				department: [], // 部门
				Gender: 0, // 性别
			},
			UParentid: '',
			deptData: [], // 部门数据
			userData: [],
			IsState: route.query.hasParentid,
		});

		const rules = reactive({
			Account: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 50,
					message: t('message.validRule.lengthRange', { min: 1, max: 50 }),
					trigger: 'change',
				},
			],
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Mobile: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (row: Object, IsState: string, vip: number) => {
			// state.loading = false;
			// console.log('vip', vip);
			// const model = JSON.parse(JSON.stringify(row));
			// state.ruleForm = model;
			// if (row && row.Id > 0) {
			// 	state.title = t('message.action.edit');
			// 	state.UParentid = row.Parentid;
			// } else {
			// 	state.title = t('message.action.add');
			// 	state.ruleForm.Id = 0;
			// 	state.ruleForm.Enable = 1;
			// 	state.ruleForm.Order = 100;
			// 	state.ruleForm.AllowBackendLogin = 1;
			// 	state.ruleForm.AllowFrontendLogin = 1;
			// 	state.UParentid = '';
			// 	state.ruleForm.Vip = 0;
			// }
			// if (vip > 0) {
			// 	state.ruleForm.IsExternal = 1;
			// 	state.ruleForm.Vip = vip;
			// }
			state.isShowDialog = true;
			// if (state.IsState) {
			// 	getLoadData();
			// }
			// //加载角色数据
			// onInitRoleData(row.RoleIds || '');
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
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = Number.parseInt(state.ruleForm.Order || 0);
					state.ruleForm.RoleIds = state.ruleForm.CheckedRoleList.join(',');
					if (state.UParentid != '') {
						state.ruleForm.Parentid = state.UParentid;
					}
					if (state.ruleForm.Vip > 0) {
						state.ruleForm.RoleIds = '';
						state.ruleForm.RoleList = [];
					}
					state.loading = true;
					console.log(state.ruleForm);
					try {
						const res = await proxy.$api.base.user.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
								state.ruleForm.PasswordConfirm = '';
							}
							proxy.$parent.onGetTableData();
						}
					} finally {
						state.loading = false;
					}
				} else {
					return false;
				}
			});
		};
		//加载角色数据
		const onInitRoleData = async (roleIds: string) => {
			state.ruleForm.RoleList = [];
			state.ruleForm.CheckedRoleList = [];
			const res = await proxy.$api.base.role.getList({ size: 1000000 });
			if (res.errcode != 0) {
				return;
			}

			const roleIdArr = roleIds.split(',');
			for (const val of res.data) {
				val.Checked = false;
				for (const id of roleIdArr) {
					if (val.Id == id) {
						state.ruleForm.CheckedRoleList.push(val.Id);
						val.Checked = true;
						break;
					}
				}
			}
			state.ruleForm.RoleList = res.data;
		};

		// // 初始化部门数据
		// const initTableData = () => {
		// 	state.deptData.push({
		// 		deptName: 'vueNextAdmin',
		// 		createTime: new Date().toLocaleString(),
		// 		status: true,
		// 		sort: Number.parseInt(Math.random()),
		// 		describe: '顶级部门',
		// 		id: Math.random(),
		// 		children: [
		// 			{
		// 				deptName: 'IT外包服务',
		// 				createTime: new Date().toLocaleString(),
		// 				status: true,
		// 				sort: Number.parseInt(Math.random()),
		// 				describe: '总部',
		// 				id: Math.random(),
		// 			},
		// 			{
		// 				deptName: '资本控股',
		// 				createTime: new Date().toLocaleString(),
		// 				status: true,
		// 				sort: Number.parseInt(Math.random()),
		// 				describe: '分部',
		// 				id: Math.random(),
		// 			},
		// 		],
		// 	});
		// };

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

		const getLoadData = async () => {
			const res = await proxy.$api.base.user.getList({ current: 1, size: 10000 });
			if (res.errcode != 0) {
				return;
			}
			let Ustate = false;
			state.userData = res.data;
			if (state.UParentid != '') {
				for (let item of state.userData) {
					if (item.Id == state.UParentid) {
						console.log(item.Parentid);
						Ustate = true;
					}
				}
			}
			if (!Ustate) {
				state.UParentid = '';
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

		// 页面加载时
		onMounted(() => {
			// initTableData();
		});
		return {
			t,
			openDialog,
			closeDialog,
			getUserInfos,
			onCancel,
			getLoadData,
			onSuccessFile,
			imgOnClose,
			onPreview,
			onRemove,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
