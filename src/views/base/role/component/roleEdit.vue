<template>
	<div class="role-edit-container">
		<el-dialog :title="title" v-model="isShowDialog">
			<!-- <template #title>
				{{title}}
				<div class="line">
					<div></div>
				</div>
			</template> -->
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称" prop="Name">
							<el-input v-model="ruleForm.Name" placeholder="请输入角色名称" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="编码" prop="Code">
							<el-input v-model="ruleForm.Code" placeholder="请输入角色编码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="备注" prop="Remark">
							<el-input v-model="ruleForm.Remark" type="textarea" placeholder="请输入角色备注"  :rows="5" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="权限" prop="Code">
						<el-tree ref="treePerm" class="perm-data-tree"
							:props="{children: 'list',label: 'name', class: actionNodeClass}"
							node-key="value"
							show-checkbox
							check-on-click-node
							:check-strictly="true"
							:data="permTree.data"
							:default-expanded-keys="permTree.expandedKeys"
    						:default-checked-keys="permTree.checkedKeys"
							@check-change="onTreeCheckChange"
						/>
						</el-form-item>
					</el-col>
				</el-row>
				
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" >{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" >{{ $t('message.action.saveAndAdd') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" :loading="loading" >{{ $t('message.action.save') }}</el-button>
					
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
	name: 'baseRoleEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title:t('message.action.add'),
			loading:false,
			ruleForm: {
				Id:0,
				Name: '', // 角色名称
				Code:'',
				Order: 100, // 排序
				Remark:'',
				Perms: [], // 部门
			},
			permTree: {
				data:[],
				checkedKeys:[],
				expandedKeys:[]
			}, // 权限数据
		});

		const actionNodeClass = (data: any, node: Node) => {
			// if (data.kind=="action") {
			// 	return 'is-action'
			// }
			return null
		}

		const rules = reactive({
			Name: [
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
			state.loading=false
			const model = JSON.parse(JSON.stringify(row))
			state.ruleForm = model;
			if(row && row.Id>0){
				state.title=t('message.action.edit');
			}else{
				state.title=t('message.action.add');
				state.ruleForm.Id=0;
				state.ruleForm.Enable=1;
				state.ruleForm.AllowBackendLogin=1;
				state.ruleForm.AllowFrontendLogin=1;
			}
			state.isShowDialog = true;

			//加载权限数据
			onInitPermData();
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
			
			proxy.$refs.ruleFormRef.validate(async (valid:any) => {
				if (valid) {
					state.ruleForm.Perms = proxy.$refs.treePerm.getCheckedKeys();
					const halfCheckedKeys = proxy.$refs.treePerm.getHalfCheckedKeys()||[];
					state.ruleForm.Perms.push(...halfCheckedKeys);
					state.ruleForm.Id=state.ruleForm.Id.toString();
					state.loading=true;
					try{
						const res = await proxy.$api.base.role.save(state.ruleForm);
						if(res.errcode!=0){
							return;
						}
						if(isCloseDlg){
							closeDialog();
						} else {
							proxy.$refs.ruleFormRef.resetFields();
							state.ruleForm.Id=0;
						}
						proxy.$parent.onGetTableData();
					} finally {
						state.loading=false;
					}
				} 
				return false;
			});
		};

		//是否允许更新子节点的标志
		let allowUpdateChildren=true;
		const onTreeCheckChange=(data:any,checked:boolean)=>{
			
			//更新子节点是否选中状态
			const updateChildrenChecked=(list:any,checked:boolean)=>{
				if(!allowUpdateChildren){
					return;
				}
				for(const child of list){
					proxy.$refs.treePerm.setChecked(child,checked,true)
				}
			}
			//更新父节点选中状态
			const updateParentChecked=(data:any)=>{
				if(data.parent){
					proxy.$refs.treePerm.setChecked(data.parent,true);
					const parent=proxy.$refs.treePerm.getNode(data.parent);
					if(parent && !parent.checked && parent.data){
						updateParentChecked(parent.data);
					}
				}
				
			}

			
			if(checked){
				if(data.parent){
					allowUpdateChildren=false;
					updateParentChecked(data);
					allowUpdateChildren=true;
				}
				
			} else {
				if(data.list && data.list.length>0){
					updateChildrenChecked(data.list,checked)
				}
			}
		}

		//加载角色权限数据
		const onInitPermData=(async()=>{
			//递归所有子节点的选中Key
			const insertCheckedKeys=(val:any)=>{
				for(const child of val.list){
					child.parent=val.value
					child.name=t(child.name)
					if(child.checked){
						state.permTree.checkedKeys.push(child.value)
						if(child.list && child.list.length){
							insertCheckedKeys(child);
						}
					}
				}
			}
			state.permTree.expandedKeys=[];
			state.permTree.checkedKeys=[];
			state.permTree.data=[];

			//加载权限数据
			const res = await proxy.$api.base.role.getPermissionsById(state.ruleForm.Id)
			if(res.errcode!=0){
				return;
			}
			state.permTree.data=res.data||[];
			
			//第一层级
			for (const val of res.data) {
				val.name=t(val.name)
				val.parent="";
				state.permTree.expandedKeys.push(val.value)
				if(val.checked){
					state.permTree.checkedKeys.push(val.value)
				}
				//是否有下级
				if(val.list && val.list.length>0){
					//第2层级
					for(const val2 of val.list){
						val2.parent=val.value
						val2.name=t(val2.name)
						state.permTree.expandedKeys.push(val2.value)
						if(val2.checked){
							state.permTree.checkedKeys.push(val2.value)
						}
						//是否有下级
						if(val2.list && val2.list.length>0){
							//第3层级
							for(const val3 of val2.list){
								val3.parent=val2.value
								val3.name=t(val3.name)
								state.permTree.expandedKeys.push(val3.value)
								if(val3.checked){
									state.permTree.checkedKeys.push(val3.value)
									if(val3.list && val3.list.length>0){
										insertCheckedKeys(val3)
									}
								}
							}
						}
					}
				}
				proxy.$refs.treePerm.setCheckedKeys(state.permTree.checkedKeys);
			}
		})
		
		// 页面加载时
		onMounted(() => {
			//onInitPermData();
		});
		

		return {
			t,
			actionNodeClass,
			onTreeCheckChange,
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
.role-edit-container {
	.perm-data-tree {
		border: var(--el-input-border, var(--el-border-base));
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
/* .el-tree-node.is-expanded > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}
.is-action > .el-tree-node__children > div {
  width: 25%;
} */
</style>
