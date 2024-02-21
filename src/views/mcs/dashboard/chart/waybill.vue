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
		:data-source="dataSource"
		:allow-sorting-by-summary="true"
		:allow-filtering="true"
      	:allow-sorting="true"
		:show-borders="true"
		:show-column-grand-totals="true"
		:show-row-grand-totals="true"
		:show-row-totals="true"
		:show-column-totals="true"
		:field-panel="true"
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
DxTooltip,
} from 'devextreme-vue/chart';


import {
DxFieldChooser,
DxFieldPanel,
DxHeaderFilter,
DxPivotGrid
} from 'devextreme-vue/pivot-grid';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';
import 'devextreme/ui/date_box';
import 'devextreme/ui/select_box';


import dxDateBox from "devextreme/ui/date_box";
import notify from 'devextreme/ui/notify';
import { onMounted, ref } from 'vue';
import sales from './data.ts';
	const grid = ref<DxPivotGrid>();
	const chart = ref<DxChart>();
	const startDateBox=ref<dxDateBox>();
	const dataSource = {
		fields: [{
		caption: '产品',
		width: 120,
		dataField: 'region',
		area: 'row',
		sortBySummaryField: 'Total',
		}, {
		caption: '规格',
		dataField: 'city',
		width: 150,
		area: 'row',
		},{
			caption: "类别",
			dataField: "country",
			expanded: true,
			area: "filter"
		}, {
		dataField: 'date',
		dataType: 'date',
		area: 'column',
		}, {
		groupName: 'date',
		groupInterval: 'day',
		visible: true,
		}, {
		caption: '运量（吨）',
		dataField: 'amount',
		dataType: 'number',
		summaryType: 'sum',
		//format: 'currency',
		area: 'data',
		}, {
			caption: '车数',
		summaryType: 'count',
		area: 'data',
		}],
		store: sales,
	};
	const customizeTooltip = ({ seriesName, originalValue }) => {
		const valueText = (seriesName.indexOf('Total') !== -1)
		? new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'RMB' }).format(originalValue)
		: originalValue;
	
		return {
		html: `${seriesName}<div class='currency'>${valueText}</div>`,
		};
	};
	let startDate=dayjs(new Date()).add(-1, 'month');
	let endDate=dayjs(new Date());
	const startDateBoxOptions = {
		showClearButton: false,
		applyButtonText:  "确定",
		cancelButtonText:  "取消",
		displayFormat: "yyyy-MM-dd HH:mm",
		invalidDateMessage: "日期格式不正确",
		applyValueMode:  "useButtons",
		value: startDate,
		onValueChanged: ({ value }) => {
			startDate=value;
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
		onValueChanged: ({ value }) => {
			endDate=value;
		},
	};
		const selectBoxOptions = {
	width: 140,
	items: [],
	valueExpr: 'id',
	displayExpr: 'text',
	value: '0',
	inputAttr: { 'aria-label': 'Categories' },
	onValueChanged: ({ value }) => {
		// productsStore.filter(value > 1 ? ['type', '=', value] : null);
		// productsStore.load();
	},
	};
const queryButtonOptions = {
  icon: 'refresh',
  onClick: () => {
    notify('加载中!');
  },
};
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