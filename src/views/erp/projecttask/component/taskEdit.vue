<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title+(projectName?'：':'')+projectName" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="childRuleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						
						<el-form-item label="工单标题" prop="Title">
							<el-select
								v-model="ruleForm.Title"
								filterable
								allow-create
								clearable
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option v-for="(item,index) in titleList" :key="index" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="所属项目" prop="ProjectId">
							<el-select v-model="ruleForm.ProjectId" placeholder="请选择" >
								<el-option v-for="(item, index) in projectList" :key="index" :label="item.Name" :value="item.Id"> </el-option>	
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						
						<el-form-item label="工单分类" prop="Name">
							<el-select
								v-model="ruleForm.Name"
								filterable
								default-first-option
								:reserve-keyword="false"
								placeholder="请选择">
								<el-option v-for="(item,index) in nameList" :key="index" :label="item.Name" :value="item.Name">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="工单类型" prop="TaskType">
							<el-select
								v-model="ruleForm.TaskType"
								filterable
								default-first-option
								:reserve-keyword="false"
								placeholder="请选择">
								<el-option v-for="(item,index) in taskTypeList" :key="index" :label="item.Name" :value="item.Name">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="处理方式" prop="TaskMode">
							<el-radio-group
									v-model="ruleForm.TaskMode">
									<el-radio :label="1">现场</el-radio>
									<el-radio :label="2">远程</el-radio>
								</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row :gutter="0">
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="工单时间" prop="TaskTime">
							<el-date-picker
								v-model="ruleForm.TaskTime"
								type="datetime"
								placeholder="工单时间"
								format="YYYY-MM-DD HH:mm" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						
						<el-form-item label="地址" prop="Address">
							<el-select
								v-model="ruleForm.Address"
								filterable
								allow-create
								clearable
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option v-for="(item,index) in addressList" :key="index" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="处理内容" prop="Content">
							<el-input v-model="ruleForm.Content" :autosize="{ minRows: 3, maxRows: 6 }"
							type="textarea"/> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">完成信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="是否完成" prop="FinishState">
							<el-switch v-model="ruleForm.FinishState" :width="50" inline-prompt :active-text="$t('message.action.yes')" :inactive-text="$t('message.action.no')" :active-value="1" :inactive-value="0"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="完成时间" prop="FinishTime">
							<el-date-picker
								v-model="ruleForm.FinishTime"
								type="datetime"
								placeholder="完成时间"
								format="YYYY-MM-DD HH:mm" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="收款金额" prop="Amount">
							<el-input-number
								v-model="ruleForm.Amount"
								:min="0"
								controls-position="right"
								:precision="2"/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.TaskEdit', 'btn.TaskAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import imgList from '/@/components/image/index.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'freightLineEdit',
	components: { imgList },
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			projectName:'',
			loading: false,
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//	表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'default',
				Title: '',
				Names: '',
				TaskMode:2,
				TaskType: '',
				Amount:0,
			},
			dialogVisible: false,
			projectList: [],
			titleList:[],
			nameList:[],
			unitList:[],
			taskTypeList:[],
			addressList:[],
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
			Title: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			Name: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			ProjectId: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			TaskType: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			TaskMode: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			TaskTime: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
		});
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string,projectId:string,projectName:'', disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.projectName=projectName;
			try {
				await loadCommonDataList()
				await loadProjectList(kind)
				state.disable = disable;
				if (id && id != '0') {
					getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = '0';
					state.ruleForm.ProjectId=projectId;
					state.ruleForm.TaskTime=new Date()
					state.ruleForm.FinishTime=new Date()
					state.title = t('message.action.add');
				}
				await loadTaskList(kind)
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.projectTask.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				if(!res.data.BeginState){
					res.data.BeginTime=""
				}
				if(!res.data.FinishState){
					res.data.FinishTime=""
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};
		const loadProjectList = async (kind:string) => {
			const res = await proxy.$api.erp.project.getListByScope(kind, 0, 0, {finishState:0,pageSize:100000});
				if (res.errcode == 0) {
					state.projectList=res.data
				}else{
					console.log("error:",res.errmsg)
				}
		};
		// 加载最近的信息
		const loadTaskList = async (kind:string) => {
			
			const res = await proxy.$api.erp.projectTask.getListByScope(kind, 0, 0, {pageSize:1000});
			if (res.errcode != 0) {
				return;
			}
			console.log("res.data",res.data)
			state.titleList=[];
			const titleArr=res.data.map((item:any)=>item.Title);
			const titleSet = new Set(titleArr);
			const titleList = [...titleSet];
			state.titleList=titleList;

			state.unitList=[];
			const unitArr=res.data.map((item:any)=>item.Unit);
			const unitSet = new Set(unitArr);
			const unitList = [...unitSet];
			state.unitList=unitList;

			state.addressList=[];
			const addressArr=res.data.filter((item:any)=>!item.ProjectId||item.ProjectId==state.ruleForm.ProjectId).map((item:any)=>item.Address);
			const addressSet = new Set(addressArr);
			const addressList = [...addressSet];
			state.addressList=addressList;
		};
		const loadCommonDataList=async()=>{
			try {
				const res = await proxy.$api.common.commondata.getList({ type: 'project_task_name', pateSize: 100000 });
				if (res.errcode == 0) {
					state.nameList = res.data;
				}
			} finally {
			}
			try {
				const res = await proxy.$api.common.commondata.getList({ type: 'project_task_type', pateSize: 100000 });
				if (res.errcode == 0) {
					state.taskTypeList = res.data;
				}
			} finally {
			}
		}
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.childRuleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onChildGetTableData();
		};
	
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.childRuleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.erp.projectTask.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.childRuleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onChildGetTableData();
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

		const { dateFormatYMD } = commonFunction();
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			getByIdRow,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
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