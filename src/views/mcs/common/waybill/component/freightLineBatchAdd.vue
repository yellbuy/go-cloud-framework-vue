<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" :before-close="closeDialog">
			<div style="text-align: center;">
				<el-transfer
					v-model="ruleForm.VehicleIdList"
					filterable
					:filter-method="filterMethod"
					filter-placeholder="搜索"
					:titles="['可用车辆', '分配车辆']"
					:button-texts="['移除','分配']"
					:props="{ key: 'Id', label: 'VehicleNumber', disabled: 'state'}"
					:data="allTruckList">
					<template #default="{ option }">
						<el-tag v-if="option.IsExternal" type="primary">外</el-tag><el-tag v-else type="success">内</el-tag>
						<span class="ml2">{{ option.VehicleNumberExt }}</span>
					</template>
					<template #left-footer>
						<el-select
							v-model="isExternal"
							class="m-2 p10"
							placeholder="车辆类型"
							@change="onIsExternalChange">
							<el-option label="所有" :value="-1"/>
							<el-option label="内部车" :value="0"/>
							<el-option label="外部车" :value="1"/>
						</el-select>
					</template>
				</el-transfer>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
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
		
		
		const store = useStore();
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			isExternal:-1,
			//表单
			ruleForm: {
				WaybillId: 0,
				VehicleIdList: [],
				Kind: 'info',
			},
			allTruckList: [],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
		});
		const token = Session.get('token');
		
		
		// 打开弹窗
		const openDialog = async (kind: string, waybillId: string|number, disable: boolean) => {
			
			state.ruleForm.Kind = kind;
			state.ruleForm.WaybillId=waybillId;
			try {
				await loadVehicleList()
				state.title = t('message.action.add');
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onChildGetTableData();
		};
		const loadVehicleList=async ()=>{
			const resTrucks = await proxy.$api.erp.vehicle.getValidListByScope('info', 0, 2,{isExternal:state.isExternal});
			if (resTrucks.errcode == 0) {
				resTrucks.data.forEach((item,index)=>{
					item.VehicleNumberExt=item.VehicleNumber
					if(item.IsExternal && item.Tname){
						item.VehicleNumberExt=`${item.VehicleNumberExt}[${item.Tname}]`
					}
				})
				state.allTruckList = resTrucks.data;
			}else{
				console.log("error:",resTrucks.errmsg)
			}
		}
		const onIsExternalChange=async (value: any)=>{
			state.ruleForm.VehicleIdList=[];
			state.isExternal=value;
			await loadVehicleList();
		}
		const filterMethod = (query, item) => {
			return item.VehicleNumberExt.toLowerCase().includes(query.toLowerCase())
		}
		// 提交
		const onSubmit = async (isCloseDlg: boolean) => {
			const valid=state.ruleForm.VehicleIdList.length>0
			if (valid) {
					state.loading = true;
					try {
						const res = await proxy.$api.erp.waybillLine.insertMulti(state.ruleForm);
						if (res.errcode == 0) {
							closeDialog();
							proxy.$parent.onChildGetTableData();
						}
					} finally {
						state.loading = false;
					}
					return false;
				} else {
					ElMessage.warning("请选择待分配任务的车辆")
					return false;
				}
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
			onIsExternalChange,
			dateFormatYMD,
			getUserInfos,
			token,
			filterMethod,
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