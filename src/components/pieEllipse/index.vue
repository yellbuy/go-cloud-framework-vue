<template>
	<div class="pieEllipseContainer" :style="style">
		<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
			<defs>
			<clipPath id="clipBottom">
					<rect x="100" y="320" width="200" height="80"/> <!-->底部区域<-->
				</clipPath>
				<clipPath id="clipCenterTopBotom">
					<rect x="100" y="100" width="200" height="16"/> <!-->中间顶部区域<-->		
				</clipPath>
				<clipPath id="clipCenter">
					<rect x="100" y="60" width="200" height="244"/> <!-->中部区域<-->
				</clipPath>
				<clipPath id="clipTop">
					<rect x="100" y="0" width="200" height="46"/> <!-->顶部区域<-->
				</clipPath>
			</defs>
				<ellipse cx="200" cy="200" rx="100" ry="200"  :fill="data && data.length > 2 ? data[2].darkColor:'green'" clip-path="url(#clipBottom)"/> <!-->底部区域<-->
				<ellipse cx="200" cy="320" rx="80" ry="16" :fill="data && data.length > 2 ? data[2].lightColor:'lightgreen'" /> <!-->底部剖面<-->
			
				
				<ellipse cx="200" cy="200" rx="100" ry="200" :fill="data && data.length > 1 ? data[1].darkColor:'#E6A23C'" clip-path="url(#clipCenterTopBotom)"/> <!-->中部区域<-->
				<ellipse cx="200" cy="304" rx="86" ry="16" :fill="data && data.length > 1 ? data[1].darkColor:'#E6A23C'" /> <!-->中部靠底区域<-->
				<ellipse cx="200" cy="200" rx="100" ry="200" :fill="data && data.length > 1 ? data[1].darkColor:'#E6A23C'" clip-path="url(#clipCenter)"/> <!-->中部区域<-->
				<ellipse cx="200" cy="62" rx="72" ry="16" :fill="data && data.length > 1 ? data[1].lightColor:'rgb(237.5, 189.9, 118.5)'" /> <!-->顶部剖面<-->  
				<ellipse cx="200" cy="200" rx="100" ry="200" :fill="data && data.length > 0 ? data[0].darkColor:'blue'" clip-path="url(#clipTop)"/> <!-->顶部区域<-->
				<ellipse cx="200" cy="46" rx="63" ry="16" :fill="data && data.length > 0 ? data[0].darkColor:'blue'" />
				
				<line x1="200" y1="23"  x2="350" y2="23" style="stroke:#ddd;stroke-width:2"></line>
				<line x1="60" y1="200"  x2="200" y2="200" style="stroke:#ddd;stroke-width:2"></line>
				<line x1="200" y1="360"  x2="350" y2="360" style="stroke:#ddd;stroke-width:2"></line>

				<text x="350" y="23" :style="data && data.length>0?data[0].valueStyle:'fill:#ddd;text-anchor:start;font-size:16;'">{{data && data.length>0?data[0].value : '5%'}}</text>
				<text x="60" y="200" :style="data && data.length>0?data[1].valueStyle:'fill:#ddd;text-anchor:end;font-size:16;'">{{data && data.length>1?data[1].value : '85%'}}</text>
				<text x="350" y="360" :style="data && data.length>0?data[2].valueStyle:'fill:#ddd;text-anchor:start;font-size:16;'">{{data && data.length>2?data[2].value : '10%'}}</text>
				
				<text x="200" y="23" dx="0" dy="-5" :style="data && data.length>0?data[0].nameStyle:'fill:#ddd;text-anchor:middle;font-size:16;'">{{data && data.length>0?data[0].name : '高收入群体'}}</text>
				<text x="200" y="200" dx="0" dy="-5" :style="data && data.length>0?data[1].nameStyle:'fill:#ddd;text-anchor:middle;font-size:16;'">{{data && data.length>0?data[1].name : '中等收入群体'}}</text>
				<text x="200" y="360" dx="0" dy="-5" :style="data && data.length>0?data[2].nameStyle:'fill:#ddd;text-anchor:middle;font-size:16;'">{{data && data.length>0?data[2].name : '低收入群体'}}</text>	
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
		function resizeSVG() {
			const svg = document.querySelector('svg');
			const container = document.getElementById('pieEllipseContainer');
			const rect = container.getBoundingClientRect(); // 获取div的实际宽高
			svg.setAttribute('width', rect.width);
			svg.setAttribute('height', rect.height);
		}
		// 页面加载时
		onMounted(() => {
			
			
			window.addEventListener('resize', resizeSVG); // 当窗口大小改变时重新调整SVG大小
			resizeSVG(); // 初始时也调用一次以设置初始大小
		});
		return {
		};
	},
});
</script>

<style scoped lang="scss">
.pieEllipseContainer {
    display: inline-block;
    position: relative;
    width: 100%; /* 使容器宽度自适应 */
    padding-bottom: 100%; /* 保持宽高比，这里设置为1:1，可以根据需要调整 */
    vertical-align: middle;
    overflow: hidden; /* 隐藏溢出的内容 */

	svg {
		width: 100%;
		height: 100%;
		object-fit: contain; /* 或者使用 cover，取决于你想要的效果 */
	}
}

</style>
