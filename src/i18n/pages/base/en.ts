// 定义内容
export default {
	router: {
		admin: 'admin',
		system: 'system',
		menu: 'systemMenu',
		role: 'systemRole',
		user: 'systemUser',
		tenant: 'systemTenant',
		registerUser:'register user',
		registerTenant:'register tenant',
	},
	action:{
		proxyBackend:'backend',
		proxyParent:'return parent level',
		proxyTop:'return top level',
		proxySuccess:'Permission authentication is successful, and it is about to jump...',
	},
	label:{
		tenantName:'tenant name',
		userName:'user name',
		realName:'user full name',
		password:'password',
		confirmPassword:'confirm password',
		mobile:'mobile',
		captchaCode:'captcha code',
	},
	placeholder:{
		tenantName:'please input tenant name',
		userName:'please input user name',
		realName:'please input user full name',
		password:'please input password',
		confirmPassword:'please input confirm password',
		mobile:'please input mobile number',
		uniqueMobile:'please input mobile number, mobile number must is unique',
		captchaCode:'please input verification code',
	},
	msg:{
		registerSuccessAndContinue:'register success！please continue improve to infomation after sign on the system!',
	},
};
