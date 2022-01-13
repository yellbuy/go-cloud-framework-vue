import type { App } from 'vue';
import { store } from '/@/store/index';
/**
 * 按钮波浪指令
 * @directive 默认方式：v-waves，如 `<div v-waves></div>`
 * @directive 参数方式：v-waves=" |light|red|orange|purple|green|teal"，如 `<div v-waves="'light'"></div>`
 */
export function heightDirective(app: App) {
	app.directive('height', {
		mounted(el, binding,vnode) {
			let minHeight=600;
			if(binding.value.min){
				minHeight=Number.parseInt(binding.value.min);
			}
			
			const height = calcMainHeight(binding.value.offset,minHeight)
			if(height){
				if(binding.arg){
					binding.arg.height=height;
				} else {
					el.style.height=height
				}
			}
			
		},
	});
	app.directive('min-height', {
		mounted(el, binding, vnode) {
			let minHeight=600;
			if(binding.value.min){
				minHeight=Number.parseInt(binding.value.min);
			}
			
			const height = calcMainHeight(binding.value.offset,minHeight)
			if(height){
				if(binding.arg){
					binding.arg.minHeight=height;
				} else {
					el.style.minHeight=height
				}
			}
			
		},
	});
	app.directive('max-height', {
		mounted(el, binding,vnode) {
			let minHeight=600;
			if(binding.value.min){
				minHeight=Number.parseInt(binding.value.min);
			}
			
			const height = calcMainHeight(binding.value.offset,minHeight)
			if(height){
				if(binding.arg){
					binding.arg.maxHeight=height;
				} else {
					el.style.maxHeight=height
				}
			}
			
		},
	});
}

/**
 * 计算Main区域的高度
 * @param offsetHeight 待增加或减少的高度偏移量
 * @param minHeight 最小高度，低于此值则为自动高度
 * @returns 以px为单位的像素值
 */
 function calcMainHeight(offsetHeight:number,minHeight:number=600){
	let height = document.body.clientHeight+offsetHeight;
	if(height<=minHeight){
		return "";
	}
	//减去头部Header高度
	height-=50;
	//减去Main上下margin
	height-=20;
	let { isTagsview,isFooter } = store.state.themeConfig.themeConfig;
	if (isTagsview){
		height-=84;
	}else{
		height-=50;
	}
	if(isFooter){
		height-=57
	}
	return `${height}px`
}