import request from '/@/utils/request';

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export async function getUserList(params: object) {
	return await request({
		url: '/v1/base/persons',
		method: 'get',
		data: params,
	});
}

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export async function signIn(data: object,params:object) {
	return await request({
		url: '/v2/base/user/login', //后端登录接口地址
		method: 'post',
		params:params,
		data: data,
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

