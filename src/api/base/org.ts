import { http } from '/@/utils/request';

export default {
	/**
	 * 获取组织列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList: async (params: object = {}) => {
		const url = `/v1/admin/base/orgs`;
		return await http.get(url, params);
	},
	
	/**
	 * 获取组织
	 * @param id 组织标识
	 * @returns 返回接口数据
	 */
	getById: async (id: number | string) => {
		const url = `/v1/admin/base/orgs/${id}`;
		return await http.get(url);
	},
	
	/**
	 * 新增组织
	 * @param data 组织信息
	 * @returns 返回接口数据
	 */
	insert: async (data: object) => {
		const url = `/v1/admin/base/org`;
		return await http.post(url, data);
	},
	/**
	 * 更新组织
	 * @param data 组织信息
	 * @returns 返回接口数据
	 */
	update: async (data: object) => {
		const url = `/v1/admin/base/org/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新组织
	 * @param data 组织信息
	 * @returns 返回接口数据
	 */
	save: async (data: object) => {
		if (!data.Id || data.Id == "0") {
			const url = `/v1/admin/base/org`;
			return await http.post(url, data);
		}
		const url = `/v1/admin/base/org/${data.Id}`;
		return await http.post(url, data);
	},
	delete: async (id: number | string) => {
		const url = `/v1/admin/base/org/delete/${id}`;
		return await http.post(url);
	},
}