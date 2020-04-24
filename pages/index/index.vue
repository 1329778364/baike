<template>
	<view>
		<!-- 顶部自定义导航栏 如果是编译到APP 则并不需要这部分 -->
		<!-- #ifdef MP-WEIXIN -->
		<mini-nav-search @search="handleSearch" @fabu="fabu" @qiandao="qiandao"></mini-nav-search>
		<!-- #endif -->
		<!-- 顶部abbar选项卡 主要就是利用了几个样式 -->
		<swiper-tab-head :tabbars="tablist" :tabindex="tabindex" @tab="chooseTab"></swiper-tab-head>
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperheight+'px'}" :current="tabindex" @change="changeSwiper">
				<swiper-item v-for="(item, index) in newlist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<template v-if="item.list.length > 0">
							<!-- 图文列表 -->
							<block v-for="(item1, index1) in item.list" :key="index1">
								<index-list :item="item1" :index="index1" @change="updateData"></index-list>
							</block>
							<!-- 上拉加载更多... -->
							<load-more :loadtext="item.loadtext"></load-more>
						</template>
						<template v-else-if="!item.firstload">
							<view class="u-f-ajc font-color-gray font-size-lg">Loading....</view>
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
				isload:false,
				swiperheight:"",
				city: '北京',
				newlist:[],
				tabindex:0,
					tablist:""
			}
		}, 
		onLoad() {
			this.swiperheight = app.globalData.windowHeight - uni.upx2px(230)
			this.getNav()
			
			/* 开启监听 */
			uni.$on("updateData",this.updateData)
		},
		
		onShow() {
			// 当第一次加载失败时 在进入该页面时重新进行加载
			if(!this.isload){
				if(!this.tablist || this.newlist[0].list.length<1){
					console.log("当第一次加载失败时 在进入该页面时重新进行加载");
					this.getNav()
				}				
			}
		},
		// #ifdef APP-PLUS
			onNavigationBarSearchInputClicked: () => {
				uni.navigateTo({
					url: '../search/search'
				});
			},	
			onNavigationBarButtonTap: (e) =>{
				/* 对导航栏点击事件进行处理 */
				switch (e.index){
					case 1:  // 打开发布页、
						uni.navigateTo({
							url:'../add-input/add-input'
						})
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
			/* 获取tabbar list */
			async getNav(){
				let [err, res] = await this.$http.get("/postclass", {}, { token:false, checkToken:false })
				if(!this.util.CheckError(err,res)) return
				let list = res.data.data.list
				let newlist = []
				let tablist = list.map((obj, index)=>{
					newlist.push({
						loadtext:"上拉加载更多",
						list:[],
						page:1,
						firstload:false
					})
					return {
						name:obj.classname,
						id:obj.id
					}
				})
				this.tablist = tablist,
				this.newlist = newlist,
				this.tablist.length >0 ?this.getList():""
			},
			
			/* 获取特定tabbar下面的文章辩题 */
			async getList(){
				let url = `/postclass/${this.tablist[this.tabindex].id}/post/${this.newlist[ this.tabindex].page}`
				let [err, res] = await this.$http.get(url, {},{token:true}) /* 加了token 才能知道你的关注信息*/
				let error = this.util.CheckError(err,res,()=>{
					this.newlist[this.tabindex].loadtext = "上拉加载更多"
				},()=>{
					this.newlist[this.tabindex].loadtext = "上拉加载更多"
				})
				if(!error) return
				let list = res.data.data.list
				if(res){
					let newlistitem = list.map((obj, index)=>{
						return {
							userid:obj.user.id,
							userpic:obj.user.userpic,
							username:obj.user.username,
							id:obj.id,
							title:obj.title,
							titlepic:obj.titlepic,
							path:obj.path,
							share:obj.share,
							infonum:{
								index:(obj.support.length)>0? (obj.support[0].type+1):0,
								dingnum:obj.ding_count,
								cainum:obj.cai_count
							}, 
							isguanzhu:!!obj.user.fens.length,
							video:false,
							type:"img",
							commentnum:obj.comment_count || 0,
							sharenum:obj.sharenum || 0
						}
					})
					this.newlist[this.tabindex].list = this.newlist[this.tabindex].page >1?this.newlist[this.tabindex].list.concat(newlistitem):newlistitem
					this.newlist[this.tabindex].firstload = true
					if(list.length<10){
						this.newlist[this.tabindex].loadtext = "没有更多数据了"
					}else{
						this.newlist[this.tabindex].loadtext = "上拉加载更多"
					}
				}
				this.isload = true
			},
			
			// #ifdef MP-WEIXIN
				qiandao(){
					// this.User.navigate({
					// 	url: '../qiandao/qiandao'
					// });
					uni.navigateTo({
						url:"../zhiwen-livepush/zhiwen-livepush"
					})
				},
				handleSearch(e){
					this.User.navigate({
						url: '../search/search'
					});
				},
				fabu(){
					this.User.navigate({
						url:'../add-input/add-input?postClass='+JSON.stringify(this.tablist)
					})
				},
			// #endif
			/* 子组件是件更新父组件数据 */
			updateData(res){
				switch (res.type){
					case "guanzhu":
						this.updateGuanzhu(res)
						break;
					case "support":
						this.updateSupport(res)
						break;						
				}
			},
			updateGuanzhu(res){
				this.newlist[this.tabindex].list.forEach((item, index)=>{
					if(item.userid === res.userid){
						item.isguanzhu = res.data
					}
				})
			},
			/* 更新顶踩状态 由于是单片文章用find便可以 */
			updateSupport(res){
				/* 找到对应文章好的对象进行引用 */
				let obj = this.newlist[this.tabindex].list.find(value =>{
					return value.id === res.post_id
				})
				if(!obj) return
				let oldindex = obj.infonum.index
				/* 当前操作 更新图标颜色 */
				obj.infonum.index = res.dotype 
				/* 更新数字 */
				/* 之前有操作过 */
				if(oldindex !==0){
					oldindex === 1 ? obj.infonum.dingnum--: obj.infonum.cainum--
				}
				/* 本次操作 */
				res.dotype ==1?obj.infonum.dingnum++:obj.infonum.cainum++

			},
			
			loadmore(index){
				if (this.newlist[index].loadtext != "上拉加载更多"){ return }
				this.newlist[index].loadtext = "加载中"
				this.newlist[this.tabindex].page++
				this.getList()
			},
			
			changeSwiper(e){
				this.tabindex = e.detail.current
				this.getList()
			},
			chooseTab(e){
				this.tabindex = e
			}
		}
	}
</script>

<style scoped lang="scss"> 

</style> 
