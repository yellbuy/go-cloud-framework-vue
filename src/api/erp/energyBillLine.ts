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
        const url = `/v1/admin/erp/energybillline/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取列表
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getStatListByVehicle: async (kind: string, vehicleNumber: string, params: object = {}) => {
        const url = `/v1/admin/erp/energybillline/stat/${kind}`;
        params.vehicleNumber=vehicleNumber
        return await http.get(url, params);
    },
    /**
     * 获取列表
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getStatListForCompany: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/energybillline/companystat/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取时间段统计数据 
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getTimeStatList: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/energybillline/timestat/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取汇总数据 
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getTotalStat: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/energybillline/totalstat/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getById: async (id: number | string) => {
		const url = `/v1/admin/erp/energybillline/${id}`;
		return await http.get(url);
	},
/**
     * 批量插入
     * @param data 信息
     * @returns 返回接口数据
     */
    insertMulti: async (data: object) => {
        const url = `/v1/admin/erp/energybilllines`;
        return await http.post(url, data);
    },

    /**
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/energybillline`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/energybillline/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/erp/energybillline/delete/${id}`;
        return await http.post(url);
    },
}