import request from '/@/utils/request';

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export async function signIn(params: object) {
	return await request({
		url: '/v1/base/user/login',
		method: 'post',
		data: params,
	});
}
/**
 * 刷新Token
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
 export async function refreshToken() {
	return await request({
		url: '/v1/base/user/refreshtoken',
		method: 'post'
	});
}


/**
 * 用户退出登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function signOut(params: object) {
	return request({
		url: '/user/signOut',
		method: 'post',
		data: params,
	});
}
