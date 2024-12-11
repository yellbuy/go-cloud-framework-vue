import { http } from '/@/utils/request';

export default {

    /**
         * 获取运量统计列表数据
         * @param kind 分类
         * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
         * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
         * @param params 要传的参数值
         * @returns 返回接口数据
         */
    getStatListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/businessbillline/stat/${kind}/${scopeMode}/${scopeValue}`;
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
    getListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/businessbillline/${kind}/${scopeMode}/${scopeValue}`;
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
    getTimeStatListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/businessbillline/timestat/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
         * 获取总量统计
         * @param kind 分类
         * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
         * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
         * @param params 要传的参数值
         * @returns 返回接口数据
         */
    getWeightStatByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/businessbillline/weightstat/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取关联列表
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListDtoByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/businessbilllines/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
         * 获取大屏运量和计划统计数据
         * @param kind：分类，main_business,trade,warehouse
         * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
         * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
         * @param params 要传的参数值
         * @returns 返回接口数据
         */
    getDashboardPlanStatByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/businessbillline/dashboard/plan/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getById: async (id: number | string) => {
		const url = `/v1/admin/erp/businessbillline/${id}`;
		return await http.get(url);
	},
/**
     * 批量插入
     * @param data 信息
     * @returns 返回接口数据
     */
    insertMulti: async (data: object) => {
        const url = `/v1/admin/erp/businessbilllines`;
        return await http.post(url, data);
    },

    /**
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/businessbillline`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/businessbillline/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string,businessBillId: number | string=0) => {
        const url = `/v1/admin/erp/businessbillline/delete/${id}?businessBillId=${businessBillId}`;
        return await http.post(url);
    },
}