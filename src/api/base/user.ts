import request from '/@/utils/request';

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function getUserList(params: object) {
	return request({
		url: '/v1/base/persons',
		method: 'get',
		params: params,
	});
}