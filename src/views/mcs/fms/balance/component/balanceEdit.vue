<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" destroy-on-close :key="ruleForm.Id" >
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" v-loading="loading" style="margin-bottom: 10px;">
				<el-form-item label="名称" prop="Title">
					<el-input v-model="ruleForm.Title"></el-input>
				</el-form-item>
				<el-form-item label="日期" prop="BalanceTime">
					<el-date-picker style="width: 100%" v-model="ruleForm.BalanceTime" type="date" placeholder="开始日期"
					format="YYYY-MM-DD" ></el-date-picker>
				</el-form-item>																			
				<el-form-item label="备注" prop="Remark">
					<el-input v-model="ruleForm.Remark" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<el-table :data="tableData.data" style="width: 100%" v-loading="tableData.loading" row-key="Parentid"
				default-expand-all
				:tree-props="{ children: 'Children'}" border stripe
				highlight-current-row>
				<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Title" width="240" label="标题" show-overflow-tooltip />
				<el-table-column label="类别" width="60" align="center">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.Mold==1">收</el-tag>
						<el-tag type="danger" effect="plain" v-else>支</el-tag>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="No" width="240" label="流水号" show-overflow-tooltip /> -->
				<el-table-column prop="BalanceRecharge" label="总收入" show-overflow-tooltip />
				<el-table-column prop="BalanceExpend" label="总支出" show-overflow-tooltip />
				<el-table-column prop="BalanceMoney" width="140" label="余额" show-overflow-tooltip >
					<template #default="scope">
						<el-input-number v-model="scope.row.BalanceMoney" size="small" :min="0" @change="changeNum" :precision="2" :disabled="scope.row.HasChildren" />
					</template>
				</el-table-column>
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
			</el-table>
			<el-pagination small class="mt15" background layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total">
			</el-pagination>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small"
						v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
							$t('message.action.save')
						}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'balanceEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: 0,
				Title: '',
				Remark: '',
				Kind: '',
				BalanceTime:new Date(),
				BalanceDetails:[]
			},
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					endTime: '',
					startTime: ''
				},
			},
		});

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Title: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = async (kind: string, id: string) => {
			try {
				const res = await proxy.$api.fms.balance.getById(kind, id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				state.ruleForm.Kind = kind
				if (id =="0"){
					state.ruleForm.BalanceTime = new Date
					state.ruleForm.BalanceDetails =[];
				}
				state.tableData.data = res.data.ChildDetails
				changeNum()
			} finally {
			}
			if (id != "0") {
				state.title = t('message.action.edit');

			} else {
				state.ruleForm.Kind = kind
				state.title = t('message.action.add');


			}
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};
		//处理数据
		const changeNum = () => {
			for(let item of state.tableData.data){
				if (item.HasChildren){
					let newdata=getNumber(item.Children)
					item.BalanceMoney =newdata.balanceMoney
					item.BalanceRecharge=newdata.balanceRecharge
					item.BalanceExpend=newdata.balanceExpend
				}
			}
		};
		//开始递归
		const getNumber = (list:any)=>{
			let data={
				balanceMoney:0,
			 	balanceRecharge:0,
			 	balanceExpend:0,
			}
			for (let item of list){
				if (item.HasChildren){
					let newdata=getNumber(item.Children)
					item.BalanceMoney =newdata.balanceMoney
					item.BalanceRecharge=newdata.balanceRecharge
					item.BalanceExpend=newdata.balanceExpend
				}
				item.BalanceRecharge=0
					item.BalanceExpend=0
				if(item.Mold==1){
					data.balanceRecharge+=item.BalanceMoney
					data.balanceMoney+=item.BalanceMoney
					item.BalanceRecharge=item.BalanceMoney
				}else{
					data.balanceExpend+=item.BalanceMoney
					data.balanceMoney-=item.BalanceMoney
					item.BalanceExpend=item.BalanceMoney
				}
			}
			return data
		};
		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		const getChildList=(data)=>{
			for (let item of data){
				if (item.HasChildren){
					getChildList(item.Children)
				}else{
					console.log(item,state.ruleForm.BalanceDetails)
					state.ruleForm.BalanceDetails.push(item)
				}
			}

		}
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.BalanceDetails =[];
					//开始添加数据
					getChildList(state.tableData.data)
					try {
						const res = await proxy.$api.fms.balance.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetTableData();
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
		// 页面加载时
		onMounted(() => { });
		return {
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			rules,
			onSubmit,
			changeNum,
			getChildList,
			getNumber,
			...toRefs(state),
		};
	},
};
</script>
