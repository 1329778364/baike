<template>
	<view>
		<view class="page">
			<input type="text" password="true" class="uni-input common-input" value="" v-model="oldpassword" placeholder="输入旧密码" />
			<input type="text" password="true" class="uni-input common-input" value="" v-model="newpassword" placeholder="输入新密码" />
			<input type="text" password="true" class="uni-input common-input" value="" v-model="renewpassword" placeholder="输入确认密码" />
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
				oldpassword:"",
				newpassword:"",
				renewpassword:"",
				disable:true,
				lodding:false
			};
		},
		watch:{
			oldpassword(val){
				this.change()
			},
			newpassword(val){
				this.change()
			},
			renewpassword(val){
				this.change()
			}
		},
		methods:{
			change(){
				if(this.oldpassword && this.newpassword && this.renewpassword){
					this.disable = false
					return
				}
				this.disable = true
			},
			check(){
				if(!this.oldpassword || this.oldpassword==""){
					uni.showToast({
						title: '旧密码不能为空'
					});
					return false
				}
				if(!this.newpassword || this.newpassword==""){
					uni.showToast({
						title: '新密码不能为空'
					});
					return false
				}
				if(!this.renewpassword || this.renewpassword==""){
					uni.showToast({
						title: '确认密码不能为空'
					});
					return false
				}
				if(!(this.newpassword == this.renewpassword)){
					uni.showToast({
						title: '密码不一致'
					});
					return false
				}
				return true
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
				
			}
		}
		
	}
</script>

<style lang="scss">

</style>
