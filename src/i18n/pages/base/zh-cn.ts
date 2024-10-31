// 定义内容
export default {
	router: {
		admin: '系统管理员',
		system: '系统管理',
		menu: '菜单管理',
		role: '角色管理',
		user: '用户管理',
		person: '人员管理',
		org: '组织管理',
		tenant: '公司管理',
		subUnit: '下级单位',
		registerUser:'用户注册',
		registerTenant:'租户注册',
	},
	action:{
		proxyBackend:'后台',
		proxyParent:'返回上级',
		proxyTop:'返回顶级',
		proxySuccess:'权限认证成功，即将跳转...',
	},
	label:{
		tenantName:'单位名称',
		userName:'登录账号',
		realName:'用户姓名',
		password:'登录密码',
		confirmPassword:'确认密码',
		mobile:'手机号码',
		captchaCode:'验证码',
	},
	placeholder:{
		tenantName:'请输入单位名称',
		userName:'请输入登录账号',
		realName:'请输入用户姓名',
		password:'请输入登录密码',
		confirmPassword:'确认密码必须和登录密码一致',
		mobile:'请输入手机号码',
		uniqueMobile:'请输入手机号码，手机号码必须唯一',
		captchaCode:'请输入验证码',
	},
	msg:{
		registerSuccessAndContinue:'注册成功，请登录后继续完善相关资料！',
	},
	
};
