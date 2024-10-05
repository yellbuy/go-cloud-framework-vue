import { http } from '/@/utils/request';

export default {

    /**
     * 获取列表
     * @param kind 文章分类
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListByScope: async (params: object = {}) => {
        const url = `/v1/admin/erp/projectsetting`;
        return await http.get(url, params);
    },

    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getById: async (id: number | string) => {
        const url = `/v1/admin/erp/projectsetting/${id}`;
        return await http.get(url);
    },

    /**
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/projectsetting`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/projectsetting/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/erp/projectsetting/delete/${id}`;
        return await http.post(url);
    },
    /**
   * 禁用
   * @param ids 标识，字符串或数组
   * @returns 返回接口数据
   */
    disable: async (data: object) => {
        const url = `/v1/admin/erp/projectsetting/disable`;
        return await http.post(url, data);
    },
}