import { App } from 'vue';
import { store } from '/@/store/index.ts';
import { judementSameArr } from '/@/utils/arrayOperation';

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
export function authDirective(app: App) {
	// 单个权限验证（v-auth="xxx"）
	app.directive('auth', {
		mounted(el, binding,vnode) {
			if(binding.arg){
				const authBtnList=store.state.userInfos.userInfos.authBtnList[binding.arg]||[];
				if (!authBtnList.some((v: string) => v === binding.value)) {
					el.parentNode.removeChild(el);
				}
			}else{
				el.parentNode.removeChild(el);
			}
			
		},
	});
	// 单个没有权限验证（v-no-auth="xxx"）
	app.directive('no-auth', {
		mounted(el, binding,vnode) {
			if(binding.arg){
				const authBtnList=store.state.userInfos.userInfos.authBtnList[binding.arg]||[];
				if (authBtnList.some((v: string) => v === binding.value)) {
					el.parentNode.removeChild(el);
				}
			}else{
				el.parentNode.removeChild(el);
			}
			
		},
	});
	// 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
	app.directive('auths', {
		mounted(el, binding) {
			if(binding.arg){
				let flag = false;
				const authBtnList=store.state.userInfos.userInfos.authBtnList[binding.arg]||[];
				authBtnList.map((val: string) => {
					binding.value.map((v: string) => {
						if (val === v) flag = true;
					});
				});
				if (!flag) {
					el.parentNode.removeChild(el);
				}
			}
		},
	});
	// 多个权限验证，满足一个则不显示（v-auths="[xxx,xxx]"）
	app.directive('no-auths', {
		mounted(el, binding) {
			if(binding.arg){
				let flag = false;
				const authBtnList=store.state.userInfos.userInfos.authBtnList[binding.arg]||[];
				authBtnList.map((val: string) => {
					binding.value.map((v: string) => {
						if (val === v) flag = true;
					});
				});
				if (flag) {
					el.parentNode.removeChild(el);
				}
			}
		},
	});
	// 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
	app.directive('auth-all', {
		mounted(el, binding) {
			if(binding.arg){
				const authBtnList=store.state.userInfos.userInfos.authBtnList[binding.arg]||[];
				const flag = judementSameArr(binding.value, authBtnList);
				if (!flag) {
					el.parentNode.removeChild(el);
				}
			}
		},
	});
	// 多个权限验证，全部满足则不显示（v-auth-all="[xxx,xxx]"）
	app.directive('no-auth-all', {
		mounted(el, binding) {
			if(binding.arg){
				const authBtnList=store.state.userInfos.userInfos.authBtnList[binding.arg]||[];
				const flag = judementSameArr(binding.value, authBtnList);
				if (!flag) {
					el.parentNode.removeChild(el);
				}
			}
		},
	});
}
