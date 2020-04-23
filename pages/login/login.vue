<template>
	<view>
		<uni-status-bar bgcolor="#ffe933"></uni-status-bar>
		<view class="icon iconfont icon-guanbi guanbi" @tap="navBack"></view>
		<image class="login-head" src="../../static/loginhead.png" mode="widthFix"></image>
		
		<view class="page">
			<!-- 账号密码登录 -->
			<template v-if="status">				
				<input type="text" class="uni-input common-input" value="" v-model="username" placeholder="昵称/手机号/邮箱" />
				<view class="login-input-box">
					<input type="text"  class="uni-input common-input login-input" value="" v-model="password" placeholder="请输入密码"/>
					<view class="forget u-f-ajc bgc-yellow">忘记密码?</view>
				</view> 
			</template>
		<!-- 手机验证码登录 -->
			<template v-else>
				<view class="phone-head-box">
					<view class="phone-head u-f-ajc">+86</view>
					<input type="text" class="uni-input common-input phone-input-box" value="" v-model="phone" placeholder="输入手机号" />
				</view>
				<view class="login-input-box">
					<input type="text" class="uni-input common-input login-input" value="" v-model="checknum" placeholder="请输入验证码"/>
					<view class="forget u-f-ajc" @tap="getCheckNum">
						<view class="u-f-ajc bgc-gray" style="border-radius: 10rpx; padding: 5rpx;">{{!codetime?'获取验证码':codetime+'s'}}</view>
					</view>
				</view>
			</template>
			
			<view class="u-f-dc u-f-ajc"> 
				<button :loading="loading" class="btn-normal bgc-yellow " :class="disable?'btn-disable':''" :disabled="disable" type="primary" @tap="submmit">登录</button>
			</view>
			
			<view class="u-f-ajc font-size-lg  logging-padding " @tap="changeStatus">
				{{status?'验证码登录':'账号登录'}}<view class="icon iconfont icon-jinru"></view>
			</view>
			
			<view class="u-f-ajc other-login-title logging-padding font-color-gray">第三方登录</view>
			<other-login :noback="false"></other-login>
		
			<view class="login-rule u-f-ajc logging-padding font-color-gray">
				注册即代表您同意<view>《xxx协议》</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	import uniStatusBar from "../../components/uni-status-bar/uni-status-bar.vue"
	import otherLogin from "../../components/profile/other-login.vue"
	export default {
		components:{
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				status:false, /* 账号密码登录 */
				loading:false,
				disable:true,
				
				username:"",
				password:"",
				phone:"",
				checknum:"",
				codetime:0
			};
		},
		watch:{
			username(val){
				this.onBtnChange()
			},
			password(val){
				this.onBtnChange()
			},
			phone(val){
				this.onBtnChange()
			},
			checknum(val){
				this.onBtnChange()
			}
		},
		methods:{
			/* 验证手机号合法性 */
			checkPhone(){
				var mPattern = /^1[34578]\d{9}$/
				return mPattern.test(this.phone)
			},
		 	async getCheckNum(){
				if(!this.checkPhone()){
					uni.showToast({
						title: '手机号错误'
					});
					return
				}
				if(this.codetime > 0){
					uni.showToast({
						title: '请不要重复获取',
						icon:"none"
					});
					return 
				}
				/* 获取手机验证码 */
				let [err, res] = await this.$http.post("/user/sendcode", {
					phone:this.phone
				},{ token:false })
				console.log(res);
				this.util.CheckError(err, res)
				if(res.data.errorCode == 30001 ) return

				/* 重复获取时 的延迟 */
				this.codetime = 60
				let time = setInterval(()=>{
					this.codetime--
					if(this.codetime < 1){
						clearInterval(time)
						this.codetime = 0
					}
				},1000)
			},
			initInput(){
				this.phone = ''
				this.password = ''
				this.checknum= ''
				this.username= ''
			},
			onBtnChange(){
				if((this.username && this.password)||(this.phone && this.checknum)){
					this.disable = false
					return
				}
				this.disable = true
			},
			changeStatus(){
				this.initInput()
				this.status = !this.status
			},
			submmit(){
				/* 账号密码登录 */
				if(this.status){
					this.User.login({
						url:"/user/login",
						data:{
							username:this.username,
							password:this.password
						}
					})
					return
				}
				
				/* 验证码登录 验证手机号 */
				if(!this.checkPhone()){
					uni.showToast({
						title: '手机号错误'
					});
					return
				}
				this.User.login({
					url:"/user/phonelogin",
					data:{
						phone:this.phone,
						code:this.checknum
					}
				})
			},
			navBack(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.phone-head-box{
		position: relative;
	}
	.phone-head-box .phone-head{
		position: absolute;
		height: 100%;
		left: 0;
		top: 0;
		width: 100rpx;
	}
	.phone-input-box{
		padding-left: 100rpx;
	}
	
.login-input{
	padding-right:150rpx ;
}
.login-input-box{
	position: relative;

}
.login-input-box .forget{
	position: absolute;
	height: 100%;
	top: 0;
	right: 0;
	width: 150rpx;	
}
.logging-padding{
	padding: 20rpx 0;
}
.other-login-title{
	position: relative;
}
.other-login-title::before .other-login-title::after{
	position: absolute;
	height: 1rpx;
	width: 100rpx;
	top: 50%;
}
.other-login-title::before{
	left: 25%;
	
}
.other-login-title::after{
	right: 25%;
}
.login-head{
	width: 100%;
}
.guanbi{
	position: fixed;
	left: 30rpx;
	top: 60rpx;
	font-size: 40rpx;
	font-weight: bold;
	color: #332F0A;
}
</style>
