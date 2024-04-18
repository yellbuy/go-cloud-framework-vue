<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="60px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="20">
					<el-col :xs="6" :sm="4" class="mb20">
						<el-form-item label="金额" prop="Amount">
							<el-input-number v-model="ruleForm.Amount" :value-on-clear="0"  min="0" max="100000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4" class="mb20">
						<el-form-item label="里程" prop="Mileage">
							<el-input-number v-model="ruleForm.Mileage" :value-on-clear="0"  min="0" max="100000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left"></el-divider>
				<el-row :gutter="20">
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="21号" prop="Volume21">
							<el-input-number v-model="ruleForm.Volume21" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="22号" prop="Volume22">
							<el-input-number v-model="ruleForm.Volume22" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="23号" prop="Volume23">
							<el-input-number v-model="ruleForm.Volume23" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="24号" prop="Volume24">
							<el-input-number v-model="ruleForm.Volume24" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="25号" prop="Volume25">
							<el-input-number v-model="ruleForm.Volume25" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="26号" prop="Volume26">
							<el-input-number v-model="ruleForm.Volume26" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="27号" prop="Volume27">
							<el-input-number v-model="ruleForm.Volume27" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="28号" prop="Volume28">
							<el-input-number v-model="ruleForm.Volume28" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="29号" prop="Volume29">
							<el-input-number v-model="ruleForm.Volume29" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="30号" prop="Volume30">
							<el-input-number v-model="ruleForm.Volume30" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="31号" prop="Volume31">
							<el-input-number v-model="ruleForm.Volume31" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left"></el-divider>
				<el-row :gutter="20">
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="1号" prop="Volume01">
							<el-input-number v-model="ruleForm.Volume01" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="2号" prop="Volume02">
							<el-input-number v-model="ruleForm.Volume02" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="3号" prop="Volume03">
							<el-input-number v-model="ruleForm.Volume03" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="4号" prop="Volume04">
							<el-input-number v-model="ruleForm.Volume04" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="5号" prop="Volume05">
							<el-input-number v-model="ruleForm.Volume05" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="6号" prop="Volume06">
							<el-input-number v-model="ruleForm.Volume06" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="7号" prop="Volume07">
							<el-input-number v-model="ruleForm.Volume07" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="8号" prop="Volume08">
							<el-input-number v-model="ruleForm.Volume08" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="9号" prop="Volume09">
							<el-input-number v-model="ruleForm.Volume09" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="10号" prop="Volume10">
							<el-input-number v-model="ruleForm.Volume10" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="11号" prop="Volume11">
							<el-input-number v-model="ruleForm.Volume11" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="12号" prop="Volume12">
							<el-input-number v-model="ruleForm.Volume12" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="13号" prop="Volume13">
							<el-input-number v-model="ruleForm.Volume13" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="14号" prop="Volume14">
							<el-input-number v-model="ruleForm.Volume14" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="15号" prop="Volume15">
							<el-input-number v-model="ruleForm.Volume15" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="16号" prop="Volume16">
							<el-input-number v-model="ruleForm.Volume16" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="17号" prop="Volume17">
							<el-input-number v-model="ruleForm.Volume17" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="18号" prop="Volume18">
							<el-input-number v-model="ruleForm.Volume18" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="19号" prop="Volume19">
							<el-input-number v-model="ruleForm.Volume19" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="4"  class="mb20">
						<el-form-item label="20号" prop="Volume20">
							<el-input-number v-model="ruleForm.Volume20" :value-on-clear="0"  min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']" v-if="!disable">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'freightLineEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		//文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			// state.FilesList.push(image);
			console.log(state.FilesList);
		};
		const onRemove = (file: UploadFile) => {
			console.log(file);
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};
		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		//显示表格图片
		const showImage = (Files: string) => {
			let fileUrl = '';
			let filList = Files.split(',');
			fileUrl = state.httpsText + filList[0];
			return fileUrl;
		};
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'oil',
				VehicleNumber: '',
				IsExternal:0,
				VehicleType: '',
				EnergyType: '',
				PlateColor:'',
				Vin: '',
				EngineNumber: '',
				Linkman: '',
				BusinessScope: '',
				State: 1,
				TaxpayerKind: '',
				WebSite: '',
				Fax: '',
				Im: '',
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				StartTime: '',
				EndTime:'',
				Kind: 'info',
			},
			dialogVisible: false,
			truckTypeList: [],
			plateColorList:[],
			energyTypeList:[],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
		});
		const token = Session.get('token');
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			VehicleNumber: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			RegistrationDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DrivingLicenseStartDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			DrivingLicenseEndDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			TransportLicenseStartDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			TransportLicenseEndDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: kind, StartTime: '' };
			try {
				
				state.disable = disable;
				if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal=0;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.energyBillLine.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onMainGetTableData();
		};
		//修改按钮
		const onModelEdit = (item: object) => {
			state.tableItem = item;
			console.log(state.tableItem.Files);
			if (state.tableItem.Files != '') {
				state.Files = item.Files.split(',');
				state.FilesList = [];
				for (let i = 0; i < state.Files.length; i++) {
					let image = { url: '' };
					image.url = state.httpsText + state.Files[i];
					state.FilesList.push(image);
				}
			}
			state.saveState = false;
			state.dialogVisible = true;
		};		
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.erp.energyBillLine.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onMainGetTableData();
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
		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png' &&
				rawFile.type !== 'image/ico' &&
				rawFile.type !== 'image/bmp' &&
				rawFile.type !== 'image/gif' &&
				rawFile.type !== 'image/svg'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			return true;
		};
		const { dateFormatYMD } = commonFunction();
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			onBeforeImageUpload,
			onModelEdit,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		Plus,
	},
	data() {
		return {};
	},
	methods: {},
};
</script>
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>