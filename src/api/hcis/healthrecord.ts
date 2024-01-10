import { http } from '/@/utils/request';

export default {

	/**
     * 获取列表
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/hcis/healthrecord/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
	/**
     * 获取统计数据
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getStatByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/hcis/healthrecord/stat/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
	/**
	 * 获取列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList: async (params: object = {}) => {
		const url = `/v1/admin/hcis/healthrecord`;
		return await http.get(url, params);
	},
	/**
	 * 获取记录
	 * @param id 要传的标识
	 * @returns 返回接口数据
	 */
	getById: async (id: number | string,loadRelated:boolean=false) => {
		const url = `/v1/admin/hcis/healthrecord/${id}?loadRelated=${loadRelated}`;
		return await http.get(url);
	},
	
	/**
	 * 新增
	 * @param data 记录
	 * @returns 返回接口数据
	 */
	insert: async (data: object) => {
		const url = `/v1/admin/hcis/healthrecord`;
		return await http.post(url, data);
	},
	/**
	 * 更新记录
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	update: async (data: object) => {
		const url = `/v1/admin/hcis/healthrecord/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 更新步骤
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	updateStep: async (step: Number | String, data: object) => {
		const url = `/v1/admin/hcis/healthrecord/${step}/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新记录
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	save: async (data: object) => {
		if (!data.Id || data.Id == "0") {
			const url = `/v1/admin/hcis/healthrecord`;
			return await http.post(url, data);
		}
		const url = `/v1/admin/hcis/healthrecord/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除记录
	 * @param id 记录标识
	 * @returns 返回接口数据
	 */
	delete: async (id: number | string) => {
		const url = `/v1/admin/hcis/healthrecord/delete/${id}`;
		return await http.post(url);
	},
	/**
	 * 删除记录
	 * @param id 记录标识
	 * @returns 返回接口数据
	 */
	export: async (params: object = {}) => {
		const url = `/v1/admin/hcis/healthrecord/export`;
		return await http.get(url, params, { responseType: "blob" });
	},
}