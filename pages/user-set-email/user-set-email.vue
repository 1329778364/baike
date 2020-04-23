<template>
	<view>
		<view class="page">
			<input type="text" class="uni-input common-input" value="" v-model="email" placeholder="输入绑定邮箱" />
			<input type="text" password="true" class="uni-input common-input" value="" v-model="password" placeholder="输入密码" />
			<view class="u-f-dc u-f-ajc"> 
				<button :loading="lodding" class="btn-normal bgc-yellow " :class="disable?'btn-disable':''" :disabled="disable" type="primary" @tap="submmit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:"",
				password:"",
				disable:true,
				lodding:false
			}
		},
		watch:{
			email(val){
				this.change()
			},
			password(val){
				this.change()
			}
		},
		methods: {
			change(){
				if(this.password && this.password){
					this.disable = false
					return
				}
				this.disable = true
			},
			submmit(){
				this.lodding=true
				this.disable=true
				if(!this.check()){
					this.lodding = false
					this.disable=false
					return 
				}
				uni.showToast({
					title: '提交服务器',
					mask:false,
					duration:1500
				});
				this.lodding=false
				this.disable=false
				
			},
			check(){
				if(!this.email || this.email==""){
					uni.showToast({
						title: '邮箱不能为空'
					});
					return false
				}
				/* 检查邮箱格式 */
				var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!ePattern.test(this.email)){
					uni.showToast({
						title: '邮箱格式错误'
					});
					return
				}
				if(!this.password || this.password==""){
					uni.showToast({
						title: '密码不能为空'
					});
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
