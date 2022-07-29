import { http } from '/@/utils/request';

export default {
    /**
   * 公司报名
   * @param data 标识，字符串或数组
   * @returns 返回接口数据
   */
    signup: async (data: object) => {
        const url = `/v1/admin/erp/projectcompany/signup`;
        return await http.post(url, data);
    },
}