import { store } from '/@/store/index.ts';
import { judementSameArr } from '/@/utils/arrayOperation';

/**
 * 单个权限验证
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auth(moduleKey:string,value: string): boolean {
	const authBtnList=store.state.userInfos.userInfos.authBtnList[moduleKey]||[];
	return authBtnList.some((v: string) => v === value);
}

/**
 * 多个权限验证，满足一个则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auths(moduleKey:string,value: Array<string>): boolean {
	let flag = false;
	const authBtnList=store.state.userInfos.userInfos.authBtnList[moduleKey]||[];
	authBtnList.map((val: string) => {
		value.map((v: string) => {
			if (val === v) flag = true;
		});
	});
	return flag;
}

/**
 * 多个权限验证，全部满足则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function authAll(moduleKey:string,value: Array<string>): boolean {
	const authBtnList=store.state.userInfos.userInfos.authBtnList[moduleKey]||[];
	return judementSameArr(value, authBtnList);
}
