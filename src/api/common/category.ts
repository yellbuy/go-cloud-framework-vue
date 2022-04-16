import request, { http } from '/@/utils/request';
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

export default{
	
	/**
	 * 获取基础代码列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/common/category`;
		return await http.get(url, params);
	},
    getById:async (id:number|string)=>{
		const url=`/v1/admin/common/category/${id}`;
		return await http.get(url);
	},
    
	/**
	 * 新增基础代码
	 * @param data 基础代码信息
	 * @returns 返回接口数据
	 */
	insert:async(data:object)=>{
		const url=`/v1/admin/common/category`;
		return await http.post(url, data);
	},
	/**
	 * 更新基础代码
	 * @param data 基础代码信息
	 * @returns 返回接口数据
	 */
	update:async(data:object)=>{
		const url=`/v1/admin/common/category/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新基础代码
	 * @param data 基础代码信息
	 * @returns 返回接口数据
	 */
	save:async(data:object)=>{
		if(!data.Id||data.Id=="0"){
			const url=`/v1/admin/common/category`;
			return await http.post(url, data);
		}
		const url=`/v1/admin/common/category/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除基础代码
	 * @param id 基础代码标识
	 * @returns 返回接口数据
	 */
	delete:async(id:number|string)=>{
		const url=`/v1/admin/common/category/delete/${id}`;
		return await http.post(url);
	},
}