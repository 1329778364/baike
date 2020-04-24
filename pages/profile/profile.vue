<template>
	<view >
		<navigation-custom  :config="config" @clickleft="clickleft" @clickright="clickright" >
			<view slot="middle" class="font-size-lg">我的</view>
		</navigation-custom>
		
		<!-- 没有登陆 -->
		<template v-if="!loginStatus">
			<view class="u-f-ajc">登陆，体验更多功能</view>
			<other-login :noback="true" @logining="isLogin"></other-login>
			<!-- 账号密码登陆 -->
			<view class="u-f-ajc" @tap="openLogin">
				账号密码登陆 <view class="icon iconfont icon-jinru icon-fontsize-lg font-color-gray"></view>
			</view>
		</template>
		<template v-if="loginStatus">
			<profile-info :profileInfo="profileInfo" ></profile-info>
		</template>
		
		<!-- 数据 -->
		<profile-data :profiledata="profiledata"></profile-data>
		
		<!-- 广告位 -->
		<view class="border-box" style="height:200rpx;">
			<image class="image-rectangle" src="../../static/13.jpg" mode="aspectFill"></image>
		</view>
		
		<!-- 功能列表 -->
		<view class="border-box" style="border: 0;">
			<block v-for="(item, index) in list" :key="index">				
				 <profile-list-item :item="item"></profile-list-item>
			</block>
		</view>
	</view>
	
</template> 

<script>
	import navigationCustom from "../../components/navigation-custom/navigation-custom.vue"
	import profileListItem from '../../components/profile/profile-list-item.vue'
	import profileInfo from '../../components/profile/profile-info.vue'
	import otherLogin from "../../components/profile/other-login.vue"
	import profileData from "../../components/profile/profile-data.vue"
	
	export default {
		components:{
			navigationCustom,
			profileListItem,
			profileInfo,
			otherLogin,
			profileData 
		},
		data() {
			return {
				loginStatus:false,
				list:[
					{icon:"liulan", name:"浏览历史", clicktype:"anvigateTo",url:""},
					{icon:"huiyuanvip", name:"糗百认证",clicktype:"anvigateTo",url:""},
					{icon:"keyboard", name:"审核糗事",clicktype:"anvigateTo",url:""}
				],
				profileInfo:{
					userpic:"../../static/8.jpg",
					username:"我的新民",
					totalnum:10,
					todaynum:20
				},
				profiledata:[
					{name:"糗事", num:0},
					{name:"动态", num:0},
					{name:"评论", num:0},
					{name:"粉丝", num:0}
				],
				config:{
				    title:"我是标题", //title
				    bgcolor:"#55aaff", //背景颜色
				    fontcolor:"black", //文字颜色，默认白色
				    type:1, //type 1，3胶囊 2，4无胶囊模式
				    transparent:true, //是否背景透明 默认白色
				    linear:true, //是为开启下滑渐变
				    share:false, //是否将主页按钮显示为分享按钮
					leftimage:"../../static/icon/navbar/home_.png",
					rightimage:"../../static/icon/navbar/menu.png"
				}
			}	
		},
		onLoad() {
			
		},
		mounted() {  
		        
		    },  
		updated() {  
			
		},
		onShow() {
			this.isLogin()
			
		},
		methods:{
			/* 判断是否登录 */
			isLogin(){
				if(!this.User.token){
					this.loginStatus = false
					this.profileInfo={
						userpic:"",
						username:"",
						totalnum:0,
						todaynum:0
					}
					this.profiledata[0].num = 0
					this.profiledata[1].num = 0
					this.profiledata[2].num = 0
					this.profiledata[3].num = 0
					return
				}
				/* 用户已经登录 */
				this.profileInfo.userpic = this.User.userinfo.userpic
				this.profileInfo.username = this.User.userinfo.username
				this.profileInfo.totalnum = this.User.counts.post_count || 0;
				this.profileInfo.todaynum = this.User.counts.today_posts_count || 0;
				this.profiledata[0].num = this.User.counts.post_count || 0;
				this.profiledata[1].num = this.User.counts.post_count || 0;
				this.profiledata[2].num = this.User.counts.comments_count || 0;
				this.profiledata[3].num = this.User.counts.withfen_count || 0;

				this.loginStatus = true
			},
			openLogin(){
				uni.navigateTo({
					url:"../../pages/login/login"
				})
			},
			clickright(){
				this.User.navigate({url:'/pages/user-set/user-set'})
			},
			clickleft(){
				uni.switchTab({
					url:"../index/index"
				})
		
			},
		}
	}
</script> 

<style lang="scss" scoped>
	

	
</style>
