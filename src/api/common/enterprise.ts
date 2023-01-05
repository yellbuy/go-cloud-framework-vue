import { http } from '/@/utils/request';
export default {

    /**
     * 获取基础代码列表
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getList: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/common/enterprise/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
 * 获取基本信息(通过当前公司Tid)
 * @param id 租户标识
 * @returns 返回接口数据
 */
    getById: async (id: number | string) => {
        const url = `/v1/admin/common/enterprise/${id}`;
        return await http.get(url);
    },
    /**
     * 新增或更新基础代码
     * @param data 基础代码信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        // if (!data.Id || data.Id == "0") {
        const url = `/v1/admin/common/enterprise`;
        return await http.post(url, data);
        // }
        // const url = `/v1/admin/common/enterprise/${data.Id}`;
        // return await http.post(url, data);
    },
    /**
     * 删除基础代码
     * @param id 基础代码标识
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/common/enterprise/delete/${id}`;
        return await http.post(url);
    },
    /**
   * 审核基本信息
   * @param data 审核基本信息
   * @returns 返回接口数据
   */
    audit: async (data: object) => {
        // if (!data.Id || data.Id == "0") {
        const url = `/v1/admin/common/enterprise/audit`;
        return await http.post(url, data);
        // }
        // const url = `/v1/admin/common/enterprise/${data.Id}`;
        // return await http.post(url, data);
    },
}