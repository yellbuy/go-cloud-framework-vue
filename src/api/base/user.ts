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