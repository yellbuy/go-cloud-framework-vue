import { http } from '/@/utils/request';

export default {

	/**
	 * 获取列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList: async (params: object = {}) => {
		const url = `/v1/admin/hcis/healthRecord`;
		return await http.get(url, params);
	},
	/**
	 * 获取记录
	 * @param id 要传的标识
	 * @returns 返回接口数据
	 */
	getById: async (id: number | string) => {
		const url = `/v1/admin/hcis/healthRecord/${id}`;
		return await http.get(url);
	},
	
	/**
	 * 新增
	 * @param data 记录
	 * @returns 返回接口数据
	 */
	insert: async (data: object) => {
		const url = `/v1/admin/hcis/healthRecord`;
		return await http.post(url, data);
	},
	/**
	 * 更新记录
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	update: async (data: object) => {
		const url = `/v1/admin/hcis/healthRecord/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 更新步骤
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	updateStep: async (step: Number | String, data: object) => {
		const url = `/v1/admin/hcis/healthRecord/${step}/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新记录
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	save: async (data: object) => {
		if (!data.Id || data.Id == "0") {
			const url = `/v1/admin/hcis/healthRecord`;
			return await http.post(url, data);
		}
		const url = `/v1/admin/hcis/healthRecord/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除记录
	 * @param id 记录标识
	 * @returns 返回接口数据
	 */
	delete: async (id: number | string) => {
		const url = `/v1/admin/hcis/healthRecord/delete/${id}`;
		return await http.post(url);
	},
	/**
	 * 删除记录
	 * @param id 记录标识
	 * @returns 返回接口数据
	 */
	export: async (params: object = {}) => {
		const url = `/v1/admin/hcis/healthRecord/export`;
		return await http.get(url, params, { responseType: "blob" });
	},
}