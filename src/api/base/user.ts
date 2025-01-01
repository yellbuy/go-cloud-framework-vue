import { http } from '/@/utils/request';

export default {
	/**
	 * 用户登录
	 * @param data 要传的数据
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	signIn: async (data: object, params: object = {}) => {
		const url = '/v2/admin/base/user/login';
		const model={...data}
		model.username="y" + btoa(encodeURIComponent(model.username))+"b";
		model.password="a" + btoa(encodeURIComponent(model.password))+"z";
		return await http.post(url, model, { params });
	},
	/**
	 * 刷新Token
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	refreshToken: async () => {
		const url = '/v1/base/user/refreshtoken';
		return await http.post(url);
	},
	/**
	 * 获取用户列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList: async (params: object = {}) => {
		const url = `/v1/admin/base/users`;
		return await http.get(url, params);
	},
	/**
	* 获取vip列表
	* @param vip 获取vip列表
	* @param kind 获取vip列表
	* @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
	* @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
	* @param params 要传的参数值
	* @returns 返回接口数据
	*/
	getVipList: async (vip: number = 0, kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
		const url = `/v1/admin/base/user/vipusers/${vip}/${kind}/${scopeMode}/${scopeValue}`;
		return await http.get(url, params);
	},
	/**
	 * 获取用户
	 * @param id 用户标识
	 * @returns 返回接口数据
	 */
	getById: async (id: number | string) => {
		const url = `/v1/admin/base/users/${id}`;
		return await http.get(url);
	},
	/**
	 * 锁屏解锁
	 * @param data 解锁认证数据
	 * @returns 返回接口数据
	 */
	unlockScreen: async (data: object) => {
		const url = `/v1/admin/base/unlockscreen`;
		return await http.post(url, data);
	},
	/**
	 * 获取验证码
	 * @returns 返回接口数据
	 */
	getCaptcha: async () => {
		const url = `/v1/base/user/captcha`;
		return await http.get(url);
	},

	/**
	 * 新增用户
	 * @param data 用户信息
	 * @returns 返回接口数据
	 */
	insert: async (data: object) => {
		const url = `/v1/admin/base/user`;
		return await http.post(url, data);
	},
	/**
	 * 更新用户
	 * @param data 用户信息
	 * @returns 返回接口数据
	 */
	update: async (data: object) => {
		const url = `/v1/admin/base/user/${data.Id}`;
		return await http.post(url, data);
	},/**
	* 更新用户信息
	* @param data 用户信息
	* @returns 返回接口数据
	*/
	updateProfile: async (data: object) => {
		const url = `/v1/admin/base/user/profile/${data.Id}`;
		return await http.post(url, data);
	},
	changePassword:async(data:object) => {
		const url = `/v2/admin/base/user/changepassword/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新用户
	 * @param data 用户信息
	 * @returns 返回接口数据
	 */
	save: async (data: object) => {
		if (!data.Id || data.Id == "0") {
			const url = `/v1/admin/base/user`;
			return await http.post(url, data);
		}
		const url = `/v1/admin/base/user/${data.Id}`;
		return await http.post(url, data);
	},
	delete: async (id: number | string) => {
		const url = `/v1/admin/base/user/delete/${id}`;
		return await http.post(url);
	},
}