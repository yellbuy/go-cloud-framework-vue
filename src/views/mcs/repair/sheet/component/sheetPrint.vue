<template media="print">
	<div id="printRef" >
		<h3 style="text-align: center;">攀枝花钢城集团汉风物流有限公司车辆服务中心</h3>
		<h3 style="text-align: center;">结  算  单</h3>
		<p>
			<span>维修单号：{{ ruleForm.BillNo }}</span>
			<span style="margin-left:10px">进厂时间：{{ ruleForm.StartTime?.substr(0,10) }}</span>
			<span style="margin-left:10px">出厂时间：{{ ruleForm.EndTime?.substr(0,10) }}</span>
			<span style="margin-left:10px">操作员：{{ ruleForm.CreateBy }}</span>
			<span style="margin-left:10px">结算时间：</span>
		</p>
		<table class="tbDetail mt10" width="100%" border="1" cellspacing="0" cellpadding="4" >
				<tbody>
					<tr>
						
						<td style="width:10%;text-align: center;">车牌号</td>
						<td style="width:15%">{{ ruleForm.VehicleNumber }}</td>
						<td style="width:10%;text-align: center;">车型</td>
						<td style="width:15%">{{ ruleForm.VehicleType }}</td>
						<td style="width:10%;text-align: center;">送修人</td>
						<td style="width:15%">{{ ruleForm.Linkman }}</td>
						<td style="width:10%;text-align: center;">送修人电话</td>
						<td style="width:15%">{{ ruleForm.Phone }}</td>
					</tr>
					<tr>
						<td style="text-align: center;">客户名称</td>
						<td colspan="5">{{ ruleForm.CompanyName }}</td>
						<td style="text-align: center;">进厂里程</td>
						<td style="text-align: right;">{{ ruleForm.Mileage }}</td>
					</tr>					
					<tr>
						<td style="text-align: center;" colspan="8">项目明细</td>
					</tr>
					<tr>
						<td style="text-align: center;">序号</td>
						<td colspan="2" style="text-align: center;">修理项目</td>
						<td style="text-align: right;">修理费</td>
						<td style="text-align: center;">序号</td>
						<td colspan="2" style="text-align: center;">修理项目</td>
						<td style="text-align: right;">修理费</td>
					</tr>
					<tr v-for="(val,index) in ruleForm.VehicleProjectList" :key="index">
						<td v-if="index%2==0" style="text-align: right;font-size:14px">{{index+1}}</td>
						<td v-if="index%2==0" colspan="2" style="font-size:14px">{{ val.Name }}</td>
						<td v-if="index%2==0" style="text-align: right;font-size:14px">{{ val.Amount }}</td>
						<td v-if="index%2==0" style="text-align: right;font-size:14px">{{ruleForm.VehicleProjectList.length>index+1?index+2:""}}</td>
						<td v-if="index%2==0" colspan="2" style="font-size:14px">{{ ruleForm.VehicleProjectList.length>index+1?ruleForm.VehicleProjectList[index+1].Name:"" }}</td>
						<td v-if="index%2==0" style="text-align: right;font-size:14px">{{ ruleForm.VehicleProjectList.length>index+1?ruleForm.VehicleProjectList[index+1].Amount:"" }}</td>
					</tr>
					<tr>
						<td colspan="8" style="text-align: center;">维修费小计：{{projectAmount.toFixed(2)}}</td>
					</tr>
					<tr>
						<td style="text-align: center;" colspan="8">材料费明细</td>
					</tr>
					<tr>
						<td style="text-align: right;">序号</td>
						<td colspan="4" style="text-align: center;">材料名称</td>
						<td style="text-align: right;">数量</td>
						<td style="text-align: right;">单价</td>
						<td style="text-align: right;">金额</td>
					</tr>
					<tr v-for="(val,index) in ruleForm.VehicleGoodsList" :key="index">
						<td style="text-align: right;font-size:14px">{{index+1}}</td>
						<td colspan="4" style="text-align: center;font-size:14px">{{val.GoodsName}}</td>
						<td style="text-align: right;font-size:14px">{{ val.Qty }}</td>
						<td style="text-align: right;font-size:14px">{{ val.Price }}</td>
						<td style="text-align: right;font-size:14px">{{ val.Amount }}</td>
					</tr>
					<tr>
						<td colspan="8" style="text-align: center;">材料费小计：{{goodsAmount.toFixed(2)}}</td>
					</tr>
					<tr>
						<td colspan="4" style="text-align: center;"><b>大写：{{upperCaseTotalAmount}}</b></td>
						<td colspan="4" style="text-align: center;"><b>总计：{{totalAmount.toFixed(2)}}</b></td>
					</tr>
				</tbody>
				
			</table>
			<table width="100%" border="0" cellspacing="0" cellpadding="4" >
				<tbody>
					<tr>
						<td style="width:50%">
							<span>客户验收及签署：</span>
						</td>
						<td style="width:50%">
							<span>电话：0812-3981823</span>
							<span style="margin-left:10px">传真：0812-3981823</span>
						</td>
					</tr>
					<tr>
						<td style="width:50%">
							
						</td>
						<td style="width:50%">
							<span>地址：攀枝花市东区钢城大道东段(东区烂院子)</span>
						</td>
					</tr>
				</tbody>
			</table>
	</div>
</template>

<script lang="ts">
import printJs from 'print-js';
import { computed, getCurrentInstance, reactive, toRefs } from 'vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'funPrintJs',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { toUpperCaseAmount } = commonFunction();
		const state = reactive({
			ruleForm:{
				VehicleProjectList:[],
				VehicleGoodsList:[],
			},
		});
		const getRowById = async (id: string) => {
			const res = await proxy.$api.erp.vehicle.getById(id,true);
			if (res.errcode != 0) {
				return;
			}
			state.ruleForm = res.data;
		};
		const projectAmount=computed(()=>{
			const amount = state.ruleForm.VehicleProjectList.reduce((pre, cur) => {
				return pre + cur.Amount;
			},0);
			return amount
		})
		const goodsAmount=computed(()=>{
			const amount = state.ruleForm.VehicleGoodsList.reduce((pre, cur) => {
				return pre + cur.Amount;
			},0);
			return amount
		})
		const totalAmount=computed(()=>{
			return projectAmount.value+goodsAmount.value;
		})
		const upperCaseTotalAmount=computed(()=>{
			if(!totalAmount.value){
				return "";
			}
			return toUpperCaseAmount(totalAmount.value);
		})
		// 打印点击
		const onPrintJs = async (id: string) => {
			await getRowById(id)
			printJs({
				printable: 'printRef',
				type: 'html',
				css: ['//at.alicdn.com/t/font_2298093_o73r8wjdhlg.css', 'https://unpkg.com/element-plus/es/theme-chalk/index.css'],
				scanStyles: false,
				style: `@media print{.mb15{margin-bottom:15px;}.el-button--small i.iconfont{font-size: 12px !important;margin-right: 5px;}}`,
			});
		};
		return {
			onPrintJs,
			projectAmount,
			goodsAmount,
			totalAmount,
			upperCaseTotalAmount,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
table{
	width:100%
}
table.tbDetail tr td { border:1px solid #666; }
@media print {
  #printRef {
    display:block;
  }
}
@media screen {
  #printRef {
    display:none;
  }
}
</style>