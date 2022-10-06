import { http } from '/@/utils/request';

export default {
	/**
	 * 注册用户
	 * @param data 要传的数据
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	insertUser: async (verifyKind:string, data: object, params: object = {}) => {
		const url = `/v1/base/register/user/${verifyKind}`;
		return await http.post(url, data, { params });
	},
	
	/**
	 * 注册租户
	 * @param data 要传的数据
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	 insertTenant: async (verifyKind:string, data: object, params: object = {}) => {
		const url = `/v1/base/register/tenant/${verifyKind}`;
		return await http.post(url, data, { params });
	},
	/**
	 * 注册租户
	 * @param data 要传的数据
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	 insertApp: async (verifyKind:string, data: object, params: object = {}) => {
		const url = `/v1/base/register/app/${verifyKind}`;
		return await http.post(url, data, { params });
	},
}