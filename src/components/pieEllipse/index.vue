<template>
	<div class="pieEllipseContainer" :style="style">
		<svg viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<ellipse id="main" cx="320" cy="300" rx="180" ry="300" /> <!-->椭圆主图<-->
			<clipPath id="clipBottom">
				<rect x="0" y="360" width="640" height="280"/> <!-->底部区域<-->
			</clipPath>
			<clipPath id="clipCenter">
				<rect x="0" y="60" width="640" height="300"/> <!-->中部区域<-->
			</clipPath>
			<clipPath id="clipTop">
				<rect x="0" y="0" width="640" height="60"/> <!-->顶部区域<-->
			</clipPath>
			<filter id="shadow" x="0" y="0" width="200%" height="200%">
				<feOffset result="offOut" in="SourceGraphic" dx="10" dy="20" />
				<feGaussianBlur result="blurOut" in="offOut" stdDeviation="20" />
				<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
			</filter>
		</defs>
			<!-- <g filter="url(#shadow)"> -->
			<g>
				<animateTransform attributeName="transform" type="translate" from="0,640" to="0,0" dur="2s" repeatCount="1"/>
				<g transform="translate(0,120)" class="pieEllipseContainer-g"> <!-->底部区域<-->
					<use href="#main" :fill="data && data.length > 0 ? data[0].darkColor:'green'" clip-path="url(#clipBottom)"  />
					<ellipse cx="320" cy="360" rx="178" ry="40" :fill="data && data.length > 2 ? data[0].lightColor:'lightgreen'" />  <!-->底部剖面<-->
					
					<line x1="320" y1="540"  x2="540" y2="540" style="stroke:#ddd;stroke-width:2"></line>   
					<text x="500" y="540" dy="-5" :style="data && data.length>0?data[0].valueStyle:'fill:#ddd;text-anchor:start;font-size:16;'" >{{data && data.length>0?data[0].value : '10%'}}</text>
					<text x="320" y="540" dx="0" dy="-5" :style="data && data.length>0?data[0].nameStyle:'fill:#ddd;text-anchor:middle;font-size:16;'">{{data && data.length>2?data[0].name : '低收入群体'}}</text>	
				</g>
					
				<g transform="translate(0,60)"  class="pieEllipseContainer-g"> <!-->中部区域<-->
					<use href="#main" :fill="data && data.length > 1 ? data[1].darkColor:'orange'" clip-path="url(#clipCenter)" /> <!-->中部区域<-->
					<ellipse cx="320" cy="360" rx="178" ry="40" :fill="data && data.length > 2 ? data[1].darkColor:'orange'" /> <!-->中下剖面<-->  
					<ellipse cx="320" cy="60" rx="105" ry="40" :fill="data && data.length > 2 ? data[1].lightColor:'yellow'" /> <!-->中上剖面<-->
					
					<line x1="320" y1="320"  x2="100" y2="320" style="stroke:#ddd;stroke-width:2"></line>
					<text x="140" y="320" dy="-5" :style="data && data.length>1?data[1].valueStyle:'fill:#ddd;text-anchor:end;font-size:16;'">{{data && data.length>1?data[1].value : '80%'}}</text>
					<text x="320" y="320" dx="0" dy="-5" :style="data && data.length>1?data[1].nameStyle:'fill:#ddd;text-anchor:middle;font-size:16;'">{{data && data.length>1?data[1].name : '中等收入群体'}}</text>
				</g>
					
				<g class="pieEllipseContainer-g"> <!-->顶部区域<-->
					<use href="#main" :fill="data && data.length > 2 ? data[2].lightColor:'blue'" clip-path="url(#clipTop)"/> 
					<ellipse cx="320" cy="60" rx="108" ry="40" :fill="data && data.length > 2 ? data[2].darkColor:'blue'" /> <!-->顶部椭圆<-->
					
					<line x1="320" y1="30"  x2="540" y2="30" style="stroke:#ddd;stroke-width:2" ></line>
					<text x="500" y="30" dy="30" :style="data && data.length>2?data[2].valueStyle:'fill:#ddd;text-anchor:start;font-size:16;'">{{data && data.length>2?data[2].value : '5%'}}</text>
					<text x="320" y="30" dx="0" dy="20" :style="data && data.length>2?data[2].nameStyle:'fill:#ddd;text-anchor:middle;font-size:16;'">{{data && data.length>2?data[2].name : '高收入群体'}}</text>
				</g> 
			</g>	
		</svg>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
	name: 'pieEllipse',
	props: {
		style:{
			type: String,
			default:""
		},
		// 通知栏模式，可选值为 closeable link
		// 通知文本内容
		data: {
			type: Array,
			default: () => [{name:"高收入群体",value:"5%",darkColor:"blue",lightColor:"blue",nameStyle:"fill:#ddd;text-anchor:middle;font-size:16;",valueStyle:"fill:#ddd;text-anchor:start;font-size:16;"}
			,{name:"中等收入群体",value:"85%",darkColor:"#E6A23C",lightColor:"rgb(237.5, 189.9, 118.5)",nameStyle:"fill:#ddd;text-anchor:middle;font-size:16;",valueStyle:"fill:#ddd;text-anchor:end;font-size:16;"}
			,{name:"低收入群体",value:"10%",darkColor:"green",lightColor:"lightgreen",nameStyle:"fill:#ddd;text-anchor:middle;font-size:16;",valueStyle:"fill:#ddd;text-anchor:start;font-size:16;"}]
		},
		
	},
	setup(props, { emit }) {
		// function resizeSVG() {
		// 	const svg = document.querySelector('svg');
		// 	const container = document.getElementById('pieEllipseContainer');
		// 	const rect = container.getBoundingClientRect(); // 获取div的实际宽高
		// 	svg.setAttribute('width', rect.width);
		// 	svg.setAttribute('height', rect.height);
		// }
		// 页面加载时
		onMounted(() => {
			
			
			// window.addEventListener('resize', resizeSVG); // 当窗口大小改变时重新调整SVG大小
			// resizeSVG(); // 初始时也调用一次以设置初始大小
		});
		return {
		};
	},
});
</script>

<style scoped lang="scss">
.pieEllipseContainer {
	.pieEllipseContainer-g{
		
	}
}
// .pieEllipseContainer {
//     display: inline-block;
//     position: relative;
//     width: 100%; /* 使容器宽度自适应 */
//     padding-bottom: 100%; /* 保持宽高比，这里设置为1:1，可以根据需要调整 */
//     vertical-align: middle;
//     overflow: hidden; /* 隐藏溢出的内容 */

// 	svg {
// 		width: 100%;
// 		height: 100%;
// 		object-fit: contain; /* 或者使用 cover，取决于你想要的效果 */
// 	}
// }

</style>
