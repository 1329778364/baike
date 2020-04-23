<template>
	<view>
		<navigation-custom :config="config" @clickleft="clickleft" @clickright="clickright" :scrollTop="scrollTop" :scrollMaxHeight="scrollMaxHeight"></navigation-custom>
		<user-space-head :userinfo="userinfo"></user-space-head>
		<!-- 统计数据 -->
		<view class="user-space-data">
			<profile-data class="" :profiledata="staticData"></profile-data>
		</view>
		
		<swiper-tab-head :tabbars="tabbars" :tabindex="tabindex" @tab="chooseTab" scrollItemStyle="width:33.3%"></swiper-tab-head>
		<view class="topic-detail-list">
			<block v-for="(item, index) in tablist" :key="index">
				<template v-if="(tabindex == index)&& tabindex==0">
					<user-space-userinfo :userinfo="userinfo"></user-space-userinfo>
				</template>
				<template v-if="tabindex == index">
					<!-- 列表 -->
					<block v-for="(list,listindex) in item.list" :key="listindex">
						<common-list :item="list" :index="listindex"></common-list>
					</block>
					<!-- 上拉加载 -->
					<load-more :loadtext="item.loadtext"></load-more>
				</template>
			</block>
		</view>
		<user-space-popup :show="show" @clickmask="clickmask" @lahei="lahei" @beizhu="beizhu"></user-space-popup>
	</view>
</template>

<script>
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import userSpaceHead from "../../components/user-space/user-space-head.vue"
	import navigationCustom from "../../components/navigation-custom/navigation-custom.vue"
	import profileData from "../../components/profile/profile-data.vue"
	import userSpaceUserinfo from "../../components/user-space/user-space-userinfo.vue"
	import commonList from "../../components/common/common-list.vue"
	import loadMore from '../../components/common/load-more.vue'
	import userSpacePopup from "../../components/user-space/user-space-popup.vue"
	export default {
		components:{
			swiperTabHead, 
			userSpaceHead,
			navigationCustom,
			profileData,
			userSpaceUserinfo,
			commonList,
			loadMore,
			userSpacePopup
		},
	
		data() {
			return {
				show:false,
				tablist:[
					{},
					{
						name:"默认",
						loadtext:"上拉加载更多",
						list:[
							{ // 文字
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:0,
							age:25,
							isguanzhu:true,
							title:"我是标题",
							titlepic:"",
							video:false,
							share:false,
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							},
							{ // 图文
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:1,
							age:25,
							isguanzhu:false,
							title:"我是标题",
							titlepic:"../../static/13.jpg",
							video:false,
							share:false,
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							},
							{ // 视频 
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:1,
							age:25,
							isguanzhu:false,
							title:"我是标题",
							titlepic:"../../static/13.jpg",
							video:{
								looknum:"20w",
								long:"2:47"
							},
							share:false,
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							},
							{ // 分享
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:0,
							age:25,
							isguanzhu:false,
							title:"我是标题",
							titlepic:"",
							video:false,
							share:{
								title:"分享的标题",
								titlepic:"../../static/13.jpg"
							},
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							}
						]
					},
					{
						name:"更新",
						loadtext:"上拉加载更多",
						list:[
							{ // 文字
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:0,
							age:25,
							isguanzhu:true,
							title:"我是标题",
							titlepic:"",
							video:false,
							share:false,
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							},
							{ // 图文
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:1,
							age:25,
							isguanzhu:false,
							title:"我是标题",
							titlepic:"../../static/13.jpg",
							video:false,
							share:false,
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							},
							{ // 视频 
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:1,
							age:25,
							isguanzhu:false,
							title:"我是标题",
							titlepic:"../../static/13.jpg",
							video:{
								looknum:"20w",
								long:"2:47"
							},
							share:false,
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							},
							{ // 分享
							userpic:"../../static/8.jpg",
							username:"昵称",
							sex:0,
							age:25,
							isguanzhu:false,
							title:"我是标题",
							titlepic:"",
							video:false,
							share:{
								title:"分享的标题",
								titlepic:"../../static/13.jpg"
							},
							address:"深圳 龙岗",
							sharenum:20,
							commentnum:20,
							dingnum:30
							}
						]
					}
				],
				userinfo:{
					bgimg:1,
					userpic:"../../static/8.jpg",
					username:"王立强",
					sex:0,
					age:20,
					isguanzhu:false,
					regtime:"2019-04-11",
					id:1213,
					birthday:"1987-02-07",
					job:"IT",
					path:"广东广州",
					qg:"已婚"
				},
				staticData:[
					{name:"获赞",num:"10k"},
					{name:"关注",num:"11"},
					{name:"粉丝",num:"12"}
				],
				tabbars:[
					{name:"主页", id:"zhuye"},
					{name:"糗事", id:"qiushi"},
					{name:"动态", id:"dontai"}
				],
				
				tabindex:0,
				config:{
					title:"",
					bgcolor:"white",
				    fontcolor:"black", //文字颜色，默认白色
				    type:1, //type 1，3胶囊 2，4无胶囊模式
				    transparent:true, //是否背景透明 默认白色
				    linear:true, //是为开启下滑渐变
				    share:false, //是否将主页按钮显示为分享按钮
					leftimage:"../../static/icon/navbar/back_.png",
					rightimage:"../../static/icon/navbar/menu.png"
				},
				scrollTop:0, // 当linear为true的时候需要通过onpagescroll传递参数
				scrollMaxHeight:200 //滑动的高度限制，超过这个高度即背景全部显示
			};
		},
		onPageScroll(e) {
		    this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			this.loadmore()
		},
		onLoad() {
			this.config.title = this.userinfo.username
		},
		methods:{ 
			clickmask(){
				this.show = false
			},
			lahei(){
				console.log("拉黑")
			},
			beizhu(){
				console.log("备注")
			},
			loadmore(index){
				if (this.tablist[this.tabindex].loadtext != "上拉加载更多"){ return }
				this.tablist[this.tabindex].loadtext = "加载中"
				setTimeout(() =>{
					let obj = { // 视频
								userpic:"../../static/8.jpg",
								username:"昵称",
								sex:1,
								age:25,
								isguanzhu:false,
								title:"我是标题",
								titlepic:"../../static/13.jpg",
								video:{
									looknum:"20w",
									long:"2:47"
								},
								share:false,
								address:"深圳 龙岗",
								sharenum:20,
								commentnum:20,
								dingnum:30
							}
					this.tablist[this.tabindex].list.push(obj);
					this.tablist[this.tabindex].loadtext = "上拉加载更多"
				},500)  
			},
			chooseTab(e){
				this.tabindex = e
			},
			
			clickright(){
				this.show = true
			},
			clickleft(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
.user-space-data{
	position: relative;
	margin-top: -20rpx;
} 

</style>
