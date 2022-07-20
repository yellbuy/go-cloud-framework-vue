<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="onCancel">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="120px" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="项目编号：" prop="No">
							<el-input v-model="ruleForm.No"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="项目名称：" prop="Name">
							<el-input v-model="ruleForm.Name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="项目方式：" prop="ProjectType">
							<el-select v-model="ruleForm.ProjectType" placeholder="请选择">
								<el-option v-for="item in methodList" :key="item.Id" :label="item.Name" :value="item.Id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item prop="RemoteState">
							<el-checkbox v-model="ruleForm.RemoteState" :true-label="1" :false-label="0">视频会议</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="标书费用：" prop="BidFee">
							<el-input-number v-model="ruleForm.BidFee" :min="0" controls-position="right" :precision="2" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="评选地点：" prop="Location">
							<el-input v-model="ruleForm.Location"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="项目内容：" prop="Content">
							<el-input v-model="ruleForm.Content"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="项目附件：" prop="Files">
							<el-upload
								class="upload-demo"
								:action="uploadURL"
								:headers="{ Appid: getUserInfos.appid, Authorization: token }"
								:on-success="onSuccessFile"
								:file-list="FilesList"
								:on-remove="onRemove"
							>
								<el-button
									><el-icon class="el-icon--right"><Upload /></el-icon>上传</el-button
								>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-button size="mini" type="primary" @click="onModelEdit">
							<el-icon>
								<Plus />
							</el-icon>
							添加品目
						</el-button>
						<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="mini" border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" fixed />
							<el-table-column prop="Sn" label="包号" width="120" show-overflow-tooltip></el-table-column>
							<el-table-column prop="No" label="品目号" show-overflow-tooltip></el-table-column>
							<el-table-column prop="Name" label="设备名称" show-overflow-tooltip></el-table-column>
							<el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
							<el-table-column prop="Qty" label="数量" show-overflow-tooltip></el-table-column>
							<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
								<template #default="scope">
									<el-button text bg type="primary" @click="onModelEdit(scope.row)" v-auth:[$parent.moduleKey]="'btn.BidProjectEdit'">
										<el-icon>
											<Edit />
										</el-icon>
										{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onModelDel(scope.row, scope.$index)" v-auth:[$parent.moduleKey]="'btn.BidProjectDel'">
										<el-icon>
											<CloseBold />
										</el-icon>
										{{ $t('message.action.delete') }}
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="报名开始时间：" prop="StartTime">
							<el-date-picker
								v-model="ruleForm.StartTime"
								type="date"
								placeholder="有限期限"
								format="YYYY-MM-DD"
								style="width: 100%"
							></el-date-picker> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="报名结束时间：" prop="EndTime">
							<el-date-picker
								v-model="ruleForm.EndTime"
								type="date"
								placeholder="有限期限"
								format="YYYY-MM-DD"
								style="width: 100%"
							></el-date-picker> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="招标开始时间：" prop="BeginTime">
							<el-date-picker
								v-model="ruleForm.BeginTime"
								type="date"
								placeholder="有限期限"
								format="YYYY-MM-DD"
								style="width: 100%"
							></el-date-picker> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="招标结束时间：" prop="FinishTime">
							<el-date-picker
								v-model="ruleForm.FinishTime"
								type="date"
								placeholder="有限期限"
								format="YYYY-MM-DD"
								style="width: 100%"
							></el-date-picker> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="评选时间：" prop="ReviewTime">
							<el-date-picker
								v-model="ruleForm.ReviewTime"
								type="date"
								placeholder="有限期限"
								format="YYYY-MM-DD"
								style="width: 100%"
							></el-date-picker> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<h3>注意：如果此公开比选项目不足三家供应商参与，是否自动转为院内谈判项目？</h3>
					</el-col>
					<el-form-item prop="AutoSwitchState">
						<el-checkbox v-model="ruleForm.AutoSwitchState" :true-label="1" :false-label="0">不足三家供应商，转院内谈判</el-checkbox>
					</el-form-item>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.BidProjectEdit', 'btn.BidProjectAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<lineEditDlg ref="lineEditDlgRef" />
</template>

<script lang="ts">
import request from '/@/utils/request';
import lineEditDlg from './projectLineEdit.vue';
import { reactive, toRefs, onMounted, getCurrentInstance, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type';
import { Session } from '/@/utils/storage';
import { useStore } from '/@/store/index';
export default {
	name: 'projectEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();

		const lineEditDlgRef = ref();
		const store = useStore();
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		//上传成功
		const onSuccessFile = (file: UploadFile) => {
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			state.FilesList.push(image);
		};
		//删除上传文件
		const onRemove = (file: UploadFile) => {
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};

		const tableData = reactive({
			data: [],
			loading: false,
			param: {
				pageNum: 1,
				pageSize: 10000,
			},
		});
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: 0,
				Kind: 'Bidding',
				Name: '',
				No: '',
				Sn: '',
				ProjectType: '',
				RemoteState: 0,
				BidFee: 0,
				Location: '',
				Content: '',
				Files: '',
				AutoSwitchState: 0,
				StartTime: '', //报名开始时间
				EndTime: '', //报名结束时间
				BeginTime: '', //投标开始时间
				FinishTime: '', //投标结束时间
				ReviewTime: '', //评选时间
				ProjectLineList: [],
			},
			methodList: [],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
		});
		const token = Session.get('token');
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
		});
		//招标方式
		const getBiddMethod = async () => {
			try {
				const res = await proxy.$api.common.commondata.getList({ type: 'xmfs', pateSize: 100000 });
				if (res.errcode == 0) {
					state.methodList = res.data;
				}
			} finally {
				// state.methodList = [];
			}
		};
		//修改按钮
		const onModelEdit = (item: object) => {
			lineEditDlgRef.value.openDialog(item);
		};
		// 打开弹窗
		const openDialog = (id: string) => {
			getBiddMethod();
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			state.isShowDialog = true;
		};
		const GetByIdRow = (Id: string) => {
			const url = `/v1/erp/project/${Id}`;
			request({
				url: url,
				method: 'get',
			})
				.then((res) => {
					if (res.errcode == 0) {
						state.ruleForm = res.data;
						tableData.data = res.data.ProjectLineList;
					} else {
						ElMessage.warning(res.errmsg);
					}
				})
				.catch((err) => {});
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.ruleForm = {
				Id: 0,
				Kind: 'Bidding',
				Name: '',
				No: '',
				Sn: '',
				ProjectType: '',
				RemoteState: 0,
				BidFee: 0,
				Location: '',
				Content: '',
				Files: '',
				AutoSwitchState: 0,
				StartTime: '', //报名开始时间
				EndTime: '', //报名结束时间
				BeginTime: '', //投标开始时间
				FinishTime: '', //投标结束时间
				ReviewTime: '', //评选时间
				ProjectLineList: [],
			};
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};
		// 取消
		const onCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};
		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				if (valid) {
					state.loading = true;
					const url = state.ruleForm.Id > 0 ? `/v1/erp/project/${state.ruleForm.Id}` : `/v1/erp/project`;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.ProjectLineList = tableData.data;
					state.ruleForm.RemoteState = parseInt(state.ruleForm.RemoteState);
					state.ruleForm.AutoSwitchState = parseInt(state.ruleForm.AutoSwitchState);
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					})
						.then((res) => {
							state.loading = false;
							if (res.errcode == 0) {
								if (isCloseDlg) {
									closeDialog();
								} else {
									proxy.$refs.ruleFormRef.resetFields();
									state.ruleForm.Id = 0;
								}
							}
						})
						.catch(() => {
							state.loading = false;
						});
					return false;
				} else {
					return false;
				}
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onCancel,
			getBiddMethod,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			onModelEdit,
			rules,
			tableData,
			lineEditDlgRef,
			token,
			getUserInfos,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		Upload,
		lineEditDlg,
	},
};
</script>
