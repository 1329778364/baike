export default{
	// 秦秋检验错误
	CheckError(err, res, errfun=false, resfun=false){
		if(err){ /* 请求是的错误*/
			if(typeof errfun == "function") errfun()
			uni.showToast({
				title:"加载失败,请检查网络",
				icon:'none'
			})
			return false
		}
		if(res.data.errorCode){ /* 请求到数据之后的错误*/
			if(typeof resfun == "function") resfun()
			uni.showToast({
				title:res.data.msg,
				icon:'none'
			})
			return false
		}
		return true
	}
	
}