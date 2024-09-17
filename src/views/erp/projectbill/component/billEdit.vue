<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title+(projectName?'：':'')+projectName" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="childRuleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="科目" prop="Name">
							<el-select v-model="ruleForm.Name" placeholder="请选择" >
								<el-option :label="请选择" value=""> </el-option>
								<el-option v-for="(item, index) in nameList" :key="index" :label="item.Name" :value="item.Name"> </el-option>	
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账目类型" prop="BillType">
							<el-radio-group
								v-model="ruleForm.BillType">
								<el-radio :label="1">收入</el-radio>
								<el-radio :label="-1">支出</el-radio>
							</el-radio-group>
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
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="往来账名称" prop="Title">
							<el-input v-model="ruleForm.Title" /> 
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="科目单位" prop="Unit">
							<el-select
								v-model="ruleForm.Unit"
								filterable
								allow-create
								clearable
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option v-for="(item,index) in unitList" :key="index" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="金额" prop="Amount">
							<el-input-number
								v-model="ruleForm.Amount"
								:min="0"
								controls-position="right"
								:precision="2"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="" prop="IsIncludeTax">
							<el-checkbox v-model="ruleForm.IsIncludeTax" :true-label="1" :false-label="0">金额含税</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="税率" prop="TaxRate">
							<el-input-number
								v-model="ruleForm.TaxRate"
								:min="0"
								controls-position="right"
								:precision="2"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="税费" prop="Tax" >
							{{getTax}}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="含税合计" prop="Total">
							{{getTotal}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="应收付日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								type="date"
								placeholder="应收付日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="提醒日期" prop="RemindTime">
							<el-date-picker
								v-model="ruleForm.RemindTime"
								type="date"
								placeholder="提醒日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="下次收款日" prop="PlanTime">
							<el-date-picker
								v-model="ruleForm.PlanTime"
								type="date"
								placeholder="下次收款日期"
								format="YYYY-MM-DD" />
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
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="往来账说明" prop="Content">
							<el-input v-model="ruleForm.Content" :autosize="{ minRows: 3, maxRows: 6 }"
							type="textarea"/> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">往来单位信息*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="单位名称" prop="EntityName">
							<el-select
								v-model="ruleForm.EntityName"
								filterable
								allow-create
								clearable
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option
									v-for="(item,index) in entityList"
									:key="index"
									:label="item.EntityName"
									:value="item.EntityName"
									>
									<div>
										<span style="float:left">{{ item.EntityName }}</span>
										<span style="color: var(--el-text-color-secondary);margin-left:4px">
											{{ item.EntityPhone }}
										</span>
									</div>
									
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="联系电话" prop="EntityPhone">
							<el-select
								v-model="ruleForm.EntityPhone"
								filterable
								allow-create
								clearable
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option
									v-for="(item,index) in entityList"
									:key="index"
									:label="item.EntityPhone"
									:value="item.EntityPhone"
									>
									<div>
										<span style="float:left;color: var(--el-text-color-secondary)">{{ item.EntityName }}</span>
										<span style="margin-left:4px">
											{{ item.EntityPhone }}
										</span>
									</div>
									
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="单位备注" prop="EntityRemark">
							<el-input v-model="ruleForm.EntityRemark" placeholder="单位收付款对公信息等" :autosize="{ minRows: 3, maxRows: 6 }"
							type="textarea"/> 
						</el-form-item>
					</el-col>
				</el-row>
				
				
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.BillEdit', 'btn.BillAdd']">{{
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
	name: 'projectBillEdit',
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
				Id: '0',
				Title:'',
				Name: '',
				Kind: 'default',
				Subject:'',
				Unit:'',
				BillType: 1,
				EntityName:'',
				EntityPhone:'',
				Remark:'',
				Amount:0,
				IsIncludeTax:1,
				TaxRate:0,
				Tax:0,
				Total:0,
			},
			dialogVisible: false,
			nameList:[],
			unitList:[],
			entityList:[],
			projectList: [],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
		});
		//	税费计算
		const getTax = computed(() => {
			if(state.ruleForm.IsIncludeTax){
				state.ruleForm.Tax=0
				return 0;
			}
			const tax= Number.parseFloat((state.ruleForm.Amount*state.ruleForm.TaxRate).toFixed(4));
			state.ruleForm.Tax=tax
			return tax;
		});
		//	含税合计计算
		const getTotal = computed(() => {
			if(state.ruleForm.IsIncludeTax){
				state.ruleForm.Total=state.ruleForm.Amount
				return state.ruleForm.Amount;
			}
			const amount= Number.parseFloat((state.ruleForm.Amount*(1+state.ruleForm.TaxRate)).toFixed(2));
			state.ruleForm.Total=amount
			return amount;
		});
		const token = Session.get('token');

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
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
			BillType: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			
			BillTime: [
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
					state.ruleForm.BillTime=new Date()
					state.ruleForm.RemindTime=new Date()
					state.title = t('message.action.add');
				}
				await loadBillList(kind)
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.projectBill.getById(Id);
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
		// 加载最近的信息
		const loadBillList = async (kind:string) => {
			
			const res = await proxy.$api.erp.projectBill.getListByScope(kind, 0, 0, {pageSize:1000});
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

			state.entityList=[];
			const resMap = new Map();
			state.entityList=res.data.filter(item =>item.EntityName && !resMap.has(item.EntityName) && resMap.set(item.EntityName, item));
		};
		const loadProjectList = async (kind:string) => {
			const res = await proxy.$api.erp.project.getListByScope(kind, 0, 0, {finishState:0,pageSize:100000});
				if (res.errcode == 0) {
					state.projectList=res.data
				}else{
					console.log("error:",res.errmsg)
				}
		};
		const loadCommonDataList=async()=>{
			try {
				const res = await proxy.$api.common.commondata.getList({ type: 'project_bill_name', pateSize: 100000 });
				if (res.errcode == 0) {
					state.nameList = res.data;
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
						const res = await proxy.$api.erp.projectBill.save(state.ruleForm);
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
			getTax,
			getTotal,
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