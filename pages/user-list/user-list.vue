<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<mini-nav-bar :leftwidth=leftwidth :fixed="true" :border=false :statusBar="true" color="#333333" background-color="#FFFFFF">
				<view slot="left" ></view>
				<block>
					<view class="input-view">
						<view class="icon iconfont icon-sousuo"></view>
						<input :disabled="false" class="nav-bar-input" type="text" v-model="inputContent" @confirm="confirmInput">
					</view>
				</block>
				<block slot="right">
					<view style="font-size: 32rpx;" @click="backToPre">取消</view>
				</block>
			</mini-nav-bar>
		<!-- #endif --> 
		<!-- #ifdef APP-PLUS -->
			<uni-nav-bar :leftwidth=leftwidth :fixed="true" :border=false :statusBar="true" color="#333333" background-color="#FFFFFF">
				<view slot="left" ></view>
				<block> 
					<view class="input-view">
						<view class="icon iconfont icon-sousuo"></view>
						<input :disabled="false" class="nav-bar-input" type="text" v-model="inputContent" @confirm="confirmInput">
					</view>
				</block>
				<block slot="right">
					<view style="font-size: 32rpx;" @click="backToPre">取消</view>
				</block>
			</uni-nav-bar>
		<!-- #endif --> 
		
		<!-- tabbar -->
		<swiper-tab-head scrollItemStyle="width:33.3%" :tabbars="tabbars" :tabindex="tabindex" @tab="chooseTab"></swiper-tab-head>
		<view class="uni-tab-bar">
		<swiper class="swiper-box" :style="{height: swiperheight+'px'}" :current="tabindex" @change="changeSwiper">
			<swiper-item v-for="(tab, index) in total" :key="index">
				<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
					<template v-if="tab.list.length > 0">
						<view class="border-box">
							<block v-for="(item, index1) in tab.list" :key="index1">
								<user-list-item :item="item"></user-list-item>
							</block>
						</view>
						<load-more :loadtext="tab.loadtext"></load-more>
					</template>
					<template v-else>
						<no-thing></no-thing>					
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
		</view>
	</view>
</template>
	
<script>
	import app from "../../App.vue"
	import miniNavBar from '../../components/common/mini-nav-bar.vue';
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import userListItem from "../../components/user-list-item/user-list-item.vue"
	
	import loadMore from "../../components/common/load-more.vue"
	import noThing from "../../components/common/no-thing.vue"
	export default { 
		components:{
			miniNavBar,  
			uniNavBar,
			swiperTabHead,
			userListItem ,
			loadMore,
			noThing
		},
		data() {
			return {
				
				leftwidth:"width:1px;",
				inputContent:"",
				
				swiperheight:"",
				tabindex:0,
				tabbars:[
					{name:"互关",id:"huguan", num:10},
					{name:"关注",id:"guanzhu", num:10},
					{name:"粉丝",id:"fensi", num:10}
				],
				total:[
					{
						name:"互关",
						loadtext:"上拉加载更多",
						list:[
							{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:24,
								sex:1,
								isguanzhu:true
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							}
						]
					},
					{	name:"互关",
						loadtext:"上拉加载更多",
						list:[
							{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							}
						]},
					{	name:"互关",
						loadtext:"上拉加载更多",
						list:[
							{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							},{
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							}
						]},
				]
				
				
			};
		},
		// #ifdef APP-PLUS
		onNavigationBarButtonTap(e){
			if (e.index == 0){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onNavigationBarSearchInputClicked: () => {
			console.log(e.detail)
		},
		
		onNavigationBarSearchInputConfirmed: () => {
			console.log(e.detail)
		},
		// #endif
		onLoad() {
			this.swiperheight = app.globalData.windowHeight - uni.upx2px(144)
		},
		methods:{
			changeSwiper(e){
				this.tabindex = e.detail.current
				console.log("swiper", this.tabindex)
			},
			confirmInput(){
			console.log("输入的内容是", this.inputContent)
		},
			backToPre(e){
				uni.navigateBack({
					delta: 1
				});
			},
			chooseTab(e){
				this.tabindex = e
				console.log("tab", this.tabindex)				
			},
			loadmore(index){
				if (this.total[index].loadtext != "上拉加载更多"){ return }
				this.total[index].loadtext = "加载中"
				setTimeout(() =>{
					let obj = {
								userpic:"../../static/8.jpg",
								username:"五六千",
								age:23,
								sex:0,
								isguanzhu:false
							}
					this.total[index].list.push(obj) 
					this.total[index].loadtext = "上拉加载更多"
				},1000)  
			},
			
		}
	}
</script>

<style lang="scss">
	.leftButton{
		width: 2px!important;
	}
	.input-view{
		display: flex;
		flex-direction: row;
		width: 160px;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}
	
	.nav-bar-input {
		height: 30px;
		line-height: 30px; 
		padding: 0 5px;
		font-size: 30rpx;
		background-color: #f8f8f8;
	}
	
</style>
