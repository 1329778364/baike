<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->		
				<mini-nav-bar :fixed="true" :border="false" statusBar=true background-color="#FFFFFF">
					<view slot="left" >
						<view class="icon-fontsize-lg icon iconfont icon-user-detail" @click="navUserList"></view>
					</view>
					<view class="u-f-ajc font-size-lg">小 纸 条</view>
					<view slot="right">
						<view class="icon-fontsize-lg icon iconfont icon-zengjia" @click="addbutton"></view>
					</view>
				</mini-nav-bar>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
				<uni-nav-bar title="小纸条" :fixed="true" :border="false" statusBar=true background-color="#FFFFFF">
					<view slot="left" >
						<view class="icon-fontsize-lg icon iconfont icon-user-detail" @click="navUserList"></view>
					</view> 
					<view slot="right">
						<view class="icon-fontsize-lg icon iconfont icon-zengjia" @click="addbutton"></view>
					</view>
				</uni-nav-bar>
		<!-- #endif -->
		
		<!-- 列表 -->
		<view class="paper-list">
			<block v-for="(item, index) in list" :key="index">
				<paper-list :item="item"></paper-list>
			</block>
			<load-more :loadtext="loadtext"></load-more>
		</view>
		<!-- 操作菜单 -->
		<paper-left-popup :show="show" 
			@addfriend="addfriend" 
			@clear="clear" 
			@clickmask="clickmask">
		</paper-left-popup>
		
	</view>
</template>

<script>
	import miniNavBar from "../../components/common/mini-nav-bar.vue"
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import paperList from "../../components/paper/paper-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue"
	
 	export default {
		components:{
			miniNavBar,
			uniNavBar,
			paperList,
			loadMore,
			paperLeftPopup
		},
		data() {
			return {
				show:false,
				loadtext:"上拉加载更多",
				list:[
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"0"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"0"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					}
				]
			}
		},
		 
		/* 下拉刷新 */
		onPullDownRefresh() {
			this.getdata()
		},
		/* 上拉加载 */
		onReachBottom() {
			this.loadmore()
		},
		methods: {
			navUserList(){
				this.User.navigate({
					url: '../user-list/user-list'
				});
			},
			clickmask(){
				this.show = false
			},
			addbutton(){
				this.show = true
			},
			addfriend(){
				console.log("点击加好友")
			},
			clear(){
				console.log("清除未读")
			},
			loadmore(){
				if (this.loadtext != "上拉加载更多") { return }
				this.loadtext = "加载中"
				setTimeout(() => {
					let obj = {
						userpic:"../../static/8.jpg",
						username:"五六千 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					}
					this.list.push(obj)
					this.loadtext = "上拉加载更多"
				},500)
				
			},
			
			getdata(){
				setTimeout(() => {
					let arr =[
					{
						userpic:"../../static/8.jpg",
						username:"五六千 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"23"
					},
					{
						userpic:"../../static/8.jpg",
						username:"123",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"0"
					},
					{
						userpic:"../../static/8.jpg",
						username:"昵称 ",
						time:"13:58",
						data:"我是数据，内容",
						noreadnum:"2"
					}]
				this.list = arr
				}, 500);
				StopPullDownRefreshOption()
			}
		}
	}
</script>

<style lang="scss" scoped>
.paper-list{
	padding: 20rpx;
}

</style>


