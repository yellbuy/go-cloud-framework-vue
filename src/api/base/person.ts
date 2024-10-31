import { http } from '/@/utils/request';

export default {
	
	/**
	 * 获取人员列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList: async (params: object = {}) => {
		const url = `/v1/admin/base/person`;
		return await http.get(url, params);
	},
	
	/**
	 * 获取人员
	 * @param id 人员标识
	 * @returns 返回接口数据
	 */
	getById: async (id: number | string) => {
		const url = `/v1/admin/base/person/${id}`;
		return await http.get(url);
	},
	

	/**
	 * 新增人员
	 * @param data 人员信息
	 * @returns 返回接口数据
	 */
	insert: async (data: object) => {
		const url = `/v1/admin/base/person`;
		return await http.post(url, data);
	},
	/**
	 * 更新人员
	 * @param data 人员信息
	 * @returns 返回接口数据
	 */
	update: async (data: object) => {
		const url = `/v1/admin/base/person/${data.Id}`;
		return await http.post(url, data);
	},	
	/**
	 * 新增或更新人员
	 * @param data 人员信息
	 * @returns 返回接口数据
	 */
	save: async (data: object) => {
		if (!data.Id || data.Id == "0") {
			const url = `/v1/admin/base/person`;
			return await http.post(url, data);
		}
		const url = `/v1/admin/base/person/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除人员
	 * @param id 人员标识
	 * @returns 返回接口数据
	 */
	delete: async (id: number | string) => {
		const url = `/v1/admin/base/person/delete/${id}`;
		return await http.post(url);
	},
}