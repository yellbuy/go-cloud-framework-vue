import { http } from '/@/utils/request';

export default {
    /**
     * 获取文件列表
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
        getListByScope: async (params: object = {}) => {
            const url = `/v1/admin/erp/projectcompanyline`;
            return await http.get(url, params);
        },

        /**
     * 批量保存
     * @param kind 分类
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
        SaveMulti: async (kind: string, params: object = {}) => {
            const url = `/v1/admin/erp/projectcompanylines/${kind}`;
            return await http.get(url, params);
        },
}