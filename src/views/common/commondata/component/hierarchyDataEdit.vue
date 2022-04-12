<template>
	<div class="common-hierarchydata-edit-container">
		<el-dialog :title="title" v-model="isShowDialog" width="50%" destroy-on-close :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="60px" v-loading="loading" >
				<el-form-item label="名称" prop="Name">
					<el-col :span="12">
					<el-input placeholder="请输入名称" v-model="ruleForm.Name"> </el-input>
					<p title="" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>名称必须唯一</span></p>
					</el-col>
				</el-form-item>
				<el-form-item label="编码" prop="Code">
					<el-col :span="12">
					<el-input placeholder="请输入编码" v-model="ruleForm.Code"> </el-input>
					<p title="" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>编码必须唯一，不填则默认为名称</span></p>
					</el-col>
				</el-form-item>
				<el-form-item label="父级" prop="Parentid" v-if="commonTypeCode!=ruleForm.Type">
					<el-col :span="12">
					<el-cascader :options="options" v-model="ruleForm.parentids" clearable :props='{value:"Id",label:"Name",children:"Children",checkStrictly:true,filterable:true}' >
						<template #default="{ node, data }">
							<span>{{ data.Name }}</span>
							<span v-if="data.Children && data.Children.length>0"> ({{ data.Children.length }}) </span>
						</template>
					</el-cascader>
					</el-col>
				</el-form-item>
				<el-form-item label="英文名" prop="Pinyin">
					<el-col :span="12">
					<el-input placeholder="请输入英文名" v-model="ruleForm.Pinyin"> </el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="排序" prop="Order">
					<el-col :span="12">
						<el-input type="number" placeholder="排序" v-model="ruleForm.Order"> </el-input>
						<p title="" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>值小的靠前显示</span></p>
					</el-col>
				</el-form-item>
				<el-form-item prop="Status" label="状态">
					<el-checkbox v-model="ruleForm.Status" :true-label="1" :false-label="0">有效</el-checkbox>
				</el-form-item>
				<el-form-item label="值" prop="Value">
					<el-input placeholder="请输入值" v-model="ruleForm.Value"> </el-input>
				</el-form-item>
				<el-form-item label="说明" prop="Desc">
					<el-input
						v-model="ruleForm.Desc"
						type="textarea"
						:autosize="{minRows: 3, maxRows:6}"
						:placeholder="说明"
					></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage } from 'element-plus';
import account from '/@/views/login/component/account.vue';
export default {
  components: { account },
	name: 'ConcreteDataEdit',
	setup() {
		const commonTypeCode='hierarchycommondata'
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			commonTypeCode,
			options:[],
			ruleForm: {
				Id: '0',
				parentids:[],
				Parentid:'0',
				Type: commonTypeCode,
				Name: '',
			},
			disable: false, //是否隐藏
		});
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		// 打开弹窗
		const openDialog = (Type: string, id: string, parentId:string, options: []) => {
			state.ruleForm.Name='';
			state.ruleForm.Code='';
			state.ruleForm.Remark='';
			state.ruleForm.Status=1;
			state.ruleForm.Order = 100;
			state.ruleForm.Type = Type;
			if(Type==commonTypeCode){
				state.ruleForm.Parentid='0';
				state.ruleForm.parentids=[];
			} else {
				state.ruleForm.Parentid=parentId;
				state.ruleForm.parentids=[parentId];
			}
			if (id && id != '0') {
				loadRowById(id,Type);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}

			state.isShowDialog = true;
			state.options = options;
		};
		const loadRowById = async(id: string,Type:string) => {
			const res= await proxy.$api.common.commondata.getById(id);
			if (res.errcode == 0) {
				state.ruleForm = res.data;
				if(res.data.Parentid && res.data.Parentid!='0' && Type!=commonTypeCode){
					state.ruleForm.parentids=[res.data.Parentid];
				} else {
					state.ruleForm.parentids=[];
				}
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
			proxy.$parent.onGetTableData();
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			console.log(state.ruleForm);
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				console.log(valid);
				if (valid) {
					// state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = parseInt(state.ruleForm.Order);
					state.ruleForm.Status = parseInt(state.ruleForm.Status);
					
					if(!state.ruleForm.parentids.length){
						state.ruleForm.Parentid='0';
					} else{
						//取最后一条记录
						state.ruleForm.Parentid=state.ruleForm.parentids[state.ruleForm.parentids.length-1];
					}
					try{
						const res = proxy.$api.common.commondata.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
						}
					} finally{
						state.loading = false;
					}
				} 
				return false;
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
	.el-cascader {
		width:100% !important;
	}
</style>
