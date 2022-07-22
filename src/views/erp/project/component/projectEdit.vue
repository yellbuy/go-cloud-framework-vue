<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="onCancel">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-width="120px" v-loading="loading">
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
								<el-option v-for="item in methodList" :key="item.Id" :label="item.Name" :value="item.Value" />
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
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="项目附件：" prop="Files">
							<div style="width: 50%">
								<el-upload
									class="upload-demo"
									:action="uploadURL"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile"
									:file-list="FilesList"
									:on-remove="onRemove"
								>
									<template #default>
										<el-button
											><el-icon class="el-icon--right"><Upload /></el-icon>上传</el-button
										>
									</template>
								</el-upload>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-button size="small" type="primary" @click="onModelEdit(true)">
							<el-icon>
								<Plus />
							</el-icon>
							添加品目
						</el-button>
						<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" fixed />
							<el-table-column prop="Sn" label="包号" width="120" show-overflow-tooltip></el-table-column>
							<el-table-column prop="No" label="品目号" show-overflow-tooltip></el-table-column>
							<el-table-column prop="Name" label="名称" show-overflow-tooltip></el-table-column>
							<el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
							<el-table-column prop="Qty" label="数量" show-overflow-tooltip></el-table-column>
							<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
								<template #default="scope">
									<el-button
										text
										bg
										type="primary"
										@click="onModelEdit(false, scope.row, scope.$index)"
										v-auth:[$parent.moduleKey]="'btn.ProjectLineEdit'"
									>
										<el-icon>
											<Edit />
										</el-icon>
										{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onModelDel(scope.$index, scope.row.Id)" v-auth:[$parent.moduleKey]="'btn.ProjectLineDel'">
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
					<el-button text bg @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit()" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
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
		const moduleKey = proxy.$parent.moduleKey;
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
			// state.FilesList.push(image);
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

		const state = reactive({
			moduleKey,
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: 0,
				Kind: '',
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
				BidOpenTime: '',
				ProjectLineList: [],
			},
			tableData: {
				data: [],
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10000,
				},
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
		const onModelEdit = (isadd: boolean, item: object, index: object) => {
			lineEditDlgRef.value.openDialog(item, isadd, index);
		};
		// 打开弹窗
		const openDialog = (kind: string, id: string) => {
			getBiddMethod();
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			state.ruleForm.Kind = kind;
			state.isShowDialog = true;
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
					state.Files = res.data.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < state.Files.length; i++) {
						let image = { url: '' };
						image.url = state.httpsText + state.Files[i];
						state.FilesList.push(image);
					}
				}
			} finally {
				state.isShowDialog = true;
			}
		};
		// 取消
		const onCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.tableData.data = [];
			state.isShowDialog = false;
		};
		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		// 新增
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					try {
						if (state.Files) {
							state.ruleForm.Files = state.Files.join(',');
						}
						state.loading = true;
						state.ruleForm.Id = state.ruleForm.Id.toString();
						state.ruleForm.ProjectLineList = state.tableData.data;
						state.ruleForm.RemoteState = parseInt(state.ruleForm.RemoteState);
						state.ruleForm.AutoSwitchState = parseInt(state.ruleForm.AutoSwitchState);
						state.ruleForm.ProjectType = parseInt(state.ruleForm.ProjectType);
						state.ruleForm.BidOpenTime = state.ruleForm.BeginTime;
						state.ruleForm.ProjectLineList = state.tableData.data;
						const res = await proxy.$api.erp.project.save(state.ruleForm);
						if (res.errcode == 0) {
							onLoadTable();
							onCancel();
						}
					} finally {
						state.loading = false;
					}
					return false;
				} else {
					return false;
				}
			});
		};
		//删除
		const onModelDel = (index: number, Id: number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				if (Id == 0) {
					state.tableData.data.splice(index, 1);
				} else {
					try {
						const res = await proxy.$api.erp.projectline.delete(Id);
						if (res.errcode == 0) {
							state.tableData.loading = false;
						}
					} finally {
						state.tableData.loading = false;
					}
				}

				return false;
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			onCancel,
			getBiddMethod,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			onModelDel,
			onModelEdit,
			rules,
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
