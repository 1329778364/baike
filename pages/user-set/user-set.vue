<template>
	<view class="border-box-no-border">
		<view v-for="(item, index) in list" :key="index">
			<profile-list-item :item="item"></profile-list-item>
		</view>				
		<button class="profile-set-btn" type="primary" @tap="logout" >退出登录</button>
		</view>
</template>

<script>
	import profileListItem from "../../components/profile/profile-list-item.vue"
	export default {	
		components:{
			profileListItem 
		}, 
		data() {
			return {
				list:[
					{icon:"", name:"账号与安全",clicktype:"navigateTo",url:"../user-safe/user-safe"},
					{icon:"", name:"绑定邮箱",clicktype:"navigateTo",url:"../user-set-email/user-set-email"},
					{icon:"", name:"资料编辑", clicktype:"navigateTo",url:"../user-set-userinfo/user-set-userinfo"},
					{icon:"", name:"小纸条", clicktype:"navigateTo",url:""},
					{icon:"", name:"清除缓存", clicktype:"clear",url:""},
					{icon:"", name:"意见反馈", clicktype:"navigateTo",url:"../user-set-help/user-set-help"},
					{icon:"", name:"关于糗百", clicktype:"navigateTo",url:"../user-set-about/user-set-about"}
				]
			};
		},
		methods:{
			logout(){
				this.User.logout()
			}
		}
	}
</script>

<style lang="scss">
.profile-set-btn{
	width: 100%!important;
	margin: 20rpx 0;
	background-color: #FFE933!important;
	color: #333333;
}
</style>
