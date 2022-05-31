<template>
	<div class="node-wrap">
		<div class="node-wrap-box" @click="show">
			<div class="title" style="background: #3296fa;">
				<el-icon class="icon">
					<Promotion />
				</el-icon>
				<!-- <el-icon class="icon"><el-icon-promotion /></el-icon> -->
				<span>{{ nodeConfig.nodeName }}</span>
				<el-icon class="close" @click.stop="delNode()">
					<Close />
				</el-icon>
				<!-- <el-icon class="close" @click.stop="delNode()"><el-icon-close /></el-icon> -->
			</div>
			<div class="content">
				<span v-if="toText(nodeConfig)">{{ toText(nodeConfig) }}</span>
				<span v-else class="placeholder">请选择人员</span>
			</div>
		</div>
		<add-node v-model="nodeConfig.childNode"></add-node>
		<el-drawer title="抄送人设置" v-model="drawer" destroy-on-close append-to-body :size="500">
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
					<el-form label-position="top">
						<el-form-item label="选择要抄送的人员">
							<el-button type="primary" icon="el-icon-plus" round @click="selectHandle(1, form.nodeUserList)">
								<el-icon>
									<Plus />
								</el-icon>
							选择人员</el-button>
							<div class="tags-list">
								<el-tag v-for="(user, index) in form.nodeUserList" :key="user.id" closable @close="delUser(index)">{{user.name}}</el-tag>
							</div>
						</el-form-item>
						<el-form-item label="">
							<el-checkbox v-model="form.userSelectFlag" label="允许发起人自选抄送人"></el-checkbox>
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
			selectHandle(type, data){
				this.select(type, data)
			},
			toText(nodeConfig){
				if (nodeConfig.nodeUserList && nodeConfig.nodeUserList.length>0) {
					const users = nodeConfig.nodeUserList.map(item=>item.name).join("、")
					return users
				}else{
					if(nodeConfig.userSelectFlag){
						return "发起人自选"
					}else{
						return false
					}

				}
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
