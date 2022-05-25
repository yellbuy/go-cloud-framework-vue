<template>
	<el-container>
		<el-main>
			<div class="scale-slider">
				<i class="btn">
					<SvgIcon name="elementMinus" @click="changeScale(-step)"></SvgIcon>
				</i>
				
				<span style="font-size:14px;">{{scaleVal}}%</span>
				<i class="btn">
					<SvgIcon name="elementPlus" @click="changeScale(step)"></SvgIcon>
				</i>
				
			</div>
			<sc-workflow v-model="data.nodeConfig" :style="{transform: `scale(${scaleVal / 100})`}"></sc-workflow>
		</el-main> 
	</el-container>
</template>

<script>

	import scWorkflow from './component/designer.vue'

	export default {
		name: 'workflow',
		components: {
			scWorkflow
		},
		data() {
			return {
				scaleVal:100,
				step:5,
				data: {
					"id": 1,
					"name": "请假审批",
					"nodeConfig": {
						"nodeName": "发起人",
						"type": 0,
						"nodeRoleList": [],
						"childNode": {
							"nodeName": "条件路由",
							"type": 4,
							"conditionNodes": [{
									"nodeName": "长期",
									"type": 3,
									"priorityLevel": 1,
									"conditionMode": 1,
									"conditionList": [{
										"label": "请假天数",
										"field": "day",
										"operator": ">",
										"value": "7"
									}],
									"childNode": {
										"nodeName": "领导审批",
										"type": 1,
										"setType": 1,
										"nodeUserList": [{
											"id": "360000197302144442",
											"name": "何敏"
										}],
										"nodeRoleList": [],
										"examineLevel": 1,
										"directorLevel": 1,
										"selectMode": 1,
										"termAuto": false,
										"term": 0,
										"termMode": 1,
										"examineMode": 1,
										"directorMode": 0
									}
								},
								{
									"nodeName": "短期",
									"type": 3,
									"priorityLevel": 2,
									"conditionMode": 1,
									"conditionList": [],
									"childNode": {
										"nodeName": "直接主管审批",
										"type": 1,
										"setType": 2,
										"nodeUserList": [],
										"nodeRoleList": [],
										"examineLevel": 1,
										"directorLevel": 1,
										"selectMode": 1,
										"termAuto": false,
										"term": 0,
										"termMode": 1,
										"examineMode": 1,
										"directorMode": 0
									}
								}
							],
							"childNode": {
								"nodeName": "抄送人",
								"type": 2,
								"userSelectFlag": true,
								"nodeUserList": [{
									"id": "220000200908305857",
									"name": "何秀英"
								}]
							}
						}
					}
				}
			}
		},
		mounted() {

		},
		methods: {
			exportJson() {
				this.$message("返回值请查看F12控制台console.log()")
				console.log(this.data)
			},
			/**
			 * 控制流程图缩放
			 * @param { Object } val - 缩放增量 是step的倍数 可正可负
			 */
			changeScale(val) {
			let v = this.scaleVal + val;
			if (v > 0 && v <= 200) {
				// 缩放介于0%~200%
				this.scaleVal = v;
			}
			},
		}
	}
</script>

<style scoped lang="scss">
.scale-slider {
  position: fixed;
  margin-right: 18px;
  right: 0;
  z-index: 99;

  .btn {
    display: inline-block;
    padding: 4px;
    border: 1px solid #cacaca;
    border-radius: 3px;
    background: #FFF;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.do {
	float:right
}
</style>
