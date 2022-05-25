<template>
	<div class="node-wrap">
		<div class="node-wrap-box start-node" @click="show">
			<div class="title" style="background: #576a95;">
				<el-icon class="icon">
					<elementUserFilled />
				</el-icon>
				<!-- <el-icon class="icon"><el-icon-user-filled /></el-icon> -->
				<span>{{ nodeConfig.nodeName }}</span>
			</div>
			<div class="content">
				<span>{{ toText(nodeConfig) }}</span>
			</div>
		</div>
		<add-node v-model="nodeConfig.childNode"></add-node>
		<el-drawer title="发起人" v-model="drawer" destroy-on-close append-to-body :size="500">
			<template #title>
				<div class="node-wrap-drawer__title">
					<label @click="editTitle" v-if="!isEditTitle">{{form.nodeName}}
						<el-icon class="node-wrap-drawer__title-edit">
							<elementEdit />
						</el-icon>
						<!-- <el-icon class="node-wrap-drawer__title-edit"><el-icon-edit /></el-icon> -->
					</label>
					<el-input v-if="isEditTitle" ref="nodeTitle" v-model="form.nodeName" clearable @blur="saveTitle" @keyup.enter="saveTitle"></el-input>
				</div>
			</template>
			<el-container>
				
				<el-main style="padding:0 20px 20px 20px">
					<!-- 发起人 -->
					<section class="approver-pane" style="height:100%;" >
						<el-tabs v-model="activeName" class="approver-pane pane-tab">
							<el-tab-pane :label="'设置发起人'" name="config">
								<!-- 开始节点 -->
								<el-row style="padding: 10px;">
									<el-col :span="4" style="font-size: 12px;">发起人</el-col>
									<el-col :span="18" style="padding-left: 12px;">
									<fc-org-select ref="start-org" :tabList="['dep&user']" v-model="initiator" />
									</el-col>
								</el-row>
								</el-tab-pane>
							<el-tab-pane label="表单权限" name="formAuth">
								<div class="form-auth-table">
									<header class="auth-table-header">
									<div class="row">
										<div class="label">表单字段</div>
										<el-radio-group v-model="globalFormOperate"  class="radio-group" @change="changeAllFormOperate">
										<el-radio :label="2" style="margin-left: 1rem;">可编辑</el-radio>
										<el-radio :label="1">只读</el-radio>
										<el-radio :label="0">隐藏</el-radio>
										</el-radio-group>
									</div>
									</header>
									<div class="auth-table-body">
									<div v-for="item in getFormOperates()" :key="item.formId" class="row">
										<div class="label">
										<span class="required" v-show="item.required">*</span>
										{{item.label}}
										</div>
										<el-radio-group v-model="item.formOperate"  class="radio-group">
										<el-radio :label="2" style="margin-left: 1rem;"><span style="opacity: 0;">可编辑</span></el-radio>
										<el-radio :label="1"><span style="opacity: 0;">只读</span></el-radio>
										<el-radio :label="0"><span style="opacity: 0;">隐藏</span></el-radio>
										</el-radio-group>
									</div>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</section>
					
					<!-- <el-form label-position="top">
						<el-form-item label="谁可以发起此审批">
							<el-button type="primary" round @click="selectHandle(2, form.nodeRoleList)">
								<el-icon>
									<elementPlus />
								</el-icon>
								选择角色
							</el-button>
							<div class="tags-list">
								<el-tag v-for="(role, index) in form.nodeRoleList" :key="role.id" type="info" closable @close="delRole(index)">{{role.name}}</el-tag>
							</div>
						</el-form-item>
						<el-alert v-if="form.nodeRoleList.length==0" title="不指定则默认所有人都可发起此审批" type="info" :closable="false"/>
					</el-form> -->
				</el-main>
				<el-footer>
					<el-button type="primary" @click="save">保存</el-button>
					<el-button @click="drawer=false">取消</el-button>
				</el-footer>
			</el-container>
		</el-drawer>
	</div>
</template>

<script>
	import addNode from './addNode.vue'

	export default {
		inject: ['select'],
		props: {
			modelValue: { type: Object, default: () => {} }
		},
		components: {
			addNode
		},
		data() {
			return {
				activeName:'config',
				nodeConfig: {},
				drawer: false,
				isEditTitle: false,
				form: {}
			}
		},
		watch:{
			modelValue(){
				this.nodeConfig = this.modelValue
			}
		},
		mounted() {
			this.nodeConfig = this.modelValue
		},
		methods: {
			show(){
				this.form = {}
				this.form = JSON.parse(JSON.stringify(this.nodeConfig))
				this.isEditTitle = false
				this.drawer = true
			},
			editTitle(){
				this.isEditTitle = true
				this.$nextTick(()=>{
					this.$refs.nodeTitle.focus()
				})
			},
			saveTitle(){
				this.isEditTitle = false
			},
			selectHandle(type, data){
				this.select(type, data)
			},
			delRole(index){
				this.form.nodeRoleList.splice(index, 1)
			},
			save(){
				this.$emit("update:modelValue", this.form)
				this.drawer = false
			},
			toText(nodeConfig){
				if(nodeConfig.nodeRoleList && nodeConfig.nodeRoleList.length > 0){
					return nodeConfig.nodeRoleList.map(item=>item.name).join("、")
				}else{
					return "所有人"
				}
			},
			getFormOperates(){
				let res = []
				this.isApproverNode() && (res = this.approverForm.formOperates)
				this.isStartNode() && (res = this.startForm.formOperates)
				return res
			},
			// 配合getPriorityLength 获取前一个节点条件数组长度 用于设置优先级
			getPrevData() {
			return NodeUtils.getPreviousNode(this.value.prevId, this.processData);
			},
			// 用于获取节点优先级范围
			getPriorityLength() {
			this.priorityLength = this.getPrevData().conditionNodes.length;
			},
			// 判断是否是条件节点
			isConditionNode() {
			return this.value ? NodeUtils.isConditionNode(this.value) : false;
			},
			/** 判断是否是审批节点*/
			isApproverNode(){
			return this.value ? NodeUtils.isApproverNode(this.value) : false;
			},

			isStartNode(){
			return this.value ? NodeUtils.isStartNode(this.value) : false;
			},

			isCopyNode () {
			return this.value ? NodeUtils.isCopyNode(this.value) : false
			},

			initInitiator(){
			const initiator = this.value.properties && this.value.properties.initiator
			this.initiator['dep&user'] = Array.isArray(initiator) ? initiator : []
			},
				/**
			 * 初始化审批节点所需数据
			 */
			initApproverNodeData() {
			for (const key in this.approverForm) {
				if (this.value.properties.hasOwnProperty(key)) {
				this.approverForm[key] = this.value.properties[key];
				}
			}
			const approvers = this.approverForm.approvers
			this.resetOrgColl()
			if (Array.isArray(this.approverForm.approvers)) {
				this.orgCollection[this.approverForm.assigneeType] = approvers
			}
			this.approverForm.formOperates = this.initFormOperates(this.value)
			},
			/**
			 * 初始化条件节点数据
			 */
			initConditionNodeData(){
			// 初始化条件表单数据
			let nodeConditions = this.value.properties && this.value.properties.conditions
			this.pconditions = JSON.parse(JSON.stringify(this.store.state.meta.processConditions));
			this.initiator['dep&user'] = this.value.properties.initiator
			if(Array.isArray(this.pconditions)){
				this.showingPCons = [-1] // 默认显示发起人
				this.pconditions.forEach(t => {
				let temp = undefined
				if(Array.isArray(nodeConditions)){
					const con = nodeConditions.find(item => item.formId == t.formId)
					con && con.conditionValue && (temp = con.conditionValue, this.showingPCons.push(t.formId))
				}
				this.$set(t, 'conditionValue', temp)
				})
			}
			},
		}
	}
</script>

<style>
</style>
