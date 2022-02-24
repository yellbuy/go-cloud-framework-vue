import request from '/@/utils/request';
/**
 * 【项目管理】参数模板
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function getPageDataList(params: object) {
    return request({
        url: '/v1/common/commonpagedata/',
        method: 'get',
        params: params,
    });
}
