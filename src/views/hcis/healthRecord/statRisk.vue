<template>
	<div>
		<table>
			<tr>
				<td style="width:50%;padding:30px;vertical-align: top;">
					<DxPieChart
						id="pieChart1"
						:data-source="state.riskList"
						palette="Bright"
						title="风险情况统计"
					>
						<DxSeries
						argument-field="Name"
						value-field="Total"
						>
						<DxAnimation
							easing="linear"
							:duration="500"
							:max-point-count-supported="100"
						/>
						<DxMargin
							:top="50"
							:bottom="20"
							:left="30"
							:right="30"
						/>
							<DxLabel
								:visible="true"
								:customize-text="formatLabel"
								position="columns"
							>
								<DxConnector
								:visible="true"
								:width="0.5"
								/>
								<DxFont :size="16"/>
							</DxLabel>
						</DxSeries>
						<DxLegend
						:column-count="3"
						orientation="horizontal"
						item-text-position="right"
						horizontal-alignment="center"
						vertical-alignment="bottom"
						/>
						<DxExport :enabled="true"/>
					</DxPieChart>
					<DxPivotGrid
						id="pivotgrid1"
						ref="gridRisk"
						:data-source="state.riskDataSource"
						:allow-sorting-by-summary="false"
						:allow-filtering="false"
						:allow-sorting="false"
						:show-borders="true"
						:show-column-grand-totals="true"
						:show-row-grand-totals="true"
						:show-row-totals="true"
						:show-column-totals="false"
						:field-panel="false"
						@exporting="onExporting"
					>
						<DxHeaderFilter
							:show-relevant-values="true"
							:width="300"
							:height="400"
						>
						<DxSearch :enabled="false"/>
						</DxHeaderFilter>
							<DxFieldChooser
							:enabled="true"
							/>
							<DxFieldPanel
							:visible="false"
						/>
						<DxStateStoring
							:enabled="true"
							type="localStorage"
							storageKey="dashboard-chart-hcis-risk-stat_v1.0"
							/>
						<FieldChooser :enabled="true" />
						<DxExport :enabled="true" />
					</DxPivotGrid>
				</td>
				<td style="width:50%;padding:30px;vertical-align: top;">
					<DxPieChart
						id="pieChart2"
						:data-source="state.followUpModeList"
						palette="Bright"
						title="去向情况统计"
					>
						<DxSeries
						argument-field="Name"
						value-field="Total"
						>
						<DxAnimation
							easing="linear"
							:duration="500"
							:max-point-count-supported="100"
						/>
						<DxMargin
							:top="50"
							:bottom="20"
							:left="30"
							:right="30"
						/>
							<DxLabel
								:visible="true"
								:customize-text="formatLabel"
								position="columns"
							>
								<DxConnector
								:visible="true"
								:width="0.5"
								/>
								<DxFont :size="16"/>
							</DxLabel>
						</DxSeries>
						<DxLegend
						:column-count="3"
						orientation="horizontal"
						item-text-position="right"
						horizontal-alignment="center"
						vertical-alignment="bottom"
						/>
						<DxExport :enabled="true"/>
					</DxPieChart>
					<DxPivotGrid
						id="pivotgrid2"
						ref="gridFollowUpMode"
						:data-source="state.followUpModeDataSource"
						:allow-sorting-by-summary="false"
						:allow-filtering="false"
						:allow-sorting="false"
						:show-borders="true"
						:show-column-grand-totals="true"
						:show-row-grand-totals="true"
						:show-row-totals="true"
						:show-column-totals="false"
						:field-panel="false"
						@exporting="onExporting"
					>
						<DxHeaderFilter
							:show-relevant-values="true"
							:width="300"
							:height="400"
						>
						<DxSearch :enabled="false"/>
						</DxHeaderFilter>
							<DxFieldChooser
							:enabled="true"
							/>
							<DxFieldPanel
							:visible="false"
						/>
						<DxStateStoring
							:enabled="true"
							type="localStorage"
							storageKey="dashboard-chart-hcis-followupmode-stat_v1.0"
							/>
						<FieldChooser :enabled="true" />
						<DxExport :enabled="true" />
					</DxPivotGrid>
				</td>
			</tr>
		</table>
	  
	</div>
  </template>
  <script setup lang="ts">
  import {
DxChart
} from 'devextreme-vue/chart';
import DxPieChart, {
DxAnimation,
DxConnector,
DxExport,
DxFont,
DxLabel,
DxLegend,
DxMargin,
DxSeries
} from 'devextreme-vue/pie-chart';
import { loadMessages, locale } from "devextreme/localization";
import zhCnMessages from "devextreme/localization/messages/zh.json";
 loadMessages(zhCnMessages);
locale(navigator.language);

import {
DxFieldChooser,
DxFieldPanel,
DxHeaderFilter,
DxPivotGrid
} from 'devextreme-vue/pivot-grid';
import CustomStore from 'devextreme/data/custom_store';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import 'devextreme/ui/date_box';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/ui/select_box';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const gridRisk = ref<DxPivotGrid>();
const gridFollowUpMode = ref<DxPivotGrid>();
const chart = ref<DxChart>();
const state: any = reactive({
	riskDataSource:PivotGridDataSource,
	followUpModeDataSource:PivotGridDataSource,
	riskList:[],
	followUpModeList:[],
});
const formatLabel = ({ valueText, percentText }) => `${valueText} (${percentText})`;
const createRiskDataSource:any = ()=>{
	const customStore = new CustomStore({
    loadMode: "raw", // omit in the DataGrid, TreeList, PivotGrid, and Scheduler 
    load: async () => {
		const res = await proxy.$api.hcis.healthRecord.getRiskStatByScope(kind,scopeMode,scopeValue)
		state.riskList=res.data||[];
		return  res.data||[]
    }});
	
	const riskDataSource = new PivotGridDataSource({
		//retrieveFields:false,
		onFieldsPrepared: (fields) => {
        // Your code goes here
			
    	},
		fields: [{
			caption: '级别',
			width: 300,
			dataField: 'Name',
			sortBy : 'none',
			area: 'row',
		}, {
			caption: '人数',
			dataField: 'Total',
			dataType: 'number',
			summaryType: 'sum',
			area: 'data',
		}],
		store: customStore,
	});
	return riskDataSource;
}
state.riskDataSource=createRiskDataSource();

const createFollowUpModeDataSource:any = ()=>{
	const customStore = new CustomStore({
    loadMode: "raw", // omit in the DataGrid, TreeList, PivotGrid, and Scheduler 
    load: async () => {
		const res = await proxy.$api.hcis.healthRecord.getFollowUpModeStatByScope(kind,scopeMode,scopeValue)
		state.followUpModeList=res.data||[];
		return  res.data||[]
    }});
	
	const followUpModeDataSource = new PivotGridDataSource({
		//retrieveFields:false,
		onFieldsPrepared: (fields) => {
        // Your code goes here
			
    	},
		fields: [{
			caption: '去向',
			width: 300,
			dataField: 'Name',
			sortBy : 'none',
			area: 'row',
		}, {
			caption: '人数',
			dataField: 'Total',
			dataType: 'number',
			summaryType: 'sum',
			area: 'data',
		}],
		store: customStore,
	});
	return followUpModeDataSource;
}
state.followUpModeDataSource=createFollowUpModeDataSource();
	
	const customizeTooltip = ({ seriesName, originalValue }) => {
		const valueText = (seriesName.indexOf('Total') !== -1)
		? new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'RMB' }).format(originalValue)
		: originalValue;
	
		return {
		html: `${seriesName}<div class='currency'>${valueText}</div>`,
		};
	};
	
	const { proxy } = getCurrentInstance() as any;
	const route = useRoute();
	const kind = route.params.kind || "common";
	const scopeMode = route.params.scopeMode || 0;
	const scopeValue = route.params.scopeValue || 0;
	
	const onQuery= async ()=>{
		state.riskDataSource=createRiskDataSource()
	}
	const onExporting=(e)=> {
		const workbook = new Workbook();
		const worksheet = workbook.addWorksheet('Main sheet');
		exportPivotGrid({
			component: e.component,
			worksheet: worksheet,
			customizeCell: function(options) {
				const excelCell = options;
				excelCell.font = { name: 'Arial', size: 12 };
				excelCell.alignment = { horizontal: 'left' };
			} 
		}).then(function() {
			workbook.xlsx.writeBuffer()
				.then(function(buffer) {
					saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '统计.xlsx');
				});
		});
	}
	
	onMounted(() => {
		gridRisk.value?.instance?.bindChart(chart.value?.instance, {
		dataFieldsDisplayMode: 'splitPanes',
		//dataFieldsDisplayMode: 'splitAxes',
		alternateDataFields: false,
		});
	});
  </script>
  <style>
  #pivotgrid1,#pivotgrid2 {
	margin-top: 10px;
	margin-bottom: 30px;
	width:100%;
  }
  
  .currency {
	text-align: center;
  }
  #pieChart1,#pieChart2 {
    width: 100%;
    height: 300px;
}
  </style>