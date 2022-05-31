<template>
	<div class="branch-wrap">
		<div class="branch-box-wrap">
			<div class="branch-box">
				<el-button class="add-branch" type="success" plain round @click="addTerm">添加条件</el-button>
				<div class="col-box" v-for="(item,index) in nodeConfig.conditionNodes" :key="index">
					<div class="condition-node">
						<div class="condition-node-box">
							<div class="auto-judge" @click="show(index)">
								<div class="sort-left" v-if="index!=0" @click.stop="arrTransfer(index,-1)">
									<!-- <SvgIcon name="elementPlus" /> -->
									<el-icon>
										<ArrowLeft />
									</el-icon>
									<!-- <el-icon><el-icon-arrow-left /></el-icon> -->
								</div>
								<div class="title">
									<span class="node-title">{{ item.nodeName }}</span>
									<span class="priority-title">优先级{{item.priorityLevel}}</span>
									<el-icon class="close" @click.stop="delTerm(index)">
										<Close />
									</el-icon>
									<!-- <el-icon class="close" @click.stop="delTerm(index)"><el-icon-close /></el-icon> -->
								</div>
								<div class="content">
									<span v-if="toText(nodeConfig, index)">{{ toText(nodeConfig, index) }}</span>
									<span v-else class="placeholder">请设置条件</span>
								</div>
								<div class="sort-right" v-if="index!=nodeConfig.conditionNodes.length-1" @click.stop="arrTransfer(index)">
									<el-icon>
										<ArrowRight />
									</el-icon>
									<!-- <el-icon><el-icon-arrow-right /></el-icon> -->
								</div>
							</div>
							<add-node v-model="item.childNode"></add-node>
						</div>
					</div>
					<slot v-if="item.childNode" :node="item"></slot>
					<div class="top-left-cover-line" v-if="index==0"></div>
					<div class="bottom-left-cover-line" v-if="index==0"></div>
					<div class="top-right-cover-line" v-if="index==nodeConfig.conditionNodes.length-1"></div>
					<div class="bottom-right-cover-line" v-if="index==nodeConfig.conditionNodes.length-1"></div>
				</div>
			</div>
			<add-node v-model="nodeConfig.childNode"></add-node>
		</div>
		<el-drawer title="条件设置" v-model="drawer" destroy-on-close append-to-body :size="600">
			<template #title>
				<div class="node-wrap-drawer__title">
					<label @click="editTitle" v-if="!isEditTitle">{{form.nodeName}}
						<SvgIcon class="node-wrap-drawer__title-edit" name="elementEdit">
						</SvgIcon>
					</label>
					<el-input v-if="isEditTitle" ref="nodeTitle" v-model="form.nodeName" clearable @blur="saveTitle" @keyup.enter="saveTitle"></el-input>
				</div>
			</template>
			<el-container>
				<el-main style="padding:0 20px 20px 20px">
					<el-form label-position="top">
						<el-form-item label="条件关系">
							<el-radio-group v-model="form.conditionMode">
								<el-radio :label="1">且</el-radio>
								<el-radio :label="2">或</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-divider></el-divider>
						<section class="condition-pane">
							<row-wrapper title="发起人" v-if="1||showingPCons.includes(-1)">
								<fc-org-select ref="condition-org" :tabList="['dep&user']" v-model="initiator" />
							</row-wrapper>
							
							<template v-for="(item, index) in pconditions">
								<!-- 计数 -->
								<row-wrapper 
								:key="index" 
								:title="item.label" 
								v-if="couldShowIt(item,'el-input-number','fc-date-duration','fc-time-duration','fc-amount', 'fc-calculate')">
								<num-input
									:key="index"
									:title="timeTangeLabel(item)"
									v-model="item.conditionValue"
									style="padding-right: 6px;"
								></num-input>
								<template v-slot:action>
									<i  class="el-icon-delete" style="cursor: pointer;" @click="onDelCondition(item)"></i>
								</template>
								</row-wrapper>
								<!-- 单选组 -->
								<row-wrapper 
								:key="index" 
								:title="item.label" 
								v-if="couldShowIt(item,'el-radio-group')">
								<el-radio-group v-model="item.conditionValue" class="radio-group">
									<el-radio v-for="item in item.options" :label="item.label" :key="item.label">{{item.label}}</el-radio>
								</el-radio-group>
								<template v-slot:action>
									<i  class="el-icon-delete" style="cursor: pointer;" @click="onDelCondition(item)"></i>
								</template>
								</row-wrapper>
								
								<!-- 下拉 -->
								<row-wrapper 
								:key="index" 
								:title="item.label" 
								v-if="couldShowIt(item,'el-select')">
								<el-select v-model="item.conditionValue" placeholder="请选择" size="small">
									<el-option
									v-for="item in item.options"
									:key="item.value"
									:label="item.label"
									:value="item.value"
									></el-option>
								</el-select>
								<template v-slot:action>
									<i  class="el-icon-delete" style="cursor: pointer;" @click="onDelCondition(item)"></i>
									</template>
								</row-wrapper>
								<!-- 组织机构 -->
								<row-wrapper :key="index" :title="item.label" v-if="couldShowIt(item,'fc-org-select')">
								<fc-org-select 
								v-model="item.conditionValue" 
								:ref="'org' + index" 
								:tabList="['dep']" 
								/>
								<template v-slot:action>
									<i  class="el-icon-delete" style="cursor: pointer;" @click="onDelCondition(item)"></i>
								</template>
								</row-wrapper>
							</template>
							<div style="padding-left:10px;margin-top:2em;">
								<el-button type="primary" size="small" icon="el-icon-plus" @click="dialogVisible=true">添加条件</el-button>
								<span style="color:#aaa;margin-left:16px;">还有{{notUseConNum}}个可用条件</span>
							</div>
						</section>
						<!-- <el-form-item>
							<el-table :data="form.conditionList">
								<el-table-column prop="label" label="描述">
									<template #default="scope">
										<el-input v-model="scope.row.label" placeholder="描述"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="field" label="条件字段" width="130">
									<template #default="scope">
										<el-input v-model="scope.row.field" placeholder="条件字段"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="operator" label="运算符" width="130">
									<template #default="scope">
										<el-select v-model="scope.row.operator" placeholder="Select">
											<el-option label="等于" value="="></el-option>
											<el-option label="不等于" value="!="></el-option>
											<el-option label="大于" value=">"></el-option>
											<el-option label="大于等于" value=">="></el-option>
											<el-option label="小于" value="<"></el-option>
											<el-option label="小于等于" value="<="></el-option>
											<el-option label="包含" value="include"></el-option>
											<el-option label="不包含" value="notinclude"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column prop="value" label="值" width="100">
									<template #default="scope">
										<el-input v-model="scope.row.value" placeholder="值"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="value" label="移除" width="55">
									<template #default="scope">
										<el-button size="small" type="text" @click="deleteConditionList(scope.$index)">移除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-form-item> -->
						<!-- <p><el-button type="primary" icon="el-icon-plus" round @click="addConditionList">增加条件</el-button></p> -->
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
	import rowWrapper from './rowWrapper.vue'
	export default {
		props: {
			modelValue: { type: Object, default: () => {} }
		},
		components: {
			addNode,
			rowWrapper
		},
		data() {
			return {
				nodeConfig: {},
				showingPCons: [], // 用户选择了得条件  被选中的才会被展示在面板上编辑
				pconditions: [], // 从vuex中获取的可以作为流程图条件的集合
				dialogVisible: false, // 控制流程条件选项Dialog显隐
				drawer: false,
				isEditTitle: false,
				index: 0,
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
			show(index){
				this.index = index
				this.form = {}
				this.form = JSON.parse(JSON.stringify(this.nodeConfig.conditionNodes[index]))
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
				this.nodeConfig.conditionNodes[this.index] = this.form
				this.$emit("update:modelValue", this.nodeConfig)
				this.drawer = false
			},
			addTerm(){
				let len = this.nodeConfig.conditionNodes.length + 1
				this.nodeConfig.conditionNodes.push({
					nodeName: "条件" + len,
					type: 3,
					priorityLevel: len,
					conditionMode: 1,
					conditionList: []
				})
			},
			delTerm(index){
				this.nodeConfig.conditionNodes.splice(index, 1)
				if (this.nodeConfig.conditionNodes.length == 1) {
					if (this.nodeConfig.childNode) {
						if (this.nodeConfig.conditionNodes[0].childNode) {
							this.reData(this.nodeConfig.conditionNodes[0].childNode, this.nodeConfig.childNode)
						}else{
							this.nodeConfig.conditionNodes[0].childNode = this.nodeConfig.childNode
						}
					}
					this.$emit("update:modelValue", this.nodeConfig.conditionNodes[0].childNode);
				}
			},
			reData(data, addData) {
				if (!data.childNode) {
					data.childNode = addData
				} else {
					this.reData(data.childNode, addData)
				}
			},
			arrTransfer(index, type = 1){
				this.nodeConfig.conditionNodes[index] = this.nodeConfig.conditionNodes.splice(index + type, 1, this.nodeConfig.conditionNodes[index])[0]
				this.nodeConfig.conditionNodes.map((item, index) => {
					item.priorityLevel = index + 1
				})
				this.$emit("update:modelValue", this.nodeConfig)
			},
			addConditionList(){
				this.form.conditionList.push({
					label: '',
					field: '',
					operator: '=',
					value: ''
				})
			},
			deleteConditionList(index){
				this.form.conditionList.splice(index, 1)
			},
			toText(nodeConfig, index){
				var { conditionList } = nodeConfig.conditionNodes[index]
				if (conditionList && conditionList.length == 1) {
					const text = conditionList.map(item => `${item.label}${item.operator}${item.value}`).join(" 和 ")
					return text
				}else if(conditionList && conditionList.length > 1){
					const conditionModeText = nodeConfig.conditionNodes[index].conditionMode==1?'且行':'或行'
					return conditionList.length + "个条件，" + conditionModeText
				}else{
					if(index == nodeConfig.conditionNodes.length - 1){
						return "其他条件进入此流程"
					}else{
						return false
					}
				}
			}
		}
	}
</script>

<style>
</style>
