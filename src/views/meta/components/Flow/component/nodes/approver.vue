<template>
	<div class="node-wrap">
		<div class="node-wrap-box" @click="show">
			<div class="title" style="background: #ff943e;">
				<el-icon class="icon">
					<UserFilled />
				</el-icon>
				<!-- <el-icon class="icon"><el-icon-user-filled /></el-icon> -->
				<span>{{ nodeConfig.nodeName }}</span>
				<el-icon class="close" @click.stop="delNode()">
					<Close />
				</el-icon>
				<!-- <el-icon class="close" @click.stop="delNode()"><el-icon-close /></el-icon> -->
			</div>
			<div class="content">
				<span v-if="toText(nodeConfig)">{{ toText(nodeConfig) }}</span>
				<span v-else class="placeholder">请选择</span>
			</div>
		</div>
		<add-node v-model="nodeConfig.childNode"></add-node>
		<el-drawer title="审批人设置" v-model="drawer" destroy-on-close append-to-body :size="500">
			<template #title>
				<div class="node-wrap-drawer__title">
					<label @click="editTitle" v-if="!isEditTitle">{{form.nodeName}}
						<el-icon class="node-wrap-drawer__title-edit">
							<Edit />
						</el-icon>
						<!-- <el-icon class="node-wrap-drawer__title-edit"><el-icon-edit /></el-icon> -->
					</label>
					<el-input v-if="isEditTitle" ref="nodeTitle" v-model="form.nodeName" clearable @blur="saveTitle" @keyup.enter="saveTitle"></el-input>
				</div>
			</template>
			<el-container>
				<el-main style="padding:0 20px 20px 20px">
					<!-- 审批人 -->
					<section class="approver-pane" style="height:100%;" >
						<el-tabs v-model="activeName" class="pane-tab">
							<el-tab-pane  :label="'设置审批人'" name="config">
								<div>
									<div style="padding: 12px;">
									<el-radio-group v-model="approverForm.assigneeType" style="line-height: 32px;" @change="resetOrgColl">
										<el-radio v-for="item in assigneeTypeOptions" :label="item.value" :key="item.value" class="radio-item">{{item.label}}</el-radio>
									</el-radio-group>
									</div>
									<div style="border-bottom: 1px solid #e5e5e5;padding-bottom: 1rem;">
									<div v-if="approverForm.assigneeType === 'myself'"  class="option-box" style="color: #a5a5a5;">发起人自己将作为审批人处理审批单</div>
									<div v-else-if="approverForm.assigneeType === 'optional'"  class="option-box">
										<p style="font-size: 12px;">可选多人</p>
										<el-switch v-model="approverForm.optionalMultiUser" active-color="#13ce66" size="small"> </el-switch>
										<p style="font-size: 12px;">选择范围</p>
										<el-select v-model="approverForm.optionalRange" size="small">
										<el-option v-for="(item, index) in rangeOptions" :key="index" :label="item.label" :value="item.value"
											:disabled="item.disabled"></el-option>
										</el-select>
									</div>
									<div v-else-if="approverForm.assigneeType === 'director'">
										<div style="font-size: 12px;padding-left: 1rem;">发起人的 
										<el-select v-model="directorLevel" size="small">
											<el-option v-for="item in 5" :key="item" :label="item === 1 ? '直接主管': `第${item}级主管`" :value="item"></el-option>
										</el-select>
										<br>
										<el-checkbox v-model="useDirectorProxy" style="margin-top: 1rem;">找不到主管时，由上级主管代审批</el-checkbox>
										</div>
									</div>
									<div v-else class="option-box">
										<fc-org-select  
										ref="approver-org" 
										buttonType="button" 
										v-model="orgCollection" 
										:title="getAssignTypeLabel()" 
										:tabList="fcOrgTabList.includes(approverForm.assigneeType) ? [approverForm.assigneeType] : ['dep']" 
										@change="onOrgChange" />
									</div>
									</div>
									<div class="option-box" style="border-bottom: 1px solid #e5e5e5;" v-if="orgCollection[approverForm.assigneeType] && orgCollection[approverForm.assigneeType].length > 1 || ['optional'].includes(approverForm.assigneeType)">
									<p>多人审批时采用的审批方式</p>
									<el-radio v-model="approverForm.counterSign" :label="true" class="radio-item">会签（须所有审批人同意）</el-radio>
									<br>
									<el-radio  v-model="approverForm.counterSign"  :label="false" class="radio-item">或签（一名审批人同意或拒绝即可）</el-radio>
									</div>
								</div>

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
					<el-form label-position="top">

						<!-- <el-form-item label="审批人员类型">
							<el-select v-model="form.setType">
								<el-option :value="1" label="指定成员"></el-option>
								<el-option :value="2" label="主管"></el-option>
								<el-option :value="3" label="角色"></el-option>
								<el-option :value="4" label="发起人自选"></el-option>
								<el-option :value="5" label="发起人自己"></el-option>
								<el-option :value="7" label="连续多级主管"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item v-if="form.setType==1" label="选择成员">
							<el-button type="primary" round @click="selectHandle(1, form.nodeUserList)">
								<el-icon>
									<Plus />
								</el-icon>
								选择人员
						</el-button>
							<div class="tags-list">
								<el-tag v-for="(user, index) in form.nodeUserList" :key="user.id" closable @close="delUser(index)">{{user.name}}</el-tag>
							</div>
						</el-form-item>

						<el-form-item v-if="form.setType==2" label="指定主管">
							发起人的第  <el-input-number v-model="form.examineLevel" :min="1"/>  级主管
						</el-form-item>

						<el-form-item v-if="form.setType==3" label="选择角色">
							<el-button type="primary" round @click="selectHandle(2, form.nodeRoleList)">
								<el-icon>
									<Plus />
								</el-icon>
								选择角色
							</el-button>
							<div class="tags-list">
								<el-tag v-for="(role, index) in form.nodeRoleList" :key="role.id" type="info" closable @close="delRole(index)">{{role.name}}</el-tag>
							</div>
						</el-form-item>

						<el-form-item v-if="form.setType==4" label="发起人自选">
							<el-radio-group v-model="form.selectMode">
								<el-radio :label="1">自选一个人</el-radio>
								<el-radio :label="2">自选多个人</el-radio>
							</el-radio-group>
						</el-form-item>-->

						<el-form-item v-if="approverForm.assigneeType === 'director'" label="连续主管审批终点">
							<el-radio-group v-model="form.directorMode">
								<el-radio :label="0">直到最上层主管</el-radio>
								<el-radio :label="1">自定义审批终点</el-radio>
							</el-radio-group>
							<p v-if="form.directorMode==1">直到发起人的第  <el-input-number v-model="form.directorLevel" :min="1"/> 级主管</p>
						</el-form-item>

						<el-divider></el-divider>
						<el-form-item label="">
							<el-checkbox v-model="form.termAuto" label="超时自动审批"></el-checkbox>
						</el-form-item>
						<template v-if="form.termAuto">
							<el-form-item label="审批期限（为 0 则不生效）">
								<el-input-number v-model="form.term" :min="0"/> 小时
							</el-form-item>
							<el-form-item label="审批期限超时后执行">
								<el-radio-group v-model="form.termMode">
									<el-radio :label="0">自动通过</el-radio>
									<el-radio :label="1">自动拒绝</el-radio>
								</el-radio-group>
							</el-form-item>
						</template>
						<el-divider></el-divider>
						<el-form-item label="多人审批时审批方式">
							<el-radio-group v-model="form.examineMode">
								<p style="width: 100%;"><el-radio :label="1">按顺序依次审批</el-radio></p>
								<p style="width: 100%;"><el-radio :label="2">会签 (可同时审批，每个人必须审批通过)</el-radio></p>
								<p style="width: 100%;"><el-radio :label="3">或签 (有一人审批通过即可)</el-radio></p>
							</el-radio-group>
						</el-form-item>
					</el-form> 
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
	const defaultApproverForm = {
		approvers:[], // 审批人集合
		assigneeType: "user", // 指定审批人
		formOperates:[], // 表单操作权限集合
		counterSign: true, //是否为会签
		// 审批类型为自选 出现 optionalMultiUser optionalRange
		optionalMultiUser: false,
		optionalRange: 'ALL', // USER<最多十个> / ALL / ROLE 
	}
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
				activeName:"config",
      			fcOrgTabList:['dep', 'role', 'user', 'position'],

				nodeConfig: {},
				drawer: false,
				isEditTitle: false,
				form: {},

				initiator:{
					'dep&user': []
				}, 
				priorityLength: 0, // 当为条件节点时  显示节点优先级选项的数据
				orgCollection:{
					dep: [],
					role: [],
					user: [],
					position: []
				},
				useDirectorProxy: true, // 找不到主管时 上级主管代理审批
				directorLevel: 1,  // 审批主管级别

				startForm:{
					formOperates: []
				},
				approverForm: JSON.parse(JSON.stringify(defaultApproverForm)),
				optionalOptions: [
					{
					label: '自选一个人',
					value: false
					}, {
					label: '自选多个人',
					value: true
					}],
					rangeOptions: [
					{
					label: '全公司',
					value: 'ALL'
					}, {
					label: '指定成员',
					value: 'USER'
					}, {
					label: '角色',
					value: 'ROLE'
				}],
				
				assigneeTypeOptions:[
					{
					label:'指定成员',
					value: 'user'
					},
					{
					label:'主管',
					value: 'director'
					},
					{
					label:'角色',
					value: 'role'
					},
					{
					label:'岗位',
					value: 'position'
					},
					{
					label:'发起人自己',
					value: 'myself'
					},
					{
					label:'发起人自选',
					value: 'optional'
				}]
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
			save(){
				this.$emit("update:modelValue", this.form)
				this.drawer = false
			},
			delNode(){
				this.$emit("update:modelValue", this.nodeConfig.childNode)
			},
			delUser(index){
				this.form.nodeUserList.splice(index, 1)
			},
			delRole(index){
				this.form.nodeRoleList.splice(index, 1)
			},
			selectHandle(type, data){
				this.select(type, data)
			},
			toText(nodeConfig){
				if(nodeConfig.setType == 1){
					if (nodeConfig.nodeUserList && nodeConfig.nodeUserList.length>0) {
						const users = nodeConfig.nodeUserList.map(item=>item.name).join("、")
						return users
					}else{
						return false
					}
				}else if (nodeConfig.setType == 2) {
					return nodeConfig.examineLevel == 1 ? '直接主管' : `发起人的第${nodeConfig.examineLevel}级主管`
				}else if (nodeConfig.setType == 3) {
					if (nodeConfig.nodeRoleList && nodeConfig.nodeRoleList.length>0) {
						const roles = nodeConfig.nodeRoleList.map(item=>item.name).join("、")
						return '角色-' + roles
					}else{
						return false
					}
				}else if (nodeConfig.setType == 4) {
					return "发起人自选"
				}else if (nodeConfig.setType == 5) {
					return "发起人自己"
				}else if (nodeConfig.setType == 7) {
					return "连续多级主管"
				}
			},

			getFormOperates(){
				let res = []
				this.isApproverNode() && (res = this.approverForm.formOperates)
				this.isStartNode() && (res = this.startForm.formOperates)
				return res
			},
			resetOrgColl(){
				for(let key in this.orgCollection){
					this.orgCollection[key]=[]
				}
			},
			onOrgChange(data){ },
				timeTangeLabel(item){
				const index = ['fc-time-duration','fc-date-duration'].findIndex(t => t === item.tag)
				if(index > -1){
					return '时长' + ['(小时)','(天)'][index]
				}else{  
					return item.label
				}
				},
				getAssignTypeLabel(){
				const res = this.assigneeTypeOptions.find(t => t.value === this.approverForm.assigneeType)
				return res ? res.label : ''
				},
				changeAllFormOperate(val){
				const target = this.isStartNode() ? this.startForm : this.approverForm
				target.formOperates.forEach(t => t.formOperate = val)
				},
				// 是否可以显示当前条件组件
				couldShowIt(item, ...tag) {
				return tag.includes(item.tag)  && this.showingPCons.includes(item.formId);
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
				t['conditionValue']=temp
				})
			}
			},
		}
	}
</script>

<style>

</style>
