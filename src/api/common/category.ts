import request from '/@/utils/request';
/**
 * 【供应商管理】供应商类型
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function getPageCategoryList(params: object) {
    return request({
        url: '/v1/admin/common/category/concrete/supplier',
        method: 'get',
        params: params,
    });
}
