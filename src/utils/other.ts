import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import type { App } from 'vue';
import { nextTick } from 'vue';
import SvgIcon from '/@/components/svgIcon/index.vue';
import { i18n } from '/@/i18n/index';
import router from '/@/router/index';
import { store } from '/@/store/index';
import { Local } from '/@/utils/storage';
import { verifyUrl } from '/@/utils/toolsValidate';
import MetaSvgIcon from '/@/views/meta/components/DynamicForm/components/SvgIcon/index.vue'; // svg component

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
 export function elSvg(app: App) {
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		app.component(key, component)
	}
	app.component('SvgIcon', SvgIcon);
}


/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
 export function metaSvg(app: App) {
	app.component('MetaSvgIcon', MetaSvgIcon);
}

/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export function useTitle() {
	nextTick(() => {
		let webTitle = '';
		// 获取用户信息 vuex
		let globalTitle: string = "";
		if(router.currentRoute.value.path != '/login' && store.state.userInfos && store.state.userInfos.userInfos){
			globalTitle=(store.state.userInfos.userInfos.tenant && store.state.userInfos.userInfos.tenant.Name) 
				|| (store.state.userInfos.userInfos.app && store.state.userInfos.userInfos.app.Name)
				|| store.state.themeConfig.themeConfig.globalTitle;
		} 
		//console.log("router.currentRoute.value:",router.currentRoute.value)
		if(router.currentRoute.value.path === '/login'){
			webTitle = router.currentRoute.value.meta.title as any
		} else if(router.currentRoute.value.meta && router.currentRoute.value.meta.title){
			
			webTitle = i18n.global.t(router.currentRoute.value.meta.title as any)
		}
		document.title = webTitle?`${webTitle} - ${globalTitle}`:`${globalTitle}`;
	});
}

/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export const lazyImg = (el: any, arr: any) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img, key } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
					arr[key]['loading'] = false;
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => io.observe(img));
	});
};

/**
 * 全局组件大小
 * @returns 返回 `window.localStorage` 中读取的缓存值 `globalComponentSize`
 */
export const globalComponentSize: string = Local.get('themeConfig')?.globalComponentSize || store.state.themeConfig.themeConfig?.globalComponentSize;


/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: any) {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (obj[attr] && typeof obj[attr] === 'object') {
			newObj[attr] = deepClone(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
	if (
		navigator.userAgent.match(
			/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
		)
	) {
		return true;
	} else {
		return false;
	}
}
/**
 * 计算Main区域的高度
 * @param offsetHeight 待增加或减少的高度偏移量
 * @param minHeight 最小高度，低于此值则为自动高度
 * @returns 以px为单位的像素值
 */
export function calcMainHeight(offsetHeight:number,minHeight:number=600){
	let height = document.body.clientHeight+offsetHeight;
	if(height<=minHeight){
		return "auto";
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
export function calcWidth(smallWidth:number){
	let size=globalComponentSize
	//默认为small
	if(!size || size=="small"){
		return smallWidth;
	}
	if(size=="medium"){
		return smallWidth*1.3;
	}
	if(size=="large"){
		return smallWidth*1.5;
	}
	return smallWidth;
}
/**
 * 打开外部链接
 * @param val 当前点击项菜单
 */
export function handleOpenLink(val: any) {
	const { origin, pathname } = window.location;
	router.push(val.path);
	if (verifyUrl(<string>val.meta?.isLink)) window.open(val.meta?.isLink,"_blank");
	else window.open(`${origin}${pathname}#${val.meta?.isLink}`,"_blank");
}

/**
 * 统一批量导出
 * @method elSvg 导出全局注册 element plus svg 图标
 * @method useTitle 设置浏览器标题国际化
 * @method lazyImg 图片懒加载
 * @method globalComponentSize element plus 全局组件大小
 * @method deepClone 对象深克隆
 * @method isMobile 判断是否是移动端
 */
const other = {
	elSvg: (app: App) => {
		elSvg(app);
	},
	metaSvg: (app: App) => {
		metaSvg(app);
	},
	useTitle: () => {
		useTitle();
	},
	lazyImg: (el: any, arr: any) => {
		lazyImg(el, arr);
	},
	globalComponentSize,
	deepClone: (obj: any) => {
		deepClone(obj);
	},
	isMobile: () => {
		return isMobile();
	},
	calcMainHeight: (offsetHeight:number,minHeight:number=500)=>{
		return calcMainHeight(offsetHeight,minHeight);
	},
	calcWidth: (smallWidth:number)=>{
		return calcWidth(smallWidth);
	},
	handleOpenLink: (val: any) => {
		handleOpenLink(val);
	},
};

// 统一批量导出
export default other;
