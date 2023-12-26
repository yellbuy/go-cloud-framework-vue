import { http } from '/@/utils/request';

export default{
	/**
	 * 批量获取基础代码列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getBatchList:async (params: object={})=>{
		const url=`/v1/admin/common/commondatalist`;
		return await http.get(url, params);
	},
	/**
	 * 获取基础代码列表
	 * @param type:字典类型；
	 * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
	 * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
	 * @returns 返回接口数据
	 */
	getBatchListByScope:async (params: object={},scopeMode:number=0,scopeValue:number=0)=>{
		const url=`/v1/admin/common/commondatalist/${scopeMode}/${scopeValue}`;
		return await http.get(url, params);
	},
	/**
	 * 获取基础代码列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/common/commondata`;
		return await http.get(url, params);
	},
	
    getById:async (id:number|string)=>{
		const url=`/v1/admin/common/commondata/${id}`;
		return await http.get(url);
	},
	/**
	 * 获取基础代码列表
	 * @param type:字典类型；
	 * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
	 * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
	 * @returns 返回接口数据
	 */
	 getConcreteDataListByScope:async (tp:string,scopeMode:number=0,scopeValue:number=0)=>{
		const url=`/v1/admin/common/concretedata/${tp}/${scopeMode}/${scopeValue}`;
		return await http.get(url);
	},
    /**
	 * 获取层次代码列表
	 * @param type:字典类型；
	 * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
	 * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
	 * @returns 返回接口数据
	 */
     getHierarchyDataListByScope:async (tp:string,scopeMode:number=0,scopeValue:number=0)=>{
		const url=`/v1/admin/common/hierarchydata/${tp}/${scopeMode}/${scopeValue}`;
		return await http.get(url);
	},
    /**
	 * 获取基础代码列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
    getConcreteDataList:async (params: object={})=>{
		const url=`/v1/admin/common/concretedata`;
		return await http.get(url, params);
	},
    /**
	 * 获取层次代码列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
     getHierarchyDataList:async (params: object={})=>{
		const url=`/v1/admin/common/hierarchydata`;
		return await http.get(url, params);
	},
	/**
	 * 新增基础代码
	 * @param data 基础代码信息
	 * @returns 返回接口数据
	 */
	insert:async(data:object)=>{
		const url=`/v1/admin/common/commondata`;
		return await http.post(url, data);
	},
	/**
	 * 更新基础代码
	 * @param data 基础代码信息
	 * @returns 返回接口数据
	 */
	update:async(data:object)=>{
		const url=`/v1/admin/common/commondata/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新基础代码
	 * @param data 基础代码信息
	 * @returns 返回接口数据
	 */
	save:async(data:object)=>{
		if(!data.Id||data.Id=="0"){
			const url=`/v1/admin/common/commondata`;
			return await http.post(url, data);
		}
		const url=`/v1/admin/common/commondata/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除基础代码
	 * @param id 基础代码标识
	 * @returns 返回接口数据
	 */
	delete:async(id:number|string)=>{
		const url=`/v1/admin/common/commondata/delete/${id}`;
		return await http.post(url);
	},
}