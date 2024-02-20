<template>
	<div>
	  <DxChart ref="chart">
		<DxTooltip
		  :enabled="true"
		  :customize-tooltip="customizeTooltip"
		/>
		<DxAdaptiveLayout :width="450"/>
		<DxSize :height="320"/>
		<DxCommonSeriesSettings type="bar"/>
	  </DxChart>
  
	  <DxPivotGrid
		id="pivotgrid"
		ref="grid"
		:data-source="dataSource"
		:allow-sorting-by-summary="true"
		:allow-filtering="true"
		:show-borders="true"
		:show-column-grand-totals="false"
		:show-row-grand-totals="false"
		:show-row-totals="false"
		:show-column-totals="false"
	  >
		<DxFieldChooser
		  :enabled="true"
		/>
	  </DxPivotGrid>
	</div>
  </template>
  <script setup lang="ts">
  import {
DxAdaptiveLayout,
DxChart,
DxCommonSeriesSettings,
DxSize,
DxTooltip,
} from 'devextreme-vue/chart';
import {
DxFieldChooser,
DxPivotGrid,
} from 'devextreme-vue/pivot-grid';
import { onMounted, ref } from 'vue';
import sales from './data.ts';
  
  const grid = ref<DxPivotGrid>();
  const chart = ref<DxChart>();
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
	}, {
	  dataField: 'date',
	  dataType: 'date',
	  area: 'column',
	}, {
	  groupName: 'date',
	  groupInterval: 'month',
	  visible: false,
	}, {
	  caption: '运量',
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
	  ? new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(originalValue)
	  : originalValue;
  
	return {
	  html: `${seriesName}<div class='currency'>${valueText}</div>`,
	};
  };
  
  onMounted(() => {
	grid.value?.instance?.bindChart(chart.value?.instance, {
	  dataFieldsDisplayMode: 'splitPanes',
	  alternateDataFields: false,
	});
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