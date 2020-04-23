import config from "./config.js"
import User from "./user.js"

export default{
	config:{
		baseUrl : config.webUrl,
		header :{
			"Content-type":"application/json; charset=utf-8",  /* GET */
			"Content-type":"application/x-www-form-urlencoded" /* POST */
		},
		data : {},
		method:"POST",
		dataType :"json"
	},
	
	request(options = {}){
		options.header = options.header || this.config.header
		options.method = options.method || this.config.method
		options.dataType = options.dataType || this.config.dataType
		options.url = this.config.baseUrl + options.url
		// TODO token 增加操作
		if (options.token){
			/* 验证用户是否登录 */
			if(!this.checkToken(options.checkToken)) return
			/* 验证操作权限 是否绑定手机 */
			if(!this.checkAuth(options.checkAuth)) return
			options.header.token = User.token
		}
		return uni.request(options)
	},
	get(url, data, options = {}){
		options.url = url
		options.data = data
		options.method = "GET"
		return this.request(options)
	},
	post(url, data, options = {}){
		options.url = url
		options.data = data
		options.method = "POST"
		return this.request(options)
	},
	
	checkToken(checkToken){
		if(checkToken && !User.token){
			uni.showToast({
				title:"请先登录",
				icon:"none"
			})
			uni.navigateTo({
				url:"/pages/login/login"
			})
			return false
		}
		return true
	},
	checkAuth(checkAuth){
		if(checkAuth && !User.userinfo.phone){
			uni.showToast({ title:"请先绑定手机号",icon:false })
			uni.navigateTo({
				url:"/pages/user-bind-phone/user-bind-phone"
			})
			return false
		}
		return true
	}
	
}