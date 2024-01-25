<template>
	<div :style="{ height: `calc(100vh - ${initTagViewHeight}` }">
		<el-dialog :title="title" v-model="isShowDialog" :before-close="closeDialog">
			<!-- <div class="layout-view-bg-white">
				<div id="echartsMap" style="height: 540px"></div>
			</div> -->
			<baidu-map style="width:100%;height: 540px" 
				:zoom="13" ak="wsijQt8sLXrCW71YesmispvYHitfG9gv" scrollWheelZoom v="3.0" type="API" :center="{lng: 101.728637, lat: 26.582347}" >
				<bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"  enableGeolocation showZoomInfo></bm-navigation>
				<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
				<!-- <bm-label content="川D12345" :position="{lng: 101.728637, lat: 26.582347}" :labelStyle="{color: 'red', fontSize : '18px',padding:'4px'}" title="点击查看详情" /> -->
				<bm-marker :position="{lng: 101.728637, lat: 26.582347}" title="川D12345" :dragging="false" :icon="{url: '/img/truck_location_blue_32x32.png', size: {width: 32, height: 32}}"
				 @click="isShowInfoWindow = true">
					<!-- <bm-label content="川D12345" :offset="{width: 24, height: 32}" :labelStyle="{color: 'red', fontSize : '12px',padding:'2px 4px', borderRadius:'4px',opacity:0.9}" title="点击查看详情" /> -->
					<bm-info-window :show="isShowInfoWindow" @close="isShowInfoWindow=false" @open="isShowInfoWindow = true">
						<el-tag type="primary" class="mx-1" effect="dark">川D12345</el-tag>
						<el-divider border-style="dashed" style="margin: '4px 0'" />
						<el-text class="mx-1" type="info">今日任务：</el-text> 
							<el-text class="mx-1" tag="b" size="default" type="success">2</el-text> / <el-text class="mx-1" tag="b" size="default" type="danger">5</el-text>
						<br/>
						<el-text class="mx-1" type="info">今日运量：</el-text> 
						<el-text class="mx-1" tag="b" size="default" type="success">89.75</el-text> <el-text class="mx-1" type="info">T</el-text> 
					</bm-info-window>
				</bm-marker>
			</baidu-map>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import { computed, nextTick, onMounted, reactive, toRefs } from 'vue';
import { BaiduMap, BmGeolocation, BmInfoWindow, BmLabel, BmMarker, BmNavigation } from 'vue-baidu-map-3x';
import { useI18n } from 'vue-i18n';
import { echartsMapData, echartsMapList } from './mock';
import { useStore } from '/@/store/index';

export default {
	name: 'funEchartsMap',
	components: { BaiduMap,BmNavigation,BmGeolocation,BmLabel,BmMarker,BmInfoWindow },
	setup() {
		const { t } = useI18n();
		const store = useStore();
		const state = reactive({
			isShowDialog: false,
			isShowInfoWindow:true,
			title: t('message.action.add'),
			echartsMapList,
			echartsMapData,
		});
		// 设置主内容的高度
		const initTagViewHeight = computed(() => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			let { isTagsViewCurrenFull } = store.state.tagsViewRoutes;
			if (isTagsViewCurrenFull) {
				return `30px`;
			} else {
				if (isTagsview) return `114px`;
				else return `80px`;
			}
		});
		// echartsMap 将坐标信息和对应物理量的值合在一起
		const convertData = (data) => {
			let res = [];
			for (let i = 0; i < data.length; i++) {
				let geoCoord = state.echartsMapData[data[i].name];
				if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value),
					});
				}
			}
			return res;
		};
		// 初始化 echartsMap
		const initEchartsMap = () => {
			const myChart = echarts.init(document.getElementById('echartsMap'));
			const option = {
				tooltip: {
					trigger: 'item',
				},
				color: ['#9a60b4', '#ea7ccc'],
				bmap: {
					center: [101.718637, 26.582347],
					zoom: 11,
					roam: true,
					mapStyle: {},
				},
				series: [
					{
						name: 'pm2.5',
						type: 'scatter',
						coordinateSystem: 'bmap',
						data: convertData(state.echartsMapList),
						symbolSize: function (val) {
							return val[2] / 10;
						},
						encode: {
							value: 2,
						},
						label: {
							formatter: '{b}',
							position: 'right',
							show: false,
						},
						emphasis: {
							label: {
								show: true,
							},
						},
					},
					{
						name: 'Top 5',
						type: 'effectScatter',
						coordinateSystem: 'bmap',
						data: convertData(
							state.echartsMapList
								.sort(function (a, b) {
									return b.value - a.value;
								})
								.slice(0, 6)
						),
						symbolSize: function (val) {
							return val[2] / 10;
						},
						encode: {
							value: 2,
						},
						showEffectOn: 'render',
						rippleEffect: {
							brushType: 'stroke',
						},
						hoverAnimation: true,
						label: {
							formatter: '{b}',
							position: 'right',
							show: true,
						},
						itemStyle: {
							shadowBlur: 10,
							shadowColor: '#333',
						},
						zlevel: 1,
					},
				],
			};
			myChart.setOption(option);
			window.addEventListener('resize', () => {
				myChart.resize();
			});
		};
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			
			state.isShowDialog = true;
			nextTick(() => {
				initEchartsMap();
			});
		}
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};

		// 页面加载时
		onMounted(() => {
			
			
		});
		return {
			t,
			openDialog,
			closeDialog,
			initTagViewHeight,
			...toRefs(state),
		};
	},
};
</script>
<style scoped>
.mark-label{
	color: 'red'; 
	font-size : '12px';
	padding:'2px'; 
	border-radius:10%
}
.el-divider--horizontal{
	margin: 6px 0;
}
</style>
