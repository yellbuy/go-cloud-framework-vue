<template>
	<div>
		<DxToolbar>
			<DxItem
				location="left"
				locate-in-menu="never"
			>
				<div class="toolbar-label"><b>统计报表</b></div>
			</DxItem>
			<DxItem
				location="after"
				locate-in-menu="auto"
			>
				<div class="toolbar-label">开始日期：</div>
			</DxItem>
			<DxItem
				:options="startDateBoxOptions"
				location="after"
				locate-in-menu="auto"
				widget="dxDateBox"
			/>
			<DxItem
				location="after"
				locate-in-menu="auto"
			>
				<div class="toolbar-label">结束日期：</div>
			</DxItem>
			<DxItem
				:options="endDateBoxOptions"
				location="after"
				locate-in-menu="auto"
				widget="dxDateBox"
			/>
			<!-- <DxItem
				:options="selectBoxOptions"
				location="after"
				locate-in-menu="auto"
				widget="dxSelectBox"
			/> -->
			<DxItem
				:options="queryButtonOptions"
				location="after"
				locate-in-menu="auto"
				widget="dxButton"
			/>
		</DxToolbar>
	  <DxChart ref="chart">
		<DxTooltip
		  :enabled="true"
		  :customize-tooltip="customizeTooltip"
		/>
		<DxAdaptiveLayout :width="450"/>
		<DxSize :height="280"/>
		<DxCommonSeriesSettings type="bar"/>
	  </DxChart>
  
	  <DxPivotGrid
		id="pivotgrid"
		ref="grid"
		:data-source="state.dataSource"
		:allow-sorting-by-summary="true"
		:allow-filtering="true"
      	:allow-sorting="true"
		:show-borders="true"
		:show-column-grand-totals="true"
		:show-row-grand-totals="true"
		:show-row-totals="true"
		:show-column-totals="true"
		:field-panel="true"
		@exporting="onExporting"
	  >
	  <DxHeaderFilter
        :show-relevant-values="true"
        :width="300"
        :height="400"
      >
        <DxSearch :enabled="true"/>
      </DxHeaderFilter>
		<DxFieldChooser
		  :enabled="true"
		/>
		<DxFieldPanel
        :visible="true"
      />
	  <DxStateStoring
          :enabled="true"
          type="localStorage"
          storageKey="dashboard-chart-waybill_v1.0"
        />
	  <FieldChooser :enabled="true" />
	  <DxExport :enabled="true" />
	  </DxPivotGrid>
	</div>
  </template>
  <script setup lang="ts">
import dayjs from 'dayjs';
import { loadMessages, locale } from "devextreme/localization";
import zhCnMessages from "devextreme/localization/messages/zh.json";
 loadMessages(zhCnMessages);
locale(navigator.language);
		
 import {
	DxAdaptiveLayout,
	DxChart,
	DxCommonSeriesSettings,
	DxSize,
	DxTooltip
} from 'devextreme-vue/chart';

import {
	DxExport,
	DxFieldChooser,
	DxFieldPanel,
	DxHeaderFilter,
	DxPivotGrid
} from 'devextreme-vue/pivot-grid';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';
import CustomStore from 'devextreme/data/custom_store';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import 'devextreme/ui/date_box';
import dxDateBox from "devextreme/ui/date_box";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/ui/select_box';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const grid = ref<DxPivotGrid>();
const chart = ref<DxChart>();
const startDateBox=ref<dxDateBox>();
const endDateBox=ref<dxDateBox>();
const state: any = reactive({
	dataSource:PivotGridDataSource
});
let startDate=dayjs(new Date()).add(-3, 'year');
let endDate=dayjs(new Date());
const createDataSource:any = ()=>{
	const customStore = new CustomStore({
    loadMode: "raw", // omit in the DataGrid, TreeList, PivotGrid, and Scheduler 
    load: async () => {
        const startTime=dayjs(startDate).format("YYYY-MM-DD")
		const endTime=dayjs(endDate).format("YYYY-MM-DD")
		const res = await proxy.$api.erp.waybillLine.getStatListByScope(kind,scopeMode,scopeValue,{startTime,endTime})
		return  res.data||[]
    }});
	
	const dataSource = new PivotGridDataSource({
		//retrieveFields:false,
		onFieldsPrepared: (fields) => {
        // Your code goes here
			for(const field of fields){
				console.log("fileds:",field)
				
				if(field.groupName=="BillDate"){
					if(field.levels && field.levels.length>0){
						for(const level of field.levels){
							if(level.groupInterval=="year"){
								level.caption="年"
							}else if(level.groupInterval=="quarter"){
								level.caption="季"
							}else if(level.groupInterval=="month"){
								level.caption="月"
							}else if(level.groupInterval=="day"){
								level.caption="日"
							}
						}
					}
					

					if(field.groupInterval=="year"){
						field.caption="年"
					} else if(field.groupInterval=="quarter"){
						field.caption="季"
					} else if(field.groupInterval=="month"){
						field.caption="月"
					} else if(field.groupInterval=="day"){
						field.caption="日"
					}
				}
			}
    	},
		fields: [{
			caption: '产品',
			width: 120,
			dataField: 'GoodsName',
			area: 'row',
			sortBySummaryField: 'Total',
		}, {
			caption: '规格',
			dataField: 'GoodsSkuName',
			width: 150,
			area: 'row',
		},{
			caption: "类别",
			dataField: "GoodsCategoryName",
			expanded: true,
			area: "filter"
		},{
			caption: "客户",
			dataField: "CustomerName",
			expanded: true,
			area: "filter"
		},{
			caption: "发货地",
			dataField: "SenderName",
			expanded: true,
			area: "filter"
		},{
			caption: "收货地",
			dataField: "ReceiverName",
			expanded: true,
			area: "filter"
		},{
			caption: "公司",
			dataField: "CompanyName",
			expanded: true,
			area: "filter"
		}, {
			caption: "日期",
			dataField: 'BillDate',
			dataType: 'date',
			area: 'column',
			visible: true,
		}, {
			caption: '运量（吨）',
			dataField: 'ReceiverNetWeight',
			dataType: 'number',
			summaryType: 'sum',
			//format: 'currency',
			area: 'data',
		}, {
			caption: '车数',
			dataField: 'TotalCount',
			dataType: 'number',
			summaryType: 'sum',
			area: 'data',
		}],
		store: customStore,
	});
	return dataSource;
}
state.dataSource=createDataSource();
	
	const customizeTooltip = ({ seriesName, originalValue }) => {
		const valueText = (seriesName.indexOf('Total') !== -1)
		? new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'RMB' }).format(originalValue)
		: originalValue;
	
		return {
		html: `${seriesName}<div class='currency'>${valueText}</div>`,
		};
	};

	const startDateBoxOptions = {
		showClearButton: false,
		applyButtonText:  "确定",
		cancelButtonText:  "取消",
		displayFormat: "yyyy-MM-dd HH:mm",
		invalidDateMessage: "日期格式不正确",
		applyValueMode:  "useButtons",
		value: startDate,
		onValueChanged: async ({ value }) => {
			startDate=value;
			await onQuery()
		},
	};
	const endDateBoxOptions = {
		showClearButton: false,
		applyButtonText:  "确定",
		cancelButtonText:  "取消",
		displayFormat: "yyyy-MM-dd HH:mm",
		invalidDateMessage: "日期格式不正确",
		applyValueMode:  "useButtons",
		value: endDate,
		onValueChanged: async ({ value }) => {
			endDate=value;
			await onQuery()
		},
	};

	
	const queryButtonOptions = {
	icon: 'refresh',
	onClick: async () => {
		await onQuery()
	},
	};
	const { proxy } = getCurrentInstance() as any;
	const route = useRoute();
	const kind = route.params.kind || "freight";
	const scopeMode = route.params.scopeMode || 0;
	const scopeValue = route.params.scopeValue || 0;
	
	const onQuery= async ()=>{
		state.dataSource=createDataSource()
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
					saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '运力统计.xlsx');
				});
		});
	}
	loadMessages({
		"zh": {
			dates: {
                calendars: {
                    gregorian: {
                        quarters: {
                            format: {
                                abbreviated: {
                                    1: "一季度",
                                    2: "二季度",
                                    3: "三季度",
                                    4: "四季度"
                                },
                                narrow: {
                                    1: "1",
                                    2: "2",
                                    3: "3",
                                    4: "4"
                                },
                                wide: {
                                    1: "第一季度",
                                    2: "第二季度",
                                    3: "第三季度",
                                    4: "第四季度"
                                }
                            },
                            "stand-alone": {
                                abbreviated: {
                                    1: "一季度",
                                    2: "二季度",
                                    3: "三季度",
                                    4: "四季度"
                                },
                                narrow: {
                                    1: "1",
                                    2: "2",
                                    3: "3",
                                    4: "4"
                                },
                                wide: {
                                    1: "第一季度",
                                    2: "第二季度",
                                    3: "第三季度",
                                    4: "第四季度"
                                }
                            }
                        },
                    }
                }
            },
        }
    });
	onMounted(() => {
		grid.value?.instance?.bindChart(chart.value?.instance, {
		dataFieldsDisplayMode: 'splitPanes',
		alternateDataFields: false,
		});
		startDateBox.value?.instance?.bind()
	});
  </script>
  <style>
  #pivotgrid {
	margin-top: 20px;
  }
  
  .currency {
	text-align: center;
  }
  </style>