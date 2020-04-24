<template>
	<view>
		<navigation-custom  :config="config" :scrollTop="scrollTop" @clickleft="clickleft" @clickright="clickright" :scrollMaxHeight="scrollMaxHeight">
			<view slot="middle" class="nav-tab-bar u-f-ajc">
				<block v-for="(item, index) in tabBars" :key="index">
					<view class="u-f-jsb" :class="{'active':tabindex==index}" @tap="changeTab(index)">
						{{item.name}} 
						<view v-if="tabindex == index" class="nav-tab-bar-line"></view>
					</view>
				</block>
			</view>
		</navigation-custom>
		
		<view class="content">
			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{height: swiperheight+'px'}" :current="tabindex" @change="changeSwiper">
					<!-- 关注 -->
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
							<template>
								<!-- 图文列表 -->
								<block v-for="(item, index) in guanzhu.list" :key="index">
									<common-list :item="item"></common-list>
								</block>
								<!-- 上拉加载更多 -->
								<load-more :loadtext="guanzhu.loadmore"></load-more>
							</template>
						</scroll-view>
					</swiper-item>
					
					<!-- 话题 -->
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
							<template>
								<!-- 搜索框 -->
								<search-input @openSearch="openSearch"></search-input>
								<!-- 滑动视窗 -->
								<topic-swiper :swipers="topic.swiper"></topic-swiper>
								<!-- 热门分类 -->
								<topic-nav :nav="topic.nav"></topic-nav>    
								<!-- 最近更新 -->
								<topic-news :news="topic.news"></topic-news>
								<load-more :loadtext="topic.loadmore"></load-more>
							</template>
						</scroll-view> 
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script> 
		import navigationCustom from "../../components/navigation-custom/navigation-custom.vue"
		import commonList from "../../components/common/common-list.vue"
		import loadMore from "../../components/common/load-more.vue"
		import noThing from "../../components/common/no-thing.vue"
		
		import topicNav from "../../components/news/topic-nav.vue"
		import searchInput from "../../components/common/search-input.vue"
		import topicSwiper from "../../components/common/topic-swiper.vue"
		import topicNews from "../../components/news/topic-news.vue"
		
		import app from "../../App.vue"
	    export default {
			components:{
				commonList,
				navigationCustom,
				loadMore,
				noThing,
				topicNav,
				searchInput,
				topicSwiper,
				topicNews
			},
	        data() {
	            return {
					
					swiperheight:500,
					tabindex:0,
					tabBars:[
						{name:"关注", id:"guanzhu"},
						{name:"话题", id:"topic"}
					],
					topic:{
						name:"话题",
						loadmore:"上拉加载更多",
						swiper:[
							{ src:"", url:""},
						],
						nav:[
							{name:""}
						],
						news:[{	
								titlepic:"",
								title:"",
								desc:"",
								topic_class_id:"",
								totalnum:32,
								todaynum:23
							}
						]
					},
					guanzhu:{
						name:"关注",
						loadmore:"上拉加载更多",
						list:[
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
						}]
					},

					config:{
						bgcolor:"#ffffff", //背景颜色
						fontcolor:"black", //文字颜色，默认白色
						// 	#ifdef MP-WEIXIN
						type:1, //type 1，3胶囊 2，4无胶囊模式
						leftimage:"../../static/icon/navbar/back_.png",
						rightimage:"../../static/icon/navbar/home_.png"
						// #endif
					}
	            }
	        },
			
			onPageScroll(e) {
			    this.scrollTop = e.scrollTop;
			},
			
			onLoad() {
				this.swiperheight = app.globalData.windowHeight - uni.upx2px(124)
			},
			onReady() {
				this.__init_data()()
			},
			
	        methods: {
				
				openSearch(){
					uni.navigateTo({
						url:"../search/search?searchType=topic"
					})
				},
				__init_data(){
					this.getSwiper()
					this.getTopicClass()
					this.getHotTopic()
				},
				/* 话题页面下的数据 */
				/* 1 swiper 广告栏数据 */
				 async getSwiper(){
					let [err, res] = await this.$http.get("/adsense/0",{},{token:true})
					let error = this.util.CheckError(err, res)
					let list = res.data.data.list
					let urls = list.map((obj ,index)=>{
						return { src:obj.src, url:obj.url}
					})
					this.topic.swiper = urls.length>0 ? urls:this.topic.swiper
				},
				/* h获取话题分类 */
				async getTopicClass(){
					let [err, res] = await this.$http.get("/topicclass",{},{token:true})
					let error = this.util.CheckError(err, res)
					let list = res.data.data.list
					let navs = list.map((obj, index) =>{
						return { 
							id:obj.id,
							name:obj.classname
						}
					})
					this.topic.nav = navs
				},
				/* 获取热门话题*/
				async getHotTopic(){
					let [err, res] = await this.$http.get("/hottopic",{},{token:true})
					let error = this.util.CheckError(err, res)
					let list = res.data.data.list
					let hotTopics = list.map((obj, index)=>{
						return {
							id:obj.id,
							titlepic:obj.titlepic,
							topic_class_id:obj.topic_class_id, 
							title:obj.title,
							desc:obj.desc,
							totalnum:obj.post_count,
							todaynum:obj.todaypost_count
						}
					})
				this.topic.news = hotTopics
				},
				
				changTabHead(){
					if (this.tabindex ==0){
						this.tabindex =1
					} else{
						this.tabindex =0
					}
				},
				loadmore(index){
					if (this.guanzhu.loadmore != "上拉加载更多"){ return }
					this.guanzhu.loadmore  = "加载中"
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
						this.guanzhu.list.push(obj);
						this.guanzhu.loadmore = "上拉加载更多"
					},500)  
				},
				
				changeSwiper(e){
					this.tabindex = e.detail.current
					console.log("swiper", this.tabindex)
				},
	            //当config type 为 4或者3 的时候 自定义methods
				changeTab(index){
					this.tabindex = index;
					console.log("点击tanbar", index, this.tabindex)
				},
				
				clickleft(){ 
					uni.navigateBack({
						delta: 1
					});
				},
				clickright(){
					uni.switchTab({
						url:"../index/index"
					})
				}
				
				
	        }
	    }
</script>

<style lang="scss" scoped>
.content{
	background-color: #eaeaea;
}
.nav-tab-bar>view{
		font-size: 32rpx;
		padding: 0 20rpx;
		font-weight: bold;
		color: #969696;
	}
.active{
	color: #333333!important;
	
}
.nav-tab-bar-line{
	border-bottom:  5rpx solid #ffee30;
	border-top:  5rpx solid #ffee30;
	width: 70rpx;
	border-radius: 20rpx;
}

</style>
