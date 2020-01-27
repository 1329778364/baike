<template>
	<view>
		<!-- 顶部自定义导航栏 如果是编译到APP 则并不需要这部分 -->
		<!-- #ifdef MP-WEIXIN -->
		<mini-nav-search></mini-nav-search>
		<!-- #endif -->
		<!-- 顶部abbar选项卡 主要就是利用了几个样式 -->
		<swiper-tab-head :tabbars="tablist" :tabindex="tabindex" @tab="chooseTab"></swiper-tab-head>
		
		<view class="uni-tab-bar">
		<swiper class="swiper-box" :style="{height: swiperheight+'px'}" :current="tabindex" @change="changeSwiper">
			<swiper-item v-for="(item, index) in newlist" :key="index">
				<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<!-- 图文列表 -->
						<!-- #ifdef MP-WEIXIN -->
						<block v-for="(item1, index1) in item.list" :key="index1">
							<index-list @caozuo="caozuo($event, index, index1)" :item="item1" :index="index1" :isguanzhu="item1.isguanzhu" @guanzhu="guanzhu($event, index, index1)"></index-list>
						</block>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<block v-for="(item1, index1) in item.list" :key="index1">
							<index-list :item="item1" :index="index1" @guanzhu="guanzhu"></index-list>
						</block> 
						<!-- #endif -->
						<!-- 上拉加载更多... -->
						<load-more :loadtext="item.loadmore"></load-more>
					</template>
					<template v-else>
						<no-thing></no-thing>					
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
		</view>
		<!-- 图文列表 -->
		
		
	</view>
</template> 

<script> 
	import miniNavSearch from '../../components/index/mini-nav-search.vue';
	import indexList from '../../components/index/index-list.vue';
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import loadMore from "../../components/common/load-more.vue"
	import noThing from "../../components/common/no-thing.vue"
	
	import app from "../../App.vue";
	export default {  
		components:{ 
				miniNavSearch,
				indexList,
				swiperTabHead,
				loadMore,
				noThing
			},
		data() {
			return {
				swiperheight:"",
				city: '北京',
				newlist:[{
						list:[
							{
								type:"img",
									userpic:"../../static/icon/profile.png",
									username:"昵称",
									isguanzhu:true,
									title:"我是标题",
									titlepic:"../../static/image1.png",
									infonum:{
										index:1, /* 0 没有操作 1顶 2踩*/
										cai:232,
										ding:122
									},
									commentnum:200,
									sharenum:100,
									},{
									type:"video",
									playnum:23,
									long:"28:09",
									userpic:"../../static/icon/profile.png",
									username:"昵称",
									isguanzhu:true,
									title:"我是标题",
									titlepic:"../../static/image1.png",
									infonum:{
										index:1, /* 0 没有操作 1顶 2踩*/
										cai:232,
										ding:122
									},
									commentnum:200,
									sharenum:100
								},{
								type:"img",
									userpic:"../../static/icon/profile.png",
									username:"昵称",
									isguanzhu:true,
									title:"我是标题",
									titlepic:"../../static/image1.png",
									infonum:{
										index:2, /* 0 没有操作 1顶 2踩*/
										cai:232,
										ding:122
									},
									commentnum:200,
									sharenum:100,
									},{
								type:"img",
									userpic:"../../static/icon/profile.png",
									username:"昵称",
									isguanzhu:false,
									title:"我是标题",
									titlepic:"../../static/image1.png",
									infonum:{
										index:0, /* 0 没有操作 1顶 2踩*/
										cai:232,
										ding:122
									},
									commentnum:200,
									sharenum:100,
									}
						],
						id:"1",
						loadmore:"上拉加载更多"
						},{
						list:[],  
						id:"2",
						loadmore:"上拉加载更多"
						},{
						list:[],
						id:"3",
						loadmore:"上拉加载更多"
						},{
						list:[],
						id:"4",
						loadmore:"上拉加载更多"
						},{
						list:[],
						id:"5",
						loadmore:"上拉加载更多"
						},{
						list:[],
						id:"6",
						loadmore:"上拉加载更多"
						},{
						list:[],
						id:"7",
						loadmore:"上拉加载更多"
						}],
					
					tabindex:0,
					tablist:[
						{name:"关注",id:"guanzhu"},
						{name:"体育",id:"tiyu"},
						{name:"热点",id:"redian"},
						{name:"财经",id:"caijing"},
						{name:"音乐",id:"yinyue"},
						{name:"视频",id:"shiping"},
						{name:"游戏",id:"youxi"},
					]
			}
		}, 
		onLoad() {
			this.swiperheight = app.globalData.windowHeight - uni.upx2px(230)
		},
		
		// #ifdef APP-PLUS
		onNavigationBarSearchInputClicked: () => {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		onNavigationBarButtonTap: (e) => {
			/* 对导航栏点击事件进行处理 */
			switch (e.index){
				case 1:  // 打开发布页
					uni.navigateTo({
						url:'../addInput/addInput'
					});
					break;
				case 0: // 点击签到 
					uni.navigateTo({
						url: '../qiandao/qiandao'
					});
					break;
			}
		},
		// #endif
		methods: {
			
			handleSearch(e){
				uni.navigateTo({
					url: '../search/search',
					success: res => {
						console.log("跳转成功")
					}
				});
			},
			
			caozuo(){
				// 暂时没做兼容 微信端使用无效
				// #ifdef MP-WEIXIN
				console.log(arguments) 
				// #endif
			},
			guanzhu(e){
				
				// #ifdef APP-PLUS
				// console.log("这是子组件传过来的数据", e)
				console.log("父组件携带数据", e)
				// #endif
				
				// #ifdef MP-WEIXIN
				// console.log("这是子组件传过来的数据", e)
				console.log("父组件携带数据", arguments)
				/* 对关注信息进行设置 */
				this.newlist[arguments[1]].list[arguments[2]].isguanzhu = arguments[0]
				console.log("修改后的数据", this.newlist)
				// #endif
			},
			
			loadmore(index){
				if (this.newlist[index].loadmore != "上拉加载更多"){ return }
				this.newlist[index].loadmore  = "加载中"
				setTimeout(() =>{
					let obj = { type:"img",
								userpic:"../../static/icon/profile.png",
								username:"昵称",
								isguanzhu:false,
								title:"我是标题",
								titlepic:"../../static/image1.png",
								infonum:{
									index:0, /* 0 没有操作 1顶 2踩*/
									cai:232,
									ding:122
								},
								commentnum:200,
								sharenum:100,
								}
					this.newlist[index].list.push(obj) 
					this.newlist[index].loadmore = "上拉加载更多"
				},1000)  
			},
			
			changeSwiper(e){
				this.tabindex = e.detail.current
				console.log("swiper", this.tabindex)
			},
			chooseTab(e){
				this.tabindex = e
				console.log("tab", this.tabindex)				
			}
		}
	}
</script>

<style scoped lang="scss"> 

</style> 
