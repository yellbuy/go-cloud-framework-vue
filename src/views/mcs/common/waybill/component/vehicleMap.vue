<template>
	<div class="vehicle-map-container">
		<el-dialog :title="title" v-model="isShowDialog" destroy-on-close :before-close="closeDialog">
			<baidu-map style="width:100%; height: 480px" 
					:zoom="13" ak="wsijQt8sLXrCW71YesmispvYHitfG9gv" scrollWheelZoom v="3.0" type="API" :center="{lng: item.Lng, lat: item.Lat}" >
					<bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"  enableGeolocation showZoomInfo></bm-navigation>
					<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
					<!-- <bm-label content="川D12345" :position="{lng: 101.728637, lat: 26.582347}" :labelStyle="{color: 'red', fontSize : '18px',padding:'4px'}" title="点击查看详情" /> -->
					<bm-marker :position="{lng: item.Lng, lat: item.Lat}" :title="item.VehicleNumber" :dragging="false" :icon="{url: '/img/truck_location_blue_32x32.png', size: {width: 32, height: 32}}"
					@click="isShowInfoWindow = true">
						<bm-label :content="item.VehicleNumber" :offset="{width: -16, height: 34}" :labelStyle="{color: 'red',fontWeight:'bold', fontSize : '12px',padding:'4px 6px', border: '1px dashed #f70', boxShadow: '4px 4px 2px #888',borderRadius:'6px',opacity:0.7}" title="点击查看详情" />
						<bm-info-window :show="isShowInfoWindow" @close="isShowInfoWindow=false" @open="isShowInfoWindow = true">
							<el-tag type="primary" class="mx-1" effect="dark">{{ item.VehicleNumber }}</el-tag>
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
import 'echarts/extension/bmap/bmap';
import { computed, onMounted, reactive, toRefs } from 'vue';
import { BaiduMap, BmGeolocation, BmInfoWindow, BmLabel, BmMarker, BmNavigation } from 'vue-baidu-map-3x';
import { useI18n } from 'vue-i18n';
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
			item:{
				VehicleNumber:"川D13785",
				Lng: 101.728637, 
				Lat: 26.582347,
			},
			
			title: t('message.action.location'),
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
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			
			state.isShowDialog = true;
			state.isShowInfoWindow=true;
			// nextTick(() => {
			// 	state.item.Lng = 101.728637;
			// 	state.item.Lat = 26.582347;
			// })
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
