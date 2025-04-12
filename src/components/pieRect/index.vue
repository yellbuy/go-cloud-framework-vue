<template>
	<div class="pieRectContainer" :style="style">
		<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<filter id="shadow" x="0" y="0" width="100%" height="100%">
				<feOffset result="offOut" in="SourceGraphic" dx="5" dy="10" />
				<feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
				<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
			</filter>
		</defs>
			<g filter="url(#shadow1)">
			<!-- <g> -->
				<animateTransform attributeName="transform" type="translate" from="0,640" to="0,0" dur="2s" repeatCount="1"/>
				<g class="pieRectContainer-g" @click="handleClick(index,val)" v-for="(val,index) in list" :key="index">
					<rect x="180" :y="val.y" width="420" :height="val.height" :fill="val.darkColor||'red'" :style="{stroke:val.ligntColor}"/>
					<line x1="500" :y1="val.cy"  x2="640" :y2="val.cy" style="stroke:#ddd;stroke-width:2"></line>   
					<text x="640" :y="val.cy" dy="-5" white-space="pre" :style="val.valueStyle||'fill:#ddd;text-anchor:start;font-size:16;'" >
						{{(val.value||0)+"%"}}
						<tspan x="640" dy="50">{{val.value2}}</tspan>
					</text>
					<text x="400" :y="val.cy" dx="0"  dy="-5" white-space="pre" :style="val.nameStyle||'fill:#ddd;text-anchor:start;font-size:16;'">
						{{val.name||'低收入群体'}}
						<tspan x="400" dy="50">{{val.name2}}</tspan>
					</text>	
				</g>
			</g>	
		</svg>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';

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
			default: () => [{name:"高收入群体",value:5,darkColor:"blue",lightColor:"blue",nameStyle:"fill:#ddd;text-anchor:start;font-size:16;",valueStyle:"fill:#ddd;text-anchor:start;font-size:16;"}
			,{name:"中等收入群体",value:85,darkColor:"#E6A23C",lightColor:"rgb(237.5, 189.9, 118.5)",nameStyle:"fill:#ddd;text-anchor:start;font-size:16;",valueStyle:"fill:#ddd;text-anchor:end;font-size:16;"}
			,{name:"低收入群体",value:10,darkColor:"green",lightColor:"lightgreen",nameStyle:"fill:#ddd;text-anchor:start;font-size:16;",valueStyle:"fill:#ddd;text-anchor:start;font-size:16;"}]
		},
		
	},
	setup(props, { emit }) {
		const data=props.data.reverse()
		let total=data.reduce((acc, val) => acc + val.value||0, 0);
		if(total==0){
			total=100.0;
		}
		const list = data.map(val => ({
		...val, // 复制原有对象
		percent: val.value/total // 修改 name 属性
		}));
		let curHeight=60;
		let maxHeight=720-(list.length-1)*20; //内部高度
		for(let index in list){
			const val=list[index];
			val.y=curHeight
			if(index>0){
				val.y+=10 //起点Y坐标
			}
			val.height=val.percent*maxHeight //高度
			if(val.height<10){
				val.height=10
			}
			val.cy=val.y+val.height/2 //中心点Y坐标
			curHeight+=val.height+10
		}
		const state = reactive({list
		})
		// 触发事件
		const handleClick = (index,data) => {
			emit('click', { index,data });
		};
		// function resizeSVG() {
		// 	const svg = document.querySelector('svg');
		// 	const container = document.getElementById('pieRectContainer');
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
			handleClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.pieRectContainer {
	.pieRectContainer-g{
		cursor:pointer;
		:hover {
            color: white;              /* 文字颜色变化 */
            //transform: scale(1.2);     /* 缩放效果 */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
			font-weight: 800;
		}
	}
}
// .pieRectContainer {
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
