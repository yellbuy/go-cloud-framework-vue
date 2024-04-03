import { http } from '/@/utils/request';

export default {

    /**
     * 获取列表
     * @param kind 文章分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/wms/goods/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getList: async (params: object = {}) => {
        const url = `/v1/admin/wms/goods`;
        return await http.get(url, params);
    },
    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getById: async (id: number | string) => {
        const url = `/v1/admin/wms/goods/${id}`;
        return await http.get(url);
    },

    /**
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/wms/goods`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/wms/goods/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 批量保存
     * @param data 信息
     * @returns 返回接口数据
     */
    saveMulti: async (kind:string,data: any) => {
        const url = `/v1/admin/wms/goods/${kind}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/wms/goods/delete/${id}`;
        return await http.post(url);
    },
    /**
   * 禁用
   * @param ids 标识，字符串或数组
   * @returns 返回接口数据
   */
    disable: async (data: object) => {
        const url = `/v1/admin/wms/goods/disable`;
        return await http.post(url, data);
    },
    /**
    * 获取项目专家信息
    * @returns 返回接口数据
    */
    expertList: async (id: number | string) => {
        const url = `/v1/admin/wms/goods/expertlist/${id}`;
        return await http.get(url);
    },
    /**
    * 项目专家信息
    * @returns 返回接口数据
    */
    expertSave: async (data: object) => {
        const url = `/v1/admin/wms/goods/expert`;
        return await http.post(url, data);
    },
     /**
    * 监审专家授权
    * @returns 返回接口数据
    */
    empowerSave: async (data: object) => {
        const url = `/v1/admin/wms/goods/empower`;
        return await http.post(url, data);
    },
      /**
    * 获取公司报名信息
    * @returns 返回接口数据
    */
    signUpDetail: async (id: number | string,companyId: number | string) => {
        const url = `/v1/admin/wms/goods/signup/${id}/${companyId}`;
        return await http.get(url);
    },

    /**
	 * 删除记录
	 * @param id 记录标识
	 * @returns 返回接口数据
	 */
	exportXlsByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
		const url = `/v1/admin/wms/goods/excel/${kind}/${scopeMode}/${scopeValue}`;
		return await http.get(url, params, { responseType: "blob" });
	},
}