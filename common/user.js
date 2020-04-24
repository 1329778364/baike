import $http from "./request.js"
import util from "./util.js"

export default{
	// 用户token
	token : false,
	// 用户信息
	userinfo : false,
	counts:{},
	userbind:"",
	
	/* 初始化读取用户信息 */
	__init(){
		this.userinfo = uni.getStorageSync("userinfo")
		this.token = uni.getStorageSync("token")
		this.counts = uni.getStorageSync("counts")
		this.userbind = uni.getStorageSync("userbind")
		
		console.log("本地存储的已登录信息",this.userinfo);
	},
	
	/* 登录 */
	async login(option = {}){
		uni.showLoading({ title: '登录中...', mask: true });
		let [err, res] = await $http.post(option.url, option.data)
		if (!util.CheckError(err, res)) {
			uni.hideLoading();
			return false
		}
		console.log("登录信息",res);
		/* 登录成功则保存状态 */
		this.token = res.data.data.token
		this.userinfo = this.__formatUserinfo(res.data.data)
		/* 获取统计信息 */
		await this.getCounts() 
		
		/* 进行本地化存储 */
		uni.setStorageSync("userinfo", this.userinfo)
		uni.setStorageSync("token", this.token)
		uni.setStorageSync("counts", this.counts)
		
		/* 连接socket */
		// 成功提示
		uni.hideLoading();
		uni.showToast({ title: '登录成功' });
		
		if (!option.Noback) {
			uni.navigateBack({ delta: 1 });
		}
		return true
		
	},
	async getCounts(){
		/* 总文章数 今日文章数 关注数 粉丝数 文章总点赞数 */
		let [err,res] =await $http.get('/user/getcounts/'+this.userinfo.id,{},{
			token:true,checkToken:true 
		}) 
		console.log(res);
		if(!util.CheckError(err,res)) return
		this.counts = res.data.data
		
	},
	
	async logout(shouwToast=true){
		/* 清除服务器信息 */
		let [err, res] = await $http.post("/user/logout",{},{
			token:true,     /* 表示请求携带token */
			checkToken:true /* 检查token是否有*/
		}) 
	    
		try{
			
			/* 清除内存信息 */
			this.token = false
			this.userinfo= false
			this.userbind = false
			this.counts = {}
			/* 关闭socket */
			uni.clearStorageSync()
			uni.switchTab({
				url:"/pages/profile/profile"
			})
			if(shouwToast){
				return uni.showToast({
					title:"退成登录成功"
				})
			}
			
		}catch(e){
			//TODO handle the exception
		}
	},
	
	async getUserBind(){
		
	},
	
	navigate(options, type="navigateTo"){
		// 权限验证
		if(!$http.checkToken(true)) return
		if(!$http.checkAuth(true)) return
		
		switch (type){
			case "navigateTo":
				uni.navigateTo(options)
				break;
			case "redirectTo":
				uni.redirectTo(options)
				break;
			case "reLaunch":
				uni.reLaunch(options)
				break;
			case "switchTab":
				uni.switchTab(options)
				break;
		}
	},
	
	/* 整队不同的登录方式进行格式装换 */
	__formatUserinfo(obj){
		// 手机/邮箱/账号登录
		if (obj.logintype == "username" || obj.logintype == "email" || obj.logintype == "phone") {
			// 设置默认头像
			obj.userpic = obj.userpic || "https://e.hiphotos.baidu.com/zhidao/pic/item/2f738bd4b31c8701ad3a813c267f9e2f0608ff5f.jpg";
			return obj;
		}
		// 第三方登录（已绑定）
		if (obj.user && obj.user_id > 0) {
			return {
				id: obj.user.id,
				username: obj.user.username || obj.nickname,
				userpic: obj.user.userpic || obj.avatarurl,
				phone: obj.user.phone,
				email: obj.user.email,
				status: obj.user.status,
				create_time: obj.user.create_time,
				logintype: obj.logintype,
				password:obj.user.password,
				token: obj.token,
				userinfo: {
				    id: obj.user.userinfo.id,
				    user_id: obj.user.userinfo.user_id,
				    age:obj.user.userinfo.age,
				    sex: obj.user.userinfo.sex,
				    qg: obj.user.userinfo.qg,
				    job: obj.user.userinfo.job,
				    path: obj.user.userinfo.path,
				    birthday: obj.user.userinfo.birthday,
				}
			}
		}
		// 第三方登录（未绑定）
		return {
			id: obj.user_id,
			username: obj.nickname,
			userpic: obj.avatarurl,
			phone: false,
			email: false,
			status: 1,
			create_time: false,
			logintype: obj.logintype,
			token: obj.token,
			userinfo: false
		}
	},
	
	__formatOtherLogin(provider,options){
		return {
			provider:provider,
			openid:options.userInfo.unionId || options.userInfo.openId,
			expires_in:options.authResult.expires_in,
			nickName:options.userInfo.nickName,
			avatarUrl:options.userInfo.avatarUrl,
		}
	},
}